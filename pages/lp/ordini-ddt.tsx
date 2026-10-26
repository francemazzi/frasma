import LandingHeader from "../../components/organism/home/LandingHeader";
import LandingIntro from "../../components/organism/home/LandingIntro";
import HomeModules from "../../components/organism/home/HomeModules";
import HomeExamples from "../../components/organism/home/HomeExamples";
import HomeAdoption from "../../components/organism/home/HomeAdoption";
import HomeIntegrations from "../../components/organism/home/HomeIntegrations";
import HomeFaq, { homeFaqItems } from "../../components/organism/home/HomeFaq";
import FundingSupport from "../../components/organism/FundingSupport";
import LandingFounder from "../../components/organism/home/LandingFounder";
import LandingCallToAction from "../../components/organism/home/LandingCallToAction";
import LandingFooter from "../../components/organism/home/LandingFooter";
import Seo from "../../components/Seo";
import { useLang, useT } from "../../lib/i18n/context";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  personJsonLd,
  professionalServiceJsonLd,
  websiteJsonLd,
} from "../../lib/seo";

export default function OrdiniDdtLanding() {
  const t = useT();
  const { lang } = useLang();
  const faqs = homeFaqItems(t);

  return (
    <>
      <Seo
        title={t("home.lp.title")}
        description={t("home.lp.description")}
        ogTitle={t("home.lp.ogTitle")}
        ogDescription={t("home.lp.ogDescription")}
        path="/lp/ordini-ddt"
        noindex
        jsonLd={[
          websiteJsonLd,
          professionalServiceJsonLd,
          personJsonLd,
          faqPageJsonLd(faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Ordini e DDT", path: "/lp/ordini-ddt" },
          ]),
        ]}
      />

      <main className="min-h-screen bg-paper font-sans" lang={lang}>
        <LandingHeader />
        <LandingIntro />
        <HomeExamples />
        <HomeAdoption />
        <HomeModules />
        <HomeIntegrations />
        <HomeFaq />
        <LandingCallToAction />
        <FundingSupport ctaHref="#contatti" ctaLabel={t("home.hero.cta")} />
        <LandingFounder />
        <LandingFooter />
      </main>
    </>
  );
}
