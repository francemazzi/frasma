import Link from "next/link";
import Header from "../organism/Header";
import Footer from "../organism/Footer";
import { formatItalianDate } from "../../lib/blog/format";
import type { BlogPostSummary } from "../../lib/blog/types";

type BlogPostLayoutProps = {
  post: BlogPostSummary & { htmlContent: string };
};

export default function BlogPostLayout({ post }: BlogPostLayoutProps) {
  return (
    <main className="min-h-screen bg-paper font-sans">
      <Header />

      <article className="section-farm py-16 max-w-3xl mx-auto px-4">
        <Link
          href="/blog"
          className="text-sage-600 hover:text-sage-500 transition-colors mb-8 inline-block"
        >
          ← Torna al blog
        </Link>

        <time className="block text-sm text-farm-secondary mt-4">
          {formatItalianDate(post.publishedAt)}
        </time>
        <h1 className="text-4xl font-bold text-farm-text mt-2 mb-8">
          {post.title}
        </h1>

        {post.tags && post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <li key={tag}>
                <span className="inline-block rounded-full bg-farm-surface border border-farm-border px-3 py-1 text-sm text-farm-secondary">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div
          className="blog-content prose prose-lg max-w-none text-farm-secondary space-y-6"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />
      </article>

      <Footer />
    </main>
  );
}
