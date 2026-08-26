import { CheckCircle2, Clock, AlertTriangle, Settings2 } from "lucide-react";
import GrainMesh from "../atoms/GrainMesh";

export default function DashboardMockup() {
  return (
    <div className="relative mx-auto mt-10 w-full max-w-[380px] overflow-hidden rounded-3xl border border-hairline-strong lg:absolute lg:right-12 lg:top-1/2 lg:mx-0 lg:mt-0 lg:-translate-y-1/2">
      <GrainMesh variant="mist" />
      <div className="relative z-[1] p-4 sm:p-5">
        <div className="overflow-hidden rounded-xl border border-hairline-strong bg-white">
          <div className="flex items-center gap-1.5 border-b border-hairline px-4 py-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-hairline-strong" />
            <span className="h-1.5 w-1.5 rounded-full bg-hairline-strong" />
            <span className="h-1.5 w-1.5 rounded-full bg-hairline-strong" />
            <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-ink-soft">
              <Settings2 size={10} />
              La tua azienda
            </span>
          </div>

          <div className="flex items-center justify-between px-4 pb-1 pt-3">
            <p className="text-[11px] font-medium text-ink">Il tuo software</p>
            <span className="rounded-full bg-paper-2 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-accent">
              Customizzato
            </span>
          </div>

          <div className="mx-3 mb-3 grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-paper-2 px-3 py-2.5 text-center">
              <p className="text-lg font-medium text-accent">__</p>
              <p className="text-[10px] text-ink-soft">Attive</p>
            </div>
            <div className="rounded-lg bg-paper-2 px-3 py-2.5 text-center">
              <p className="text-lg font-medium text-working">__</p>
              <p className="text-[10px] text-ink-soft">In attesa</p>
            </div>
            <div className="rounded-lg bg-paper-2 px-3 py-2.5 text-center">
              <p className="text-lg font-medium text-ink">__</p>
              <p className="text-[10px] text-ink-soft">On time</p>
            </div>
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
            <div className="flex items-center gap-3 rounded-lg bg-paper-2 px-3 py-2.5">
              <AlertTriangle size={14} className="shrink-0 text-ink-soft" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 w-24 rounded bg-hairline-strong" />
                <div className="h-2 w-12 rounded bg-hairline" />
              </div>
              <span className="rounded-full bg-paper px-2 py-0.5 text-[10px] font-medium text-ink-soft">
                In attesa
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-hairline px-4 py-2.5">
            <span className="text-[10px] text-ink-soft">Costruito sul tuo flusso</span>
            <span className="rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-medium text-ink">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-working align-middle" />
              In corso
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
