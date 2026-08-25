import { NextResponse, type NextRequest } from "next/server";
import { markdownForPath } from "./lib/knowledge/markdown";

const DISCOVERY_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</llms-it.txt>; rel="alternate"; type="text/plain"',
  '</for-agents>; rel="service-doc"; type="text/html"',
  '</servizi>; rel="service-doc"; type="text/html"',
].join(", ");

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
  const markdown = acceptsMarkdown(req.headers.get("accept"))
    ? markdownForPath(req.nextUrl.pathname)
    : null;

  if (markdown) {
    return new NextResponse(markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Link: DISCOVERY_LINK_HEADER,
        Vary: "Accept",
        "x-markdown-tokens": estimateMarkdownTokens(markdown),
      },
    });
  }

  const res = NextResponse.next();
  res.headers.set("Link", DISCOVERY_LINK_HEADER);
  addVary(res.headers, "Accept");
  return res;
}

export const config = {
  matcher: [
    "/",
    "/for-agents",
    "/servizi",
    "/servizi/:path*",
    "/casi",
    "/casi/:path*",
    "/alimentare",
    "/agronomia",
    "/manutenzione",
    "/manifattura",
  ],
};
