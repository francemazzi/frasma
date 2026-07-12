"use client";

import { useState } from "react";
import type { Project } from "../../lib/projectFarm/types";
import ExchangeHeader from "./ExchangeHeader";
import MarketIndices from "./MarketIndices";
import ProjectDetailPanel from "./ProjectDetailPanel";
import QuoteBoard from "./QuoteBoard";
import TickerTape from "./TickerTape";

export default function ProjectFarmPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="relative flex min-h-[calc(100vh-81px)] flex-col">
      <TickerTape />

      <div className="section-farm flex-1 py-6 sm:py-8">
        <ExchangeHeader />
        <MarketIndices />

        <div className="mt-6">
          <QuoteBoard
            selectedProject={selectedProject}
            onSelectProject={setSelectedProject}
          />
        </div>
      </div>

      <ProjectDetailPanel
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <footer className="border-t border-hairline bg-paper/90 px-4 py-3 text-center font-mono text-[10px] text-ink-faint sm:px-6">
        Dati simulati con variazioni giornaliere. Struttura pronta per
        collegamento a feed API reali.
      </footer>
    </div>
  );
}
