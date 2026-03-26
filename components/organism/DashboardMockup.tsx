import { CheckCircle2, Clock, AlertTriangle, Settings2 } from "lucide-react";

export default function DashboardMockup() {
  return (
    <div className="mt-10 lg:mt-0 lg:absolute lg:right-12 lg:top-1/2 lg:-translate-y-1/2 w-full max-w-[380px] mx-auto lg:mx-0 rounded-xl border border-farm-border bg-farm-panel shadow-2xl overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-farm-surface border-b border-farm-border">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-farm-secondary">
          <Settings2 size={10} />
          La tua azienda
        </span>
      </div>

      {/* Label esempio */}
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <p className="text-[11px] font-semibold text-farm-text">
          Il tuo software
        </p>
        <span className="text-[9px] font-medium tracking-wide uppercase text-sage-500 bg-sage-50 px-2 py-0.5 rounded-full">
          Customizzato
        </span>
      </div>

      {/* Stats row */}
      <div className="mx-3 mb-3 grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-farm-surface px-3 py-2.5 text-center">
          <p className="text-lg font-bold text-sage">__</p>
          <p className="text-[10px] text-farm-secondary">Attive</p>
        </div>
        <div className="rounded-lg bg-farm-surface px-3 py-2.5 text-center">
          <p className="text-lg font-bold text-amber-500">__</p>
          <p className="text-[10px] text-farm-secondary">In attesa</p>
        </div>
        <div className="rounded-lg bg-farm-surface px-3 py-2.5 text-center">
          <p className="text-lg font-bold text-farm-text">__</p>
          <p className="text-[10px] text-farm-secondary">On time</p>
        </div>
      </div>

      {/* Placeholder rows */}
      <div className="px-3 pb-2 space-y-2">
        <div className="flex items-center gap-3 rounded-lg bg-farm-surface px-3 py-2.5">
          <CheckCircle2 size={14} className="text-sage-500 shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-28 rounded bg-farm-border" />
            <div className="h-2 w-16 rounded bg-farm-border/60" />
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sage-50 text-sage-600">
            Completato
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-farm-surface px-3 py-2.5">
          <Clock size={14} className="text-amber-500 shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-32 rounded bg-farm-border" />
            <div className="h-2 w-14 rounded bg-farm-border/60" />
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">
            In produzione
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-farm-surface px-3 py-2.5">
          <AlertTriangle size={14} className="text-red-400 shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-24 rounded bg-farm-border" />
            <div className="h-2 w-12 rounded bg-farm-border/60" />
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-500">
            In attesa
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-farm-border px-4 py-2.5 flex items-center justify-between">
        <span className="text-[10px] text-farm-secondary italic">
          Costruito sul tuo flusso
        </span>
        <span className="flex items-center gap-1 text-[10px] text-sage-500 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse" />
          Su misura
        </span>
      </div>
    </div>
  );
}
