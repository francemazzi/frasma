import type { LucideIcon } from "lucide-react";

type CaseCardProps = {
  icon: LucideIcon;
  titolo: string;
  testo: React.ReactNode;
};

export default function CaseCard({ icon: Icon, titolo, testo }: CaseCardProps) {
  return (
    <article className="rounded-xl border border-farm-border bg-farm-surface p-5">
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-sage-50 text-sage">
        <Icon size={22} />
      </span>
      <h3 className="text-lg font-semibold">{titolo}</h3>
      <p className="mt-2 text-sm leading-relaxed text-farm-secondary">
        {testo}
      </p>
    </article>
  );
}
