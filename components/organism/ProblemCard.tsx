import type { LucideIcon } from "lucide-react";

type ProblemCardProps = {
  icon: LucideIcon;
  children: React.ReactNode;
};

export default function ProblemCard({ icon: Icon, children }: ProblemCardProps) {
  return (
    <li className="flex items-start gap-3 rounded-2xl border border-hairline-strong bg-paper-2 px-4 py-4 leading-relaxed text-farm-secondary">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Icon size={18} />
      </span>
      <span>{children}</span>
    </li>
  );
}
