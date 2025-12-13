import { DelayedLinkOpener } from "./DelayedLinkOpener";

export type PlanetLinkPhase = "idle" | "exploding" | "cooldown";

export class PlanetLinkController {
  private readonly explosionSeconds: number;
  private readonly redirectDelayMs: number;
  private readonly cooldownMs: number;
  private readonly linkOpener: DelayedLinkOpener;

  private phase: PlanetLinkPhase = "idle";
  private elapsedExplosionSeconds = 0;
  private cooldownTimeoutId: number | null = null;

  public constructor(params?: {
    explosionSeconds?: number;
    redirectDelayMs?: number;
    cooldownMs?: number;
    linkOpener?: DelayedLinkOpener;
  }) {
    this.explosionSeconds = params?.explosionSeconds ?? 2.8;
    this.redirectDelayMs = params?.redirectDelayMs ?? 2200;
    this.cooldownMs = params?.cooldownMs ?? 2500;
    this.linkOpener = params?.linkOpener ?? new DelayedLinkOpener();
  }

  public getPhase(): PlanetLinkPhase {
    return this.phase;
  }

  public getExplosionProgress01(): number {
    if (this.phase === "idle") return 0;
    const p = this.elapsedExplosionSeconds / this.explosionSeconds;
    return Math.min(1, Math.max(0, p));
  }

  public start(url: string): boolean {
    if (this.phase !== "idle") return false;
    this.phase = "exploding";
    this.elapsedExplosionSeconds = 0;
    this.linkOpener.openAfterDelay(url, this.redirectDelayMs);
    return true;
  }

  public update(deltaSeconds: number): void {
    if (this.phase !== "exploding") return;
    this.elapsedExplosionSeconds += deltaSeconds;
    if (this.elapsedExplosionSeconds < this.explosionSeconds) return;

    this.phase = "cooldown";
    this.scheduleReset();
  }

  public dispose(): void {
    this.linkOpener.cancel();
    if (this.cooldownTimeoutId !== null) {
      window.clearTimeout(this.cooldownTimeoutId);
      this.cooldownTimeoutId = null;
    }
  }

  private scheduleReset(): void {
    if (this.cooldownTimeoutId !== null) window.clearTimeout(this.cooldownTimeoutId);
    this.cooldownTimeoutId = window.setTimeout(() => {
      this.phase = "idle";
      this.elapsedExplosionSeconds = 0;
      this.cooldownTimeoutId = null;
    }, this.cooldownMs);
  }
}


