"use client";

import { useT } from "../../lib/i18n/context";
import Cal from "./Cal";

const CONTACT_EMAIL = "francemazzi@gmail.com";

export default function CallToAction() {
  const t = useT();

  return (
    <section id="contact" className="section-farm py-10 sm:py-14">
      <div className="rounded-[32px] bg-ink px-6 py-14 text-center sm:px-12 sm:py-20">
        <h2 className="mx-auto max-w-[18ch] text-[38px] font-semibold leading-[1.02] tracking-[-0.05em] text-paper sm:text-[64px] [text-wrap:balance]">
          {t("cta.title1")}{" "}
          <span className="text-[#C9624C]">{t("cta.titleEm")}</span>
          {t("cta.title2")}
        </h2>
        <p className="mx-auto mb-10 mt-6 max-w-[58ch] text-[17px] leading-[1.6] text-paper/65">{t("cta.desc")}</p>
        <div className="flex gap-5 items-center justify-center flex-wrap [&_.btn-ink]:border-paper [&_.btn-ink]:bg-paper [&_.btn-ink]:text-ink">
          <Cal textButton={t("cta.button")} buttonType="ink" showArrow />
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[15px] font-semibold text-paper/75 transition-colors hover:text-paper">
            {t("cta.secondary")} →
          </a>
        </div>
      </div>
    </section>
  );
}
