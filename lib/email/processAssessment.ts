import type { ProcessAssessment } from "../processAssessment";

function valueOrDash(value?: string): string {
  return value?.trim() || "—";
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function buildProcessAssessmentEmail(input: ProcessAssessment): {
  subject: string;
  text: string;
} {
  const company = valueOrDash(input.company);

  return {
    subject: `Valutazione processo${
      input.company ? ` — ${singleLine(input.company)}` : ""
    }`,
    text: [
      "Nuova richiesta di valutazione processo",
      "",
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
