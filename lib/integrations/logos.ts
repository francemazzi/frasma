export type IntegrationLogoKind = "erp" | "cad";

export type IntegrationLogo = {
  id: string;
  name: string;
  kind: IntegrationLogoKind;
  src?: string;
  alt: string;
};

export const INTEGRATION_LOGOS: readonly IntegrationLogo[] = [
  {
    id: "zucchetti",
    name: "Zucchetti",
    kind: "erp",
    src: "/image/integrations/zucchetti.svg",
    alt: "Zucchetti",
  },
  {
    id: "teamsystem",
    name: "TeamSystem",
    kind: "erp",
    src: "/image/integrations/teamsystem.svg",
    alt: "TeamSystem",
  },
  {
    id: "mago",
    name: "Mago",
    kind: "erp",
    src: "/image/integrations/mago.svg",
    alt: "Mago",
  },
  {
    id: "arca",
    name: "Arca",
    kind: "erp",
    src: "/image/integrations/arca.svg",
    alt: "Arca Evolution",
  },
  {
    id: "esolver",
    name: "eSolver",
    kind: "erp",
    src: "/image/integrations/esolver.svg",
    alt: "eSolver",
  },
  {
    id: "gesco",
    name: "Gesco",
    kind: "erp",
    alt: "Gesco",
  },
  {
    id: "mexal",
    name: "Mexal",
    kind: "erp",
    src: "/image/integrations/mexal.svg",
    alt: "Mexal",
  },
  {
    id: "odoo",
    name: "Odoo",
    kind: "erp",
    src: "/image/integrations/odoo.svg",
    alt: "Odoo",
  },
  {
    id: "sap",
    name: "SAP",
    kind: "erp",
    src: "/image/integrations/sap.svg",
    alt: "SAP",
  },
  {
    id: "business-central",
    name: "Business Central",
    kind: "erp",
    src: "/image/integrations/business-central.svg",
    alt: "Microsoft Dynamics 365 Business Central",
  },
  {
    id: "autocad",
    name: "AutoCAD",
    kind: "cad",
    src: "/image/integrations/autocad.svg",
    alt: "AutoCAD",
  },
  {
    id: "inventor",
    name: "Inventor",
    kind: "cad",
    src: "/image/integrations/inventor.svg",
    alt: "Autodesk Inventor",
  },
];

const FORBIDDEN_LOGO_IDS = ["bitlam", "fullwork", "btram"] as const;

export function integrationLogoIds(): string[] {
  return INTEGRATION_LOGOS.map((logo) => logo.id);
}

export function hasForbiddenIntegrationLogo(): boolean {
  const ids = new Set(integrationLogoIds());
  return FORBIDDEN_LOGO_IDS.some((id) => ids.has(id));
}
