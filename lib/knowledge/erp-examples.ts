import type { Locale, LocalizedText } from "./types";

export const DDT_SERVICE_ID = "delivery-notes-to-erp";
export const APPS_SERVICE_ID = "custom-management-software";

export type SystemExampleKind = "erp" | "cad" | "cam";
export type OperationsServiceId = typeof DDT_SERVICE_ID | typeof APPS_SERVICE_ID;

export type SystemExample = {
  id: string;
  kind: SystemExampleKind;
  name: LocalizedText;
  sector: LocalizedText;
  process: LocalizedText;
  serviceIds: readonly OperationsServiceId[];
};

const text = (it: string, en: string): LocalizedText => ({ it, en });

export const SYSTEM_EXAMPLES: readonly SystemExample[] = [
  {
    id: "zucchetti",
    kind: "erp",
    name: text("Zucchetti", "Zucchetti"),
    sector: text("Ciclo passivo", "Purchase cycle"),
    process: text(
      "Fatture e DDT da PDF: i campi escono, si abbinano, una persona conferma, poi Zucchetti riceve l'import.",
      "Invoices and delivery notes from PDF: fields come out, they are matched, a person confirms, then Zucchetti receives the import.",
    ),
    serviceIds: [DDT_SERVICE_ID],
  },
  {
    id: "esolver",
    kind: "erp",
    name: text("eSolver", "eSolver"),
    sector: text("Mangimificio", "Feed mill"),
    process: text(
      "Bolla di carta fotografata: fornitore, quantità e lotto; una persona conferma; poi il carico magazzino va in eSolver.",
      "A photographed paper delivery note: supplier, quantity, and lot; a person confirms; then the warehouse load goes into eSolver.",
    ),
    serviceIds: [DDT_SERVICE_ID],
  },
  {
    id: "fullwork",
    kind: "erp",
    name: text("FullWORK", "FullWORK"),
    sector: text(
      "Lamiere, distinte e documenti",
      "Sheet metal, bills of materials, and documents",
    ),
    process: text(
      "Campi confermati su anagrafiche, articoli e distinte, poi l'export verso FullWORK. Non si sostituisce il gestionale.",
      "Confirmed fields on master data, articles, and bills of materials, then the export into FullWORK. The management system is not replaced.",
    ),
    serviceIds: [DDT_SERVICE_ID, APPS_SERVICE_ID],
  },
  {
    id: "arca",
    kind: "erp",
    name: text("Arca", "Arca"),
    sector: text("Officina", "Workshop"),
    process: text(
      "Distinta da disegno e Excel Inventor: una persona conferma i codici, poi l'Excel è pronto per l'import in Arca.",
      "A bill of materials from a drawing and Inventor spreadsheet: a person confirms the codes, then the spreadsheet is ready to import into Arca.",
    ),
    serviceIds: [APPS_SERVICE_ID],
  },
  {
    id: "gesco",
    kind: "erp",
    name: text("Gesco", "Gesco"),
    sector: text("Officina", "Workshop"),
    process: text(
      "Ordini d'acquisto in PDF: le righe escono, una persona conferma, poi Excel o CSV verso Gesco.",
      "Purchase orders as PDFs: lines come out, a person confirms, then a spreadsheet or CSV goes into Gesco.",
    ),
    serviceIds: [APPS_SERVICE_ID],
  },
  {
    id: "six",
    kind: "erp",
    name: text("Six (Planet Group)", "Six (Planet Group)"),
    sector: text("Lavorazione lamiere", "Sheet-metal work"),
    process: text(
      "Da STEP o PDF alla distinta; una persona conferma, poi Six riceve i dati. Non si sostituisce il gestionale.",
      "From STEP or PDF to a bill of materials; a person confirms, then Six receives the data. The management system is not replaced.",
    ),
    serviceIds: [APPS_SERVICE_ID],
  },
  {
    id: "inventor",
    kind: "cad",
    name: text("Inventor (Autodesk)", "Inventor (Autodesk)"),
    sector: text("Ufficio tecnico", "Technical office"),
    process: text(
      "Il modello 3D o DWG è la fonte della distinta; una persona conferma i codici; l'arrivo è il gestionale già in uso, non Inventor.",
      "The 3D model or DWG is the source of the bill of materials; a person confirms the codes; the destination is the management system already in use, not Inventor.",
    ),
    serviceIds: [APPS_SERVICE_ID],
  },
  {
    id: "bystronic",
    kind: "cam",
    name: text(
      "Bystronic — BySoft, ByCut, ByTube, ByBend",
      "Bystronic — BySoft, ByCut, ByTube, ByBend",
    ),
    sector: text("Taglio, tubo e piega", "Cutting, tube, and bending"),
    process: text(
      "Piani di taglio e codici macchina restano su Bystronic; i dati confermati vanno al gestionale, senza sostituire CAD o macchina.",
      "Cutting plans and machine codes stay on Bystronic; confirmed data go to the management system, without replacing CAD or the machine.",
    ),
    serviceIds: [APPS_SERVICE_ID],
  },
];

export function erpExamples(): SystemExample[] {
  return SYSTEM_EXAMPLES.filter((example) => example.kind === "erp");
}

export function cadCamExamples(): SystemExample[] {
  return SYSTEM_EXAMPLES.filter(
    (example) => example.kind === "cad" || example.kind === "cam",
  );
}

export function examplesForService(serviceId: OperationsServiceId): {
  erp: SystemExample[];
  cadCam: SystemExample[];
} {
  const matching = SYSTEM_EXAMPLES.filter((example) =>
    example.serviceIds.includes(serviceId),
  );

  if (serviceId === DDT_SERVICE_ID) {
    return {
      erp: matching.filter((example) => example.kind === "erp"),
      cadCam: [],
    };
  }

  return {
    erp: matching.filter((example) => example.kind === "erp"),
    cadCam: matching.filter(
      (example) => example.kind === "cad" || example.kind === "cam",
    ),
  };
}

export function formatExampleLine(
  example: SystemExample,
  locale: Locale,
): string {
  return `${example.name[locale]} — ${example.sector[locale]}: ${example.process[locale]}`;
}
