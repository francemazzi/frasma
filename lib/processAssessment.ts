import { z } from "zod";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value || undefined);

export const LeadSourceSchema = z.enum(["form", "chat"]);

export type LeadSource = z.infer<typeof LeadSourceSchema>;

export const ProjectBriefToolSchema = z.object({
  name: z.string().trim().min(1).max(120),
  clientEmail: z.string().trim().email().max(254),
  company: z.string().trim().max(120).optional(),
  role: z.string().trim().max(120).optional(),
  process: z.string().trim().min(20).max(2000),
  systems: z.string().trim().max(500).optional(),
  volume: z.string().trim().max(500).optional(),
});

export const ProjectBriefFieldsSchema = z.object({
  name: z.string().trim().min(1).max(120),
  clientEmail: z.string().trim().email().max(254),
  company: optionalText(120),
  role: optionalText(120),
  process: z.string().trim().min(20).max(2000),
  systems: optionalText(500),
  volume: optionalText(500),
});

export type ProjectBriefFields = z.infer<typeof ProjectBriefFieldsSchema>;

export const ProcessAssessmentSchema = ProjectBriefFieldsSchema.extend({
  conversationId: optionalText(36),
  lang: z.enum(["it", "en"]).optional(),
  honeypot: z.string().max(0).optional(),
}).strict();

export type ProcessAssessment = z.infer<typeof ProcessAssessmentSchema>;
