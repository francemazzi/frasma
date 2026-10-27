/**
 * Lead attribution captured on the client (landing page and utm_* params)
 * and sent with every brief so the CRM knows which channel produced it.
 * Pure helpers: no React, safe to import on the server.
 */

export type Attribution = {
  landingPath?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
};

export const ATTRIBUTION_STORAGE_KEY = "frasma.attribution";

const UTM_PARAMS = [
  ["utm_source", "utmSource"],
  ["utm_medium", "utmMedium"],
  ["utm_campaign", "utmCampaign"],
  ["utm_content", "utmContent"],
] as const;

const UTM_MAX_LENGTH = 100;
const LANDING_PATH_MAX_LENGTH = 200;

function cleanText(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().slice(0, max).trim();
  return trimmed || undefined;
}

export function parseAttribution(url: URL): Attribution {
  const attribution: Attribution = {};
  const landingPath = cleanText(url.pathname, LANDING_PATH_MAX_LENGTH);
  if (landingPath) attribution.landingPath = landingPath;
  for (const [param, key] of UTM_PARAMS) {
    const value = cleanText(url.searchParams.get(param), UTM_MAX_LENGTH);
    if (value) attribution[key] = value;
  }
  return attribution;
}

function hasUtm(attribution: Attribution): boolean {
  return UTM_PARAMS.some(([, key]) => attribution[key] !== undefined);
}

function sanitizeAttribution(value: unknown): Attribution | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }
  const record = value as Record<string, unknown>;
  const attribution: Attribution = {};
  const landingPath = cleanText(record.landingPath, LANDING_PATH_MAX_LENGTH);
  if (landingPath) attribution.landingPath = landingPath;
  for (const [, key] of UTM_PARAMS) {
    const utm = cleanText(record[key], UTM_MAX_LENGTH);
    if (utm) attribution[key] = utm;
  }
  return Object.keys(attribution).length > 0 ? attribution : undefined;
}

function defaultStorage(): Storage | undefined {
  return typeof window === "undefined" ? undefined : window.sessionStorage;
}

function defaultUrl(): URL | undefined {
  return typeof window === "undefined"
    ? undefined
    : new URL(window.location.href);
}

export function readAttribution(storage?: Storage): Attribution | undefined {
  try {
    const store = storage ?? defaultStorage();
    const raw = store?.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return undefined;
    return sanitizeAttribution(JSON.parse(raw));
  } catch {
    return undefined;
  }
}

/**
 * Records the landing page once per session. A later visit carrying utm_*
 * params replaces the whole utm set and the landing path; a visit without
 * utm keeps what was stored. Returns what is stored afterwards.
 */
export function captureAttribution(
  storage?: Storage,
  url?: URL,
): Attribution | undefined {
  try {
    const store = storage ?? defaultStorage();
    const current = url ?? defaultUrl();
    if (!store || !current) return undefined;

    const parsed = parseAttribution(current);
    const stored = readAttribution(store);
    if (stored && !hasUtm(parsed)) return stored;

    store.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(parsed));
    return parsed;
  } catch {
    return undefined;
  }
}
