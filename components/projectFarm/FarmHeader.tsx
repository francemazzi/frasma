"use client";

import { formatTodayDate } from "../../lib/projectFarm/projectFarmData";

export default function FarmHeader() {
  return (
    <div className="pointer-events-none">
      <div className="flex items-start gap-3">
        <span
          className="farm-sprout mt-1 text-xl"
          aria-hidden="true"
        >
          🌿
        </span>
        <div>
          <p className="ed-kicker text-accent-leaf">Campi attivi</p>
          <h1 className="font-serif text-2xl font-medium tracking-[-0.02em] text-ink sm:text-3xl">
            Project Farm
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-[15px]">
            Una vista viva dei progetti che sto coltivando: traction, team e
            segnali di crescita.
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
            Aggiornato oggi: {formatTodayDate()}
          </p>
        </div>
      </div>
    </div>
  );
}
