/**
 * MongoDB data migration: copies every collection from SOURCE to TARGET.
 *
 * Usage:
 *   node scripts/migrate-db.js                       # dev -> prod (default)
 *   node scripts/migrate-db.js --from dev --to prod
 *   node scripts/migrate-db.js --from local --to dev --drop
 *
 * Flags:
 *   --from <dev|local|prod>   source environment (reads MONGODB_URI_<STATE>)
 *   --to   <dev|local|prod>   target environment
 *   --drop                    drop each target collection before inserting
 *   --dry                     connect + list collections, do not write
 */

const path = require("path");
const fs = require("fs");
const { MongoClient } = require("mongodb");

// --- minimal .env loader (no dotenv dep) ---
function loadEnvFile(p) {
  if (!fs.existsSync(p)) return;
  const lines = fs.readFileSync(p, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    const [, key, rawVal] = m;
    if (process.env[key] !== undefined) continue; // first wins (like Next)
    let val = rawVal;
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

const root = path.resolve(__dirname, "..");
loadEnvFile(path.join(root, ".env.local"));
loadEnvFile(path.join(root, ".env"));

// --- parse args ---
const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return fallback;
  return args[i + 1];
}
const hasFlag = (name) => args.includes(`--${name}`);

const from = (arg("from", "dev") || "").toLowerCase();
const to = (arg("to", "prod") || "").toLowerCase();
const drop = hasFlag("drop");
const dry = hasFlag("dry");

const VALID = ["dev", "local", "prod"];
if (!VALID.includes(from) || !VALID.includes(to)) {
  console.error(`--from / --to must be one of ${VALID.join(", ")}`);
  process.exit(1);
}
if (from === to) {
  console.error("Source and target must differ.");
  process.exit(1);
}

const srcUri = process.env[`MONGODB_URI_${from.toUpperCase()}`];
const dstUri = process.env[`MONGODB_URI_${to.toUpperCase()}`];
if (!srcUri) {
  console.error(`Missing MONGODB_URI_${from.toUpperCase()} in env.`);
  process.exit(1);
}
if (!dstUri) {
  console.error(`Missing MONGODB_URI_${to.toUpperCase()} in env.`);
  process.exit(1);
}

function maskUri(uri) {
  return uri.replace(/(\/\/[^:]+:)[^@]+(@)/, "$1****$2");
}

async function main() {
  console.log(`migrate-db: ${from.toUpperCase()} -> ${to.toUpperCase()}`);
  console.log(`  source: ${maskUri(srcUri)}`);
  console.log(`  target: ${maskUri(dstUri)}`);
  if (drop) console.log("  mode: --drop (target collections will be dropped first)");
  if (dry) console.log("  mode: --dry (no writes)");

  const srcClient = new MongoClient(srcUri);
  const dstClient = new MongoClient(dstUri);

  await srcClient.connect();
  await dstClient.connect();

  try {
    const srcDb = srcClient.db();
    const dstDb = dstClient.db();
    console.log(`\nsource db: ${srcDb.databaseName}`);
    console.log(`target db: ${dstDb.databaseName}\n`);

    const collections = (await srcDb.listCollections().toArray())
      .filter((c) => c.type !== "view" && !c.name.startsWith("system."));

    if (collections.length === 0) {
      console.log("source has no collections — nothing to do.");
      return;
    }

    const summary = [];
    for (const { name } of collections) {
      const srcColl = srcDb.collection(name);
      const count = await srcColl.countDocuments();
      process.stdout.write(`  ${name}: ${count} docs ... `);

      if (dry) {
        console.log("(dry-run, skipped)");
        summary.push({ name, count, inserted: 0, skipped: true });
        continue;
      }

      const dstColl = dstDb.collection(name);

      if (drop) {
        try {
          await dstColl.drop();
        } catch (e) {
          if (e.codeName !== "NamespaceNotFound") throw e;
        }
      }

      let inserted = 0;
      if (count > 0) {
        const cursor = srcColl.find({});
        const BATCH = 500;
        let batch = [];
        while (await cursor.hasNext()) {
          batch.push(await cursor.next());
          if (batch.length >= BATCH) {
            const res = await dstColl.insertMany(batch, { ordered: false });
            inserted += res.insertedCount;
            batch = [];
          }
        }
        if (batch.length) {
          const res = await dstColl.insertMany(batch, { ordered: false });
          inserted += res.insertedCount;
        }
      }

      // copy indexes (skip the default _id index)
      const indexes = await srcColl.indexes();
      for (const idx of indexes) {
        if (idx.name === "_id_") continue;
        const { key, name: iName, v, background, ...opts } = idx;
        try {
          await dstColl.createIndex(key, { name: iName, ...opts });
        } catch (e) {
          console.log(`\n    index ${iName} skipped: ${e.message}`);
        }
      }

      console.log(`inserted ${inserted}`);
      summary.push({ name, count, inserted, skipped: false });
    }

    console.log("\nsummary:");
    console.table(summary);
  } finally {
    await srcClient.close();
    await dstClient.close();
  }
}

main().catch((err) => {
  console.error("\nmigration failed:", err);
  process.exit(1);
});
