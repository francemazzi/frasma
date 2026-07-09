import type { GetServerSideProps } from "next";
import { buildRssFeed } from "../lib/blog/feed";

function Feed() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { getAllPostSummaries } = await import("../lib/blog/posts");
  const posts = getAllPostSummaries();
  const feed = buildRssFeed(posts);

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.write(feed);
  res.end();

  return { props: {} };
};

export default Feed;
