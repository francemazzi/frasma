"use client";

import { MockHit, useMockHitClass, useMockPlayback, type MockStep } from "../atoms/MockScene";
import { BtnMini, ChipMini, StatusPill, WindowBar } from "./productMocks";

type ChannelState = {
  emailOpen: boolean;
  callOpen: boolean;
  ticket: boolean;
  tech: string;
  supplier: string;
};

const CHANNEL_INITIAL: ChannelState = {
  emailOpen: false,
  callOpen: false,
  ticket: false,
  tech: "",
  supplier: "",
};

const CHANNEL_COMPLETE: ChannelState = {
  emailOpen: true,
  callOpen: true,
  ticket: true,
  tech: "Marco R.",
  supplier: "Freddo Parts",
};

const CHANNEL_STEPS: MockStep<ChannelState>[] = [
  { type: "wait", ms: 320 },
  { type: "move", to: "ch-email" },
  { type: "click" },
  { type: "set", patch: { emailOpen: true } },
  { type: "wait", ms: 360 },
  { type: "move", to: "ch-call" },
  { type: "click" },
  { type: "set", patch: { callOpen: true } },
  { type: "wait", ms: 420 },
  { type: "move", to: "ch-open" },
  { type: "click" },
  { type: "set", patch: { ticket: true } },
  { type: "wait", ms: 280 },
  { type: "move", to: "ch-tech" },
  { type: "click" },
  { type: "set", patch: { tech: "Marco R." } },
  { type: "move", to: "ch-supplier" },
  { type: "click" },
  { type: "set", patch: { supplier: "Freddo Parts" } },
  { type: "wait", ms: 800 },
];

export function ChannelMergeMock() {
  const { state } = useMockPlayback(CHANNEL_INITIAL, CHANNEL_COMPLETE, CHANNEL_STEPS);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="Canali · richiesta intervento" />
      <div className="grid min-h-0 flex-1 grid-cols-2 overflow-hidden">
        <div className="flex min-w-0 flex-col gap-2 overflow-hidden border-r border-hairline p-3 sm:p-4">
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft sm:text-[9.5px]">
            Prima · spezzati
          </p>
          <MockHit id="ch-email" as="div">
            <ChannelCard
              kind="Email"
              title="Cella -22°C non tiene"
              meta="Coop · ieri 18:12"
              open={state.emailOpen}
            />
          </MockHit>
          <MockHit id="ch-call" as="div">
            <ChannelCard
              kind="Telefono"
              title="Urgente, chi va in sede?"
              meta="Coop · oggi 08:41"
              open={state.callOpen}
            />
          </MockHit>
        </div>

        <div className="flex min-w-0 flex-col overflow-hidden p-3 sm:p-4">
          <p className="mb-2 font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft sm:text-[9.5px]">
            Dopo · stesso flusso
          </p>
          {state.ticket ? (
            <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-hairline bg-paper-2 p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="truncate font-mono text-[13px] font-medium text-ink sm:text-[11px]">
                  FRIGO-4129
                </span>
                <StatusPill kind={state.tech ? "work" : "open"} />
              </div>
              <ActorRow label="Cliente" value="Coop · cella -22°C" />
              <MockHit id="ch-tech" as="div">
                <ActorRow label="Tecnico" value={state.tech || "Non assegnato"} />
              </MockHit>
              <MockHit id="ch-supplier" as="div">
                <ActorRow label="Fornitore" value={state.supplier || "In attesa"} last />
              </MockHit>
            </div>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col items-start justify-between rounded-xl border border-dashed border-hairline-strong p-3">
              <p className="text-[12.5px] leading-[1.45] text-ink-soft sm:text-[11px]">
                Email e telefono restano due conversazioni. Nessuno vede tecnico o fornitore.
              </p>
              <MockHit id="ch-open">
                <BtnMini>Apri ticket</BtnMini>
              </MockHit>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChannelCard({
  kind,
  title,
  meta,
  open,
}: {
  kind: string;
  title: string;
  meta: string;
  open: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-3 py-2 ${
        open ? "border-accent/30 bg-accent/[0.06]" : "border-hairline bg-white"
      }`}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft sm:text-[9px]">
        {kind}
      </p>
      <p className="truncate text-[13px] font-medium text-ink sm:text-[11.5px]">{title}</p>
      <p className="truncate font-mono text-[11px] text-ink-soft sm:text-[9.5px]">{meta}</p>
    </div>
  );
}

function ActorRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-2 py-1.5 font-mono text-[12.5px] sm:text-[10.5px] ${
        last ? "" : "border-b border-hairline"
      }`}
    >
      <span className="uppercase tracking-[0.08em] text-ink-soft">{label}</span>
      <span className="truncate font-medium text-ink">{value}</span>
    </div>
  );
}

type InboxState = {
  open: "mail" | "call" | "";
  asked: boolean;
};

const INBOX_INITIAL: InboxState = { open: "", asked: false };
const INBOX_COMPLETE: InboxState = { open: "call", asked: true };

const INBOX_STEPS: MockStep<InboxState>[] = [
  { type: "wait", ms: 360 },
  { type: "move", to: "in-mail" },
  { type: "click" },
  { type: "set", patch: { open: "mail" } },
  { type: "wait", ms: 380 },
  { type: "move", to: "in-call" },
  { type: "click" },
  { type: "set", patch: { open: "call" } },
  { type: "wait", ms: 300 },
  { type: "move", to: "in-ask" },
  { type: "click" },
  { type: "set", patch: { asked: true } },
  { type: "wait", ms: 800 },
];

export function InboxChaosMock() {
  const { state } = useMockPlayback(INBOX_INITIAL, INBOX_COMPLETE, INBOX_STEPS);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="Email + telefono · nessuna coda" />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex gap-1.5 border-b border-hairline px-3 py-2">
          <ChipMini on>Inbox</ChipMini>
          <ChipMini>Chiamate</ChipMini>
        </div>
        <MockHit id="in-mail" as="div">
          <InboxRow
            from="Coop"
            text="Cella -22°C in allarme da ieri sera"
            active={state.open === "mail"}
          />
        </MockHit>
        <MockHit id="in-call" as="div">
          <InboxRow
            from="Centralino"
            text="Hanno richiamato: chi è in zona?"
            active={state.open === "call"}
            last
          />
        </MockHit>
        <div className="mt-auto border-t border-hairline bg-paper-2 p-3">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft sm:text-[9px]">
            Visibilità
          </p>
          <p className="mb-2 text-[12.5px] leading-[1.45] text-ink sm:text-[11px]">
            {state.open === "call"
              ? "Nota vocale isolata. Il tecnico non la vede."
              : state.open === "mail"
                ? "Solo chi ha la mail aperta sa della cella."
                : "Richieste sparse, nessuno stato condiviso."}
          </p>
          <MockHit id="in-ask">
            <BtnMini ghost>
              {state.asked ? "Nessuna risposta in thread" : "Chiedi chi ci va"}
            </BtnMini>
          </MockHit>
        </div>
      </div>
    </div>
  );
}

function InboxRow({
  from,
  text,
  active,
  last,
}: {
  from: string;
  text: string;
  active: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`px-3 py-2.5 ${last ? "" : "border-b border-hairline"} ${
        active ? "bg-accent/[0.06]" : ""
      }`}
    >
      <p className="truncate font-mono text-[12px] font-medium text-accent sm:text-[10.5px]">
        {from}
      </p>
      <p className="truncate text-[13px] text-ink sm:text-[11.5px]">{text}</p>
    </div>
  );
}

type TimelineState = {
  step: 0 | 1 | 2 | 3;
};

const TIMELINE_INITIAL: TimelineState = { step: 0 };
const TIMELINE_COMPLETE: TimelineState = { step: 3 };

const TIMELINE_STEPS: MockStep<TimelineState>[] = [
  { type: "wait", ms: 320 },
  { type: "move", to: "tl-0" },
  { type: "click" },
  { type: "set", patch: { step: 0 } },
  { type: "wait", ms: 240 },
  { type: "move", to: "tl-1" },
  { type: "click" },
  { type: "set", patch: { step: 1 } },
  { type: "wait", ms: 240 },
  { type: "move", to: "tl-2" },
  { type: "click" },
  { type: "set", patch: { step: 2 } },
  { type: "wait", ms: 240 },
  { type: "move", to: "tl-3" },
  { type: "click" },
  { type: "set", patch: { step: 3 } },
  { type: "wait", ms: 800 },
];

const TIMELINE = [
  { id: "tl-0", who: "Cliente", title: "Richiesta aperta", detail: "Cella -22°C, Coop" },
  { id: "tl-1", who: "Ticket", title: "FRIGO-4129 in coda", detail: "Priorità alta, visibile a tutti" },
  { id: "tl-2", who: "Tecnico", title: "Marco R. in carico", detail: "Fornitore allertato per valvola" },
  { id: "tl-3", who: "Chiusura", title: "Intervento chiuso", detail: "Nota e storico condivisi" },
] as const;

export function SharedTimelineMock() {
  const { state } = useMockPlayback(TIMELINE_INITIAL, TIMELINE_COMPLETE, TIMELINE_STEPS);
  const current = TIMELINE[state.step];

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="Storico condiviso · FRIGO-4129" />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="truncate font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft sm:text-[9.5px]">
            Stessi attori, un filo
          </span>
          <StatusPill kind={state.step === 3 ? "done" : "work"} />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-1.5">
          {TIMELINE.map((item, index) => (
            <MockHit key={item.id} id={item.id} as="div">
              <div
                className={`rounded-xl px-3 py-2 ${
                  index === state.step
                    ? "bg-white shadow-[0_8px_20px_-16px_rgba(80,50,90,0.55)] ring-1 ring-accent/20"
                    : index < state.step
                      ? "bg-accent/[0.06]"
                      : "bg-paper-2"
                }`}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft sm:text-[9px]">
                  {item.who}
                </p>
                <p className="truncate text-[13px] font-medium text-ink sm:text-[11.5px]">
                  {item.title}
                </p>
              </div>
            </MockHit>
          ))}
        </div>
        <p className="mt-3 truncate font-mono text-[12px] text-ink-soft sm:text-[10.5px]">
          {current.detail}
        </p>
      </div>
    </div>
  );
}

type FaqState = {
  open: "scope" | "flow" | "start" | "";
};

const FAQ_INITIAL: FaqState = { open: "" };
const FAQ_COMPLETE: FaqState = { open: "start" };

const FAQ_STEPS: MockStep<FaqState>[] = [
  { type: "wait", ms: 320 },
  { type: "move", to: "fq-scope" },
  { type: "click" },
  { type: "set", patch: { open: "scope" } },
  { type: "wait", ms: 420 },
  { type: "move", to: "fq-flow" },
  { type: "click" },
  { type: "set", patch: { open: "flow" } },
  { type: "wait", ms: 420 },
  { type: "move", to: "fq-start" },
  { type: "click" },
  { type: "set", patch: { open: "start" } },
  { type: "wait", ms: 800 },
];

const FAQ_ITEMS = [
  {
    id: "fq-scope" as const,
    q: "Cosa copre questa pagina?",
    a: "Clienti, tecnici e fornitori nello stesso flusso, dalla richiesta alla chiusura.",
  },
  {
    id: "fq-flow" as const,
    q: "Come funziona il flusso?",
    a: "Prima email e telefono spezzati. Dopo ticket, assegnazioni e storico condivisi.",
  },
  {
    id: "fq-start" as const,
    q: "Come si parte?",
    a: "Si descrive un processo reale. Frasma valuta fattibilità prima di un preventivo.",
  },
];

export function FaqExploreMock() {
  const { state } = useMockPlayback(FAQ_INITIAL, FAQ_COMPLETE, FAQ_STEPS);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="Domande sul flusso" />
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-3 sm:p-4">
        {FAQ_ITEMS.map((item) => {
          const open = state.open === item.id.replace("fq-", "");
          return (
            <MockHit key={item.id} id={item.id} as="div">
              <div
                className={`rounded-xl border px-3 py-2 ${
                  open ? "border-accent/30 bg-white" : "border-hairline bg-paper-2"
                }`}
              >
                <p className="text-[13px] font-medium text-ink sm:text-[12px]">{item.q}</p>
                {open ? (
                  <p className="mt-1 text-[12.5px] leading-[1.45] text-ink-soft sm:text-[11px]">
                    {item.a}
                  </p>
                ) : null}
              </div>
            </MockHit>
          );
        })}
      </div>
    </div>
  );
}

type BriefState = {
  activity: string;
  systems: string;
  volume: string;
  sent: boolean;
};

const BRIEF_INITIAL: BriefState = {
  activity: "",
  systems: "",
  volume: "",
  sent: false,
};

const BRIEF_COMPLETE: BriefState = {
  activity: "Ticket manutenzione celle",
  systems: "Email, telefono, Excel",
  volume: "40 interventi / mese",
  sent: true,
};

const BRIEF_STEPS: MockStep<BriefState>[] = [
  { type: "wait", ms: 300 },
  { type: "move", to: "br-activity" },
  { type: "click" },
  { type: "type", key: "activity", text: "Ticket manutenzione celle", msPerChar: 28 },
  { type: "move", to: "br-systems" },
  { type: "click" },
  { type: "type", key: "systems", text: "Email, telefono, Excel", msPerChar: 28 },
  { type: "move", to: "br-volume" },
  { type: "click" },
  { type: "type", key: "volume", text: "40 interventi / mese", msPerChar: 30 },
  { type: "move", to: "br-send" },
  { type: "click" },
  { type: "set", patch: { sent: true } },
  { type: "wait", ms: 800 },
];

export function BriefIntakeMock() {
  const { state, typingKey } = useMockPlayback(BRIEF_INITIAL, BRIEF_COMPLETE, BRIEF_STEPS);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="Valutazione processo · brief" />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-3 sm:p-4">
        <BriefField
          id="br-activity"
          label="Attività ripetitiva"
          value={state.activity}
          typing={typingKey === "activity"}
        />
        <BriefField
          id="br-systems"
          label="Sistemi oggi"
          value={state.systems}
          typing={typingKey === "systems"}
        />
        <BriefField
          id="br-volume"
          label="Volumi"
          value={state.volume}
          typing={typingKey === "volume"}
        />
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="truncate font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft sm:text-[9px]">
            {state.sent ? "Brief ricevuto · no listino" : "Senza prezzo inventato"}
          </span>
          <MockHit id="br-send">
            <BtnMini ghost={state.sent}>{state.sent ? "Inviato" : "Invia brief"}</BtnMini>
          </MockHit>
        </div>
      </div>
    </div>
  );
}

function BriefField({
  id,
  label,
  value,
  typing,
}: {
  id: string;
  label: string;
  value: string;
  typing: boolean;
}) {
  return (
    <div className={useMockHitClass(id, "mb-2")} data-mock-hit={id}>
      <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft sm:text-[9px]">
        {label}
      </p>
      <div className="min-h-[34px] rounded-lg bg-paper-2 px-2.5 py-1.5 font-mono text-[13px] text-ink sm:text-[11px]">
        {value || "—"}
        {typing ? <span className="mock-caret" /> : null}
      </div>
    </div>
  );
}

type RelatedState = {
  pick: "ticket" | "field" | "";
};

const RELATED_INITIAL: RelatedState = { pick: "" };
const RELATED_COMPLETE: RelatedState = { pick: "field" };

const RELATED_STEPS: MockStep<RelatedState>[] = [
  { type: "wait", ms: 320 },
  { type: "move", to: "rl-ticket" },
  { type: "click" },
  { type: "set", patch: { pick: "ticket" } },
  { type: "wait", ms: 480 },
  { type: "move", to: "rl-field" },
  { type: "click" },
  { type: "set", patch: { pick: "field" } },
  { type: "wait", ms: 800 },
];

export function RelatedPickMock() {
  const { state } = useMockPlayback(RELATED_INITIAL, RELATED_COMPLETE, RELATED_STEPS);
  const note =
    state.pick === "ticket"
      ? "Stesso flusso: coda, SLA, tecnici e chiusura."
      : state.pick === "field"
        ? "Il verticale: interventi distribuiti, non un MES."
        : "Due porte sullo stesso mestiere.";

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WindowBar label="Collegamenti · stesso mestiere" />
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-3 sm:p-4">
        <MockHit id="rl-ticket" as="div">
          <div
            className={`rounded-xl border px-3 py-2.5 ${
              state.pick === "ticket" ? "border-accent/30 bg-white" : "border-hairline bg-paper-2"
            }`}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft sm:text-[9px]">
              Servizio
            </p>
            <p className="text-[13px] font-medium text-ink sm:text-[12px]">
              Ticketing manutenzione
            </p>
          </div>
        </MockHit>
        <MockHit id="rl-field" as="div">
          <div
            className={`rounded-xl border px-3 py-2.5 ${
              state.pick === "field" ? "border-accent/30 bg-white" : "border-hairline bg-paper-2"
            }`}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft sm:text-[9px]">
              Verticale
            </p>
            <p className="text-[13px] font-medium text-ink sm:text-[12px]">Servizi sul campo</p>
          </div>
        </MockHit>
        <p className="mt-auto text-[12.5px] leading-[1.45] text-ink-soft sm:text-[11px]">{note}</p>
      </div>
    </div>
  );
}

type PlantState = {
  hit: "cella" | "tecnico" | "impianto" | "";
};

const PLANT_INITIAL: PlantState = { hit: "" };
const PLANT_COMPLETE: PlantState = { hit: "impianto" };

const PLANT_STEPS: MockStep<PlantState>[] = [
  { type: "wait", ms: 360 },
  { type: "move", to: "pl-cella" },
  { type: "click" },
  { type: "set", patch: { hit: "cella" } },
  { type: "wait", ms: 380 },
  { type: "move", to: "pl-tecnico" },
  { type: "click" },
  { type: "set", patch: { hit: "tecnico" } },
  { type: "wait", ms: 380 },
  { type: "move", to: "pl-impianto" },
  { type: "click" },
  { type: "set", patch: { hit: "impianto" } },
  { type: "wait", ms: 800 },
];

const PLANT_PINS = [
  {
    id: "pl-cella",
    key: "cella" as const,
    label: "Cella -22°C",
    note: "Richiesta cliente · FRIGO-4129",
    style: { left: "18%", top: "22%" },
  },
  {
    id: "pl-tecnico",
    key: "tecnico" as const,
    label: "Tecnico in sede",
    note: "Marco R. · in carico",
    style: { left: "58%", top: "48%" },
  },
  {
    id: "pl-impianto",
    key: "impianto" as const,
    label: "Gruppo frigo",
    note: "Valvola · fornitore allertato",
    style: { left: "28%", top: "72%" },
  },
];

export function PlantPinsMock() {
  const { state } = useMockPlayback(PLANT_INITIAL, PLANT_COMPLETE, PLANT_STEPS);
  const active = PLANT_PINS.find((pin) => pin.key === state.hit);

  return (
    <div className="absolute inset-0">
      {PLANT_PINS.map((pin) => (
        <div key={pin.id} className="absolute z-[2]" style={pin.style}>
          <MockHit
            id={pin.id}
            as="div"
            className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5"
          >
            <span
              className={`block h-3.5 w-3.5 shrink-0 rounded-full ring-[3px] ring-white ${
                state.hit === pin.key
                  ? "bg-accent shadow-[0_0_0_6px_rgba(105,85,123,0.28)]"
                  : "bg-ink"
              }`}
            />
            <span
              className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em] shadow-sm ${
                state.hit === pin.key ? "bg-ink text-paper" : "bg-white/92 text-ink"
              }`}
            >
              {pin.label}
            </span>
          </MockHit>
        </div>
      ))}
      {active ? (
        <div className="absolute bottom-12 left-4 right-4 rounded-2xl bg-ink/88 px-3 py-2 text-paper backdrop-blur">
          <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-paper/70">
            {active.label}
          </p>
          <p className="text-[12.5px] font-medium">{active.note}</p>
        </div>
      ) : null}
    </div>
  );
}
