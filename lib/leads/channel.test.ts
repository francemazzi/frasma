import { describe, expect, it } from "vitest";
import {
  LeadChannelSchema,
  describeChannel,
  deriveLeadChannel,
  hasAttribution,
  landingUrl,
} from "./channel";

describe("deriveLeadChannel", () => {
  it("maps a chatgpt utm_source to chatgpt_ads regardless of case or source", () => {
    expect(deriveLeadChannel({ utmSource: "chatgpt" }, "form")).toBe(
      "chatgpt_ads",
    );
    expect(
      deriveLeadChannel({ utmSource: " ChatGPT ", utmMedium: "ads" }, "chat"),
    ).toBe("chatgpt_ads");
  });

  it("maps paid mediums to paid_other", () => {
    for (const utmMedium of ["ads", "cpc", "paid", "Paid_Social"]) {
      expect(
        deriveLeadChannel({ utmSource: "linkedin", utmMedium }, "form"),
      ).toBe("paid_other");
    }
  });

  it("falls back to the lead source", () => {
    expect(deriveLeadChannel({}, "form")).toBe("site");
    expect(deriveLeadChannel({}, "chat")).toBe("chat");
    expect(
      deriveLeadChannel({ utmSource: "newsletter", utmMedium: "email" }, "chat"),
    ).toBe("chat");
  });

  it("only accepts known channels", () => {
    expect(LeadChannelSchema.safeParse("chatgpt_ads").success).toBe(true);
    expect(LeadChannelSchema.safeParse("tiktok").success).toBe(false);
  });
});

describe("landingUrl", () => {
  it("returns the bare site url without attribution", () => {
    expect(landingUrl({})).toBe("https://www.frasma.org");
    expect(hasAttribution({})).toBe(false);
  });

  it("appends the landing path and only the present utm parameters", () => {
    const input = {
      landingPath: "/ddt",
      utmSource: "chatgpt",
      utmCampaign: "ddt-2026",
    };
    expect(landingUrl(input)).toBe(
      "https://www.frasma.org/ddt?utm_source=chatgpt&utm_campaign=ddt-2026",
    );
    expect(hasAttribution(input)).toBe(true);
  });

  it("uses the landing path alone when there is no utm", () => {
    expect(landingUrl({ landingPath: "/manifattura" })).toBe(
      "https://www.frasma.org/manifattura",
    );
  });

  it("defaults the path to / when only utm parameters are present", () => {
    expect(landingUrl({ utmSource: "chatgpt" })).toBe(
      "https://www.frasma.org/?utm_source=chatgpt",
    );
  });

  it("encodes utm values so they round-trip", () => {
    const url = new URL(
      landingUrl({ landingPath: "/ddt", utmSource: "chatgpt", utmContent: "a&b=c d" }),
    );
    expect(url.pathname).toBe("/ddt");
    expect(url.searchParams.get("utm_source")).toBe("chatgpt");
    expect(url.searchParams.get("utm_content")).toBe("a&b=c d");
  });
});

describe("describeChannel", () => {
  it("labels every channel in both languages", () => {
    expect(describeChannel("site", "it")).toBe("sito");
    expect(describeChannel("chat", "it")).toBe("chat");
    expect(describeChannel("chatgpt_ads", "it")).toBe("annuncio ChatGPT");
    expect(describeChannel("paid_other", "it")).toBe(
      "altro canale a pagamento",
    );
    expect(describeChannel("site", "en")).toBe("website");
    expect(describeChannel("chat", "en")).toBe("chat");
    expect(describeChannel("chatgpt_ads", "en")).toBe("ChatGPT ad");
    expect(describeChannel("paid_other", "en")).toBe("other paid channel");
  });
});
