import type { GetStaticProps } from "next";
import Header from "../../components/organism/Header";
import Footer from "../../components/organism/Footer";
import PostCard from "../../components/blog/PostCard";
import Seo from "../../components/Seo";
import { FEED_URL } from "../../lib/blog/feed";
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
        feedUrl={FEED_URL}
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
              <PostCard key={post.slug} post={post} />
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
