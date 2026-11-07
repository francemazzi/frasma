"use client";

import { useT } from "../../lib/i18n/context";
import { CONTACT, PHONE_HREF } from "../../lib/contact";
import { Reveal } from "../atoms/Reveal";
import WhatsappAltLink from "../molecols/WhatsappAltLink";
import ProcessAssessment from "./ProcessAssessment";

export default function CallToAction() {
  const t = useT();

  return (
    <section id="contact" className="section-farm py-10 sm:py-14">
      <Reveal className="rounded-3xl border border-hairline-strong bg-paper-2 px-6 py-14 text-center sm:px-12 sm:py-20">
        <h2 className="mx-auto max-w-[18ch] text-[38px] font-medium leading-[1.02] tracking-[-0.05em] text-ink sm:text-[64px] [text-wrap:balance]">
          {t("cta.title1")}{" "}
          <span className="text-accent">{t("cta.titleEm")}</span>
          {t("cta.title2")}
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          <ProcessAssessment textButton={t("cta.button")} showArrow />
          <WhatsappAltLink position="cta" />
        </div>
        <p className="mt-4 text-[14px] text-ink-soft">
          {t("contact.callMe")}{" "}
          <a href={PHONE_HREF} className="font-medium text-ink hover:text-accent">
            {CONTACT.phoneDisplay}
          </a>
        </p>
      </Reveal>
    </section>
  );
}
