import { describe, expect, it } from "vitest";

import {
  runGetDiagnosticFramework,
  runGetFrasmaProfile,
  runPrepareDiagnosticSummary,
  runSearchFrasmaKnowledge,
} from "./tools";

describe("MCP tool handlers", () => {
  it("returns a localized profile with discovery URLs", () => {
    const result = runGetFrasmaProfile({ locale: "en" });
    const payload = JSON.parse(result.content[0]?.text ?? "{}");

    expect(result.isError).toBeUndefined();
    expect(payload.name).toBe("Frasma");
    expect(payload.discovery.mcp).toContain("/api/mcp");
    expect(payload.discovery.forAgents).toContain("/for-agents");
    expect(payload.commercialLimits.join(" ")).toContain("does not promise");
  });

  it("searches knowledge for ERP delivery notes", () => {
    const result = runSearchFrasmaKnowledge({
      query: "Mago Zucchetti ERP",
      locale: "it",
    });
    const payload = JSON.parse(result.content[0]?.text ?? "[]");

    expect(result.isError).toBeUndefined();
    expect(payload[0]?.id).toBe("delivery-notes-to-erp");
  });

  it("returns the diagnostic framework", () => {
    const result = runGetDiagnosticFramework({ locale: "en" });
    const payload = JSON.parse(result.content[0]?.text ?? "{}");

    expect(payload.steps.map((step: { id: string }) => step.id)).toEqual([
      "observe",
      "baseline",
      "prototype",
      "evaluate",
    ]);
  });

  it("rejects incomplete diagnostic summaries and returns handoff guidance", () => {
    const result = runPrepareDiagnosticSummary({
      clientName: "Ada",
      language: "en",
    });
    const payload = JSON.parse(result.content[0]?.text ?? "{}");

    expect(result.isError).toBe(true);
    expect(payload.ok).toBe(false);
    expect(payload.completeness.score).toBeLessThan(100);
    expect(payload.handoff.emailEndpoint).toContain(
      "/api/send-diagnostic-summary",
    );
  });

  it("accepts a complete diagnostic summary without sending email", () => {
    const summary = {
      clientName: "Ada Lovelace",
      clientEmail: "ada@example.com",
      clientCompany: "Analytical Engines",
      sector: "manufacturing",
      process: "Delivery notes into ERP",
      currentWorkflow:
        "Operators retype delivery-note fields from PDF into Mago Zucchetti.",
      bottlenecks: ["Manual copy-paste", "Late stock updates"],
      currentSystems: ["Email", "PDF", "Mago Zucchetti"],
      volumesAndFrequency: "About 40 DDT per day",
      baselineMetrics: ["~8 minutes per document"],
      dataAvailable: ["Anonymized PDF samples"],
      constraints: ["Human validation required before import"],
      desiredOutcomes: ["Faster controlled import with review flags"],
      needCategories: ["document_erp"],
      opportunities: ["Controlled extraction with review queue"],
      recommendations: ["Prototype on representative anonymized DDT"],
      openQuestions: ["Which Mago fields are mandatory?"],
      nextSteps: ["Review summary and schedule a call"],
      language: "en",
    };

    const result = runPrepareDiagnosticSummary(summary);
    const payload = JSON.parse(result.content[0]?.text ?? "{}");

    expect(result.isError).toBeUndefined();
    expect(payload.ok).toBe(true);
    expect(payload.summary.clientEmail).toBe("ada@example.com");
    expect(payload.handoff.instructions).toContain("never sends email");
  });
});
