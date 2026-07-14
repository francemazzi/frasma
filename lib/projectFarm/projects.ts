import type { Project } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "seminai",
    name: "Seminai.tech",
    ticker: "SEM",
    projectUrl: "https://seminai.tech",
    tagline:
      "Generazione di dosaggi e supporto decisionale per il mondo agricolo.",
    status: "In crescita",
    sector: "AgriTech",
    icon: "🌱",
    sortOrder: 1,
    team: [
      {
        name: "Io",
        role: "Software / prodotto",
        linkedinUrl: null,
      },
      {
        name: "Clarice Servidori",
        role: "Innovation, Accenture",
        linkedinUrl:
          "https://www.linkedin.com/in/clarice-servidori-752339b6/?locale=it",
      },
    ],
    metrics: [
      {
        key: "registeredUsers",
        label: "Utenti iscritti",
        baseValue: 42,
        unit: "",
        trend: "up",
        dailyDeltaRange: [0, 2],
      },
      {
        key: "monthlyDosages",
        label: "Dosaggi generati nell'ultimo mese",
        baseValue: 320,
        unit: "",
        trend: "up",
        dailyDeltaRange: [-4, 9],
      },
      {
        key: "dailyDosages",
        label: "Dosaggi generati oggi",
        baseValue: 2,
        unit: "",
        trend: "stable",
        dailyDeltaRange: [-1, 3],
      },
    ],
  },
  {
    id: "strata",
    name: "Strata",
    ticker: "STR",
    projectUrl: "https://getstrata.org/",
    tagline: "Progetto QGIS / GeoAI per analisi territoriali e agronomiche.",
    status: "In validazione",
    sector: "GeoData",
    icon: "🛰️",
    sortOrder: 2,
    team: [
      {
        name: "Io",
        role: "Software / prodotto",
        linkedinUrl: null,
      },
      {
        name: "Massimo Gatta",
        role: "Agronomo",
        linkedinUrl: "https://www.linkedin.com/in/massimo-gatta-agronomo/",
      },
      {
        name: "Valerio Sota",
        role: "Esperto GeoAI",
        linkedinUrl: "https://www.linkedin.com/in/valerio-sota/",
      },
    ],
    metrics: [
      {
        key: "monthlyActiveUsers",
        label: "Utenti attivi mensili",
        baseValue: 10,
        unit: "",
        trend: "stable",
        dailyDeltaRange: [-1, 2],
      },
      {
        key: "dailyActiveUsers",
        label: "Utenti attivi oggi",
        baseValue: 3,
        unit: "",
        trend: "stable",
        dailyDeltaRange: [-1, 1],
      },
    ],
  },
  {
    id: "insurance-tool",
    name: "Assicurazioni Tool",
    ticker: "AST",
    projectUrl:
      "https://assicurazioni-web-398080370942.europe-west1.run.app/",
    tagline: "Tool per gestire le scadenze delle assicurazioni.",
    status: "In partenza",
    sector: "InsurTech",
    icon: "🛡️",
    sortOrder: 3,
    team: [
      {
        name: "Io",
        role: "Informatico / sviluppo software",
        linkedinUrl: null,
      },
      {
        name: "Robert Albistroyu",
        role: "Consulente prodotto",
        linkedinUrl: null,
      },
      {
        name: "Lorenzo",
        role: "Esperto di assicurazione commerciale",
        linkedinUrl: null,
      },
    ],
    metrics: [
      {
        key: "registeredUsers",
        label: "Utenti iscritti",
        baseValue: 1,
        unit: "",
        trend: "starting",
        dailyDeltaRange: [0, 1],
      },
      {
        key: "activeUsers",
        label: "Utenti attivi",
        baseValue: 0,
        unit: "",
        trend: "flat",
        dailyDeltaRange: [0, 0],
      },
    ],
  },
  {
    id: "bilanciami",
    name: "Bilanciami.com",
    ticker: "BLN",
    projectUrl: "https://bilanciami.com",
    tagline:
      "AI-powered invoice extraction and management: estrae dati strutturati da fatture italiane e documenti fiscali con text processing avanzato e GPT Vision.",
    status: "In crescita",
    sector: "FinTech",
    icon: "🧾",
    sortOrder: 4,
    team: [
      {
        name: "Io",
        role: "Software / prodotto",
        linkedinUrl: null,
      },
      {
        name: "Robert",
        role: "Marketing",
        linkedinUrl: null,
      },
    ],
    metrics: [
      {
        key: "registeredCompanies",
        label: "Aziende registrate",
        baseValue: 3,
        unit: "",
        trend: "stable",
        dailyDeltaRange: [0, 0],
      },
      {
        key: "dailyDdtPerUser",
        label: "DDT al giorno per utente",
        baseValue: 12,
        unit: "",
        trend: "up",
        dailyDeltaRange: [-1, 2],
      },
    ],
  },
  {
    id: "worldsim",
    name: "worldsim",
    ticker: "WLD",
    projectUrl: "https://www.npmjs.com/package/worldsim",
    docsUrl: "https://francemazzi.github.io/worldsim/",
    npmPackage: "worldsim",
    tagline:
      "Simulate how communities react to new rules, events, or policies — multi-agent simulation engine for TypeScript.",
    status: "In crescita",
    sector: "Open Source",
    icon: "🌍",
    sortOrder: 5,
    team: [
      {
        name: "Io",
        role: "Software / prodotto",
        linkedinUrl: null,
      },
    ],
    metrics: [
      {
        key: "weeklyDownloads",
        label: "Download npm (7gg)",
        baseValue: 238,
        unit: "",
        trend: "up",
        dailyDeltaRange: [0, 0],
        source: "npm",
      },
    ],
  },
  {
    id: "wordsmith-ts",
    name: "wordsmith-ts",
    ticker: "WRD",
    projectUrl: "https://www.npmjs.com/package/wordsmith-ts",
    npmPackage: "wordsmith-ts",
    tagline:
      "Lightweight functional library to extract and replace variables in Word (.docx) files.",
    status: "In validazione",
    sector: "Open Source",
    icon: "📝",
    sortOrder: 6,
    team: [
      {
        name: "Io",
        role: "Software / prodotto",
        linkedinUrl: null,
      },
    ],
    metrics: [
      {
        key: "weeklyDownloads",
        label: "Download npm (7gg)",
        baseValue: 48,
        unit: "",
        trend: "stable",
        dailyDeltaRange: [0, 0],
        source: "npm",
      },
    ],
  },
];
