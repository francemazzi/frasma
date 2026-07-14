import type { DiagnosticSummary } from "../chat/diagnostic";

export type DiagnosticEmail = {
  subject: string;
  text: string;
};

const needCategoryLabels: Record<
  DiagnosticSummary["needCategories"][number],
  { it: string; en: string }
> = {
  document_erp: { it: "Documenti / ERP", en: "Documents / ERP" },
  workflow: { it: "Workflow", en: "Workflow" },
  ticketing: { it: "Ticketing", en: "Ticketing" },
  dataset_benchmark: {
    it: "Dataset e benchmark",
    en: "Dataset and benchmarking",
  },
  ai_optimization: {
    it: "Ottimizzazione con AI",
    en: "AI optimization",
  },
  company_wiki: { it: "Wiki aziendale", en: "Company wiki" },
  ai_presence: { it: "Presenza AI", en: "AI presence" },
};

function cleanSubjectPart(value: string): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function list(items: string[], emptyLabel: string): string {
  return items.length > 0
    ? items.map((item) => `- ${item}`).join("\n")
    : `- ${emptyLabel}`;
}

export function buildDiagnosticEmail(
  summary: DiagnosticSummary,
): DiagnosticEmail {
  const language = summary.language;
  const isItalian = language === "it";
  const emptyLabel = isItalian ? "Non specificato" : "Not specified";
  const company = summary.clientCompany?.trim() || emptyLabel;
  const labels = isItalian
    ? {
        subject: "Nuova sintesi diagnostica",
        heading: "Nuova sintesi diagnostica ricevuta",
        contact: "Contatto",
        name: "Nome",
        email: "Email",
        company: "Azienda",
        context: "Contesto operativo",
        sector: "Settore",
        process: "Processo",
        workflow: "Workflow attuale",
        bottlenecks: "Colli di bottiglia",
        systems: "Sistemi attuali",
        volumes: "Volumi e frequenza",
        metrics: "Metriche di partenza",
        data: "Dati disponibili",
        constraints: "Vincoli",
        outcomes: "Risultati desiderati",
        needs: "Categorie di esigenza",
        opportunities: "Opportunità",
        recommendations: "Raccomandazioni",
        questions: "Domande aperte",
        nextSteps: "Prossimi passi",
      }
    : {
        subject: "New diagnostic summary",
        heading: "New diagnostic summary received",
        contact: "Contact",
        name: "Name",
        email: "Email",
        company: "Company",
        context: "Operational context",
        sector: "Sector",
        process: "Process",
        workflow: "Current workflow",
        bottlenecks: "Bottlenecks",
        systems: "Current systems",
        volumes: "Volumes and frequency",
        metrics: "Baseline metrics",
        data: "Available data",
        constraints: "Constraints",
        outcomes: "Desired outcomes",
        needs: "Need categories",
        opportunities: "Opportunities",
        recommendations: "Recommendations",
        questions: "Open questions",
        nextSteps: "Next steps",
      };

  const subjectName = cleanSubjectPart(summary.clientName);
  const subjectProcess = cleanSubjectPart(summary.process);
  const subject = `[Frasma] ${labels.subject}: ${subjectName} — ${subjectProcess}`;
  const needs = summary.needCategories.map(
    (category) => needCategoryLabels[category][language],
  );

  const text = [
    labels.heading,
    "",
    `## ${labels.contact}`,
    `${labels.name}: ${summary.clientName}`,
    `${labels.email}: ${summary.clientEmail}`,
    `${labels.company}: ${company}`,
    "",
    `## ${labels.context}`,
    `${labels.sector}: ${summary.sector}`,
    `${labels.process}: ${summary.process}`,
    `${labels.workflow}: ${summary.currentWorkflow}`,
    `${labels.volumes}: ${summary.volumesAndFrequency}`,
    "",
    `## ${labels.bottlenecks}`,
    list(summary.bottlenecks, emptyLabel),
    "",
    `## ${labels.systems}`,
    list(summary.currentSystems, emptyLabel),
    "",
    `## ${labels.metrics}`,
    list(summary.baselineMetrics, emptyLabel),
    "",
    `## ${labels.data}`,
    list(summary.dataAvailable, emptyLabel),
    "",
    `## ${labels.constraints}`,
    list(summary.constraints, emptyLabel),
    "",
    `## ${labels.outcomes}`,
    list(summary.desiredOutcomes, emptyLabel),
    "",
    `## ${labels.needs}`,
    list(needs, emptyLabel),
    "",
    `## ${labels.opportunities}`,
    list(summary.opportunities, emptyLabel),
    "",
    `## ${labels.recommendations}`,
    list(summary.recommendations, emptyLabel),
    "",
    `## ${labels.questions}`,
    list(summary.openQuestions, emptyLabel),
    "",
    `## ${labels.nextSteps}`,
    list(summary.nextSteps, emptyLabel),
  ].join("\n");

  return { subject, text };
}
