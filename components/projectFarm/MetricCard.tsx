"use client";

import {
  generateSparkline,
  getMetricLiveValue,
  getTrendArrow,
} from "../../lib/projectFarm/projectFarmData";
import type { Metric, Project } from "../../lib/projectFarm/types";
import AnimatedCounter from "./AnimatedCounter";
import Sparkline from "./Sparkline";

type MetricCardProps = {
  project: Project;
  metric: Metric;
};

export default function MetricCard({ project, metric }: MetricCardProps) {
  const liveValue = getMetricLiveValue(project, metric);
  const sparkline = generateSparkline(
    project.id,
    metric.key,
    metric.baseValue,
    metric.dailyDeltaRange,
    metric.trend
  );

  return (
    <div className="rounded-2xl border border-farm-border bg-white/70 p-3 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
          {metric.label}
        </p>
        <span
          className="font-mono text-sm text-accent-leaf"
          aria-label={`Trend ${metric.trend}`}
        >
          {getTrendArrow(metric.trend)}
        </span>
      </div>
      <div className="mt-2 flex items-end justify-between gap-3">
        <AnimatedCounter
          value={liveValue}
          className="font-serif text-2xl font-medium text-ink"
        />
        <Sparkline points={sparkline} />
      </div>
    </div>
  );
}
