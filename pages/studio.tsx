import Header from "../components/organism/Header";
import Seo from "../components/Seo";
import ProjectFarmPage from "../components/projectFarm/ProjectFarmPage";
import { breadcrumbJsonLd } from "../lib/seo";

export default function StudioPage() {
  const title = "Frasma Studio — mercato progetti";
  const description =
    "Tabellone quote dei progetti in portafoglio: traction, team e segnali di crescita in tempo reale.";

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/studio"
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Frasma Studio", path: "/studio" },
          ]),
          {
            "@type": "WebPage",
            name: "Frasma Studio",
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
