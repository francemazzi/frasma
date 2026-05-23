"use client";

import Link from "next/link";
import { useT, useLang } from "../../lib/i18n/context";

export default function Header() {
  const t = useT();
  const { lang, setLang } = useLang();

  return (
    <header className="sticky top-0 z-50 bg-paper border-b border-hairline">
        <nav className="section-farm py-5 flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-3 no-underline">
            <span className="font-serif text-[30px] font-medium leading-none tracking-[-0.025em] text-ink">
              Fr<em className="italic text-accent font-normal">asma</em>
            </span>
            <span className="hidden sm:inline pl-3 border-l border-hairline-strong font-mono text-[10.5px] text-ink-soft tracking-[0.08em] uppercase">
              {t("header.companion")}
            </span>
          </Link>

          <ul className="hidden lg:flex gap-7 list-none items-center text-[14px] text-ink">
            <li>
              <a href="/#casi-studio" className="hover:text-accent transition-colors">
                {t("header.nav.cases")}
              </a>
            </li>
            <li>
              <a href="/#piattaforma" className="hover:text-accent transition-colors">
                {t("header.nav.platform")}
              </a>
            </li>
            <li>
              <Link href="/progetti" className="hover:text-accent transition-colors">
                {t("header.nav.projects")}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-accent transition-colors">
                {t("header.nav.blog")}
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="hidden sm:flex items-center gap-0 font-mono text-[11px] text-ink-soft tracking-[0.05em]">
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
            <a
              href="#contact"
              className="btn-ink"
            >
              {t("header.schedule")}
              <span className="font-serif text-[16px] leading-[0.8]">↗</span>
            </a>
          </div>
        </nav>
    </header>
  );
}
