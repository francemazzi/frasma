import { z } from "zod";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value || undefined);

export const ProcessAssessmentSchema = z
  .object({
    clientEmail: z.string().trim().email().max(254),
    company: optionalText(120),
    role: optionalText(120),
    process: z.string().trim().min(20).max(2000),
    systems: optionalText(500),
    volume: optionalText(500),
    honeypot: z.string().max(0).optional(),
  })
  .strict();

export type ProcessAssessment = z.infer<typeof ProcessAssessmentSchema>;
