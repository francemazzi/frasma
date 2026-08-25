import type { LocalizedText } from "./types";

export type PageFaq = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type PageExtras = {
  videoUrl?: string;
  videoTitle?: LocalizedText;
  blogPath?: string;
  blogTitle?: LocalizedText;
  faqs?: PageFaq[];
};

const text = (it: string, en: string): LocalizedText => ({ it, en });

export const PAGE_EXTRAS: Record<string, PageExtras> = {
  "delivery-notes-to-erp": {
    videoUrl: "https://youtu.be/22K6TJAXmmE",
    videoTitle: text(
      "Automatizzare l'inserimento dei DDT con l'intelligenza artificiale",
      "Automating delivery-note entry with AI",
    ),
    blogPath: "/blog/automatizzare-ddt-email-intelligenza-artificiale",
    blogTitle: text(
      "Come automatizzare i DDT ricevuti via email",
      "How to automate delivery notes received by email",
    ),
    faqs: [
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
          "Sì: un articolo e un video YouTube mostrano un esempio su email, PDF DDT e registro Excel, come base per un flusso verso ERP.",
          "Yes: an article and a YouTube video show an example with email, delivery-note PDFs, and an Excel register, as a basis for an ERP workflow.",
        ),
      },
    ],
  },
  "workflow-procedures": {
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
  "company-wiki-brain": {
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
};

export function extrasForEntry(entryId: string): PageExtras | undefined {
  return PAGE_EXTRAS[entryId];
}
