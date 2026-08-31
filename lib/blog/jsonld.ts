import { getKnowledgeEntry } from "../knowledge";
import {
  absoluteUrl,
  howToJsonLd,
  serviceJsonLd,
} from "../seo";

export const DDT_TUTORIAL_SLUG =
  "automatizzare-ddt-email-intelligenza-artificiale";

export function extraJsonLdForBlogPost(slug: string) {
  if (slug !== DDT_TUTORIAL_SLUG) {
    return [];
  }

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
    serviceJsonLd({
      id: "delivery-notes-to-erp",
      name:
        getKnowledgeEntry("delivery-notes-to-erp")?.title.it ??
        "Automatizzare i DDT verso Mago e TeamSystem",
      description:
        getKnowledgeEntry("delivery-notes-to-erp")?.summary.it ??
        "Lettura di DDT e documenti da email o PDF, preparazione dei campi e importazione controllata nell'ERP già in uso.",
      path: "/servizi/ddt-erp",
      serviceType: "Automazione documentale verso ERP",
    }),
  ];
}
