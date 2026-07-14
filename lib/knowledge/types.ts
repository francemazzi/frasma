import { z } from "zod";

export const LocaleSchema = z.enum(["it", "en"]);
export type Locale = z.infer<typeof LocaleSchema>;

export const LocalizedTextSchema = z
  .object({
    it: z.string().min(1),
    en: z.string().min(1),
  })
  .strict();
export type LocalizedText = z.infer<typeof LocalizedTextSchema>;

export const KnowledgeCategorySchema = z.enum([
  "profile",
  "service",
  "case-study",
  "sector",
  "methodology",
  "fit",
  "commercial-limit",
]);
export type KnowledgeCategory = z.infer<typeof KnowledgeCategorySchema>;

export const LocalizedKnowledgeEntrySchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    category: KnowledgeCategorySchema,
    title: LocalizedTextSchema,
    summary: LocalizedTextSchema,
    details: z.array(LocalizedTextSchema).min(1),
    keywords: z
      .object({
        it: z.array(z.string().min(1)).min(1),
        en: z.array(z.string().min(1)).min(1),
      })
      .strict(),
    pagePaths: z.array(z.string().startsWith("/")).default([]),
    relatedIds: z.array(z.string()).default([]),
  })
  .strict();
export type LocalizedKnowledgeEntry = z.infer<
  typeof LocalizedKnowledgeEntrySchema
>;

export const FrasmaProfileSourceSchema = z
  .object({
    name: z.literal("Frasma"),
    founder: z.literal("Francesco Saverio Mazzi"),
    location: z.literal("Mantova, Italy"),
    languages: z.tuple([z.literal("it"), z.literal("en")]),
    kind: LocalizedTextSchema,
    description: LocalizedTextSchema,
    focus: z.array(LocalizedTextSchema).min(1),
    sectors: z.array(z.string()).min(1),
    commercialLimits: z.array(LocalizedTextSchema).min(1),
  })
  .strict();
export type FrasmaProfileSource = z.infer<typeof FrasmaProfileSourceSchema>;

export const DiagnosticStepSourceSchema = z
  .object({
    id: z.string().min(1),
    title: LocalizedTextSchema,
    description: LocalizedTextSchema,
    evidence: z.array(LocalizedTextSchema).min(1),
  })
  .strict();

export const DiagnosticFrameworkSourceSchema = z
  .object({
    title: LocalizedTextSchema,
    introduction: LocalizedTextSchema,
    steps: z.array(DiagnosticStepSourceSchema).min(3),
    fitCriteria: z.array(LocalizedTextSchema).min(1),
    poorFitCriteria: z.array(LocalizedTextSchema).min(1),
    commercialLimits: z.array(LocalizedTextSchema).min(1),
  })
  .strict();
export type DiagnosticFrameworkSource = z.infer<
  typeof DiagnosticFrameworkSourceSchema
>;

export const KnowledgeCatalogSchema = z
  .object({
    profile: FrasmaProfileSourceSchema,
    diagnostic: DiagnosticFrameworkSourceSchema,
    entries: z.array(LocalizedKnowledgeEntrySchema).min(1),
  })
  .strict()
  .superRefine((catalog, context) => {
    const ids = new Set<string>();

    for (const entry of catalog.entries) {
      if (ids.has(entry.id)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate knowledge entry id: ${entry.id}`,
          path: ["entries"],
        });
      }
      ids.add(entry.id);
    }

    for (const [index, entry] of catalog.entries.entries()) {
      for (const relatedId of entry.relatedIds) {
        if (!ids.has(relatedId)) {
          context.addIssue({
            code: "custom",
            message: `Unknown related entry id: ${relatedId}`,
            path: ["entries", index, "relatedIds"],
          });
        }
      }
    }
  });
export type KnowledgeCatalog = z.infer<typeof KnowledgeCatalogSchema>;

export const FrasmaProfileSchema = z
  .object({
    name: z.literal("Frasma"),
    founder: z.literal("Francesco Saverio Mazzi"),
    location: z.literal("Mantova, Italy"),
    languages: z.tuple([z.literal("it"), z.literal("en")]),
    kind: z.string(),
    description: z.string(),
    focus: z.array(z.string()),
    sectors: z.array(z.string()),
    commercialLimits: z.array(z.string()),
  })
  .strict();
export type FrasmaProfile = z.infer<typeof FrasmaProfileSchema>;

export const DiagnosticFrameworkSchema = z
  .object({
    title: z.string(),
    introduction: z.string(),
    steps: z.array(
      z
        .object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
          evidence: z.array(z.string()),
        })
        .strict(),
    ),
    fitCriteria: z.array(z.string()),
    poorFitCriteria: z.array(z.string()),
    commercialLimits: z.array(z.string()),
  })
  .strict();
export type DiagnosticFramework = z.infer<typeof DiagnosticFrameworkSchema>;

export const SearchKnowledgeInputSchema = z
  .object({
    query: z.string().trim().min(1),
    locale: LocaleSchema,
    pagePath: z.string().startsWith("/").optional(),
  })
  .strict();
export type SearchKnowledgeInput = z.input<typeof SearchKnowledgeInputSchema>;

export const SearchResultSchema = z
  .object({
    id: z.string(),
    category: KnowledgeCategorySchema,
    title: z.string(),
    summary: z.string(),
    details: z.array(z.string()),
    score: z.number().int().positive(),
  })
  .strict();
export type SearchResult = z.infer<typeof SearchResultSchema>;
