import mongoose from "mongoose";

const VALID_STATES = ["dev", "local", "prod"] as const;
type AppState = (typeof VALID_STATES)[number];

function resolveMongoUri(): string {
  const appState = (process.env.APP_STATE || "prod").toLowerCase();

  if (!VALID_STATES.includes(appState as AppState)) {
    throw new Error(
      `Invalid APP_STATE "${appState}". Must be one of: ${VALID_STATES.join(", ")}`
    );
  }

  const uriKey = `MONGODB_URI_${appState.toUpperCase()}`;
  const uri = process.env[uriKey] || process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      `Missing ${uriKey} (APP_STATE=${appState}). Define it in .env or .env.local.`
    );
  }

  return uri;
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const uri = resolveMongoUri();
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
