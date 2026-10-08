import { describe, expect, it } from "vitest";
import {
  INTEGRATION_LOGOS,
  hasForbiddenIntegrationLogo,
  integrationLogoIds,
} from "./logos";

describe("INTEGRATION_LOGOS", () => {
  it("includes Arca, Gesco, AutoCAD, and Inventor", () => {
    const ids = integrationLogoIds();

    expect(ids).toContain("arca");
    expect(ids).toContain("gesco");
    expect(ids).toContain("autocad");
    expect(ids).toContain("inventor");
  });

  it("does not include Bitlam or fullWORK", () => {
    expect(hasForbiddenIntegrationLogo()).toBe(false);
    expect(integrationLogoIds()).not.toContain("bitlam");
    expect(integrationLogoIds()).not.toContain("fullwork");
    expect(
      INTEGRATION_LOGOS.some((logo) => /bitlam|fullwork|btram/i.test(logo.name)),
    ).toBe(false);
  });

  it("gives Gesco a typographic wordmark instead of an image", () => {
    const gesco = INTEGRATION_LOGOS.find((logo) => logo.id === "gesco");

    expect(gesco).toBeDefined();
    expect(gesco?.src).toBeUndefined();
    expect(gesco?.name).toBe("Gesco");
  });
});
