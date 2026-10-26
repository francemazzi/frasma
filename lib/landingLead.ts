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
  email: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanLine(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function isIntent(value: string): value is LandingIntent {
  return (LANDING_INTENTS as readonly string[]).includes(value);
}

export function normalizeWorkEmail(value: unknown): string | undefined {
  const email = cleanLine(value, 120).toLowerCase();
  if (!email || !EMAIL_PATTERN.test(email)) return undefined;
  return email;
}

export function parseLandingLead(body: {
  name?: unknown;
  company?: unknown;
  intent?: unknown;
  custom?: unknown;
  email?: unknown;
}): LandingLead | undefined {
  const name = cleanLine(body.name, 80);
  const company = cleanLine(body.company, 80);
  const intentRaw = cleanLine(body.intent, 20);
  const custom = cleanLine(body.custom, 80);
  const email = normalizeWorkEmail(body.email);
  if (name.length < 2 || company.length < 2 || !isIntent(intentRaw) || !email) return undefined;
  if (intentRaw === "other" && custom.length < 2) return undefined;

  return {
    name,
    company,
    intent: intentRaw,
    intentLabel: intentRaw === "other" ? custom : INTENT_LABELS[intentRaw],
    email,
  };
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
    `Email: ${lead.email}`,
    `Pagina: ${sourceUrl}`,
  ];
  if (oppref) lines.push(`Clic annuncio: ${oppref}`);
  return {
    subject,
    text: lines.join("\n"),
    replyTo: lead.email,
  };
}
