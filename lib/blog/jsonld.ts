import { getKnowledgeEntry } from "../knowledge";
import {
  absoluteUrl,
  faqPageJsonLd,
  howToJsonLd,
  serviceJsonLd,
} from "../seo";

export const DDT_TUTORIAL_SLUG =
  "automatizzare-ddt-email-intelligenza-artificiale";

export const ERP_AI_THESIS_SLUG = "non-collegare-agenti-ai-direttamente-erp";

const ERP_AI_THESIS_FAQS = [
  {
    question: "Si può collegare ChatGPT, Claude o Gemini direttamente all'ERP?",
    answer:
      "No. Un assistente esterno può leggere un estratto o preparare un tracciato. Non deve avere credenziali di scrittura sul gestionale. Se serve una risposta su una procedura, si parte da documenti e permessi espliciti, non da un connettore aperto.",
  },
  {
    question: "Serve cambiare gestionale per usare l'AI?",
    answer:
      "No. Si parte dal sistema già in azienda. L'AI lavora sui documenti e sui passaggi manuali; Mago, TeamSystem o l'ERP corrente restano il punto di registrazione.",
  },
  {
    question: "Da dove si parte, in pratica?",
    answer:
      "Da un processo circoscritto, con documenti reali. Per molte manifatture è il ciclo passivo: DDT, bolle, email dei fornitori. Si misura il lavoro attuale, si prototipa su un perimetro limitato, si decide se estendere.",
  },
  {
    question:
      "Chi controlla i dati prima che entrino in magazzino o in contabilità?",
    answer:
      "Una persona del team. L'AI struttura e segnala. La conferma, le eccezioni e la responsabilità restano umane. Non esiste un listino universale e non deleghiamo importazioni cieche.",
  },
  {
    question:
      "API, middleware o agenti nativi dell'ERP: quale scegliere?",
    answer:
      "Quello che il gestionale già consente, sul processo scelto. Un file di import controllato è spesso sufficiente. Un agente nativo ha senso solo se rispetta ruoli e non scrive da solo. La scelta tecnica viene dopo la mappa del lavoro reale.",
  },
];

function ddtErpServiceJsonLd() {
  return serviceJsonLd({
    id: "delivery-notes-to-erp",
    name:
      getKnowledgeEntry("delivery-notes-to-erp")?.title.it ??
      "Automatizzare i DDT verso Mago e TeamSystem",
    description:
      getKnowledgeEntry("delivery-notes-to-erp")?.summary.it ??
      "Lettura di DDT e documenti da email o PDF, preparazione dei campi e importazione controllata nell'ERP già in uso.",
    path: "/servizi/ddt-erp",
    serviceType: "Automazione documentale verso ERP",
  });
}

export function extraJsonLdForBlogPost(slug: string) {
  if (slug === DDT_TUTORIAL_SLUG) {
    return [
      howToJsonLd({
        name: "Automatizzare l'inserimento dei DDT ricevuti via email",
        description:
          "Flusso per leggere i Documenti di Trasporto allegati alle email, estrarre i dati dai PDF e aggiornare un registro Excel, con controllo umano sulle eccezioni.",
        url: absoluteUrl(`/blog/${DDT_TUTORIAL_SLUG}`),
        steps: [
          {
            name: "Whitelist dei fornitori",
            text: "Elenca i mittenti autorizzati (nome, Partita IVA, email). Il flusso elabora soltanto i messaggi provenienti da quegli indirizzi.",
          },
          {
            name: "Individuare i PDF DDT",
            text: "Cerca i nuovi messaggi dei fornitori in whitelist e individua i PDF allegati che contengono Documenti di Trasporto.",
          },
          {
            name: "Estrarre i campi dal documento",
            text: "Estrai fornitore, Partita IVA, numero DDT, data, articoli, quantità e stato di verifica in un formato esplicito.",
          },
          {
            name: "Archiviare il PDF",
            text: "Salva il documento nella cartella corretta e registra il nome file, evitando duplicati.",
          },
          {
            name: "Aggiornare il registro Excel",
            text: "Aggiungi una riga al registro e segnala i documenti da verificare prima di qualsiasi importazione in ERP.",
          },
        ],
      }),
      ddtErpServiceJsonLd(),
    ];
  }

  if (slug === ERP_AI_THESIS_SLUG) {
    return [faqPageJsonLd(ERP_AI_THESIS_FAQS), ddtErpServiceJsonLd()];
  }

  return [];
}
