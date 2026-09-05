"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "../../lib/i18n/context";

type FooterLink = {
  href: string;
  labelKey?: string;
  label?: string;
  external?: boolean;
};

const COLUMNS: Array<{ titleKey: string; links: FooterLink[] }> = [
  {
    titleKey: "footer.solutions",
    links: [
      { href: "/manifattura", labelKey: "footer.manufacturing" },
      { href: "/alimentare", labelKey: "footer.food" },
      { href: "/servizi/ddt-erp", labelKey: "footer.docs" },
      { href: "/servizi", labelKey: "footer.erp" },
    ],
  },
  {
    titleKey: "footer.resources",
    links: [
      { href: "/casi", labelKey: "footer.cases" },
      { href: "/blog", label: "Blog" },
      { href: "/studio", labelKey: "footer.about" },
    ],
  },
  {
    titleKey: "footer.lab",
    links: [
      {
        href: "https://github.com/francemazzi",
        labelKey: "footer.oss",
        external: true,
      },
      { href: "/progetti", labelKey: "footer.experiments" },
      {
        href: "https://github.com/francemazzi",
        label: "GitHub",
        external: true,
      },
    ],
  },
  {
    titleKey: "footer.company",
    links: [
      { href: "/#contact", labelKey: "footer.contact" },
      { href: "/for-agents", labelKey: "footer.forAgents" },
      {
        href: "https://www.linkedin.com/in/francesco-saverio-mazzi-1a76b4159/",
        label: "LinkedIn",
        external: true,
      },
    ],
  },
];

export default function Footer() {
  const t = useT();

  return (
    <footer className="border-t border-hairline py-10 pb-20 text-[12px] font-medium text-ink-soft">
      <div className="section-farm">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex max-w-sm items-start gap-3">
            <Image
              src="/logo-frasma.png"
              alt="Frasma"
              width={36}
              height={36}
              className="h-8 w-8 rounded-full object-cover"
            />
            <p>{t("footer.info")}</p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((column) => (
              <div key={column.titleKey}>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">
                  {t(column.titleKey)}
                </p>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={`${column.titleKey}-${link.href}-${link.labelKey ?? link.label}`}>
                      <Link
                        href={link.href}
                        className="hover:text-accent transition-colors"
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.labelKey ? t(link.labelKey) : link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
