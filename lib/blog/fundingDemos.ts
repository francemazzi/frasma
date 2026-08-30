export type FundingDemoSlide = {
  id: string;
  name: string;
  description: string;
  variant: "peach" | "teal" | "lavender" | "mist";
  mock: "agent" | "preventivi" | "workflow" | "tickets" | "server" | "backup";
};

export type FundingDemo = {
  title: string;
  intro: string;
  slides: FundingDemoSlide[];
};

export const fundingDemosBySlug: Record<string, FundingDemo> = {
  "bando-si40-2026": {
    title: "Tre attività che un progetto SI4.0 può coprire",
    intro:
      "Scorri le schede: il cursore mostra il pezzo software. Sotto restano importi e mix di spesa. Non è una demo del bando, è il lavoro che Frasma può mettere in preventivo.",
    slides: [
      {
        id: "ddt",
        name: "DDT da email verso l’ERP",
        description:
          "Il PDF arriva in posta. L’AI propone i campi, una persona valida, poi si carica su Mago o TeamSystem.",
        variant: "peach",
        mock: "agent",
      },
      {
        id: "rfq",
        name: "RFQ e preventivi tracciati",
        description:
          "Offerte e solleciti escono da Excel. Priorità, stato e importi stanno in un’unica coda operativa.",
        variant: "mist",
        mock: "preventivi",
      },
      {
        id: "collaudo",
        name: "Procedure e collaudo",
        description:
          "Passi guidati, CCP o checklist di linea, con formazione sul nuovo flusso — voce ammissibile se il fornitore è qualificato.",
        variant: "lavender",
        mock: "workflow",
      },
    ],
  },
  "iperammortamento-2026": {
    title: "Cosa significa interconnettere, in pratica",
    intro:
      "L’iperammortamento chiede beni nuovi collegati a produzione o rete di fornitura. Queste tre attività mostrano il pezzo tecnico: server, dati, linea.",
    slides: [
      {
        id: "gpu",
        name: "Server GPU e modello locale",
        description:
          "Il modello parte in sede, poi si collega all’ERP. I dati di produzione non escono di default sul cloud pubblico.",
        variant: "teal",
        mock: "server",
      },
      {
        id: "documenti",
        name: "Documenti interni verso gestionale",
        description:
          "Estrazione da DDT o schede, validazione umana, scrittura controllata. Il software deve dialogare col sistema aziendale.",
        variant: "peach",
        mock: "agent",
      },
      {
        id: "linea",
        name: "Linea, lotti e collaudo",
        description:
          "Regole di processo e interfaccia verso MES: il file Excel isolato non è un bene interconnesso.",
        variant: "lavender",
        mock: "workflow",
      },
    ],
  },
  "voucher-cloud-cybersecurity-2026": {
    title: "Cosa sta nel voucher e cosa fa Frasma",
    intro:
      "Il voucher copre prodotti accreditati. Il carosello separa il pezzo cloud/cyber dal pezzo di integrazione, che di solito resta fuori dal piano agevolato.",
    slides: [
      {
        id: "backup",
        name: "Backup e continuità",
        description:
          "Piano e job su un tenant in elenco MIMIT. Questa è la voce tipica del voucher, se il codice prodotto è accreditato.",
        variant: "teal",
        mock: "backup",
      },
      {
        id: "integrazione",
        name: "Integrazione verso ERP",
        description:
          "Dopo il cloud, i documenti devono arrivare nel gestionale. Preventivo Frasma distinto, di regola non nel voucher.",
        variant: "peach",
        mock: "agent",
      },
      {
        id: "monitoraggio",
        name: "Code operative e priorità",
        description:
          "Ticket, allarmi o scadenze che usano il nuovo stack. Utile in azienda, raramente una voce dell’elenco accreditato.",
        variant: "mist",
        mock: "tickets",
      },
    ],
  },
  "voucher-doppia-transizione-lombardia-2026": {
    title: "Cosa finanziava, e cosa si può ancora fare",
    intro:
      "Lo sportello è chiuso. Le attività sotto restano il tipo di progetto che oggi si riporta su SI4.0, iperammortamento o un mix con cloud accreditato.",
    slides: [
      {
        id: "ddt",
        name: "Documenti verso Excel o ERP",
        description: "Meno copia-incolla su DDT e schede. Tecnologia + consulenza + formazione, come chiedeva il mix 30–70%.",
        variant: "peach",
        mock: "agent",
      },
      {
        id: "acquisti",
        name: "RFQ e fornitori",
        description: "Una coda condivisa al posto di email e fogli sparsi. Stesso schema, misura diversa.",
        variant: "mist",
        mock: "preventivi",
      },
      {
        id: "ufficio",
        name: "Ufficio tecnico guidato",
        description: "Preventivi e distinte con regole scritte, non ricopiate a mano ad ogni richiesta.",
        variant: "lavender",
        mock: "workflow",
      },
    ],
  },
};

export function getFundingDemo(slug: string): FundingDemo | undefined {
  return fundingDemosBySlug[slug];
}
