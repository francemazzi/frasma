import { describe, expect, it } from "vitest";
import { landingLeadMessage, parseLandingLead } from "./landingLead";

describe("parseLandingLead", () => {
  it("accepts a phone or an email with the process", () => {
    expect(
      parseLandingLead({
        name: "Anna",
        company: "Officina Bianchi",
        intent: "ddt",
        contact: "+39 379 1112233",
      }),
    ).toMatchObject({
      intentLabel: "DDT e ordini",
      contactKind: "phone",
    });
    expect(
      parseLandingLead({
        name: "Anna",
        company: "Officina Bianchi",
        intent: "quotes",
        contact: "anna@bianchi.it",
      })?.contactKind,
    ).toBe("email");
  });

  it("rejects a request without a usable contact or a written other process", () => {
    expect(
      parseLandingLead({
        name: "Anna",
        company: "Officina Bianchi",
        intent: "ddt",
        contact: "ciao",
      }),
    ).toBeUndefined();
    expect(
      parseLandingLead({
        name: "Anna",
        company: "Officina Bianchi",
        intent: "other",
        custom: "",
        contact: "anna@bianchi.it",
      }),
    ).toBeUndefined();
  });
});

describe("landingLeadMessage", () => {
  it("includes the contact and the ad click, and replies to an email", () => {
    const lead = parseLandingLead({
      name: "Anna",
      company: "Officina Bianchi",
      intent: "other",
      custom: "Registri HACCP",
      contact: "anna@bianchi.it",
    });
    expect(lead).toBeDefined();
    const message = landingLeadMessage(lead!, "https://www.frasma.org/lp/ordini-ddt", "click-1");
    expect(message.subject).toBe("Richiesta landing — Officina Bianchi");
    expect(message.text).toContain("Registri HACCP");
    expect(message.text).toContain("Clic annuncio: click-1");
    expect(message.replyTo).toBe("anna@bianchi.it");
  });
});
