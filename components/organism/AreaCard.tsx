import type { LucideIcon } from "lucide-react";

type AreaCardProps = {
  icon: LucideIcon;
  label: string;
};

export default function AreaCard({ icon: Icon, label }: AreaCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-farm-border bg-farm-surface px-4 py-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sage-50 text-sage">
        <Icon size={18} />
      </span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
