"use client";

import {
  getTractionSignals,
  getUniqueTeamCount,
} from "../../lib/projectFarm/projectFarmData";
import { PROJECTS } from "../../lib/projectFarm/projects";
import AnimatedCounter from "./AnimatedCounter";

export default function OverviewStats() {
  const teamCount = getUniqueTeamCount(PROJECTS);
  const traction = getTractionSignals(PROJECTS);

  const stats = [
    { label: "Progetti", value: PROJECTS.length },
    { label: "Persone coinvolte", value: teamCount },
    { label: "Segnali di traction", value: traction },
  ];

  return (
    <div className="pointer-events-none mt-4 grid grid-cols-3 gap-2 sm:gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-farm-border/80 bg-white/75 px-3 py-3 backdrop-blur-sm"
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink-soft sm:text-[10px]">
            {stat.label}
          </p>
          <AnimatedCounter
            value={stat.value}
            className="mt-1 block font-serif text-xl font-medium text-ink sm:text-2xl"
          />
        </div>
      ))}
    </div>
  );
}
