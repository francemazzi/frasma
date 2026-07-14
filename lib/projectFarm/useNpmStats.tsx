"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getNpmPackageNames,
  type NpmStatsMap,
  type NpmStatsResponse,
} from "./npmStats";
import { PROJECTS } from "./projects";

type NpmStatsContextValue = {
  stats: NpmStatsMap | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
};

const NpmStatsContext = createContext<NpmStatsContextValue | null>(null);

export function NpmStatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<NpmStatsMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const packageNames = useMemo(() => getNpmPackageNames(PROJECTS), []);

  useEffect(() => {
    if (packageNames.length === 0) {
      setLoading(false);
      setStats({});
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const query = encodeURIComponent(packageNames.join(","));
        const response = await fetch(`/api/npm-stats?packages=${query}`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = (await response.json()) as NpmStatsResponse | {
          ok: false;
          error: string;
        };

        if (!data.ok) {
          throw new Error(data.error || "Failed to load npm stats");
        }

        if (!cancelled) {
          setStats(data.packages);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setStats(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [packageNames, refreshKey]);

  const refresh = useCallback(() => {
    setRefreshKey((key) => key + 1);
  }, []);

  const value = useMemo(
    () => ({ stats, loading, error, refresh }),
    [stats, loading, error, refresh]
  );

  return (
    <NpmStatsContext.Provider value={value}>{children}</NpmStatsContext.Provider>
  );
}

export function useNpmStats(): NpmStatsContextValue {
  const context = useContext(NpmStatsContext);
  if (!context) {
    return {
      stats: null,
      loading: false,
      error: null,
      refresh: () => undefined,
    };
  }
  return context;
}
