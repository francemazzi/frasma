import type { NextApiRequest, NextApiResponse } from "next";
import {
  fetchNpmStatsForPackages,
  type NpmStatsResponse,
} from "../../lib/projectFarm/npmStats";
import { PROJECTS } from "../../lib/projectFarm/projects";

type ErrorResponse = {
  ok: false;
  error: string;
};

function parsePackages(query: string | string[] | undefined): string[] {
  if (!query) {
    return PROJECTS.map((project) => project.npmPackage).filter(
      (name): name is string => Boolean(name)
    );
  }

  const raw = Array.isArray(query) ? query.join(",") : query;
  return raw
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NpmStatsResponse | ErrorResponse>
) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const packageNames = parsePackages(req.query.packages);

  try {
    const packages = await fetchNpmStatsForPackages(packageNames);
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );
    return res.status(200).json({ ok: true, packages });
  } catch {
    return res
      .status(502)
      .json({ ok: false, error: "Failed to fetch npm stats." });
  }
}
