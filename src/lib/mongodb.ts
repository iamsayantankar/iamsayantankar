import mongoose from "mongoose";

const APP_STATE = (process.env.APP_STATE || "prod").toLowerCase();
const VALID_STATES = ["dev", "local", "prod"] as const;

if (!VALID_STATES.includes(APP_STATE as (typeof VALID_STATES)[number])) {
  throw new Error(
    `Invalid APP_STATE "${APP_STATE}". Must be one of: ${VALID_STATES.join(", ")}`
  );
}

const URI_KEY = `MONGODB_URI_${APP_STATE.toUpperCase()}`;
const MONGODB_URI = process.env[URI_KEY] || process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    `Missing ${URI_KEY} (APP_STATE=${APP_STATE}). Define it in .env or .env.local.`
  );
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
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
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
