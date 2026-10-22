"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useT, useLang } from "../../../lib/i18n/context";

const NAV = [
  { href: "#moduli", label: "header.nav.modules" },
  { href: "#come-iniziare", label: "header.nav.start" },
  { href: "#integrazioni", label: "header.nav.integrations" },
] as const;

const linkClass =
  "hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default function Header() {
  const t = useT();
  const { lang, setLang } = useLang();
  const companion = t("header.companion");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper/80 backdrop-blur-xl transition-colors ${
        scrolled ? "border-hairline" : "border-transparent"
      }`}
    >
      <nav className="section-farm py-3" aria-label="Frasma">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className={`flex items-center gap-3 no-underline ${linkClass}`}>
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
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-5">
            <div className="flex items-center gap-0 text-[12px] font-medium text-ink-soft tracking-[0.04em] sm:tracking-[0.05em]">
              <button
                type="button"
                onClick={() => setLang("it")}
                className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  lang === "it" ? "text-ink" : "hover:text-ink"
                }`}
                aria-pressed={lang === "it"}
              >
                IT
              </button>
              <span className="text-hairline-strong" aria-hidden="true">|</span>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  lang === "en" ? "text-ink" : "hover:text-ink"
                }`}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
            </div>
            <Link href="#contatti" className="btn-ink px-4">
              {t("home.hero.cta")}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
