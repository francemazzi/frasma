export const SITE_URL = "https://www.frasma.org";
export const SITE_NAME = "Frasma";
export const OWNER_NAME = "Francesco Saverio Mazzi";
export const BRAND_LOGO_PATH = "/logo-frasma.png";
export const BRAND_LOGO_IMAGE = `${SITE_URL}${BRAND_LOGO_PATH}`;
export const PROFILE_IMAGE = `${SITE_URL}/profilo_home.jpg`;

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return new URL(path, SITE_URL).toString();
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
    "Founder & Lead Developer",
    "Software developer",
    "Programmatore freelance",
    "Sviluppatore software",
    "Informatico freelance",
  ],
  url: SITE_URL,
  image: PROFILE_IMAGE,
  worksFor: {
    "@id": `${SITE_URL}/#business`,
  },
  sameAs: [
    "https://github.com/francemazzi",
    "https://gitlab.com/francesco.mazzi",
    "https://www.linkedin.com/in/francesco-saverio-mazzi-1a76b4159/",
  ],
  knowsAbout: [
    "Software operativo su misura",
    "Studio software per PMI",
    "Automazioni AI per imprese",
    "Digitalizzazione documentale",
    "Automazione processi aziendali",
    "Integrazioni ERP e API",
    "Software per manifattura",
    "Software per alimentare e HACCP",
    "Software per agronomia",
    "Presenza su ChatGPT, Claude e Gemini",
    "Programmazione full stack",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
  ],
  address: {
    "@type": "PostalAddress",
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
    "Software su misura e automazioni AI per processi aziendali e documenti: riduciamo copia-incolla, errori e tempi morti tra email, PDF, Excel ed ERP per PMI.",
  areaServed: [
    {
      "@type": "Country",
      name: "Italia",
    },
    {
      "@type": "AdministrativeArea",
      name: "Emilia-Romagna",
    },
  ],
  priceRange: "EUR",
  taxID: "02750410207",
  sameAs: [
    "https://github.com/francemazzi",
    "https://gitlab.com/francesco.mazzi",
    "https://www.linkedin.com/in/francesco-saverio-mazzi-1a76b4159/",
  ],
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
