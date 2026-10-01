"use client";

import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import Seo from "../Seo";
import { useLang } from "../../lib/i18n/context";
import { breadcrumbJsonLd } from "../../lib/seo";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalCopy = {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

type Props = {
  path: string;
  copy: Record<"it" | "en", LegalCopy>;
};

/** Shared layout for privacy and cookie pages. Plain text, no legalese beyond what is needed. */
export default function LegalPage({ path, copy }: Props) {
  const { lang } = useLang();
  const c = copy[lang];
  const homeLabel = lang === "it" ? "Home" : "Home";

  return (
    <>
      <Seo
        title={c.metaTitle}
        description={c.metaDescription}
        path={path}
        jsonLd={[
          breadcrumbJsonLd([
            { name: homeLabel, path: "/" },
            { name: c.title, path },
          ]),
        ]}
      />
      <main className="min-h-screen bg-paper font-sans">
        <Header />
        <article className="section-farm pb-24 pt-20 sm:pt-28">
          <nav className="mb-8 text-[12px] font-medium text-ink-soft">
            <Link href="/" className="hover:text-accent transition-colors">
              {homeLabel}
            </Link>
            <span className="mx-2 text-ink-faint">/</span>
            <span>{c.title}</span>
          </nav>
          <h1 className="max-w-[20ch] text-[38px] font-medium leading-[1.02] tracking-[-0.05em] text-ink sm:text-[56px] [text-wrap:balance]">
            {c.title}
          </h1>
          <p className="mt-4 text-[13px] text-ink-soft">{c.updated}</p>
          <p className="mt-8 max-w-[66ch] text-[17px] leading-[1.6] text-ink-soft">
            {c.intro}
          </p>

          <div className="mt-12 max-w-[72ch] space-y-10">
            {c.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-[22px] font-medium tracking-[-0.03em] text-ink">
                  {section.title}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 text-[15px] leading-[1.65] text-ink-soft"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-[1.65] text-ink-soft">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </article>
        <Footer />
      </main>
    </>
  );
}
