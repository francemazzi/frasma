"use client";

import { useCallback, useRef, useState } from "react";
import { BentoCard } from "../atoms/Bento";
import {
  AgentMock,
  MockStage,
  PreventiviMock,
  TicketsMock,
  WorkflowMock,
} from "../organism/productMocks";
import type { FundingDemoSlide } from "../../lib/blog/fundingDemos";
import { CloudBackupMock, OnPremServerMock } from "./fundingMocks";

const MOCKS = {
  agent: () => <AgentMock compact />,
  preventivi: PreventiviMock,
  workflow: WorkflowMock,
  tickets: TicketsMock,
  server: OnPremServerMock,
  backup: CloudBackupMock,
} as const;

type FundingUseCaseCarouselProps = {
  title: string;
  intro: string;
  slides: FundingDemoSlide[];
};

export default function FundingUseCaseCarousel({
  title,
  intro,
  slides,
}: FundingUseCaseCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const syncIndex = useCallback(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const children = Array.from(root.children) as HTMLElement[];
    const left = root.scrollLeft;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    children.forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - left);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setIndex(best);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      const root = scrollerRef.current;
      if (!root) return;
      const clamped = Math.max(0, Math.min(total - 1, next));
      const child = root.children[clamped] as HTMLElement | undefined;
      child?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        inline: "start",
        block: "nearest",
      });
      setIndex(clamped);
    },
    [total],
  );

  return (
    <section className="not-prose my-10" aria-label={title}>
      <p className="ed-kicker">Esempi concreti</p>
      <h2 className="mt-2 text-[1.65rem] font-medium tracking-[-0.03em] text-farm-text">
        {title}
      </h2>
      <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.6] text-ink-soft">{intro}</p>

      <div className="mt-6">
        <div
          ref={scrollerRef}
          className="snap-scroller flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1"
          onScroll={syncIndex}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={title}
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
          {slides.map((slide, i) => {
            const Mock = MOCKS[slide.mock];
            return (
              <article key={slide.id} className="w-[92%] shrink-0 snap-start sm:w-full">
                <BentoCard
                  className="h-[24rem] sm:h-[28rem]"
                  name={slide.name}
                  description={slide.description}
                  background={
                    <MockStage variant={slide.variant} badge="In funzione" active={index === i}>
                      <Mock />
                    </MockStage>
                  }
                />
              </article>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Attività precedente"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-[20px] text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-30"
          >
            ←
          </button>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-3">
            <div className="flex items-baseline gap-[6px] text-[15px] font-medium leading-none">
              <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-[13px] text-ink-faint">/</span>
              <span className="text-[13px] text-ink-soft">{String(total).padStart(2, "0")}</span>
            </div>
            <div className="flex gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Attività ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`h-1.5 rounded-[1px] transition-all ${
                    i === index ? "w-8 bg-accent" : "w-6 bg-hairline-strong hover:bg-ink-soft"
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === total - 1}
            aria-label="Attività successiva"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-[20px] text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
