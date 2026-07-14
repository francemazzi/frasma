"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useT } from "../../lib/i18n/context";

type Metric = { num: string; em?: string; label: string };

type Case = {
  idx: number;
  pageLabel: string;
  imgSrc: string;
  imgAlt: string;
  plateKey: string;
  tagKey: string;
  titlePreKey: string;
  titleEmKey: string;
  titlePostKey: string;
  pullKey: string;
  descKey: string;
  beforeKey: string;
  afterKey: string;
  m1: { numKey: string; labelKey: string };
  m2: { numKey: string; labelKey: string };
};

const CASES: Case[] = [
  {
    idx: 0,
    pageLabel: "01",
    imgSrc: "/image/use_case/haccp.png",
    imgAlt: "Controllo qualità alimentare — schizzo tecnico",
    plateKey: "results.case1.plate",
    tagKey: "results.case1.tag",
    titlePreKey: "results.case1.titlePre",
    titleEmKey: "results.case1.titleEm",
    titlePostKey: "results.case1.titlePost",
    pullKey: "results.case1.pull",
    descKey: "results.case1.desc",
    beforeKey: "results.case1.before",
    afterKey: "results.case1.after",
    m1: { numKey: "results.case1.m1n", labelKey: "results.case1.m1l" },
    m2: { numKey: "results.case1.m2n", labelKey: "results.case1.m2l" },
  },
  {
    idx: 1,
    pageLabel: "02",
    imgSrc: "/image/use_case/lamiere.png",
    imgAlt: "Lamiere — schizzo tecnico",
    plateKey: "results.case2.plate",
    tagKey: "results.case2.tag",
    titlePreKey: "results.case2.titlePre",
    titleEmKey: "results.case2.titleEm",
    titlePostKey: "results.case2.titlePost",
    pullKey: "results.case2.pull",
    descKey: "results.case2.desc",
    beforeKey: "results.case2.before",
    afterKey: "results.case2.after",
    m1: { numKey: "results.case2.m1n", labelKey: "results.case2.m1l" },
    m2: { numKey: "results.case2.m2n", labelKey: "results.case2.m2l" },
  },
  {
    idx: 2,
    pageLabel: "03",
    imgSrc: "/image/use_case/impianti-frigo.png",
    imgAlt: "Manutenzione impianti — schizzo tecnico",
    plateKey: "results.case4.plate",
    tagKey: "results.case4.tag",
    titlePreKey: "results.case4.titlePre",
    titleEmKey: "results.case4.titleEm",
    titlePostKey: "results.case4.titlePost",
    pullKey: "results.case4.pull",
    descKey: "results.case4.desc",
    beforeKey: "results.case4.before",
    afterKey: "results.case4.after",
    m1: { numKey: "results.case4.m1n", labelKey: "results.case4.m1l" },
    m2: { numKey: "results.case4.m2n", labelKey: "results.case4.m2l" },
  },
  {
    idx: 3,
    pageLabel: "04",
    imgSrc: "/image/use_case/agricoltura.png",
    imgAlt: "Agronomia — schizzo tecnico",
    plateKey: "results.case3.plate",
    tagKey: "results.case3.tag",
    titlePreKey: "results.case3.titlePre",
    titleEmKey: "results.case3.titleEm",
    titlePostKey: "results.case3.titlePost",
    pullKey: "results.case3.pull",
    descKey: "results.case3.desc",
    beforeKey: "results.case3.before",
    afterKey: "results.case3.after",
    m1: { numKey: "results.case3.m1n", labelKey: "results.case3.m1l" },
    m2: { numKey: "results.case3.m2n", labelKey: "results.case3.m2l" },
  },
];

const THREAD_ITEMS = [
  {
    titleKey: "results.thread.input.title",
    descKey: "results.thread.input.desc",
  },
  {
    titleKey: "results.thread.flow.title",
    descKey: "results.thread.flow.desc",
  },
  {
    titleKey: "results.thread.output.title",
    descKey: "results.thread.output.desc",
  },
];

export default function Results() {
  const t = useT();
  const [page, setPage] = useState(0);
  const total = CASES.length;
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (idx: number) => {
      const next = Math.max(0, Math.min(total - 1, idx));
      setPage(next);
    },
    [total]
  );

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(page + 1);
      if (e.key === "ArrowLeft") goTo(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, goTo]);

  return (
    <section id="casi-studio" className="ed-section bg-white/20">
      <div className="section-farm">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="ed-kicker">{t("results.eyebrow")}</div>
          <h2 className="ed-title">
            {t("results.title1")} <em>{t("results.titleEm")}</em>
            {t("results.title2")}
          </h2>
          <p className="ed-intro mx-auto mt-6">{t("results.subtitle")}</p>
        </div>

        <div className="mb-8">
          <div className="mb-7 text-center">
            <div className="mb-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-accent">
              {t("results.thread.label")}
            </div>
            <p className="text-[20px] sm:text-[24px] font-semibold tracking-[-0.03em] text-ink">
              {t("results.thread.title")}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {THREAD_ITEMS.map((item, idx) => (
              <div key={item.titleKey} className="rounded-2xl bg-paper/60 p-5">
                <div className="mb-2 text-[11px] font-semibold tracking-[0.08em] uppercase text-ink">
                  <span className="mr-2 text-accent">{String(idx + 1).padStart(2, "0")}</span>
                  {t(item.titleKey)}
                </div>
                <p className="text-[13.5px] leading-[1.55] text-ink-soft">
                  {t(item.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="overflow-hidden rounded-[32px] border border-white/70 bg-paper-2 shadow-[0_32px_90px_-55px_rgba(27,25,22,0.65)]"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current == null) return;
            const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
            if (Math.abs(delta) > 40) {
              if (delta < 0) goTo(page + 1);
              else goTo(page - 1);
            }
            touchStartX.current = null;
          }}
        >
          {CASES.filter((c) => c.idx === page).map((c) => (
            <article key={c.idx} className="grid grid-cols-1 items-center gap-8 p-6 sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-12">
              <div className="relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[24px] bg-paper-2" style={{ aspectRatio: "1122 / 1402" }}>
                <Image src={c.imgSrc} alt={c.imgAlt} fill sizes="(max-width: 1024px) 90vw, 440px" className="object-cover mix-blend-darken" />
                <div className="absolute bottom-4 left-4 rounded-full bg-ink/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-paper backdrop-blur">
                  {t(c.plateKey)}
                </div>
              </div>
              <div className="min-w-0">
                <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {t(c.tagKey)}
                </div>
                <h3 className="mb-5 text-[30px] font-semibold leading-[1.05] tracking-[-0.045em] text-ink sm:text-[42px]">
                  {t(c.titlePreKey)} <span className="text-accent">{t(c.titleEmKey)}</span>
                  {t(c.titlePostKey) ? ` ${t(c.titlePostKey)}` : ""}
                </h3>
                <p className="mb-7 text-[17px] font-medium leading-[1.45] text-ink">{t(c.pullKey)}</p>
                <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <p className="rounded-xl bg-white/35 p-4 text-[13.5px] leading-[1.55] text-ink-soft">
                    <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.1em] text-accent">{t("results.beforeLabel")}</span>
                    {t(c.beforeKey)}
                  </p>
                  <p className="rounded-xl bg-white/35 p-4 text-[13.5px] leading-[1.55] text-ink-soft">
                    <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.1em] text-accent">{t("results.afterLabel")}</span>
                    {t(c.afterKey)}
                  </p>
                </div>
                <p className="mb-6 text-[14.5px] leading-[1.6] text-ink-soft">{t(c.descKey)}</p>
                <div className="grid grid-cols-2 gap-4 border-t border-hairline pt-6">
                  <Metric numStr={t(c.m1.numKey)} label={t(c.m1.labelKey)} />
                  <Metric numStr={t(c.m2.numKey)} label={t(c.m2.labelKey)} />
                </div>
              </div>
            </article>
          ))}

          <div className="flex items-center justify-between gap-6 border-t border-hairline px-6 py-5 sm:px-9">
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline-strong bg-white/30 text-[20px] text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-30"
            >
              ←
            </button>

            <div className="flex items-center gap-5 sm:gap-6">
              <div className="flex items-baseline gap-[6px] text-[18px] font-semibold leading-none">
                <span className="text-accent">
                  {String(page + 1).padStart(2, "0")}
                </span>
                <span className="text-ink-faint text-[14px]">/</span>
                <span className="text-ink-soft text-[14px]">
                  {String(total).padStart(2, "0")}
                </span>
              </div>
              <div className="flex gap-2">
                {CASES.map((c) => (
                  <button
                    key={c.idx}
                    onClick={() => goTo(c.idx)}
                    aria-label={`Page ${c.idx + 1}`}
                    className={`h-[3px] rounded-[1px] transition-all ${
                      c.idx === page
                        ? "w-8 bg-accent"
                        : "w-6 bg-hairline-strong hover:bg-ink-soft"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => goTo(page + 1)}
              disabled={page === total - 1}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline-strong bg-white/30 text-[20px] text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ numStr, label }: { numStr: string; label: string }) {
  // Split number to highlight last alpha-token (em part) e.g. "-92%" → em the "92%"
  const match = numStr.match(/^([^\d−-]*)([−-]?[\d,.]+(?:\s?[A-Za-z%×]+)?)(.*)$/);
  const pre = match?.[1] ?? "";
  const em = match?.[2] ?? numStr;
  const post = match?.[3] ?? "";
  return (
    <div>
      <div className="mb-2 text-[28px] sm:text-[32px] font-semibold tracking-[-0.04em] text-ink leading-none">
        {pre}
        <span className="text-accent">{em}</span>
        {post}
      </div>
      <div className="text-[10.5px] font-semibold text-ink-soft tracking-[0.05em] uppercase leading-[1.4]">
        {label}
      </div>
    </div>
  );
}
