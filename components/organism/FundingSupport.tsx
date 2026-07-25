"use client";

import { useT } from "../../lib/i18n/context";
import Cal from "./Cal";

export default function FundingSupport() {
  const t = useT();

  return (
    <section id="finanza-agevolata" className="ed-section bg-white/20">
      <div className="section-farm">
        <div className="rounded-[32px] border border-white/60 bg-white/25 px-6 py-12 sm:px-10 sm:py-16">
          <div className="ed-section-header mx-auto max-w-3xl text-center">
            <div className="ed-kicker">{t("funding.eyebrow")}</div>
            <h2 className="ed-title mb-4">{t("funding.title")}</h2>
            <p className="ed-intro mx-auto">{t("funding.desc")}</p>
            <p className="mx-auto mt-6 max-w-[58ch] text-[15px] leading-[1.6] text-ink-soft">
              {t("funding.body")}
            </p>
          </div>

          <div className="mt-10 text-center">
            <Cal textButton={t("funding.cta")} buttonType="ink" showArrow />
          </div>
        </div>
      </div>
    </section>
  );
}
