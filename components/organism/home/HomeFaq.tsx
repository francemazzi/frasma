"use client";

import { useT } from "../../../lib/i18n/context";

export const HOME_FAQ_IDS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export function homeFaqItems(t: (key: string) => string) {
  return HOME_FAQ_IDS.map((id) => ({
    question: t(`home.faq.q${id}`),
    answer: t(`home.faq.a${id}`),
  }));
}

export default function HomeFaq() {
  const t = useT();
  const faqs = homeFaqItems(t);

  return (
    <section className="ed-section border-t border-hairline" aria-labelledby="home-faq-title">
      <div className="section-farm max-w-3xl">
        <h2 id="home-faq-title" className="ed-title mb-8">
          {t("home.faq.title")}
        </h2>
        <div className="border-t border-hairline">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-hairline">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-medium text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <span className="text-accent group-open:hidden" aria-hidden="true">
                  +
                </span>
                <span className="hidden text-accent group-open:inline" aria-hidden="true">
                  –
                </span>
              </summary>
              <p className="max-w-[68ch] pb-5 text-[15px] leading-[1.65] text-ink-soft">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
