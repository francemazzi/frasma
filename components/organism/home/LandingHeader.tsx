"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useT, useLang } from "../../../lib/i18n/context";
import ProcessAssessment from "../ProcessAssessment";

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
            <div className="hidden sm:block">
              <ProcessAssessment
                textButton={t("home.hero.cta")}
                showArrow
                compact
              />
            </div>
            <button
              type="button"
              className="inline-flex min-h-[44px] items-center rounded-full border border-hairline-strong px-4 text-[13px] font-medium text-ink lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? t("header.menuClose") : t("header.menu")}
            </button>
          </div>
        </div>

        {open ? (
          <ul
            id="site-menu"
            className="mt-2 flex list-none flex-col gap-1 border-t border-hairline pt-3 text-[16px] font-medium text-ink lg:hidden"
          >
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block py-3 ${linkClass}`}
                  onClick={() => setOpen(false)}
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
            <li className="py-2 sm:hidden">
              <ProcessAssessment textButton={t("home.hero.cta")} showArrow />
            </li>
          </ul>
        ) : null}
      </nav>
    </header>
  );
}
