import Head from "next/head";
import Header from "../components/organism/Header";
import Intro from "../components/organism/Intro";
import WhyContactMe from "../components/organism/WhyContactMe";
import Experience from "../components/organism/Experience";
import CallToAction from "../components/organism/CallToAction";
import Footer from "../components/organism/Footer";
import TechnicalSkillsDetailed from "../components/organism/TechnicalSkills";

export default function Home() {
  return (
    <>
      <Head>
        <title>Frasma - Developing future value</title>
        <meta name="description" content="Fall in love with technology" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-sand-50 to-green-50">
        <Header />
        <Intro />
        <WhyContactMe />
        <Experience />
        <CallToAction />
        <TechnicalSkillsDetailed />
        <Footer />
      </main>
    </>
  );
}
