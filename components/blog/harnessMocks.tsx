"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { MockHit, useMockPlayback, type MockStep } from "../atoms/MockScene";
import { MockStatusBadge } from "../organism/productMocks";

export const HARNESS_DEMO_IDS = [
  "officina",
  "attrezzi",
  "memoria",
  "procedure",
  "controllo",
] as const;

export type HarnessDemoId = (typeof HARNESS_DEMO_IDS)[number];

export function isHarnessDemoId(id: string): id is HarnessDemoId {
  return (HARNESS_DEMO_IDS as readonly string[]).includes(id);
}

function useManualOverride<T extends string>(auto: T, initial: T): { value: T; choose: (next: T) => void } {
  const [manual, setManual] = useState<T | null>(null);
  const wasInitial = useRef(true);

  useEffect(() => {
    const nowInitial = auto === initial;
    if (nowInitial && !wasInitial.current) {
      setManual(null);
    }
    wasInitial.current = nowInitial;
  }, [auto, initial]);

  return { value: manual ?? auto, choose: setManual };
}

function WindowBar({ label }: { label: string }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 border-b border-hairline px-4 py-2">
      <span className="h-1.5 w-1.5 rounded-full bg-[#f4a8c8]" />
      <span className="h-1.5 w-1.5 rounded-full bg-[#f0d4a8]" />
      <span className="h-1.5 w-1.5 rounded-full bg-[#c9b5e0]" />
      <span className="ml-2 min-w-0 truncate font-mono text-[12px] tracking-[0.04em] text-ink-soft sm:text-[10px]">
        {label}
      </span>
      <MockStatusBadge className="ml-auto" />
    </div>
  );
}

function TextChip({
  id,
  selected,
  onChoose,
  children,
}: {
  id: string;
  selected: boolean;
  onChoose: () => void;
  children: ReactNode;
}) {
  return (
    <MockHit id={id} as="span" className="inline-block max-w-full">
      <button
        type="button"
        onClick={onChoose}
        aria-pressed={selected}
        className={`max-w-full rounded-full px-3 py-1.5 text-left font-mono text-[12px] leading-snug sm:text-[11px] ${
          selected
            ? "bg-ink text-paper"
            : "border border-hairline-strong bg-white/90 text-ink hover:bg-paper-2"
        }`}
      >
        {children}
      </button>
    </MockHit>
  );
}

function ChipRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-2 pt-1">{children}</div>;
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3 min-h-0 flex-1 overflow-hidden rounded-xl border border-hairline bg-paper-2 p-3">
      {children}
    </div>
  );
}

function StatusLine({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <p
      className={`mt-2 font-mono text-[11px] uppercase tracking-[0.08em] sm:text-[10px] ${
        ok ? "text-accent" : "text-working"
      }`}
    >
      {children}
    </p>
  );
}

type OfficinaState = { mode: "chat" | "officina" };

const OFFICINA_STEPS: MockStep<OfficinaState>[] = [
  { type: "wait", ms: 720 },
  { type: "move", to: "chip-officina" },
  { type: "click" },
  { type: "set", patch: { mode: "officina" } },
  { type: "wait", ms: 1400 },
];

export function OfficinaMock() {
  const { state } = useMockPlayback<OfficinaState>(
    { mode: "chat" },
    { mode: "officina" },
    OFFICINA_STEPS,
  );
  const { value: mode, choose } = useManualOverride(state.mode, "chat");
  const officina = mode === "officina";

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="Accettazione · DDT 1842" />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-4">
        <ChipRow>
          <TextChip id="chip-chat" selected={!officina} onChoose={() => choose("chat")}>
            Solo chat
          </TextChip>
          <TextChip id="chip-officina" selected={officina} onChoose={() => choose("officina")}>
            Officina
          </TextChip>
        </ChipRow>
        <Panel>
          {officina ? (
            <div className="grid grid-cols-2 gap-2">
              <ToolTile title="PDF" value="DDT letto" ok />
              <ToolTile title="Anagrafica" value="VITE M8×20" ok />
              <ToolTile title="Taccuino" value="Confezioni da 4" ok />
              <ToolTile title="Semaforo" value="Da verificare" ok />
            </div>
          ) : (
            <div>
              <p className="font-medium text-ink">«Codice V-M8-99, 20 pezzi. Caricato.»</p>
              <p className="mt-2 text-[13px] leading-snug text-ink-soft sm:text-[12px]">
                Nessun documento aperto. Nessun controllo. Il modello ha inventato il codice.
              </p>
            </div>
          )}
          <StatusLine ok={officina}>
            {officina ? "Banco, attrezzi e controllo" : "Nessuna fonte · solo testo"}
          </StatusLine>
        </Panel>
      </div>
    </div>
  );
}

function ToolTile({ title, value, ok }: { title: string; value: string; ok?: boolean }) {
  return (
    <div className="rounded-lg bg-white/90 px-2.5 py-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">{title}</p>
      <p className={`mt-0.5 truncate text-[13px] font-medium sm:text-[12px] ${ok ? "text-accent" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}

type AttrezziState = { mode: "guess" | "tools" };

const ATTREZZI_STEPS: MockStep<AttrezziState>[] = [
  { type: "wait", ms: 680 },
  { type: "move", to: "chip-tools" },
  { type: "click" },
  { type: "set", patch: { mode: "tools" } },
  { type: "wait", ms: 1400 },
];

export function AttrezziMock() {
  const { state } = useMockPlayback<AttrezziState>(
    { mode: "guess" },
    { mode: "tools" },
    ATTREZZI_STEPS,
  );
  const { value: mode, choose } = useManualOverride(state.mode, "guess");
  const tools = mode === "tools";

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="Riga articolo · DDT" />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-4">
        <ChipRow>
          <TextChip id="chip-guess" selected={!tools} onChoose={() => choose("guess")}>
            Indovina il codice
          </TextChip>
          <TextChip id="chip-tools" selected={tools} onChoose={() => choose("tools")}>
            Leggi il PDF e cerca in anagrafica
          </TextChip>
        </ChipRow>
        <Panel>
          <div className="flex items-baseline justify-between gap-3 border-b border-hairline pb-2 font-mono text-[13px] sm:text-[11px]">
            <span className="uppercase tracking-[0.08em] text-ink-soft">Codice</span>
            <span className={`font-medium ${tools ? "text-accent" : "text-ink"}`}>
              {tools ? "VITE M8×20" : "V-M8-99"}
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-3 font-mono text-[13px] sm:text-[11px]">
            <span className="uppercase tracking-[0.08em] text-ink-soft">Fonte</span>
            <span className="truncate font-medium text-ink">
              {tools ? "PDF riga 3 · ERP trovato" : "Nessuna"}
            </span>
          </div>
          <StatusLine ok={tools}>
            {tools ? "Attrezzo usato · dato verificabile" : "Il modello ha simulato il codice"}
          </StatusLine>
        </Panel>
      </div>
    </div>
  );
}

type MemoriaState = { mode: "forget" | "save" };

const MEMORIA_STEPS: MockStep<MemoriaState>[] = [
  { type: "wait", ms: 680 },
  { type: "move", to: "chip-save" },
  { type: "click" },
  { type: "set", patch: { mode: "save" } },
  { type: "wait", ms: 1400 },
];

export function MemoriaMock() {
  const { state } = useMockPlayback<MemoriaState>(
    { mode: "forget" },
    { mode: "save" },
    MEMORIA_STEPS,
  );
  const { value: mode, choose } = useManualOverride(state.mode, "forget");
  const saved = mode === "save";

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="Secondo DDT · stesso fornitore" />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-4">
        <ChipRow>
          <TextChip id="chip-forget" selected={!saved} onChoose={() => choose("forget")}>
            Scarta e dimentica
          </TextChip>
          <TextChip id="chip-save" selected={saved} onChoose={() => choose("save")}>
            Salva la lezione
          </TextChip>
        </ChipRow>
        <Panel>
          {saved ? (
            <div className="rounded-lg bg-white/90 px-3 py-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">Taccuino</p>
              <p className="mt-1 text-[13px] leading-snug text-ink sm:text-[12px]">
                Fornitore Rossi: le quantità arrivano in confezioni da 4, non in pezzi sciolti.
              </p>
            </div>
          ) : (
            <p className="text-[13px] leading-snug text-ink sm:text-[12px]">
              Stesso errore della volta scorsa: 20 pezzi. Erano 5 confezioni.
            </p>
          )}
          <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-hairline pt-2 font-mono text-[13px] sm:text-[11px]">
            <span className="uppercase tracking-[0.08em] text-ink-soft">Proposta</span>
            <span className={`font-medium ${saved ? "text-accent" : "text-ink"}`}>
              {saved ? "5 conf. × 4 = 20 pz" : "20 pz · da ricontrollare"}
            </span>
          </div>
          <StatusLine ok={saved}>
            {saved ? "La lezione resta per il prossimo documento" : "Ogni documento riparte da zero"}
          </StatusLine>
        </Panel>
      </div>
    </div>
  );
}

type ProcedureState = { skill: "ddt" | "collaudo" | "rfq" };

const PROCEDURE_STEPS: MockStep<ProcedureState>[] = [
  { type: "wait", ms: 520 },
  { type: "move", to: "chip-collaudo" },
  { type: "click" },
  { type: "set", patch: { skill: "collaudo" } },
  { type: "wait", ms: 900 },
  { type: "move", to: "chip-rfq" },
  { type: "click" },
  { type: "set", patch: { skill: "rfq" } },
  { type: "wait", ms: 1200 },
];

const PROCEDURES: Record<ProcedureState["skill"], { title: string; steps: string[] }> = {
  ddt: {
    title: "Estrai DDT",
    steps: ["Apri il PDF", "Estrai fornitore e righe", "Segnala i dubbi", "Metti in verifica"],
  },
  collaudo: {
    title: "Checklist collaudo",
    steps: ["Apri la distinta", "Segna i punti CCP", "Foto del pezzo", "Firma dell’operatore"],
  },
  rfq: {
    title: "RFQ fornitori",
    steps: ["Raccogli le richieste", "Invia le offerte in coda", "Segna i solleciti", "Chiudi l’importo"],
  },
};

export function ProcedureMock() {
  const { state } = useMockPlayback<ProcedureState>(
    { skill: "ddt" },
    { skill: "rfq" },
    PROCEDURE_STEPS,
  );
  const { value: skill, choose } = useManualOverride(state.skill, "ddt");
  const procedure = PROCEDURES[skill];

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="Libreria procedure" />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-4">
        <ChipRow>
          <TextChip id="chip-ddt" selected={skill === "ddt"} onChoose={() => choose("ddt")}>
            Estrai DDT
          </TextChip>
          <TextChip id="chip-collaudo" selected={skill === "collaudo"} onChoose={() => choose("collaudo")}>
            Checklist collaudo
          </TextChip>
          <TextChip id="chip-rfq" selected={skill === "rfq"} onChoose={() => choose("rfq")}>
            RFQ fornitori
          </TextChip>
        </ChipRow>
        <Panel>
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">{procedure.title}</p>
          <ol className="mt-2 space-y-1.5 text-[13px] leading-snug text-ink sm:text-[12px]">
            {procedure.steps.map((step, index) => (
              <li key={step} className="flex gap-2">
                <span className="font-mono text-[11px] text-ink-soft">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <StatusLine ok>Procedura scritta · riutilizzabile</StatusLine>
        </Panel>
      </div>
    </div>
  );
}

type ControlloState = { mode: "write" | "review" };

const CONTROLLO_STEPS: MockStep<ControlloState>[] = [
  { type: "wait", ms: 680 },
  { type: "move", to: "chip-review" },
  { type: "click" },
  { type: "set", patch: { mode: "review" } },
  { type: "wait", ms: 1400 },
];

export function ControlloMock() {
  const { state } = useMockPlayback<ControlloState>(
    { mode: "write" },
    { mode: "review" },
    CONTROLLO_STEPS,
  );
  const { value: mode, choose } = useManualOverride(state.mode, "write");
  const review = mode === "review";

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="Movimento di magazzino" />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-4">
        <ChipRow>
          <TextChip id="chip-write" selected={!review} onChoose={() => choose("write")}>
            Scrivi subito in ERP
          </TextChip>
          <TextChip id="chip-review" selected={review} onChoose={() => choose("review")}>
            Metti in verifica
          </TextChip>
        </ChipRow>
        <Panel>
          <div
            className={`rounded-lg px-3 py-2 ${
              review ? "bg-white/90" : "border border-[#e8b4b4] bg-[#fbeeee]"
            }`}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
              {review ? "Coda" : "Gestionale"}
            </p>
            <p className="mt-1 text-[13px] font-medium text-ink sm:text-[12px]">
              {review ? "Da confermare · ufficio acquisti" : "Scritto in magazzino"}
            </p>
          </div>
          <p className="mt-3 text-[13px] leading-snug text-ink-soft sm:text-[12px]">
            {review
              ? "Una persona conferma. Poi, e solo allora, parte l’import."
              : "Un codice inventato è già nel magazzino. L’errore è in fattura."}
          </p>
          <StatusLine ok={review}>
            {review ? "Nessuna scrittura cieca" : "Semaforo rosso · azione già eseguita"}
          </StatusLine>
        </Panel>
      </div>
    </div>
  );
}
