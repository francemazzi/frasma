import Header from "../components/organism/Header";
import Intro from "../components/organism/Intro";
import HowIWork from "../components/organism/HowIWork";
import SearchLandingContent from "../components/organism/SearchLandingContent";
import Experience from "../components/organism/Experience";
import TechnicalSkillsDetailed from "../components/organism/TechnicalSkills";
import WhyContactMe from "../components/organism/WhyContactMe";
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

      <main className="min-h-screen bg-farm-bg font-poppins">
        <Header />
        <Intro />
        <SearchLandingContent />
        <HowIWork />
        <Experience />
        <TechnicalSkillsDetailed />
        <WhyContactMe />
        <CallToAction />
        <Footer />
      </main>
    </>
  );
}
