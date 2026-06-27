"use client";

import { useT } from "../../lib/i18n/context";
import Cal from "./Cal";

const HERO_POINTS = ["hero.point1", "hero.point2", "hero.point3"] as const;

export default function Intro() {
  const t = useT();

  return (
    <section id="top" className="section-farm">
      <div className="pt-16 sm:pt-20 lg:pt-[70px] pb-20 sm:pb-24 lg:pb-[110px]">
        <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-accent mb-5">
          {t("hero.eyebrow")}
        </p>
        <h1
          className="font-serif font-normal text-ink leading-[1.0] tracking-[-0.025em] mb-10 max-w-[16ch] [text-wrap:balance]"
          style={{ fontSize: "clamp(46px, 5.4vw, 86px)" }}
        >
          {t("hero.title1")}{" "}
          <em className="italic text-accent font-normal">{t("hero.titleEm")}</em>{" "}
          {t("hero.title2")}
        </h1>

        <ul className="list-none max-w-[52ch] space-y-3 mb-4">
          {HERO_POINTS.map((key) => (
            <li key={key} className="flex items-start gap-3">
              <span className="mt-[9px] w-[5px] h-[5px] bg-accent rounded-full shrink-0" />
              <span className="text-[17px] leading-[1.5] text-ink-2">{t(key)}</span>
            </li>
          ))}
        </ul>

        <div className="flex gap-[14px] mt-10 items-center flex-wrap">
          <Cal textButton={t("hero.cta")} buttonType="ink" showArrow />
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
