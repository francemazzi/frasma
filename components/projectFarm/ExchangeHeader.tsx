"use client";

import { formatTodayDate } from "../../lib/projectFarm/projectFarmData";

export default function ExchangeHeader() {
  return (
    <header>
      <div className="flex items-start gap-3">
        <span
          className="mt-1 font-mono text-xl text-exchange-ticker"
          aria-hidden="true"
        >
          ◈
        </span>
        <div>
          <p className="ed-kicker text-exchange-ticker">Mercato progetti</p>
          <h1 className="font-serif text-2xl font-medium tracking-[-0.02em] text-ink sm:text-3xl">
            Frasma Borsa
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-[15px]">
            Tabellone quote dei progetti in portafoglio: traction, team e
            segnali di crescita in tempo reale.
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
            Sessione aperta · {formatTodayDate()}
          </p>
        </div>
      </div>
    </header>
  );
}
