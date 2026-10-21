"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "../../../lib/i18n/context";
import ContactLinks from "../../molecols/ContactLinks";

const SITE_LINKS = [
  { href: "/servizi", labelKey: "footer.services" },
  { href: "/casi", labelKey: "footer.cases" },
  { href: "/manifattura", labelKey: "footer.manufacturing" },
  { href: "/for-agents", labelKey: "footer.forAgents" },
  { href: "/blog", label: "Blog" },
] as const;

const EXTERNAL_LINKS = [
  { href: "https://github.com/francemazzi", label: "GitHub" },
  { href: "https://smithery.ai/servers/francemazzi/frasma", label: "Smithery" },
  { href: "https://www.linkedin.com/in/francesco-saverio-mazzi-1a76b4159/", label: "LinkedIn" },
  { href: "https://www.youtube.com/@frasmatech", label: "YouTube" },
] as const;

const linkClass =
  "hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default function Footer() {
  const t = useT();

  return (
    <footer className="border-t border-hairline py-10 pb-20 text-[13px] font-medium text-ink-soft">
      <div className="section-farm grid gap-8 md:grid-cols-[minmax(0,1.4fr)_auto] md:items-start md:gap-16">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo-frasma.png"
              alt="Frasma"
              width={36}
              height={36}
              className="h-8 w-8 rounded-full object-cover"
            />
            <p className="text-[15px] text-ink">Frasma</p>
          </div>
          <p className="mt-4 max-w-[36ch] leading-[1.5] text-ink">{t("footer.product")}</p>
          <p className="mt-3 text-ink">{t("footer.legal").split(" · ")[0]}</p>
          <p className="mt-1 leading-[1.5]">
            {t("footer.legal").split(" · ").slice(1).join(" · ")}
          </p>
          <ContactLinks className="mt-5" />
        </div>

        <nav className="grid grid-cols-2 gap-x-12 gap-y-2" aria-label="Frasma">
          <ul className="flex flex-col gap-2">
            {SITE_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {"label" in item ? item.label : t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-2">
            {EXTERNAL_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className={linkClass}>
                {t("footer.privacy")}
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy" className={linkClass}>
                {t("footer.cookies")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
