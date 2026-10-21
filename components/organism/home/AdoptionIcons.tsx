const frame = "adopt-icon h-14 w-14";

export function ConnectIcon() {
  return (
    <svg viewBox="0 0 64 64" className={frame} aria-hidden="true">
      <rect x="2" y="2" width="60" height="60" rx="22" fill="#EBE4F0" />
      <rect x="12" y="20" width="14" height="18" rx="6" fill="#FFFFFF" stroke="#69557B" strokeWidth="2.2" />
      <rect x="38" y="22" width="14" height="16" rx="6" fill="#69557B" />
      <path className="adopt-link" d="M26 30 H38" stroke="#69557B" strokeWidth="2.6" fill="none" />
    </svg>
  );
}

export function AlongsideIcon() {
  return (
    <svg viewBox="0 0 64 64" className={frame} aria-hidden="true">
      <rect x="2" y="2" width="60" height="60" rx="22" fill="#F3F2EF" />
      <circle cx="22" cy="24" r="6" fill="#69557B" />
      <path d="M14 42c1-8 4-11 8-11s7 3 8 11" fill="#69557B" />
      <rect x="36" y="18" width="16" height="24" rx="6" fill="#FFFFFF" stroke="#69557B" strokeWidth="2" />
      <path className="adopt-check" d="M40 30 l3 3 5-6" stroke="#69557B" strokeWidth="2.4" fill="none" />
    </svg>
  );
}

export function AutomateIcon() {
  return (
    <svg viewBox="0 0 64 64" className={frame} aria-hidden="true">
      <rect x="2" y="2" width="60" height="60" rx="22" fill="#F9F0D6" />
      <rect x="12" y="30" width="10" height="10" rx="4" fill="#FFFFFF" stroke="#69557B" strokeWidth="2" />
      <rect x="27" y="30" width="10" height="10" rx="4" fill="#69557B" />
      <rect x="42" y="30" width="10" height="10" rx="4" fill="#FFFFFF" stroke="#69557B" strokeWidth="2" />
      <circle className="adopt-token" cx="17" cy="22" r="3.4" fill="#D4B44E" stroke="#69557B" strokeWidth="1.6" />
    </svg>
  );
}

export function ExpandIcon() {
  return (
    <svg viewBox="0 0 64 64" className={frame} aria-hidden="true">
      <rect x="2" y="2" width="60" height="60" rx="22" fill="#E8EEF2" />
      <rect x="10" y="24" width="14" height="14" rx="5" fill="#69557B" />
      <rect className="adopt-grow" x="26" y="24" width="14" height="14" rx="5" fill="#A889B8" />
      <rect className="adopt-grow-late" x="42" y="26" width="12" height="12" rx="5" fill="#FFFFFF" stroke="#69557B" strokeWidth="2" />
    </svg>
  );
}

export const ADOPTION_ICONS = [ConnectIcon, AlongsideIcon, AutomateIcon, ExpandIcon] as const;
