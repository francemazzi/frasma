"use client";

import Link from "next/link";
import { useT } from "../../../lib/i18n/context";
import { Reveal } from "../../atoms/Reveal";
import ProcessAssessment from "../ProcessAssessment";
import { AgentMock, MockStage } from "../productMocks";

const STRIP = ["home.hero.strip1", "home.hero.strip2", "home.hero.strip3"] as const;

export default function Intro() {
  const t = useT();

  return (
    <section id="top" className="section-farm pb-16 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
      <Reveal
        as="h1"
        delay={0.08}
        className="max-w-[12em] font-sans font-medium leading-[0.98] tracking-[-0.05em] text-ink [font-size:clamp(36px,7vw,84px)] [text-wrap:balance]"
      >
        {t("home.hero.title1")}
        <span className="mt-1 block text-accent">{t("home.hero.title2")}</span>
      </Reveal>
      <Reveal
        delay={0.16}
        className="mt-8 flex flex-wrap items-center gap-3"
      >
        <ProcessAssessment textButton={t("home.hero.cta")} showArrow />
        <Link
          href="#integrazioni"
          className="btn-ink-ghost focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t("home.hero.secondary")}
        </Link>
      </Reveal>
      <Reveal delay={0.24} className="mt-6">
        <ul className="flex flex-col gap-2 text-[14px] font-medium text-ink sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
          {STRIP.map((key) => (
            <li key={key} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {t(key)}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.2} className="mt-10">
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
