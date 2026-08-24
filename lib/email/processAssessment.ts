import type { LeadSource, ProcessAssessment } from "../processAssessment";

export type ProcessAssessmentEmailLocale = "it" | "en";

export type BuildProcessAssessmentEmailOptions = {
  source: LeadSource;
  lang?: ProcessAssessmentEmailLocale;
};

function valueOrDash(value?: string): string {
  return value?.trim() || "—";
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
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

  if (isEn) {
    return {
      subject: `Process assessment${subjectCompany}`,
      text: [
        "New process assessment for a quote",
        "",
        `Source: ${sourceLabel}`,
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
    subject: `Valutazione processo${subjectCompany}`,
    text: [
      "Nuova richiesta di valutazione processo per preventivo",
      "",
      `Fonte: ${sourceLabel}`,
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
