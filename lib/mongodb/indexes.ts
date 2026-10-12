import type { Db } from "mongodb";
import { getMongoDb, isMongoConfigured } from "./client";
import {
  CONVERSATIONS_COLLECTION,
  EVENTS_COLLECTION,
  LEADS_COLLECTION,
  MESSAGES_COLLECTION,
  USERS_COLLECTION,
} from "./collections";

/**
 * Per-process guard: indexes are created once per Node process (each Vercel
 * instance, each `next dev` start). Restart the dev server after adding an
 * index here.
 */
let indexesEnsured = false;

const TTL_INDEX_KEY = { expiresAt: 1 } as const;
const TTL_INDEX_OPTIONS = { expireAfterSeconds: 0 } as const;

export async function ensureChatIndexes(db?: Db | null): Promise<void> {
  if (!isMongoConfigured()) return;
  if (indexesEnsured) return;

  const database = db ?? (await getMongoDb());
  if (!database) return;

  const conversations = database.collection(CONVERSATIONS_COLLECTION);
  const messages = database.collection(MESSAGES_COLLECTION);
  const events = database.collection(EVENTS_COLLECTION);
  const users = database.collection(USERS_COLLECTION);
  const leads = database.collection(LEADS_COLLECTION);

  await Promise.all([
    // Retention: every collection expires `expiresAt` from the last contact.
    conversations.createIndex(TTL_INDEX_KEY, TTL_INDEX_OPTIONS),
    messages.createIndex(TTL_INDEX_KEY, TTL_INDEX_OPTIONS),
    events.createIndex(TTL_INDEX_KEY, TTL_INDEX_OPTIONS),
    users.createIndex(TTL_INDEX_KEY, TTL_INDEX_OPTIONS),
    leads.createIndex(TTL_INDEX_KEY, TTL_INDEX_OPTIONS),
    // Lookups.
    conversations.createIndex({ userId: 1, lastMessageAt: -1 }),
    messages.createIndex({ conversationId: 1, createdAt: 1 }),
    events.createIndex({ conversationId: 1, createdAt: -1 }),
    events.createIndex({ userId: 1, createdAt: -1 }),
    users.createIndex({ email: 1 }, { unique: true }),
    leads.createIndex({ userId: 1, createdAt: -1 }),
    leads.createIndex({ clientEmail: 1, createdAt: -1 }),
  ]);

  indexesEnsured = true;
}
