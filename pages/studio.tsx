import Header from "../components/organism/Header";
import Seo from "../components/Seo";
import ProjectFarmPage from "../components/projectFarm/ProjectFarmPage";
import { breadcrumbJsonLd } from "../lib/seo";

export default function StudioPage() {
  const title = "Frasma Borsa — mercato progetti";
  const description =
    "Tabellone quote dei progetti in portafoglio: traction, team e segnali di crescita in stile borsa merci editoriale.";

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/studio"
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Frasma Borsa", path: "/studio" },
          ]),
          {
            "@type": "WebPage",
            name: "Frasma Borsa",
            description,
            url: "https://www.frasma.org/studio",
          },
        ]}
      />

      <main className="min-h-screen bg-paper font-sans">
        <Header />
        <ProjectFarmPage />
      </main>
    </>
  );
}
