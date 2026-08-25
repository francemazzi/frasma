import {
  EXTRA_SITEMAP_PATHS,
  indexableCatalogPaths,
} from "./knowledge/paths";
import { SITE_URL } from "./seo";

export type SitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
};

function sitemapPriority(path: string): string {
  if (path === "/") return "1.0";
  if (path === "/for-agents" || path === "/servizi" || path === "/casi") {
    return "0.9";
  }
  if (path.startsWith("/servizi/") || path.startsWith("/casi/")) return "0.8";
  if (
    path === "/manifattura" ||
    path === "/alimentare" ||
    path === "/agronomia" ||
    path === "/manutenzione"
  ) {
    return "0.8";
  }
  if (path === "/blog") return "0.7";
  return "0.7";
}

function sitemapChangefreq(path: string): string {
  if (path === "/" || path === "/blog") return "weekly";
  return "monthly";
}

export function catalogSitemapEntries(lastmod: string): SitemapEntry[] {
  const paths = [...new Set([...EXTRA_SITEMAP_PATHS, ...indexableCatalogPaths()])];

  return paths
    .sort((a, b) => a.localeCompare(b))
    .map((path) => ({
      loc: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
      lastmod,
      changefreq: sitemapChangefreq(path),
      priority: sitemapPriority(path),
    }));
}

export function buildSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
