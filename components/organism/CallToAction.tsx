"use client";

import { MessageCircle } from "lucide-react";
import { useLang, useT } from "../../lib/i18n/context";
import { CONTACT, PHONE_HREF, whatsappHref } from "../../lib/contact";
import ProcessAssessment from "./ProcessAssessment";
import { Reveal } from "../atoms/Reveal";

export default function CallToAction() {
  const t = useT();
  const { lang } = useLang();

  return (
    <section id="contact" className="section-farm py-10 sm:py-14">
      <Reveal className="rounded-3xl border border-hairline-strong bg-paper-2 px-6 py-14 text-center sm:px-12 sm:py-20">
        <h2 className="mx-auto max-w-[18ch] text-[38px] font-medium leading-[1.02] tracking-[-0.05em] text-ink sm:text-[64px] [text-wrap:balance]">
          {t("cta.title1")}{" "}
          <span className="text-accent">{t("cta.titleEm")}</span>
          {t("cta.title2")}
        </h2>
        <p className="mx-auto mb-10 mt-6 max-w-[58ch] text-[17px] leading-[1.6] text-ink-soft">
          {t("cta.desc")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <ProcessAssessment textButton={t("cta.button")} showArrow />
          <a
            href={whatsappHref(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ink-ghost"
          >
            <MessageCircle size={16} aria-hidden="true" />
            {t("contact.whatsapp")}
          </a>
          <a href="#metodo" className="btn-ink-ghost">
            {t("cta.secondary")}
          </a>
        </div>
        <p className="mt-4 text-[14px] text-ink-soft">
          {t("contact.orCall")}{" "}
          <a href={PHONE_HREF} className="font-medium text-ink hover:text-accent">
            {CONTACT.phoneDisplay}
          </a>
        </p>
        <p className="mx-auto mt-6 max-w-[60ch] text-[12px] leading-[1.55] text-ink-soft">
          {t("cta.risk")}
        </p>
      </Reveal>
    </section>
  );
}
