import type { GetServerSideProps } from "next";
import { SITE_URL } from "../lib/seo";

type SitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
};

const STATIC_PAGES: SitemapEntry[] = [
  { loc: `${SITE_URL}/`, lastmod: "2026-07-08", changefreq: "weekly", priority: "1.0" },
  { loc: `${SITE_URL}/manifattura`, lastmod: "2026-05-12", changefreq: "monthly", priority: "0.8" },
  { loc: `${SITE_URL}/studio`, lastmod: "2026-07-08", changefreq: "monthly", priority: "0.8" },
  { loc: `${SITE_URL}/programmatore-freelance`, lastmod: "2026-05-12", changefreq: "monthly", priority: "0.9" },
  { loc: `${SITE_URL}/vibeup`, lastmod: "2026-05-12", changefreq: "monthly", priority: "0.7" },
  { loc: `${SITE_URL}/blog`, lastmod: "2026-07-08", changefreq: "weekly", priority: "0.7" },
];

function buildSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function SiteMap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { getAllPostSummaries, getAllTags } = await import("../lib/blog/posts");
  const posts = getAllPostSummaries();
  const tags = getAllTags();
  const latestPostDate =
    posts[0]?.updatedAt ?? posts[0]?.publishedAt ?? "2026-07-08";

  const blogEntries: SitemapEntry[] = posts.map((post) => ({
    loc: `${SITE_URL}/blog/${post.slug}`,
    lastmod: post.updatedAt ?? post.publishedAt,
    changefreq: "monthly",
    priority: "0.6",
  }));

  const tagEntries: SitemapEntry[] = tags.map((tag) => ({
    loc: `${SITE_URL}/blog/tag/${tag}`,
    lastmod: latestPostDate,
    changefreq: "weekly",
    priority: "0.5",
  }));

  const entries = STATIC_PAGES.map((page) =>
    page.loc === `${SITE_URL}/blog`
      ? { ...page, lastmod: latestPostDate }
      : page
  ).concat(blogEntries, tagEntries);

  const sitemap = buildSitemapXml(entries);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default SiteMap;
