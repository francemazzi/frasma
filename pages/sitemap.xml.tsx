import type { GetServerSideProps } from "next";
import { SITE_URL } from "../lib/seo";
import {
  buildSitemapXml,
  catalogSitemapEntries,
  type SitemapEntry,
} from "../lib/sitemap";

function SiteMap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { getAllPostSummaries, getAllTags } = await import("../lib/blog/posts");
  const posts = getAllPostSummaries();
  const tags = getAllTags();
  const today = new Date().toISOString().slice(0, 10);
  const latestPostDate =
    posts[0]?.updatedAt ?? posts[0]?.publishedAt ?? today;

  const catalogEntries = catalogSitemapEntries(today).map((entry) =>
    entry.loc === `${SITE_URL}/blog`
      ? { ...entry, lastmod: latestPostDate }
      : entry,
  );

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

  const sitemap = buildSitemapXml(
    catalogEntries.concat(blogEntries, tagEntries),
  );

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default SiteMap;
