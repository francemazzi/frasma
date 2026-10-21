"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useT } from "../../../lib/i18n/context";
import { Reveal } from "../../atoms/Reveal";

function ResultFigure({ text }: { text: string }) {
  const match = text.match(/^([−+\d×.%]+)\s+(.+)$/);
  if (!match) return <span className="text-[15px] font-semibold">{text}</span>;

  return (
    <span className="inline-flex items-baseline gap-2">
      <span className="text-[28px] font-bold leading-none tracking-[-0.04em] sm:text-[34px]">
        {match[1]}
      </span>
      <span className="text-[14px] font-medium sm:text-[15px]">{match[2]}</span>
    </span>
  );
}

function ResultMark({ text, extra }: { text: string; extra?: string }) {
  return (
    <p className="absolute bottom-4 left-4 flex max-w-[calc(100%-2rem)] flex-wrap items-baseline gap-x-4 gap-y-1 rounded-full bg-ink/90 px-4 py-2 text-paper">
      <ResultFigure text={text} />
      {extra ? <ResultFigure text={extra} /> : null}
    </p>
  );
}

const EXAMPLES = [
  { id: 2, src: "/image/home/esempio-produzione.jpg", note: true },
  { id: 1, src: "/image/home/esempio-conformita.jpg", note: true },
  { id: 4, src: "/image/home/esempio-clienti.jpg", note: false },
  { id: 3, src: "/image/home/esempio-servizi.jpg", note: false },
] as const;

export default function HomeExamples() {
  const t = useT();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const total = EXAMPLES.length;
  const example = EXAMPLES[page];

  const goTo = useCallback(
    (idx: number) => {
      const next = Math.max(0, Math.min(total - 1, idx));
      setDirection(next >= page ? 1 : -1);
      setPage(next);
    },
    [page, total],
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
    <section className="ed-section border-t border-hairline">
      <div className="section-farm">
        <Reveal className="mb-8 max-w-3xl">
          <h2 className="ed-title">{t("home.examples.title")}</h2>
          <p className="ed-intro mt-4">{t("home.examples.intro")}</p>
        </Reveal>

        <div className="overflow-hidden rounded-3xl border border-hairline-strong bg-paper-2" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article key={example.id} {...slideMotion}>
              <div className="relative aspect-[16/9] bg-paper-3">
                <Image
                  src={example.src}
                  alt={t(`home.examples.${example.id}.alt`)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1100px"
                  className="object-cover"
                />
                <ResultMark
                  text={t(`home.examples.${example.id}.result`)}
                  extra={
                    example.id === 4 ? t("home.examples.4.resultB") : undefined
                  }
                />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="max-w-[22ch] text-[28px] font-medium leading-[1.1] tracking-[-0.04em] text-ink sm:text-[36px]">
                  {t(`home.examples.${example.id}.title`)}
                </h3>
                <p className="mt-3 max-w-[52ch] text-[16px] leading-[1.5] text-ink-soft">
                  {t(`home.examples.${example.id}.short`)}
                </p>
                {example.note ? (
                  <p className="mt-3 max-w-[52ch] text-[14px] leading-[1.5] text-ink">
                    {t(`home.examples.${example.id}.note`)}
                  </p>
                ) : null}
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="flex items-center justify-between gap-6 border-t border-hairline px-6 py-5">
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              aria-label={t("results.previous")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline-strong text-[20px] text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-30"
            >
              ←
            </button>
            <div className="flex items-center gap-5">
              <p className="text-[18px] font-semibold leading-none">
                <span className="text-accent">{String(page + 1).padStart(2, "0")}</span>
                <span className="px-1 text-[14px] text-ink-faint">/</span>
                <span className="text-[14px] text-ink-soft">{String(total).padStart(2, "0")}</span>
              </p>
              <div className="flex gap-2">
                {EXAMPLES.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(itemIndex)}
                    aria-label={`${t("results.pageWord")} ${itemIndex + 1}`}
                    className={`h-[3px] rounded-[1px] transition-all ${
                      itemIndex === page ? "w-8 bg-accent" : "w-6 bg-hairline-strong"
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
              className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline-strong text-[20px] text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
