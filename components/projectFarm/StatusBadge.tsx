import type { ProjectStatus } from "../../lib/projectFarm/types";

type StatusBadgeProps = {
  status: ProjectStatus;
  className?: string;
};

const statusStyles: Record<ProjectStatus, string> = {
  "In crescita":
    "bg-accent-leaf/15 text-accent-leaf border-accent-leaf/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]",
  "In validazione":
    "bg-accent-blue/15 text-accent-blue border-accent-blue/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]",
  "In partenza":
    "bg-terra-100 text-terra-500 border-terra-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]",
};

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] ${statusStyles[status]} ${className}`}
    >
      {status}
    </span>
  );
}
