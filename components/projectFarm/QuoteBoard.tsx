"use client";

import { PROJECTS } from "../../lib/projectFarm/projects";
import type { Project } from "../../lib/projectFarm/types";
import QuoteRow from "./QuoteRow";

type QuoteBoardProps = {
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
};

export default function QuoteBoard({
  selectedProject,
  onSelectProject,
}: QuoteBoardProps) {
  const sortedProjects = [...PROJECTS].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  return (
    <section
      className="exchange-grid-bg overflow-hidden rounded-2xl border border-hairline bg-paper/60"
      aria-label="Tabellone quote progetti"
    >
      <div className="hidden border-b border-hairline bg-paper-2/50 px-4 py-2 lg:grid lg:grid-cols-[72px_1fr_100px_110px_140px_48px_88px] lg:gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
          Ticker
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
          Progetto
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
          Settore
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
          Stato
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
          Ultima quota
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
          Trend
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
          14g
        </span>
      </div>

      <div className="flex flex-col gap-3 p-3 lg:gap-0 lg:p-0">
        {sortedProjects.map((project) => (
          <QuoteRow
            key={project.id}
            project={project}
            isSelected={selectedProject?.id === project.id}
            onSelect={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
}
