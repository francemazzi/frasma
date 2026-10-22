"use client";

import { useT } from "../../../lib/i18n/context";
import { CONTACT, EMAIL_HREF, PHONE_HREF } from "../../../lib/contact";
import { Reveal } from "../../atoms/Reveal";
import WhatsappIntentForm from "./WhatsappIntentForm";

export default function CallToAction() {
  const t = useT();

  return (
    <section className="section-farm py-10 sm:py-14">
      <Reveal className="rounded-3xl border border-hairline-strong bg-paper-2 px-6 py-14 sm:px-12 sm:py-20">
        <h2 className="max-w-[16ch] text-[38px] font-medium leading-[1.02] tracking-[-0.05em] text-ink sm:text-[64px] [text-wrap:balance]">
          {t("home.contact.title")}
        </h2>
        <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.6] text-ink-soft">
          {t("home.contact.text")}
        </p>
        <div className="mt-8">
          <WhatsappIntentForm />
        </div>
        <p className="mt-5 text-[14px] text-ink-soft">
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
