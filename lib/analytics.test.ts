import { afterEach, describe, expect, it, vi } from "vitest";

import { currentLandingPath, trackFormEvent } from "./analytics";

describe("form analytics", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("falls back to / when window is unavailable", () => {
    expect(currentLandingPath()).toBe("/");
  });

  it("pushes form_start and form_submit with the landing path", () => {
    const dataLayer: Array<Record<string, unknown>> = [];
    const gtag = vi.fn();
    vi.stubGlobal("window", {
      dataLayer,
      gtag,
      location: { pathname: "/manifattura", search: "" },
    });

    expect(currentLandingPath()).toBe("/manifattura");
    trackFormEvent("form_start", "/manifattura");
    trackFormEvent("form_submit", "/");

    expect(dataLayer).toEqual([
      { event: "form_start", landing: "/manifattura" },
      { event: "form_submit", landing: "/" },
    ]);
    expect(gtag).toHaveBeenCalledWith("event", "form_start", {
      landing: "/manifattura",
    });
    expect(gtag).toHaveBeenCalledWith("event", "form_submit", {
      landing: "/",
    });
  });
});
