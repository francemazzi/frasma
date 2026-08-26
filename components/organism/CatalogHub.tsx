"use client";

import Link from "next/link";
import Footer from "./Footer";
import Header from "./Header";
import Seo from "../Seo";
import { useLang, useT } from "../../lib/i18n/context";
import {
  canonicalPath,
  type LocalizedKnowledgeEntry,
} from "../../lib/knowledge";
import { breadcrumbJsonLd, professionalServiceJsonLd } from "../../lib/seo";

type Props = {
  kind: "services" | "cases";
  path: string;
  entries: LocalizedKnowledgeEntry[];
};

export default function CatalogHub({ kind, path, entries }: Props) {
  const t = useT();
  const { lang } = useLang();
  const isServices = kind === "services";
  const title = t(
    isServices ? "catalog.servicesMetaTitle" : "catalog.casesMetaTitle",
  );
  const description = t(
    isServices
      ? "catalog.servicesMetaDescription"
      : "catalog.casesMetaDescription",
  );

  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        jsonLd={[
          breadcrumbJsonLd([
            { name: t("catalog.home"), path: "/" },
            {
              name: t(
                isServices ? "catalog.servicesKicker" : "catalog.casesKicker",
              ),
              path,
            },
          ]),
          professionalServiceJsonLd,
        ]}
      />

      <main className="min-h-screen bg-paper font-sans text-ink">
        <Header />

        <section className="ed-section">
          <div className="section-farm max-w-3xl">
            <div className="ed-kicker">
              {t(isServices ? "catalog.servicesKicker" : "catalog.casesKicker")}
            </div>
            <h1 className="ed-title mb-6">
              {t(isServices ? "catalog.servicesTitle" : "catalog.casesTitle")}
            </h1>
            <p className="ed-intro">
              {t(isServices ? "catalog.servicesIntro" : "catalog.casesIntro")}
            </p>
          </div>
        </section>

        <section className="ed-section border-t border-ink/8">
          <div className="section-farm max-w-3xl">
            <ul className="space-y-6">
              {entries.map((entry) => (
                <li key={entry.id}>
                  <Link
                    href={canonicalPath(entry)}
                    className="text-[18px] font-medium text-ink underline-offset-2 hover:text-accent hover:underline"
                  >
                    {entry.title[lang]}
                  </Link>
                  <p className="mt-1 text-[15px] leading-[1.55] text-ink-soft">
                    {entry.summary[lang]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
