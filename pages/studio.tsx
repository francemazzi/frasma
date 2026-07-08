import Header from "../components/organism/Header";
import Seo from "../components/Seo";
import ProjectFarmPage from "../components/projectFarm/ProjectFarmPage";
import { breadcrumbJsonLd } from "../lib/seo";

export default function StudioPage() {
  const title = "Project Farm — mappa progetti Frasma";
  const description =
    "Una mappa interattiva dei progetti che sto coltivando: traction, team e segnali di crescita in stile fattoria digitale.";

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/studio"
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Project Farm", path: "/studio" },
          ]),
          {
            "@type": "WebPage",
            name: "Project Farm",
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
