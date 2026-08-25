"use client";

import {
  Check,
  CheckCircle2,
  Database,
  FileSearch,
  History,
  UserCheck,
} from "lucide-react";
import { useT } from "../../lib/i18n/context";
import { BentoCard, BentoGrid } from "../atoms/Bento";
import { Reveal, RevealGroup, RevealItem, RevealLine } from "../atoms/Reveal";

const FLOW_STEPS = [
  { icon: FileSearch, title: "flow.step1.title", desc: "flow.step1.desc" },
  { icon: CheckCircle2, title: "flow.step2.title", desc: "flow.step2.desc" },
  { icon: UserCheck, title: "flow.step3.title", desc: "flow.step3.desc" },
  { icon: Database, title: "flow.step4.title", desc: "flow.step4.desc" },
  { icon: History, title: "flow.step5.title", desc: "flow.step5.desc" },
] as const;

export default function Platform() {
  const t = useT();

  return (
    <section id="come-funziona" className="ed-section">
      <div className="section-farm">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
          <div className="ed-kicker">{t("flow.eyebrow")}</div>
          <h2 className="ed-title">{t("flow.title")}</h2>
          <p className="ed-intro mx-auto mt-6">{t("flow.subtitle")}</p>
        </Reveal>

        <FlowRail t={t} />

        <Reveal className="mx-auto mb-10 mt-24 max-w-3xl text-center sm:mb-12 sm:mt-32">
          <div className="ed-kicker">{t("useCases.eyebrow")}</div>
          <h2 className="ed-title">{t("useCases.title")}</h2>
          <p className="ed-intro mx-auto mt-6">{t("useCases.subtitle")}</p>
        </Reveal>

        <RevealGroup stagger={0.12}>
          <BentoGrid>
            <RevealItem index={0} className="lg:col-span-2">
              <BentoCard
                className="h-full"
                name={t("platform.cards.agent.name")}
                description={t("platform.cards.agent.desc")}
                href="/servizi/ddt-erp"
                cta={t("platform.cards.cta")}
                background={<AgentMock />}
              />
            </RevealItem>
            <RevealItem index={1} className="lg:col-span-1">
              <BentoCard
                className="h-full"
                name={t("platform.cards.tickets.name")}
                description={t("platform.cards.tickets.desc")}
                href="/servizi/ticketing-manutenzione"
                cta={t("platform.cards.cta")}
                background={<TicketsMock />}
              />
            </RevealItem>
            <RevealItem index={2} className="lg:col-span-1">
              <BentoCard
                className="h-full"
                name={t("platform.cards.workflow.name")}
                description={t("platform.cards.workflow.desc")}
                href="/servizi/procedure-guidate"
                cta={t("platform.cards.cta")}
                background={<WorkflowMock />}
              />
            </RevealItem>
            <RevealItem index={3} className="lg:col-span-2">
              <BentoCard
                className="h-full"
                name={t("platform.cards.preventivi.name")}
                description={t("platform.cards.preventivi.desc")}
                href="/servizi/software-operativo"
                cta={t("platform.cards.cta")}
                background={<PreventiviMock />}
              />
            </RevealItem>
          </BentoGrid>
        </RevealGroup>
      </div>
    </section>
  );
}

/* ── Flow rail ─────────────────────────────────────────── */

function FlowRail({ t }: { t: (key: string) => string }) {
  return (
    <div className="relative">
      <div
        className="absolute left-[19px] top-4 bottom-4 w-px bg-hairline-strong lg:left-0 lg:right-0 lg:top-[19px] lg:bottom-auto lg:h-px lg:w-auto"
        aria-hidden="true"
      />
      <RevealLine className="absolute left-[19px] top-4 bottom-4 w-px bg-accent/45 lg:left-0 lg:right-0 lg:top-[19px] lg:bottom-auto lg:h-px lg:w-auto" />

      <RevealGroup
        as="ol"
        stagger={0.12}
        className="relative grid grid-cols-1 gap-7 lg:grid-cols-5 lg:gap-6"
      >
        {FLOW_STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <RevealItem
              as="li"
              key={step.title}
              index={index}
              className="grid grid-cols-[40px_minmax(0,1fr)] items-start gap-4 lg:block"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline-strong bg-paper text-accent">
                <Icon size={18} aria-hidden="true" />
              </span>
              <div className="lg:mt-5 lg:pr-4">
                <span className="mb-1 block text-[11px] font-semibold tracking-[0.1em] text-ink-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-1.5 text-[17px] font-semibold tracking-[-0.03em] text-ink">
                  {t(step.title)}
                </h3>
                <p className="max-w-[38ch] text-[14px] leading-[1.55] text-ink-soft">
                  {t(step.desc)}
                </p>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}

/* ── shared chrome ─────────────────────────────────────── */

function MockHead({ label, em, meta }: { label: string; em: string; meta: string }) {
  return (
    <div className="grid grid-cols-[10px_1fr_auto] gap-3 items-center px-[14px] py-[10px] bg-ink text-paper font-mono text-[10.5px] tracking-[0.06em]">
      <span
        className="w-2 h-2 rounded-full bg-[#6fbf5a]"
        style={{ boxShadow: "0 0 0 3px rgba(111,191,90,0.25)" }}
      />
      <span className="tracking-[0.1em]">
        {label} <em className="not-italic text-white/55 tracking-[0.06em]">{em}</em>
      </span>
      <span className="text-white/55 text-[10px] tracking-[0.06em] uppercase">{meta}</span>
    </div>
  );
}

function MockShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full bg-[#FBF6E5] overflow-hidden flex flex-col">
      {children}
    </div>
  );
}

/* ── 1: Delivery note extraction ───────────────────────── */

function AgentMock() {
  return (
    <MockShell>
      <MockHead label="DDT · ACQUISIZIONE" em="Mago / TeamSystem" meta="RUN · 00:18" />
      <div className="flex flex-col sm:flex-row flex-1">
        <div className="flex-1 p-4 bg-white border-b sm:border-b-0 sm:border-r border-hairline-strong font-serif text-[11px] leading-[1.6] text-ink-2">
          <h6 className="font-mono text-[9.5px] text-ink-soft tracking-[0.12em] uppercase mb-3 pb-2 border-b border-hairline">
            Documento di trasporto · PDF · pag. 1/1
          </h6>
          <p className="mb-2 text-[11.5px] font-medium text-ink">
            DDT n. <HL>1842</HL> del <HL>12/05/2026</HL>
          </p>
          <p className="mb-2 text-[11.5px]">
            Fornitore: <HL>Acciai Lombardi S.p.A.</HL>. Destinazione:{" "}
            <HL>Magazzino centrale</HL>.
          </p>
          <p className="mb-2 text-[11.5px]">
            <HL>12 righe articolo</HL>, imponibile <HL>€ 4.860,00</HL>. Ordine collegato{" "}
            <HL>OA-2026-391</HL>.
          </p>
          <p className="text-ink-soft text-[10.5px]">
            Dati letti dal PDF e pronti per la validazione prima del caricamento in ERP.
          </p>
        </div>
        <div className="w-full sm:w-[220px] p-[14px] bg-paper-2 flex flex-col">
          <h6 className="font-mono text-[9.5px] text-ink-soft tracking-[0.12em] uppercase mb-2 pb-2 border-b border-hairline flex justify-between">
            <span>Dati per ERP</span>
            <span className="text-[#5a8a3f] tracking-[0.08em]">● VALIDATO</span>
          </h6>
          <Field k="Numero DDT" v="1842" conf="0.99" />
          <Field k="Fornitore" v="Acciai Lombardi" conf="0.98" />
          <Field k="Data" v="12/05/2026" conf="0.99" />
          <Field k="Righe" v="12 articoli" conf="0.96" />
          <Field k="Totale" v="€ 4.860,00" conf="0.94" last />
          <div className="mt-auto pt-3 flex gap-2">
            <BtnMini>Carica ERP</BtnMini>
            <BtnMini ghost>Modifica</BtnMini>
          </div>
        </div>
      </div>
    </MockShell>
  );
}

function HL({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="px-[2px]"
      style={{
        background: "rgba(168,65,43,0.16)",
        borderBottom: "1px dotted #A8412B",
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
  warn,
  last,
}: {
  k: string;
  v: string;
  conf: string;
  warn?: boolean;
  last?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-[2px] py-2 ${last ? "" : "border-b border-hairline"}`}>
      <span className="font-mono text-[9px] text-ink-soft tracking-[0.08em] uppercase">{k}</span>
      <span className="font-mono text-[11.5px] text-ink font-medium flex justify-between items-baseline">
        <span>{v}</span>
        <span
          className={`text-[9px] tracking-[0.06em] ${warn ? "text-[#b07a1a]" : "text-[#5a8a3f]"}`}
        >
          {conf}
        </span>
      </span>
    </div>
  );
}

function BtnMini({ children, ghost }: { children: React.ReactNode; ghost?: boolean }) {
  return (
    <span
      className={`font-mono text-[10px] tracking-[0.06em] uppercase px-[10px] py-[5px] border border-ink ${
        ghost ? "bg-transparent text-ink" : "bg-ink text-paper"
      }`}
    >
      {children}
    </span>
  );
}

/* ── 2: Tickets dashboard ─────────────────────────────── */

function TicketsMock() {
  const rows = [
    { pri: "high", id: "FRIGO-4129", site: "Coop · cella -22°C · sbrinatore", status: "open", own: "MR" },
    { pri: "med", id: "FRIGO-4127", site: "Caseificio M. · evaporatore", status: "work", own: "AC" },
    { pri: "high", id: "FRIGO-4126", site: "Gelateria Q. · compressore #2", status: "work", own: "MR" },
    { pri: "low", id: "FRIGO-4120", site: "Mercato · tarature termo", status: "done", own: "FB" },
    { pri: "low", id: "FRIGO-4118", site: "Cantine · manutenzione prog.", status: "done", own: "FB" },
  ] as const;

  return (
    <MockShell>
      <MockHead label="OPERATIONS · TICKETS" em="field service" meta="12 APERTI · 4 IN LAVORO" />
      <div className="px-4 py-2 border-b border-hairline flex gap-[6px] items-center font-mono text-[10px] text-ink-soft tracking-[0.06em]">
        <ChipMini on>Tutti</ChipMini>
        <ChipMini>Aperti</ChipMini>
        <ChipMini>SLA &lt; 24h</ChipMini>
        <ChipMini red>Critici · 3</ChipMini>
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-[12px_70px_1fr_80px_24px] gap-[10px] items-center px-[14px] py-[7px] bg-paper-2 font-mono text-[9px] text-ink-soft tracking-[0.1em] uppercase">
          <span />
          <span>ID</span>
          <span>Sito · Intervento</span>
          <span>Stato</span>
          <span>Op.</span>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.id}
            className={`grid grid-cols-[12px_70px_1fr_80px_24px] gap-[10px] items-center px-[14px] py-2 font-mono text-[10.5px] ${
              i === rows.length - 1 ? "" : "border-b border-hairline"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                r.pri === "high"
                  ? "bg-accent"
                  : r.pri === "med"
                    ? "bg-[#c89234]"
                    : "bg-[#6a8a3a]"
              }`}
            />
            <span className="text-accent font-medium tracking-[0.04em]">{r.id}</span>
            <span className="text-ink truncate">{r.site}</span>
            <StatusPill kind={r.status} />
            <span className="w-[22px] h-[22px] rounded-full bg-ink text-paper text-[9px] flex items-center justify-center">
              {r.own}
            </span>
          </div>
        ))}
      </div>
    </MockShell>
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
  const base = "px-2 py-[3px] border tracking-[0.06em] uppercase text-[9.5px]";
  if (on) return <span className={`${base} bg-ink text-paper border-ink`}>{children}</span>;
  if (red) return <span className={`${base} text-accent border-accent bg-white`}>{children}</span>;
  return <span className={`${base} bg-white text-ink-soft border-hairline-strong`}>{children}</span>;
}

function StatusPill({ kind }: { kind: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    open: { cls: "text-accent border-accent", label: "Aperto" },
    work: { cls: "text-[#b07a1a] border-[#b07a1a]", label: "In corso" },
    done: { cls: "text-[#5a8a3f] border-[#5a8a3f] bg-[rgba(90,138,63,0.06)]", label: "Chiuso" },
  };
  const e = map[kind] ?? map.open;
  return (
    <span
      className={`px-[6px] py-[2px] border text-[9px] tracking-[0.06em] uppercase font-medium text-center ${e.cls}`}
    >
      {e.label}
    </span>
  );
}

/* ── 3: HACCP workflow ────────────────────────────────── */

function WorkflowMock() {
  const steps = [
    { n: "1", name: "Dati stabilimento", state: "done" },
    { n: "2", name: "Diagramma flusso", state: "done" },
    { n: "3", name: "Pericoli identificati", state: "done" },
    { n: "4", name: "CCP · monitoraggio", state: "active" },
    { n: "5", name: "Azioni correttive", state: "" },
    { n: "6", name: "Allegati e firme", state: "" },
  ];

  return (
    <MockShell>
      <MockHead label="HACCP · MANUALE" em="autocontrollo" meta="REV 2025.11 · PROC-04" />
      <div className="flex flex-col sm:flex-row flex-1">
        <div className="w-full sm:w-[200px] p-[14px] bg-paper-2 flex flex-col gap-[4px] border-b sm:border-b-0 sm:border-r border-hairline-strong">
          <h6 className="font-mono text-[9.5px] text-ink-soft tracking-[0.12em] uppercase mb-2">
            Sezioni
          </h6>
          {steps.map((s) => (
            <div
              key={s.name}
              className={`grid grid-cols-[18px_1fr] gap-2 px-2 py-[7px] font-mono text-[10.5px] items-center border ${
                s.state === "done"
                  ? "bg-[rgba(90,138,63,0.08)] border-[rgba(90,138,63,0.4)]"
                  : s.state === "active"
                    ? "border-ink bg-paper-3"
                    : "bg-white border-hairline"
              }`}
            >
              <span
                className={`w-4 h-4 border flex items-center justify-center text-[10px] leading-none ${
                  s.state === "done"
                    ? "text-[#5a8a3f] border-[#5a8a3f] bg-white"
                    : "text-ink-soft border-ink-soft"
                }`}
              >
                {s.state === "done" ? <Check size={10} aria-hidden="true" /> : s.n}
              </span>
              <span className="text-ink text-[10.5px]">{s.name}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 p-4 flex flex-col">
          <h6 className="font-mono text-[9.5px] text-ink-soft tracking-[0.12em] uppercase mb-3 pb-2 border-b border-hairline flex justify-between">
            <span>CCP · monitoraggio</span>
            <span className="text-accent">4 / 6</span>
          </h6>
          <WfInput label="CCP-02 · Stoccaggio refrigerato" v="≤ 4°C — controllo giornaliero" auto />
          <WfInput label="CCP-03 · Cottura" v="≥ 75°C al cuore — per lotto" auto />
          <WfInput label="CCP-04 · Confezionamento" v="tracciabilità + sigillo" />
          <div className="mt-auto pt-3 flex gap-2">
            <BtnMini>Genera PDF</BtnMini>
            <BtnMini ghost>Salva bozza</BtnMini>
          </div>
        </div>
      </div>
    </MockShell>
  );
}

function WfInput({ label, v, auto }: { label: string; v: string; auto?: boolean }) {
  return (
    <div className="flex flex-col gap-1 mb-[10px]">
      <span className="font-mono text-[9px] text-ink-soft tracking-[0.08em] uppercase">{label}</span>
      <div
        className={`border px-[10px] py-[6px] font-mono text-[11px] text-ink flex justify-between items-baseline ${
          auto
            ? "bg-[rgba(90,138,63,0.06)] border-[rgba(90,138,63,0.4)]"
            : "bg-white border-hairline-strong"
        }`}
      >
        <span>{v}</span>
        {auto ? <span className="text-[9px] text-[#5a8a3f] tracking-[0.05em]">AUTO</span> : null}
      </div>
    </div>
  );
}

/* ── 4: Preventivi table ──────────────────────────────── */

function PreventiviMock() {
  const rows = [
    { id: "P-26-038", cli: "Officine R.", mat: "Inox 2 mm", qt: "120", eur: "4.860", st: "Vinto" },
    { id: "P-26-039", cli: "FerMec spa", mat: "Acc. galv. 3 mm", qt: "340", eur: "11.220", st: "In offerta" },
    { id: "P-26-040", cli: "Carrozz. P.", mat: "Alluminio 1,5", qt: "85", eur: "3.190", st: "In offerta" },
    { id: "P-26-041", cli: "Studio L.", mat: "Inox 4 mm", qt: "220", eur: "9.870", st: "Bozza" },
  ];
  return (
    <MockShell>
      <MockHead label="PREVENTIVI · 2026" em="lamiere" meta="Q1 · 18 OFFERTE" />
      <div className="flex-1">
        <table className="w-full border-collapse font-mono text-[10.5px]">
          <thead>
            <tr className="bg-paper-2">
              <Th>N°</Th>
              <Th>Cliente</Th>
              <Th>Materiale</Th>
              <Th right>Qt</Th>
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
                <Td right>{r.qt}</Td>
                <Td right>{r.eur}</Td>
                <Td>
                  <TblPill kind={r.st} />
                </Td>
              </tr>
            ))}
            <tr className="bg-[rgba(168,65,43,0.04)]">
              <td colSpan={4} className="px-[14px] py-[10px] border-t-2 border-ink font-medium text-ink">
                Totale Q1
              </td>
              <td
                className="px-[14px] py-[10px] border-t-2 border-ink text-right font-medium text-ink text-[12px]"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                29.140
              </td>
              <td className="px-[14px] py-[10px] border-t-2 border-ink" />
            </tr>
          </tbody>
        </table>
      </div>
    </MockShell>
  );
}

function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th
      className={`px-[14px] py-[7px] text-[9px] text-ink-soft tracking-[0.1em] uppercase font-medium border-b border-hairline ${
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
    Vinto: "text-[#5a8a3f] border-[#5a8a3f] bg-[rgba(90,138,63,0.06)]",
    "In offerta": "text-[#b07a1a] border-[#b07a1a]",
    Bozza: "text-ink-soft border-hairline-strong",
  };
  const cls = map[kind] ?? map.Bozza;
  return (
    <span
      className={`inline-block px-[6px] py-[2px] border text-[9px] tracking-[0.06em] uppercase font-medium ${cls}`}
    >
      {kind}
    </span>
  );
}
