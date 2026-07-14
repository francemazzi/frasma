"use client";

import Link from "next/link";
import Footer from "../components/organism/Footer";
import Header from "../components/organism/Header";
import Seo from "../components/Seo";
import { useLang, useT } from "../lib/i18n/context";
import {
  getFrasmaProfile,
  knowledgeCatalog,
} from "../lib/knowledge";
import {
  breadcrumbJsonLd,
  professionalServiceJsonLd,
  serviceOfferCatalogJsonLd,
  SITE_URL,
} from "../lib/seo";

const DISCOVERY_LINKS = [
  {
    href: "/llms.txt",
    labelKey: "forAgents.link.llms",
    external: false,
  },
  {
    href: "/openapi.json",
    labelKey: "forAgents.link.openapi",
    external: false,
  },
  {
    href: "/.well-known/api-catalog",
    labelKey: "forAgents.link.apiCatalog",
    external: false,
  },
  {
    href: "/.well-known/agent-skills/index.json",
    labelKey: "forAgents.link.skills",
    external: false,
  },
  {
    href: "/api/mcp",
    labelKey: "forAgents.link.mcp",
    external: false,
  },
  {
    href: "/api/status",
    labelKey: "forAgents.link.status",
    external: false,
  },
] as const;

export default function ForAgentsPage() {
  const t = useT();
  const { lang } = useLang();
  const profile = getFrasmaProfile(lang);
  const services = knowledgeCatalog.entries.filter(
    (entry) => entry.category === "service" && entry.id !== "vibeup-deploy-service",
  );
  const commercial = knowledgeCatalog.entries.find(
    (entry) => entry.id === "commercial-boundaries",
  );
  const vibeup = knowledgeCatalog.entries.find(
    (entry) => entry.id === "vibeup-deploy-service",
  );

  const title = t("forAgents.meta.title");
  const description = t("forAgents.meta.description");

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/for-agents"
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: t("forAgents.breadcrumb"), path: "/for-agents" },
          ]),
          professionalServiceJsonLd,
          serviceOfferCatalogJsonLd(lang),
          {
            "@type": "WebPage",
            "@id": `${SITE_URL}/for-agents#webpage`,
            name: title,
            description,
            url: `${SITE_URL}/for-agents`,
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#business` },
          },
        ]}
      />

      <main className="min-h-screen bg-paper font-sans text-ink">
        <Header />

        <section className="ed-section">
          <div className="section-farm max-w-3xl">
            <div className="ed-kicker">{t("forAgents.eyebrow")}</div>
            <h1 className="ed-title mb-6">{t("forAgents.title")}</h1>
            <p className="ed-intro mb-4">{profile.description}</p>
            <p className="text-[16px] leading-[1.6] text-ink-soft">
              {t("forAgents.intro")}
            </p>
          </div>
        </section>

        <section className="ed-section border-t border-ink/8">
          <div className="section-farm max-w-3xl">
            <h2 className="mb-6 text-[28px] font-semibold tracking-[-0.03em] sm:text-[34px]">
              {t("forAgents.servicesTitle")}
            </h2>
            <ul className="space-y-5">
              {services.map((service) => (
                <li key={service.id}>
                  <h3 className="text-[17px] font-semibold text-ink">
                    {service.title[lang]}
                  </h3>
                  <p className="mt-1 text-[15px] leading-[1.55] text-ink-soft">
                    {service.summary[lang]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="ed-section border-t border-ink/8">
          <div className="section-farm max-w-3xl">
            <h2 className="mb-6 text-[28px] font-semibold tracking-[-0.03em] sm:text-[34px]">
              {t("forAgents.limitsTitle")}
            </h2>
            <ul className="space-y-3">
              {(commercial
                ? commercial.details.map((detail) => detail[lang])
                : profile.commercialLimits
              ).map((line, index) => (
                <li
                  key={index}
                  className="text-[15px] leading-[1.55] text-ink-soft"
                >
                  {line}
                </li>
              ))}
            </ul>
            {vibeup ? (
              <p className="mt-6 text-[15px] leading-[1.55] text-ink-soft">
                {vibeup.summary[lang]}{" "}
                <Link href="/vibeup" className="text-accent underline-offset-2 hover:underline">
                  /vibeup
                </Link>
              </p>
            ) : null}
          </div>
        </section>

        <section className="ed-section border-t border-ink/8">
          <div className="section-farm max-w-3xl">
            <h2 className="mb-6 text-[28px] font-semibold tracking-[-0.03em] sm:text-[34px]">
              {t("forAgents.engageTitle")}
            </h2>
            <ol className="list-decimal space-y-3 pl-5 text-[15px] leading-[1.55] text-ink-soft">
              <li>{t("forAgents.engage1")}</li>
              <li>{t("forAgents.engage2")}</li>
              <li>{t("forAgents.engage3")}</li>
              <li>{t("forAgents.engage4")}</li>
            </ol>
            <p className="mt-8">
              <Link
                href="/#contatti"
                className="inline-flex rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-paper transition-opacity hover:opacity-90"
              >
                {t("forAgents.ctaChat")}
              </Link>
            </p>
          </div>
        </section>

        <section className="ed-section border-t border-ink/8">
          <div className="section-farm max-w-3xl">
            <h2 className="mb-6 text-[28px] font-semibold tracking-[-0.03em] sm:text-[34px]">
              {t("forAgents.discoveryTitle")}
            </h2>
            <ul className="space-y-2">
              {DISCOVERY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-accent underline-offset-2 hover:underline"
                    {...(link.href.endsWith(".json") ||
                    link.href.endsWith(".txt") ||
                    link.href.startsWith("/api/")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {t(link.labelKey)}
                    <span className="ml-2 text-ink-faint">{link.href}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
