import { knowledgeCatalog } from "./knowledge/catalog";
import { canonicalPath } from "./knowledge/paths";
import type { Locale } from "./knowledge/types";

export const SITE_URL = "https://www.frasma.org";
export const SITE_NAME = "Frasma";
export const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
export const FEED_URL = `${SITE_URL}/feed.xml`;
export const OWNER_NAME = "Francesco Saverio Mazzi";
export const BRAND_LOGO_PATH = "/logo-frasma.png";
export const BRAND_LOGO_IMAGE = `${SITE_URL}${BRAND_LOGO_PATH}`;
export const PROFILE_IMAGE = `${SITE_URL}/profilo_home.jpg`;
export const YOUTUBE_URL = "https://www.youtube.com/@frasmatech";
export const SMITHERY_SERVER_URL =
  "https://smithery.ai/servers/francemazzi/frasma";
export const PROFILE_SAME_AS = [
  "https://github.com/francemazzi",
  "https://gitlab.com/francesco.mazzi",
  "https://www.linkedin.com/in/francesco-saverio-mazzi-1a76b4159/",
  YOUTUBE_URL,
  SMITHERY_SERVER_URL,
] as const;

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return new URL(path, SITE_URL).toString();
}

/** Offer catalog of verified Frasma services (no price list). */
export function serviceOfferCatalogJsonLd(
  locale: Locale = "it",
  serviceIds?: readonly string[],
) {
  const selectedIds = serviceIds ? new Set(serviceIds) : null;
  const services = knowledgeCatalog.entries.filter(
    (entry) =>
      entry.category === "service" &&
      (!selectedIds || selectedIds.has(entry.id)),
  );

  return {
    "@type": "OfferCatalog",
    "@id": `${SITE_URL}/#offer-catalog`,
    name:
      locale === "it"
        ? "Servizi Frasma"
        : "Frasma services",
    itemListElement: services.map((entry, index) => {
      const path = canonicalPath(entry);
      return {
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          "@id": `${SITE_URL}/#service-${entry.id}`,
          name: entry.title[locale],
          description: entry.summary[locale],
          url: absoluteUrl(path),
          provider: {
            "@id": `${SITE_URL}/#business`,
          },
        },
      };
    }),
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const personJsonLd = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: OWNER_NAME,
  alternateName: ["Frasma", "francemazzi"],
  jobTitle: [
    "Founder and Technical Lead",
    "Business Process Automation Specialist",
    "Responsabile tecnico",
    "Specialista in automazione dei processi aziendali",
  ],
  url: SITE_URL,
  image: PROFILE_IMAGE,
  worksFor: {
    "@id": `${SITE_URL}/#business`,
  },
  sameAs: [...PROFILE_SAME_AS],
  knowsAbout: [
    "Automazione processi aziendali",
    "Automazione documentale",
    "Estrazione dati da PDF",
    "Automazione email aziendali",
    "Integrazioni ERP e API",
    "Software per manifattura",
    "Software per alimentare e HACCP",
    "Software per agronomia",
    "AI con validazione umana",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mantova",
    addressRegion: "Lombardia",
    addressCountry: "IT",
  },
};

export const professionalServiceJsonLd = {
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: `${SITE_NAME} - ${OWNER_NAME}`,
  url: SITE_URL,
  image: BRAND_LOGO_IMAGE,
  logo: BRAND_LOGO_IMAGE,
  founder: {
    "@id": `${SITE_URL}/#person`,
  },
  description:
    "Automazione di processi aziendali e documentali per PMI manifatturiere e agroalimentari: colleghiamo email, PDF, Excel ed ERP mantenendo controllo umano e sistemi esistenti.",
  areaServed: [
    {
      "@type": "Country",
      name: "Italia",
    },
    {
      "@type": "AdministrativeArea",
      name: "Lombardia",
    },
    {
      "@type": "City",
      name: "Mantova",
    },
  ],
  priceRange: "EUR",
  taxID: "02750410207",
  hasOfferCatalog: {
    "@id": `${SITE_URL}/#offer-catalog`,
  },
  sameAs: [...PROFILE_SAME_AS],
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  image: BRAND_LOGO_IMAGE,
  inLanguage: "it-IT",
  publisher: {
    "@id": `${SITE_URL}/#business`,
  },
};

export function faqPageJsonLd(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceJsonLd(input: {
  id: string;
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}/#service-${input.id}`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: {
      "@id": `${SITE_URL}/#business`,
    },
    serviceType: input.serviceType ?? input.name,
    areaServed: {
      "@type": "Country",
      name: "Italia",
    },
  };
}

export function caseStudyJsonLd(input: {
  id: string;
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@type": "Article",
    "@id": `${absoluteUrl(input.path)}#case-study`,
    headline: input.name,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: "it-IT",
    author: {
      "@id": `${SITE_URL}/#person`,
    },
    publisher: {
      "@id": `${SITE_URL}/#business`,
    },
    about: {
      "@id": `${SITE_URL}/#business`,
    },
    articleSection: "Case study",
  };
}

export function videoObjectJsonLd(input: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@type": "VideoObject",
    name: input.name,
    description: input.description,
    url: input.url,
    embedUrl: input.url,
    publisher: {
      "@id": `${SITE_URL}/#business`,
    },
  };
}

export function howToJsonLd(input: {
  name: string;
  description: string;
  url?: string;
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    ...(input.url ? { url: input.url } : {}),
    step: input.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
