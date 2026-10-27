"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { trackEvent } from "../../../lib/analytics/events";
import type { CampaignLanding } from "../../../lib/campaign";
import { whatsappHref } from "../../../lib/contact";
import { useT } from "../../../lib/i18n/context";
import type {
  Locale,
  LocalizedKnowledgeEntry,
  LocalizedText,
} from "../../../lib/knowledge/types";
import { AgentMock, MockStage } from "../productMocks";

type Props = {
  entry: Pick<LocalizedKnowledgeEntry, "title" | "summary">;
  landing: Pick<CampaignLanding, "id" | "hero">;
  problemLead?: LocalizedText;
  lang: Locale;
};

/** First screen: problem, who it is for, result, one primary CTA, the live demo. */
export default function DdtHero({ entry, landing, problemLead, lang }: Props) {
  const t = useT();
  const { hero } = landing;

  return (
    <section className="ed-section pb-14 sm:pb-20">
      <div className="section-farm">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="min-w-0">
            <p className="ed-kicker">{hero.kicker[lang]}</p>
            <h1 className="ed-title mb-6">{entry.title[lang]}</h1>
            <p className="ed-intro">{entry.summary[lang]}</p>
            {problemLead ? (
              <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.6] text-ink-soft">
                <span className="font-medium text-ink">{t("campaign.forWhom")}:</span>{" "}
                {problemLead[lang]}
              </p>
            ) : null}

            <ul className="mt-6 flex flex-wrap gap-2">
              {hero.results.map((item) => (
                <li
                  key={item.it}
                  className="inline-flex items-center gap-1.5 rounded-full border border-hairline-strong bg-paper-2 px-3 py-1.5 text-[13px] font-medium text-ink"
                >
                  <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  {item[lang]}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#richiesta"
                className="btn-ink min-h-[48px] w-full sm:w-auto"
                data-cta-id="ddt-hero-primary"
              >
                {hero.ctaPrimary[lang]}
              </a>
              <a
                href={whatsappHref(lang, "ddt")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink-ghost min-h-[48px] w-full justify-center sm:w-auto"
                data-cta-id="ddt-hero-whatsapp"
                onClick={() =>
                  trackEvent("contact_whatsapp", { landing: landing.id })
                }
              >
                {hero.ctaSecondary[lang]}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <div className="h-[400px] overflow-hidden rounded-3xl border border-hairline-strong sm:h-[460px] lg:h-[520px]">
              <MockStage variant="peach" badge={t("mock.working")}>
                <AgentMock />
              </MockStage>
            </div>
            <p className="mt-3 text-[13px] leading-[1.5] text-ink-soft">
              {hero.mockCaption[lang]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
