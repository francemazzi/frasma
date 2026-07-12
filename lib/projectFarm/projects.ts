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
    projectUrl: "https://francemazzi.github.io/strata/",
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
    projectUrl: null,
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
];
