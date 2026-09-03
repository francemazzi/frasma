import type { LocalizedText } from "./types";

export type PageFaq = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type PageArticle = {
  path: string;
  title: LocalizedText;
};

export type PageExtras = {
  problemLead?: LocalizedText;
  videoUrl?: string;
  videoTitle?: LocalizedText;
  articles?: PageArticle[];
  faqs?: PageFaq[];
};

const text = (it: string, en: string): LocalizedText => ({ it, en });

export const PAGE_EXTRAS: Record<string, PageExtras> = {
  "delivery-notes-to-erp": {
    problemLead: text(
      "Per chi registra ancora DDT e bolle a mano nel ciclo passivo, da email o PDF, verso Mago, Mago4, TeamSystem o un altro ERP già in azienda.",
      "For teams still typing delivery notes and packing slips by hand in the purchase cycle, from email or PDF, into Mago, Mago4, TeamSystem, or another ERP already in the company.",
    ),
    videoUrl: "https://youtu.be/22K6TJAXmmE",
    videoTitle: text(
      "Automatizzare l'inserimento dei DDT con l'intelligenza artificiale",
      "Automating delivery-note entry with AI",
    ),
    articles: [
      {
        path: "/blog/automatizzare-ddt-email-intelligenza-artificiale",
        title: text(
          "Come automatizzare i DDT ricevuti via email",
          "How to automate delivery notes received by email",
        ),
      },
      {
        path: "/blog/non-collegare-agenti-ai-direttamente-erp",
        title: text(
          "Non collegare gli agenti AI direttamente all'ERP",
          "Do not connect AI agents directly to the ERP",
        ),
      },
    ],
    faqs: [
      {
        question: text(
          "Potete leggere i DDT da email o PDF e prepararli per Mago o TeamSystem?",
          "Can you read delivery notes from email or PDF and prepare them for Mago or TeamSystem?",
        ),
        answer: text(
          "Sì, su un perimetro definito: il flusso legge il documento, struttura i campi e segnala quelli da verificare prima dell'importazione nell'ERP già in uso. Non sostituiamo il gestionale.",
          "Yes, on a defined scope: the workflow reads the document, structures fields, and flags those that need review before import into the ERP already in use. We do not replace the management system.",
        ),
      },
      {
        question: text(
          "Si può collegare un agente AI direttamente all'ERP?",
          "Can you connect an AI agent directly to the ERP?",
        ),
        answer: text(
          "No. L'AI legge e prepara; una persona valida prima dell'import tracciato. Il percorso operativo è DDT verso ERP. La tesi è in https://www.frasma.org/blog/non-collegare-agenti-ai-direttamente-erp",
          "No. AI reads and prepares; a person validates before the traced import. The operational path is delivery notes into ERP. The argument is at https://www.frasma.org/blog/non-collegare-agenti-ai-direttamente-erp",
        ),
      },
      {
        question: text(
          "Serve ancora una persona che controlla i dati?",
          "Does a person still need to check the data?",
        ),
        answer: text(
          "Sì. La validazione umana e la tracciabilità restano parte del flusso, soprattutto sulle eccezioni e sui campi incerti.",
          "Yes. Human validation and traceability stay in the workflow, especially for exceptions and uncertain fields.",
        ),
      },
      {
        question: text(
          "Esiste un tutorial pubblico su questo processo?",
          "Is there a public tutorial for this process?",
        ),
        answer: text(
          "Sì: un articolo e un video YouTube mostrano un esempio su email, PDF DDT e registro Excel, come base per un flusso verso Mago, TeamSystem o un altro ERP.",
          "Yes: an article and a YouTube video show an example with email, delivery-note PDFs, and an Excel register, as a basis for a flow into Mago, TeamSystem, or another ERP.",
        ),
      },
      {
        question: text(
          "Cosa significa “Delega la forma, verifica i fatti”?",
          "What does “Delegate the form, verify the facts” mean?",
        ),
        answer: text(
          "L'AI può strutturare email, PDF e tabelle; una persona verifica i fatti prima che i dati entrino in ERP o in un registro ufficiale. Non c'è un listino universale e non deleghiamo importazioni cieche.",
          "AI can structure emails, PDFs, and tables; a person verifies the facts before data enter the ERP or an official register. There is no universal price list, and we do not delegate blind imports.",
        ),
      },
    ],
  },
  "workflow-procedures": {
    problemLead: text(
      "Per chi gestisce HACCP, certificazioni o controlli qualità ancora su moduli, email e cartelle, con eccezioni che nessuno vede.",
      "For teams still running HACCP, certifications, or quality controls on forms, email, and folders, with exceptions nobody sees.",
    ),
    faqs: [
      {
        question: text(
          "Serve per pratiche HACCP, qualità o certificazioni con eccezioni?",
          "Does it cover HACCP, quality, or certification filings with exceptions?",
        ),
        answer: text(
          "Sì, quando il processo ha stati, regole e documenti da produrre. Il workflow guida i passaggi; le eccezioni restano visibili e assegnate a una persona.",
          "Yes, when the process has states, rules, and documents to produce. The workflow guides the steps; exceptions stay visible and assigned to a person.",
        ),
      },
      {
        question: text(
          "L'AI chiude le procedure al posto del team?",
          "Does AI close procedures instead of the team?",
        ),
        answer: text(
          "No. L'AI può preparare o classificare; decisioni, firme e avanzamento di stato restano del team. Non vendiamo un listino di automazioni chiavi in mano.",
          "No. AI can prepare or classify; decisions, signatures, and status changes stay with the team. We do not sell a price list of turnkey automations.",
        ),
      },
    ],
  },
  "field-service-ticketing": {
    problemLead: text(
      "Per chi coordina tecnici e interventi ancora da telefono ed email, senza uno storico condiviso di ticket e SLA.",
      "For teams still coordinating technicians and interventions by phone and email, without a shared history of tickets and SLAs.",
    ),
  },
  "custom-management-software": {
    problemLead: text(
      "Per un processo di back office che l'ERP non copre: tabelle, stati e ruoli sul lavoro reale, con export verso i sistemi già in uso.",
      "For a back-office process the ERP does not cover: tables, states, and roles on the real work, with exports into systems already in use.",
    ),
  },
  "company-wiki-brain": {
    problemLead: text(
      "Per procedure e know-how che oggi stanno in PDF e chat, e che il team deve poter cercare citando la fonte.",
      "For procedures and know-how that today live in PDFs and chat, and that the team must be able to search with a cited source.",
    ),
    faqs: [
      {
        question: text(
          "È un chatbot su una cartella di PDF sparsi?",
          "Is it a chatbot over a folder of scattered PDFs?",
        ),
        answer: text(
          "No. Le fonti vengono strutturate, versionate e collegate a chi le aggiorna. La ricerca AI cita quelle fonti e rispetta accessi e confini informativi.",
          "No. Sources are structured, versioned, and assigned to whoever updates them. AI search cites those sources and respects access and information boundaries.",
        ),
      },
      {
        question: text(
          "Le risposte della wiki sostituiscono il controllo umano?",
          "Do wiki answers replace human review?",
        ),
        answer: text(
          "No. Servono a trovare la procedura o il documento giusto più in fretta. Validazione, responsabilità e aggiornamento restano delle persone; non promettiamo un cervello aziendale autonomo.",
          "No. They help find the right procedure or document faster. Validation, ownership, and updates stay with people; we do not promise an autonomous company brain.",
        ),
      },
    ],
  },
  "local-ai-enterprise": {
    problemLead: text(
      "Per dati e documenti che non possono uscire dall'azienda: modelli e agenti sulla rete privata, con vincoli GDPR espliciti.",
      "For data and documents that cannot leave the company: models and agents on the private network, with explicit GDPR constraints.",
    ),
  },
  "ai-presence": {
    problemLead: text(
      "Per far trovare l'azienda a ChatGPT, Claude e Gemini con fatti strutturati, non con un copy generico sulla home.",
      "For making the company findable by ChatGPT, Claude, and Gemini with structured facts, not generic homepage copy.",
    ),
  },
  "food-quality": {
    problemLead: text(
      "Il verticale alimentare di Frasma è su HACCP, certificazioni e controlli — procedure guidate, non un MES di stabilimento.",
      "Frasma's food vertical is HACCP, certifications, and controls — guided procedures, not a plant MES.",
    ),
  },
  "agronomy-agri-food": {
    problemLead: text(
      "Pratiche, tracciabilità e quaderni di campagna tra più aziende della stessa rete, con eccezioni esplicite.",
      "Filings, traceability, and field notebooks across several companies in the same network, with explicit exceptions.",
    ),
  },
  "field-service": {
    problemLead: text(
      "Manutenzione e assistenza sul campo: dalla richiesta all'intervento chiuso, con tecnici e fornitori nello stesso flusso.",
      "Field maintenance and support: from the request to a closed intervention, with technicians and suppliers in the same workflow.",
    ),
  },
  "industrial-maintenance-case": {
    problemLead: text(
      "Caso reale anonimo: dalla richiesta su email o telefono a ticket, assegnazione e chiusura, con clienti, tecnici e fornitori nello stesso flusso.",
      "Anonymous real case: from a request by email or phone to ticket, assignment, and closure, with customers, technicians, and suppliers in the same workflow.",
    ),
  },
};

export function extrasForEntry(entryId: string): PageExtras | undefined {
  return PAGE_EXTRAS[entryId];
}

export function articlesForExtras(
  extras: PageExtras | undefined,
): PageArticle[] {
  return extras?.articles ?? [];
}
