import Header from "../components/organism/Header";
import Intro from "../components/organism/Intro";
import Results from "../components/organism/Results";
import Platform from "../components/organism/Platform";
import WhyContactMe from "../components/organism/WhyContactMe";
import QualifyLead from "../components/organism/QualifyLead";
import Founder from "../components/organism/Founder";
import CallToAction from "../components/organism/CallToAction";
import Footer from "../components/organism/Footer";
import Seo from "../components/Seo";
import { useT } from "../lib/i18n/context";
import {
  breadcrumbJsonLd,
  personJsonLd,
  professionalServiceJsonLd,
  websiteJsonLd,
} from "../lib/seo";

export default function Home() {
  const t = useT();
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
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
        ]}
      />

      <main className="min-h-screen bg-paper font-sans">
        <Header />
        <Intro />
        <Results />
        <Platform />
        <WhyContactMe />
        <QualifyLead />
        <Founder />
        <CallToAction />
        <Footer />
      </main>
    </>
  );
}
