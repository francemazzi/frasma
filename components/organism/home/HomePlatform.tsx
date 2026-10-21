"use client";

import { useT } from "../../../lib/i18n/context";
import { Reveal } from "../../atoms/Reveal";

const INCOMING = ["in1", "in2", "in3", "in4"] as const;
const MODULES = ["m1", "m2", "m3", "m4", "m5"] as const;
const BASE = ["b1", "b2", "b3", "b4", "b5"] as const;
const SYSTEMS = ["s1", "s2", "s3", "s4"] as const;

function ChipList({ keys }: { keys: readonly string[] }) {
  const t = useT();

  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {keys.map((key) => (
        <li
          key={key}
          className="rounded-full border border-hairline-strong bg-paper px-3 py-1.5 text-[13px] font-medium text-ink"
        >
          {t(`home.platform.${key}`)}
        </li>
      ))}
    </ul>
  );
}

export default function HomePlatform() {
  const t = useT();

  return (
    <section id="piattaforma" className="ed-section border-t border-hairline">
      <div className="section-farm">
        <Reveal className="max-w-3xl">
          <h2 className="ed-title">{t("home.platform.title")}</h2>
          <p className="ed-intro mt-6">{t("home.platform.text")}</p>
          <p className="mt-4 max-w-[58ch] text-[16px] leading-[1.6] text-ink">
            {t("home.platform.close")}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Reveal className="rounded-3xl border border-hairline-strong bg-paper-2 p-6 sm:p-7">
            <h3 className="text-[13px] font-medium uppercase tracking-[0.08em] text-accent">
              {t("home.platform.inLabel")}
            </h3>
            <ChipList keys={INCOMING} />
          </Reveal>

          <Reveal
            delay={0.08}
            className="rounded-3xl border border-hairline-strong bg-ink p-6 text-paper sm:p-7"
          >
            <h3 className="text-[13px] font-medium uppercase tracking-[0.08em] text-paper/70">
              {t("home.platform.frasmaLabel")}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {MODULES.map((key) => (
                <li
                  key={key}
                  className="rounded-full bg-paper px-3 py-1.5 text-[13px] font-medium text-ink"
                >
                  {t(`home.platform.${key}`)}
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-[13px] font-medium uppercase tracking-[0.08em] text-paper/70">
              {t("home.platform.baseLabel")}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {BASE.map((key) => (
                <li
                  key={key}
                  className="rounded-full border border-paper/25 px-3 py-1.5 text-[13px] font-medium text-paper"
                >
                  {t(`home.platform.${key}`)}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={0.16}
            className="rounded-3xl border border-hairline-strong bg-paper-2 p-6 sm:p-7"
          >
            <h3 className="text-[13px] font-medium uppercase tracking-[0.08em] text-accent">
              {t("home.platform.systemsLabel")}
            </h3>
            <ChipList keys={SYSTEMS} />
            <p className="mt-5 text-[14px] leading-[1.55] text-ink-soft">
              {t("home.platform.systemsNote")}
            </p>
            <p className="mt-3 text-[14px] leading-[1.55] text-ink-soft">
              {t("home.platform.machinesNote")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
