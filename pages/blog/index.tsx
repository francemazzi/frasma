import type { GetStaticProps } from "next";
import Link from "next/link";
import Header from "../../components/organism/Header";
import Footer from "../../components/organism/Footer";
import Seo from "../../components/Seo";
import { formatItalianDate } from "../../lib/blog/format";
import type { BlogPostSummary } from "../../lib/blog/types";
import { absoluteUrl, breadcrumbJsonLd, SITE_URL } from "../../lib/seo";

type BlogIndexProps = {
  posts: BlogPostSummary[];
};

export default function Blog({ posts }: BlogIndexProps) {
  const title = "Blog sviluppo software freelance | Frasma";
  const description =
    "Articoli di Frasma su programmazione freelance, sviluppo software, automazioni AI e progetti tech.";

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/blog"
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
          {
            "@type": "Blog",
            "@id": `${SITE_URL}/blog#blog`,
            name: "Blog Frasma",
            description,
            url: absoluteUrl("/blog"),
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              datePublished: post.publishedAt,
              url: absoluteUrl(`/blog/${post.slug}`),
            })),
          },
        ]}
      />

      <main className="min-h-screen bg-paper font-sans">
        <Header />

        <section className="section-farm py-16 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-farm-text mb-12">Blog</h1>

          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-farm-surface rounded-2xl border border-farm-border p-8 hover:shadow-md transition-shadow"
              >
                <time className="text-sm text-farm-secondary">
                  {formatItalianDate(post.publishedAt)}
                </time>
                <h2 className="text-2xl font-semibold text-farm-text mt-2 mb-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-sage-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-farm-secondary leading-relaxed">
                  {post.excerpt}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <ul className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <li key={tag}>
                        <span className="inline-block rounded-full bg-paper border border-farm-border px-3 py-1 text-xs text-farm-secondary">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-4 text-sage-600 font-medium hover:text-sage-500 transition-colors"
                >
                  Leggi di più →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const { getAllPostSummaries } = await import("../../lib/blog/posts");

  return {
    props: {
      posts: getAllPostSummaries(),
    },
  };
};
