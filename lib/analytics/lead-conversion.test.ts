import { describe, expect, it, vi } from "vitest";
import { trackLeadConversion } from "./lead-conversion";

function memoryStorage() {
  const map = new Map<string, string>();
  return {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => {
      map.set(key, value);
    },
  };
}

describe("trackLeadConversion", () => {
  it("fires GA4, dataLayer and the OpenAI pixel once per session", () => {
    const gtag = vi.fn();
    const oaiq = vi.fn();
    const dataLayer: unknown[] = [];
    const storage = memoryStorage();
    const win = { gtag, oaiq, dataLayer };
    const attribution = {
      landingPath: "/servizi/ddt-erp",
      utmSource: "chatgpt",
      utmMedium: "ads",
      utmCampaign: "ddt-erp",
      utmContent: "v1",
    };

    expect(
      trackLeadConversion({ landing: "ddt-erp", attribution, storage }, win),
    ).toBe(true);

    expect(gtag).toHaveBeenCalledWith("event", "conversion_event_contact", {
      landing: "ddt-erp",
    });
    expect(gtag).toHaveBeenCalledWith(
      "event",
      "generate_lead",
      expect.objectContaining({
        landing: "ddt-erp",
        lead_channel: "chatgpt_ads",
        utm_campaign: "ddt-erp",
        utm_content: "v1",
      }),
    );
    expect(dataLayer[0]).toMatchObject({
      event: "lead_submitted",
      lead_channel: "chatgpt_ads",
    });
    expect(oaiq).toHaveBeenCalledWith("measure", "lead_created", {
      type: "customer_action",
    });

    expect(
      trackLeadConversion({ landing: "ddt-erp", attribution, storage }, win),
    ).toBe(false);
    expect(gtag).toHaveBeenCalledTimes(2);
  });

  it("skips the pixel when it is not loaded and labels direct leads as site", () => {
    const gtag = vi.fn();
    const win = { gtag, dataLayer: [] as unknown[] };

    expect(trackLeadConversion({ landing: "site", storage: null }, win)).toBe(
      true,
    );
    expect(gtag).toHaveBeenCalledWith(
      "event",
      "generate_lead",
      expect.objectContaining({ lead_channel: "site", utm_source: "" }),
    );
  });

  it("returns false without a window", () => {
    expect(trackLeadConversion({ landing: "ddt-erp" }, undefined)).toBe(false);
  });
});
