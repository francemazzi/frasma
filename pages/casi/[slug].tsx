import type { GetStaticPaths, GetStaticProps } from "next";
import CatalogLanding from "../../components/organism/CatalogLanding";
import {
  CASES_HUB_PATH,
  canonicalPath,
  caseStudies,
  getCaseBySlug,
  slugFromPath,
} from "../../lib/knowledge";

type Props = {
  slug: string;
};

export default function CasePage({ slug }: Props) {
  return <CatalogLanding lookup={{ kind: "case", slug }} />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: caseStudies()
    .map((entry) => slugFromPath(canonicalPath(entry), CASES_HUB_PATH))
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug =
    typeof context.params?.slug === "string" ? context.params.slug : "";

  if (!getCaseBySlug(slug)) {
    return { notFound: true };
  }

  return { props: { slug } };
};
