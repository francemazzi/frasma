/** Public contact channels shown on the site and exposed to agents. */
export const CONTACT = {
  phoneDisplay: "+39 379 3671312",
  phoneE164: "+393793671312",
  whatsappNumber: "393793671312",
  email: "frasma@frasma.org",
} as const;

export const PHONE_HREF = `tel:${CONTACT.phoneE164}`;
export const EMAIL_HREF = `mailto:${CONTACT.email}`;

export type WhatsappTopic = "generic" | "ddt";

const WHATSAPP_PREFILL: Record<WhatsappTopic, Record<"it" | "en", string>> = {
  generic: {
    it: "Ciao Francesco, vorrei parlare di un processo da automatizzare.",
    en: "Hi Francesco, I would like to talk about a process to automate.",
  },
  ddt: {
    it: "Ciao Francesco, vorrei parlare dei DDT da portare nel nostro gestionale.",
    en: "Hi Francesco, I would like to talk about getting our delivery notes into our ERP.",
  },
};

export function whatsappHref(
  lang: "it" | "en" = "it",
  topic: WhatsappTopic = "generic",
): string {
  const text = encodeURIComponent(WHATSAPP_PREFILL[topic][lang]);
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${text}`;
}
