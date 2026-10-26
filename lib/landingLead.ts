import { CONTACT } from "./contact";

export const LANDING_INTENTS = ["ddt", "quotes", "bom", "sheets", "other"] as const;
export type LandingIntent = (typeof LANDING_INTENTS)[number];

const INTENT_LABELS: Record<LandingIntent, string> = {
  ddt: "DDT e ordini",
  quotes: "Preventivi dai disegni",
  bom: "Distinte da disegni o Excel",
  sheets: "Conformità schede tecniche",
  other: "Altro",
};

export type LandingLead = {
  name: string;
  company: string;
  intent: LandingIntent;
  intentLabel: string;
  contact: string;
  contactKind: "email" | "phone";
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanLine(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function isIntent(value: string): value is LandingIntent {
  return (LANDING_INTENTS as readonly string[]).includes(value);
}

export function parseLandingLead(body: {
  name?: unknown;
  company?: unknown;
  intent?: unknown;
  custom?: unknown;
  contact?: unknown;
}): LandingLead | undefined {
  const name = cleanLine(body.name, 80);
  const company = cleanLine(body.company, 80);
  const intentRaw = cleanLine(body.intent, 20);
  const custom = cleanLine(body.custom, 80);
  const contact = cleanLine(body.contact, 120);
  if (name.length < 2 || company.length < 2 || !isIntent(intentRaw)) return undefined;
  if (intentRaw === "other" && custom.length < 2) return undefined;

  const contactKind = contactKindOf(contact);
  if (!contactKind) return undefined;

  return {
    name,
    company,
    intent: intentRaw,
    intentLabel: intentRaw === "other" ? custom : INTENT_LABELS[intentRaw],
    contact,
    contactKind,
  };
}

export function contactKindOf(value: string): "email" | "phone" | undefined {
  const trimmed = value.trim();
  if (EMAIL_PATTERN.test(trimmed) && trimmed.length <= 120) return "email";
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length >= 8 && digits.length <= 15 && /^[+\d\s()./-]+$/.test(trimmed)) {
    return "phone";
  }
  return undefined;
}

export function landingLeadMessage(
  lead: LandingLead,
  sourceUrl: string,
  oppref?: string,
): { subject: string; text: string; replyTo: string } {
  const subject = `Richiesta landing — ${lead.company}`;
  const lines = [
    "Richiesta dalla landing ordini e DDT.",
    "",
    `Nome: ${lead.name}`,
    `Azienda: ${lead.company}`,
    `Da portare nel gestionale: ${lead.intentLabel}`,
    `Recapito: ${lead.contact}`,
    `Pagina: ${sourceUrl}`,
  ];
  if (oppref) lines.push(`Clic annuncio: ${oppref}`);
  return {
    subject,
    text: lines.join("\n"),
    replyTo: lead.contactKind === "email" ? lead.contact : CONTACT.email,
  };
}
