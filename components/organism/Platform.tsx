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
          <h2 className="ed-title">{t("flow.title")}</h2>
          <p className="ed-intro mx-auto mt-6">{t("flow.subtitle")}</p>
        </Reveal>

        <FlowRail t={t} />

        <Reveal className="mx-auto mb-10 mt-24 max-w-3xl text-center sm:mb-12 sm:mt-32">
          <h2 className="ed-title">{t("useCases.title")}</h2>
          <p className="ed-intro mx-auto mt-6">{t("useCases.subtitle")}</p>
        </Reveal>

        <Reveal>
          <UseCaseSlider />
        </Reveal>

        <SystemsInUse />
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
      background: (active: boolean) => (
        <MockStage variant="peach" badge={working} active={active}>
          <AgentMock compact />
        </MockStage>
      ),
    },
    {
      name: t("platform.cards.tickets.name"),
      description: t("platform.cards.tickets.desc"),
      href: "/servizi/ticketing-manutenzione",
      background: (active: boolean) => (
        <MockStage variant="teal" badge={working} active={active}>
          <TicketsMock />
        </MockStage>
      ),
    },
    {
      name: t("platform.cards.workflow.name"),
      description: t("platform.cards.workflow.desc"),
      href: "/servizi/procedure-guidate",
      background: (active: boolean) => (
        <MockStage variant="lavender" active={active}>
          <WorkflowMock />
        </MockStage>
      ),
    },
    {
      name: t("platform.cards.preventivi.name"),
      description: t("platform.cards.preventivi.desc"),
      href: "/servizi/software-operativo",
      background: (active: boolean) => (
        <MockStage variant="mist" active={active}>
          <PreventiviMock />
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
    const wraps = (index === 0 && next < 0) || (index === total - 1 && next >= total);
    const left =
      child.getBoundingClientRect().left - root.getBoundingClientRect().left + root.scrollLeft;
    root.scrollTo({
      left,
      behavior: reduce || wraps ? "auto" : "smooth",
    });
    setIndex(logical);
  }, [index, total]);

  return (
    <div>
      <div
        ref={scrollerRef}
        className="use-case-scroller snap-scroller flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1"
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
        {slides.map((slide, i) => (
          <article
            key={slide.href}
            className="w-[92%] shrink-0 snap-start sm:w-[min(40rem,86%)]"
          >
            <BentoCard
              className="h-[24rem] sm:h-[30rem]"
              name={slide.name}
              description={slide.description}
              href={slide.href}
              cta={t("platform.cards.cta")}
              background={slide.background(index === i)}
            />
          </article>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3 pb-20 pr-16 sm:justify-between sm:gap-4 sm:pb-0 sm:pr-0">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label={t("useCases.previous")}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-[20px] text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          ←
        </button>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-3 sm:flex-none sm:gap-4">
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
          aria-label={t("useCases.next")}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-[20px] text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          →
        </button>
      </div>
    </div>
  );
}

const SYSTEM_LOGOS = [
  "Mexal",
  "Odoo",
  "SAP",
  "Business Central",
  "AutoCAD",
  "Inventor",
] as const;

function SystemsInUse() {
  const t = useT();

  return (
    <Reveal className="mt-20 sm:mt-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-soft">
          {t("systems.eyebrow")}
        </p>
        <h3 className="mx-auto mt-4 max-w-[16ch] font-sans text-[clamp(32px,4vw,48px)] font-medium leading-[1.05] tracking-[-0.045em] text-ink">
          {t("systems.title")}
        </h3>
        <p className="ed-intro mx-auto mt-5 text-center">{t("systems.body")}</p>
      </div>
      <ul
        className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6 sm:gap-x-14"
        aria-label={t("systems.logosLabel")}
      >
        {SYSTEM_LOGOS.map((name) => (
          <li key={name}>
            <SystemLogo name={name} />
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function SystemLogo({ name }: { name: (typeof SYSTEM_LOGOS)[number] }) {
  if (name === "Odoo") {
    return (
      <span className="inline-flex h-9 items-center text-[26px] font-medium lowercase tracking-[-0.04em] text-ink-2">
        odoo
      </span>
    );
  }

  if (name === "SAP") {
    return (
      <span className="inline-flex h-9 items-center text-[22px] font-semibold tracking-[0.16em] text-ink-2">
        SAP
      </span>
    );
  }

  if (name === "Business Central") {
    return (
      <span className="inline-flex h-9 items-center gap-2 text-ink-2">
        <span className="grid grid-cols-2 gap-[2px]" aria-hidden="true">
          <span className="h-[7px] w-[7px] bg-current" />
          <span className="h-[7px] w-[7px] bg-current" />
          <span className="h-[7px] w-[7px] bg-current" />
          <span className="h-[7px] w-[7px] bg-current" />
        </span>
        <span className="text-[15px] font-semibold tracking-[-0.03em]">Business Central</span>
      </span>
    );
  }

  if (name === "AutoCAD" || name === "Inventor") {
    return (
      <span className="inline-flex h-9 items-center gap-1.5 text-ink-2">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M2.2 13.5 8 1.8l5.8 11.7H10.6L8 8.1l-2.6 5.4H2.2Z" fill="currentColor" />
        </svg>
        <span className="text-[18px] font-medium tracking-[-0.03em]">{name}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex h-9 items-center text-[20px] font-semibold tracking-[-0.04em] text-ink-2">
      {name}
    </span>
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
