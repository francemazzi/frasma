import { describe, expect, it } from "vitest";
import { buildProcessAssessmentEmail } from "./email/processAssessment";
import { ProcessAssessmentSchema } from "./processAssessment";

const validAssessment = {
  clientEmail: "operations@example.com",
  company: "Example Manufacturing",
  role: "Operations manager",
  process:
    "Orders arrive as PDF attachments and are copied manually into the ERP.",
  systems: "Outlook, Excel, ERP",
  volume: "About 80 orders per week",
  honeypot: "",
};

describe("ProcessAssessmentSchema", () => {
  it("validates and normalizes a complete request", () => {
    expect(ProcessAssessmentSchema.parse(validAssessment)).toEqual(
      validAssessment,
    );
  });

  it("turns empty optional fields into undefined", () => {
    expect(
      ProcessAssessmentSchema.parse({
        ...validAssessment,
        company: "",
        role: " ",
      }),
    ).toMatchObject({
      company: undefined,
      role: undefined,
    });
  });

  it("rejects short processes, invalid email, and filled honeypots", () => {
    expect(
      ProcessAssessmentSchema.safeParse({
        ...validAssessment,
        process: "Too short",
      }).success,
    ).toBe(false);
    expect(
      ProcessAssessmentSchema.safeParse({
        ...validAssessment,
        clientEmail: "invalid",
      }).success,
    ).toBe(false);
    expect(
      ProcessAssessmentSchema.safeParse({
        ...validAssessment,
        honeypot: "spam",
      }).success,
    ).toBe(false);
  });
});

describe("buildProcessAssessmentEmail", () => {
  it("builds a plain-text operational summary", () => {
    const email = buildProcessAssessmentEmail(
      ProcessAssessmentSchema.parse(validAssessment),
    );

    expect(email.subject).toBe(
      "Valutazione processo — Example Manufacturing",
    );
    expect(email.text).toContain("Ruolo: Operations manager");
    expect(email.text).toContain("Outlook, Excel, ERP");
    expect(email.text).toContain("About 80 orders per week");
    expect(email.text).not.toContain("<html");
  });

  it("removes line breaks from the email subject", () => {
    const email = buildProcessAssessmentEmail(
      ProcessAssessmentSchema.parse({
        ...validAssessment,
        company: "Example\r\nManufacturing",
      }),
    );

    expect(email.subject).toBe(
      "Valutazione processo — Example Manufacturing",
    );
  });
});
