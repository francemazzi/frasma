"use client";

import { useT } from "../../lib/i18n/context";
import { Reveal, RevealGroup, RevealItem } from "../atoms/Reveal";

const ITEMS = [
  { title: "trust.item1.title", desc: "trust.item1.desc" },
  { title: "trust.item2.title", desc: "trust.item2.desc" },
  { title: "trust.item3.title", desc: "trust.item3.desc" },
  { title: "trust.item4.title", desc: "trust.item4.desc" },
] as const;

export default function Trust() {
  const t = useT();

  return (
    <section id="dati" className="ed-section">
      <div className="section-farm">
        <Reveal className="ed-section-header mx-auto max-w-3xl text-center">
          <div className="ed-kicker">{t("trust.eyebrow")}</div>
          <h2 className="ed-title">{t("trust.title")}</h2>
          <p className="ed-intro mx-auto mt-6">{t("trust.subtitle")}</p>
        </Reveal>

        <RevealGroup
          stagger={0.1}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {ITEMS.map((item, index) => (
            <RevealItem
              as="article"
              key={item.title}
              index={index}
              className="ed-card-hover relative overflow-hidden rounded-3xl border border-hairline-strong bg-paper-2 p-6 sm:p-7"
            >
              <span className="mb-6 block text-[11px] font-medium text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 text-[20px] font-medium tracking-[-0.03em] text-ink">
                {t(item.title)}
              </h3>
              <p className="text-[15px] leading-[1.6] text-ink-soft">
                {t(item.desc)}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
