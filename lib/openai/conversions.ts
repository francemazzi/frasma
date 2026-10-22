/** OpenAI Ads Conversions API. The key stays on the server. */

export const OAI_PIXEL_ID = "486zF127dHBQWpfKXd4umE";
export const OAI_CONVERSIONS_KEY_ENV = "OPENAI_ADS_CONVERSIONS_API_KEY";

const EVENTS_URL = `https://bzr.openai.com/v1/events?pid=${OAI_PIXEL_ID}`;
const ALLOWED_HOSTS = new Set(["www.frasma.org", "frasma.org", "localhost", "127.0.0.1"]);

export type LeadCreatedInput = {
  id: string;
  timestampMs: number;
  sourceUrl: string;
  oppref?: string;
  obref?: string;
  ipAddress?: string;
  userAgent?: string;
};

export function isEventId(value: string): boolean {
  return /^[A-Za-z0-9_-]{8,80}$/.test(value);
}

/** Keep an opaque OpenAI reference, or drop anything that is not a single token. */
export function cleanOpaqueRef(value: unknown, max = 512): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max || /[\u0000-\u001F\u007F]/.test(trimmed)) {
    return undefined;
  }
  return trimmed;
}

export function landingSourceUrl(value: unknown): string | undefined {
  if (typeof value !== "string" || value.length > 2000) return undefined;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return undefined;
  }
  const host = url.hostname.toLowerCase();
  if (!ALLOWED_HOSTS.has(host)) return undefined;
  if ((host === "www.frasma.org" || host === "frasma.org") && url.protocol !== "https:") {
    return undefined;
  }
  url.hash = "";
  return url.toString();
}

export function leadCreatedPayload(event: LeadCreatedInput) {
  const user: { obref?: string; ip_address?: string; user_agent?: string } = {};
  if (event.obref) user.obref = event.obref;
  if (event.ipAddress) user.ip_address = event.ipAddress;
  if (event.userAgent) user.user_agent = event.userAgent;

  return {
    validate_only: false,
    events: [
      {
        id: event.id,
        type: "lead_created" as const,
        timestamp_ms: event.timestampMs,
        ...(event.oppref ? { oppref: event.oppref } : {}),
        source_url: event.sourceUrl,
        action_source: "web" as const,
        ...(Object.keys(user).length > 0 ? { user } : {}),
        data: { type: "customer_action" as const },
      },
    ],
  };
}

export async function sendLeadCreatedEvent(
  event: LeadCreatedInput,
  apiKey: string,
  fetchImpl: typeof fetch = fetch,
): Promise<boolean> {
  const response = await fetchImpl(EVENTS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leadCreatedPayload(event)),
    signal: AbortSignal.timeout(4000),
  });
  return response.ok;
}
