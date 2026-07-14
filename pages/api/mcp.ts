import type { NextApiRequest, NextApiResponse } from "next";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

import {
  getClientIp,
  InMemoryFixedWindowRateLimiter,
} from "../../lib/rate-limit";
import { createFrasmaMcpServer } from "../../lib/mcp/create-server";

const mcpIpRateLimiter = new InMemoryFixedWindowRateLimiter(60, 60_000);

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Accept, MCP-Session-Id, Last-Event-ID, Mcp-Protocol-Version",
  "Access-Control-Expose-Headers": "MCP-Session-Id, Mcp-Protocol-Version",
};

function applyCors(res: NextApiResponse): void {
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    res.setHeader(key, value);
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  applyCors(res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (
    req.method !== "GET" &&
    req.method !== "POST" &&
    req.method !== "DELETE"
  ) {
    res.setHeader("Allow", "GET, POST, DELETE, OPTIONS");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!mcpIpRateLimiter.allow(getClientIp(req))) {
    res.status(429).json({ error: "Too many requests" });
    return;
  }

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });
  const server = createFrasmaMcpServer();

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("[mcp]", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "MCP request failed" });
    }
  } finally {
    await transport.close().catch(() => undefined);
    await server.close().catch(() => undefined);
  }
}
