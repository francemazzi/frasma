"use client";

import { Check } from "lucide-react";
import GrainMesh, { type GrainVariant } from "../atoms/GrainMesh";

type MockStageProps = {
  variant: GrainVariant;
  badge?: string;
  children: React.ReactNode;
  cursor?: boolean;
};

export function MockStage({
  variant,
  badge,
  children,
  cursor = true,
}: MockStageProps) {
  return (
    <div className="relative h-full min-h-[220px] overflow-hidden">
      <GrainMesh variant={variant} />
      {badge ? (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-medium text-ink">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-working align-middle" />
          {badge}
        </span>
      ) : null}
      <div className="relative z-[1] flex h-full min-h-0 items-stretch p-4 sm:p-6">
        <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border border-hairline-strong bg-white">
          {children}
        </div>
      </div>
      {cursor ? (
        <span
          className="pointer-events-none absolute bottom-7 right-9 z-10 h-6 w-6 rounded-full bg-[#f4a8c8]/70"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}

function WindowBar({ label }: { label: string }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 border-b border-hairline px-3 py-2">
      <span className="h-1.5 w-1.5 rounded-full bg-hairline-strong" />
      <span className="h-1.5 w-1.5 rounded-full bg-hairline-strong" />
      <span className="h-1.5 w-1.5 rounded-full bg-hairline-strong" />
      <span className="ml-2 font-mono text-[10px] tracking-[0.04em] text-ink-soft">
        {label}
      </span>
    </div>
  );
}

export function AgentMock({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex h-full min-h-0 flex-col">
        <WindowBar label="DDT · Mago / TeamSystem" />
        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
          <div className="min-w-0 overflow-hidden border-b border-hairline p-5 text-[12px] leading-[1.65] text-ink-2 sm:border-b-0 sm:border-r">
            <h6 className="mb-3 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-soft">
              Documento di trasporto · PDF
            </h6>
            <p className="mb-2 font-medium text-ink">
              DDT n. <HL>1842</HL> del <HL>12/05/2026</HL>
            </p>
            <p className="mb-2">
              Fornitore: <HL>Acciai Lombardi S.p.A.</HL>
            </p>
            <p>
              <HL>12 righe</HL> · imponibile <HL>€ 4.860,00</HL>
            </p>
          </div>
          <div className="flex min-w-0 flex-col overflow-hidden bg-paper-2 p-5">
            <h6 className="mb-3 flex justify-between font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-soft">
              <span>Dati per ERP</span>
              <span className="text-accent">● VALIDATO</span>
            </h6>
            <Field k="Numero DDT" v="1842" conf="0.99" />
            <Field k="Fornitore" v="Acciai Lombardi" conf="0.98" />
            <Field k="Data" v="12/05/2026" conf="0.99" last />
            <div className="mt-auto flex flex-wrap gap-2 pt-4">
              <BtnMini>Carica ERP</BtnMini>
              <BtnMini ghost>Modifica</BtnMini>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="DDT · Mago / TeamSystem" />
      <div className="grid min-h-0 flex-1 overflow-hidden sm:grid-cols-[minmax(0,1fr)_200px]">
        <div className="min-w-0 overflow-hidden border-b border-hairline p-4 text-[11px] leading-[1.6] text-ink-2 sm:border-b-0 sm:border-r">
          <h6 className="mb-3 border-b border-hairline pb-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-soft">
            Documento di trasporto · PDF
          </h6>
          <p className="mb-2 text-[11.5px] font-medium text-ink">
            DDT n. <HL>1842</HL> del <HL>12/05/2026</HL>
          </p>
          <p className="mb-2 text-[11.5px]">
            Fornitore: <HL>Acciai Lombardi S.p.A.</HL>. Destinazione:{" "}
            <HL>Magazzino centrale</HL>.
          </p>
          <p className="mb-2 text-[11.5px]">
            <HL>12 righe articolo</HL>, imponibile <HL>€ 4.860,00</HL>.
          </p>
          <p className="text-[10.5px] text-ink-soft">
            Dati letti dal PDF, pronti per la validazione.
          </p>
        </div>
        <div className="flex min-w-0 flex-col overflow-hidden bg-paper-2 p-[14px]">
          <h6 className="mb-2 flex justify-between border-b border-hairline pb-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-soft">
            <span>Dati per ERP</span>
            <span className="tracking-[0.08em] text-accent">● VALIDATO</span>
          </h6>
          <Field k="Numero DDT" v="1842" conf="0.99" />
          <Field k="Fornitore" v="Acciai Lombardi" conf="0.98" />
          <Field k="Data" v="12/05/2026" conf="0.99" />
          <Field k="Righe" v="12 articoli" conf="0.96" />
          <Field k="Totale" v="€ 4.860,00" conf="0.94" last />
          <div className="mt-auto flex flex-wrap gap-2 pt-3">
            <BtnMini>Carica ERP</BtnMini>
            <BtnMini ghost>Modifica</BtnMini>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TicketsMock() {
  const rows = [
    { pri: "high", id: "FRIGO-4129", site: "Coop · cella -22°C", status: "open", own: "MR" },
    { pri: "med", id: "FRIGO-4127", site: "Caseificio · evaporatore", status: "work", own: "AC" },
    { pri: "high", id: "FRIGO-4126", site: "Gelateria · compressore", status: "work", own: "MR" },
    { pri: "low", id: "FRIGO-4120", site: "Mercato · tarature", status: "done", own: "FB" },
  ] as const;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="Operations · tickets" />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex items-center gap-[6px] border-b border-hairline px-4 py-2 font-mono text-[10px] tracking-[0.06em] text-ink-soft">
          <ChipMini on>Tutti</ChipMini>
          <ChipMini>Aperti</ChipMini>
          <ChipMini red>Critici · 3</ChipMini>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.id}
            className={`grid grid-cols-[12px_1fr_72px_24px] items-center gap-[10px] px-[14px] py-2 font-mono text-[10.5px] ${
              i === rows.length - 1 ? "" : "border-b border-hairline"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                r.pri === "high"
                  ? "bg-accent"
                  : r.pri === "med"
                    ? "bg-working"
                    : "bg-[#6a8a3a]"
              }`}
            />
            <span className="truncate text-ink">
              <span className="mr-2 font-medium text-accent">{r.id}</span>
              {r.site}
            </span>
            <StatusPill kind={r.status} />
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-ink text-[9px] text-paper">
              {r.own}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorkflowMock() {
  const steps = [
    { n: "1", name: "Dati stabilimento", state: "done" },
    { n: "2", name: "Diagramma flusso", state: "done" },
    { n: "3", name: "Pericoli identificati", state: "done" },
    { n: "4", name: "CCP · monitoraggio", state: "active" },
    { n: "5", name: "Azioni correttive", state: "" },
    { n: "6", name: "Allegati e firme", state: "" },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="HACCP · PROC-04" />
      <div className="grid min-h-0 flex-1 overflow-hidden sm:grid-cols-[190px_minmax(0,1fr)]">
        <div className="flex w-full flex-col gap-[4px] border-b border-hairline bg-paper-2 p-[14px] sm:w-[190px] sm:border-b-0 sm:border-r">
          {steps.map((s) => (
            <div
              key={s.name}
              className={`grid grid-cols-[18px_1fr] items-center gap-2 rounded-lg px-2 py-[7px] font-mono text-[10.5px] ${
                s.state === "done"
                  ? "bg-accent/[0.06] text-ink"
                  : s.state === "active"
                    ? "bg-white text-ink"
                    : "text-ink-soft"
              }`}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] leading-none ${
                  s.state === "done"
                    ? "bg-accent text-white"
                    : "border border-hairline-strong text-ink-soft"
                }`}
              >
                {s.state === "done" ? <Check size={10} aria-hidden="true" /> : s.n}
              </span>
              <span className="text-[10.5px]">{s.name}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h6 className="mb-3 flex justify-between border-b border-hairline pb-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-soft">
            <span>CCP · monitoraggio</span>
            <span className="text-accent">4 / 6</span>
          </h6>
          <WfInput label="CCP-02 · Stoccaggio" v="≤ 4°C — controllo giornaliero" auto />
          <WfInput label="CCP-03 · Cottura" v="≥ 75°C al cuore — per lotto" auto />
          <WfInput label="CCP-04 · Confezionamento" v="tracciabilità + sigillo" />
        </div>
      </div>
    </div>
  );
}

export function PreventiviMock() {
  const rows = [
    { id: "P-26-038", cli: "Officine R.", mat: "Inox 2 mm", eur: "4.860", st: "Vinto" },
    { id: "P-26-039", cli: "FerMec spa", mat: "Acc. galv. 3 mm", eur: "11.220", st: "In offerta" },
    { id: "P-26-040", cli: "Carrozz. P.", mat: "Alluminio 1,5", eur: "3.190", st: "In offerta" },
    { id: "P-26-041", cli: "Studio L.", mat: "Inox 4 mm", eur: "9.870", st: "Bozza" },
  ];
  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="Preventivi · Q1" />
      <div className="flex-1 overflow-x-auto">
        <table className="w-full border-collapse font-mono text-[10.5px]">
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
              <tr key={r.id} className="border-b border-hairline">
                <Td>
                  <span className="text-accent">{r.id}</span>
                </Td>
                <Td>{r.cli}</Td>
                <Td>{r.mat}</Td>
                <Td right>{r.eur}</Td>
                <Td>
                  <TblPill kind={r.st} />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HL({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="px-[2px]"
      style={{
        background: "rgba(105,85,123,0.14)",
        borderBottom: "1px dotted #69557B",
      }}
    >
      {children}
    </span>
  );
}

function Field({
  k,
  v,
  conf,
  last,
}: {
  k: string;
  v: string;
  conf: string;
  last?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-[2px] py-2 ${last ? "" : "border-b border-hairline"}`}>
      <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink-soft">{k}</span>
      <span className="flex items-baseline justify-between font-mono text-[11.5px] font-medium text-ink">
        <span>{v}</span>
        <span className="text-[9px] tracking-[0.06em] text-accent">{conf}</span>
      </span>
    </div>
  );
}

function BtnMini({ children, ghost }: { children: React.ReactNode; ghost?: boolean }) {
  return (
    <span
      className={`rounded-full px-[10px] py-[5px] font-mono text-[10px] uppercase tracking-[0.06em] ${
        ghost
          ? "border border-hairline-strong bg-transparent text-ink"
          : "bg-ink text-paper"
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
  const base = "rounded-full px-2 py-[3px] text-[9.5px] uppercase tracking-[0.06em]";
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
    <span className={`rounded-full px-[6px] py-[2px] text-center text-[9px] font-medium uppercase tracking-[0.06em] ${e.cls}`}>
      {e.label}
    </span>
  );
}

function WfInput({ label, v, auto }: { label: string; v: string; auto?: boolean }) {
  return (
    <div className="mb-[10px] flex flex-col gap-1">
      <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink-soft">{label}</span>
      <div
        className={`flex items-baseline justify-between rounded-lg px-[10px] py-[6px] font-mono text-[11px] text-ink ${
          auto ? "bg-accent/[0.06]" : "bg-paper-2"
        }`}
      >
        <span>{v}</span>
        {auto ? <span className="text-[9px] tracking-[0.05em] text-accent">AUTO</span> : null}
      </div>
    </div>
  );
}

function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th
      className={`border-b border-hairline px-[14px] py-[7px] text-[9px] font-medium uppercase tracking-[0.1em] text-ink-soft ${
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
      className={`px-[14px] py-[7px] ${right ? "text-right" : "text-left"}`}
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
    <span className={`inline-block rounded-full px-[6px] py-[2px] text-[9px] font-medium uppercase tracking-[0.06em] ${cls}`}>
      {kind}
    </span>
  );
}
