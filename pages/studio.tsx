import Header from "../components/organism/Header";
import Footer from "../components/organism/Footer";
import Seo from "../components/Seo";
import StudioLanding from "../components/studio/StudioLanding";
import { breadcrumbJsonLd } from "../lib/seo";

export default function StudioPage() {
  const title = "Frasma Studio — software operativo e agenti AI";
  const description =
    "Una landing 3D per lo studio Frasma: software su misura, agenti AI, integrazioni e dashboard per processi aziendali reali.";

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/studio"
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Studio", path: "/studio" },
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
        <StudioLanding />
        <Footer />
      </main>
    </>
  );
}
