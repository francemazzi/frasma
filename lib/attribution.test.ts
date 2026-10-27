import { describe, expect, it } from "vitest";
import {
  ATTRIBUTION_STORAGE_KEY,
  captureAttribution,
  parseAttribution,
  readAttribution,
} from "./attribution";

function createStorage(initial: Record<string, string> = {}): Storage {
  const items = new Map(Object.entries(initial));
  return {
    get length() {
      return items.size;
    },
    clear: () => items.clear(),
    getItem: (key: string) => items.get(key) ?? null,
    key: (index: number) => [...items.keys()][index] ?? null,
    removeItem: (key: string) => {
      items.delete(key);
    },
    setItem: (key: string, value: string) => {
      items.set(key, String(value));
    },
  };
}

function throwingStorage(): Storage {
  const fail = () => {
    throw new Error("storage disabled");
  };
  return { ...createStorage(), getItem: fail, setItem: fail };
}

const site = "https://www.frasma.org";

describe("parseAttribution", () => {
  it("captures the landing path and every utm parameter", () => {
    expect(
      parseAttribution(
        new URL(
          `${site}/ddt?utm_source=chatgpt&utm_medium=ads&utm_campaign=ddt-2026&utm_content=variant-a`,
        ),
      ),
    ).toEqual({
      landingPath: "/ddt",
      utmSource: "chatgpt",
      utmMedium: "ads",
      utmCampaign: "ddt-2026",
      utmContent: "variant-a",
    });
  });

  it("returns only the landing path without utm parameters", () => {
    expect(parseAttribution(new URL(`${site}/`))).toEqual({ landingPath: "/" });
  });

  it("ignores unrelated query parameters", () => {
    expect(
      parseAttribution(new URL(`${site}/ddt?ref=newsletter&gclid=abc`)),
    ).toEqual({ landingPath: "/ddt" });
  });

  it("trims values and drops empty ones", () => {
    expect(
      parseAttribution(
        new URL(`${site}/ddt?utm_source=%20chatgpt%20&utm_medium=%20`),
      ),
    ).toEqual({ landingPath: "/ddt", utmSource: "chatgpt" });
  });

  it("caps utm values at 100 characters and paths at 200", () => {
    const parsed = parseAttribution(
      new URL(`${site}/${"p".repeat(300)}?utm_campaign=${"x".repeat(150)}`),
    );
    expect(parsed.utmCampaign).toBe("x".repeat(100));
    expect(parsed.landingPath).toBe(`/${"p".repeat(199)}`);
  });
});

describe("captureAttribution", () => {
  it("stores the first landing with its utm set", () => {
    const storage = createStorage();
    const result = captureAttribution(
      storage,
      new URL(`${site}/ddt?utm_source=chatgpt&utm_campaign=ddt-2026`),
    );

    expect(result).toEqual({
      landingPath: "/ddt",
      utmSource: "chatgpt",
      utmCampaign: "ddt-2026",
    });
    expect(
      JSON.parse(storage.getItem(ATTRIBUTION_STORAGE_KEY) ?? "null"),
    ).toEqual(result);
  });

  it("stores a plain landing path when the first visit has no utm", () => {
    const storage = createStorage();
    expect(captureAttribution(storage, new URL(`${site}/blog/post`))).toEqual({
      landingPath: "/blog/post",
    });
    expect(readAttribution(storage)).toEqual({ landingPath: "/blog/post" });
  });

  it("keeps the stored attribution when the current url has no utm", () => {
    const storage = createStorage();
    captureAttribution(storage, new URL(`${site}/ddt?utm_source=chatgpt`));

    const result = captureAttribution(storage, new URL(`${site}/contatti`));

    expect(result).toEqual({ landingPath: "/ddt", utmSource: "chatgpt" });
    expect(readAttribution(storage)).toEqual(result);
  });

  it("overwrites the utm set and landing path on a new utm visit", () => {
    const storage = createStorage();
    captureAttribution(
      storage,
      new URL(`${site}/ddt?utm_source=chatgpt&utm_content=variant-a`),
    );

    const result = captureAttribution(
      storage,
      new URL(`${site}/manifattura?utm_source=linkedin&utm_medium=paid_social`),
    );

    expect(result).toEqual({
      landingPath: "/manifattura",
      utmSource: "linkedin",
      utmMedium: "paid_social",
    });
    expect(result).not.toHaveProperty("utmContent");
    expect(readAttribution(storage)).toEqual(result);
  });

  it("returns undefined when storage throws", () => {
    expect(
      captureAttribution(
        throwingStorage(),
        new URL(`${site}/ddt?utm_source=chatgpt`),
      ),
    ).toBeUndefined();
    expect(readAttribution(throwingStorage())).toBeUndefined();
  });

  it("is a no-op without a window", () => {
    expect(typeof window).toBe("undefined");
    expect(captureAttribution()).toBeUndefined();
    expect(readAttribution()).toBeUndefined();
  });
});

describe("readAttribution", () => {
  it("returns undefined when nothing is stored", () => {
    expect(readAttribution(createStorage())).toBeUndefined();
  });

  it("keeps only known string fields", () => {
    const storage = createStorage({
      [ATTRIBUTION_STORAGE_KEY]: JSON.stringify({
        landingPath: "/ddt",
        utmSource: 42,
        utmCampaign: " spring ",
        budget: "10k",
      }),
    });
    expect(readAttribution(storage)).toEqual({
      landingPath: "/ddt",
      utmCampaign: "spring",
    });
  });

  it("returns undefined for malformed or empty values", () => {
    expect(
      readAttribution(createStorage({ [ATTRIBUTION_STORAGE_KEY]: "{oops" })),
    ).toBeUndefined();
    expect(
      readAttribution(createStorage({ [ATTRIBUTION_STORAGE_KEY]: "[1]" })),
    ).toBeUndefined();
    expect(
      readAttribution(createStorage({ [ATTRIBUTION_STORAGE_KEY]: "{}" })),
    ).toBeUndefined();
  });
});
