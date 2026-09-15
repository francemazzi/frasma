import { randomUUID } from "node:crypto";
import { logConversionEvent } from "../chat/persistence";
import { isValidConversationId } from "../chat/session";
import {
  normalizeVisitorEmail,
  upsertVisitor,
} from "../chat/visitors";
import {
  buildNotificationFromAddress,
  deliverNotificationEmail,
  getNotificationRecipient,
} from "../email/deliver";
import { buildProcessAssessmentEmail } from "../email/processAssessment";
import { getMongoDb, isMongoConfigured } from "../mongodb/client";
import { ensureChatIndexes } from "../mongodb/indexes";
import type { LeadSource, ProcessAssessment } from "../processAssessment";
import { createRicercaClientiLead } from "./notion";

export const LEADS_COLLECTION = "leads";

export type LeadDocument = {
  _id: string;
  userId: string;
  source: LeadSource;
  conversationId?: string;
  name: string;
  clientEmail: string;
  company?: string;
  role?: string;
  process: string;
  systems?: string;
  volume?: string;
  landing?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SubmitProjectBriefResult = {
  leadId?: string;
};

async function persistProjectBrief(
  input: ProcessAssessment,
  source: LeadSource,
): Promise<string | undefined> {
  if (!isMongoConfigured()) return undefined;

  try {
    const upserted = await upsertVisitor({
      email: input.clientEmail,
      name: input.name,
      company: input.company ?? "",
      sector: input.role?.trim() || "unspecified",
    });
    if (!upserted) return undefined;

    const db = await getMongoDb();
    if (!db) return undefined;

    await ensureChatIndexes(db);

    const now = new Date();
    const leadId = randomUUID();
    const conversationId = isValidConversationId(input.conversationId)
      ? input.conversationId
      : undefined;

    const document: LeadDocument = {
      _id: leadId,
      userId: upserted.visitor.id,
      source,
      ...(conversationId ? { conversationId } : {}),
      name: input.name,
      clientEmail: normalizeVisitorEmail(input.clientEmail),
      ...(input.company ? { company: input.company } : {}),
      ...(input.role ? { role: input.role } : {}),
      process: input.process,
      ...(input.systems ? { systems: input.systems } : {}),
      ...(input.volume ? { volume: input.volume } : {}),
      ...(input.landing ? { landing: input.landing } : {}),
      createdAt: now,
      updatedAt: now,
    };

    await db.collection<LeadDocument>(LEADS_COLLECTION).insertOne(document);

    await logConversionEvent(
      conversationId,
      "project_brief_submitted",
      {
        leadId,
        source,
        processLength: input.process.length,
      },
      {
        contactEmail: normalizeVisitorEmail(input.clientEmail),
        contactName: input.name,
        userId: upserted.visitor.id,
      },
    );

    return leadId;
  } catch (error) {
    console.error("[leads] Failed to persist project brief.", error);
    return undefined;
  }
}

export function inferLeadSource(conversationId?: string): LeadSource {
  return isValidConversationId(conversationId) ? "chat" : "form";
}

export async function submitProjectBrief(
  input: ProcessAssessment,
  source: LeadSource = inferLeadSource(input.conversationId),
): Promise<SubmitProjectBriefResult> {
  const lang = input.lang === "en" ? "en" : "it";
  const email = buildProcessAssessmentEmail(input, { source, lang });

  await deliverNotificationEmail({
    to: getNotificationRecipient(),
    from: buildNotificationFromAddress(),
    replyTo: input.clientEmail,
    subject: email.subject,
    text: email.text,
  });

  const leadId = await persistProjectBrief(input, source);
  await createRicercaClientiLead({ ...input, source, leadId });
  return { leadId };
}
