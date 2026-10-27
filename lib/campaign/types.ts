import { z } from "zod";
import { LocalizedTextSchema } from "../knowledge/types";

export const CampaignEvidenceSchema = z
  .object({
    label: LocalizedTextSchema,
    href: z.string().min(1),
  })
  .strict();

/**
 * Commercial proof for a campaign landing. Figures are optional on purpose: the
 * site promises nothing without a measured baseline, so any number must carry a
 * `sourceNote` saying where it was measured.
 */
export const CampaignProofSchema = z
  .object({
    sector: LocalizedTextSchema,
    erp: LocalizedTextSchema,
    docsPerMonth: z.number().int().positive().optional(),
    timeBefore: LocalizedTextSchema.optional(),
    timeAfter: LocalizedTextSchema.optional(),
    before: LocalizedTextSchema,
    after: LocalizedTextSchema,
    result: LocalizedTextSchema,
    measuredOver: LocalizedTextSchema.optional(),
    sourceNote: LocalizedTextSchema.optional(),
    evidence: z.array(CampaignEvidenceSchema).min(1),
  })
  .strict()
  .superRefine((proof, ctx) => {
    if (proofHasFigures(proof) && !proof.sourceNote) {
      ctx.addIssue({
        code: "custom",
        path: ["sourceNote"],
        message: "sourceNote is required when the proof carries figures",
      });
    }
  });
export type CampaignProof = z.infer<typeof CampaignProofSchema>;

export function proofHasFigures(
  proof: Pick<CampaignProof, "docsPerMonth" | "timeBefore" | "timeAfter">,
): boolean {
  return (
    proof.docsPerMonth !== undefined ||
    proof.timeBefore !== undefined ||
    proof.timeAfter !== undefined
  );
}

export const CampaignStepSchema = z
  .object({
    title: LocalizedTextSchema,
    body: LocalizedTextSchema,
    timing: LocalizedTextSchema.optional(),
  })
  .strict();
export type CampaignStep = z.infer<typeof CampaignStepSchema>;

export const CampaignLandingSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    entryId: z.string().min(1),
    path: z.string().startsWith("/"),
    hero: z
      .object({
        kicker: LocalizedTextSchema,
        results: z.array(LocalizedTextSchema).length(3),
        ctaPrimary: LocalizedTextSchema,
        ctaSecondary: LocalizedTextSchema,
        mockCaption: LocalizedTextSchema,
      })
      .strict(),
    video: z
      .object({
        youtubeId: z.string().regex(/^[A-Za-z0-9_-]{6,20}$/),
        title: LocalizedTextSchema,
        caption: LocalizedTextSchema,
      })
      .strict()
      .optional(),
    howItWorks: z.array(CampaignStepSchema).length(4),
    proof: CampaignProofSchema,
    nextSteps: z.array(CampaignStepSchema).length(4),
    quoteModel: z
      .object({
        title: LocalizedTextSchema,
        bullets: z.array(LocalizedTextSchema).min(2),
      })
      .strict(),
    needs: z
      .object({
        title: LocalizedTextSchema,
        items: z.array(LocalizedTextSchema).min(3),
      })
      .strict(),
    form: z
      .object({
        title: LocalizedTextSchema,
        intro: LocalizedTextSchema,
        systemsPlaceholder: LocalizedTextSchema,
        volumePlaceholder: LocalizedTextSchema,
        processPlaceholder: LocalizedTextSchema,
        assurance: LocalizedTextSchema,
      })
      .strict(),
  })
  .strict();
export type CampaignLanding = z.infer<typeof CampaignLandingSchema>;
