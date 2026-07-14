import { describe, expect, it } from "vitest";
import type { DiagnosticSummary } from "../chat/diagnostic";
import { buildDiagnosticEmail } from "./diagnostic";

const baseSummary: DiagnosticSummary = {
  clientName: "Ada Lovelace",
  clientEmail: "ada@example.com",
  clientCompany: "Analytical Engines",
  sector: "Manufacturing",
  process: "Quality inspection",
  currentWorkflow: "Operators inspect every item manually.",
  bottlenecks: ["Inspection is slow", "Results are recorded twice"],
  currentSystems: ["ERP", "Spreadsheets"],
  volumesAndFrequency: "2,000 items per week",
  baselineMetrics: ["12 minutes per inspection"],
  dataAvailable: ["Inspection reports"],
  constraints: ["The ERP cannot be replaced"],
  desiredOutcomes: ["Reduce inspection time"],
  needCategories: ["workflow", "ai_optimization"],
  opportunities: ["Automate report classification"],
  recommendations: ["Start with a four-week pilot"],
  openQuestions: ["Is historical image data available?"],
  nextSteps: ["Validate the pilot dataset"],
  language: "en",
};

describe("buildDiagnosticEmail", () => {
  it("builds a clear English plain-text email", () => {
    const email = buildDiagnosticEmail(baseSummary);

    expect(email.subject).toBe(
      "[Frasma] New diagnostic summary: Ada Lovelace — Quality inspection",
    );
    expect(email.text).toContain("New diagnostic summary received");
    expect(email.text).toContain("Company: Analytical Engines");
    expect(email.text).toContain("## Bottlenecks");
    expect(email.text).toContain("- Inspection is slow");
    expect(email.text).toContain("- AI optimization");
    expect(email.text).not.toContain("<html");
  });

  it("localizes the subject and content in Italian", () => {
    const email = buildDiagnosticEmail({
      ...baseSummary,
      clientCompany: undefined,
      language: "it",
    });

    expect(email.subject).toBe(
      "[Frasma] Nuova sintesi diagnostica: Ada Lovelace — Quality inspection",
    );
    expect(email.text).toContain("Nuova sintesi diagnostica ricevuta");
    expect(email.text).toContain("Azienda: Non specificato");
    expect(email.text).toContain("## Colli di bottiglia");
    expect(email.text).toContain("- Ottimizzazione con AI");
  });

  it("removes line breaks from subject fields", () => {
    const email = buildDiagnosticEmail({
      ...baseSummary,
      clientName: "Ada\r\nLovelace",
      process: "Quality\ninspection",
    });

    expect(email.subject).toBe(
      "[Frasma] New diagnostic summary: Ada Lovelace — Quality inspection",
    );
  });
});
