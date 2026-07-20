import { NextResponse, type NextRequest } from "next/server";

const DISCOVERY_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</for-agents>; rel="service-doc"; type="text/html"',
].join(", ");

const HOME_MARKDOWN = `# Frasma

Frasma is the independent software studio led by Francesco Saverio Mazzi. It diagnoses operational bottlenecks and builds custom software, AI systems, integrations, and controlled workflows for small and medium businesses.

## What Frasma Builds

- Custom web applications for real operational processes.
- AI automations for documents, quotes, tickets, and internal workflows.
- ERP and API integrations for manufacturing, food, agriculture, and field service.
- Operational datasets and benchmarks for evaluating AI-assisted workflows.
- Company wikis and AI-searchable knowledge connected to daily work.
- Agent-ready content, structured data, and MCP integration strategy.

## Diagnostic Method

- Interview the people who run the process and map inputs, outputs, decisions, exceptions, and responsibilities.
- Establish a baseline using volumes, timing, errors, rework, waits, and available data.
- Test a limited prototype on representative and anonymized examples.
- Compare results against the baseline without inventing savings, prices, or guarantees.

## Focus Areas

- Manufacturing: quotes, ERP documents, production workflows, and back-office automation.
- Food and quality: HACCP, certifications, checks, and controlled document flows.
- Agriculture and agronomy: field notebooks, technical sources, and traceable data.
- Field service: tickets, technicians, suppliers, and intervention workflows.

## Commercial Boundaries

- There is no universal price list for custom operational software.
- Do not invent pricing, savings, payback periods, or guaranteed outcomes.
- Fixed packages exist only for VibeUp Deploy as a Service on https://www.frasma.org/vibeup and do not apply to Frasma operational projects.

## Public API Discovery

- Agents hub: https://www.frasma.org/for-agents
- llms.txt: https://www.frasma.org/llms.txt
- API catalog: https://www.frasma.org/.well-known/api-catalog
- OpenAPI description: https://www.frasma.org/openapi.json
- Agent skills index: https://www.frasma.org/.well-known/agent-skills/index.json
- MCP endpoint: https://www.frasma.org/api/mcp
- Service status: https://www.frasma.org/api/status

## Contact

Use the website chat to complete a guided process diagnostic, review its summary, and email it to Francesco. When MongoDB is configured, conversations are persisted server-side and can be resumed later. The booking form remains available for scheduling a call.
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
