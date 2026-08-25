import { knowledgeCatalog } from "./catalog";
import { extrasForEntry, type PageFaq } from "./page-extras";
import type { Locale, LocalizedKnowledgeEntry } from "./types";

export type ResolvedFaq = {
  question: string;
  answer: string;
};

function defaultFaqs(entry: LocalizedKnowledgeEntry): PageFaq[] {
  const commercial = knowledgeCatalog.profile.commercialLimits;

  return [
    {
      question: {
        it: `Cosa fa Frasma su ${entry.title.it}?`,
        en: `What does Frasma do for ${entry.title.en}?`,
      },
      answer: {
        it: entry.summary.it,
        en: entry.summary.en,
      },
    },
    {
      question: {
        it: "Come funziona il flusso?",
        en: "How does the workflow work?",
      },
      answer: {
        it: entry.details.map((detail) => detail.it).join(" "),
        en: entry.details.map((detail) => detail.en).join(" "),
      },
    },
    {
      question: {
        it: "C'è un listino o un risparmio garantito?",
        en: "Is there a price list or a guaranteed saving?",
      },
      answer: {
        it: commercial.map((item) => item.it).join(" "),
        en: commercial.map((item) => item.en).join(" "),
      },
    },
    {
      question: {
        it: "Come si parte?",
        en: "How do we start?",
      },
      answer: {
        it: "Si descrive un processo reale (volumi, sistemi, vincoli). Frasma valuta fattibilità e perimetro prima di qualsiasi preventivo.",
        en: "Describe one real process (volumes, systems, constraints). Frasma assesses feasibility and scope before any quote.",
      },
    },
  ];
}

function uniqueFaqs(faqs: PageFaq[]): PageFaq[] {
  const seen = new Set<string>();
  const unique: PageFaq[] = [];

  for (const faq of faqs) {
    const key = faq.question.it;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(faq);
  }

  return unique;
}

export function faqsForEntry(
  entry: LocalizedKnowledgeEntry,
  locale: Locale,
): ResolvedFaq[] {
  const extras = extrasForEntry(entry.id)?.faqs ?? [];
  const merged = uniqueFaqs([...extras, ...defaultFaqs(entry)]).slice(0, 6);

  return merged.map((faq) => ({
    question: faq.question[locale],
    answer: faq.answer[locale],
  }));
}
