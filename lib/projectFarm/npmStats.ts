import { getMetricLiveValue } from "./projectFarmData";
import type { Metric, Project, TrendType } from "./types";

export type NpmDailyDownload = {
  day: string;
  downloads: number;
};

export type NpmPackageStats = {
  weeklyDownloads: number;
  dailyDownloads: NpmDailyDownload[];
};

export type NpmStatsMap = Record<string, NpmPackageStats>;

export type NpmStatsResponse = {
  ok: true;
  packages: NpmStatsMap;
};

type NpmPointResponse = {
  downloads: number;
  package: string;
};

type NpmRangeResponse = {
  downloads: NpmDailyDownload[];
  package: string;
};

const NPM_DOWNLOADS_BASE = "https://api.npmjs.org/downloads";

export function normalizeSparklineFromDownloads(
  dailyDownloads: NpmDailyDownload[]
): number[] {
  if (dailyDownloads.length === 0) {
    return [0];
  }

  const values = dailyDownloads.map((entry) => entry.downloads);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;

  return values.map((value) => (value - min) / span);
}

export function trendFromDailyDownloads(
  dailyDownloads: NpmDailyDownload[]
): TrendType {
  if (dailyDownloads.length < 2) {
    return "stable";
  }

  const midpoint = Math.floor(dailyDownloads.length / 2);
  const firstHalf = dailyDownloads.slice(0, midpoint);
  const secondHalf = dailyDownloads.slice(midpoint);

  const avg = (entries: NpmDailyDownload[]) =>
    entries.reduce((sum, entry) => sum + entry.downloads, 0) /
    Math.max(1, entries.length);

  const firstAvg = avg(firstHalf);
  const secondAvg = avg(secondHalf);
  const delta = secondAvg - firstAvg;
  const threshold = Math.max(1, firstAvg * 0.05);

  if (delta > threshold) return "up";
  if (delta < -threshold) return "flat";
  return "stable";
}

export function resolveMetricValue(
  project: Project,
  metric: Metric,
  npmStats?: NpmStatsMap | null
): number {
  if (
    metric.source === "npm" &&
    project.npmPackage &&
    npmStats?.[project.npmPackage]
  ) {
    return npmStats[project.npmPackage].weeklyDownloads;
  }

  return getMetricLiveValue(project, metric);
}

export function resolveMetricSparkline(
  project: Project,
  metric: Metric,
  npmStats?: NpmStatsMap | null
): number[] | null {
  if (
    metric.source === "npm" &&
    project.npmPackage &&
    npmStats?.[project.npmPackage]
  ) {
    return normalizeSparklineFromDownloads(
      npmStats[project.npmPackage].dailyDownloads
    );
  }

  return null;
}

export function resolveMetricTrend(
  project: Project,
  metric: Metric,
  npmStats?: NpmStatsMap | null
): TrendType {
  if (
    metric.source === "npm" &&
    project.npmPackage &&
    npmStats?.[project.npmPackage]
  ) {
    return trendFromDailyDownloads(
      npmStats[project.npmPackage].dailyDownloads
    );
  }

  return metric.trend;
}

export async function fetchNpmPackageStats(
  packageName: string,
  fetchImpl: typeof fetch = fetch
): Promise<NpmPackageStats | null> {
  try {
    const [pointRes, rangeRes] = await Promise.all([
      fetchImpl(`${NPM_DOWNLOADS_BASE}/point/last-week/${packageName}`),
      fetchImpl(`${NPM_DOWNLOADS_BASE}/range/last-week/${packageName}`),
    ]);

    if (!pointRes.ok || !rangeRes.ok) {
      return null;
    }

    const point = (await pointRes.json()) as NpmPointResponse;
    const range = (await rangeRes.json()) as NpmRangeResponse;

    return {
      weeklyDownloads: point.downloads ?? 0,
      dailyDownloads: Array.isArray(range.downloads) ? range.downloads : [],
    };
  } catch {
    return null;
  }
}

export async function fetchNpmStatsForPackages(
  packageNames: string[],
  fetchImpl: typeof fetch = fetch
): Promise<NpmStatsMap> {
  const unique = [...new Set(packageNames.filter(Boolean))];
  const entries = await Promise.all(
    unique.map(async (name) => {
      const stats = await fetchNpmPackageStats(name, fetchImpl);
      return stats ? ([name, stats] as const) : null;
    })
  );

  const packages: NpmStatsMap = {};
  for (const entry of entries) {
    if (entry) {
      packages[entry[0]] = entry[1];
    }
  }

  return packages;
}

export function getNpmPackageNames(projects: Project[]): string[] {
  return projects
    .map((project) => project.npmPackage)
    .filter((name): name is string => Boolean(name));
}
