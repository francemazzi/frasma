import { describe, expect, it } from "vitest";
import { buildProcessAssessmentEmail } from "./email/processAssessment";
import { ProcessAssessmentSchema } from "./processAssessment";

const validAssessment = {
  name: "Ada Lovelace",
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

  it("requires a name", () => {
    const { name: _name, ...withoutName } = validAssessment;
    expect(ProcessAssessmentSchema.safeParse(withoutName).success).toBe(false);
  });

  it("rejects extra keys and blank names", () => {
    expect(
      ProcessAssessmentSchema.safeParse({
        ...validAssessment,
        budget: "10k",
      }).success,
    ).toBe(false);
    expect(
      ProcessAssessmentSchema.safeParse({
        ...validAssessment,
        name: "  ",
      }).success,
    ).toBe(false);
  });

  it("keeps a chat conversation id and language", () => {
    expect(
      ProcessAssessmentSchema.parse({
        ...validAssessment,
        conversationId: "550e8400-e29b-41d4-a716-446655440000",
        lang: "en",
      }),
    ).toMatchObject({
      conversationId: "550e8400-e29b-41d4-a716-446655440000",
      lang: "en",
    });
  });

  it("rejects invalid language and oversized conversation ids", () => {
    expect(
      ProcessAssessmentSchema.safeParse({
        ...validAssessment,
        lang: "es",
      }).success,
    ).toBe(false);
    expect(
      ProcessAssessmentSchema.safeParse({
        ...validAssessment,
        conversationId: "550e8400-e29b-41d4-a716-446655440000-extra",
      }).success,
    ).toBe(false);
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
      { source: "form", lang: "it" },
    );

    expect(email.subject).toBe(
      "Valutazione processo — Example Manufacturing",
    );
    expect(email.text).toContain("Nome: Ada Lovelace");
    expect(email.text).toContain("Fonte: Form landing");
    expect(email.text).toContain("Ruolo: Operations manager");
    expect(email.text).toContain("Outlook, Excel, ERP");
    expect(email.text).toContain("About 80 orders per week");
    expect(email.text).not.toContain("<html");
  });

  it("builds an English summary for chat briefs", () => {
    const email = buildProcessAssessmentEmail(
      ProcessAssessmentSchema.parse(validAssessment),
      { source: "chat", lang: "en" },
    );

    expect(email.subject).toBe("Process assessment — Example Manufacturing");
    expect(email.text).toContain("Source: Chat");
    expect(email.text).toContain("Name: Ada Lovelace");
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

  it("uses the name in the subject when company is missing", () => {
    const email = buildProcessAssessmentEmail(
      ProcessAssessmentSchema.parse({
        ...validAssessment,
        company: "",
      }),
      { source: "form", lang: "it" },
    );

    expect(email.subject).toBe("Valutazione processo — Ada Lovelace");
    expect(email.text).toContain("Azienda: —");
  });
});
