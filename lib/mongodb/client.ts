import { MongoClient, type Db } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI?.trim());
}

function getMongoUri(): string | null {
  const uri = process.env.MONGODB_URI?.trim();
  return uri || null;
}

function createClientPromise(): Promise<MongoClient> {
  const uri = getMongoUri();
  if (!uri) {
    return Promise.reject(new Error("MONGODB_URI is not configured."));
  }

  const client = new MongoClient(uri);
  return client.connect();
}

export async function getMongoClient(): Promise<MongoClient | null> {
  if (!isMongoConfigured()) return null;

  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createClientPromise();
  }

  return global._mongoClientPromise;
}

export async function getMongoDb(): Promise<Db | null> {
  const client = await getMongoClient();
  if (!client) return null;

  return client.db();
}
