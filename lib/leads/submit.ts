import { randomUUID } from "node:crypto";
import { buildExpiresAt, logConversionEvent } from "../chat/persistence";
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
import { LEADS_COLLECTION } from "../mongodb/collections";
import { ensureChatIndexes } from "../mongodb/indexes";
import type { LeadSource, ProcessAssessment } from "../processAssessment";
import { deriveLeadChannel, type LeadChannel } from "./channel";
import { createRicercaClientiLead } from "./notion";

export { LEADS_COLLECTION };

export type LeadDocument = {
  _id: string;
  userId: string;
  source: LeadSource;
  /** Acquisition channel derived from the source and utm attribution. */
  channel: LeadChannel;
  conversationId?: string;
  name: string;
  clientEmail: string;
  company?: string;
  role?: string;
  process: string;
  systems?: string;
  volume?: string;
  landingPath?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  createdAt: Date;
  updatedAt: Date;
  /** Retention deadline, extended on every later contact by touchRetention. */
  expiresAt: Date;
};

export type SubmitProjectBriefResult = {
  leadId?: string;
};

function pickAttribution(input: ProcessAssessment) {
  return {
    ...(input.landingPath ? { landingPath: input.landingPath } : {}),
    ...(input.utmSource ? { utmSource: input.utmSource } : {}),
    ...(input.utmMedium ? { utmMedium: input.utmMedium } : {}),
    ...(input.utmCampaign ? { utmCampaign: input.utmCampaign } : {}),
    ...(input.utmContent ? { utmContent: input.utmContent } : {}),
  };
}

async function persistProjectBrief(
  input: ProcessAssessment,
  source: LeadSource,
  channel: LeadChannel,
): Promise<string | undefined> {
  if (!isMongoConfigured()) return undefined;

  try {
    // The brief carries a job role, not a sector: "unspecified" keeps the
    // sector a returning chat visitor already gave (upsertVisitor never
    // overwrites with that placeholder).
    const role = input.role?.trim();
    const upserted = await upsertVisitor({
      email: input.clientEmail,
      name: input.name,
      company: input.company ?? "",
      sector: "unspecified",
      ...(role ? { role } : {}),
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

    const attribution = pickAttribution(input);
    const document: LeadDocument = {
      _id: leadId,
      userId: upserted.visitor.id,
      source,
      channel,
      ...(conversationId ? { conversationId } : {}),
      name: input.name,
      clientEmail: normalizeVisitorEmail(input.clientEmail),
      ...(input.company ? { company: input.company } : {}),
      ...(input.role ? { role: input.role } : {}),
      process: input.process,
      ...(input.systems ? { systems: input.systems } : {}),
      ...(input.volume ? { volume: input.volume } : {}),
      ...attribution,
      createdAt: now,
      updatedAt: now,
      expiresAt: buildExpiresAt(now),
    };

    await db.collection<LeadDocument>(LEADS_COLLECTION).insertOne(document);

    await logConversionEvent(
      conversationId,
      "project_brief_submitted",
      {
        leadId,
        source,
        channel,
        processLength: input.process.length,
        ...attribution,
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
  const channel = deriveLeadChannel(input, source);
  const email = buildProcessAssessmentEmail(input, { source, lang, channel });

  await deliverNotificationEmail({
    to: getNotificationRecipient(),
    from: buildNotificationFromAddress(),
    replyTo: input.clientEmail,
    subject: email.subject,
    text: email.text,
  });

  const leadId = await persistProjectBrief(input, source, channel);
  await createRicercaClientiLead({ ...input, source, channel, leadId });
  return { leadId };
}
