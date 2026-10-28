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

export const HARNESS_OFFICINA_SLUG =
  "ai-manifattura-officina-intorno-al-modello";

export const DDT_READING_SLUG = "lettura-automatica-ddt";

export const MACHINING_QUOTES_SLUG =
  "software-preventivi-lavorazioni-meccaniche";

export const WAREHOUSE_EXCEL_SLUG = "gestionale-magazzino-excel";

const DDT_READING_FAQS = [
  {
    question: "La lettura automatica dei DDT sostituisce chi registra i documenti?",
    answer:
      "No. Sostituisce il copia-incolla sui documenti leggibili. Chi registra continua a confermare, a gestire le eccezioni e a rispondere quando un valore non torna. La responsabilità del carico resta umana.",
  },
  {
    question: "Si possono leggere sia i PDF nativi sia le scansioni?",
    answer:
      "Sì, con perimetri diversi. Un PDF generato dal gestionale del fornitore è il caso più semplice. Una scansione o una foto chiede un passaggio in più e produce più eccezioni. Si prova su entrambi, non si promette lo stesso risultato.",
  },
  {
    question: "I dati finiscono da soli in Mago o TeamSystem?",
    answer:
      "No. L'AI propone i campi. Una persona conferma. Poi si importa nel gestionale già in uso, sul tracciato che quel gestionale accetta. Non si apre una scrittura diretta e non si sostituisce Mago o TeamSystem.",
  },
  {
    question: "Cosa si fa se un campo non è leggibile?",
    answer:
      "Si marca «da verificare» o «illeggibile». Non si completa a indovinare. Il PDF resta agganciato alla riga, così chi controlla vede la fonte.",
  },
  {
    question: "Da dove si parte, in pratica?",
    answer:
      "Da un insieme piccolo di DDT reali e dall'elenco dei campi che già inserite. Si misura cosa viene letto bene, si tiene la persona nel punto di conferma, si decide se allargare.",
  },
];

const HARNESS_OFFICINA_FAQS = [
  {
    question: "Cos’è l’officina intorno all’AI?",
    answer:
      "È tutto quello che sta intorno al modello: quali documenti può vedere, quali attrezzi può usare, cosa ricorda, quali procedure segue e chi conferma prima di un’azione sul gestionale. Il nome tecnico è harness. In azienda è il banco, non la chat.",
  },
  {
    question: "Basta cambiare modello per lavorare meglio in officina?",
    answer:
      "No. Un modello più nuovo completa meglio il testo. Non apre da solo il DDT, non consulta l’anagrafica e non tiene il taccuino. Quello è lavoro dell’officina. Il modello si può sostituire; il processo e i controlli restano.",
  },
  {
    question: "L’agente può scrivere da solo nel gestionale?",
    answer:
      "No. Una proposta può essere sbagliata in modo convincente. Un movimento di magazzino o una riga in contabilità, una volta scritti, sono già nel sistema. L’AI legge e struttura. Una persona conferma. Poi arriva un import tracciato.",
  },
  {
    question: "Da dove si parte in una PMI manifatturiera?",
    answer:
      "Da un processo ripetitivo, con documenti reali. Per molte officine è l’accettazione: DDT, bolle, email dei fornitori. Si misura il lavoro attuale, si prova su un perimetro piccolo, si decide se estendere. Lo stesso schema vale per collaudo, RFQ e non conformità.",
  },
  {
    question: "L’AI impara da sola dai nostri errori?",
    answer:
      "Solo se lasciate una lezione da qualche parte. Una correzione in chat muore con quella risposta. Un taccuino, una procedura o una prova automatica restano. Senza quella memoria, ogni documento riparte da zero.",
  },
];

const MACHINING_QUOTES_FAQS = [
  {
    question: "Un software di preventivi sostituisce chi fa le offerte?",
    answer:
      "No. Sostituisce il copia-incolla sui pezzi già visti e sui campi leggibili. Chi quota continua a confermare, a gestire le eccezioni e a decidere il margine. La responsabilità del prezzo mandato al cliente resta umana.",
  },
  {
    question: "Si può partire da PDF, DXF e STEP insieme?",
    answer:
      "Sì, tenendoli separati. Il PDF porta quote e note. Lo STEP porta la forma. Il DXF, se c'è, porta geometria 2D. Trattarli come un unico file da importare butta via la parte che decide il ciclo. Si prova sui vostri disegni, non si promette lo stesso risultato su una scansione storta e su uno STEP pulito.",
  },
  {
    question: "I prezzi finiscono da soli nel gestionale o in mail al cliente?",
    answer:
      "No. Il sistema propone tempi, materiale e prezzo. Una persona conferma. Poi si scrive l'offerta. Se il lavoro viene accettato, si importa nel gestionale già in uso, sul tracciato che quel gestionale accetta. Non si apre una scrittura diretta e non si sostituisce Mago, TeamSystem o Danea.",
  },
  {
    question: "Cosa si fa se il tempo o il materiale non sono chiari?",
    answer:
      "Si marca «da verificare». Non si completa a indovinare. Il disegno e, se c'è, il ciclo precedente restano agganciati alla riga, così chi controlla vede la fonte.",
  },
  {
    question: "Da dove si parte, in pratica?",
    answer:
      "Da un insieme piccolo di richieste reali e dall'elenco di ciò che già mettete in offerta: materiale, operazioni, minuti, prezzo. Si misura cosa la proposta indovina e cosa no. Si tiene la persona nel punto di conferma. Si decide se allargare.",
  },
];

const WAREHOUSE_EXCEL_FAQS = [
  {
    question: "Excel può restare il gestionale di magazzino?",
    answer:
      "No. Può restare il registro di lavoro: scorte del giorno, eccezioni, controllo. Il gestionale già in uso resta il punto di registrazione. Quando il foglio è l'unico posto in cui esiste la quantità, non avete un magazzino. Avete un file.",
  },
  {
    question: "Serve buttare Excel e comprare un altro software di magazzino?",
    answer:
      "No. Si parte da quello che già c'è. Si tiene un registro unico, si conferma, si importa in Mago, TeamSystem o nell'ERP corrente. Un secondo gestionale raddoppia i dati.",
  },
  {
    question: "L'intelligenza artificiale può aggiornare le scorte da sola?",
    answer:
      "No. Può leggere un DDT, proporre una riga, segnalare un dubbio. Una persona conferma. Poi si importa. Non si apre una scrittura diretta e non si delega il magazzino a una chat.",
  },
  {
    question: "Cosa si fa se foglio e gestionale non coincidono?",
    answer:
      "Si marca «da verificare». Non si sistema una cella per far tornare il totale. Si cerca il documento del movimento. Se il documento non c'è, il dubbio resta visibile.",
  },
  {
    question: "Da dove si parte, in pratica?",
    answer:
      "Da un insieme piccolo di articoli reali e dall'elenco dei movimenti che già fate: carico, scarico, reso, inventario. Si misura dove nasce il numero. Si tiene la persona nel punto di conferma. Si decide se allargare.",
  },
];

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

  if (slug === HARNESS_OFFICINA_SLUG) {
    return [faqPageJsonLd(HARNESS_OFFICINA_FAQS), ddtErpServiceJsonLd()];
  }

  if (slug === DDT_READING_SLUG) {
    return [faqPageJsonLd(DDT_READING_FAQS), ddtErpServiceJsonLd()];
  }

  if (slug === MACHINING_QUOTES_SLUG) {
    return [faqPageJsonLd(MACHINING_QUOTES_FAQS)];
  }

  if (slug === WAREHOUSE_EXCEL_SLUG) {
    return [faqPageJsonLd(WAREHOUSE_EXCEL_FAQS)];
  }

  return [];
}
