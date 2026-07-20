import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildProjectSummary,
  buildTimeoutFallbackResponse,
  extractContactHints,
  getNextBusinessDay,
} from "./timeout-fallback";
import {
  extractEmailForm,
  extractMeetingForm,
} from "./markers";

describe("timeout fallback", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

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

  it("builds email and meeting forms for timeout fallback", () => {
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

    expect(response).toContain("EMAIL_FORM");
    expect(response).toContain("MEETING_FORM");
    expect(response).toContain("incontro online");

    const emailForm = extractEmailForm<{
      subject: string;
      body: string;
      clientEmail: string;
      clientName: string;
    }>(response);
    const meetingForm = extractMeetingForm<{
      date: string;
      time: string;
      email: string;
      description: string;
      timezone: string;
    }>(response);

    expect(emailForm?.subject).toContain("Richiesta preventivo");
    expect(emailForm?.body).toContain("import DDT via email");
    expect(emailForm?.body).toContain("/manifattura");
    expect(meetingForm?.time).toBe("10:00");
    expect(meetingForm?.timezone).toBe("Europe/Rome");
    expect(meetingForm?.description).toContain("import DDT");
  });

  it("returns the next weekday in the requested timezone", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-18T10:00:00.000Z"));

    expect(getNextBusinessDay("Europe/Rome")).toBe("2026-07-20");
  });
});
