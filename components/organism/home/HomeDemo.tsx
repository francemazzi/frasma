"use client";

import { useT } from "../../../lib/i18n/context";
import { Reveal } from "../../atoms/Reveal";

const BOARDS = [1, 2, 3] as const;
const FIELDS = [1, 2, 3, 4, 5] as const;

export default function HomeDemo() {
  const t = useT();

  return (
    <section className="ed-section border-t border-hairline" aria-labelledby="home-demo-title">
      <div className="section-farm">
        <Reveal className="max-w-3xl">
          <h2 id="home-demo-title" className="ed-title">
            {t("home.demo.title")}
          </h2>
          <p className="mt-5 text-[14px] font-medium text-accent">
            {t("home.demo.caption")}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {BOARDS.map((id) => (
            <Reveal
              key={id}
              className="rounded-3xl border border-hairline-strong bg-paper-2 p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[20px] font-medium tracking-[-0.03em] text-ink">
                  {t(`home.demo.${id}.title`)}
                </h3>
                <span className="shrink-0 rounded-full border border-hairline-strong px-3 py-1 text-[12px] font-medium text-ink">
                  {t(`home.demo.${id}.status`)}
                </span>
              </div>
              <dl className="mt-5 space-y-3">
                {FIELDS.map((field) => (
                  <div key={field} className="grid grid-cols-[minmax(0,42%)_minmax(0,1fr)] gap-3 text-[14px]">
                    <dt className="text-ink-soft">{t(`home.demo.${id}.f${field}`)}</dt>
                    <dd className="font-medium text-ink">{t(`home.demo.${id}.v${field}`)}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[12px] leading-[1.45] text-ink-faint">
                {t("home.demo.caption")}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
