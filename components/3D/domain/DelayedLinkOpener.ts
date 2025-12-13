export class DelayedLinkOpener {
  private timeoutId: number | null = null;

  public openAfterDelay(url: string, delayMs: number): void {
    this.cancel();
    this.timeoutId = window.setTimeout(() => {
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
      this.timeoutId = null;
    }, delayMs);
  }

  public cancel(): void {
    if (this.timeoutId === null) return;
    window.clearTimeout(this.timeoutId);
    this.timeoutId = null;
  }
}


