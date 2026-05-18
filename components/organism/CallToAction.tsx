"use client";

import { useT } from "../../lib/i18n/context";
import Cal from "./Cal";

export default function CallToAction() {
  const t = useT();

  return (
    <section id="contact" className="border-t border-hairline pt-24 pb-20 sm:pt-32 sm:pb-24 lg:pt-[140px] lg:pb-[100px]">
      <div className="section-farm">
        <h2
          className="font-serif font-normal leading-[0.98] tracking-[-0.028em] text-ink mb-9 max-w-[14ch] [text-wrap:balance]"
          style={{ fontSize: "clamp(56px, 7.2vw, 112px)" }}
        >
          {t("cta.title1")}{" "}
          <em className="italic text-accent font-normal">{t("cta.titleEm")}</em>
          {t("cta.title2")}
        </h2>
        <p className="text-[17px] leading-[1.55] text-ink-2 max-w-[56ch] mb-11">
          {t("cta.desc")}
        </p>
        <div className="flex gap-[14px] items-center flex-wrap">
          <Cal textButton={t("cta.button")} buttonType="default" />
        </div>
      </div>
    </section>
  );
}
