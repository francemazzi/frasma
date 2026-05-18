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
  titlePre: string;
  titleEm: string;
  titlePost: string;
  pullKey: string;
  descKey: string;
  m1: { numKey: string; labelKey: string };
  m2: { numKey: string; labelKey: string };
};

const CASES: Case[] = [
  {
    idx: 0,
    pageLabel: "01",
    imgSrc: "/image/use_case/haccp.png",
    imgAlt: "HACCP — schizzo tecnico",
    plateKey: "results.case1.plate",
    tagKey: "results.case1.tag",
    titlePre: "Documentazione",
    titleEm: "HACCP",
    titlePost: "e certificazioni",
    pullKey: "results.case1.pull",
    descKey: "results.case1.desc",
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
    titlePre: "Preventivazione",
    titleEm: "lamiere",
    titlePost: "",
    pullKey: "results.case2.pull",
    descKey: "results.case2.desc",
    m1: { numKey: "results.case2.m1n", labelKey: "results.case2.m1l" },
    m2: { numKey: "results.case2.m2n", labelKey: "results.case2.m2l" },
  },
  {
    idx: 2,
    pageLabel: "03",
    imgSrc: "/image/use_case/agricoltura.png",
    imgAlt: "Agronomia — schizzo tecnico",
    plateKey: "results.case3.plate",
    tagKey: "results.case3.tag",
    titlePre: "Gestione",
    titleEm: "agronomica",
    titlePost: "multi-azienda",
    pullKey: "results.case3.pull",
    descKey: "results.case3.desc",
    m1: { numKey: "results.case3.m1n", labelKey: "results.case3.m1l" },
    m2: { numKey: "results.case3.m2n", labelKey: "results.case3.m2l" },
  },
  {
    idx: 3,
    pageLabel: "04",
    imgSrc: "/image/use_case/impianti-frigo.png",
    imgAlt: "Frigoriferi industriali — schizzo tecnico",
    plateKey: "results.case4.plate",
    tagKey: "results.case4.tag",
    titlePre: "Ticket e interventi per",
    titleEm: "frigoriferi industriali",
    titlePost: "",
    pullKey: "results.case4.pull",
    descKey: "results.case4.desc",
    m1: { numKey: "results.case4.m1n", labelKey: "results.case4.m1l" },
    m2: { numKey: "results.case4.m2n", labelKey: "results.case4.m2l" },
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
    <section id="casi-studio" className="ed-section">
      <div className="section-farm">
        <div className="mb-10 sm:mb-14">
          <div className="ed-kicker">{t("results.eyebrow")}</div>
          <h2 className="ed-title max-w-[28ch]">
            {t("results.title1")} <em>{t("results.titleEm")}</em>
            {t("results.title2")}
          </h2>
        </div>
        <p className="ed-intro mb-10 sm:mb-14 lg:ml-[200px]">{t("results.subtitle")}</p>

        {/* BOOK */}
        <div
          className="relative"
          style={{ perspective: "2800px", perspectiveOrigin: "50% 40%" }}
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
          <div
            className="relative border border-hairline-strong bg-paper-2 overflow-hidden"
            style={{
              boxShadow:
                "0 28px 60px -36px rgba(27,25,22,0.45), 0 6px 16px -8px rgba(27,25,22,0.18)",
            }}
          >
            {/* spine on desktop */}
            <div
              className="hidden lg:block pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 z-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(27,25,22,0.18) 50%, transparent 100%)",
              }}
            />
            <div className="relative min-h-[640px] lg:min-h-[760px]" style={{ transformStyle: "preserve-3d" }}>
              {CASES.map((c) => {
                const active = c.idx === page;
                return (
                  <article
                    key={c.idx}
                    data-idx={c.idx}
                    aria-hidden={!active}
                    className={`book-page ${active ? "" : "hidden lg:block"} lg:absolute lg:inset-0 p-7 sm:p-10 lg:p-12`}
                    style={{
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
                      zIndex: total - c.idx,
                      transform: c.idx < page ? "rotateY(-180deg)" : undefined,
                    }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-14 h-full items-stretch">
                      {/* Left page */}
                      <div className="flex flex-col gap-[18px]">
                        <div className="flex justify-between items-baseline pb-2 border-b border-dashed border-hairline-strong font-mono text-[10.5px] text-ink-soft tracking-[0.1em] uppercase">
                          <span className="text-accent text-[14px] tracking-[0.08em]">
                            {t("results.pageWord")} {c.pageLabel}
                          </span>
                          <span className="text-ink-soft">{t("results.pageMark")}</span>
                        </div>
                        <div className="relative border border-hairline-strong bg-[#FBF7EB] mx-auto w-full max-w-[240px] lg:max-w-[460px] overflow-hidden" style={{ aspectRatio: "1122 / 1402" }}>
                          <Image
                            src={c.imgSrc}
                            alt={c.imgAlt}
                            fill
                            sizes="(max-width: 1024px) 240px, 460px"
                            className="object-cover"
                          />
                          <div className="absolute left-3 bottom-3 font-mono text-[10px] tracking-[0.08em] bg-ink/85 text-paper px-[10px] py-[5px] uppercase">
                            {t(c.plateKey)}
                          </div>
                        </div>
                      </div>

                      {/* Right page */}
                      <div className="flex flex-col justify-center min-w-0 pr-1">
                        <div className="font-mono text-[11px] text-accent tracking-[0.12em] uppercase mb-4 flex items-center gap-[10px]">
                          <span className="w-[6px] h-[6px] bg-accent rounded-full" />
                          {t(c.tagKey)}
                        </div>
                        <h3
                          className="font-serif font-normal leading-[1.05] tracking-[-0.02em] mb-5 text-ink"
                          style={{ fontSize: "clamp(24px, 2.8vw, 40px)" }}
                        >
                          {c.titlePre} <em className="italic text-accent">{c.titleEm}</em>
                          {c.titlePost ? ` ${c.titlePost}` : ""}
                        </h3>
                        <p className="font-serif italic text-[18px] leading-[1.4] text-ink mb-[22px] pl-4 border-l-2 border-accent">
                          {t(c.pullKey)}
                        </p>
                        <p className="text-[14.5px] leading-[1.6] text-ink-soft mb-3 max-w-[46ch]">
                          {t(c.descKey)}
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-hairline-strong">
                          <Metric numStr={t(c.m1.numKey)} label={t(c.m1.labelKey)} />
                          <Metric numStr={t(c.m2.numKey)} label={t(c.m2.labelKey)} />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Foot controls */}
          <div className="flex items-center justify-between gap-6 mt-7 pt-5 border-t border-dashed border-hairline-strong">
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              aria-label="Previous"
              className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-full border border-ink text-ink flex items-center justify-center font-serif text-[22px] sm:text-[28px] leading-none transition-colors hover:bg-ink hover:text-paper disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
            >
              ←
            </button>

            <div className="flex items-center gap-5 sm:gap-7">
              <div className="font-serif text-[22px] sm:text-[28px] leading-none flex items-baseline gap-[6px]">
                <span className="italic text-accent">
                  {String(page + 1).padStart(2, "0")}
                </span>
                <span className="text-ink-faint text-[18px] sm:text-[22px]">/</span>
                <span className="text-ink-soft text-[18px] sm:text-[22px]">
                  {String(total).padStart(2, "0")}
                </span>
              </div>
              <div className="flex gap-2">
                {CASES.map((c) => (
                  <button
                    key={c.idx}
                    onClick={() => goTo(c.idx)}
                    aria-label={`Page ${c.idx + 1}`}
                    className={`h-[6px] rounded-[1px] transition-all ${
                      c.idx === page
                        ? "w-9 bg-accent"
                        : "w-[26px] bg-hairline-strong hover:bg-ink-soft"
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
              className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-full border border-ink text-ink flex items-center justify-center font-serif text-[22px] sm:text-[28px] leading-none transition-colors hover:bg-ink hover:text-paper disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
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
      <div className="font-serif text-[28px] sm:text-[32px] font-normal text-ink leading-none mb-2">
        {pre}
        <em className="italic text-accent not-prose">{em}</em>
        {post}
      </div>
      <div className="font-mono text-[10.5px] text-ink-soft tracking-[0.05em] uppercase leading-[1.4]">
        {label}
      </div>
    </div>
  );
}
