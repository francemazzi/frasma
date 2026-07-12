"use client";

import {
  getMetricLiveValue,
  getPrimaryMetric,
  getTrendArrow,
  getTrendColorClass,
} from "../../lib/projectFarm/projectFarmData";
import { PROJECTS } from "../../lib/projectFarm/projects";

export default function TickerTape() {
  const items = [...PROJECTS]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((project) => {
      const metric = getPrimaryMetric(project);
      const value = getMetricLiveValue(project, metric);
      const arrow = getTrendArrow(metric.trend);
      const colorClass = getTrendColorClass(metric.trend);

      return {
        key: project.id,
        label: `${project.ticker} ${arrow} ${value.toLocaleString("it-IT")} ${metric.label.toLowerCase()}`,
        colorClass,
      };
    });

  const tapeContent = [...items, ...items];

  return (
    <div
      className="overflow-hidden border-b border-hairline bg-exchange-tape py-2"
      aria-label="Ticker progetti in scorrimento"
    >
      <div className="exchange-ticker-track gap-8 px-4">
        {tapeContent.map((item, index) => (
          <span
            key={`${item.key}-${index}`}
            className={`whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.1em] ${item.colorClass}`}
          >
            {item.label}
            <span className="mx-4 text-ink-faint" aria-hidden="true">
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
