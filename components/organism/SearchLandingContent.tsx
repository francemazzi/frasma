"use client";

import { useT } from "../../lib/i18n/context";

const services = [
  {
    titleKey: "search.service1.title",
    descKey: "search.service1.desc",
  },
  {
    titleKey: "search.service2.title",
    descKey: "search.service2.desc",
  },
  {
    titleKey: "search.service3.title",
    descKey: "search.service3.desc",
  },
  {
    titleKey: "search.service4.title",
    descKey: "search.service4.desc",
  },
];

export default function SearchLandingContent() {
  const t = useT();

  return (
    <section id="servizi" className="py-20 sm:py-24 bg-farm-bg">
      <div className="section-farm">
        <div className="max-w-3xl mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-sage-500 mb-3">
            {t("search.eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-farm-text tracking-tight mb-5">
            {t("search.title")}
          </h2>
          <p className="text-lg leading-relaxed text-farm-secondary">
            {t("search.description")}
          </p>
          <p className="mt-4 text-base leading-relaxed text-farm-tertiary">
            {t("search.coverage")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.titleKey}
              className="rounded-2xl border border-farm-border bg-farm-surface p-5 shadow-sm h-full"
            >
              <h3 className="text-base font-semibold text-farm-text mb-2">
                {t(service.titleKey)}
              </h3>
              <p className="text-sm leading-relaxed text-farm-secondary">
                {t(service.descKey)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
