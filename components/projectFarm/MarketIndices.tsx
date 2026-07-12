"use client";

import {
  getTractionSignals,
  getUniqueTeamCount,
} from "../../lib/projectFarm/projectFarmData";
import { PROJECTS } from "../../lib/projectFarm/projects";
import AnimatedCounter from "./AnimatedCounter";

export default function MarketIndices() {
  const teamCount = getUniqueTeamCount(PROJECTS);
  const traction = getTractionSignals(PROJECTS);

  const stats = [
    { label: "Progetti quotati", value: PROJECTS.length },
    { label: "Persone coinvolte", value: teamCount },
    { label: "Segnali di traction", value: traction },
  ];

  return (
    <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-hairline bg-paper/80 px-3 py-3 backdrop-blur-sm"
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink-soft sm:text-[10px]">
            {stat.label}
          </p>
          <AnimatedCounter
            value={stat.value}
            className="mt-1 block font-mono text-xl font-medium text-ink sm:text-2xl"
          />
        </div>
      ))}
    </div>
  );
}
