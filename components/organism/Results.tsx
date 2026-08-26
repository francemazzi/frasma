"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useT } from "../../lib/i18n/context";
import { Reveal } from "../atoms/Reveal";

type Case = {
  idx: number;
  pageLabel: string;
  imgSrc: string;
  imgAlt: string;
  href: string;
  plateKey: string;
  tagKey: string;
  titlePreKey: string;
  titleEmKey: string;
  titlePostKey: string;
  pullKey: string;
  descKey: string;
  beforeKey: string;
  afterKey: string;
};

const CASES: Case[] = [
  {
    idx: 0,
    pageLabel: "01",
    imgSrc: "/image/use_case/haccp.png",
    imgAlt: "Controllo qualità alimentare — schizzo tecnico",
    href: "/casi/procedure-alimentari",
    plateKey: "results.case1.plate",
    tagKey: "results.case1.tag",
    titlePreKey: "results.case1.titlePre",
    titleEmKey: "results.case1.titleEm",
    titlePostKey: "results.case1.titlePost",
    pullKey: "results.case1.pull",
    descKey: "results.case1.desc",
    beforeKey: "results.case1.before",
    afterKey: "results.case1.after",
  },
  {
    idx: 1,
    pageLabel: "02",
    imgSrc: "/image/use_case/lamiere.png",
    imgAlt: "Lamiere — schizzo tecnico",
    href: "/casi/documenti-erp-manifattura",
    plateKey: "results.case2.plate",
    tagKey: "results.case2.tag",
    titlePreKey: "results.case2.titlePre",
    titleEmKey: "results.case2.titleEm",
    titlePostKey: "results.case2.titlePost",
    pullKey: "results.case2.pull",
    descKey: "results.case2.desc",
    beforeKey: "results.case2.before",
    afterKey: "results.case2.after",
  },
  {
    idx: 2,
    pageLabel: "03",
    imgSrc: "/image/use_case/impianti-frigo.png",
    imgAlt: "Manutenzione impianti — schizzo tecnico",
    href: "/casi/manutenzione-impianti",
    plateKey: "results.case4.plate",
    tagKey: "results.case4.tag",
    titlePreKey: "results.case4.titlePre",
    titleEmKey: "results.case4.titleEm",
    titlePostKey: "results.case4.titlePost",
    pullKey: "results.case4.pull",
    descKey: "results.case4.desc",
    beforeKey: "results.case4.before",
    afterKey: "results.case4.after",
  },
  {
    idx: 3,
    pageLabel: "04",
    imgSrc: "/image/use_case/agricoltura.png",
    imgAlt: "Agronomia — schizzo tecnico",
    href: "/casi/operazioni-agri-food",
    plateKey: "results.case3.plate",
    tagKey: "results.case3.tag",
    titlePreKey: "results.case3.titlePre",
    titleEmKey: "results.case3.titleEm",
    titlePostKey: "results.case3.titlePost",
    pullKey: "results.case3.pull",
    descKey: "results.case3.desc",
    beforeKey: "results.case3.before",
    afterKey: "results.case3.after",
  },
];

export default function Results() {
  const t = useT();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = CASES.length;
  const touchStartX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback(
    (idx: number) => {
      const next = Math.max(0, Math.min(total - 1, idx));
      setDirection(next >= page ? 1 : -1);
      setPage(next);
    },
    [page, total]
  );

  const slideMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: direction * 40 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: direction * -40 },
        transition: { duration: 0.38, ease: [0.22, 0.61, 0.36, 1] as const },
      };

  return (
    <section id="casi-studio" className="ed-section bg-white/20">
      <div className="section-farm">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="ed-kicker">{t("results.eyebrow")}</div>
          <h2 className="ed-title">
            {t("results.title1")} <em>{t("results.titleEm")}</em>
            {t("results.title2")}
          </h2>
          <p className="ed-intro mx-auto mt-6">{t("results.subtitle")}</p>
        </Reveal>

        <div
          className="overflow-hidden rounded-3xl border border-hairline-strong bg-paper-2"
          aria-live="polite"
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
          <AnimatePresence mode="wait" initial={false}>
          {CASES.filter((c) => c.idx === page).map((c) => (
            <motion.article
              key={c.idx}
              className="grid grid-cols-1 items-center gap-8 p-6 sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-12"
              {...slideMotion}
            >
              <div className="relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[24px] bg-paper-2" style={{ aspectRatio: "1122 / 1402" }}>
                <Image src={c.imgSrc} alt={c.imgAlt} fill sizes="(max-width: 1024px) 90vw, 440px" className="object-cover mix-blend-darken" />
                <div className="absolute bottom-4 left-4 rounded-full bg-ink/85 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-paper backdrop-blur">
                  {t(c.plateKey)}
                </div>
              </div>
              <div className="min-w-0">
                <div className="mb-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {t(c.tagKey)}
                </div>
                <h3 className="mb-5 text-[30px] font-medium leading-[1.05] tracking-[-0.045em] text-ink sm:text-[42px]">
                  {t(c.titlePreKey)} <span className="text-accent">{t(c.titleEmKey)}</span>
                  {t(c.titlePostKey) ? ` ${t(c.titlePostKey)}` : ""}
                </h3>
                <p className="mb-7 text-[17px] font-medium leading-[1.45] text-ink">{t(c.pullKey)}</p>
                <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <p className="rounded-2xl bg-paper p-4 text-[13.5px] leading-[1.55] text-ink-soft">
                    <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.1em] text-accent">{t("results.beforeLabel")}</span>
                    {t(c.beforeKey)}
                  </p>
                    <p className="rounded-2xl bg-paper p-4 text-[13.5px] leading-[1.55] text-ink-soft">
                    <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.1em] text-accent">{t("results.afterLabel")}</span>
                    {t(c.afterKey)}
                  </p>
                </div>
                <p className="text-[14.5px] leading-[1.6] text-ink-soft">{t(c.descKey)}</p>
                <p className="mt-5">
                  <Link
                    href={c.href}
                    className="text-[14px] font-medium text-accent underline-offset-2 hover:underline"
                  >
                    {t("results.caseCta")}
                  </Link>
                </p>
              </div>
            </motion.article>
          ))}
          </AnimatePresence>

          <div className="flex items-center justify-between gap-6 border-t border-hairline px-6 py-5 sm:px-9">
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              aria-label={t("results.previous")}
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
                    aria-label={`${t("results.pageWord")} ${c.idx + 1}`}
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
              aria-label={t("results.next")}
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
