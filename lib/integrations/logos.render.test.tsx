import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import IntegrationLogos from "../../components/organism/IntegrationLogos";
import HomeIntegrations from "../../components/organism/home/HomeIntegrations";
import { LanguageProvider } from "../i18n/context";

function render(node: ReactNode) {
  return renderToStaticMarkup(<LanguageProvider>{node}</LanguageProvider>);
}

describe("integration name rail", () => {
  it("prints product names and no brand files on the homepage rail", () => {
    const html = render(<IntegrationLogos />);

    expect(html).toContain("Zucchetti");
    expect(html).toContain("TeamSystem");
    expect(html).toContain("Business Central");
    expect(html).not.toContain("/image/integrations/");
    expect(html).not.toContain("<img");
  });

  it("prints the same names on the ad landing rail", () => {
    const html = render(<HomeIntegrations />);

    expect(html).toContain("Zucchetti");
    expect(html).toContain("TeamSystem");
    expect(html).not.toContain("/image/integrations/");
    expect(html).not.toContain("<img");
  });
});
