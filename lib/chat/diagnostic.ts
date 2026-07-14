import { z } from "zod";

const shortText = z.string().trim().min(1).max(240);
const longText = z.string().trim().min(1).max(2_000);
const listItem = z.string().trim().min(1).max(800);
const nonEmptyList = z.array(listItem).min(1).max(20);

export const NeedCategorySchema = z.enum([
  "document_erp",
  "workflow",
  "ticketing",
  "dataset_benchmark",
  "ai_optimization",
  "company_wiki",
  "ai_presence",
]);

export type NeedCategory = z.infer<typeof NeedCategorySchema>;

export const DiagnosticSummarySchema = z
  .object({
    clientName: z.string().trim().min(1).max(120),
    clientEmail: z.string().trim().email().max(254),
    clientCompany: z.string().trim().min(1).max(160).optional(),
    sector: z.string().trim().min(1).max(160),
    process: shortText,
    currentWorkflow: longText,
    bottlenecks: nonEmptyList,
    currentSystems: nonEmptyList,
    volumesAndFrequency: z.string().trim().min(1).max(1_000),
    baselineMetrics: nonEmptyList,
    dataAvailable: nonEmptyList,
    constraints: nonEmptyList,
    desiredOutcomes: nonEmptyList,
    needCategories: z.array(NeedCategorySchema).min(1).max(7),
    opportunities: nonEmptyList,
    recommendations: nonEmptyList,
    openQuestions: z.array(listItem).max(20),
    nextSteps: nonEmptyList,
    language: z.enum(["it", "en"]),
    honeypot: z.string().max(0).optional(),
  })
  .strict();

export type DiagnosticSummary = z.infer<typeof DiagnosticSummarySchema>;
export type DiagnosticSummaryInput = z.input<typeof DiagnosticSummarySchema>;

export function safeParseDiagnosticSummary(input: unknown) {
  return DiagnosticSummarySchema.safeParse(input);
}

const completenessFields = {
  clientName: DiagnosticSummarySchema.shape.clientName,
  clientEmail: DiagnosticSummarySchema.shape.clientEmail,
  sector: DiagnosticSummarySchema.shape.sector,
  process: DiagnosticSummarySchema.shape.process,
  currentWorkflow: DiagnosticSummarySchema.shape.currentWorkflow,
  bottlenecks: DiagnosticSummarySchema.shape.bottlenecks,
  currentSystems: DiagnosticSummarySchema.shape.currentSystems,
  volumesAndFrequency: DiagnosticSummarySchema.shape.volumesAndFrequency,
  baselineMetrics: DiagnosticSummarySchema.shape.baselineMetrics,
  dataAvailable: DiagnosticSummarySchema.shape.dataAvailable,
  constraints: DiagnosticSummarySchema.shape.constraints,
  desiredOutcomes: DiagnosticSummarySchema.shape.desiredOutcomes,
  needCategories: DiagnosticSummarySchema.shape.needCategories,
  opportunities: DiagnosticSummarySchema.shape.opportunities,
  recommendations: DiagnosticSummarySchema.shape.recommendations,
  openQuestions: DiagnosticSummarySchema.shape.openQuestions,
  nextSteps: DiagnosticSummarySchema.shape.nextSteps,
  language: DiagnosticSummarySchema.shape.language,
} as const;

export type DiagnosticRequiredField = keyof typeof completenessFields;

export type DiagnosticCompleteness = {
  missingFields: DiagnosticRequiredField[];
  score: number;
};

export function checkDiagnosticCompleteness(
  input: unknown,
): DiagnosticCompleteness {
  const candidate =
    typeof input === "object" && input !== null
      ? (input as Record<string, unknown>)
      : {};

  const missingFields = (
    Object.entries(completenessFields) as Array<
      [DiagnosticRequiredField, z.ZodType]
    >
  )
    .filter(([field, schema]) => !schema.safeParse(candidate[field]).success)
    .map(([field]) => field);

  const totalFields = Object.keys(completenessFields).length;
  const score = Math.round(
    ((totalFields - missingFields.length) / totalFields) * 100,
  );

  return { missingFields, score };
}
