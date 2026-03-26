import type { LucideIcon } from "lucide-react";

type ProblemCardProps = {
  icon: LucideIcon;
  children: React.ReactNode;
};

export default function ProblemCard({ icon: Icon, children }: ProblemCardProps) {
  return (
    <li className="flex items-start gap-3 rounded-lg bg-farm-panel px-4 py-4 leading-relaxed text-farm-secondary">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-50 text-red-400">
        <Icon size={18} />
      </span>
      <span>{children}</span>
    </li>
  );
}
