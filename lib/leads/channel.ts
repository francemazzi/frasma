import { z } from "zod";
import type { LeadSource, ProcessAssessment } from "../processAssessment";
import { SITE_URL } from "../site";

export const LeadChannelSchema = z.enum([
  "site",
  "chat",
  "chatgpt_ads",
  "paid_other",
]);

export type LeadChannel = z.infer<typeof LeadChannelSchema>;

export type LeadAttributionInput = Pick<
  ProcessAssessment,
  "landingPath" | "utmSource" | "utmMedium" | "utmCampaign" | "utmContent"
>;

const PAID_MEDIUMS = new Set(["ads", "cpc", "paid", "paid_social"]);

const UTM_PARAMS = [
  ["utm_source", "utmSource"],
  ["utm_medium", "utmMedium"],
  ["utm_campaign", "utmCampaign"],
  ["utm_content", "utmContent"],
] as const;

const CHANNEL_LABELS: Record<"it" | "en", Record<LeadChannel, string>> = {
  it: {
    site: "sito",
    chat: "chat",
    chatgpt_ads: "annuncio ChatGPT",
    paid_other: "altro canale a pagamento",
  },
  en: {
    site: "website",
    chat: "chat",
    chatgpt_ads: "ChatGPT ad",
    paid_other: "other paid channel",
  },
};

export function deriveLeadChannel(
  input: Pick<ProcessAssessment, "utmSource" | "utmMedium">,
  source: LeadSource,
): LeadChannel {
  if (input.utmSource?.trim().toLowerCase() === "chatgpt") return "chatgpt_ads";
  const medium = input.utmMedium?.trim().toLowerCase();
  if (medium && PAID_MEDIUMS.has(medium)) return "paid_other";
  return source === "chat" ? "chat" : "site";
}

export function hasAttribution(input: LeadAttributionInput): boolean {
  return (
    Boolean(input.landingPath) ||
    UTM_PARAMS.some(([, key]) => Boolean(input[key]))
  );
}

/** Absolute landing URL: site + landing path + the utm params present. */
export function landingUrl(input: LeadAttributionInput): string {
  const params = new URLSearchParams();
  for (const [param, key] of UTM_PARAMS) {
    const value = input[key];
    if (value) params.set(param, value);
  }
  const query = params.toString();
  const path = input.landingPath?.split(/[?#]/)[0] || (query ? "/" : "");
  return `${SITE_URL}${path}${query ? `?${query}` : ""}`;
}

export function describeChannel(
  channel: LeadChannel,
  lang: "it" | "en",
): string {
  return CHANNEL_LABELS[lang][channel];
}
