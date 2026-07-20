export type QuoteEmailInput = {
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
  projectDescription: string;
  budget?: string;
  timeline?: string;
  notes?: string;
  locale?: "it" | "en";
};

export type QuoteEmailDraft = {
  subject: string;
  body: string;
  clientEmail: string;
  clientName: string;
};

/** Builds a structured quote-request draft without a nested LLM call (avoids chat timeouts). */
export function buildQuoteEmailDraft(input: QuoteEmailInput): QuoteEmailDraft {
  const locale = input.locale ?? "it";
  const isEn = locale === "en";
  const notSpecified = isEn ? "Not specified" : "Non specificato";
  const none = isEn ? "None" : "Nessuna";

  const projectSnippet = input.projectDescription.trim().slice(0, 60);
  const subject = isEn
    ? `Quote request — ${projectSnippet} — ${input.clientName}`
    : `Richiesta preventivo — ${projectSnippet} — ${input.clientName}`;

  const body = isEn
    ? [
        "Quote request for Francesco Saverio Mazzi",
        "",
        "Contact",
        `- Name: ${input.clientName}`,
        `- Email: ${input.clientEmail || notSpecified}`,
        `- Company: ${input.clientCompany?.trim() || notSpecified}`,
        "",
        "Project",
        input.projectDescription.trim(),
        "",
        "Budget / timeline",
        `- Budget: ${input.budget?.trim() || notSpecified}`,
        `- Timeline: ${input.timeline?.trim() || notSpecified}`,
        "",
        "Additional notes",
        input.notes?.trim() || none,
        "",
        "Next steps: please review and reply with a detailed quote. Do not include hour estimates or pricing in this draft.",
      ].join("\n")
    : [
        "Richiesta di preventivo per Francesco Saverio Mazzi",
        "",
        "Contatto",
        `- Nome: ${input.clientName}`,
        `- Email: ${input.clientEmail || notSpecified}`,
        `- Azienda: ${input.clientCompany?.trim() || notSpecified}`,
        "",
        "Progetto",
        input.projectDescription.trim(),
        "",
        "Budget / tempistica",
        `- Budget: ${input.budget?.trim() || notSpecified}`,
        `- Tempistica: ${input.timeline?.trim() || notSpecified}`,
        "",
        "Note aggiuntive",
        input.notes?.trim() || none,
        "",
        "Prossimi passi: Francesco esaminerà la richiesta e risponderà con un preventivo dettagliato. Non includere stime orarie o prezzi in questa bozza.",
      ].join("\n");

  return {
    subject,
    body,
    clientEmail: input.clientEmail,
    clientName: input.clientName,
  };
}
