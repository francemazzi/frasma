"use client";

import { MockHit, useMockHitClass, useMockPlayback, type MockStep } from "../atoms/MockScene";
import { WindowBar } from "./productMocks";

type WikiState = {
  query: string;
  resultOpen: boolean;
};

const WIKI_INITIAL: WikiState = {
  query: "",
  resultOpen: false,
};

const WIKI_COMPLETE: WikiState = {
  query: "cambio filtro cella",
  resultOpen: true,
};

const WIKI_STEPS: MockStep<WikiState>[] = [
  { type: "wait", ms: 280 },
  { type: "move", to: "wiki-search" },
  { type: "click" },
  { type: "type", key: "query", text: "cambio filtro cella", msPerChar: 32 },
  { type: "wait", ms: 360 },
  { type: "move", to: "wiki-result" },
  { type: "click" },
  { type: "set", patch: { resultOpen: true } },
  { type: "wait", ms: 900 },
];

const RESULTS = [
  {
    id: "wiki-result",
    code: "PROC-04",
    title: "Cambio filtro cella frigo",
    hint: "Manutenzione · v3",
    match: true,
  },
  {
    id: "wiki-other-1",
    code: "PROC-11",
    title: "Pulizia evaporatore",
    hint: "Manutenzione · v2",
    match: false,
  },
] as const;

export function WikiSearchMock() {
  const { state, typingKey } = useMockPlayback(WIKI_INITIAL, WIKI_COMPLETE, WIKI_STEPS);
  const showResults = state.query.length >= 6;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="Wiki · ricerca procedure" />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-3 sm:p-4">
        <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft sm:text-[9px]">
          Cerca
        </p>
        <div
          className={useMockHitClass(
            "wiki-search",
            "mb-3 min-h-[36px] rounded-lg bg-paper-2 px-2.5 py-1.5 font-mono text-[13px] text-ink sm:text-[11px]",
          )}
          data-mock-hit="wiki-search"
        >
          {state.query || "—"}
          {typingKey === "query" ? <span className="mock-caret" /> : null}
        </div>

        {showResults ? (
          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
            {RESULTS.map((item) => {
              const open = state.resultOpen && item.match;
              return (
                <MockHit key={item.id} id={item.id} as="div">
                  <div
                    className={`rounded-xl border px-3 py-2 ${
                      open
                        ? "border-accent/30 bg-white"
                        : "border-hairline bg-paper-2"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[13px] font-medium text-ink sm:text-[12px]">
                        {item.title}
                      </p>
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                        {item.code}
                      </span>
                    </div>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                      {item.hint}
                    </p>
                    {open ? (
                      <div className="mt-2 border-t border-hairline pt-2">
                        <p className="text-[12.5px] leading-[1.45] text-ink-soft sm:text-[11px]">
                          Chiudere la cella, spegnere, sostituire il filtro e
                          annotare lotto e data. Non è una decisione autonoma:
                          chiude il tecnico.
                        </p>
                        <p className="mt-2 inline-flex rounded-full bg-paper-2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-ink">
                          Fonte: PROC-04 v3 — owner: qualità
                        </p>
                      </div>
                    ) : null}
                  </div>
                </MockHit>
              );
            })}
          </div>
        ) : (
          <p className="font-mono text-[11px] leading-[1.45] text-ink-soft sm:text-[10px]">
            Fonti versionate. La risposta cita la procedura, non inventa.
          </p>
        )}
      </div>
    </div>
  );
}
