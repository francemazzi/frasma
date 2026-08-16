import Header from "../components/organism/Header";
import Intro from "../components/organism/Intro";
import Results from "../components/organism/Results";
import Platform from "../components/organism/Platform";
import WhyContactMe from "../components/organism/WhyContactMe";
import Continuity from "../components/organism/Continuity";
import QualifyLead from "../components/organism/QualifyLead";
import FundingSupport from "../components/organism/FundingSupport";
import Founder from "../components/organism/Founder";
import CallToAction from "../components/organism/CallToAction";
import Footer from "../components/organism/Footer";
import Seo from "../components/Seo";
import { useLang, useT } from "../lib/i18n/context";
import {
  breadcrumbJsonLd,
  personJsonLd,
  professionalServiceJsonLd,
  serviceOfferCatalogJsonLd,
  websiteJsonLd,
} from "../lib/seo";

const HOMEPAGE_SERVICE_IDS = [
  "delivery-notes-to-erp",
  "workflow-procedures",
  "custom-management-software",
  "company-wiki-brain",
] as const;

export default function Home() {
  const t = useT();
  const { lang } = useLang();
  const title = t("meta.title");
  const description = t("meta.description");

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/"
        jsonLd={[
          websiteJsonLd,
          professionalServiceJsonLd,
          personJsonLd,
          serviceOfferCatalogJsonLd(lang, HOMEPAGE_SERVICE_IDS),
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
        ]}
      />

      <main className="min-h-screen bg-paper font-sans">
        <Header />
        <Intro />
        <QualifyLead />
        <Platform />
        <Results />
        <WhyContactMe />
        <Continuity />
        <FundingSupport />
        <Founder />
        <CallToAction />
        <Footer />
      </main>
    </>
  );
}
