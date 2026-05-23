"use client";

import { useT } from "../../lib/i18n/context";

export default function Intro() {
  const t = useT();

  return (
    <section id="top" className="section-farm">
      <div className="pt-16 sm:pt-20 lg:pt-[70px] pb-20 sm:pb-24 lg:pb-[110px]">
        <h1
          className="font-serif font-normal text-ink leading-[1.0] tracking-[-0.025em] mb-10 max-w-[16ch] [text-wrap:balance]"
          style={{ fontSize: "clamp(46px, 5.4vw, 86px)" }}
        >
          {t("hero.title1")}{" "}
          <em className="italic text-accent font-normal">{t("hero.titleEm")}</em>{" "}
          {t("hero.title2")}
        </h1>

        <p className="text-[18px] leading-[1.6] text-ink-2 max-w-[62ch] mb-4">
          <strong className="text-ink font-medium">{t("hero.desc")}</strong>
        </p>
        <p className="text-[18px] leading-[1.6] text-ink-2 max-w-[62ch] mb-4">
          {t("hero.lead")}
        </p>

        <div className="flex gap-[14px] mt-10 items-center flex-wrap">
          <a href="#contact" className="btn-ink">
            {t("hero.cta")}
            <span className="font-serif text-[16px] leading-[0.8]">↗</span>
          </a>
          <a
            href="#casi-studio"
            className="font-mono text-[12px] tracking-[0.05em] uppercase text-ink no-underline pb-[3px] border-b border-ink hover:text-accent hover:border-accent transition-colors"
          >
            {t("hero.projects")} →
          </a>
        </div>
      </div>
    </section>
  );
}
