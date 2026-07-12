"use client";

import type { Project } from "../../lib/projectFarm/types";
import ProjectCard from "./ProjectCard";
import StatusBadge from "./StatusBadge";

type ProjectDetailPanelProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectDetailPanel({
  project,
  onClose,
}: ProjectDetailPanelProps) {
  if (!project) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-[1px] lg:hidden"
        aria-label="Chiudi dettaglio progetto"
        onClick={onClose}
      />

      <aside
        className="fixed bottom-0 left-0 right-0 z-50 max-h-[78vh] overflow-y-auto rounded-t-2xl border border-hairline bg-paper/95 p-5 shadow-2xl backdrop-blur-md lg:bottom-auto lg:left-auto lg:right-4 lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:w-[min(420px,calc(100vw-2rem))] lg:rounded-2xl"
        aria-label={`Dettaglio quote ${project.ticker}`}
      >
        <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-exchange-ticker">
              {project.ticker}
            </span>
            <span className="text-xl">{project.icon}</span>
            <span className="font-serif text-lg text-ink">{project.name}</span>
            <StatusBadge status={project.status} />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-hairline px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft"
          >
            Chiudi
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 hidden rounded-full border border-hairline px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft hover:text-ink lg:inline-flex"
          aria-label="Chiudi pannello"
        >
          ✕
        </button>

        <ProjectCard project={project} />
      </aside>
    </>
  );
}
