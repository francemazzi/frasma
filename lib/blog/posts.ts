import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { markdownToHtml } from "./markdown";
import type { BlogPost, BlogPostFrontmatter, BlogPostSummary } from "./types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function parseFrontmatter(data: BlogPostFrontmatter, slug: string): BlogPostFrontmatter {
  return {
    ...data,
    slug: data.slug || slug,
    status: data.status ?? "published",
    tags: data.tags ?? [],
  };
}

function readMarkdownFile(filename: string): { slug: string; frontmatter: BlogPostFrontmatter; content: string } {
  const filePath = path.join(BLOG_DIR, filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const slug = filename.replace(/\.md$/, "");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: parseFrontmatter(data as BlogPostFrontmatter, slug),
    content,
  };
}

function listMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();
}

export function getAllPostSummaries(): BlogPostSummary[] {
  return listMarkdownFiles()
    .map((filename) => {
      const { frontmatter } = readMarkdownFile(filename);
      return frontmatter;
    })
    .filter((post) => post.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filename = `${slug}.md`;
  const filePath = path.join(BLOG_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { frontmatter, content } = readMarkdownFile(filename);

  if (frontmatter.status === "draft") {
    return null;
  }

  const htmlContent = await markdownToHtml(content);

  return {
    ...frontmatter,
    content,
    htmlContent,
  };
}

export function getAllPostSlugs(): string[] {
  return getAllPostSummaries().map((post) => post.slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();

  for (const post of getAllPostSummaries()) {
    for (const tag of post.tags ?? []) {
      tags.add(tag);
    }
  }

  return Array.from(tags).sort();
}

export function getPostsByTag(tag: string): BlogPostSummary[] {
  return getAllPostSummaries().filter((post) => post.tags?.includes(tag));
}

export function getRelatedPosts(
  post: BlogPostSummary,
  limit = 2
): BlogPostSummary[] {
  const postTags = new Set(post.tags ?? []);

  return getAllPostSummaries()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score: (candidate.tags ?? []).filter((tag) => postTags.has(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return (
        new Date(b.candidate.publishedAt).getTime() -
        new Date(a.candidate.publishedAt).getTime()
      );
    })
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
