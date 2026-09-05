import { describe, expect, it } from "vitest";
import {
  buildRegisteredVisitorContextMessage,
  mergeBriefWithVisitor,
} from "./visitor-context";

describe("visitor context helpers", () => {
  it("builds a registered visitor system message", () => {
    const message = buildRegisteredVisitorContextMessage({
      name: "Francesco",
      email: "francesco@example.com",
      company: "Test",
      sector: "lamiera",
    });

    expect(message).toContain("Francesco");
    expect(message).toContain("francesco@example.com");
    expect(message).toContain("Do not ask for name, email, or company again");
  });

  it("merges registered visitor fields into an incomplete brief", () => {
    const merged = mergeBriefWithVisitor(
      {
        name: "",
        clientEmail: "",
        process: "Manual DDT extraction every day",
      },
      {
        name: "Francesco",
        email: "francesco@example.com",
        company: "Test",
        sector: "lamiera",
      },
    );

    expect(merged.name).toBe("Francesco");
    expect(merged.clientEmail).toBe("francesco@example.com");
    expect(merged.company).toBe("Test");
  });

  it("keeps chat corrections over registered visitor defaults", () => {
    const merged = mergeBriefWithVisitor(
      {
        name: "Francesco",
        clientEmail: "francesco@example.com",
        company: "Nuova Azienda",
      },
      {
        name: "Visitatore",
        email: "visitatore@example.com",
        company: "Vecchia Azienda",
        sector: "test",
      },
    );

    expect(merged.company).toBe("Nuova Azienda");
  });
});
