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
    <section className="ed-section">
      <div className="section-farm">
        <div className="ed-section-header max-w-3xl">
          <div className="ed-kicker">{t("qualify.eyebrow")}</div>
          <h2 className="ed-title">{t("qualify.title")}</h2>
        </div>

        <div className="max-w-3xl">
          {ITEMS.map((key, index) => (
            <div key={key} className="ed-list-row">
              <span className="ed-list-num">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-[15px] leading-[1.6] text-ink-2 pt-1">{t(key)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
