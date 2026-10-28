/** Minimal browser analytics shims. Everything is optional and never throws. */
export type AnalyticsWindow = {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
  oaiq?: (...args: unknown[]) => void;
};

function browserWindow(): AnalyticsWindow | undefined {
  if (typeof window === "undefined") return undefined;
  return window as unknown as AnalyticsWindow;
}

/** Sends a GA4 event through gtag, falling back to a dataLayer push for GTM. */
export function trackEvent(
  name: string,
  params: Record<string, unknown> = {},
  win: AnalyticsWindow | undefined = browserWindow(),
): boolean {
  if (!win) return false;
  try {
    if (typeof win.gtag === "function") {
      win.gtag("event", name, params);
      return true;
    }
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({ event: name, ...params });
      return true;
    }
  } catch {
    // Analytics must never break the page.
  }
  return false;
}
