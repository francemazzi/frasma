import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

type RobotsGroup = { agents: string[]; rules: Array<[string, string]> };

function parseRobots(source: string): RobotsGroup[] {
  const groups: RobotsGroup[] = [];
  let current: RobotsGroup | null = null;

  for (const rawLine of source.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const [key, ...rest] = line.split(":");
    const value = rest.join(":").trim();
    const name = key.trim().toLowerCase();

    if (name === "user-agent") {
      if (!current || current.rules.length > 0) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value);
      continue;
    }
    if (current) current.rules.push([name, value]);
  }

  return groups;
}

function groupFor(groups: RobotsGroup[], agent: string): RobotsGroup | undefined {
  return groups.find((group) => group.agents.includes(agent));
}

function allows(group: RobotsGroup, path: string): boolean {
  const matching = group.rules
    .filter(([rule]) => rule === "allow" || rule === "disallow")
    .filter(([, value]) => value !== "" && path.startsWith(value))
    .sort((a, b) => b[1].length - a[1].length);
  const winner = matching[0];
  return !winner || winner[0] === "allow";
}

describe("public/robots.txt", () => {
  const source = readFileSync(
    join(process.cwd(), "public", "robots.txt"),
    "utf8",
  );
  const groups = parseRobots(source);

  it("names the OpenAI ads and search crawlers explicitly", () => {
    expect(groupFor(groups, "OAI-AdsBot")).toBeDefined();
    expect(groupFor(groups, "OAI-SearchBot")).toBeDefined();
  });

  it("lets OAI-AdsBot fetch the campaign landing but not the API", () => {
    const ads = groupFor(groups, "OAI-AdsBot")!;
    expect(allows(ads, "/servizi/ddt-erp")).toBe(true);
    expect(allows(ads, "/manifattura")).toBe(true);
    expect(allows(ads, "/api/status")).toBe(true);
    expect(allows(ads, "/api/chat")).toBe(false);
  });

  it("keeps the default group and the sitemap", () => {
    const everyone = groupFor(groups, "*")!;
    expect(allows(everyone, "/servizi/ddt-erp")).toBe(true);
    expect(allows(everyone, "/api/mcp")).toBe(false);
    expect(source).toContain("Sitemap: https://www.frasma.org/sitemap.xml");
  });
});
