import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { trackLeadConversion } from "../lib/analytics/lead-conversion";
import { readAttribution } from "../lib/attribution";
import { campaignLandings } from "../lib/campaign";
import { useLang, useT } from "../lib/i18n/context";
import Seo from "../components/Seo";

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Thank-you page after a brief or a campaign lead: fires every conversion signal once. */
export default function DiscountPage() {
  const t = useT();
  const { lang } = useLang();
  const router = useRouter();
  const hasTrackedConversionRef = useRef(false);

  const conv = firstValue(router.query.conv);
  const lp = firstValue(router.query.lp);
  const landing = lp
    ? campaignLandings().find((candidate) => candidate.id === lp)
    : undefined;

  useEffect(() => {
    if (!router.isReady || hasTrackedConversionRef.current) return;
    if (conv !== "contact") return;

    hasTrackedConversionRef.current = true;
    trackLeadConversion({
      landing: lp ?? "site",
      attribution: readAttribution(),
    });
  }, [router.isReady, conv, lp]);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    void router.push("/");
  };

  const bringItems = landing
    ? landing.needs.items.map((item) => item[lang])
    : [
        t("discount.bringItem1"),
        t("discount.bringItem2"),
        t("discount.bringItem3"),
        t("discount.bringItem4"),
      ];

  return (
    <>
      <Seo
        title={t("discount.metaTitle")}
        description={t("discount.metaDescription")}
        path="/discount"
        noindex
      />

      <main className="min-h-screen bg-paper font-sans px-6 py-16 sm:py-24">
        <section className="mx-auto max-w-2xl rounded-3xl border border-hairline-strong bg-paper-2 p-8 sm:p-10 text-center">
          <p className="inline-flex items-center rounded-full bg-sage-50 px-4 py-1.5 text-sm font-medium text-sage-600">
            {t("discount.badge")}
          </p>
          <h1 className="mt-5 text-3xl sm:text-4xl font-medium tracking-tight text-farm-text">
            {t("discount.title")}
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-farm-secondary">
            {t("discount.description")}
          </p>

          {landing ? (
            <div className="mt-6 rounded-2xl border border-hairline-strong bg-paper p-5 text-left">
              <h2 className="text-base font-medium text-farm-text sm:text-lg">
                {t("discount.nextTitle")}
              </h2>
              <ol className="mt-3 space-y-2 text-sm sm:text-base text-farm-secondary">
                {landing.nextSteps.map((step, index) => (
                  <li key={step.title.it}>
                    {index + 1}. {step.title[lang]}
                    {step.timing ? ` (${step.timing[lang]})` : ""}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          <div className="mt-6 rounded-2xl border border-hairline-strong bg-paper p-5 text-left">
            <h2 className="text-base font-medium text-farm-text sm:text-lg">
              {t("discount.bringTitle")}
            </h2>
            <ul className="mt-3 space-y-2 text-sm sm:text-base text-farm-secondary">
              {bringItems.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-farm-secondary">
              {t("discount.callNote")}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="btn-ink-ghost"
            >
              {t("discount.backPrevious")}
            </button>
            <Link
              href="/"
              className="btn-ink no-underline"
            >
              {t("discount.backHome")}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
