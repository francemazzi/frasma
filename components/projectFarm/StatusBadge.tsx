import type { ProjectStatus } from "../../lib/projectFarm/types";

type StatusBadgeProps = {
  status: ProjectStatus;
  className?: string;
};

const statusStyles: Record<ProjectStatus, string> = {
  "In crescita":
    "bg-exchange-bull/12 text-exchange-bull border-exchange-bull/30",
  "In validazione":
    "bg-exchange-ticker/10 text-exchange-ticker border-exchange-ticker/25",
  "In partenza":
    "bg-ink/5 text-exchange-neutral border-hairline",
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
