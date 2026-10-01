"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import { useLang, useT } from "../../lib/i18n/context";
import { CONTACT, EMAIL_HREF, PHONE_HREF, whatsappHref } from "../../lib/contact";

type Props = {
  className?: string;
};

/** Phone, WhatsApp and email links, used in the footer and the CTA block. */
export default function ContactLinks({ className = "" }: Props) {
  const t = useT();
  const { lang } = useLang();

  return (
    <div
      className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium text-ink ${className}`}
    >
      <a
        href={whatsappHref(lang)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
      >
        <MessageCircle size={15} aria-hidden="true" />
        {t("contact.whatsappShort")}
      </a>
      <a
        href={PHONE_HREF}
        className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
      >
        <Phone size={15} aria-hidden="true" />
        {CONTACT.phoneDisplay}
      </a>
      <a
        href={EMAIL_HREF}
        className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
      >
        <Mail size={15} aria-hidden="true" />
        {CONTACT.email}
      </a>
      <span className="text-ink-soft font-normal">{t("contact.hours")}</span>
    </div>
  );
}
