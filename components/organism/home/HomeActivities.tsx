"use client";

import { useT } from "../../../lib/i18n/context";
import { Reveal } from "../../atoms/Reveal";

const ITEMS = [1, 2, 3] as const;

export default function HomeActivities() {
  const t = useT();

  return (
    <section className="ed-section border-t border-hairline">
      <div className="section-farm">
        <Reveal className="max-w-3xl">
          <h2 className="ed-title">{t("home.tasks.title")}</h2>
          <p className="ed-intro mt-6">{t("home.tasks.text")}</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {ITEMS.map((id) => (
            <Reveal
              key={id}
              className="rounded-3xl border border-hairline-strong bg-paper-2 p-6 sm:p-7"
            >
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-accent">
                0{id}
              </p>
              <h3 className="mt-3 text-[22px] font-medium tracking-[-0.04em] text-ink">
                {t(`home.tasks.${id}.title`)}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
                {t(`home.tasks.${id}.body`)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
