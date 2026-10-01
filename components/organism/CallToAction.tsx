"use client";

import { MessageCircle } from "lucide-react";
import { useLang, useT } from "../../lib/i18n/context";
import { CONTACT, PHONE_HREF, whatsappHref } from "../../lib/contact";
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
        <div className="mt-10 flex justify-center">
          <a
            href={whatsappHref(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ink"
          >
            <MessageCircle size={16} aria-hidden="true" />
            {t("contact.tellWhatsapp")}
          </a>
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
