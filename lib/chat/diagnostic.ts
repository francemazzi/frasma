import { z } from "zod";

const shortText = z.string().trim().min(1).max(240);
const longText = z.string().trim().min(1).max(2_000);
const listItem = z.string().trim().min(1).max(800);
const nonEmptyList = z.array(listItem).min(1).max(20);

export const NeedCategorySchema = z
  .enum([
    "document_erp",
    "workflow",
    "ticketing",
    "dataset_benchmark",
    "ai_optimization",
    "company_wiki",
    "ai_presence",
  ])
  .describe(
    "Frasma need category: document_erp, workflow, ticketing, dataset_benchmark, ai_optimization, company_wiki, or ai_presence.",
  );

export type NeedCategory = z.infer<typeof NeedCategorySchema>;

export const DiagnosticSummarySchema = z
  .object({
    clientName: z
      .string()
      .trim()
      .min(1)
      .max(120)
      .describe("Client full name."),
    clientEmail: z
      .string()
      .trim()
      .email()
      .max(254)
      .describe("Client work email."),
    clientCompany: z
      .string()
      .trim()
      .min(1)
      .max(160)
      .optional()
      .describe("Client company name, if known."),
    sector: z
      .string()
      .trim()
      .min(1)
      .max(160)
      .describe("Business sector, e.g. manufacturing or food quality."),
    process: shortText.describe(
      "Short name of the process under diagnosis, e.g. delivery notes into ERP.",
    ),
    currentWorkflow: longText.describe(
      "How the process is done today, including people, tools, and handoffs.",
    ),
    bottlenecks: nonEmptyList.describe(
      "Observed bottlenecks, one item per string.",
    ),
    currentSystems: nonEmptyList.describe(
      "Systems already in use, e.g. email, PDF, Mago Zucchetti.",
    ),
    volumesAndFrequency: z
      .string()
      .trim()
      .min(1)
      .max(1_000)
      .describe("Volumes and frequency, e.g. about 40 DDT per day."),
    baselineMetrics: nonEmptyList.describe(
      "Baseline metrics before any Frasma work, e.g. minutes per document.",
    ),
    dataAvailable: nonEmptyList.describe(
      "Data that can be shared for a prototype, preferably anonymized samples.",
    ),
    constraints: nonEmptyList.describe(
      "Hard constraints, e.g. human validation before ERP import.",
    ),
    desiredOutcomes: nonEmptyList.describe(
      "Desired outcomes without invented savings or guarantees.",
    ),
    needCategories: z
      .array(NeedCategorySchema)
      .min(1)
      .max(7)
      .describe("One or more Frasma need categories that fit the diagnosis."),
    opportunities: nonEmptyList.describe(
      "Concrete opportunities that follow from the evidence.",
    ),
    recommendations: nonEmptyList.describe(
      "Recommended next steps for a limited prototype or discovery.",
    ),
    openQuestions: z
      .array(listItem)
      .max(20)
      .describe("Open questions still to confirm with the client."),
    nextSteps: nonEmptyList.describe(
      "Agreed next steps after reviewing this summary.",
    ),
    language: z
      .enum(["it", "en"])
      .describe("Language of the diagnostic summary: it or en."),
    honeypot: z
      .string()
      .max(0)
      .optional()
      .describe("Anti-spam trap. Must be empty or omitted."),
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
