import {
  describeChannel,
  deriveLeadChannel,
  type LeadChannel,
} from "../leads/channel";
import type { LeadSource, ProcessAssessment } from "../processAssessment";

export type ProcessAssessmentEmailLocale = "it" | "en";

export type BuildProcessAssessmentEmailOptions = {
  source: LeadSource;
  lang?: ProcessAssessmentEmailLocale;
  /** Defaults to the channel derived from the source and utm attribution. */
  channel?: LeadChannel;
};

function valueOrDash(value?: string): string {
  return value?.trim() || "—";
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function utmSuffix(input: ProcessAssessment): string {
  const parts = [
    input.utmCampaign ? `utm_campaign=${input.utmCampaign}` : undefined,
    input.utmContent ? `utm_content=${input.utmContent}` : undefined,
  ].filter((part) => part !== undefined);
  return parts.length > 0 ? ` (${parts.join(", ")})` : "";
}

function channelLines(
  input: ProcessAssessment,
  channel: LeadChannel,
  lang: ProcessAssessmentEmailLocale,
): string[] {
  const isEn = lang === "en";
  const channelLabel = isEn ? "Channel" : "Canale";
  const pageLabel = isEn ? "Page" : "Pagina";
  return [
    `${channelLabel}: ${describeChannel(channel, lang)}${utmSuffix(input)}`,
    ...(input.landingPath ? [`${pageLabel}: ${input.landingPath}`] : []),
  ];
}

export function buildProcessAssessmentEmail(
  input: ProcessAssessment,
  options: BuildProcessAssessmentEmailOptions = { source: "form" },
): {
  subject: string;
  text: string;
} {
  const lang = options.lang === "en" ? "en" : "it";
  const isEn = lang === "en";
  const company = valueOrDash(input.company);
  const sourceLabel = isEn
    ? options.source === "chat"
      ? "Chat"
      : "Landing form"
    : options.source === "chat"
      ? "Chat"
      : "Form landing";
  const subjectCompany = input.company
    ? ` — ${singleLine(input.company)}`
    : input.name
      ? ` — ${singleLine(input.name)}`
      : "";
  const channel = options.channel ?? deriveLeadChannel(input, options.source);
  // Only ChatGPT ad leads are flagged in the subject: other channels keep it.
  const subjectChannel =
    channel === "chatgpt_ads"
      ? isEn
        ? " (ChatGPT ad)"
        : " (annuncio ChatGPT)"
      : "";
  const attributionLines = channelLines(input, channel, lang);

  if (isEn) {
    return {
      subject: `Process assessment${subjectCompany}${subjectChannel}`,
      text: [
        "New process assessment for a quote",
        "",
        `Source: ${sourceLabel}`,
        ...attributionLines,
        `Name: ${singleLine(input.name)}`,
        `Email: ${input.clientEmail}`,
        `Company: ${company}`,
        `Role: ${valueOrDash(input.role)}`,
        "",
        "Process and main issue",
        input.process,
        "",
        "Current tools",
        valueOrDash(input.systems),
        "",
        "Approximate volume",
        valueOrDash(input.volume),
      ].join("\n"),
    };
  }

  return {
    subject: `Valutazione processo${subjectCompany}${subjectChannel}`,
    text: [
      "Nuova richiesta di valutazione processo per preventivo",
      "",
      `Fonte: ${sourceLabel}`,
      ...attributionLines,
      `Nome: ${singleLine(input.name)}`,
      `Email: ${input.clientEmail}`,
      `Azienda: ${company}`,
      `Ruolo: ${valueOrDash(input.role)}`,
      "",
      "Processo e problema principale",
      input.process,
      "",
      "Strumenti attuali",
      valueOrDash(input.systems),
      "",
      "Volume approssimativo",
      valueOrDash(input.volume),
    ].join("\n"),
  };
}
