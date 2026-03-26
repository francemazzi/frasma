import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useT } from "../lib/i18n/context";

export default function DiscountPage() {
  const t = useT();
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    void router.push("/");
  };

  return (
    <>
      <Head>
        <title>{t("discount.metaTitle")}</title>
        <meta name="description" content={t("discount.metaDescription")} />
      </Head>

      <main className="min-h-screen bg-farm-bg font-poppins px-6 py-16 sm:py-24">
        <section className="mx-auto max-w-2xl rounded-3xl border border-farm-border bg-farm-surface p-8 sm:p-10 text-center shadow-sm">
          <p className="inline-flex items-center rounded-full bg-sage-50 px-4 py-1.5 text-sm font-medium text-sage-600">
            {t("discount.badge")}
          </p>
          <h1 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight text-farm-text">
            {t("discount.title")}
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-farm-secondary">
            {t("discount.description")}
          </p>
          <div className="mt-6 rounded-2xl border border-farm-border bg-farm-bg p-5 text-left">
            <h2 className="text-base font-semibold text-farm-text sm:text-lg">
              {t("discount.bringTitle")}
            </h2>
            <ul className="mt-3 space-y-2 text-sm sm:text-base text-farm-secondary">
              <li>- {t("discount.bringItem1")}</li>
              <li>- {t("discount.bringItem2")}</li>
              <li>- {t("discount.bringItem3")}</li>
              <li>- {t("discount.bringItem4")}</li>
            </ul>
            <p className="mt-4 text-sm text-farm-secondary">
              {t("discount.callNote")}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center rounded-full border border-farm-border bg-farm-bg px-6 py-2.5 text-sm font-semibold text-farm-text hover:bg-farm-panel transition-colors"
            >
              {t("discount.backPrevious")}
            </button>
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-sage-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-sage-400 transition-colors"
            >
              {t("discount.backHome")}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
