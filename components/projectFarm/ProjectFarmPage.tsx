"use client";

import { useState } from "react";
import type { Project } from "../../lib/projectFarm/types";
import FarmHeader from "./FarmHeader";
import OverviewStats from "./OverviewStats";
import ProjectDetailPanel from "./ProjectDetailPanel";
import ProjectFarmMap from "./ProjectFarmMap";

export default function ProjectFarmPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="relative flex h-[calc(100vh-81px)] min-h-[520px] flex-col">
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 p-4 sm:p-5">
        <div className="pointer-events-auto max-w-2xl rounded-3xl border border-farm-border/70 bg-paper/85 p-4 shadow-lg backdrop-blur-md sm:p-5">
          <FarmHeader />
          <OverviewStats />
        </div>
      </div>

      <div className="relative min-h-0 flex-1">
        <ProjectFarmMap
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
        />
      </div>

      <ProjectDetailPanel
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <footer className="relative z-10 border-t border-farm-border/60 bg-paper/90 px-4 py-3 text-center font-mono text-[10px] text-ink-faint sm:px-6">
        Questa pagina usa dati iniziali e variazioni giornaliere simulate. La
        struttura è pronta per essere collegata a metriche reali.
      </footer>
    </div>
  );
}
