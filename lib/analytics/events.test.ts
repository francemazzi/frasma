import { describe, expect, it, vi } from "vitest";
import { trackWhatsappClick } from "./events";

describe("trackWhatsappClick", () => {
  it("labels the homepage as home and sends the position", () => {
    const gtag = vi.fn();
    const oaiq = vi.fn();

    const sent = trackWhatsappClick("hero", {
      gtag,
      oaiq,
      location: { pathname: "/" },
    });

    expect(sent).toBe(true);
    expect(gtag).toHaveBeenCalledWith("event", "contact_whatsapp", {
      landing: "home",
      position: "hero",
    });
    expect(oaiq).not.toHaveBeenCalled();
  });

  it("uses the path as landing outside the homepage", () => {
    const gtag = vi.fn();

    trackWhatsappClick("footer", { gtag, location: { pathname: "/servizi/ddt-erp" } });

    expect(gtag).toHaveBeenCalledWith("event", "contact_whatsapp", {
      landing: "/servizi/ddt-erp",
      position: "footer",
    });
  });

  it("falls back to the GTM dataLayer when gtag is missing", () => {
    const dataLayer: unknown[] = [];

    trackWhatsappClick("chat", { dataLayer, location: { pathname: "/" } });

    expect(dataLayer).toEqual([
      { event: "contact_whatsapp", landing: "home", position: "chat" },
    ]);
  });

  it("does nothing without a browser window", () => {
    expect(trackWhatsappClick("cta", undefined)).toBe(false);
  });
});
