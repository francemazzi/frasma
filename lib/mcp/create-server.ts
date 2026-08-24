import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { DiagnosticSummarySchema } from "../chat/diagnostic";
import { ProjectBriefToolSchema } from "../processAssessment";
import {
  runGetDiagnosticFramework,
  runGetFrasmaProfile,
  runPrepareDiagnosticSummary,
  runPrepareProjectBrief,
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
        "Validates a complete diagnostic summary and returns a handoff payload. Does not send email. Map the diagnosis to a process brief; the user must confirm before POST /api/request-process-assessment.",
      inputSchema: DiagnosticSummarySchema,
    },
    async (input) => runPrepareDiagnosticSummary(input),
  );

  server.registerTool(
    "prepare_project_brief",
    {
      title: "Prepare process brief handoff",
      description:
        "Validates the process brief used for a quote (name, email, process, optional company/role/systems/volume). Does not send email. The user must confirm before POST /api/request-process-assessment.",
      inputSchema: ProjectBriefToolSchema.shape,
    },
    async (input) => runPrepareProjectBrief(input),
  );

  return server;
}
