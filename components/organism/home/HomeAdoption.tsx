"use client";

import { useT } from "../../../lib/i18n/context";
import { Reveal } from "../../atoms/Reveal";
import { ADOPTION_ICONS } from "./AdoptionIcons";

const STEPS = [1, 2, 3, 4] as const;

export default function HomeAdoption() {
  const t = useT();

  return (
    <section id="come-iniziare" className="ed-section border-t border-hairline">
      <div className="section-farm">
        <Reveal className="mb-10 max-w-3xl sm:mb-14">
          <h2 className="ed-title">{t("home.adopt.title")}</h2>
        </Reveal>

        <ol className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STEPS.map((id) => {
            const Icon = ADOPTION_ICONS[id - 1];
            return (
              <li
                key={id}
                className="rounded-[28px] border border-hairline-strong bg-paper-2 p-4"
              >
                <span className="mb-3 block" aria-hidden="true">
                  <Icon />
                </span>
                <h3 className="text-[18px] font-medium tracking-[-0.03em] text-ink">
                  {t(`home.adopt.${id}.title`)}
                </h3>
                <p className="mt-1 text-[13px] leading-[1.4] text-ink-soft">
                  {t(`home.adopt.${id}.body`)}
                </p>
              </li>
            );
          })}
        </ol>

        <p className="mt-8 text-[15px] font-medium text-ink">
          {t("home.adopt.close")}
        </p>
      </div>
    </section>
  );
}
