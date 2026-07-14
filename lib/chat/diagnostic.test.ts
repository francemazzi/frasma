import { describe, expect, it } from "vitest";

import {
  DiagnosticSummarySchema,
  checkDiagnosticCompleteness,
  safeParseDiagnosticSummary,
  type DiagnosticSummary,
} from "./diagnostic";

export const validDiagnostic: DiagnosticSummary = {
  clientName: "Ada Lovelace",
  clientEmail: "ada@example.com",
  clientCompany: "Analytical Engines Ltd",
  sector: "Manufacturing",
  process: "Order processing",
  currentWorkflow: "Orders are copied manually from email into the ERP.",
  bottlenecks: ["Manual data entry"],
  currentSystems: ["Email", "ERP"],
  volumesAndFrequency: "About 500 orders per week",
  baselineMetrics: ["15 minutes per order"],
  dataAvailable: ["Historical orders in CSV"],
  constraints: ["ERP has no public API"],
  desiredOutcomes: ["Reduce processing time"],
  needCategories: ["document_erp", "workflow"],
  opportunities: ["Automate order extraction"],
  recommendations: ["Run a two-week extraction pilot"],
  openQuestions: ["Can the ERP import CSV files?"],
  nextSteps: ["Export a representative order sample"],
  language: "en",
};

describe("DiagnosticSummarySchema", () => {
  it("validates a complete diagnostic summary", () => {
    expect(DiagnosticSummarySchema.parse(validDiagnostic)).toEqual(
      validDiagnostic,
    );
  });

  it("rejects unsafe or unsupported values", () => {
    expect(
      safeParseDiagnosticSummary({
        ...validDiagnostic,
        currentWorkflow: "x".repeat(2_001),
      }).success,
    ).toBe(false);
    expect(
      safeParseDiagnosticSummary({
        ...validDiagnostic,
        needCategories: ["unsupported"],
      }).success,
    ).toBe(false);
    expect(
      safeParseDiagnosticSummary({
        ...validDiagnostic,
        honeypot: "bot-filled",
      }).success,
    ).toBe(false);
  });

  it("returns a safe failure for malformed JSON text", () => {
    expect(safeParseDiagnosticSummary('{"clientName":')).toMatchObject({
      success: false,
    });
  });
});

describe("checkDiagnosticCompleteness", () => {
  it("returns 100 for a complete summary", () => {
    expect(checkDiagnosticCompleteness(validDiagnostic)).toEqual({
      missingFields: [],
      score: 100,
    });
  });

  it("reports absent and invalid required fields", () => {
    const incomplete = {
      ...validDiagnostic,
      clientEmail: "not-an-email",
      recommendations: [],
    };

    expect(checkDiagnosticCompleteness(incomplete)).toEqual({
      missingFields: ["clientEmail", "recommendations"],
      score: 89,
    });
  });

  it("handles non-object input", () => {
    const result = checkDiagnosticCompleteness(null);

    expect(result.score).toBe(0);
    expect(result.missingFields).toHaveLength(18);
  });
});
