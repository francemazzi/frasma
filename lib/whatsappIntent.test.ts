import { describe, expect, it } from "vitest";
import { buildWhatsappIntentHref, buildWhatsappIntentMessage } from "./whatsappIntent";

describe("buildWhatsappIntentMessage", () => {
  it("puts name, company and intent in the Italian message", () => {
    expect(
      buildWhatsappIntentMessage("it", {
        name: "Anna",
        company: "Officina Bianchi",
        intentLabel: "DDT e ordini",
      }),
    ).toBe(
      [
        "Ciao Francesco, vorrei capire se si può fare.",
        "",
        "Nome: Anna",
        "Azienda: Officina Bianchi",
        "Da portare nel gestionale: DDT e ordini",
      ].join("\n"),
    );
  });

  it("collapses line breaks so extra text stays on one field", () => {
    const message = buildWhatsappIntentMessage("it", {
      name: "Anna\nRossi",
      company: "  Officina   Bianchi ",
      intentLabel: "Preventivi dai disegni",
    });
    expect(message).toContain("Nome: Anna Rossi");
    expect(message).toContain("Azienda: Officina Bianchi");
    expect(message.split("\n")).toHaveLength(5);
  });
});

describe("buildWhatsappIntentHref", () => {
  it("opens the Frasma WhatsApp chat with the encoded message", () => {
    const href = buildWhatsappIntentHref("en", {
      name: "Anna",
      company: "Bianchi",
      intentLabel: "Quotes from drawings",
    });
    const url = new URL(href);
    expect(url.origin + url.pathname).toBe("https://wa.me/393793671312");
    expect(url.searchParams.get("text")).toContain("Name: Anna");
    expect(url.searchParams.get("text")).toContain("Company: Bianchi");
    expect(url.searchParams.get("text")).toContain("To bring into the ERP: Quotes from drawings");
  });
});
