import { describe, expect, it, vi } from "vitest";
import {
  isEventId,
  landingSourceUrl,
  leadCreatedPayload,
  sendLeadCreatedEvent,
} from "./conversions";

const event = {
  id: "6f1c2c3a-1b2c-4d5e-8f90-123456789abc",
  timestampMs: 1_778_000_000_000,
  sourceUrl: "https://www.frasma.org/lp/ordini-ddt?oppref=click-1",
  oppref: "click-1",
  obref: "browser-1",
  ipAddress: "203.0.113.8",
  userAgent: "Mozilla/5.0",
};

describe("leadCreatedPayload", () => {
  it("matches the Conversions API lead event", () => {
    expect(leadCreatedPayload(event)).toEqual({
      validate_only: false,
      events: [
        {
          id: event.id,
          type: "lead_created",
          timestamp_ms: event.timestampMs,
          oppref: "click-1",
          source_url: event.sourceUrl,
          action_source: "web",
          user: {
            obref: "browser-1",
            ip_address: "203.0.113.8",
            user_agent: "Mozilla/5.0",
          },
          data: { type: "customer_action" },
        },
      ],
    });
  });

  it("omits attribution fields that were not captured", () => {
    const payload = leadCreatedPayload({
      id: event.id,
      timestampMs: event.timestampMs,
      sourceUrl: "https://www.frasma.org/lp/ordini-ddt",
    });
    expect(payload.events[0]).not.toHaveProperty("oppref");
    expect(payload.events[0]).not.toHaveProperty("user");
  });
});

describe("landingSourceUrl", () => {
  it("keeps the public landing URL and drops other hosts", () => {
    expect(landingSourceUrl("https://www.frasma.org/lp/ordini-ddt?oppref=a#form")).toBe(
      "https://www.frasma.org/lp/ordini-ddt?oppref=a",
    );
    expect(landingSourceUrl("https://evil.example/lp/ordini-ddt")).toBeUndefined();
    expect(landingSourceUrl("http://www.frasma.org/lp/ordini-ddt")).toBeUndefined();
  });
});

describe("isEventId", () => {
  it("accepts a uuid and rejects a short or spaced value", () => {
    expect(isEventId(event.id)).toBe(true);
    expect(isEventId("short")).toBe(false);
    expect(isEventId("has space-here")).toBe(false);
  });
});

describe("sendLeadCreatedEvent", () => {
  it("posts the event with the server key and the pixel id", async () => {
    const fetchImpl = vi.fn(async () => new Response("{}", { status: 200 }));
    const ok = await sendLeadCreatedEvent(event, "test-key", fetchImpl);
    expect(ok).toBe(true);
    const [url, init] = fetchImpl.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(
      "https://bzr.openai.com/v1/events?pid=486zF127dHBQWpfKXd4umE",
    );
    expect(new Headers(init.headers).get("Authorization")).toBe("Bearer test-key");
    expect(JSON.parse(String(init.body))).toMatchObject({
      events: [{ type: "lead_created", id: event.id }],
    });
  });
});
