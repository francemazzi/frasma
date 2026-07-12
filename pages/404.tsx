import Image from "next/image";
import Link from "next/link";
import Header from "../components/organism/Header";
import Footer from "../components/organism/Footer";
import Seo from "../components/Seo";
import { useT } from "../lib/i18n/context";

export default function NotFoundPage() {
  const t = useT();
  const title = t("notFound.metaTitle");
  const description = t("notFound.metaDescription");

  return (
    <>
      <Seo title={title} description={description} path="/404" noindex />

      <main className="min-h-screen bg-paper font-sans">
        <Header />

        <section className="section-farm py-20 sm:py-28 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center mb-8">
            <Image
              src="/logo-frasma.png"
              alt="Frasma"
              width={96}
              height={96}
              priority
              className="h-24 w-24 rounded-full object-cover farm-sprout"
              style={{
                boxShadow:
                  "0 18px 40px -12px rgba(27,25,22,0.28), 0 0 0 1px rgba(27,25,22,0.08)",
              }}
            />
          </div>

          <p className="ed-kicker">{t("notFound.kicker")}</p>
          <h1 className="ed-title mt-3 mb-5">{t("notFound.title")}</h1>
          <p className="ed-intro mx-auto mb-10">{t("notFound.description")}</p>

          <Link href="/" className="btn-ink no-underline">
            {t("notFound.home")}
          </Link>
        </section>

        <Footer />
      </main>
    </>
  );
}
