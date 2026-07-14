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
        <div className="ed-section-header mx-auto max-w-3xl text-center">
          <h2 className="ed-title mb-4">{t("how.title")}</h2>
          <p className="ed-intro mx-auto">{t("how.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="rounded-[28px] border border-white/60 bg-white/25 p-6 sm:p-8">
              <span className="mb-10 block text-[12px] font-semibold text-accent">{step.number}</span>
              <div>
                <h3 className="text-[22px] font-semibold leading-[1.15] tracking-[-0.035em] text-ink mb-3">
                  {t(step.titleKey)}
                </h3>
                <p className="text-[15px] leading-[1.6] text-ink-soft">
                  {t(step.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Cal textButton={t("about.rateReveal")} buttonType="ink" showArrow />
        </div>
      </div>
    </section>
  );
}
