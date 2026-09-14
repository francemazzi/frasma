import { knowledgeCatalog } from "./catalog";
import type { LocalizedKnowledgeEntry } from "./types";

export const VIBEUP_SERVICE_ID = "vibeup-deploy-service";
export const SERVICES_HUB_PATH = "/servizi";
export const CASES_HUB_PATH = "/casi";

export const SERVICE_FAMILY_IDS = [
  "operations",
  "field-knowledge",
  "ai-how",
] as const;

export type ServiceFamilyId = (typeof SERVICE_FAMILY_IDS)[number];

export type ServiceFamily = {
  id: ServiceFamilyId;
  titleKey: string;
  introKey: string;
  serviceIds: readonly string[];
};

export const SERVICE_FAMILIES: readonly ServiceFamily[] = [
  {
    id: "operations",
    titleKey: "catalog.family.operations.title",
    introKey: "catalog.family.operations.intro",
    serviceIds: ["delivery-notes-to-erp", "custom-management-software"],
  },
  {
    id: "field-knowledge",
    titleKey: "catalog.family.fieldKnowledge.title",
    introKey: "catalog.family.fieldKnowledge.intro",
    serviceIds: [
      "workflow-procedures",
      "field-service-ticketing",
      "company-wiki-brain",
    ],
  },
  {
    id: "ai-how",
    titleKey: "catalog.family.aiHow.title",
    introKey: "catalog.family.aiHow.intro",
    serviceIds: [
      "ai-datasets-benchmarks",
      "local-ai-enterprise",
      "ai-presence",
    ],
  },
];

const INDEXABLE_CATEGORIES = new Set([
  "service",
  "case-study",
  "sector",
]);

export function canonicalPath(
  entry: Pick<LocalizedKnowledgeEntry, "pagePaths">,
): string {
  const path =
    entry.pagePaths.find((candidate) => !candidate.includes("#")) ??
    entry.pagePaths[0] ??
    "/";

  return path.split("#")[0] || "/";
}

export function getKnowledgeEntry(
  id: string,
): LocalizedKnowledgeEntry | undefined {
  return knowledgeCatalog.entries.find((entry) => entry.id === id);
}

export function operationalServices(): LocalizedKnowledgeEntry[] {
  return knowledgeCatalog.entries.filter(
    (entry) =>
      entry.category === "service" && entry.id !== VIBEUP_SERVICE_ID,
  );
}

export function groupedOperationalServices(
  entries: LocalizedKnowledgeEntry[] = operationalServices(),
): Array<{ family: ServiceFamily; entries: LocalizedKnowledgeEntry[] }> {
  const byId = new Map(entries.map((entry) => [entry.id, entry]));

  return SERVICE_FAMILIES.map((family) => ({
    family,
    entries: family.serviceIds
      .map((id) => byId.get(id))
      .filter((entry): entry is LocalizedKnowledgeEntry => Boolean(entry)),
  })).filter((group) => group.entries.length > 0);
}

export function ungroupedOperationalServiceIds(
  entries: LocalizedKnowledgeEntry[] = operationalServices(),
): string[] {
  const groupedIds = new Set(
    SERVICE_FAMILIES.flatMap((family) => family.serviceIds),
  );

  return entries
    .map((entry) => entry.id)
    .filter((id) => !groupedIds.has(id));
}

export function caseStudies(): LocalizedKnowledgeEntry[] {
  return knowledgeCatalog.entries.filter(
    (entry) => entry.category === "case-study",
  );
}

export function sectors(): LocalizedKnowledgeEntry[] {
  return knowledgeCatalog.entries.filter(
    (entry) => entry.category === "sector",
  );
}

export function slugFromPath(path: string, hub: string): string | null {
  const prefix = `${hub}/`;
  if (!path.startsWith(prefix)) return null;

  const slug = path.slice(prefix.length);
  return slug && !slug.includes("/") ? slug : null;
}

export function getServiceBySlug(
  slug: string,
): LocalizedKnowledgeEntry | undefined {
  return operationalServices().find(
    (entry) => slugFromPath(canonicalPath(entry), SERVICES_HUB_PATH) === slug,
  );
}

export function getCaseBySlug(
  slug: string,
): LocalizedKnowledgeEntry | undefined {
  return caseStudies().find(
    (entry) => slugFromPath(canonicalPath(entry), CASES_HUB_PATH) === slug,
  );
}

export function relatedEntries(
  entry: LocalizedKnowledgeEntry,
): LocalizedKnowledgeEntry[] {
  return entry.relatedIds
    .map((id) => getKnowledgeEntry(id))
    .filter((related): related is LocalizedKnowledgeEntry => Boolean(related));
}

export function indexableCatalogPaths(): string[] {
  const paths = new Set<string>([SERVICES_HUB_PATH, CASES_HUB_PATH]);

  for (const entry of knowledgeCatalog.entries) {
    if (INDEXABLE_CATEGORIES.has(entry.category)) {
      paths.add(canonicalPath(entry));
    }
  }

  return [...paths];
}

export const EXTRA_SITEMAP_PATHS = [
  "/",
  "/for-agents",
  "/llms.txt",
  "/llms-it.txt",
  "/studio",
  "/programmatore-freelance",
  "/blog",
] as const;

export function agentNavigationPaths(): string[] {
  const extras = [
    "/",
    "/for-agents",
    "/progetti",
    "/studio",
    "/blog",
    "/programmatore-freelance",
    "/linktree",
    SERVICES_HUB_PATH,
    CASES_HUB_PATH,
  ];

  return [...new Set([...extras, ...indexableCatalogPaths()])].sort();
}

export function getEntryByCanonicalPath(
  path: string,
): LocalizedKnowledgeEntry | undefined {
  const normalized = path.replace(/\/+$/, "") || "/";

  return knowledgeCatalog.entries.find(
    (entry) =>
      INDEXABLE_CATEGORIES.has(entry.category) &&
      canonicalPath(entry) === normalized,
  );
}
