"use client";

import { MessageCircle } from "lucide-react";
import { trackWhatsappClick, type WhatsappPosition } from "../../lib/analytics/events";
import { whatsappHref } from "../../lib/contact";
import { useLang, useT } from "../../lib/i18n/context";

type Props = {
  position: WhatsappPosition;
  className?: string;
};

/** Secondary "or message me on WhatsApp" link shown next to a primary form button. */
export default function WhatsappAltLink({ position, className = "" }: Props) {
  const t = useT();
  const { lang } = useLang();

  return (
    <a
      href={whatsappHref(lang)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsappClick(position)}
      data-cta-id={`whatsapp-${position}`}
      className={`inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-medium text-ink underline decoration-hairline-strong underline-offset-4 transition-colors hover:text-accent ${className}`}
    >
      <MessageCircle size={15} aria-hidden="true" />
      {t("contact.orWhatsapp")}
    </a>
  );
}
