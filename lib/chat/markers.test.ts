import { describe, expect, it } from "vitest";

import type { DiagnosticSummary } from "./diagnostic";
import {
  DIAGNOSTIC_FORM,
  EMAIL_FORM,
  MEETING_FORM,
  extractDiagnosticForm,
  extractEmailForm,
  extractFormJson,
  extractMeetingForm,
  stripFormMarkers,
  wrapDiagnosticForm,
} from "./markers";

const diagnostic: DiagnosticSummary = {
  clientName: "Ada Lovelace",
  clientEmail: "ada@example.com",
  sector: "Manufacturing",
  process: "Order processing",
  currentWorkflow: "Orders are copied manually into the ERP.",
  bottlenecks: ["Manual data entry"],
  currentSystems: ["Email", "ERP"],
  volumesAndFrequency: "500 orders per week",
  baselineMetrics: ["15 minutes per order"],
  dataAvailable: ["Historical orders in CSV"],
  constraints: ["No ERP API"],
  desiredOutcomes: ["Reduce processing time"],
  needCategories: ["document_erp"],
  opportunities: ["Automate extraction"],
  recommendations: ["Run a pilot"],
  openQuestions: [],
  nextSteps: ["Export sample orders"],
  language: "en",
};

describe("chat form markers", () => {
  it("extracts the existing email and meeting marker formats", () => {
    const email =
      'Draft\n<!--EMAIL_FORM-->{"subject":"Hello"}<!--/EMAIL_FORM-->';
    const meeting =
      'Book\n<!--MEETING_FORM-->{"date":"2026-07-20"}<!--/MEETING_FORM-->';

    expect(extractEmailForm<{ subject: string }>(email)).toEqual({
      subject: "Hello",
    });
    expect(extractMeetingForm<{ date: string }>(meeting)).toEqual({
      date: "2026-07-20",
    });
    expect(EMAIL_FORM).toBe("EMAIL_FORM");
    expect(MEETING_FORM).toBe("MEETING_FORM");
  });

  it("tolerates whitespace around marker names and payloads", () => {
    const content =
      '<!--  EMAIL_FORM  -->\n  {"subject":"Hello"}\n<!-- /EMAIL_FORM -->';

    expect(extractFormJson(content, EMAIL_FORM)).toEqual({
      subject: "Hello",
    });
  });

  it("returns null for malformed or non-object JSON", () => {
    expect(
      extractFormJson("<!--EMAIL_FORM-->{bad<!--/EMAIL_FORM-->", EMAIL_FORM),
    ).toBeNull();
    expect(
      extractFormJson("<!--EMAIL_FORM-->[]<!--/EMAIL_FORM-->", EMAIL_FORM),
    ).toBeNull();
  });

  it("wraps and validates a diagnostic form", () => {
    const wrapped = wrapDiagnosticForm(diagnostic);

    expect(wrapped).toContain(`<!--${DIAGNOSTIC_FORM}-->`);
    expect(extractDiagnosticForm(wrapped)).toEqual(diagnostic);
  });

  it("rejects an invalid diagnostic payload", () => {
    const invalid =
      '<!--DIAGNOSTIC_FORM-->{"clientName":"Ada"}<!--/DIAGNOSTIC_FORM-->';

    expect(extractDiagnosticForm(invalid)).toBeNull();
  });

  it("strips all supported form markers while preserving text", () => {
    const content = [
      "Before",
      '<!--EMAIL_FORM-->{"subject":"Hi"}<!--/EMAIL_FORM-->',
      '<!--MEETING_FORM-->{"date":"2026-07-20"}<!--/MEETING_FORM-->',
      wrapDiagnosticForm(diagnostic),
      "After",
    ].join("\n");

    expect(stripFormMarkers(content)).toBe("Before\n\nAfter");
  });
});
