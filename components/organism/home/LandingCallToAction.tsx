"use client";

import { useLang, useT } from "../../../lib/i18n/context";
import { CONTACT, EMAIL_HREF, PHONE_HREF, whatsappHref } from "../../../lib/contact";
import { Reveal } from "../../atoms/Reveal";
import ProcessAssessment from "../ProcessAssessment";

export default function CallToAction() {
  const t = useT();
  const { lang } = useLang();

  return (
    <section id="contatti" className="section-farm py-10 sm:py-14">
      <Reveal className="rounded-3xl border border-hairline-strong bg-paper-2 px-6 py-14 sm:px-12 sm:py-20">
        <h2 className="max-w-[16ch] text-[38px] font-medium leading-[1.02] tracking-[-0.05em] text-ink sm:text-[64px] [text-wrap:balance]">
          {t("home.contact.title")}
        </h2>
        <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.6] text-ink-soft">
          {t("home.contact.text")}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ProcessAssessment textButton={t("home.contact.cta")} showArrow />
          <a
            href={EMAIL_HREF}
            className="btn-ink-ghost focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {t("home.contact.secondary")}
          </a>
        </div>
        <p className="mt-5 max-w-[58ch] text-[14px] leading-[1.55] text-ink-soft">
          {t("home.contact.micro")}
        </p>
        <p className="mt-4 text-[14px] text-ink-soft">
          <a
            href={whatsappHref(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink hover:text-accent"
          >
            WhatsApp
          </a>
          {" · "}
          <a href={PHONE_HREF} className="font-medium text-ink hover:text-accent">
            {CONTACT.phoneDisplay}
          </a>
          {" · "}
          <a href={EMAIL_HREF} className="font-medium text-ink hover:text-accent">
            {CONTACT.email}
          </a>
        </p>
      </Reveal>
    </section>
  );
}
