import Header from "../components/organism/Header";
import Experience from "../components/organism/Experience";
import Footer from "../components/organism/Footer";
import Seo from "../components/Seo";
import { useT } from "../lib/i18n/context";
import { breadcrumbJsonLd } from "../lib/seo";

export default function ProgettiPage() {
  const t = useT();
  const title = `${t("projects.title")} — Frasma`;
  const description = t("projects.subtitle");

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/progetti"
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: t("header.nav.projects"), path: "/progetti" },
          ]),
        ]}
      />

      <main className="min-h-screen bg-paper font-sans">
        <Header />
        <Experience />
        <Footer />
      </main>
    </>
  );
}
