import { describe, expect, it } from "vitest";
import { DDT_SERVICE_ID } from "../knowledge/erp-examples";
import { canonicalPath, getKnowledgeEntry } from "../knowledge/paths";
import {
  campaignLandingFor,
  CampaignProofSchema,
  DDT_LANDING,
  proofHasFigures,
} from "./index";

const MONEY_OR_PERCENT = /€|\beur\b|\d+\s*%/i;

describe("DDT campaign landing", () => {
  it("is registered on the DDT service and shares its canonical path", () => {
    const landing = campaignLandingFor(DDT_SERVICE_ID);
    expect(landing?.id).toBe("ddt-erp");
    expect(landing?.path).toBe(canonicalPath(getKnowledgeEntry(DDT_SERVICE_ID)!));
    expect(campaignLandingFor("unknown-entry")).toBeUndefined();
  });

  it("never prints prices or percentages in commercial copy", () => {
    const copy = [
      ...DDT_LANDING.quoteModel.bullets,
      ...DDT_LANDING.nextSteps.map((step) => step.body),
      ...DDT_LANDING.needs.items,
      DDT_LANDING.form.intro,
      DDT_LANDING.proof.result,
    ];
    for (const item of copy) {
      expect(item.it).not.toMatch(MONEY_OR_PERCENT);
      expect(item.en).not.toMatch(MONEY_OR_PERCENT);
    }
  });

  it("ships a qualitative proof and refuses figures without a source note", () => {
    expect(proofHasFigures(DDT_LANDING.proof)).toBe(false);

    const withFigures = CampaignProofSchema.safeParse({
      ...DDT_LANDING.proof,
      docsPerMonth: 300,
    });
    expect(withFigures.success).toBe(false);

    const sourced = CampaignProofSchema.safeParse({
      ...DDT_LANDING.proof,
      docsPerMonth: 300,
      sourceNote: { it: "Misura interna", en: "Internal measure" },
    });
    expect(sourced.success).toBe(true);
  });

  it("keeps the public evidence links on the site or on the tutorial", () => {
    for (const evidence of DDT_LANDING.proof.evidence) {
      expect(evidence.href).toMatch(/^(\/|https:\/\/youtu\.be\/)/);
    }
  });
});
