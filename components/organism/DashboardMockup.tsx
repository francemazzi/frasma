"use client";

import { AlertTriangle, CheckCircle2, Clock, Settings2 } from "lucide-react";
import { useMockPlayback, type MockStep } from "../atoms/MockScene";
import { MockStage, MockStatusBadge } from "./productMocks";

type DashState = {
  attive: string;
  attesa: string;
  ontime: string;
  waiting: "wait" | "prod";
};

const DASH_INITIAL: DashState = {
  attive: "",
  attesa: "",
  ontime: "",
  waiting: "wait",
};

const DASH_COMPLETE: DashState = {
  attive: "12",
  attesa: "2",
  ontime: "94%",
  waiting: "prod",
};

const DASH_STEPS: MockStep<DashState>[] = [
  { type: "wait", ms: 360 },
  { type: "move", to: "stat-attive" },
  { type: "click" },
  { type: "type", key: "attive", text: "12", msPerChar: 70 },
  { type: "move", to: "stat-attesa" },
  { type: "click" },
  { type: "type", key: "attesa", text: "3", msPerChar: 80 },
  { type: "move", to: "stat-ontime" },
  { type: "click" },
  { type: "type", key: "ontime", text: "94%", msPerChar: 55 },
  { type: "move", to: "row-wait" },
  { type: "click" },
  { type: "set", patch: { waiting: "prod", attesa: "2" } },
  { type: "wait", ms: 800 },
];

export default function DashboardMockup() {
  return (
    <div className="relative mx-auto mt-10 h-[420px] w-full max-w-[380px] overflow-hidden rounded-3xl border border-hairline-strong lg:absolute lg:right-12 lg:top-1/2 lg:mx-0 lg:mt-0 lg:-translate-y-1/2">
      <MockStage variant="mist" badge="In corso">
        <DashboardScene />
      </MockStage>
    </div>
  );
}

function DashboardScene() {
  const { state, typingKey } = useMockPlayback(DASH_INITIAL, DASH_COMPLETE, DASH_STEPS);
  const waitingProd = state.waiting === "prod";

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-hairline px-4 py-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#f4a8c8] shadow-[0_0_8px_rgba(244,168,200,0.85)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#f0d4a8] shadow-[0_0_8px_rgba(240,212,168,0.7)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#c9b5e0] shadow-[0_0_8px_rgba(201,181,224,0.75)]" />
        <span className="ml-2 flex min-w-0 items-center gap-1.5 truncate font-mono text-[10px] text-ink-soft">
          <Settings2 size={10} />
          La tua azienda
        </span>
        <MockStatusBadge className="ml-auto" />
      </div>

      <div className="flex items-center justify-between px-4 pb-1 pt-3">
        <p className="text-[11px] font-medium text-ink">Il tuo software</p>
        <span className="rounded-full bg-paper-2 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-accent">
          Customizzato
        </span>
      </div>

      <div className="mx-3 mb-3 grid grid-cols-3 gap-2">
        <Stat
          hit="stat-attive"
          value={state.attive}
          label="Attive"
          tone="text-accent"
          typing={typingKey === "attive"}
        />
        <Stat
          hit="stat-attesa"
          value={state.attesa}
          label="In attesa"
          tone="text-working"
          typing={typingKey === "attesa"}
        />
        <Stat
          hit="stat-ontime"
          value={state.ontime}
          label="On time"
          tone="text-ink"
          typing={typingKey === "ontime"}
        />
      </div>

      <div className="space-y-2 px-3 pb-2">
        <div className="flex items-center gap-3 rounded-lg bg-paper-2 px-3 py-2.5">
          <CheckCircle2 size={14} className="shrink-0 text-accent" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-28 rounded bg-hairline-strong" />
            <div className="h-2 w-16 rounded bg-hairline" />
          </div>
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
            Completato
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-paper-2 px-3 py-2.5">
          <Clock size={14} className="shrink-0 text-working" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-32 rounded bg-hairline-strong" />
            <div className="h-2 w-14 rounded bg-hairline" />
          </div>
          <span className="rounded-full bg-working/10 px-2 py-0.5 text-[10px] font-medium text-working">
            In produzione
          </span>
        </div>
        <div
          data-mock-hit="row-wait"
          className="flex items-center gap-3 rounded-lg bg-paper-2 px-3 py-2.5"
        >
          {waitingProd ? (
            <Clock size={14} className="shrink-0 text-working" />
          ) : (
            <AlertTriangle size={14} className="shrink-0 text-ink-soft" />
          )}
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-24 rounded bg-hairline-strong" />
            <div className="h-2 w-12 rounded bg-hairline" />
          </div>
          {waitingProd ? (
            <span className="rounded-full bg-working/10 px-2 py-0.5 text-[10px] font-medium text-working">
              In produzione
            </span>
          ) : (
            <span className="rounded-full bg-paper px-2 py-0.5 text-[10px] font-medium text-ink-soft">
              In attesa
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({
  hit,
  value,
  label,
  tone,
  typing,
}: {
  hit: string;
  value: string;
  label: string;
  tone: string;
  typing: boolean;
}) {
  return (
    <div data-mock-hit={hit} className="rounded-lg bg-paper-2 px-3 py-2.5 text-center">
      <p className={`text-lg font-medium ${tone}`}>
        {value || "__"}
        {typing ? <span className="mock-caret" /> : null}
      </p>
      <p className="text-[10px] text-ink-soft">{label}</p>
    </div>
  );
}
