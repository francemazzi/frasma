import { CONTACT } from "./contact";

const FIELD_MAX = 80;

/** Collapse whitespace so a name cannot break the WhatsApp message layout. */
export function cleanWhatsappField(value: string, max = FIELD_MAX): string {
  return value.replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

export type WhatsappIntentInput = {
  name: string;
  company: string;
  intentLabel: string;
};

export function buildWhatsappIntentMessage(
  lang: "it" | "en",
  input: WhatsappIntentInput,
): string {
  const name = cleanWhatsappField(input.name);
  const company = cleanWhatsappField(input.company);
  const intent = cleanWhatsappField(input.intentLabel);
  if (lang === "en") {
    return [
      "Hi Francesco, I want to see if this can work.",
      "",
      `Name: ${name}`,
      `Company: ${company}`,
      `To bring into the ERP: ${intent}`,
    ].join("\n");
  }
  return [
    "Ciao Francesco, vorrei capire se si può fare.",
    "",
    `Nome: ${name}`,
    `Azienda: ${company}`,
    `Da portare nel gestionale: ${intent}`,
  ].join("\n");
}

export function buildWhatsappIntentHref(
  lang: "it" | "en",
  input: WhatsappIntentInput,
): string {
  const text = encodeURIComponent(buildWhatsappIntentMessage(lang, input));
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${text}`;
}
