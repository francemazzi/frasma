import Head from "next/head";
import {
  absoluteUrl,
  BRAND_LOGO_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "../lib/seo";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  feedUrl?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

function buildJsonLd(
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
) {
  if (!jsonLd) return null;

  if (Array.isArray(jsonLd)) {
    return {
      "@context": "https://schema.org",
      "@graph": jsonLd,
    };
  }

  return {
    "@context": "https://schema.org",
    ...jsonLd,
  };
}

export default function Seo({
  title,
  description,
  path = "/",
  image = BRAND_LOGO_IMAGE,
  type = "website",
  noindex = false,
  publishedTime,
  modifiedTime,
  tags,
  feedUrl,
  jsonLd,
}: SeoProps) {
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const robots = noindex
    ? "noindex,nofollow"
    : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
  const structuredData = buildJsonLd(jsonLd);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />
      {feedUrl && (
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE_NAME} Blog RSS`}
          href={feedUrl}
        />
      )}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/logo-frasma.png" />

      <meta property="og:locale" content="it_IT" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" &&
        tags?.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

      <meta name="application-name" content={SITE_NAME} />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      <meta name="theme-color" content="#f7f4ec" />

      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <link rel="home" href={SITE_URL} />
    </Head>
  );
}
