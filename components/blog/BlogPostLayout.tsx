import Image from "next/image";
import Link from "next/link";
import Header from "../organism/Header";
import Footer from "../organism/Footer";
import RelatedPosts from "./RelatedPosts";
import TagList from "./TagList";
import { formatItalianDate } from "../../lib/blog/format";
import type { BlogPostSummary } from "../../lib/blog/types";

type BlogPostLayoutProps = {
  post: BlogPostSummary & { htmlContent: string };
  relatedPosts?: BlogPostSummary[];
};

export default function BlogPostLayout({
  post,
  relatedPosts = [],
}: BlogPostLayoutProps) {
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

        {post.coverImage && (
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl border border-farm-border">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {post.tags && post.tags.length > 0 && <TagList tags={post.tags} />}

        <div
          className="blog-content prose prose-lg max-w-none text-farm-secondary space-y-6"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />

        <aside className="mt-12 rounded-2xl border border-farm-border bg-farm-surface p-6">
          <p className="text-farm-secondary leading-relaxed">
            Cerchi supporto su software su misura, automazioni o sviluppo
            freelance? Scopri{" "}
            <Link href="/studio" className="text-sage-600 font-semibold hover:text-sage-500 underline">
              Frasma Studio
            </Link>{" "}
            e la pagina{" "}
            <Link
              href="/programmatore-freelance"
              className="text-sage-600 font-semibold hover:text-sage-500 underline"
            >
              programmatore freelance
            </Link>
            .
          </p>
        </aside>

        <RelatedPosts posts={relatedPosts} />
      </article>

      <Footer />
    </main>
  );
}
