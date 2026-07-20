import { en } from "../i18n/en";
import { it } from "../i18n/it";
import { stripFormMarkers, wrapForm, EMAIL_FORM, MEETING_FORM } from "./markers";
import { buildQuoteEmailDraft } from "./quote-email";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type TimeoutFallbackInput = {
  messages: ChatMessage[];
  lang: "it" | "en";
  timezone: string;
  pagePath?: string;
};

export type ContactHints = {
  email: string;
  clientName: string;
};

const EMAIL_RE =
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const MAX_PROJECT_SUMMARY_LENGTH = 2_000;
const MAX_MEETING_DESCRIPTION_LENGTH = 500;

function getDictionary(lang: "it" | "en"): Record<string, string> {
  return lang === "en" ? en : it;
}

function normalizeUserContent(content: string): string {
  return stripFormMarkers(content).trim();
}

export function extractContactHints(
  messages: ChatMessage[],
  lang: "it" | "en" = "it",
): ContactHints {
  const fallbackName = lang === "en" ? "Chat visitor" : "Visitatore chat";

  let email = "";
  let clientName = fallbackName;

  for (const message of messages) {
    if (message.role !== "user") continue;

    const text = normalizeUserContent(message.content);
    if (!text) continue;

    if (!email) {
      const match = EMAIL_RE.exec(text);
      if (match) email = match[0];
    }

    if (clientName === fallbackName) {
      const firstLine = text.split(/\r?\n/)[0]?.trim() ?? "";
      const nameMatch = firstLine.match(
        /(?:sono|mi chiamo|il mio nome e|my name is|i am|i'm)\s+([A-Za-zÀ-ÖØ-öø-ÿ' -]{2,60})/i,
      );
      if (nameMatch?.[1]) {
        clientName = nameMatch[1].trim();
      }
    }
  }

  return { email, clientName };
}

export function buildProjectSummary(
  messages: ChatMessage[],
  lang: "it" | "en",
): string {
  const userMessages = messages
    .filter((message) => message.role === "user")
    .map((message) => normalizeUserContent(message.content))
    .filter(Boolean);

  if (userMessages.length === 0) {
    return lang === "en"
      ? "Project context collected during the chat (no user details captured yet)."
      : "Contesto progetto raccolto in chat (nessun dettaglio utente ancora disponibile).";
  }

  const lines = userMessages.map((content) => `- ${content.replace(/\s+/g, " ")}`);
  let summary = lines.join("\n");

  if (summary.length > MAX_PROJECT_SUMMARY_LENGTH) {
    summary = `${summary.slice(0, MAX_PROJECT_SUMMARY_LENGTH - 1).trim()}…`;
  }

  return summary;
}

function formatDateInTimezone(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: timezone }).format(date);
}

function getWeekdayInTimezone(date: Date, timezone: string): number {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
  }).format(date);
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return map[weekday] ?? 1;
}

export function getNextBusinessDay(timezone: string): string {
  for (let offsetDays = 1; offsetDays <= 10; offsetDays += 1) {
    const candidate = new Date(Date.now() + offsetDays * 86_400_000);
    const weekday = getWeekdayInTimezone(candidate, timezone);
    if (weekday >= 1 && weekday <= 5) {
      return formatDateInTimezone(candidate, timezone);
    }
  }

  return formatDateInTimezone(new Date(Date.now() + 86_400_000), timezone);
}

function truncateText(value: string, maxLength: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength - 1).trim()}…`;
}

export function buildTimeoutFallbackResponse(input: TimeoutFallbackInput): string {
  const lang = input.lang ?? "it";
  const timezone = input.timezone?.trim() || "Europe/Rome";
  const dictionary = getDictionary(lang);
  const intro =
    dictionary["chat.timeout.intro"] ??
    (lang === "en"
      ? "The reply took too long. I prepared a project summary email draft and suggest booking an online meeting."
      : "La risposta ha impiegato troppo tempo. Ho preparato un riassunto del progetto da inviare via email e ti propongo un incontro online.");

  const summary = buildProjectSummary(input.messages, lang);
  const { email, clientName } = extractContactHints(input.messages, lang);
  const pagePath = input.pagePath?.trim() || "/";

  const timeoutNote =
    lang === "en"
      ? `Assistant reply timed out while processing the chat. Page context: ${pagePath}.`
      : `Timeout della risposta assistente durante la chat. Pagina visitata: ${pagePath}.`;

  const emailDraft = buildQuoteEmailDraft({
    clientName,
    clientEmail: email,
    projectDescription: summary,
    notes: timeoutNote,
    locale: lang,
  });

  const emailIntro =
    lang === "en" ? "Here's the draft:" : "Ecco la bozza:";
  const meetingIntro =
    lang === "en"
      ? "Here's the meeting request form:"
      : "Ecco il modulo per la richiesta di incontro:";

  const meetingPayload = {
    date: getNextBusinessDay(timezone),
    time: "10:00",
    email,
    description: truncateText(summary, MAX_MEETING_DESCRIPTION_LENGTH),
    timezone,
  };

  return [
    intro,
    "",
    emailIntro,
    wrapForm(EMAIL_FORM, emailDraft),
    "",
    meetingIntro,
    wrapForm(MEETING_FORM, meetingPayload),
  ].join("\n");
}
