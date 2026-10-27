import { DDT_LANDING } from "./ddt-erp";
import type { CampaignLanding } from "./types";

const CAMPAIGN_LANDINGS: readonly CampaignLanding[] = [DDT_LANDING];

/** Returns the campaign landing bound to a knowledge entry, if any. */
export function campaignLandingFor(
  entryId: string,
): CampaignLanding | undefined {
  return CAMPAIGN_LANDINGS.find((landing) => landing.entryId === entryId);
}

export function campaignLandings(): readonly CampaignLanding[] {
  return CAMPAIGN_LANDINGS;
}

export { DDT_LANDING } from "./ddt-erp";
export {
  CampaignLandingSchema,
  CampaignProofSchema,
  CampaignStepSchema,
  proofHasFigures,
} from "./types";
export type { CampaignLanding, CampaignProof, CampaignStep } from "./types";
