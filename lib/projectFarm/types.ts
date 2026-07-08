export type TrendType = "up" | "stable" | "flat" | "starting";

export type TeamMember = {
  name: string;
  role: string;
  linkedinUrl?: string | null;
};

export type Metric = {
  key: string;
  label: string;
  baseValue: number;
  unit: string;
  trend: TrendType;
  dailyDeltaRange: [number, number];
};

export type ProjectStatus = "In crescita" | "In validazione" | "In partenza";

export type MapPosition = {
  x: number;
  y: number;
};

export type Project = {
  id: string;
  name: string;
  projectUrl?: string | null;
  tagline: string;
  status: ProjectStatus;
  visualMetaphor: string;
  icon: string;
  team: TeamMember[];
  metrics: Metric[];
  mapPosition: MapPosition;
};
