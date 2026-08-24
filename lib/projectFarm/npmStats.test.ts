import { describe, expect, it } from "vitest";
import {
  fetchNpmStatsForPackages,
  normalizeSparklineFromDownloads,
  resolveMetricValue,
  trendFromDailyDownloads,
  type NpmDailyDownload,
} from "./npmStats";
import type { Metric, Project } from "./types";

const sampleDaily: NpmDailyDownload[] = [
  { day: "2026-07-07", downloads: 10 },
  { day: "2026-07-08", downloads: 20 },
  { day: "2026-07-09", downloads: 30 },
  { day: "2026-07-10", downloads: 40 },
];

const npmProject: Project = {
  id: "worldsim",
  name: "worldsim",
  ticker: "WLD",
  npmPackage: "worldsim",
  tagline: "test",
  status: "In crescita",
  sector: "Open Source",
  icon: "🌍",
  sortOrder: 5,
  team: [],
  metrics: [],
};

const npmMetric: Metric = {
  key: "weeklyDownloads",
  label: "Download npm (7gg)",
  baseValue: 238,
  unit: "",
  trend: "up",
  dailyDeltaRange: [0, 0],
  source: "npm",
};

describe("normalizeSparklineFromDownloads", () => {
  it("normalizes daily downloads to 0–1 range", () => {
    expect(normalizeSparklineFromDownloads(sampleDaily)).toEqual([
      0, 1 / 3, 2 / 3, 1,
    ]);
  });

  it("returns [0] for empty input", () => {
    expect(normalizeSparklineFromDownloads([])).toEqual([0]);
  });

  it("returns flat line when all values are equal", () => {
    const flat = [
      { day: "2026-07-07", downloads: 5 },
      { day: "2026-07-08", downloads: 5 },
    ];
    expect(normalizeSparklineFromDownloads(flat)).toEqual([0, 0]);
  });
});

describe("trendFromDailyDownloads", () => {
  it("detects upward trend", () => {
    expect(trendFromDailyDownloads(sampleDaily)).toBe("up");
  });

  it("detects stable trend", () => {
    const stable: NpmDailyDownload[] = [
      { day: "2026-07-07", downloads: 10 },
      { day: "2026-07-08", downloads: 10 },
      { day: "2026-07-09", downloads: 10 },
      { day: "2026-07-10", downloads: 10 },
    ];
    expect(trendFromDailyDownloads(stable)).toBe("stable");
  });

  it("detects downward trend as flat", () => {
    const down: NpmDailyDownload[] = [
      { day: "2026-07-07", downloads: 40 },
      { day: "2026-07-08", downloads: 30 },
      { day: "2026-07-09", downloads: 20 },
      { day: "2026-07-10", downloads: 10 },
    ];
    expect(trendFromDailyDownloads(down)).toBe("flat");
  });
});

describe("resolveMetricValue", () => {
  it("uses live npm weekly downloads when available", () => {
    const value = resolveMetricValue(npmProject, npmMetric, {
      worldsim: {
        weeklyDownloads: 312,
        dailyDownloads: sampleDaily,
      },
    });
    expect(value).toBe(312);
  });

  it("falls back to baseValue when npm stats are missing", () => {
    expect(resolveMetricValue(npmProject, npmMetric, null)).toBe(238);
  });

  it("falls back to baseValue when package is absent from stats map", () => {
    expect(resolveMetricValue(npmProject, npmMetric, {})).toBe(238);
  });
});

describe("fetchNpmStatsForPackages", () => {
  it("parses point and range responses from mocked fetch", async () => {
    const fetchImpl = async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/point/")) {
        return new Response(
          JSON.stringify({
            downloads: 100,
            start: "2026-07-07",
            end: "2026-07-13",
            package: "worldsim",
          }),
          { status: 200 },
        );
      }
      if (url.includes("/range/")) {
        return new Response(
          JSON.stringify({
            downloads: sampleDaily,
            start: "2026-07-07",
            end: "2026-07-10",
            package: "worldsim",
          }),
          { status: 200 },
        );
      }
      return new Response("not found", { status: 404 });
    };

    const packages = await fetchNpmStatsForPackages(["worldsim"], fetchImpl);
    expect(packages.worldsim.weeklyDownloads).toBe(100);
    expect(packages.worldsim.dailyDownloads).toHaveLength(4);
  });

  it("omits packages when fetch fails", async () => {
    const fetchImpl = async () => new Response("error", { status: 500 });
    const packages = await fetchNpmStatsForPackages(["worldsim"], fetchImpl);
    expect(packages).toEqual({});
  });
});
