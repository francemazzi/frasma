import { en } from "../i18n/en";
import { it } from "../i18n/it";
import {
  stripFormMarkers,
  wrapProjectBriefForm,
} from "./markers";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type TimeoutFallbackInput = {
  messages: ChatMessage[];
  lang: "it" | "en";
  timezone: string;
  pagePath?: string;
  visitor?: {
    name?: string;
    email?: string;
    company?: string;
  };
};

export type ContactHints = {
  email: string;
  clientName: string;
};

const EMAIL_RE =
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const MAX_PROJECT_SUMMARY_LENGTH = 2_000;
const MIN_PROCESS_LENGTH = 20;

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
      ? "Process context collected during the chat (no user details captured yet)."
      : "Contesto processo raccolto in chat (nessun dettaglio utente ancora disponibile).";
  }

  const lines = userMessages.map((content) => `- ${content.replace(/\s+/g, " ")}`);
  let summary = lines.join("\n");

  if (summary.length > MAX_PROJECT_SUMMARY_LENGTH) {
    summary = `${summary.slice(0, MAX_PROJECT_SUMMARY_LENGTH - 1).trim()}…`;
  }

  return summary;
}

function ensureProcessLength(process: string, lang: "it" | "en"): string {
  const trimmed = process.trim();
  if (trimmed.length >= MIN_PROCESS_LENGTH) {
    return trimmed.slice(0, MAX_PROJECT_SUMMARY_LENGTH);
  }

  const pad =
    lang === "en"
      ? " Process details collected from the chat timeout."
      : " Dettagli processo raccolti al timeout della chat.";
  return `${trimmed}${pad}`.trim().slice(0, MAX_PROJECT_SUMMARY_LENGTH);
}

export function buildTimeoutFallbackResponse(input: TimeoutFallbackInput): string {
  const lang = input.lang ?? "it";
  const dictionary = getDictionary(lang);
  const intro =
    dictionary["chat.timeout.intro"] ??
    (lang === "en"
      ? "The reply took too long. I prepared a process brief to send for a quote."
      : "La risposta ha impiegato troppo tempo. Ho preparato il brief di processo da inviare per il preventivo.");

  const summary = buildProjectSummary(input.messages, lang);
  const hints = extractContactHints(input.messages, lang);
  const name = input.visitor?.name?.trim() || hints.clientName;
  const email = input.visitor?.email?.trim() || hints.email;
  const company = input.visitor?.company?.trim();
  const pagePath = input.pagePath?.trim() || "/";

  const timeoutNote =
    lang === "en"
      ? `\nPage context: ${pagePath}.`
      : `\nPagina visitata: ${pagePath}.`;

  const briefIntro =
    lang === "en"
      ? "Review the process brief before sending it:"
      : "Rivedi il brief di processo prima di inviarlo:";

  return [
    intro,
    "",
    briefIntro,
    wrapProjectBriefForm({
      name,
      clientEmail: email,
      ...(company ? { company } : {}),
      process: ensureProcessLength(`${summary}${timeoutNote}`, lang),
    }),
  ].join("\n");
}
