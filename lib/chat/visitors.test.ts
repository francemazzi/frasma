import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ChatRegisterSchema,
  normalizeVisitorEmail,
} from "./visitors";

describe("chat visitor helpers", () => {
  afterEach(() => {
    delete process.env.MONGODB_URI;
    vi.restoreAllMocks();
  });

  it("normalizes visitor emails to lowercase", () => {
    expect(normalizeVisitorEmail("  Ada@Example.COM ")).toBe("ada@example.com");
  });

  it("validates registration payload", () => {
    const parsed = ChatRegisterSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      company: "Analytical Engines",
      sector: "Manufacturing",
      lang: "it",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects incomplete registration payload", () => {
    const parsed = ChatRegisterSchema.safeParse({
      name: "Ada",
      email: "not-an-email",
      company: "",
      sector: "Manufacturing",
    });
    expect(parsed.success).toBe(false);
  });

  it("rejects honeypot values after schema parse in the API", () => {
    const parsed = ChatRegisterSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      company: "Analytical Engines",
      sector: "Manufacturing",
      honeypot: "bot",
    });
    expect(parsed.success).toBe(true);
  });
});
