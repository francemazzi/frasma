"use client";

import Link from "next/link";
import Footer from "./Footer";
import Header from "./Header";
import OperationsSystemExamples from "./OperationsSystemExamples";
import ProcessAssessment from "./ProcessAssessment";
import Seo from "../Seo";
import { useLang, useT } from "../../lib/i18n/context";
import {
  canonicalPath,
  groupedOperationalServices,
  type LocalizedKnowledgeEntry,
} from "../../lib/knowledge";
import { breadcrumbJsonLd, professionalServiceJsonLd } from "../../lib/seo";

type Props = {
  kind: "services" | "cases";
  path: string;
  entries: LocalizedKnowledgeEntry[];
};

const BENEFIT_KEYS = [
  "catalog.benefit1",
  "catalog.benefit2",
  "catalog.benefit3",
  "catalog.benefit4",
] as const;

function EntryList({
  entries,
  lang,
}: {
  entries: LocalizedKnowledgeEntry[];
  lang: "it" | "en";
}) {
  return (
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
  );
}

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
  const serviceGroups = isServices
    ? groupedOperationalServices(entries)
    : [];

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
            {isServices ? (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ProcessAssessment
                  textButton={t("catalog.ctaButton")}
                  showArrow
                />
                <Link href="/#come-funziona" className="btn-ink-ghost">
                  {t("catalog.servicesHowLink")}
                </Link>
              </div>
            ) : null}
          </div>
        </section>

        {isServices ? (
          <section className="ed-section border-t border-ink/8">
            <div className="section-farm max-w-3xl">
              <h2 className="mb-6 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
                {t("catalog.benefitsTitle")}
              </h2>
              <ol className="space-y-3">
                {BENEFIT_KEYS.map((key, index) => (
                  <li
                    key={key}
                    className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 text-[16px] leading-[1.6] text-ink-soft"
                  >
                    <span className="text-[11px] font-medium tracking-[0.1em] text-ink-soft">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ) : null}

        {isServices ? (
          serviceGroups.map((group) => (
            <section
              key={group.family.id}
              className="ed-section border-t border-ink/8"
            >
              <div className="section-farm max-w-3xl">
                <h2 className="mb-3 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
                  {t(group.family.titleKey)}
                </h2>
                <p className="mb-8 text-[16px] leading-[1.6] text-ink-soft">
                  {t(group.family.introKey)}
                </p>
                <EntryList entries={group.entries} lang={lang} />
                {group.family.id === "operations" ? (
                  <OperationsSystemExamples variant="hub" />
                ) : null}
              </div>
            </section>
          ))
        ) : (
          <section className="ed-section border-t border-ink/8">
            <div className="section-farm max-w-3xl">
              <EntryList entries={entries} lang={lang} />
            </div>
          </section>
        )}

        {isServices ? (
          <section className="ed-section border-t border-ink/8">
            <div className="section-farm max-w-3xl">
              <h2 className="mb-4 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
                {t("catalog.servicesCtaTitle")}
              </h2>
              <p className="mb-6 text-[16px] leading-[1.6] text-ink-soft">
                {t("catalog.servicesCtaBody")}
              </p>
              <ProcessAssessment textButton={t("catalog.ctaButton")} showArrow />
            </div>
          </section>
        ) : null}

        <Footer />
      </main>
    </>
  );
}
