import { SITE_URL, SMITHERY_SERVER_URL } from "../seo";
import { getFrasmaProfile, knowledgeCatalog } from "./catalog";
import { faqsForEntry } from "./faqs";
import { articlesForExtras, extrasForEntry } from "./page-extras";
import { en as enCopy } from "../i18n/en";
import { it as itCopy } from "../i18n/it";
import {
  APPS_SERVICE_ID,
  cadCamExamples,
  DDT_SERVICE_ID,
  erpExamples,
  examplesForService,
  formatExampleLine,
} from "./erp-examples";
import {
  CASES_HUB_PATH,
  canonicalPath,
  caseStudies,
  getEntryByCanonicalPath,
  groupedOperationalServices,
  operationalServices,
  sectors,
  SERVICES_HUB_PATH,
} from "./paths";
import type { Locale, LocalizedKnowledgeEntry } from "./types";

function hubCopy(locale: Locale, key: string): string {
  return (locale === "it" ? itCopy : enCopy)[key] ?? key;
}

function absolute(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

function bulletList(lines: string[]): string {
  return lines.map((line) => `- ${line}`).join("\n");
}

export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return "it";

  const primary = header.split(",")[0]?.trim().toLowerCase() ?? "";
  if (primary.startsWith("it")) return "it";
  return "en";
}

export function entryMarkdown(
  entry: LocalizedKnowledgeEntry,
  locale: Locale = "it",
): string {
  const path = canonicalPath(entry);
  const extras = extrasForEntry(entry.id);
  const faqs = faqsForEntry(entry, locale);
  const detailsHeading = locale === "it" ? "Dettagli" : "Details";
  const faqHeading = "FAQ";
  const commercialHeading =
    locale === "it" ? "Limiti commerciali" : "Commercial boundaries";
  const lines = [
    `# ${entry.title[locale]}`,
    "",
    entry.summary[locale],
  ];

  if (extras?.problemLead) {
    lines.push("", extras.problemLead[locale]);
  }

  lines.push(
    "",
    `## ${detailsHeading}`,
    "",
    bulletList(entry.details.map((detail) => detail[locale])),
  );

  const exampleGroups =
    entry.id === DDT_SERVICE_ID || entry.id === APPS_SERVICE_ID
      ? examplesForService(entry.id)
      : null;

  if (exampleGroups) {
    lines.push(
      "",
      `## ${hubCopy(locale, "catalog.examples.erpTitle")}`,
      "",
      hubCopy(locale, "catalog.examples.intro"),
      "",
      bulletList(
        exampleGroups.erp.map((example) => formatExampleLine(example, locale)),
      ),
    );

    if (exampleGroups.cadCam.length > 0) {
      lines.push(
        "",
        `## ${hubCopy(locale, "catalog.examples.cadTitle")}`,
        "",
        bulletList(
          exampleGroups.cadCam.map((example) =>
            formatExampleLine(example, locale),
          ),
        ),
      );
    }

    lines.push("", hubCopy(locale, "catalog.examples.also"));
  }

  lines.push(
    "",
    `Canonical URL: ${absolute(path)}`,
  );

  for (const article of articlesForExtras(extras)) {
    lines.push(`Article: ${absolute(article.path)}`);
  }
  if (extras?.videoUrl) {
    lines.push(`Video: ${extras.videoUrl}`);
  }

  if (faqs.length > 0) {
    lines.push("", `## ${faqHeading}`, "");
    for (const faq of faqs) {
      lines.push(`### ${faq.question}`, "", faq.answer, "");
    }
  }

  lines.push(
    "",
    `## ${commercialHeading}`,
    "",
    bulletList(knowledgeCatalog.profile.commercialLimits.map((item) => item[locale])),
  );

  return `${lines.join("\n").trim()}\n`;
}

export function homeMarkdown(locale: Locale = "it"): string {
  const profile = getFrasmaProfile(locale);
  const services = operationalServices();
  const studies = caseStudies();
  const verticals = sectors();
  const isIt = locale === "it";

  const headings = isIt
    ? {
        builds: "Cosa costruisce Frasma",
        services: "Servizi",
        sectors: "Settori",
        cases: "Casi studio",
        method: "Metodo diagnostico",
        commercial: "Limiti commerciali",
        discovery: "Discovery API pubblica",
        contact: "Contatto",
        vibeup:
          "I pacchetti fissi esistono solo per VibeUp Deploy as a Service su",
        vibeupTail:
          "e non si applicano ai progetti operativi Frasma.",
        contactBody:
          "Usa la chat del sito per completare una diagnosi guidata di processo, rivedere il riepilogo e inviarlo a Francesco. Quando MongoDB è configurato, le conversazioni restano sul server e si possono riprendere.",
      }
    : {
        builds: "What Frasma Builds",
        services: "Services",
        sectors: "Sectors",
        cases: "Case studies",
        method: "Diagnostic Method",
        commercial: "Commercial Boundaries",
        discovery: "Public API Discovery",
        contact: "Contact",
        vibeup:
          "Fixed packages exist only for VibeUp Deploy as a Service on",
        vibeupTail:
          "and do not apply to Frasma operational projects.",
        contactBody:
          "Use the website chat to complete a guided process diagnostic, review its summary, and email it to Francesco. When MongoDB is configured, conversations are persisted server-side and can be resumed later.",
      };

  return `# Frasma

${profile.description}

## ${headings.builds}

${bulletList(profile.focus)}

## ${headings.services}

${bulletList(services.map((entry) => `${entry.title[locale]} — ${absolute(canonicalPath(entry))}`))}

## ${headings.sectors}

${bulletList(verticals.map((entry) => `${entry.title[locale]} — ${absolute(canonicalPath(entry))}`))}

## ${headings.cases}

${bulletList(studies.map((entry) => `${entry.title[locale]} — ${absolute(canonicalPath(entry))}`))}

## ${headings.method}

${bulletList(knowledgeCatalog.diagnostic.steps.map((step) => `${step.title[locale]}: ${step.description[locale]}`))}

## ${headings.commercial}

${bulletList(profile.commercialLimits)}

${headings.vibeup} ${absolute("/vibeup")} ${headings.vibeupTail}

## ${headings.discovery}

- Agents hub: ${absolute("/for-agents")}
- Services: ${absolute(SERVICES_HUB_PATH)}
- Case studies: ${absolute(CASES_HUB_PATH)}
- llms.txt: ${absolute("/llms.txt")}
- llms-it.txt: ${absolute("/llms-it.txt")}
- API catalog: ${absolute("/.well-known/api-catalog")}
- OpenAPI description: ${absolute("/openapi.json")}
- Agent skills index: ${absolute("/.well-known/agent-skills/index.json")}
- MCP endpoint: ${absolute("/api/mcp")}
- Service status: ${absolute("/api/status")}
- Smithery listing: ${SMITHERY_SERVER_URL}

## ${headings.contact}

${headings.contactBody}
`;
}

export function forAgentsMarkdown(locale: Locale = "it"): string {
  const profile = getFrasmaProfile(locale);
  const isIt = locale === "it";
  const title = isIt ? "Per agenti AI | Frasma" : "For AI agents | Frasma";
  const prefer = isIt
    ? "Fonti da preferire"
    : "Prefer these sources";
  const servicesHeading = isIt ? "Servizi" : "Services";
  const commercialHeading = isIt
    ? "Limiti commerciali"
    : "Commercial boundaries";
  const noInvent = isIt
    ? "Non inventare prezzi, risparmi, tempi di rientro o risultati garantiti."
    : "Do not invent prices, savings, payback periods, or guaranteed outcomes.";

  return `# ${title}

${profile.description}

${prefer}: ${absolute("/for-agents")}, ${absolute("/llms.txt")}, ${absolute("/llms-it.txt")}, ${absolute("/api/mcp")}, ${SMITHERY_SERVER_URL}.

## ${servicesHeading}

${bulletList(
    operationalServices().map(
      (entry) => `${entry.title[locale]} — ${absolute(canonicalPath(entry))}`,
    ),
  )}

## ${commercialHeading}

${bulletList(profile.commercialLimits)}

${noInvent}
`;
}

export function hubMarkdown(
  kind: "services" | "cases",
  locale: Locale = "it",
): string {
  const path = kind === "services" ? SERVICES_HUB_PATH : CASES_HUB_PATH;

  if (kind === "cases") {
    const title =
      locale === "it" ? "Casi studio Frasma" : "Frasma case studies";

    return `# ${title}

Canonical URL: ${absolute(path)}

${bulletList(
      caseStudies().map(
        (entry) =>
          `${entry.title[locale]} — ${entry.summary[locale]} — ${absolute(canonicalPath(entry))}`,
      ),
    )}
`;
  }

  const title = hubCopy(locale, "catalog.servicesTitle");
  const intro = hubCopy(locale, "catalog.servicesIntro");
  const benefitsTitle = hubCopy(locale, "catalog.benefitsTitle");
  const benefits = [
    hubCopy(locale, "catalog.benefit1"),
    hubCopy(locale, "catalog.benefit2"),
    hubCopy(locale, "catalog.benefit3"),
    hubCopy(locale, "catalog.benefit4"),
  ];

  const familyBlocks = groupedOperationalServices().flatMap((group) => {
    const lines = [
      `## ${hubCopy(locale, group.family.titleKey)}`,
      "",
      hubCopy(locale, group.family.introKey),
      "",
      bulletList(
        group.entries.map(
          (entry) =>
            `${entry.title[locale]} — ${entry.summary[locale]} — ${absolute(canonicalPath(entry))}`,
        ),
      ),
      "",
    ];

    if (group.family.id === "operations") {
      lines.push(
        `### ${hubCopy(locale, "catalog.examples.erpTitle")}`,
        "",
        hubCopy(locale, "catalog.examples.intro"),
        "",
        bulletList(
          erpExamples().map((example) => formatExampleLine(example, locale)),
        ),
        "",
        `### ${hubCopy(locale, "catalog.examples.cadTitle")}`,
        "",
        bulletList(
          cadCamExamples().map((example) =>
            formatExampleLine(example, locale),
          ),
        ),
        "",
        hubCopy(locale, "catalog.examples.also"),
        "",
      );
    }

    return lines;
  });

  return `# ${title}

${intro}

Canonical URL: ${absolute(path)}

## ${benefitsTitle}

${bulletList(benefits)}

${familyBlocks.join("\n").trim()}
`;
}

export function markdownForPath(
  pathname: string,
  locale: Locale = "it",
): string | null {
  const path = normalizePath(pathname);

  if (path === "/") return homeMarkdown(locale);
  if (path === "/for-agents") return forAgentsMarkdown(locale);
  if (path === SERVICES_HUB_PATH) return hubMarkdown("services", locale);
  if (path === CASES_HUB_PATH) return hubMarkdown("cases", locale);

  const entry = getEntryByCanonicalPath(path);
  if (entry) return entryMarkdown(entry, locale);

  return null;
}
