import type { TeamMember } from "../../lib/projectFarm/types";

type TeamChipProps = {
  member: TeamMember;
};

export default function TeamChip({ member }: TeamChipProps) {
  const baseClass =
    "inline-flex flex-col rounded-xl border border-hairline bg-paper/90 px-3 py-2 text-left transition-colors";

  if (member.linkedinUrl) {
    return (
      <a
        href={member.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} hover:border-exchange-bull/40 hover:bg-paper-2`}
        aria-label={`${member.name}, ${member.role} — profilo LinkedIn`}
      >
        <span className="text-sm font-medium text-ink">{member.name}</span>
        <span className="text-xs text-ink-soft">{member.role}</span>
      </a>
    );
  }

  return (
    <div className={baseClass}>
      <span className="text-sm font-medium text-ink">{member.name}</span>
      <span className="text-xs text-ink-soft">{member.role}</span>
    </div>
  );
}
