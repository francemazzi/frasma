"use client";

import { useT } from "../../lib/i18n/context";
import { Reveal, RevealGroup, RevealItem } from "../atoms/Reveal";

const ITEMS = [
  { title: "qualify.item1.title", desc: "qualify.item1.desc" },
  { title: "qualify.item2.title", desc: "qualify.item2.desc" },
  { title: "qualify.item3.title", desc: "qualify.item3.desc" },
  { title: "qualify.item4.title", desc: "qualify.item4.desc" },
] as const;

export default function QualifyLead() {
  const t = useT();

  return (
    <section id="problemi" className="ed-section bg-white/20">
      <div className="section-farm">
        <Reveal className="ed-section-header mx-auto max-w-3xl text-center">
          <div className="ed-kicker">{t("qualify.eyebrow")}</div>
          <h2 className="ed-title">{t("qualify.title")}</h2>
          <p className="ed-intro mx-auto mt-6">{t("qualify.subtitle")}</p>
        </Reveal>

        <RevealGroup
          stagger={0.1}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {ITEMS.map((item, index) => (
            <RevealItem
              as="article"
              key={item.title}
              index={index}
              className="ed-card-hover relative overflow-hidden rounded-2xl border border-white/70 bg-paper/65 p-6 sm:p-7"
            >
              <span
                className="pointer-events-none absolute -right-1 -top-3 select-none text-[68px] font-semibold leading-none tracking-[-0.05em] text-accent/[0.07]"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mb-6 block text-[11px] font-semibold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 text-[20px] font-semibold tracking-[-0.03em] text-ink">
                {t(item.title)}
              </h3>
              <p className="text-[15px] leading-[1.6] text-ink-soft">{t(item.desc)}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
