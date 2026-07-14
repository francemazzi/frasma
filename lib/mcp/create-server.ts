import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { DiagnosticSummarySchema } from "../chat/diagnostic";
import {
  runGetDiagnosticFramework,
  runGetFrasmaProfile,
  runPrepareDiagnosticSummary,
  runSearchFrasmaKnowledge,
} from "./tools";

export function createFrasmaMcpServer(): McpServer {
  const server = new McpServer({
    name: "frasma",
    version: "1.0.0",
  });

  server.registerTool(
    "get_frasma_profile",
    {
      title: "Get Frasma profile",
      description:
        "Returns the verified public profile, focus areas, sectors, commercial boundaries, and discovery URLs for Frasma.",
      inputSchema: {
        locale: z.enum(["it", "en"]).default("en"),
      },
    },
    async (input) => runGetFrasmaProfile(input),
  );

  server.registerTool(
    "search_frasma_knowledge",
    {
      title: "Search Frasma knowledge",
      description:
        "Searches verified Frasma services, sectors, case studies, methodology, fit criteria, and commercial boundaries. Use before making factual claims.",
      inputSchema: {
        query: z.string().min(1).max(500),
        locale: z.enum(["it", "en"]).default("en"),
        pagePath: z.string().startsWith("/").optional(),
      },
    },
    async (input) => runSearchFrasmaKnowledge(input),
  );

  server.registerTool(
    "get_diagnostic_framework",
    {
      title: "Get diagnostic framework",
      description:
        "Returns the diagnostic method, evidence to collect, fit criteria, and commercial limits.",
      inputSchema: {
        locale: z.enum(["it", "en"]).default("en"),
      },
    },
    async (input) => runGetDiagnosticFramework(input),
  );

  server.registerTool(
    "prepare_diagnostic_summary",
    {
      title: "Prepare diagnostic summary handoff",
      description:
        "Validates a complete diagnostic summary and returns a handoff payload. Does not send email. The user must explicitly confirm before any email submission via the website chat or POST /api/send-diagnostic-summary.",
      inputSchema: DiagnosticSummarySchema,
    },
    async (input) => runPrepareDiagnosticSummary(input),
  );

  return server;
}
