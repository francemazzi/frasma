import { DDT_SERVICE_ID } from "../knowledge/erp-examples";
import type { LocalizedText } from "../knowledge/types";
import { CampaignLandingSchema, type CampaignLanding } from "./types";

const text = (it: string, en: string): LocalizedText => ({ it, en });

/**
 * Campaign landing for "DDT verso ERP" (ChatGPT Ads, first test).
 *
 * The proof block is qualitative until Francesco provides measured figures.
 * To publish numbers, fill `docsPerMonth`, `timeBefore`, `timeAfter`,
 * `measuredOver` AND `sourceNote` (where and when it was measured): the schema
 * refuses figures without a source note. Never invent values.
 */
export const DDT_LANDING: CampaignLanding = CampaignLandingSchema.parse({
  id: "ddt-erp",
  entryId: DDT_SERVICE_ID,
  path: "/servizi/ddt-erp",
  hero: {
    kicker: text("Servizio · DDT verso l'ERP", "Service · Delivery notes into the ERP"),
    results: [
      text("DDT e bolle da email o PDF", "Delivery notes from email or PDF"),
      text("Dati verificati da una persona", "Data checked by a person"),
      text("Import pronto per il gestionale", "Import ready for the ERP"),
    ],
    ctaPrimary: text("Richiedi la verifica di fattibilità", "Request a feasibility check"),
    ctaSecondary: text("Scrivi su WhatsApp", "Write on WhatsApp"),
    mockCaption: text(
      "Esempio con dati inventati: il flusso legge il PDF, propone i campi, una persona conferma e poi parte l'import.",
      "Example with made-up data: the flow reads the PDF, proposes the fields, a person confirms, then the import runs.",
    ),
  },
  video: {
    youtubeId: "22K6TJAXmmE",
    title: text("Guarda il flusso su un caso pubblico", "Watch the flow on a public example"),
    caption: text(
      "Tutorial pubblico su email, PDF di DDT e registro Excel: la base del flusso verso il tuo gestionale.",
      "Public tutorial on email, delivery-note PDFs and an Excel register: the base of the flow into your ERP.",
    ),
  },
  howItWorks: [
    {
      title: text("Arrivo del documento", "The document arrives"),
      body: text(
        "Email del fornitore, PDF, scansione o portale: il DDT entra nel flusso così com'è, senza tracciati già pronti.",
        "Supplier email, PDF, scan or portal: the delivery note enters the flow as it is, with no ready-made layout.",
      ),
    },
    {
      title: text("Lettura ed estrazione", "Reading and extraction"),
      body: text(
        "Il flusso riconosce DDT e bolle ed estrae fornitore, numero, data, righe e quantità. I campi incerti vengono segnalati, non indovinati.",
        "The flow recognises delivery notes and packing slips and extracts supplier, number, date, lines and quantities. Uncertain fields are flagged, not guessed.",
      ),
    },
    {
      title: text("Verifica di una persona", "A person checks"),
      body: text(
        "Chi conosce il magazzino conferma o corregge prima dell'import. Nessun carico cieco in magazzino o in contabilità.",
        "Someone who knows the warehouse confirms or corrects before the import. No blind load into stock or accounting.",
      ),
    },
    {
      title: text("Import tracciato nell'ERP", "Traced import into the ERP"),
      body: text(
        "I campi confermati vanno nel tracciato reale di Mago, TeamSystem, Zucchetti, eSolver, FullWORK o del gestionale già in uso, che resta quello.",
        "Confirmed fields go into the real layout of Mago, TeamSystem, Zucchetti, eSolver, FullWORK or the ERP already in use, which stays in place.",
      ),
    },
  ],
  proof: {
    sector: text("Manifattura, ciclo passivo", "Manufacturing, purchase cycle"),
    erp: text("Gestionale già in azienda", "ERP already in the company"),
    before: text(
      "Dati copiati a mano da DDT, fatture e specifiche tecniche dentro ERP, Excel e preventivi, con versioni diverse della stessa commessa tra ufficio tecnico, commerciale e produzione.",
      "Data copied by hand from delivery notes, invoices and technical specs into the ERP, spreadsheets and quotes, with different versions of the same job across technical office, sales and production.",
    ),
    after: text(
      "Lettura automatica dei documenti, controllo di una persona sui campi incerti, output tracciato verso l'ERP e i preventivi.",
      "Automatic document reading, a person checking uncertain fields, traced output into the ERP and the quotes.",
    ),
    result: text(
      "I numeri (documenti al mese, minuti per documento prima e dopo) vengono pubblicati solo dopo una baseline misurata sul processo reale. Finché non ci sono, questa pagina non li promette.",
      "Figures (documents per month, minutes per document before and after) are published only after a baseline measured on the real process. Until then, this page does not promise them.",
    ),
    evidence: [
      {
        label: text("Tutorial pubblico: DDT da email a registro Excel (video)", "Public tutorial: delivery notes from email to an Excel register (video)"),
        href: "https://youtu.be/22K6TJAXmmE",
      },
      {
        label: text("Articolo: come automatizzare i DDT ricevuti via email", "Article: how to automate delivery notes received by email"),
        href: "/blog/automatizzare-ddt-email-intelligenza-artificiale",
      },
      {
        label: text("Caso anonimo: documenti ERP e preventivi manifatturieri", "Anonymous case: manufacturing ERP documents and quotes"),
        href: "/casi/documenti-erp-manifattura",
      },
    ],
  },
  nextSteps: [
    {
      title: text("Risposta via email", "A reply by email"),
      body: text(
        "Francesco legge la richiesta e risponde di persona, di norma entro un giorno lavorativo, con le prime domande sul processo.",
        "Francesco reads the request and replies in person, usually within one working day, with the first questions about the process.",
      ),
    },
    {
      title: text("Call di qualificazione", "Qualification call"),
      timing: text("20 minuti", "20 minutes"),
      body: text(
        "Venti minuti per capire volumi, gestionale in uso e chi valida i dati oggi. Se il problema non è adatto, lo diciamo subito.",
        "Twenty minutes to understand volumes, the ERP in use and who validates data today. If the problem is not a fit, we say so right away.",
      ),
    },
    {
      title: text("Verifica di fattibilità su documenti reali", "Feasibility check on real documents"),
      body: text(
        "Ci inviate un campione di DDT (tre-cinque documenti) e il tracciato di import del gestionale, se esiste. Verifichiamo lettura, campi incerti ed export sul vostro caso, non su un demo.",
        "You send a sample of delivery notes (three to five documents) and the ERP import layout, if there is one. We check reading, uncertain fields and export on your case, not on a demo.",
      ),
    },
    {
      title: text("Proposta con perimetro", "A proposal with a scope"),
      body: text(
        "Se la verifica regge, ricevete una proposta con perimetro, cosa è incluso e cosa serve da parte vostra. Il preventivo si discute in call.",
        "If the check holds, you receive a proposal with the scope, what is included and what we need from you. The quote is discussed in a call.",
      ),
    },
  ],
  quoteModel: {
    title: text("Come si forma il preventivo", "How the quote is built"),
    bullets: [
      text(
        "Un progetto una tantum, a preventivo sul perimetro: sviluppo, configurazione sul tracciato del vostro ERP, collaudo e formazione di base.",
        "A one-off project, quoted on the scope: development, configuration on your ERP layout, acceptance test and basic training.",
      ),
      text(
        "Una manutenzione mensile dopo l'accettazione, con ore di assistenza incluse, proporzionata alla dimensione dell'azienda e del progetto.",
        "A monthly maintenance after acceptance, with support hours included, sized to the company and the project.",
      ),
      text(
        "Le cifre si vedono in call, dopo la verifica di fattibilità: nessun listino universale, nessuna promessa di risparmio senza una baseline misurata.",
        "Figures are shown in a call, after the feasibility check: no universal price list, no savings promised without a measured baseline.",
      ),
    ],
  },
  needs: {
    title: text("Cosa serve da parte vostra", "What we need from you"),
    items: [
      text(
        "Un campione di DDT reali: tre-cinque documenti, anche con i dati sensibili oscurati.",
        "A sample of real delivery notes: three to five documents, sensitive data masked if you prefer.",
      ),
      text(
        "Nome e versione del gestionale e, se esiste, il tracciato o un esempio di import.",
        "Name and version of the ERP and, if it exists, the import layout or a sample import file.",
      ),
      text(
        "Una persona che oggi conosce il processo e potrà validare i dati.",
        "A person who knows the process today and will validate the data.",
      ),
      text(
        "Un'idea dei volumi: quanti documenti al mese e quanto tempo portano via.",
        "A rough idea of volumes: how many documents per month and how much time they take.",
      ),
    ],
  },
  form: {
    title: text("Richiedi la verifica di fattibilità", "Request a feasibility check"),
    intro: text(
      "Scrivi come arrivano oggi i DDT e dove devono finire. Rispondo io, non un commerciale.",
      "Tell me how delivery notes arrive today and where they need to go. I reply myself, not a sales team.",
    ),
    systemsPlaceholder: text(
      "Mago4, TeamSystem, Zucchetti, eSolver, FullWORK…",
      "Mago4, TeamSystem, Zucchetti, eSolver, FullWORK…",
    ),
    volumePlaceholder: text("es. 300 DDT al mese", "e.g. 300 delivery notes per month"),
    processPlaceholder: text(
      "Es. i DDT arrivano come PDF via email, li ricopiamo a mano nel gestionale e a fine mese mancano sempre registrazioni…",
      "E.g. delivery notes arrive as PDFs by email, we retype them into the ERP and at month end some are always missing…",
    ),
    assurance: text(
      "Nessun impegno: la prima risposta serve a capire se il flusso ha senso sul vostro caso.",
      "No commitment: the first reply is there to see whether the flow makes sense for your case.",
    ),
  },
});
