"use client";

import Link from "next/link";
import type { CampaignLanding } from "../../../lib/campaign";
import { useT } from "../../../lib/i18n/context";
import { knowledgeCatalog, type ResolvedFaq } from "../../../lib/knowledge";
import type { PageArticle, PageExtras } from "../../../lib/knowledge/page-extras";
import type { Locale, LocalizedKnowledgeEntry } from "../../../lib/knowledge/types";
import LiteYouTube from "../../atoms/LiteYouTube";
import FaqList from "../campaign/FaqList";
import LeadForm from "../campaign/LeadForm";
import NextSteps from "../campaign/NextSteps";
import ProofBlock from "../campaign/ProofBlock";
import RelatedLinks, { type RelatedLinkItem } from "../campaign/RelatedLinks";
import { IntegrationLogoRail } from "../IntegrationLogos";
import DdtHero from "./DdtHero";
import DdtHowItWorks from "./DdtHowItWorks";

type Props = {
  entry: LocalizedKnowledgeEntry;
  landing: CampaignLanding;
  extras?: PageExtras;
  articles: PageArticle[];
  faqs: ResolvedFaq[];
  related: RelatedLinkItem[];
  lang: Locale;
};

/** Campaign landing body for /servizi/ddt-erp (Header, Footer and Seo stay in CatalogLanding). */
export default function DdtLanding({
  entry,
  landing,
  extras,
  articles,
  faqs,
  related,
  lang,
}: Props) {
  const t = useT();
  const limits = knowledgeCatalog.profile.commercialLimits;

  return (
    <>
      <DdtHero
        entry={entry}
        landing={landing}
        problemLead={extras?.problemLead}
        lang={lang}
      />

      {landing.video ? (
        <section className="ed-section border-t border-ink/8" id="video">
          <div className="section-farm grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
            <LiteYouTube
              videoId={landing.video.youtubeId}
              title={landing.video.title[lang]}
            />
            <div className="min-w-0">
              <p className="ed-kicker">{t("campaign.videoKicker")}</p>
              <h2 className="mb-3 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
                {landing.video.title[lang]}
              </h2>
              <p className="text-[16px] leading-[1.6] text-ink-soft">
                {landing.video.caption[lang]}
              </p>
              {articles.length > 0 ? (
                <ul className="mt-5 space-y-2">
                  {articles.map((article) => (
                    <li key={article.path} className="text-[15px] leading-[1.55] text-ink-soft">
                      <span className="font-medium text-ink">
                        {t("catalog.articleLabel")}:{" "}
                      </span>
                      <Link
                        href={article.path}
                        className="text-accent underline-offset-2 hover:underline"
                      >
                        {article.title[lang]}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <DdtHowItWorks
        title={t("campaign.howTitle")}
        problemLead={extras?.problemLead}
        landing={landing}
        lang={lang}
      />

      <div className="border-t border-ink/8 py-10 sm:py-14">
        <IntegrationLogoRail />
      </div>

      <ProofBlock title={t("campaign.proofTitle")} proof={landing.proof} lang={lang} />

      <NextSteps title={t("campaign.nextTitle")} landing={landing} lang={lang} />

      <section className="ed-section scroll-mt-20 border-t border-ink/8" id="richiesta">
        <div className="section-farm grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div className="min-w-0">
            <p className="ed-kicker">{t("campaign.formKicker")}</p>
            <h2 className="mb-3 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
              {landing.form.title[lang]}
            </h2>
            <p className="text-[16px] leading-[1.6] text-ink-soft">
              {landing.form.intro[lang]}
            </p>
            <p className="mt-4 text-[14px] leading-[1.6] text-ink-soft">
              {landing.form.assurance[lang]}
            </p>
          </div>
          <LeadForm landingId={landing.id} copy={landing.form} whatsappTopic="ddt" />
        </div>
      </section>

      <FaqList title={t("catalog.faqTitle")} faqs={faqs} />

      <section className="ed-section border-t border-ink/8" id="limiti">
        <div className="section-farm max-w-3xl">
          <h2 className="mb-3 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
            {t("campaign.limitsTitle")}
          </h2>
          <p className="mb-6 text-[16px] leading-[1.6] text-ink-soft">
            {t("campaign.limitsIntro")}
          </p>
          <ul className="space-y-3">
            {limits.map((item) => (
              <li key={item.it} className="flex gap-3 text-[15px] leading-[1.6] text-ink-soft">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedLinks title={t("catalog.relatedTitle")} items={related} />
    </>
  );
}
