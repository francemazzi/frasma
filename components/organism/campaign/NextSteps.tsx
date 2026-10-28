import type { CampaignLanding } from "../../../lib/campaign";
import type { Locale } from "../../../lib/knowledge/types";

type Props = {
  title: string;
  landing: Pick<CampaignLanding, "nextSteps" | "quoteModel" | "needs">;
  lang: Locale;
};

/** "What happens after you get in touch": four steps, how the quote is built, what we need. */
export default function NextSteps({ title, landing, lang }: Props) {
  return (
    <section className="ed-section border-t border-ink/8" id="dopo-il-contatto">
      <div className="section-farm">
        <h2 className="mb-8 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
          {title}
        </h2>

        <ol className="list-none p-0">
          {landing.nextSteps.map((step, index) => (
            <li key={step.title.it} className="ed-list-row">
              <span className="ed-list-num">{String(index + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <h3 className="text-[18px] font-medium leading-[1.3] text-ink sm:text-[20px]">
                  {step.title[lang]}
                  {step.timing ? (
                    <span className="ml-2 inline-flex rounded-full bg-paper px-2.5 py-0.5 align-middle text-[12px] font-medium text-accent">
                      {step.timing[lang]}
                    </span>
                  ) : null}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-soft sm:text-[16px]">
                  {step.body[lang]}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-hairline-strong bg-paper-2 p-6 sm:p-7">
            <h3 className="text-[20px] font-medium tracking-[-0.02em] text-ink">
              {landing.quoteModel.title[lang]}
            </h3>
            <ul className="mt-4 space-y-3">
              {landing.quoteModel.bullets.map((item) => (
                <li
                  key={item.it}
                  className="flex gap-3 text-[15px] leading-[1.6] text-ink-soft"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-hairline-strong bg-paper-2 p-6 sm:p-7">
            <h3 className="text-[20px] font-medium tracking-[-0.02em] text-ink">
              {landing.needs.title[lang]}
            </h3>
            <ul className="mt-4 space-y-3">
              {landing.needs.items.map((item) => (
                <li
                  key={item.it}
                  className="flex gap-3 text-[15px] leading-[1.6] text-ink-soft"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
