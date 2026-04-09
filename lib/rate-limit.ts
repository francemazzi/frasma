import type { NextApiRequest } from "next";

export interface IRateLimiter {
  allow(key: string): boolean;
}

export class InMemoryFixedWindowRateLimiter implements IRateLimiter {
  private readonly _hitsByKey: Map<
    string,
    { windowStartMs: number; hits: number }
  > = new Map();

  public constructor(
    private readonly _maxHits: number,
    private readonly _windowMs: number
  ) {}

  public allow(key: string): boolean {
    const now = Date.now();
    const entry = this._hitsByKey.get(key);

    if (!entry) {
      this._hitsByKey.set(key, { windowStartMs: now, hits: 1 });
      return true;
    }

    if (now - entry.windowStartMs > this._windowMs) {
      this._hitsByKey.set(key, { windowStartMs: now, hits: 1 });
      return true;
    }

    if (entry.hits >= this._maxHits) {
      return false;
    }

    entry.hits += 1;
    return true;
  }
}

export function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwarded)
    ? forwarded[0]
    : typeof forwarded === "string"
      ? forwarded.split(",")[0]?.trim()
      : req.socket.remoteAddress || "unknown";

  return ip || "unknown";
}
