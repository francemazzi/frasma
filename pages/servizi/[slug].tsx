import type { GetStaticPaths, GetStaticProps } from "next";
import CatalogLanding from "../../components/organism/CatalogLanding";
import { getServiceBySlug, operationalServices, slugFromPath, canonicalPath, SERVICES_HUB_PATH } from "../../lib/knowledge";

type Props = {
  slug: string;
};

export default function ServicePage({ slug }: Props) {
  return <CatalogLanding lookup={{ kind: "service", slug }} />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: operationalServices()
    .map((entry) => slugFromPath(canonicalPath(entry), SERVICES_HUB_PATH))
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug =
    typeof context.params?.slug === "string" ? context.params.slug : "";

  if (!getServiceBySlug(slug)) {
    return { notFound: true };
  }

  return { props: { slug } };
};
