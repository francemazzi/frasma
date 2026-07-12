import type { Project } from "../../lib/projectFarm/types";
import MetricCard from "./MetricCard";
import StatusBadge from "./StatusBadge";
import TeamChip from "./TeamChip";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="space-y-5">
      <header className="flex items-start gap-4">
        <span className="text-4xl" aria-hidden="true">
          {project.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm text-exchange-ticker">
              {project.ticker}
            </span>
            <h2 className="font-serif text-2xl font-medium text-ink">
              {project.name}
            </h2>
            <StatusBadge status={project.status} />
          </div>
          <p className="mt-1 text-sm text-ink-soft">{project.tagline}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
            Settore · {project.sector}
          </p>
          {project.projectUrl ? (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:text-accent-2 transition-colors"
            >
              Apri progetto ↗
            </a>
          ) : null}
        </div>
      </header>

      <section aria-label="Team">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
          Team
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {project.team.map((member) => (
            <TeamChip key={`${project.id}-${member.name}`} member={member} />
          ))}
        </div>
      </section>

      <section aria-label="Metriche">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
          Quote principali
        </h3>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {project.metrics.map((metric) => (
            <MetricCard
              key={`${project.id}-${metric.key}`}
              project={project}
              metric={metric}
            />
          ))}
        </div>
        <p className="mt-3 font-mono text-[10px] text-ink-faint">
          Dati simulati · Aggiornamento giornaliero · Pronto per feed API
        </p>
      </section>
    </article>
  );
}
