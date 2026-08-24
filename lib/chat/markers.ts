import {
  DiagnosticSummarySchema,
  type DiagnosticSummary,
} from "./diagnostic";
import type { ProjectBriefFields } from "../processAssessment";

export const EMAIL_FORM = "EMAIL_FORM";
export const MEETING_FORM = "MEETING_FORM";
export const DIAGNOSTIC_FORM = "DIAGNOSTIC_FORM";
export const PROJECT_BRIEF_FORM = "PROJECT_BRIEF_FORM";

export type ChatFormMarker =
  | typeof EMAIL_FORM
  | typeof MEETING_FORM
  | typeof DIAGNOSTIC_FORM
  | typeof PROJECT_BRIEF_FORM;

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

function asOptionalText(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

export function extractProjectBriefForm(
  content: string,
): Partial<ProjectBriefFields> | null {
  const parsed = extractFormJson<Record<string, unknown>>(
    content,
    PROJECT_BRIEF_FORM,
  );
  if (!parsed) return null;

  const process = asOptionalText(parsed.process);
  if (!process) return null;

  return {
    name: asOptionalText(parsed.name) ?? "",
    clientEmail: asOptionalText(parsed.clientEmail) ?? "",
    company: asOptionalText(parsed.company),
    role: asOptionalText(parsed.role),
    process,
    systems: asOptionalText(parsed.systems),
    volume: asOptionalText(parsed.volume),
  };
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

export function wrapProjectBriefForm(
  brief: Partial<ProjectBriefFields>,
): string {
  return wrapForm(PROJECT_BRIEF_FORM, brief);
}

export function stripFormMarkers(content: string): string {
  return (
    [
      EMAIL_FORM,
      MEETING_FORM,
      DIAGNOSTIC_FORM,
      PROJECT_BRIEF_FORM,
    ] as const
  )
    .reduce(
      (result, marker) => result.replace(markerRegExp(marker, true), ""),
      content,
    )
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
