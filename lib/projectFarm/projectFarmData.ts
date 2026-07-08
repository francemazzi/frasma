import { PROJECTS } from "./projects";
import type { Metric, Project, TrendType } from "./types";

const EPOCH = new Date("2025-01-01T00:00:00.000Z");

export function getTodaySeed(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return hash >>> 0;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function daysSinceEpoch(date: Date): number {
  const ms = date.getTime() - EPOCH.getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

function parseDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function biasedDelta(
  rawDelta: number,
  trend: TrendType,
  range: [number, number]
): number {
  const [min, max] = range;
  const span = max - min;

  switch (trend) {
    case "up":
      return Math.round(rawDelta + span * 0.15);
    case "stable":
      return Math.round(rawDelta);
    case "starting":
      return rawDelta > span * 0.7 ? 1 : 0;
    case "flat":
    default:
      return 0;
  }
}

export function getDailyDelta(
  projectId: string,
  metricKey: string,
  date: Date,
  trend: TrendType,
  dailyDeltaRange: [number, number]
): number {
  const dateKey = date.toISOString().slice(0, 10);
  const seed = hashString(`${projectId}:${metricKey}:${dateKey}`);
  const [min, max] = dailyDeltaRange;
  const raw = min + seededRandom(seed) * (max - min);
  return biasedDelta(raw, trend, dailyDeltaRange);
}

export function getLiveMetricValue(
  baseValue: number,
  projectId: string,
  metricKey: string,
  dailyDeltaRange: [number, number],
  trend: TrendType,
  referenceDate: Date = new Date()
): number {
  if (trend === "flat") {
    return Math.max(0, baseValue);
  }

  const totalDays = daysSinceEpoch(referenceDate);
  let value = baseValue;

  for (let day = 0; day <= totalDays; day += 1) {
    const date = new Date(EPOCH.getTime() + day * 24 * 60 * 60 * 1000);
    const delta = getDailyDelta(
      projectId,
      metricKey,
      date,
      trend,
      dailyDeltaRange
    );
    value += delta;
  }

  return Math.max(0, Math.round(value));
}

export function generateSparkline(
  projectId: string,
  metricKey: string,
  baseValue: number,
  range: [number, number],
  trend: TrendType,
  days = 14,
  referenceDate: Date = new Date()
): number[] {
  const endDay = daysSinceEpoch(referenceDate);
  const startDay = Math.max(0, endDay - days + 1);
  const points: number[] = [];

  for (let day = startDay; day <= endDay; day += 1) {
    const date = new Date(EPOCH.getTime() + day * 24 * 60 * 60 * 1000);
    const value = getLiveMetricValue(
      baseValue,
      projectId,
      metricKey,
      range,
      trend,
      date
    );
    points.push(value);
  }

  if (points.length === 0) {
    return [baseValue];
  }

  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;

  return points.map((value) => (value - min) / span);
}

export function getMetricLiveValue(
  project: Project,
  metric: Metric,
  referenceDate: Date = new Date()
): number {
  return getLiveMetricValue(
    metric.baseValue,
    project.id,
    metric.key,
    metric.dailyDeltaRange,
    metric.trend,
    referenceDate
  );
}

export function getUniqueTeamCount(projects: Project[] = PROJECTS): number {
  const names = new Set<string>();
  for (const project of projects) {
    for (const member of project.team) {
      names.add(member.name);
    }
  }
  return names.size;
}

export function getTractionSignals(
  projects: Project[] = PROJECTS,
  referenceDate: Date = new Date()
): number {
  let total = 0;

  for (const project of projects) {
    for (const metric of project.metrics) {
      const label = metric.label.toLowerCase();
      const isTraction =
        label.includes("utenti iscritti") ||
        label.includes("utenti attivi") ||
        label.includes("dosaggi");

      if (isTraction) {
        total += getMetricLiveValue(project, metric, referenceDate);
      }
    }
  }

  return total;
}

export function formatTodayDate(locale = "it-IT"): string {
  return new Date().toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function getTrendArrow(trend: TrendType): string {
  switch (trend) {
    case "up":
      return "↗";
    case "stable":
      return "→";
    case "starting":
      return "·";
    case "flat":
    default:
      return "—";
  }
}

export function parseReferenceDate(dateKey = getTodaySeed()): Date {
  return parseDateKey(dateKey);
}
