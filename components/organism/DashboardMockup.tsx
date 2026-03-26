import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const ordini = [
  { id: "ORD-1247", cliente: "Meccanica Rossi", stato: "completato", label: "Completato" },
  { id: "ORD-1248", cliente: "Tecnopart Srl", stato: "in-corso", label: "In produzione" },
  { id: "ORD-1249", cliente: "Fonderia Bianchi", stato: "attesa", label: "In attesa" },
];

const statoIcon = {
  completato: <CheckCircle2 size={14} className="text-sage-500" />,
  "in-corso": <Clock size={14} className="text-amber-500" />,
  attesa: <AlertTriangle size={14} className="text-red-400" />,
};

const statoBg = {
  completato: "bg-sage-50 text-sage-600",
  "in-corso": "bg-amber-50 text-amber-600",
  attesa: "bg-red-50 text-red-500",
};

export default function DashboardMockup() {
  return (
    <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-[380px] rounded-xl border border-farm-border bg-farm-panel shadow-2xl overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-farm-surface border-b border-farm-border">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="ml-auto text-[10px] text-farm-secondary">
          dashboard &mdash; commesse
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-px bg-farm-border border-b border-farm-border">
        <div className="bg-farm-panel px-3 py-3 text-center">
          <p className="text-lg font-bold text-sage">12</p>
          <p className="text-[10px] text-farm-secondary">Attive</p>
        </div>
        <div className="bg-farm-panel px-3 py-3 text-center">
          <p className="text-lg font-bold text-amber-500">3</p>
          <p className="text-[10px] text-farm-secondary">In attesa</p>
        </div>
        <div className="bg-farm-panel px-3 py-3 text-center">
          <p className="text-lg font-bold text-farm-text">97%</p>
          <p className="text-[10px] text-farm-secondary">On time</p>
        </div>
      </div>

      {/* Orders list */}
      <div className="p-3 space-y-2">
        {ordini.map((o) => (
          <div
            key={o.id}
            className="flex items-center gap-3 rounded-lg bg-farm-surface px-3 py-2.5"
          >
            {statoIcon[o.stato as keyof typeof statoIcon]}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate">{o.cliente}</p>
              <p className="text-[10px] text-farm-secondary font-mono">{o.id}</p>
            </div>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statoBg[o.stato as keyof typeof statoBg]}`}
            >
              {o.label}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-farm-border px-4 py-2.5 flex items-center justify-between">
        <span className="text-[10px] text-farm-secondary">Ultimo aggiornamento: ora</span>
        <span className="flex items-center gap-1 text-[10px] text-sage-500 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse" />
          Live
        </span>
      </div>
    </div>
  );
}
