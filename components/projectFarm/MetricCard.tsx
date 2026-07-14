"use client";

import {
  generateSparkline,
  getTrendArrow,
  getTrendColorClass,
  getTrendStrokeClass,
} from "../../lib/projectFarm/projectFarmData";
import {
  resolveMetricSparkline,
  resolveMetricTrend,
  resolveMetricValue,
} from "../../lib/projectFarm/npmStats";
import type { Metric, Project } from "../../lib/projectFarm/types";
import { useNpmStats } from "../../lib/projectFarm/useNpmStats";
import AnimatedCounter from "./AnimatedCounter";
import Sparkline from "./Sparkline";

type MetricCardProps = {
  project: Project;
  metric: Metric;
};

export default function MetricCard({ project, metric }: MetricCardProps) {
  const { stats } = useNpmStats();
  const liveValue = resolveMetricValue(project, metric, stats);
  const npmSparkline = resolveMetricSparkline(project, metric, stats);
  const sparkline =
    npmSparkline ??
    generateSparkline(
      project.id,
      metric.key,
      metric.baseValue,
      metric.dailyDeltaRange,
      metric.trend
    );
  const trend = resolveMetricTrend(project, metric, stats);
  const trendColor = getTrendColorClass(trend);
  const trendStroke = getTrendStrokeClass(trend);

  return (
    <div className="rounded-xl border border-hairline bg-paper/80 p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
          {metric.label}
        </p>
        <span
          className={`font-mono text-sm ${trendColor}`}
          aria-label={`Trend ${trend}`}
        >
          {getTrendArrow(trend)}
        </span>
      </div>
      <div className="mt-2 flex items-end justify-between gap-3">
        <AnimatedCounter
          value={liveValue}
          className="font-mono text-2xl font-medium text-ink"
        />
        <Sparkline points={sparkline} strokeClassName={trendStroke} />
      </div>
    </div>
  );
}
