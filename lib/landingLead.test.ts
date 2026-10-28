import { describe, expect, it } from "vitest";
import { landingLeadMessage, parseLandingLead } from "./landingLead";

describe("parseLandingLead", () => {
  it("lowercases a work email and keeps the process", () => {
    expect(
      parseLandingLead({
        name: "Anna",
        company: "Officina Bianchi",
        intent: "quotes",
        email: "  Anna@Bianchi.it ",
      }),
    ).toMatchObject({
      email: "anna@bianchi.it",
      intentLabel: "Preventivi dai disegni",
    });
  });

  it("rejects a phone number and an empty other process", () => {
    expect(
      parseLandingLead({
        name: "Anna",
        company: "Officina Bianchi",
        intent: "ddt",
        email: "+39 333 1112233",
      }),
    ).toBeUndefined();
    expect(
      parseLandingLead({
        name: "Anna",
        company: "Officina Bianchi",
        intent: "other",
        custom: "",
        email: "anna@bianchi.it",
      }),
    ).toBeUndefined();
  });
});

describe("landingLeadMessage", () => {
  it("replies to the visitor email and includes the ad click", () => {
    const lead = parseLandingLead({
      name: "Anna",
      company: "Officina Bianchi",
      intent: "other",
      custom: "Registri HACCP",
      email: "anna@bianchi.it",
    });
    expect(lead).toBeDefined();
    const message = landingLeadMessage(lead!, "https://www.frasma.org/lp/ordini-ddt", "click-1");
    expect(message.subject).toBe("Richiesta landing — Officina Bianchi");
    expect(message.text).toContain("Email: anna@bianchi.it");
    expect(message.text).toContain("Clic annuncio: click-1");
    expect(message.replyTo).toBe("anna@bianchi.it");
  });
});
