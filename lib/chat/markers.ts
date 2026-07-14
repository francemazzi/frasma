import {
  DiagnosticSummarySchema,
  type DiagnosticSummary,
} from "./diagnostic";

export const EMAIL_FORM = "EMAIL_FORM";
export const MEETING_FORM = "MEETING_FORM";
export const DIAGNOSTIC_FORM = "DIAGNOSTIC_FORM";

export type ChatFormMarker =
  | typeof EMAIL_FORM
  | typeof MEETING_FORM
  | typeof DIAGNOSTIC_FORM;

const MAX_MARKER_PAYLOAD_LENGTH = 50_000;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function markerRegExp(marker: ChatFormMarker, global = false): RegExp {
  const name = escapeRegExp(marker);
  return new RegExp(
    `<!--\\s*${name}\\s*-->([\\s\\S]*?)<!--\\s*\\/${name}\\s*-->`,
    global ? "g" : undefined,
  );
}

export function extractFormPayload(
  content: string,
  marker: ChatFormMarker,
): string | null {
  if (typeof content !== "string") return null;

  const match = markerRegExp(marker).exec(content);
  if (!match) return null;

  const payload = match[1].trim();
  if (!payload || payload.length > MAX_MARKER_PAYLOAD_LENGTH) return null;

  return payload;
}

export function extractFormJson<T = Record<string, unknown>>(
  content: string,
  marker: ChatFormMarker,
): T | null {
  const payload = extractFormPayload(content, marker);
  if (!payload) return null;

  try {
    const parsed: unknown = JSON.parse(payload);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return null;
    }
    return parsed as T;
  } catch {
    return null;
  }
}

export function extractEmailForm<T = Record<string, unknown>>(
  content: string,
): T | null {
  return extractFormJson<T>(content, EMAIL_FORM);
}

export function extractMeetingForm<T = Record<string, unknown>>(
  content: string,
): T | null {
  return extractFormJson<T>(content, MEETING_FORM);
}

export function extractDiagnosticForm(
  content: string,
): DiagnosticSummary | null {
  const parsed = extractFormJson(content, DIAGNOSTIC_FORM);
  const result = DiagnosticSummarySchema.safeParse(parsed);
  return result.success ? result.data : null;
}

export function wrapForm(
  marker: ChatFormMarker,
  payload: Record<string, unknown>,
): string {
  return `<!--${marker}-->${JSON.stringify(payload)}<!--/${marker}-->`;
}

export function wrapDiagnosticForm(summary: DiagnosticSummary): string {
  const validated = DiagnosticSummarySchema.parse(summary);
  return wrapForm(DIAGNOSTIC_FORM, validated);
}

export function stripFormMarkers(content: string): string {
  return ([EMAIL_FORM, MEETING_FORM, DIAGNOSTIC_FORM] as const)
    .reduce(
      (result, marker) => result.replace(markerRegExp(marker, true), ""),
      content,
    )
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
