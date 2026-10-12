import { randomUUID } from "node:crypto";
import type { ModifyResult } from "mongodb";
import { z } from "zod";
import { getMongoDb, isMongoConfigured } from "../mongodb/client";
import { USERS_COLLECTION } from "../mongodb/collections";
import { ensureChatIndexes } from "../mongodb/indexes";
import {
  buildExpiresAt,
  createConversation,
  findLatestConversationForUser,
  getConversationMessages,
  touchRetention,
  type StoredMessage,
} from "./persistence";
import { isValidConversationId } from "./session";

export { USERS_COLLECTION };

export const ChatRegisterSchema = z
  .object({
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(254),
    company: z.string().trim().min(1).max(120),
    sector: z.string().trim().min(1).max(120),
    honeypot: z.string().optional(),
    lang: z.enum(["it", "en"]).optional(),
    timezone: z.string().trim().max(100).optional(),
    pagePath: z.string().trim().max(500).optional(),
  })
  .strict();

export type ChatRegisterInput = z.infer<typeof ChatRegisterSchema>;

export type VisitorProfile = {
  id: string;
  email: string;
  name: string;
  company: string;
  sector: string;
  /** Job role from the process brief form, when the visitor gave one. */
  role?: string;
  lastConversationId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UpsertVisitorInput = {
  email: string;
  name: string;
  company: string;
  sector: string;
  role?: string;
};

export type UpsertVisitorResult = {
  visitor: VisitorProfile;
  created: boolean;
};

type UserDocument = {
  _id: string;
  email: string;
  name: string;
  company: string;
  sector: string;
  role?: string;
  lastConversationId?: string;
  createdAt: Date;
  updatedAt: Date;
  /** Retention deadline; absent on documents created before the policy. */
  expiresAt?: Date;
};

export function normalizeVisitorEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isPersistenceEnabled(): boolean {
  return isMongoConfigured();
}

async function getDbWithIndexes() {
  const db = await getMongoDb();
  if (!db) return null;

  await ensureChatIndexes(db);
  return db;
}

function toVisitorProfile(doc: UserDocument): VisitorProfile {
  return {
    id: doc._id,
    email: doc.email,
    name: doc.name,
    company: doc.company,
    sector: doc.sector,
    ...(doc.role ? { role: doc.role } : {}),
    ...(doc.lastConversationId
      ? { lastConversationId: doc.lastConversationId }
      : {}),
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { code?: unknown }).code === 11000
  );
}

/**
 * Creates or updates the visitor keyed by email in ONE atomic upsert, so two
 * concurrent registrations with the same email cannot race a find-then-insert
 * into a duplicate-key error.
 *
 * Overwrite rules on an existing visitor: `name` always; `company` only when
 * non-empty; `sector` only when it is not the "unspecified" placeholder;
 * `role` only when non-empty.
 */
export async function upsertVisitor(
  input: UpsertVisitorInput,
): Promise<UpsertVisitorResult | null> {
  if (!isPersistenceEnabled()) return null;

  const db = await getDbWithIndexes();
  if (!db) return null;

  const email = normalizeVisitorEmail(input.email);
  const name = input.name.trim();
  const company = input.company.trim();
  const sector = input.sector.trim();
  const role = input.role?.trim() ?? "";
  const now = new Date();

  const set: Partial<UserDocument> = { name, updatedAt: now };
  if (company) set.company = company;
  if (sector && sector !== "unspecified") set.sector = sector;
  if (role) set.role = role;

  // Insert-only fields. MongoDB rejects a key present in both $set and
  // $setOnInsert, so company/sector land here only when not overwritten.
  const setOnInsert: Partial<UserDocument> = {
    _id: randomUUID(),
    email,
    createdAt: now,
  };
  if (!("company" in set)) setOnInsert.company = company;
  if (!("sector" in set)) setOnInsert.sector = sector;

  const update = {
    $set: set,
    $setOnInsert: setOnInsert,
    $max: { expiresAt: buildExpiresAt(now) },
  };
  const options = {
    upsert: true,
    returnDocument: "after",
    includeResultMetadata: true,
  } as const;
  const users = db.collection<UserDocument>(USERS_COLLECTION);

  let result: ModifyResult<UserDocument>;
  try {
    result = await users.findOneAndUpdate({ email }, update, options);
  } catch (error) {
    if (!isDuplicateKeyError(error)) throw error;
    // Lost the insert race: the row exists now, so the retry updates it.
    result = await users.findOneAndUpdate({ email }, update, options);
  }

  if (!result.value) {
    throw new Error("Visitor upsert returned no document.");
  }

  return {
    visitor: toVisitorProfile(result.value),
    created: Boolean(result.lastErrorObject?.upserted),
  };
}

export async function setVisitorLastConversation(
  userId: string,
  conversationId: string,
): Promise<void> {
  if (!isPersistenceEnabled()) return;
  if (!isValidConversationId(conversationId)) return;

  const db = await getDbWithIndexes();
  if (!db) return;

  const now = new Date();
  await db.collection<UserDocument>(USERS_COLLECTION).updateOne(
    { _id: userId },
    {
      $set: {
        lastConversationId: conversationId,
        updatedAt: now,
      },
    },
  );

  // A returning visitor re-registering is a contact: extend the deadline of
  // the conversation they resume and of everything they own.
  await touchRetention(db, { conversationId, userId }, now);
}

export type RegisterChatSessionInput = UpsertVisitorInput & {
  lang: "it" | "en";
  timezone: string;
  pagePath: string;
  clientIp?: string;
};

export type RegisterChatSessionResult = {
  conversationId: string;
  messages: StoredMessage[];
  visitor: {
    name: string;
    email: string;
    company: string;
    sector: string;
  };
  returning: boolean;
  createdVisitor: boolean;
};

export async function registerChatSession(
  input: RegisterChatSessionInput,
): Promise<RegisterChatSessionResult | null> {
  if (!isPersistenceEnabled()) return null;

  const upserted = await upsertVisitor(input);
  if (!upserted) return null;

  const { visitor, created } = upserted;

  let conversationId =
    (visitor.lastConversationId &&
    isValidConversationId(visitor.lastConversationId)
      ? visitor.lastConversationId
      : null) ?? (await findLatestConversationForUser(visitor.id));

  let messages: StoredMessage[] = [];

  if (conversationId) {
    const stored = await getConversationMessages(conversationId);
    if (stored === null) {
      conversationId = null;
    } else {
      messages = stored;
    }
  }

  if (!conversationId) {
    conversationId = await createConversation({
      lang: input.lang,
      timezone: input.timezone,
      pagePath: input.pagePath,
      clientIp: input.clientIp,
      userId: visitor.id,
      contactEmail: visitor.email,
      contactName: visitor.name,
      company: visitor.company,
      sector: visitor.sector,
    });

    if (!conversationId) return null;
    messages = [];
  }

  await setVisitorLastConversation(visitor.id, conversationId);

  return {
    conversationId,
    messages,
    visitor: {
      name: visitor.name,
      email: visitor.email,
      company: visitor.company,
      sector: visitor.sector,
    },
    returning: !created && messages.length > 0,
    createdVisitor: created,
  };
}
