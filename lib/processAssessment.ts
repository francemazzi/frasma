import { z } from "zod";

// `.optional()` is the outermost schema so the key is optional in the inferred
// type (Zod 4 makes it required when a transform follows `.optional()`).
// Runtime is unchanged: undefined short-circuits, "" becomes undefined.
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => value || undefined)
    .optional();

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

// Captured on the client by lib/attribution.ts and sent with every brief so
// the lead carries its acquisition channel (see lib/leads/channel.ts).
export const LeadAttributionSchema = z.object({
  // A site path only, never a full URL; "" becomes undefined like the rest.
  landingPath: z
    .string()
    .trim()
    .max(200)
    .regex(/^(\/[^\s]*)?$/)
    .transform((value) => value || undefined)
    .optional(),
  utmSource: optionalText(100),
  utmMedium: optionalText(100),
  utmCampaign: optionalText(100),
  utmContent: optionalText(100),
});

export type LeadAttribution = z.infer<typeof LeadAttributionSchema>;

export const ProcessAssessmentSchema = ProjectBriefFieldsSchema.extend({
  conversationId: optionalText(36),
  lang: z.enum(["it", "en"]).optional(),
  honeypot: z.string().max(0).optional(),
  ...LeadAttributionSchema.shape,
}).strict();

export type ProcessAssessment = z.infer<typeof ProcessAssessmentSchema>;
