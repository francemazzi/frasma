"use client";

import { Home, Move } from "lucide-react";
import type { CSSProperties } from "react";
import { PROJECTS } from "../../lib/projectFarm/projects";
import type { Project } from "../../lib/projectFarm/types";
import ProjectPlot from "./ProjectPlot";
import { usePanMap } from "./usePanMap";

const pixelGridStyle = {
  backgroundImage:
    "linear-gradient(rgba(90,107,62,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(90,107,62,0.08) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
} satisfies CSSProperties;

type ProjectFarmMapProps = {
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
};

export default function ProjectFarmMap({
  selectedProject,
  onSelectProject,
}: ProjectFarmMapProps) {
  const { containerRef, goHome, mapHandlers, transformStyle, isDragging } =
    usePanMap({ homeX: 0, homeY: 0 });

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-gradient-to-br from-sky-100/50 via-paper to-accent-leaf/10"
      role="application"
      aria-label="Mappa interattiva dei progetti. Trascina per esplorare i campi."
    >
      <div className="pointer-events-none absolute inset-0 z-10 flex items-start justify-between p-3 sm:p-4">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-farm-border bg-white/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft backdrop-blur-sm">
          <Move className="h-3.5 w-3.5" aria-hidden="true" />
          Trascina o scrolla per esplorare
        </div>
        <button
          type="button"
          onClick={goHome}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-farm-border bg-white/90 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink shadow-sm backdrop-blur-sm transition-colors hover:border-accent-leaf/40 hover:text-accent-leaf"
          aria-label="Torna alla vista centrale Home"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Home
        </button>
      </div>

      <div
        className={`absolute inset-0 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        {...mapHandlers}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[1800px] w-[2400px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={transformStyle}
        >
          <div className="absolute inset-0 rounded-[48px] border border-farm-border/60 bg-white/20 shadow-inner">
            <div className="absolute inset-0 opacity-80" style={pixelGridStyle} />

            <div
              className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-accent-leaf/30 bg-accent-leaf/5"
              aria-hidden="true"
            >
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-leaf/70">
                Home
              </span>
            </div>

            <div
              className="absolute left-[18%] top-[22%] h-24 w-32 rounded-2xl border border-terra-200/60 bg-terra-50/40"
              aria-hidden="true"
            />
            <div
              className="absolute right-[16%] bottom-[24%] h-20 w-28 rounded-2xl border border-accent-blue/20 bg-accent-blue/5"
              aria-hidden="true"
            />
            <div
              className="absolute left-[62%] top-[68%] h-16 w-20 rounded-xl border border-wheat-200/70 bg-wheat-50/50"
              aria-hidden="true"
            />

            {PROJECTS.map((project) => (
              <ProjectPlot
                key={project.id}
                project={project}
                isSelected={selectedProject?.id === project.id}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
