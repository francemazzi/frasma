"use client";

import { useT } from "../../lib/i18n/context";

const ITEMS = [
  "qualify.item1",
  "qualify.item2",
  "qualify.item3",
  "qualify.item4",
] as const;

export default function QualifyLead() {
  const t = useT();

  return (
    <section className="ed-section bg-white/20">
      <div className="section-farm">
        <div className="ed-section-header mx-auto max-w-3xl text-center">
          <div className="ed-kicker">{t("qualify.eyebrow")}</div>
          <h2 className="ed-title">{t("qualify.title")}</h2>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
          {ITEMS.map((key, index) => (
            <div key={key} className="rounded-2xl border border-white/70 bg-paper/65 p-6">
              <span className="mb-6 block text-[11px] font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-[15px] leading-[1.6] text-ink-2">{t(key)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
