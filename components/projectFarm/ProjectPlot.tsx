"use client";

import type { Project } from "../../lib/projectFarm/types";
import StatusBadge from "./StatusBadge";

type ProjectPlotProps = {
  project: Project;
  isSelected: boolean;
  onSelect: (project: Project) => void;
};

export default function ProjectPlot({
  project,
  isSelected,
  onSelect,
}: ProjectPlotProps) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `translate(calc(-50% + ${project.mapPosition.x}px), calc(-50% + ${project.mapPosition.y}px))`,
      }}
    >
      <button
        type="button"
        onMouseDown={(event) => event.stopPropagation()}
        onTouchStart={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(project);
        }}
        className={`group w-[min(280px,70vw)] rounded-3xl border bg-farm-surface/95 p-4 text-left shadow-lg backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-leaf ${
          isSelected
            ? "border-accent-leaf ring-2 ring-accent-leaf/20"
            : "border-farm-border hover:border-accent-leaf/40"
        }`}
        aria-label={`Apri ${project.name}`}
        aria-pressed={isSelected}
      >
        <div className="flex items-start gap-3">
          <span className="text-3xl transition-transform duration-200 group-hover:scale-110">
            {project.icon}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-serif text-lg font-medium text-ink">
                {project.name}
              </h3>
              <StatusBadge status={project.status} />
            </div>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-soft">
              {project.tagline}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-accent-leaf">
              {project.visualMetaphor}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}
