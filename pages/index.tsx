import Head from "next/head";
import Header from "../components/organism/Header";
import Intro from "../components/organism/Intro";
import HowIWork from "../components/organism/HowIWork";
import WhyContactMe from "../components/organism/WhyContactMe";
import Experience from "../components/organism/Experience";
import CallToAction from "../components/organism/CallToAction";
import Footer from "../components/organism/Footer";
import TechnicalSkillsDetailed from "../components/organism/TechnicalSkills";
import { useT } from "../lib/i18n/context";

export default function Home() {
  const t = useT();

  return (
    <>
      <Head>
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-farm-bg font-poppins">
        <Header />
        <Intro />
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
