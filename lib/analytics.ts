type FormEventName = "form_start" | "form_submit";

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: unknown[]) => void;
};

export function currentLandingPath(): string {
  if (typeof window === "undefined") return "/";
  const { pathname, search } = window.location;
  return `${pathname}${search}` || "/";
}

export function trackFormEvent(
  event: FormEventName,
  landing: string,
): void {
  if (typeof window === "undefined") return;

  const tracked = window as AnalyticsWindow;
  tracked.dataLayer = tracked.dataLayer || [];
  tracked.dataLayer.push({ event, landing });

  if (typeof tracked.gtag === "function") {
    tracked.gtag("event", event, { landing });
  }
}
