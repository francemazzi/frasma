import { randomUUID } from "node:crypto";
import { z } from "zod";
import { getMongoDb, isMongoConfigured } from "../mongodb/client";
import { ensureChatIndexes } from "../mongodb/indexes";
import {
  createConversation,
  findLatestConversationForUser,
  getConversationMessages,
  type StoredMessage,
} from "./persistence";
import { isValidConversationId } from "./session";

export const USERS_COLLECTION = "users";

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
  lastConversationId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UpsertVisitorInput = {
  email: string;
  name: string;
  company: string;
  sector: string;
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
  lastConversationId?: string;
  createdAt: Date;
  updatedAt: Date;
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
    ...(doc.lastConversationId
      ? { lastConversationId: doc.lastConversationId }
      : {}),
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

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
  const now = new Date();

  const existing = await db
    .collection<UserDocument>(USERS_COLLECTION)
    .findOne({ email });

  if (existing) {
    const nextCompany = company || existing.company;
    const nextSector =
      sector && sector !== "unspecified" ? sector : existing.sector;

    await db.collection<UserDocument>(USERS_COLLECTION).updateOne(
      { _id: existing._id },
      {
        $set: {
          name,
          company: nextCompany,
          sector: nextSector,
          updatedAt: now,
        },
      },
    );

    return {
      visitor: toVisitorProfile({
        ...existing,
        name,
        company: nextCompany,
        sector: nextSector,
        updatedAt: now,
      }),
      created: false,
    };
  }

  const userId = randomUUID();
  const document: UserDocument = {
    _id: userId,
    email,
    name,
    company,
    sector,
    createdAt: now,
    updatedAt: now,
  };

  await db.collection<UserDocument>(USERS_COLLECTION).insertOne(document);

  return {
    visitor: toVisitorProfile(document),
    created: true,
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
