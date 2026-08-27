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
  name: z
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
  company: z
    .string()
    .trim()
    .max(120)
    .optional()
    .describe("Client company name, if known."),
  role: z
    .string()
    .trim()
    .max(120)
    .optional()
    .describe("Client role, if known."),
  process: z
    .string()
    .trim()
    .min(20)
    .max(2000)
    .describe(
      "Process to evaluate, at least 20 characters: trigger, work today, and desired outcome.",
    ),
  systems: z
    .string()
    .trim()
    .max(500)
    .optional()
    .describe("Systems already in use, e.g. Outlook and ERP."),
  volume: z
    .string()
    .trim()
    .max(500)
    .optional()
    .describe("Volumes or frequency, e.g. 80 documents per week."),
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
  landing: optionalText(200),
  honeypot: z.string().max(0).optional(),
}).strict();

export type ProcessAssessment = z.infer<typeof ProcessAssessmentSchema>;
