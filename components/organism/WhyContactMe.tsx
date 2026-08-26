"use client";

import { useT } from "../../lib/i18n/context";
import { Reveal, RevealGroup, RevealItem } from "../atoms/Reveal";

const steps = [
  { number: "01", titleKey: "how.title1", descKey: "how.desc1" },
  { number: "02", titleKey: "how.title2", descKey: "how.desc2" },
  { number: "03", titleKey: "how.title3", descKey: "how.desc3" },
  { number: "04", titleKey: "how.title4", descKey: "how.desc4" },
  { number: "05", titleKey: "how.title5", descKey: "how.desc5" },
];

export default function WhyContactMe() {
  const t = useT();

  return (
    <section id="metodo" className="ed-section">
      <div className="section-farm">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="ed-kicker">{t("how.eyebrow")}</div>
            <h2 className="ed-title">{t("how.title")}</h2>
            <p className="ed-intro mt-6">{t("how.subtitle")}</p>
          </Reveal>

          <RevealGroup as="ol" stagger={0.1}>
            {steps.map((step, index) => (
              <RevealItem
                as="li"
                key={step.number}
                index={index}
                className="ed-list-row ed-card-hover"
              >
                <span className="ed-list-num">{step.number}</span>
                <div>
                  <h3 className="mb-2 text-[20px] font-medium leading-[1.2] tracking-[-0.035em] text-ink">
                    {t(step.titleKey)}
                  </h3>
                  <p className="max-w-[52ch] text-[15px] leading-[1.6] text-ink-soft">
                    {t(step.descKey)}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
