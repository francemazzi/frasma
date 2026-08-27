"use client";

import { useT } from "../../lib/i18n/context";
import { Reveal } from "../atoms/Reveal";
import ProcessAssessment from "./ProcessAssessment";
import { AgentMock, MockStage } from "./productMocks";

export default function Intro() {
  const t = useT();

  return (
    <section id="top" className="section-farm">
      <div className="pt-20 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 text-center">
        <Reveal
          as="p"
          className="mb-7 inline-flex rounded-full border border-hairline-strong bg-paper-2 px-4 py-2 text-[11px] font-medium tracking-[0.1em] uppercase text-accent"
        >
          {t("hero.eyebrow")}
        </Reveal>
        <Reveal
          as="h1"
          delay={0.08}
          className="mx-auto mb-8 max-w-[16ch] font-sans font-medium text-ink leading-[0.98] tracking-[-0.06em] [text-wrap:balance] [font-size:clamp(48px,7vw,96px)]"
        >
          {t("hero.title1")}{" "}
          <span className="text-accent">{t("hero.titleEm")}</span>{" "}
          {t("hero.title2")}
        </Reveal>

        <Reveal
          as="p"
          delay={0.16}
          className="mx-auto max-w-[66ch] text-[18px] font-normal leading-[1.55] tracking-[-0.02em] text-ink-soft sm:text-[21px]"
        >
          {t("hero.subtitle")}
        </Reveal>

        <Reveal
          delay={0.24}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <ProcessAssessment textButton={t("hero.cta")} showArrow />
          <a href="#come-funziona" className="btn-ink-ghost">
            {t("hero.secondary")}
          </a>
        </Reveal>
        <Reveal
          as="p"
          delay={0.3}
          className="mx-auto mt-6 max-w-[68ch] text-[13px] leading-[1.55] text-ink-soft"
        >
          {t("hero.risk")}
        </Reveal>
      </div>

      <Reveal delay={0.2} className="pb-16 sm:pb-24">
        <div className="overflow-hidden rounded-3xl border border-hairline-strong">
          <div className="h-[400px] sm:h-[420px] lg:h-[520px]">
            <MockStage variant="mist" badge={t("mock.working")}>
              <AgentMock compact />
            </MockStage>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
