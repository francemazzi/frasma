import Link from "next/link";
import { proofHasFigures, type CampaignProof } from "../../../lib/campaign";
import { useT } from "../../../lib/i18n/context";
import type { Locale } from "../../../lib/knowledge/types";

type Props = {
  title: string;
  proof: CampaignProof;
  lang: Locale;
};

function EvidenceLink({ href, label }: { href: string; label: string }) {
  const className =
    "text-[15px] font-medium text-accent underline-offset-2 hover:underline";
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}

/**
 * Commercial proof. Renders metric tiles only when the proof carries sourced
 * figures; otherwise a before/after pair plus the qualitative result. Numbers
 * never live in this component.
 */
export default function ProofBlock({ title, proof, lang }: Props) {
  const t = useT();
  const figures = proofHasFigures(proof);

  return (
    <section className="ed-section border-t border-ink/8" id="caso-reale">
      <div className="section-farm">
        <h2 className="mb-3 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
          {title}
        </h2>
        <p className="mb-8 text-[15px] text-ink-soft">
          <span className="font-medium text-ink">{t("campaign.sectorLabel")}:</span>{" "}
          {proof.sector[lang]} ·{" "}
          <span className="font-medium text-ink">{t("campaign.erpLabel")}:</span>{" "}
          {proof.erp[lang]}
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <p className="rounded-2xl border border-hairline-strong bg-paper-2 p-5 text-[14.5px] leading-[1.6] text-ink-soft">
              <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.1em] text-accent">
                {t("results.beforeLabel")}
              </span>
              {proof.before[lang]}
            </p>
            <p className="rounded-2xl border border-hairline-strong bg-paper-2 p-5 text-[14.5px] leading-[1.6] text-ink-soft">
              <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.1em] text-accent">
                {t("results.afterLabel")}
              </span>
              {proof.after[lang]}
            </p>
            {figures ? (
              <dl className="grid grid-cols-1 gap-3 sm:col-span-2 sm:grid-cols-3">
                {proof.docsPerMonth !== undefined ? (
                  <div className="rounded-2xl border border-hairline-strong bg-paper-2 p-5">
                    <dt className="text-[28px] font-medium tracking-[-0.04em] text-ink">
                      {proof.docsPerMonth.toLocaleString(lang === "it" ? "it-IT" : "en-GB")}
                    </dt>
                    <dd className="mt-1 text-[13px] text-ink-soft">
                      {t("campaign.docsPerMonth")}
                    </dd>
                  </div>
                ) : null}
                {proof.timeBefore ? (
                  <div className="rounded-2xl border border-hairline-strong bg-paper-2 p-5">
                    <dt className="text-[22px] font-medium tracking-[-0.03em] text-ink">
                      {proof.timeBefore[lang]}
                    </dt>
                    <dd className="mt-1 text-[13px] text-ink-soft">
                      {t("results.beforeLabel")}
                    </dd>
                  </div>
                ) : null}
                {proof.timeAfter ? (
                  <div className="rounded-2xl border border-hairline-strong bg-paper-2 p-5">
                    <dt className="text-[22px] font-medium tracking-[-0.03em] text-ink">
                      {proof.timeAfter[lang]}
                    </dt>
                    <dd className="mt-1 text-[13px] text-ink-soft">
                      {t("results.afterLabel")}
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
            <p className="text-[15px] leading-[1.6] text-ink-soft sm:col-span-2">
              {proof.result[lang]}
              {proof.measuredOver ? ` ${t("campaign.measuredOver")}: ${proof.measuredOver[lang]}.` : ""}
            </p>
            {proof.sourceNote ? (
              <p className="text-[13px] leading-[1.55] text-ink-soft sm:col-span-2">
                {proof.sourceNote[lang]}
              </p>
            ) : null}
          </div>

          <div className="rounded-3xl border border-hairline-strong bg-paper-2 p-6 sm:p-7">
            <h3 className="text-[20px] font-medium tracking-[-0.02em] text-ink">
              {t("campaign.evidenceTitle")}
            </h3>
            <ul className="mt-4 space-y-3">
              {proof.evidence.map((item) => (
                <li key={item.href} className="leading-[1.5]">
                  <EvidenceLink href={item.href} label={item.label[lang]} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
