import Head from "next/head";
import dynamic from "next/dynamic";
import Header from "../components/organism/Header";
import Intro from "../components/organism/Intro";
import { useT } from "../lib/i18n/context";

const HowIWork = dynamic(
  () => import("../components/organism/HowIWork"),
  { ssr: false, loading: () => null }
);
const Experience = dynamic(
  () => import("../components/organism/Experience"),
  { ssr: false, loading: () => null }
);
const TechnicalSkillsDetailed = dynamic(
  () => import("../components/organism/TechnicalSkills"),
  { ssr: false, loading: () => null }
);
const WhyContactMe = dynamic(
  () => import("../components/organism/WhyContactMe"),
  { ssr: false, loading: () => null }
);
const CallToAction = dynamic(
  () => import("../components/organism/CallToAction"),
  { ssr: false, loading: () => null }
);
const Footer = dynamic(
  () => import("../components/organism/Footer"),
  { ssr: false, loading: () => null }
);

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
