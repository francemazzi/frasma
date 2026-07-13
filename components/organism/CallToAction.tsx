"use client";

import { useT } from "../../lib/i18n/context";
import Cal from "./Cal";

const CONTACT_EMAIL = "francemazzi@gmail.com";

export default function CallToAction() {
  const t = useT();

  return (
    <section id="contact" className="ed-section">
      <div className="section-farm">
        <h2 className="ed-title max-w-[18ch] mb-6 [text-wrap:balance]">
          {t("cta.title1")}{" "}
          <em>{t("cta.titleEm")}</em>
          {t("cta.title2")}
        </h2>
        <p className="ed-intro mb-10">{t("cta.desc")}</p>
        <div className="flex gap-5 items-center flex-wrap">
          <Cal textButton={t("cta.button")} buttonType="ink" showArrow />
          <a href={`mailto:${CONTACT_EMAIL}`} className="ed-link-secondary">
            {t("cta.secondary")} →
          </a>
        </div>
      </div>
    </section>
  );
}
