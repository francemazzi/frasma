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
      <Reveal className="rounded-3xl border border-hairline-strong bg-paper-2 px-6 py-12 sm:px-12 sm:py-16">
        <div className="mx-auto max-w-[58ch] text-center">
          <div className="ed-kicker">{t("continuity.eyebrow")}</div>
          <h2 className="ed-title mt-4">{t("continuity.title")}</h2>
          <p className="ed-intro mx-auto mt-5">{t("continuity.subtitle")}</p>
        </div>

        <RevealGroup
          as="ul"
          stagger={0.1}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {ITEMS.map((item, index) => (
            <RevealItem
              as="li"
              key={item.title}
              index={index}
              className="rounded-2xl bg-paper p-6 sm:p-7"
            >
              <span className="mb-6 block text-[11px] font-medium tracking-[0.1em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 text-[17px] font-medium leading-[1.25] tracking-[-0.03em] text-ink">
                {t(item.title)}
              </h3>
              <p className="text-[14px] leading-[1.6] text-ink-soft">
                {t(item.desc)}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Reveal>
    </section>
  );
}
