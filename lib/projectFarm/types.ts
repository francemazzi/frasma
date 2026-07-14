export type TrendType = "up" | "stable" | "flat" | "starting";

export type MetricSource = "simulated" | "npm";

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
  source?: MetricSource;
};

export type ProjectStatus = "In crescita" | "In validazione" | "In partenza";

export type Project = {
  id: string;
  name: string;
  ticker: string;
  projectUrl?: string | null;
  docsUrl?: string | null;
  npmPackage?: string;
  tagline: string;
  status: ProjectStatus;
  sector: string;
  icon: string;
  sortOrder: number;
  team: TeamMember[];
  metrics: Metric[];
};
