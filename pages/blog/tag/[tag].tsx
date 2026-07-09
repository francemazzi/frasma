import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Header from "../../../components/organism/Header";
import Footer from "../../../components/organism/Footer";
import PostCard from "../../../components/blog/PostCard";
import Seo from "../../../components/Seo";
import { FEED_URL } from "../../../lib/blog/feed";
import { formatTagLabel } from "../../../lib/blog/tags";
import type { BlogPostSummary } from "../../../lib/blog/types";
import { absoluteUrl, breadcrumbJsonLd, SITE_URL } from "../../../lib/seo";

type TagPageProps = {
  tag: string;
  posts: BlogPostSummary[];
};

export default function BlogTagPage({ tag, posts }: TagPageProps) {
  const label = formatTagLabel(tag);
  const title = `${label} | Blog Frasma`;
  const description = `Articoli del blog Frasma con tag ${label.toLowerCase()}.`;
  const path = `/blog/tag/${tag}`;

  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        feedUrl={FEED_URL}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: label, path },
          ]),
          {
            "@type": "CollectionPage",
            name: title,
            description,
            url: absoluteUrl(path),
          },
        ]}
      />

      <main className="min-h-screen bg-paper font-sans">
        <Header />

        <section className="section-farm py-16 max-w-3xl mx-auto px-4">
          <Link
            href="/blog"
            className="text-sage-600 hover:text-sage-500 transition-colors mb-8 inline-block"
          >
            ← Torna al blog
          </Link>

          <h1 className="text-4xl font-bold text-farm-text mb-4">{label}</h1>
          <p className="text-farm-secondary mb-12">
            {posts.length}{" "}
            {posts.length === 1 ? "articolo trovato" : "articoli trovati"}
          </p>

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

export const getStaticPaths: GetStaticPaths = async () => {
  const { getAllTags } = await import("../../../lib/blog/posts");
  const tags = getAllTags();

  return {
    paths: tags.map((tag) => ({ params: { tag } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<TagPageProps> = async ({
  params,
}) => {
  const { getPostsByTag } = await import("../../../lib/blog/posts");
  const tag = params?.tag as string;
  const posts = getPostsByTag(tag);

  if (!posts.length) {
    return { notFound: true };
  }

  return {
    props: {
      tag,
      posts,
    },
  };
};
