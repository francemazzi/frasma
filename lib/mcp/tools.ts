import { z } from "zod";

import {
  checkDiagnosticCompleteness,
  DiagnosticSummarySchema,
  type DiagnosticSummary,
} from "../chat/diagnostic";
import {
  getDiagnosticFramework,
  getFrasmaProfile,
  searchKnowledge,
} from "../knowledge";
import { SITE_URL } from "../seo";

export const LocaleInputSchema = z.object({
  locale: z.enum(["it", "en"]).default("en"),
});

export const SearchKnowledgeToolInputSchema = z.object({
  query: z.string().min(1).max(500),
  locale: z.enum(["it", "en"]).default("en"),
  pagePath: z.string().startsWith("/").optional(),
});

export type McpToolJsonResult = {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
};

function jsonResult(payload: unknown, isError = false): McpToolJsonResult {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(payload, null, 2),
      },
    ],
    ...(isError ? { isError: true } : {}),
  };
}

export function runGetFrasmaProfile(input: unknown): McpToolJsonResult {
  const parsed = LocaleInputSchema.safeParse(input ?? {});
  if (!parsed.success) {
    return jsonResult(
      { error: "Invalid input", details: parsed.error.flatten() },
      true,
    );
  }

  const profile = getFrasmaProfile(parsed.data.locale);
  return jsonResult({
    ...profile,
    discovery: {
      forAgents: `${SITE_URL}/for-agents`,
      llmsTxt: `${SITE_URL}/llms.txt`,
      mcp: `${SITE_URL}/api/mcp`,
      apiCatalog: `${SITE_URL}/.well-known/api-catalog`,
      openapi: `${SITE_URL}/openapi.json`,
      agentSkills: `${SITE_URL}/.well-known/agent-skills/index.json`,
      status: `${SITE_URL}/api/status`,
      chat: `${SITE_URL}/#contatti`,
    },
  });
}

export function runSearchFrasmaKnowledge(input: unknown): McpToolJsonResult {
  const parsed = SearchKnowledgeToolInputSchema.safeParse(input ?? {});
  if (!parsed.success) {
    return jsonResult(
      { error: "Invalid input", details: parsed.error.flatten() },
      true,
    );
  }

  return jsonResult(
    searchKnowledge({
      query: parsed.data.query,
      locale: parsed.data.locale,
      pagePath: parsed.data.pagePath,
    }),
  );
}

export function runGetDiagnosticFramework(input: unknown): McpToolJsonResult {
  const parsed = LocaleInputSchema.safeParse(input ?? {});
  if (!parsed.success) {
    return jsonResult(
      { error: "Invalid input", details: parsed.error.flatten() },
      true,
    );
  }

  return jsonResult(getDiagnosticFramework(parsed.data.locale));
}

export type DiagnosticHandoff = {
  ok: true;
  summary: DiagnosticSummary;
  completeness: ReturnType<typeof checkDiagnosticCompleteness>;
  handoff: {
    chatUrl: string;
    emailEndpoint: string;
    instructions: string;
  };
};

/**
 * Validates a diagnostic summary and returns a handoff payload.
 * Does not send email — human confirmation on the website is required.
 */
export function runPrepareDiagnosticSummary(input: unknown): McpToolJsonResult {
  const completeness = checkDiagnosticCompleteness(input);
  const parsed = DiagnosticSummarySchema.safeParse(input);

  if (!parsed.success) {
    return jsonResult(
      {
        ok: false,
        error: "Diagnostic summary is incomplete or invalid",
        completeness,
        details: parsed.error.flatten(),
        handoff: {
          chatUrl: `${SITE_URL}/#contatti`,
          emailEndpoint: `${SITE_URL}/api/send-diagnostic-summary`,
          instructions:
            "Collect the missing fields with the user, then call this tool again. Do not POST to the email endpoint until the user explicitly confirms the reviewed summary on the website or in chat.",
        },
      },
      true,
    );
  }

  const handoff: DiagnosticHandoff = {
    ok: true,
    summary: parsed.data,
    completeness,
    handoff: {
      chatUrl: `${SITE_URL}/#contatti`,
      emailEndpoint: `${SITE_URL}/api/send-diagnostic-summary`,
      instructions:
        "Present the summary to the user for review. Only after explicit human confirmation may the website chat form or POST /api/send-diagnostic-summary be used. This MCP tool never sends email.",
    },
  };

  return jsonResult(handoff);
}
