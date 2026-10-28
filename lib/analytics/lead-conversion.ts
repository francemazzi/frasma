import type { Attribution } from "../attribution";
import { deriveLeadChannel } from "../leads/channel";
import type { AnalyticsWindow } from "./events";

export const LEAD_TRACKED_STORAGE_KEY = "frasma.lead_tracked";

export type LeadConversionInput = {
  /** Campaign landing id, e.g. "ddt-erp"; "site" when unknown. */
  landing: string;
  attribution?: Attribution;
  storage?: Pick<Storage, "getItem" | "setItem"> | null;
};

function defaultStorage(): Pick<Storage, "getItem" | "setItem"> | null {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

function defaultWindow(): AnalyticsWindow | undefined {
  return typeof window === "undefined"
    ? undefined
    : (window as unknown as AnalyticsWindow);
}

/**
 * Fires every conversion signal for a submitted lead exactly once per session:
 * GA4 (legacy `conversion_event_contact` plus `generate_lead`), a GTM dataLayer
 * event, and the OpenAI Ads pixel `lead_created` when the pixel is loaded.
 */
export function trackLeadConversion(
  input: LeadConversionInput,
  win: AnalyticsWindow | undefined = defaultWindow(),
): boolean {
  if (!win) return false;

  const storage = input.storage === undefined ? defaultStorage() : input.storage;
  const marker = `${input.landing}`;
  try {
    if (storage?.getItem(LEAD_TRACKED_STORAGE_KEY) === marker) return false;
  } catch {
    // Storage may be unavailable; still track once for this render.
  }

  const attribution = input.attribution ?? {};
  const channel = deriveLeadChannel(
    { utmSource: attribution.utmSource, utmMedium: attribution.utmMedium },
    "form",
  );
  const params = {
    landing: input.landing,
    lead_channel: channel,
    utm_source: attribution.utmSource ?? "",
    utm_medium: attribution.utmMedium ?? "",
    utm_campaign: attribution.utmCampaign ?? "",
    utm_content: attribution.utmContent ?? "",
  };

  try {
    if (typeof win.gtag === "function") {
      win.gtag("event", "conversion_event_contact", { landing: input.landing });
      win.gtag("event", "generate_lead", params);
    }
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({ event: "lead_submitted", ...params });
    }
    if (typeof win.oaiq === "function") {
      win.oaiq("measure", "lead_created", { type: "customer_action" });
    }
  } catch {
    // Never break the thank-you page because of a tracker.
  }

  try {
    storage?.setItem(LEAD_TRACKED_STORAGE_KEY, marker);
  } catch {
    // Ignore quota or privacy-mode errors.
  }
  return true;
}
