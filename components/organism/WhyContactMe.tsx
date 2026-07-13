"use client";

import { useT } from "../../lib/i18n/context";
import Cal from "./Cal";

const steps = [
  { number: "01", titleKey: "how.title1", descKey: "how.desc1" },
  { number: "02", titleKey: "how.title2", descKey: "how.desc2" },
  { number: "03", titleKey: "how.title3", descKey: "how.desc3" },
];

export default function WhyContactMe() {
  const t = useT();

  return (
    <section className="ed-section">
      <div className="section-farm">
        <div className="ed-section-header max-w-3xl">
          <h2 className="ed-title mb-4">{t("how.title")}</h2>
          <p className="ed-intro">{t("how.subtitle")}</p>
        </div>

        <div className="max-w-3xl">
          {steps.map((step) => (
            <div key={step.number} className="ed-list-row">
              <span className="ed-list-num">{step.number}</span>
              <div>
                <h3 className="font-serif text-[22px] leading-[1.15] tracking-[-0.012em] text-ink mb-2">
                  {t(step.titleKey)}
                </h3>
                <p className="text-[15px] leading-[1.6] text-ink-soft">
                  {t(step.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Cal textButton={t("about.rateReveal")} buttonType="ink" showArrow />
        </div>
      </div>
    </section>
  );
}
