"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useT } from "../../../lib/i18n/context";
import { Reveal } from "../../atoms/Reveal";
import { BentoCard } from "../../atoms/Bento";
import {
  AgentMock,
  CustomersMock,
  FieldAssignMock,
  MockStage,
  PreventiviMock,
  TicketsMock,
  WorkflowMock,
} from "../productMocks";

const NAMES = [6, 1, 2, 3, 4, 5] as const;

export default function HomeModules() {
  const t = useT();
  const working = t("mock.working");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const slides = [
    {
      id: "customers",
      name: t("home.modules.6.title"),
      description: t("home.modules.6.short"),
      background: (active: boolean) => (
        <MockStage variant="mist" badge={working} active={active}>
          <CustomersMock />
        </MockStage>
      ),
    },
    {
      id: "orders",
      name: t("home.modules.1.title"),
      description: t("home.modules.1.short"),
      background: (active: boolean) => (
        <MockStage variant="peach" badge={working} active={active}>
          <AgentMock compact />
        </MockStage>
      ),
    },
    {
      id: "quality",
      name: t("home.modules.2.title"),
      description: t("home.modules.2.short"),
      background: (active: boolean) => (
        <MockStage variant="lavender" badge={working} active={active}>
          <WorkflowMock />
        </MockStage>
      ),
    },
    {
      id: "technical",
      name: t("home.modules.3.title"),
      description: t("home.modules.3.short"),
      background: (active: boolean) => (
        <MockStage variant="mist" badge={working} active={active}>
          <PreventiviMock />
        </MockStage>
      ),
    },
    {
      id: "production",
      name: t("home.modules.4.title"),
      description: t("home.modules.4.short"),
      background: (active: boolean) => (
        <MockStage variant="teal" badge={working} active={active}>
          <FieldAssignMock />
        </MockStage>
      ),
    },
    {
      id: "service",
      name: t("home.modules.5.title"),
      description: t("home.modules.5.short"),
      background: (active: boolean) => (
        <MockStage variant="peach" badge={working} active={active}>
          <TicketsMock />
        </MockStage>
      ),
    },
  ];

  const total = slides.length;

  const syncIndex = useCallback(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const origin = root.getBoundingClientRect().left;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    Array.from(root.children).forEach((node, i) => {
      const dist = Math.abs((node as HTMLElement).getBoundingClientRect().left - origin);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setIndex(Math.min(best, total - 1));
  }, [total]);

  const goTo = useCallback((next: number) => {
    const root = scrollerRef.current;
    if (!root) return;
    const logical = ((next % total) + total) % total;
    const child = root.children[logical] as HTMLElement | undefined;
    if (!child) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const left =
      child.getBoundingClientRect().left - root.getBoundingClientRect().left + root.scrollLeft;
    root.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
    setIndex(logical);
  }, [total]);

  return (
    <section id="moduli" className="ed-section border-t border-hairline">
      <div className="section-farm">
        <Reveal className="mb-8 max-w-3xl">
          <h2 className="ed-title">{t("home.modules.title")}</h2>
          <p className="ed-intro mt-4">{t("home.modules.intro")}</p>
        </Reveal>

        <ul className="mb-8 flex flex-wrap gap-2">
          {NAMES.map((id, chipIndex) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => goTo(chipIndex)}
                className={`rounded-full border px-3 py-1.5 text-[13px] font-medium ${
                  index === chipIndex
                    ? "border-ink bg-ink text-paper"
                    : "border-hairline-strong text-ink"
                }`}
              >
                {t(`home.modules.${id}.title`)}
              </button>
            </li>
          ))}
        </ul>

        <div
          ref={scrollerRef}
          className="use-case-scroller snap-scroller flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1"
          onScroll={syncIndex}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={t("home.modules.title")}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goTo(index + 1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              goTo(index - 1);
            }
          }}
        >
          {slides.map((slide, i) => (
            <article key={slide.id} className="w-[92%] shrink-0 snap-start sm:w-[min(40rem,86%)]">
              <BentoCard
                className="h-[24rem] sm:h-[30rem]"
                name={slide.name}
                description={slide.description}
                background={slide.background(index === i)}
              />
            </article>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label={t("useCases.previous")}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-[20px] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            ←
          </button>
          <div className="flex items-center gap-4">
            <p className="text-[15px] font-medium leading-none">
              <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
              <span className="px-1 text-[13px] text-ink-faint">/</span>
              <span className="text-[13px] text-ink-soft">{String(total).padStart(2, "0")}</span>
            </p>
            <div className="flex gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`${t("useCases.pageWord")} ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`h-1.5 rounded-[1px] transition-all ${
                    i === index ? "w-8 bg-accent" : "w-6 bg-hairline-strong"
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label={t("useCases.next")}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-[20px] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            →
          </button>
        </div>

        <div className="mt-6">
          <Link href="#contatti" className="btn-ink">
            {t("home.hero.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
