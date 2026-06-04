import { useEffect } from "react";

type ModelContextLike = {
  registerTool?: (...args: unknown[]) => unknown;
  provideContext?: (...args: unknown[]) => unknown;
};

type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input?: unknown) => unknown | Promise<unknown>;
};

type CleanupCandidate =
  | (() => void)
  | CleanupObject;

type CleanupObject = {
  unregister?: () => void;
  dispose?: () => void;
  remove?: () => void;
};

declare global {
  interface Document {
    modelContext?: ModelContextLike;
  }

  interface Navigator {
    modelContext?: ModelContextLike;
  }
}

const NAVIGATION_PATHS = [
  "/",
  "/progetti",
  "/blog",
  "/programmatore-freelance",
  "/manifattura",
  "/vibeup",
  "/linktree",
] as const;

const NAVIGATION_PATH_SET = new Set<string>(NAVIGATION_PATHS);

function getModelContext(): ModelContextLike | undefined {
  if (typeof document !== "undefined" && document.modelContext) {
    return document.modelContext;
  }

  if (typeof navigator !== "undefined" && navigator.modelContext) {
    return navigator.modelContext;
  }

  return undefined;
}

function getPath(input: unknown): string {
  if (!input || typeof input !== "object") return "/";

  const path = (input as { path?: unknown }).path;
  return typeof path === "string" ? path : "/";
}

function toCleanup(candidate: unknown): (() => void) | null {
  if (typeof candidate === "function") {
    return candidate as () => void;
  }

  if (!candidate || typeof candidate !== "object") return null;

  const cleanup = candidate as CleanupObject;
  if (typeof cleanup.unregister === "function") return cleanup.unregister;
  if (typeof cleanup.dispose === "function") return cleanup.dispose;
  if (typeof cleanup.remove === "function") return cleanup.remove;

  return null;
}

function registerTool(
  modelContext: ModelContextLike,
  tool: WebMcpTool,
  signal: AbortSignal,
): (() => void) | null {
  if (typeof modelContext.registerTool === "function") {
    const descriptor = {
      description: tool.description,
      inputSchema: tool.inputSchema,
      execute: tool.execute,
    };

    try {
      return toCleanup(modelContext.registerTool(tool, { signal }));
    } catch {
      try {
        return toCleanup(
          modelContext.registerTool(tool.name, descriptor, { signal }),
        );
      } catch {
        return null;
      }
    }
  }

  if (typeof modelContext.provideContext === "function") {
    try {
      return toCleanup(modelContext.provideContext({ tools: [tool] }, { signal }));
    } catch {
      return null;
    }
  }

  return null;
}

const WEB_MCP_TOOLS: WebMcpTool[] = [
  {
    name: "get_frasma_profile",
    description:
      "Return public information about Frasma, Francesco Saverio Mazzi, services, focus areas, and public discovery endpoints.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {},
    },
    execute: () => ({
      name: "Frasma",
      owner: "Francesco Saverio Mazzi",
      website: "https://www.frasma.org/",
      services: [
        "Custom web applications",
        "AI automations",
        "Agent and MCP integration strategy",
        "ERP and API integrations",
        "Operational workflow software",
      ],
      focusAreas: [
        "manufacturing",
        "food and quality",
        "agriculture and agronomy",
        "field service",
      ],
      discovery: {
        apiCatalog: "https://www.frasma.org/.well-known/api-catalog",
        openapi: "https://www.frasma.org/openapi.json",
        agentSkills:
          "https://www.frasma.org/.well-known/agent-skills/index.json",
        status: "https://www.frasma.org/api/status",
      },
    }),
  },
  {
    name: "navigate_frasma",
    description:
      "Navigate the current browser tab to a public Frasma page from an allowlisted set of website paths.",
    inputSchema: {
      type: "object",
      required: ["path"],
      additionalProperties: false,
      properties: {
        path: {
          type: "string",
          enum: NAVIGATION_PATHS,
        },
      },
    },
    execute: (input) => {
      const path = getPath(input);
      if (!NAVIGATION_PATH_SET.has(path)) {
        return {
          ok: false,
          error: "Unsupported path.",
          supportedPaths: NAVIGATION_PATHS,
        };
      }

      window.location.assign(path);
      return { ok: true, path };
    },
  },
];

export default function WebMcpProvider() {
  useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext) return;

    const controller = new AbortController();
    const cleanups = WEB_MCP_TOOLS.map((tool) =>
      registerTool(modelContext, tool, controller.signal),
    ).filter((cleanup): cleanup is () => void => Boolean(cleanup));

    return () => {
      controller.abort();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
