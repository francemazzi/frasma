"use client";

import Link from "next/link";
import Footer from "./Footer";
import Header from "./Header";
import ProcessAssessment from "./ProcessAssessment";
import Seo from "../Seo";
import { useLang, useT } from "../../lib/i18n/context";
import {
  canonicalPath,
  extrasForEntry,
  faqsForEntry,
  getCaseBySlug,
  getKnowledgeEntry,
  getServiceBySlug,
  relatedEntries,
} from "../../lib/knowledge";
import type { LocalizedKnowledgeEntry } from "../../lib/knowledge";
import {
  breadcrumbJsonLd,
  caseStudyJsonLd,
  faqPageJsonLd,
  professionalServiceJsonLd,
  serviceJsonLd,
  videoObjectJsonLd,
} from "../../lib/seo";

export type CatalogLandingLookup =
  | { kind: "service"; slug: string }
  | { kind: "case"; slug: string }
  | { kind: "sector"; entryId: string };

type Props = {
  lookup: CatalogLandingLookup;
};

function resolveEntry(
  lookup: CatalogLandingLookup,
): LocalizedKnowledgeEntry | undefined {
  if (lookup.kind === "service") return getServiceBySlug(lookup.slug);
  if (lookup.kind === "case") return getCaseBySlug(lookup.slug);
  return getKnowledgeEntry(lookup.entryId);
}

function kickerKey(entry: LocalizedKnowledgeEntry): string {
  if (entry.category === "service") return "catalog.serviceKicker";
  if (entry.category === "case-study") return "catalog.caseKicker";
  return "catalog.sectorKicker";
}

function breadcrumbs(
  entry: LocalizedKnowledgeEntry,
  path: string,
  t: (key: string) => string,
) {
  const items = [{ name: t("catalog.home"), path: "/" }];

  if (entry.category === "service") {
    items.push({ name: t("catalog.servicesKicker"), path: "/servizi" });
  } else if (entry.category === "case-study") {
    items.push({ name: t("catalog.casesKicker"), path: "/casi" });
  }

  items.push({ name: entry.title.it, path });
  return items;
}

export default function CatalogLanding({ lookup }: Props) {
  const t = useT();
  const { lang } = useLang();
  const entry = resolveEntry(lookup);

  if (!entry) {
    return null;
  }

  const path = canonicalPath(entry);
  const title = `${entry.title[lang]} | Frasma`;
  const description = entry.summary[lang];
  const faqs = faqsForEntry(entry, lang);
  const extras = extrasForEntry(entry.id);
  const related = relatedEntries(entry).filter(
    (item) => canonicalPath(item) !== path,
  );
  const crumb = breadcrumbs(entry, path, t);
  crumb[crumb.length - 1] = { name: entry.title[lang], path };

  const jsonLd: Array<Record<string, unknown>> = [
    breadcrumbJsonLd(crumb),
    professionalServiceJsonLd,
  ];

  if (entry.category === "case-study") {
    jsonLd.push(
      caseStudyJsonLd({
        id: entry.id,
        name: entry.title[lang],
        description,
        path,
      }),
    );
  } else {
    jsonLd.push(
      serviceJsonLd({
        id: entry.id,
        name: entry.title[lang],
        description,
        path,
      }),
    );
  }

  if (faqs.length > 0) {
    jsonLd.push(faqPageJsonLd(faqs));
  }

  if (extras?.videoUrl && extras.videoTitle) {
    jsonLd.push(
      videoObjectJsonLd({
        name: extras.videoTitle[lang],
        description,
        url: extras.videoUrl,
      }),
    );
  }

  return (
    <>
      <Seo title={title} description={description} path={path} jsonLd={jsonLd} />

      <main className="min-h-screen bg-paper font-sans text-ink">
        <Header />

        <section className="ed-section">
          <div className="section-farm max-w-3xl">
            <div className="ed-kicker">{t(kickerKey(entry))}</div>
            <h1 className="ed-title mb-6">{entry.title[lang]}</h1>
            <p className="ed-intro">{entry.summary[lang]}</p>
            {entry.keywords[lang].length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {entry.keywords[lang].map((keyword) => (
                  <li
                    key={keyword}
                    className="rounded-full border border-ink/10 px-3 py-1 text-[12px] text-ink-soft"
                  >
                    {keyword}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>

        <section className="ed-section border-t border-ink/8">
          <div className="section-farm max-w-3xl">
            <h2 className="mb-6 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
              {t("catalog.howTitle")}
            </h2>
            <ul className="space-y-3">
              {entry.details.map((detail) => (
                <li
                  key={detail.it}
                  className="text-[16px] leading-[1.6] text-ink-soft"
                >
                  {detail[lang]}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {extras?.videoUrl || extras?.blogPath ? (
          <section className="ed-section border-t border-ink/8">
            <div className="section-farm max-w-3xl space-y-3">
              {extras.videoUrl && extras.videoTitle ? (
                <p className="text-[16px] leading-[1.6] text-ink-soft">
                  <span className="font-semibold text-ink">
                    {t("catalog.videoLabel")}:{" "}
                  </span>
                  <Link
                    href={extras.videoUrl}
                    className="text-accent underline-offset-2 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {extras.videoTitle[lang]}
                  </Link>
                </p>
              ) : null}
              {extras.blogPath && extras.blogTitle ? (
                <p className="text-[16px] leading-[1.6] text-ink-soft">
                  <span className="font-semibold text-ink">
                    {t("catalog.articleLabel")}:{" "}
                  </span>
                  <Link
                    href={extras.blogPath}
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    {extras.blogTitle[lang]}
                  </Link>
                </p>
              ) : null}
            </div>
          </section>
        ) : null}

        {faqs.length > 0 ? (
          <section className="ed-section border-t border-ink/8">
            <div className="section-farm max-w-3xl">
              <h2 className="mb-6 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
                {t("catalog.faqTitle")}
              </h2>
              <dl className="space-y-5">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <dt className="text-[17px] font-medium text-ink">
                      {faq.question}
                    </dt>
                    <dd className="mt-1 text-[15px] leading-[1.55] text-ink-soft">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="ed-section border-t border-ink/8">
            <div className="section-farm max-w-3xl">
              <h2 className="mb-6 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
                {t("catalog.relatedTitle")}
              </h2>
              <ul className="space-y-4">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={canonicalPath(item)}
                      className="text-[16px] font-medium text-accent underline-offset-2 hover:underline"
                    >
                      {item.title[lang]}
                    </Link>
                    <p className="mt-1 text-[15px] leading-[1.55] text-ink-soft">
                      {item.summary[lang]}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="ed-section border-t border-ink/8">
          <div className="section-farm max-w-3xl">
            <h2 className="mb-4 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
              {t("catalog.ctaTitle")}
            </h2>
            <p className="mb-6 text-[16px] leading-[1.6] text-ink-soft">
              {t("catalog.ctaBody")}
            </p>
            <ProcessAssessment textButton={t("catalog.ctaButton")} showArrow />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
