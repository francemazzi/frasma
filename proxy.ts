import { NextResponse, type NextRequest } from "next/server";

const DISCOVERY_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
].join(", ");

const HOME_MARKDOWN = `# Frasma

Frasma is the AI agency led by Francesco Saverio Mazzi. It builds custom software, AI agents, MCP-oriented integrations, and operational workflows for small and medium businesses.

## What Frasma Builds

- Custom web applications for real operational processes.
- AI automations for documents, quotes, tickets, and internal workflows.
- ERP and API integrations for manufacturing, food, agriculture, and field service.
- Agent-ready content, structured data, and MCP integration strategy.

## Focus Areas

- Manufacturing: quotes, ERP documents, production workflows, and back-office automation.
- Food and quality: HACCP, certifications, checks, and controlled document flows.
- Agriculture and agronomy: field notebooks, technical sources, and traceable data.
- Field service: tickets, technicians, suppliers, and intervention workflows.

## Public API Discovery

- API catalog: https://www.frasma.org/.well-known/api-catalog
- OpenAPI description: https://www.frasma.org/openapi.json
- Agent skills index: https://www.frasma.org/.well-known/agent-skills/index.json
- Service status: https://www.frasma.org/api/status

## Contact

Use the website chat or booking forms to prepare a project request, send a quote request, or schedule a call with Francesco.
`;

function acceptsMarkdown(accept: string | null): boolean {
  if (!accept) return false;

  return accept
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .some((mediaType) => mediaType === "text/markdown");
}

function estimateMarkdownTokens(markdown: string): string {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return String(Math.max(1, Math.ceil(words * 1.3)));
}

function addVary(headers: Headers, value: string): void {
  const current = headers.get("Vary");
  if (!current) {
    headers.set("Vary", value);
    return;
  }

  const entries = current.split(",").map((entry) => entry.trim().toLowerCase());
  if (!entries.includes(value.toLowerCase())) {
    headers.set("Vary", `${current}, ${value}`);
  }
}

export function proxy(req: NextRequest) {
  if (acceptsMarkdown(req.headers.get("accept"))) {
    return new NextResponse(HOME_MARKDOWN, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Link: DISCOVERY_LINK_HEADER,
        Vary: "Accept",
        "x-markdown-tokens": estimateMarkdownTokens(HOME_MARKDOWN),
      },
    });
  }

  const res = NextResponse.next();
  res.headers.set("Link", DISCOVERY_LINK_HEADER);
  addVary(res.headers, "Accept");
  return res;
}

export const config = {
  matcher: ["/"],
};
