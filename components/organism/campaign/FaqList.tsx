import type { ResolvedFaq } from "../../../lib/knowledge";

type Props = {
  title: string;
  faqs: ResolvedFaq[];
  intro?: string;
};

export default function FaqList({ title, faqs, intro }: Props) {
  if (faqs.length === 0) return null;

  return (
    <section className="ed-section border-t border-ink/8" id="faq">
      <div className="section-farm max-w-3xl">
        <h2 className="mb-6 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
          {title}
        </h2>
        {intro ? (
          <p className="mb-8 text-[16px] leading-[1.6] text-ink-soft">{intro}</p>
        ) : null}
        <dl className="space-y-5">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="text-[17px] font-medium text-ink">{faq.question}</dt>
              <dd className="mt-1 text-[15px] leading-[1.55] text-ink-soft">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
