"use client";

import Image from "next/image";
import Link from "next/link";
import { useT, useLang } from "../../lib/i18n/context";
import ProcessAssessment from "./ProcessAssessment";

export default function Header() {
  const t = useT();
  const { lang, setLang } = useLang();
  const companion = t("header.companion");

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/80 backdrop-blur-xl">
        <nav className="section-farm py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <Image
              src="/logo-frasma.png"
              alt="Frasma"
              width={48}
              height={48}
              priority
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="hidden sm:inline text-[22px] font-medium leading-none tracking-[-0.035em] text-ink">
              Fr<span className="text-accent">asma</span>
            </span>
            {companion ? (
              <span className="hidden xl:inline pl-3 border-l border-hairline text-[10px] font-medium text-ink-soft tracking-[0.08em] uppercase">
                {companion}
              </span>
            ) : null}
          </Link>

          <ul className="hidden lg:flex gap-7 list-none items-center text-[13px] font-medium text-ink/50">
            <li>
              <Link href="/#come-funziona" className="hover:text-ink transition-colors">
                {t("header.nav.platform")}
              </Link>
            </li>
            <li>
              <Link href="/servizi" className="hover:text-ink transition-colors">
                {t("header.nav.services")}
              </Link>
            </li>
            <li>
              <Link href="/#casi-studio" className="hover:text-ink transition-colors">
                {t("header.nav.cases")}
              </Link>
            </li>
            <li>
              <Link href="/#metodo" className="hover:text-ink transition-colors">
                {t("header.nav.method")}
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="flex items-center gap-0 text-[10px] font-medium text-ink-soft tracking-[0.04em] sm:text-[11px] sm:tracking-[0.05em]">
              <button
                type="button"
                onClick={() => setLang("it")}
                className={`px-[6px] transition-colors ${
                  lang === "it" ? "text-ink" : "hover:text-ink"
                }`}
              >
                IT
              </button>
              <span className="text-hairline-strong">|</span>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-[6px] transition-colors ${
                  lang === "en" ? "text-ink" : "hover:text-ink"
                }`}
              >
                EN
              </button>
            </div>
            <ProcessAssessment
              textButton={t("header.schedule")}
              showArrow
              compact
            />
          </div>
        </nav>
    </header>
  );
}
