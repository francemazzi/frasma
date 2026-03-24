"use client";

import { useT } from "../../lib/i18n/context";
import Cal from "./Cal";

export default function Intro() {
  const t = useT();

  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <div className="section-farm text-center">
        <p
          className="text-sage-500 font-medium text-lg mb-4 tracking-wide"
        >
          {t("hero.subtitle")}
        </p>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-farm-text leading-tight tracking-tight mb-6"
        >
          {t("hero.title1")}
          <br />
          <span className="text-farm-secondary">
            {t("hero.title2")}
          </span>
        </h1>

        <p
          className="text-xl text-farm-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t("hero.desc")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Cal textButton={t("hero.cta")} buttonType="default" />
          <a
            href="#projects"
            className="text-sage-500 font-medium hover:text-sage-600 transition-colors"
          >
            {t("hero.projects")} &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
