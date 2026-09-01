import type { LeadSource, ProcessAssessment } from "../processAssessment";

export const RICERCA_CLIENTI_DATABASE_ID =
  "32e90196-c414-80b3-9a53-c00ffe4019c9";

const NOTION_VERSION = "2022-06-28";
const RICH_TEXT_LIMIT = 1900;
const TITLE_LIMIT = 120;

export type NotionLeadPage = {
  pageId: string;
  url: string;
};

export type NotionLeadInput = ProcessAssessment & {
  source: LeadSource;
  leadId?: string;
};

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function clip(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trimEnd()}…`;
}

function valueOrDash(value?: string): string {
  return value?.trim() || "—";
}

export function getNotionToken(): string | undefined {
  return process.env.NOTION_TOKEN?.trim() || undefined;
}

export function getRicercaClientiDatabaseId(): string {
  return (
    process.env.NOTION_LEADS_DATABASE_ID?.trim() || RICERCA_CLIENTI_DATABASE_ID
  );
}

export function isNotionConfigured(): boolean {
  return Boolean(getNotionToken());
}

export function buildRicercaClientiTitle(input: NotionLeadInput): string {
  const company = input.company?.trim();
  if (company) return clip(singleLine(company), TITLE_LIMIT);
  return clip(singleLine(input.name), TITLE_LIMIT);
}

export function buildRicercaClientiDescription(input: NotionLeadInput): string {
  const sourceLabel = input.source === "chat" ? "Chat" : "Form landing";
  return clip(
    [
      `Fonte: ${sourceLabel}`,
      `Nome: ${singleLine(input.name)}`,
      `Email: ${input.clientEmail}`,
      `Ruolo: ${valueOrDash(input.role)}`,
      input.leadId ? `Lead ID: ${input.leadId}` : undefined,
      "",
      "Processo e problema principale",
      input.process.trim(),
      "",
      "Strumenti attuali",
      valueOrDash(input.systems),
      "",
      "Volume approssimativo",
      valueOrDash(input.volume),
    ]
      .filter((line) => line !== undefined)
      .join("\n"),
    RICH_TEXT_LIMIT,
  );
}

function todayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function buildRicercaClientiProperties(input: NotionLeadInput): Record<
  string,
  unknown
> {
  const properties: Record<string, unknown> = {
    "Nome azienda": {
      title: [{ type: "text", text: { content: buildRicercaClientiTitle(input) } }],
    },
    email: {
      email: input.clientEmail.trim(),
    },
    descrizione: {
      rich_text: [
        {
          type: "text",
          text: { content: buildRicercaClientiDescription(input) },
        },
      ],
    },
    "Problema potenziale": {
      rich_text: [
        {
          type: "text",
          text: { content: clip(input.process.trim(), RICH_TEXT_LIMIT) },
        },
      ],
    },
    Status: {
      status: { name: "[1] contattati" },
    },
    "Call fissata": {
      select: { name: "no" },
    },
    "Modalità primo contatto": {
      multi_select: [{ name: "email dal sito" }],
    },
    "Data primo contatto": {
      date: { start: todayDate() },
    },
    url: {
      url: "https://www.frasma.org",
    },
  };

  if (input.leadId) {
    properties["Lead ID"] = {
      rich_text: [{ type: "text", text: { content: input.leadId } }],
    };
  }

  return properties;
}

export async function createRicercaClientiLead(
  input: NotionLeadInput,
): Promise<NotionLeadPage | undefined> {
  const token = getNotionToken();
  if (!token) return undefined;

  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Notion-Version": NOTION_VERSION,
      },
      body: JSON.stringify({
        parent: { database_id: getRicercaClientiDatabaseId() },
        properties: buildRicercaClientiProperties(input),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error(
        `[leads] Notion create failed with status ${response.status}.`,
        detail,
      );
      return undefined;
    }

    const created = (await response.json()) as { id?: string; url?: string };
    if (!created.id || !created.url) return undefined;
    return { pageId: created.id, url: created.url };
  } catch (error) {
    console.error("[leads] Failed to create Notion lead.", error);
    return undefined;
  }
}
