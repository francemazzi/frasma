"use client";

import { useCallback, useRef, useState } from "react";
import {
  CheckCircle2,
  Database,
  FileSearch,
  History,
  UserCheck,
} from "lucide-react";
import { useT } from "../../lib/i18n/context";
import { BentoCard } from "../atoms/Bento";
import { Reveal, RevealGroup, RevealItem, RevealLine } from "../atoms/Reveal";
import {
  AgentMock,
  MockStage,
  PreventiviMock,
  TicketsMock,
  WorkflowMock,
} from "./productMocks";

const FLOW_STEPS = [
  { icon: FileSearch, title: "flow.step1.title", desc: "flow.step1.desc" },
  { icon: CheckCircle2, title: "flow.step2.title", desc: "flow.step2.desc" },
  { icon: UserCheck, title: "flow.step3.title", desc: "flow.step3.desc" },
  { icon: Database, title: "flow.step4.title", desc: "flow.step4.desc" },
  { icon: History, title: "flow.step5.title", desc: "flow.step5.desc" },
] as const;

export default function Platform() {
  const t = useT();

  return (
    <section id="come-funziona" className="ed-section">
      <div className="section-farm">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
          <div className="ed-kicker">{t("flow.eyebrow")}</div>
          <h2 className="ed-title">{t("flow.title")}</h2>
          <p className="ed-intro mx-auto mt-6">{t("flow.subtitle")}</p>
        </Reveal>

        <FlowRail t={t} />

        <Reveal className="mx-auto mb-10 mt-24 max-w-3xl text-center sm:mb-12 sm:mt-32">
          <div className="ed-kicker">{t("useCases.eyebrow")}</div>
          <h2 className="ed-title">{t("useCases.title")}</h2>
          <p className="ed-intro mx-auto mt-6">{t("useCases.subtitle")}</p>
        </Reveal>

        <Reveal>
          <UseCaseSlider />
        </Reveal>
      </div>
    </section>
  );
}

function UseCaseSlider() {
  const t = useT();
  const working = t("mock.working");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const slides = [
    {
      name: t("platform.cards.agent.name"),
      description: t("platform.cards.agent.desc"),
      href: "/servizi/ddt-erp",
      background: (
        <MockStage variant="peach" badge={working}>
          <AgentMock />
        </MockStage>
      ),
    },
    {
      name: t("platform.cards.tickets.name"),
      description: t("platform.cards.tickets.desc"),
      href: "/servizi/ticketing-manutenzione",
      background: (
        <MockStage variant="teal" badge={working}>
          <TicketsMock />
        </MockStage>
      ),
    },
    {
      name: t("platform.cards.workflow.name"),
      description: t("platform.cards.workflow.desc"),
      href: "/servizi/procedure-guidate",
      background: (
        <MockStage variant="lavender">
          <WorkflowMock />
        </MockStage>
      ),
    },
    {
      name: t("platform.cards.preventivi.name"),
      description: t("platform.cards.preventivi.desc"),
      href: "/servizi/software-operativo",
      background: (
        <MockStage variant="mist">
          <PreventiviMock />
        </MockStage>
      ),
    },
  ] as const;

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

  const goTo = useCallback((next: number) => {
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
  }, [total]);

  return (
    <div>
      <div
        ref={scrollerRef}
        className="snap-scroller flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1"
        onScroll={syncIndex}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={t("useCases.title")}
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
        {slides.map((slide) => (
          <article
            key={slide.href}
            className="w-[88%] shrink-0 snap-start sm:w-[min(40rem,86%)]"
          >
            <BentoCard
              className="h-[28rem] sm:h-[30rem]"
              name={slide.name}
              description={slide.description}
              href={slide.href}
              cta={t("platform.cards.cta")}
              background={slide.background}
            />
          </article>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label={t("useCases.previous")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline-strong text-[20px] text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-30"
        >
          ←
        </button>

        <div className="flex items-center gap-4">
          <div className="flex items-baseline gap-[6px] text-[15px] font-medium leading-none">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-[13px] text-ink-faint">/</span>
            <span className="text-[13px] text-ink-soft">
              {String(total).padStart(2, "0")}
            </span>
          </div>
          <div className="flex gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.href}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${t("useCases.pageWord")} ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-[3px] rounded-[1px] transition-all ${
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
          aria-label={t("useCases.next")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline-strong text-[20px] text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-30"
        >
          →
        </button>
      </div>
    </div>
  );
}

function FlowRail({ t }: { t: (key: string) => string }) {
  return (
    <div className="relative">
      <div
        className="absolute left-[19px] top-4 bottom-4 w-px bg-hairline-strong lg:left-0 lg:right-0 lg:top-[19px] lg:bottom-auto lg:h-px lg:w-auto"
        aria-hidden="true"
      />
      <RevealLine className="absolute left-[19px] top-4 bottom-4 w-px bg-accent/45 lg:left-0 lg:right-0 lg:top-[19px] lg:bottom-auto lg:h-px lg:w-auto" />

      <RevealGroup
        as="ol"
        stagger={0.12}
        className="relative grid grid-cols-1 gap-7 lg:grid-cols-5 lg:gap-6"
      >
        {FLOW_STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <RevealItem
              as="li"
              key={step.title}
              index={index}
              className="grid grid-cols-[40px_minmax(0,1fr)] items-start gap-4 lg:block"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline-strong bg-paper text-accent">
                <Icon size={18} aria-hidden="true" />
              </span>
              <div className="lg:mt-5 lg:pr-4">
                <span className="mb-1 block text-[11px] font-medium tracking-[0.1em] text-ink-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-1.5 text-[17px] font-medium tracking-[-0.03em] text-ink">
                  {t(step.title)}
                </h3>
                <p className="max-w-[38ch] text-[14px] leading-[1.55] text-ink-soft">
                  {t(step.desc)}
                </p>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}
