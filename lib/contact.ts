/** Public contact channels shown on the site and exposed to agents. */
export const CONTACT = {
  phoneDisplay: "+39 331 742 4341",
  phoneE164: "+393317424341",
  whatsappNumber: "393317424341",
  email: "frasma@frasma.org",
} as const;

export const PHONE_HREF = `tel:${CONTACT.phoneE164}`;
export const EMAIL_HREF = `mailto:${CONTACT.email}`;

const WHATSAPP_PREFILL: Record<"it" | "en", string> = {
  it: "Ciao Francesco, vorrei parlare di un processo da automatizzare.",
  en: "Hi Francesco, I would like to talk about a process to automate.",
};

export function whatsappHref(lang: "it" | "en" = "it"): string {
  const text = encodeURIComponent(WHATSAPP_PREFILL[lang]);
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${text}`;
}
