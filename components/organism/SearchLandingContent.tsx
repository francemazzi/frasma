"use client";

import { LayoutDashboard, Bot, Workflow, ScanText } from "lucide-react";

import { useT } from "../../lib/i18n/context";
import { BentoCard, BentoGrid } from "../atoms/Bento";

const services = [
  {
    titleKey: "search.service1.title",
    descKey: "search.service1.desc",
    Icon: LayoutDashboard,
    className: "lg:col-span-2",
  },
  {
    titleKey: "search.service2.title",
    descKey: "search.service2.desc",
    Icon: Bot,
    className: "lg:col-span-1",
  },
  {
    titleKey: "search.service3.title",
    descKey: "search.service3.desc",
    Icon: Workflow,
    className: "lg:col-span-1",
  },
  {
    titleKey: "search.service4.title",
    descKey: "search.service4.desc",
    Icon: ScanText,
    className: "lg:col-span-2",
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

        <BentoGrid>
          {services.map((service) => (
            <BentoCard
              key={service.titleKey}
              className={service.className}
              name={t(service.titleKey)}
              description={t(service.descKey)}
              Icon={service.Icon}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
