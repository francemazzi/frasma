"use client";

import { MockHit, useMockHitClass, useMockPlayback, type MockStep } from "../atoms/MockScene";
import { MockStatusBadge } from "../organism/productMocks";

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

type ServerState = {
  model: "spento" | "locale";
  erp: "offline" | "interconnesso";
};

const SERVER_INITIAL: ServerState = { model: "spento", erp: "offline" };
const SERVER_COMPLETE: ServerState = { model: "locale", erp: "interconnesso" };
const SERVER_STEPS: MockStep<ServerState>[] = [
  { type: "wait", ms: 360 },
  { type: "move", to: "srv-avvia" },
  { type: "click" },
  { type: "set", patch: { model: "locale" } },
  { type: "wait", ms: 380 },
  { type: "move", to: "srv-erp" },
  { type: "click" },
  { type: "set", patch: { erp: "interconnesso" } },
  { type: "wait", ms: 900 },
];

export function OnPremServerMock() {
  const { state } = useMockPlayback(SERVER_INITIAL, SERVER_COMPLETE, SERVER_STEPS);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="AI on-premise · GPU" />
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-4">
        <Row
          label="Modello"
          value={state.model === "locale" ? "Qwen 32B · locale" : "Spento"}
          ok={state.model === "locale"}
        />
        <Row
          label="ERP / MES"
          value={state.erp === "interconnesso" ? "API attive" : "Non collegato"}
          ok={state.erp === "interconnesso"}
        />
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <MockHit id="srv-avvia">
            <MiniBtn on={state.model === "locale"}>
              {state.model === "locale" ? "Modello attivo" : "Avvia modello"}
            </MiniBtn>
          </MockHit>
          <MockHit id="srv-erp">
            <MiniBtn on={state.erp === "interconnesso"} ghost={state.erp !== "interconnesso"}>
              {state.erp === "interconnesso" ? "Interconnesso" : "Collega ERP"}
            </MiniBtn>
          </MockHit>
        </div>
      </div>
    </div>
  );
}

type BackupState = {
  plan: boolean;
  run: boolean;
};

const BACKUP_INITIAL: BackupState = { plan: false, run: false };
const BACKUP_COMPLETE: BackupState = { plan: true, run: true };
const BACKUP_STEPS: MockStep<BackupState>[] = [
  { type: "wait", ms: 360 },
  { type: "move", to: "bk-piano" },
  { type: "click" },
  { type: "set", patch: { plan: true } },
  { type: "wait", ms: 340 },
  { type: "move", to: "bk-run" },
  { type: "click" },
  { type: "set", patch: { run: true } },
  { type: "wait", ms: 900 },
];

export function CloudBackupMock() {
  const { state } = useMockPlayback(BACKUP_INITIAL, BACKUP_COMPLETE, BACKUP_STEPS);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="Backup · tenant accreditato" />
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-4">
        <Row
          label="Piano"
          value={state.plan ? "Notturno · 30 giorni" : "Nessun piano"}
          ok={state.plan}
        />
        <Row
          label="Ultimo job"
          value={state.run ? "Completato · 02:14" : "In attesa"}
          ok={state.run}
        />
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <MockHit id="bk-piano">
            <MiniBtn on={state.plan}>{state.plan ? "Piano attivo" : "Scegli piano"}</MiniBtn>
          </MockHit>
          <MockHit id="bk-run">
            <MiniBtn on={state.run} ghost={!state.run}>
              {state.run ? "Backup ok" : "Esegui ora"}
            </MiniBtn>
          </MockHit>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  ok,
}: {
  label: string;
  value: string;
  ok: boolean;
}) {
  const className = useMockHitClass(
    undefined,
    "flex min-w-0 items-baseline justify-between gap-3 border-b border-hairline py-2 font-mono text-[13px] sm:text-[11px]",
  );

  return (
    <div className={className}>
      <span className="truncate uppercase tracking-[0.08em] text-ink-soft">{label}</span>
      <span className={`truncate font-medium ${ok ? "text-accent" : "text-ink"}`}>{value}</span>
    </div>
  );
}

function MiniBtn({
  children,
  on,
  ghost,
}: {
  children: React.ReactNode;
  on?: boolean;
  ghost?: boolean;
}) {
  return (
    <span
      className={`inline-block rounded-full px-[10px] py-[5px] font-mono text-[12px] uppercase tracking-[0.06em] sm:text-[10px] ${
        on
          ? "bg-ink text-paper"
          : ghost
            ? "border border-hairline-strong bg-white/80 text-ink"
            : "bg-ink text-paper"
      }`}
    >
      {children}
    </span>
  );
}
