import type { CampaignLanding } from "../../../lib/campaign";
import { DDT_SERVICE_ID } from "../../../lib/knowledge/erp-examples";
import type { Locale, LocalizedText } from "../../../lib/knowledge/types";
import OperationsSystemExamples from "../OperationsSystemExamples";

type Props = {
  title: string;
  problemLead?: LocalizedText;
  landing: Pick<CampaignLanding, "howItWorks">;
  lang: Locale;
};

export default function DdtHowItWorks({ title, problemLead, landing, lang }: Props) {
  return (
    <section className="ed-section border-t border-ink/8" id="come-funziona">
      <div className="section-farm">
        <h2 className="mb-3 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
          {title}
        </h2>
        {problemLead ? (
          <p className="mb-8 max-w-[62ch] text-[16px] leading-[1.6] text-ink-soft">
            {problemLead[lang]}
          </p>
        ) : null}

        <ol className="list-none p-0">
          {landing.howItWorks.map((step, index) => (
            <li key={step.title.it} className="ed-list-row">
              <span className="ed-list-num">{String(index + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <h3 className="text-[18px] font-medium leading-[1.3] text-ink sm:text-[20px]">
                  {step.title[lang]}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-soft sm:text-[16px]">
                  {step.body[lang]}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="max-w-3xl">
          <OperationsSystemExamples variant={DDT_SERVICE_ID} />
        </div>
      </div>
    </section>
  );
}
