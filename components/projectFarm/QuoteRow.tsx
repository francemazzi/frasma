"use client";

import {
  generateSparkline,
  getMetricLiveValue,
  getPrimaryMetric,
  getTrendArrow,
  getTrendColorClass,
  getTrendStrokeClass,
} from "../../lib/projectFarm/projectFarmData";
import type { Project } from "../../lib/projectFarm/types";
import AnimatedCounter from "./AnimatedCounter";
import Sparkline from "./Sparkline";
import StatusBadge from "./StatusBadge";

type QuoteRowProps = {
  project: Project;
  isSelected: boolean;
  onSelect: (project: Project) => void;
};

export default function QuoteRow({
  project,
  isSelected,
  onSelect,
}: QuoteRowProps) {
  const metric = getPrimaryMetric(project);
  const liveValue = getMetricLiveValue(project, metric);
  const sparkline = generateSparkline(
    project.id,
    metric.key,
    metric.baseValue,
    metric.dailyDeltaRange,
    metric.trend
  );
  const trendColor = getTrendColorClass(metric.trend);
  const trendStroke = getTrendStrokeClass(metric.trend);

  return (
    <>
      {/* Desktop row */}
      <button
        type="button"
        onClick={() => onSelect(project)}
        className={`hidden w-full grid-cols-[72px_1fr_100px_110px_140px_48px_88px] items-center gap-3 border-b border-hairline px-4 py-3 text-left transition-colors hover:bg-paper-2/60 lg:grid ${
          isSelected
            ? "border-l-2 border-l-accent bg-paper-2/80"
            : "border-l-2 border-l-transparent"
        }`}
        aria-label={`Apri quote ${project.ticker}`}
        aria-pressed={isSelected}
      >
        <span className="font-mono text-sm font-medium text-exchange-ticker">
          {project.ticker}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">
              {project.icon}
            </span>
            <span className="font-serif text-base font-medium text-ink">
              {project.name}
            </span>
          </div>
          <p className="mt-0.5 line-clamp-1 text-xs text-ink-soft">
            {project.tagline}
          </p>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-soft">
          {project.sector}
        </span>
        <StatusBadge status={project.status} />
        <div>
          <AnimatedCounter
            value={liveValue}
            className="font-mono text-base font-medium text-ink"
          />
          <p className="mt-0.5 font-mono text-[10px] text-ink-faint">
            {metric.label}
          </p>
        </div>
        <span
          className={`font-mono text-lg ${trendColor}`}
          aria-label={`Trend ${metric.trend}`}
        >
          {getTrendArrow(metric.trend)}
        </span>
        <Sparkline points={sparkline} strokeClassName={trendStroke} />
      </button>

      {/* Mobile card */}
      <button
        type="button"
        onClick={() => onSelect(project)}
        className={`w-full rounded-2xl border p-4 text-left transition-colors hover:bg-paper-2/60 lg:hidden ${
          isSelected
            ? "border-accent bg-paper-2/80 ring-1 ring-accent/20"
            : "border-hairline bg-paper/90"
        }`}
        aria-label={`Apri quote ${project.ticker}`}
        aria-pressed={isSelected}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-medium text-exchange-ticker">
              {project.ticker}
            </span>
            <span className="text-xl" aria-hidden="true">
              {project.icon}
            </span>
            <span className="font-serif text-lg font-medium text-ink">
              {project.name}
            </span>
          </div>
          <StatusBadge status={project.status} />
        </div>
        <p className="mt-2 line-clamp-2 text-xs text-ink-soft">
          {project.tagline}
        </p>
        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-faint">
              {project.sector}
            </p>
            <AnimatedCounter
              value={liveValue}
              className="font-mono text-xl font-medium text-ink"
            />
            <p className="font-mono text-[10px] text-ink-faint">
              {metric.label}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-mono text-lg ${trendColor}`}>
              {getTrendArrow(metric.trend)}
            </span>
            <Sparkline points={sparkline} strokeClassName={trendStroke} />
          </div>
        </div>
      </button>
    </>
  );
}
