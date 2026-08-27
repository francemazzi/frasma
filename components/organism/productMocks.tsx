"use client";

import { Check } from "lucide-react";
import { createContext, useContext, type ReactNode } from "react";
import GrainMesh, { type GrainVariant } from "../atoms/GrainMesh";
import {
  MockHit,
  MockScene,
  useMockHitClass,
  useMockPlayback,
  type MockStep,
} from "../atoms/MockScene";

type MockStageProps = {
  variant: GrainVariant;
  badge?: string;
  children: ReactNode;
  active?: boolean;
};

const MockChromeContext = createContext<{ badge?: string }>({});

export function MockStatusBadge({ className = "" }: { className?: string }) {
  const { badge } = useContext(MockChromeContext);
  if (!badge) return null;
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full bg-paper-2 px-2 py-0.5 text-[12px] font-medium text-ink sm:text-[10px] ${className}`}
    >
      <span className="mock-love-pulse inline-block h-1.5 w-1.5 rounded-full bg-working" />
      {badge}
    </span>
  );
}

export function MockStage({
  variant,
  badge,
  children,
  active,
}: MockStageProps) {
  return (
    <div className="relative h-full min-h-0 overflow-hidden sm:min-h-[220px]">
      <GrainMesh variant={variant} />
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
        <span className="mock-love-blob absolute -left-10 top-2 h-44 w-44 rounded-full bg-[#f4b8c8]/70 blur-3xl" />
        <span className="mock-love-blob-slow absolute right-0 bottom-[-18%] h-48 w-48 rounded-full bg-[#c9b5e0]/65 blur-3xl" />
        <span className="mock-love-blob absolute left-[36%] top-[40%] h-28 w-28 rounded-full bg-[#ffd9c8]/55 blur-2xl" />
      </div>
      <div className="relative z-[2] flex h-full min-h-0 items-stretch p-3 sm:p-7">
        <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/95 shadow-[0_22px_50px_-24px_rgba(80,50,90,0.5),0_0_36px_-10px_rgba(244,168,200,0.45)] ring-1 ring-[#f4a8c8]/20">
          <MockChromeContext.Provider value={{ badge }}>
            <MockScene active={active}>{children}</MockScene>
          </MockChromeContext.Provider>
        </div>
      </div>
    </div>
  );
}

function WindowBar({ label }: { label: string }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 border-b border-hairline px-4 py-2">
      <span className="h-1.5 w-1.5 rounded-full bg-[#f4a8c8] shadow-[0_0_8px_rgba(244,168,200,0.85)]" />
      <span className="h-1.5 w-1.5 rounded-full bg-[#f0d4a8] shadow-[0_0_8px_rgba(240,212,168,0.7)]" />
      <span className="h-1.5 w-1.5 rounded-full bg-[#c9b5e0] shadow-[0_0_8px_rgba(201,181,224,0.75)]" />
      <span className="ml-2 min-w-0 truncate font-mono text-[12px] tracking-[0.04em] text-ink-soft sm:text-[10px]">
        {label}
      </span>
      <MockStatusBadge className="ml-auto" />
    </div>
  );
}

type AgentState = {
  hl: number;
  numero: string;
  fornitore: string;
  data: string;
  righe: string;
  totale: string;
  validated: boolean;
  loaded: boolean;
};

const AGENT_INITIAL: AgentState = {
  hl: 0,
  numero: "",
  fornitore: "",
  data: "",
  righe: "",
  totale: "",
  validated: false,
  loaded: false,
};

const AGENT_COMPLETE: AgentState = {
  hl: 5,
  numero: "1842",
  fornitore: "Acciai Lombardi",
  data: "12/05/2026",
  righe: "12 articoli",
  totale: "€ 4.860,00",
  validated: true,
  loaded: true,
};

const AGENT_STEPS: MockStep<AgentState>[] = [
  { type: "wait", ms: 280 },
  { type: "move", to: "hl-1" },
  { type: "click" },
  { type: "set", patch: { hl: 1 } },
  { type: "move", to: "hl-2" },
  { type: "click" },
  { type: "set", patch: { hl: 2 } },
  { type: "move", to: "hl-3" },
  { type: "click" },
  { type: "set", patch: { hl: 3 } },
  { type: "move", to: "field-numero" },
  { type: "click" },
  { type: "type", key: "numero", text: "1842", msPerChar: 55 },
  { type: "move", to: "field-fornitore" },
  { type: "click" },
  { type: "type", key: "fornitore", text: "Acciai Lombardi", msPerChar: 32 },
  { type: "move", to: "field-data" },
  { type: "click" },
  { type: "type", key: "data", text: "12/05/2026", msPerChar: 38 },
  { type: "set", patch: { hl: 5, righe: "12 articoli", totale: "€ 4.860,00", validated: true } },
  { type: "move", to: "btn-carica" },
  { type: "click" },
  { type: "set", patch: { loaded: true } },
  { type: "wait", ms: 700 },
];

export function AgentMock({ compact = false }: { compact?: boolean }) {
  const { state, typingKey } = useMockPlayback(AGENT_INITIAL, AGENT_COMPLETE, AGENT_STEPS);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="DDT · Mago / TeamSystem" />
      {compact ? (
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] overflow-hidden">
          <div className="min-w-0 overflow-hidden border-r border-hairline p-5 text-[12px] leading-[1.65] text-ink-2">
            <h6 className="mb-3 truncate font-mono text-[12px] uppercase tracking-[0.12em] text-ink-soft sm:text-[9.5px]">
              Documento di trasporto · PDF
            </h6>
            <p className="mb-2 font-medium text-ink">
              DDT n. <HL on={state.hl >= 1} hit="hl-1">1842</HL> del{" "}
              <HL on={state.hl >= 2} hit="hl-2">12/05/2026</HL>
            </p>
            <p className="mb-2">
              Fornitore: <HL on={state.hl >= 3} hit="hl-3">Acciai Lombardi S.p.A.</HL>
            </p>
            <p>
              <HL on={state.hl >= 4}>12 righe</HL> · imponibile{" "}
              <HL on={state.hl >= 5}>€ 4.860,00</HL>
            </p>
          </div>
          <AgentFields state={state} typingKey={typingKey} compact />
        </div>
      ) : (
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_160px] overflow-hidden sm:grid-cols-[minmax(0,1fr)_200px]">
          <div className="min-w-0 overflow-hidden border-r border-hairline p-4 text-[13px] leading-[1.6] text-ink-2 sm:text-[11px]">
            <h6 className="mb-3 border-b border-hairline pb-2 font-mono text-[12px] uppercase tracking-[0.12em] text-ink-soft sm:text-[9.5px]">
              Documento di trasporto · PDF
            </h6>
            <p className="mb-2 text-[13.5px] font-medium text-ink sm:text-[11.5px]">
              DDT n. <HL on={state.hl >= 1} hit="hl-1">1842</HL> del{" "}
              <HL on={state.hl >= 2} hit="hl-2">12/05/2026</HL>
            </p>
            <p className="mb-2 text-[13.5px] sm:text-[11.5px]">
              Fornitore: <HL on={state.hl >= 3} hit="hl-3">Acciai Lombardi S.p.A.</HL>. Destinazione:{" "}
              <HL on={state.hl >= 4}>Magazzino centrale</HL>.
            </p>
            <p className="mb-2 text-[13.5px] sm:text-[11.5px]">
              <HL on={state.hl >= 5}>12 righe articolo</HL>, imponibile <HL on={state.hl >= 5}>€ 4.860,00</HL>.
            </p>
            <p className="text-[12px] text-ink-soft sm:text-[10.5px]">
              {state.validated ? "Dati letti dal PDF, pronti per la validazione." : "Lettura del PDF in corso…"}
            </p>
          </div>
          <AgentFields state={state} typingKey={typingKey} />
        </div>
      )}
    </div>
  );
}

function AgentFields({
  state,
  typingKey,
  compact = false,
}: {
  state: AgentState;
  typingKey: string | null;
  compact?: boolean;
}) {
  return (
    <div className={`flex min-w-0 flex-col overflow-hidden bg-paper-2 ${compact ? "p-5" : "p-[14px]"}`}>
      <h6
        className={`mb-2 flex justify-between gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-ink-soft sm:text-[9.5px] ${
          compact ? "mb-3" : "border-b border-hairline pb-2"
        }`}
      >
        <span className="min-w-0 truncate">Dati per ERP</span>
        {state.validated ? (
          <span className="shrink-0 tracking-[0.08em] text-accent drop-shadow-[0_0_8px_rgba(105,85,123,0.35)]">
            ● VALIDATO
          </span>
        ) : (
          <span className="shrink-0 tracking-[0.08em] text-working">● IN LETTURA</span>
        )}
      </h6>
      <Field
        k="Numero DDT"
        v={state.numero}
        conf="0.99"
        hit="field-numero"
        typing={typingKey === "numero"}
      />
      <Field
        k="Fornitore"
        v={state.fornitore}
        conf="0.98"
        hit="field-fornitore"
        typing={typingKey === "fornitore"}
      />
      <Field
        k="Data"
        v={state.data}
        conf="0.99"
        hit="field-data"
        typing={typingKey === "data"}
        last={compact}
      />
      {compact ? null : (
        <>
          <Field k="Righe" v={state.righe} conf="0.96" />
          <Field k="Totale" v={state.totale} conf="0.94" last />
        </>
      )}
      <div className={`mt-auto flex flex-wrap gap-2 ${compact ? "pt-4" : "pt-3"}`}>
        <MockHit id="btn-carica">
          <BtnMini>{state.loaded ? "Caricato" : "Carica ERP"}</BtnMini>
        </MockHit>
        <BtnMini ghost>Modifica</BtnMini>
      </div>
    </div>
  );
}

type TicketStatus = "open" | "work" | "done";
type TicketsState = {
  filter: "all" | "open";
  t4129: TicketStatus;
};

const TICKETS_INITIAL: TicketsState = { filter: "all", t4129: "open" };
const TICKETS_COMPLETE: TicketsState = { filter: "all", t4129: "work" };

const TICKETS_STEPS: MockStep<TicketsState>[] = [
  { type: "wait", ms: 400 },
  { type: "move", to: "filter-open" },
  { type: "click" },
  { type: "set", patch: { filter: "open" } },
  { type: "wait", ms: 420 },
  { type: "move", to: "ticket-4129" },
  { type: "click" },
  { type: "set", patch: { t4129: "work" } },
  { type: "wait", ms: 500 },
  { type: "move", to: "filter-all" },
  { type: "click" },
  { type: "set", patch: { filter: "all" } },
  { type: "wait", ms: 800 },
];

export function TicketsMock() {
  const { state } = useMockPlayback(TICKETS_INITIAL, TICKETS_COMPLETE, TICKETS_STEPS);
  const rows: {
    pri: "high" | "med" | "low";
    id: string;
    site: string;
    status: TicketStatus;
    own: string;
    hit?: string;
  }[] = [
    { pri: "high", id: "FRIGO-4129", site: "Coop · cella -22°C", status: state.t4129, own: "MR", hit: "ticket-4129" },
    { pri: "med", id: "FRIGO-4127", site: "Caseificio · evaporatore", status: "work", own: "AC" },
    { pri: "high", id: "FRIGO-4126", site: "Gelateria · compressore", status: "work", own: "MR" },
    { pri: "low", id: "FRIGO-4120", site: "Mercato · tarature", status: "done", own: "FB" },
  ];
  const visible = rows.filter((row) => state.filter === "all" || row.status === "open" || row.hit);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="Operations · tickets" />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex min-w-0 items-center gap-[6px] overflow-hidden border-b border-hairline px-3 py-2 font-mono text-[12px] tracking-[0.06em] text-ink-soft sm:px-4 sm:text-[10px]">
          <MockHit id="filter-all">
            <ChipMini on={state.filter === "all"}>Tutti</ChipMini>
          </MockHit>
          <MockHit id="filter-open">
            <ChipMini on={state.filter === "open"}>Aperti</ChipMini>
          </MockHit>
          <ChipMini red>Critici · 3</ChipMini>
        </div>
        {visible.map((r, i) => (
          <TicketRow
            key={r.id}
            row={r}
            last={i === visible.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

type WorkflowState = {
  step: 4 | 5;
  packing: string;
  packingAuto: boolean;
};

const WORKFLOW_INITIAL: WorkflowState = { step: 4, packing: "", packingAuto: false };
const WORKFLOW_COMPLETE: WorkflowState = {
  step: 5,
  packing: "tracciabilità + sigillo",
  packingAuto: true,
};

const WORKFLOW_STEPS: MockStep<WorkflowState>[] = [
  { type: "wait", ms: 400 },
  { type: "move", to: "wf-step-5" },
  { type: "click" },
  { type: "set", patch: { step: 5 } },
  { type: "wait", ms: 320 },
  { type: "move", to: "wf-packing" },
  { type: "click" },
  { type: "type", key: "packing", text: "tracciabilità + sigillo", msPerChar: 28 },
  { type: "set", patch: { packingAuto: true } },
  { type: "wait", ms: 800 },
];

export function WorkflowMock() {
  const { state, typingKey } = useMockPlayback(WORKFLOW_INITIAL, WORKFLOW_COMPLETE, WORKFLOW_STEPS);
  const steps = [
    { n: "1", name: "Dati stabilimento", state: "done" as const },
    { n: "2", name: "Diagramma flusso", state: "done" as const },
    { n: "3", name: "Pericoli identificati", state: "done" as const },
    { n: "4", name: "CCP · monitoraggio", state: state.step === 4 ? ("active" as const) : ("done" as const) },
    { n: "5", name: "Azioni correttive", state: state.step === 5 ? ("active" as const) : ("" as const), hit: "wf-step-5" },
    { n: "6", name: "Allegati e firme", state: "" as const },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="HACCP · PROC-04" />
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,38%)_minmax(0,1fr)] overflow-hidden sm:grid-cols-[190px_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-[4px] overflow-hidden border-r border-hairline bg-paper-2 p-2 sm:p-[14px]">
          {steps.map((s) => (
            <WorkflowStepRow key={s.name} step={s} />
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden p-3 sm:p-4">
          <h6 className="mb-3 flex justify-between gap-2 border-b border-hairline pb-2 font-mono text-[12px] uppercase tracking-[0.12em] text-ink-soft sm:text-[9.5px]">
            <span className="min-w-0 truncate">
              {state.step === 5 ? "Azioni correttive" : "CCP · monitoraggio"}
            </span>
            <span className="shrink-0 text-accent">{state.step} / 6</span>
          </h6>
          <WfInput label="CCP-02 · Stoccaggio" v="≤ 4°C — controllo giornaliero" auto />
          <WfInput label="CCP-03 · Cottura" v="≥ 75°C al cuore — per lotto" auto />
          <WfInput
            label="CCP-04 · Confezionamento"
            v={state.packing}
            auto={state.packingAuto}
            hit="wf-packing"
            typing={typingKey === "packing"}
          />
        </div>
      </div>
    </div>
  );
}

type PreventiviState = {
  draft: "Bozza" | "In offerta";
  showNew: boolean;
  newCli: string;
};

const PREVENTIVI_INITIAL: PreventiviState = { draft: "Bozza", showNew: false, newCli: "" };
const PREVENTIVI_COMPLETE: PreventiviState = {
  draft: "In offerta",
  showNew: true,
  newCli: "Lamiere Nord",
};

const PREVENTIVI_STEPS: MockStep<PreventiviState>[] = [
  { type: "wait", ms: 400 },
  { type: "move", to: "row-draft" },
  { type: "click" },
  { type: "set", patch: { draft: "In offerta" } },
  { type: "wait", ms: 380 },
  { type: "set", patch: { showNew: true } },
  { type: "wait", ms: 220 },
  { type: "move", to: "row-new" },
  { type: "click" },
  { type: "type", key: "newCli", text: "Lamiere Nord", msPerChar: 36 },
  { type: "wait", ms: 800 },
];

export function PreventiviMock() {
  const { state, typingKey } = useMockPlayback(
    PREVENTIVI_INITIAL,
    PREVENTIVI_COMPLETE,
    PREVENTIVI_STEPS,
  );
  const rows = [
    { id: "P-26-038", cli: "Officine R.", mat: "Inox 2 mm", eur: "4.860", st: "Vinto" },
    { id: "P-26-039", cli: "FerMec spa", mat: "Acc. galv. 3 mm", eur: "11.220", st: "In offerta" },
    { id: "P-26-040", cli: "Carrozz. P.", mat: "Alluminio 1,5", eur: "3.190", st: "In offerta" },
    { id: "P-26-041", cli: "Studio L.", mat: "Inox 4 mm", eur: "9.870", st: state.draft, hit: "row-draft" },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="Preventivi · Q1" />
      <div className="min-w-0 flex-1 overflow-hidden">
        <table className="w-full min-w-0 table-fixed border-collapse font-mono text-[12.5px] sm:text-[10.5px]">
          <thead>
            <tr className="bg-paper-2">
              <Th>N°</Th>
              <Th>Cliente</Th>
              <Th>Materiale</Th>
              <Th right>Importo €</Th>
              <Th>Stato</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <PreventivoRow key={r.id} row={r} />
            ))}
            {state.showNew ? (
              <PreventivoRow
                row={{
                  id: "P-26-042",
                  cli: state.newCli || "—",
                  mat: "Inox 2 mm",
                  eur: "6.140",
                  st: "Bozza",
                  hit: "row-new",
                }}
                typing={typingKey === "newCli"}
              />
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TicketRow({
  row,
  last,
}: {
  row: {
    pri: "high" | "med" | "low";
    id: string;
    site: string;
    status: TicketStatus;
    own: string;
    hit?: string;
  };
  last: boolean;
}) {
  const className = useMockHitClass(
    row.hit,
    `grid grid-cols-[12px_1fr_72px_24px] items-center gap-[10px] px-[14px] py-2 font-mono text-[12.5px] transition-opacity duration-300 sm:text-[10.5px] ${
      last ? "" : "border-b border-hairline"
    }`,
  );

  return (
    <div data-mock-hit={row.hit} className={className}>
      <span
        className={`h-2 w-2 rounded-full ${
          row.pri === "high" ? "bg-accent" : row.pri === "med" ? "bg-working" : "bg-[#6a8a3a]"
        }`}
      />
      <span className="truncate text-ink">
        <span className="mr-2 font-medium text-accent">{row.id}</span>
        {row.site}
      </span>
      <StatusPill kind={row.status} />
      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-ink text-[11px] text-paper sm:text-[9px]">
        {row.own}
      </span>
    </div>
  );
}

function WorkflowStepRow({
  step,
}: {
  step: {
    n: string;
    name: string;
    state: "done" | "active" | "";
    hit?: string;
  };
}) {
  const className = useMockHitClass(
    step.hit,
    `grid min-w-0 grid-cols-[18px_minmax(0,1fr)] items-center gap-1.5 rounded-lg px-1.5 py-[7px] font-mono text-[12.5px] sm:gap-2 sm:px-2 sm:text-[10.5px] ${
      step.state === "done"
        ? "bg-accent/[0.06] text-ink"
        : step.state === "active"
          ? "bg-white text-ink"
          : "text-ink-soft"
    }`,
  );

  return (
    <div data-mock-hit={step.hit} className={className}>
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] leading-none ${
          step.state === "done"
            ? "bg-accent text-white"
            : step.state === "active"
              ? "border border-accent text-accent"
              : "border border-hairline-strong text-ink-soft"
        }`}
      >
        {step.state === "done" ? <Check size={10} aria-hidden="true" /> : step.n}
      </span>
      <span className="min-w-0 truncate text-[12.5px] sm:text-[10.5px]">{step.name}</span>
    </div>
  );
}

function PreventivoRow({
  row,
  typing = false,
}: {
  row: {
    id: string;
    cli: string;
    mat: string;
    eur: string;
    st: string;
    hit?: string;
  };
  typing?: boolean;
}) {
  const className = useMockHitClass(row.hit, "border-b border-hairline");

  return (
    <tr data-mock-hit={row.hit} className={className}>
      <Td>
        <span className="text-accent">{row.id}</span>
      </Td>
      <Td>
        <span>
          {row.cli}
          {typing ? <span className="mock-caret" /> : null}
        </span>
      </Td>
      <Td>{row.mat}</Td>
      <Td right>{row.eur}</Td>
      <Td>
        <TblPill kind={row.st} />
      </Td>
    </tr>
  );
}

function HL({
  children,
  on = true,
  hit,
}: {
  children: React.ReactNode;
  on?: boolean;
  hit?: string;
}) {
  const className = useMockHitClass(
    hit,
    on
      ? "rounded-[3px] px-[3px] [background:linear-gradient(180deg,rgba(244,168,200,0.28),rgba(105,85,123,0.14))] [box-shadow:inset_0_-1px_0_rgba(105,85,123,0.28)]"
      : "rounded-[3px] px-[3px]",
  );

  return (
    <span data-mock-hit={hit} className={className}>
      {children}
    </span>
  );
}

function Field({
  k,
  v,
  conf,
  last,
  hit,
  typing,
}: {
  k: string;
  v: string;
  conf: string;
  last?: boolean;
  hit?: string;
  typing?: boolean;
}) {
  const className = useMockHitClass(
    hit,
    `flex min-w-0 flex-col gap-[2px] py-2 ${last ? "" : "border-b border-hairline"}`,
  );

  return (
    <div data-mock-hit={hit} className={className}>
      <span className="truncate font-mono text-[12px] uppercase tracking-[0.08em] text-ink-soft sm:text-[9px]">
        {k}
      </span>
      <span className="flex min-w-0 items-baseline justify-between gap-2 font-mono text-[13.5px] font-medium text-ink sm:text-[11.5px]">
        <span className="min-w-0 truncate">
          {v || "—"}
          {typing ? <span className="mock-caret" /> : null}
        </span>
        {v ? (
          <span className="shrink-0 rounded-full bg-accent/10 px-1.5 py-px text-[11px] tracking-[0.06em] text-accent sm:text-[9px]">
            {conf}
          </span>
        ) : (
          <span className="shrink-0 text-[11px] text-ink-soft sm:text-[9px]">—</span>
        )}
      </span>
    </div>
  );
}

function BtnMini({ children, ghost }: { children: React.ReactNode; ghost?: boolean }) {
  return (
    <span
      className={`inline-block rounded-full px-[10px] py-[5px] font-mono text-[12px] uppercase tracking-[0.06em] sm:text-[10px] ${
        ghost
          ? "border border-hairline-strong bg-white/80 text-ink"
          : "bg-ink text-paper shadow-[0_8px_18px_-10px_rgba(80,50,90,0.8)]"
      }`}
    >
      {children}
    </span>
  );
}

function ChipMini({
  children,
  on,
  red,
}: {
  children: React.ReactNode;
  on?: boolean;
  red?: boolean;
}) {
  const base = "inline-block rounded-full px-2 py-[3px] text-[12px] uppercase tracking-[0.06em] sm:text-[9.5px]";
  if (on) return <span className={`${base} bg-ink text-paper`}>{children}</span>;
  if (red) return <span className={`${base} bg-white text-accent`}>{children}</span>;
  return <span className={`${base} bg-white text-ink-soft`}>{children}</span>;
}

function StatusPill({ kind }: { kind: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    open: { cls: "text-accent bg-accent/10", label: "Aperto" },
    work: { cls: "text-working bg-working/10", label: "In corso" },
    done: { cls: "text-[#5a8a3f] bg-[rgba(90,138,63,0.08)]", label: "Chiuso" },
  };
  const e = map[kind] ?? map.open;
  return (
    <span className={`rounded-full px-[6px] py-[2px] text-center text-[11px] font-medium uppercase tracking-[0.06em] sm:text-[9px] ${e.cls}`}>
      {e.label}
    </span>
  );
}

function WfInput({
  label,
  v,
  auto,
  hit,
  typing,
}: {
  label: string;
  v: string;
  auto?: boolean;
  hit?: string;
  typing?: boolean;
}) {
  return (
    <div
      className={useMockHitClass(hit, "mb-[10px] flex min-w-0 flex-col gap-1")}
      data-mock-hit={hit}
    >
      <span className="truncate font-mono text-[12px] uppercase tracking-[0.08em] text-ink-soft sm:text-[9px]">
        {label}
      </span>
      <div
        className={`flex min-w-0 items-baseline justify-between gap-2 rounded-lg px-[10px] py-[6px] font-mono text-[13px] text-ink sm:text-[11px] ${
          auto ? "bg-accent/[0.06]" : "bg-paper-2"
        }`}
      >
        <span className="min-w-0 truncate">
          {v || "—"}
          {typing ? <span className="mock-caret" /> : null}
        </span>
        {auto ? (
          <span className="shrink-0 text-[11px] tracking-[0.05em] text-accent sm:text-[9px]">AUTO</span>
        ) : null}
      </div>
    </div>
  );
}

function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th
      className={`truncate border-b border-hairline px-2 py-[7px] text-[12px] font-medium uppercase tracking-[0.1em] text-ink-soft sm:px-[14px] sm:text-[9px] ${
        right ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function Td({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <td
      className={`truncate px-2 py-[7px] sm:px-[14px] ${right ? "text-right" : "text-left"}`}
      style={right ? { fontVariantNumeric: "tabular-nums" } : undefined}
    >
      {children}
    </td>
  );
}

function TblPill({ kind }: { kind: string }) {
  const map: Record<string, string> = {
    Vinto: "text-[#5a8a3f] bg-[rgba(90,138,63,0.08)]",
    "In offerta": "text-working bg-working/10",
    Bozza: "text-ink-soft bg-paper-2",
  };
  const cls = map[kind] ?? map.Bozza;
  return (
    <span className={`inline-block rounded-full px-[6px] py-[2px] text-[11px] font-medium uppercase tracking-[0.06em] sm:text-[9px] ${cls}`}>
      {kind}
    </span>
  );
}
