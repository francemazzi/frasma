"use client";

import { useT } from "../../lib/i18n/context";
import { Reveal, RevealGroup, RevealItem } from "../atoms/Reveal";

const ITEMS = [
  { title: "continuity.item1.title", desc: "continuity.item1.desc" },
  { title: "continuity.item2.title", desc: "continuity.item2.desc" },
  { title: "continuity.item3.title", desc: "continuity.item3.desc" },
] as const;

export default function Continuity() {
  const t = useT();

  return (
    <section id="continuita" className="section-farm pb-20 sm:pb-28">
      <Reveal className="rounded-[32px] bg-ink px-6 py-12 text-paper sm:px-12 sm:py-16">
        <div className="max-w-[58ch]">
          <div className="text-[12px] font-semibold uppercase leading-none tracking-[0.12em] text-[#C9624C]">
            {t("continuity.eyebrow")}
          </div>
          <h2 className="mt-4 text-[32px] font-semibold leading-[1.06] tracking-[-0.045em] text-paper sm:text-[46px]">
            {t("continuity.title")}
          </h2>
          <p className="mt-5 text-[17px] leading-[1.6] text-paper/65">
            {t("continuity.subtitle")}
          </p>
        </div>

        <RevealGroup
          as="ul"
          stagger={0.1}
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3"
        >
          {ITEMS.map((item, index) => (
            <RevealItem
              as="li"
              key={item.title}
              index={index}
              className="bg-ink p-6 sm:p-7"
            >
              <span className="mb-6 block text-[11px] font-semibold tracking-[0.1em] text-[#C9624C]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 text-[17px] font-semibold leading-[1.25] tracking-[-0.03em] text-paper">
                {t(item.title)}
              </h3>
              <p className="text-[14px] leading-[1.6] text-paper/60">
                {t(item.desc)}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal
          as="p"
          className="mt-8 flex max-w-[72ch] gap-3 text-[14px] leading-[1.6] text-paper/70"
        >
          <span
            className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9624C]"
            aria-hidden="true"
          />
          <span>{t("continuity.proof")}</span>
        </Reveal>
      </Reveal>
    </section>
  );
}
