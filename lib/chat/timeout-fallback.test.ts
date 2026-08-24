import { describe, expect, it } from "vitest";
import {
  buildProjectSummary,
  buildTimeoutFallbackResponse,
  extractContactHints,
} from "./timeout-fallback";
import { extractProjectBriefForm } from "./markers";

describe("timeout fallback", () => {
  it("extracts email and name hints from user messages", () => {
    const hints = extractContactHints(
      [
        { role: "user", content: "Ciao, sono Ada Lovelace" },
        {
          role: "user",
          content: "La mia email e ada@example.com per il progetto DDT",
        },
      ],
      "it",
    );

    expect(hints.email).toBe("ada@example.com");
    expect(hints.clientName).toBe("Ada Lovelace");
  });

  it("truncates long project summaries", () => {
    const summary = buildProjectSummary(
      [{ role: "user", content: "x".repeat(3_000) }],
      "it",
    );

    expect(summary.length).toBeLessThanOrEqual(2_000);
    expect(summary.endsWith("…")).toBe(true);
  });

  it("builds a project brief form for timeout fallback", () => {
    const response = buildTimeoutFallbackResponse({
      messages: [
        {
          role: "user",
          content: "Vorrei automatizzare l'import DDT via email",
        },
      ],
      lang: "it",
      timezone: "Europe/Rome",
      pagePath: "/manifattura",
    });

    expect(response).toContain("PROJECT_BRIEF_FORM");
    expect(response).not.toContain("EMAIL_FORM");
    expect(response).not.toContain("MEETING_FORM");
    expect(response).toContain("brief di processo");

    const brief = extractProjectBriefForm(response);
    expect(brief?.process).toContain("import DDT via email");
    expect(brief?.process).toContain("/manifattura");
  });

  it("prefers registered visitor details over chat hints", () => {
    const response = buildTimeoutFallbackResponse({
      messages: [
        { role: "user", content: "Ciao, sono Mario. Email mario@example.com" },
      ],
      lang: "it",
      timezone: "Europe/Rome",
      visitor: {
        name: "Ada Lovelace",
        email: "ada@example.com",
        company: "Analytical Engines",
      },
    });

    const brief = extractProjectBriefForm(response);
    expect(brief?.name).toBe("Ada Lovelace");
    expect(brief?.clientEmail).toBe("ada@example.com");
    expect(brief?.company).toBe("Analytical Engines");
  });

  it("builds an English brief and pads a short process", () => {
    const response = buildTimeoutFallbackResponse({
      messages: [],
      lang: "en",
      timezone: "Europe/Rome",
      pagePath: "/",
    });

    expect(response).toContain("process brief");
    expect(response).not.toContain("EMAIL_FORM");
    const brief = extractProjectBriefForm(response);
    expect(brief?.process?.length).toBeGreaterThanOrEqual(20);
    expect(brief?.name).toBe("Chat visitor");
  });
});
