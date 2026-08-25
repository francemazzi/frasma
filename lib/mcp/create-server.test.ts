import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { describe, expect, it } from "vitest";

import { createFrasmaMcpServer } from "./create-server";

const TOOL_NAMES = [
  "get_frasma_profile",
  "search_frasma_knowledge",
  "get_diagnostic_framework",
  "prepare_diagnostic_summary",
  "prepare_project_brief",
] as const;

describe("Frasma MCP server handshake", () => {
  it("lists tools with parameter descriptions, output schemas, and annotations", async () => {
    const mcpServer = createFrasmaMcpServer();
    const client = new Client({ name: "frasma-test", version: "0.0.1" });
    const [clientTransport, serverTransport] =
      InMemoryTransport.createLinkedPair();

    await Promise.all([
      mcpServer.connect(serverTransport),
      client.connect(clientTransport),
    ]);

    try {
      const listed = await client.listTools();
      const toolsByName = Object.fromEntries(
        listed.tools.map((tool) => [tool.name, tool]),
      );

      expect(listed.tools.map((tool) => tool.name).sort()).toEqual(
        [...TOOL_NAMES].sort(),
      );

      for (const name of TOOL_NAMES) {
        const tool = toolsByName[name];
        expect(tool?.description?.length).toBeGreaterThan(20);
        expect(tool?.outputSchema).toBeDefined();
        expect(tool?.annotations).toMatchObject({
          readOnlyHint: true,
          destructiveHint: false,
          idempotentHint: true,
        });
      }

      expect(
        toolsByName.search_frasma_knowledge?.annotations?.openWorldHint,
      ).toBe(true);
      expect(
        (
          toolsByName.search_frasma_knowledge?.inputSchema as {
            properties?: { query?: { description?: string } };
          }
        )?.properties?.query?.description,
      ).toContain("DDT ERP");
      expect(
        (
          toolsByName.get_frasma_profile?.inputSchema as {
            properties?: { locale?: { description?: string } };
          }
        )?.properties?.locale?.description,
      ).toContain("it or en");

      const profile = await client.callTool({
        name: "get_frasma_profile",
        arguments: { locale: "en" },
      });
      expect(profile.isError).not.toBe(true);
      expect(profile.structuredContent).toMatchObject({
        name: "Frasma",
        discovery: { mcp: expect.stringContaining("/api/mcp") },
      });
    } finally {
      await client.close();
      await mcpServer.close();
    }
  });
});
