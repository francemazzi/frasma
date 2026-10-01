import LegalPage, { type LegalCopy } from "../components/organism/LegalPage";
import { CONTACT } from "../lib/contact";

const OWNER = "Francesco Saverio Mazzi";
const VAT = "02750410207";
const UPDATED = "1 ottobre 2026";
const UPDATED_EN = "October 1, 2026";

const it: LegalCopy = {
  metaTitle: "Privacy policy | Frasma",
  metaDescription:
    "Quali dati raccoglie frasma.org, perché, per quanto tempo e come chiedere di cancellarli.",
  kicker: "Privacy",
  title: "Come trattiamo i tuoi dati",
  updated: `Ultimo aggiornamento: ${UPDATED}`,
  intro:
    "Questa pagina spiega in modo semplice quali dati raccoglie il sito frasma.org, a cosa servono e come puoi chiedere di vederli o cancellarli. Vale per il sito, la chat, i moduli di contatto e le email che ci scambiamo.",
  sections: [
    {
      title: "Chi è il titolare",
      paragraphs: [
        `${OWNER}, studio software indipendente con sede a Mantova, P.IVA ${VAT}. Per qualsiasi domanda sui tuoi dati scrivi a ${CONTACT.email} o su WhatsApp al ${CONTACT.phoneDisplay}.`,
      ],
    },
    {
      title: "Quali dati raccogliamo",
      bullets: [
        "Modulo «Valuta un processo»: nome, email di lavoro, azienda e ruolo (facoltativi), descrizione del processo, strumenti usati e volumi.",
        "Chat del sito: nome, email, azienda e settore inseriti all'avvio, più i messaggi che scrivi. La conversazione viene salvata sul nostro server per poterla riprendere con la stessa email.",
        "Richiesta di incontro: email, data e ora scelte, descrizione libera.",
        "Dettatura vocale: l'audio viene trascritto in testo e non viene conservato.",
        "WhatsApp, telefono ed email: i contatti e il contenuto dei messaggi che decidi di inviarci.",
        "Dati tecnici di navigazione (indirizzo IP, browser, pagine viste) tramite Google Analytics e Google Tag Manager, descritti nella pagina Cookie.",
      ],
    },
    {
      title: "Perché li usiamo",
      bullets: [
        "Per rispondere alla tua richiesta, capire il processo che descrivi e preparare una valutazione o un preventivo.",
        "Per riprendere una conversazione già iniziata in chat.",
        "Per organizzare un incontro o una call.",
        "Per capire quali pagine del sito vengono lette e migliorarle.",
        "Non vendiamo i tuoi dati, non li usiamo per pubblicità e non inviamo newsletter senza che tu lo chieda.",
      ],
    },
    {
      title: "Base giuridica",
      paragraphs: [
        "Trattiamo i dati perché ce li invii tu per ricevere una risposta (misure precontrattuali) e, per la navigazione, perché abbiamo un interesse legittimo a far funzionare e migliorare il sito. Per i cookie di analisi chiediamo il tuo consenso.",
      ],
    },
    {
      title: "Chi può vederli",
      bullets: [
        `Solo ${OWNER}. Non ci sono dipendenti o call center.`,
        "Fornitori tecnici che ospitano il sito e i dati: Vercel (hosting), MongoDB Atlas (database della chat), il provider email per l'invio dei messaggi, OpenAI per generare le risposte della chat e trascrivere la dettatura. Google per le statistiche di navigazione.",
        "Questi fornitori trattano i dati per nostro conto e possono trovarsi fuori dall'Unione Europea; in quel caso si applicano le clausole contrattuali standard previste dal GDPR.",
      ],
    },
    {
      title: "Per quanto tempo",
      bullets: [
        "Richieste di valutazione e conversazioni in chat: fino a 24 mesi dall'ultimo contatto, poi vengono cancellate.",
        "Se diventi cliente, i dati necessari al contratto restano per la durata del rapporto e per gli obblighi fiscali (10 anni).",
        "Dati di navigazione: secondo i tempi di Google Analytics (massimo 14 mesi).",
      ],
    },
    {
      title: "I tuoi diritti",
      paragraphs: [
        `Puoi chiedere in qualsiasi momento di sapere quali dati abbiamo su di te, correggerli, cancellarli, limitarne l'uso o riceverli in un formato leggibile. Basta scrivere a ${CONTACT.email}. Rispondiamo entro 30 giorni. Se pensi che qualcosa non vada, puoi rivolgerti al Garante per la protezione dei dati personali (garanteprivacy.it).`,
      ],
    },
    {
      title: "Cosa non inserire",
      paragraphs: [
        "Nei moduli e nella chat non inserire password, credenziali, dati bancari o dati sensibili di terzi. Gli esempi di documenti si condividono in un secondo momento, su un canale concordato.",
      ],
    },
    {
      title: "Modifiche",
      paragraphs: [
        "Se cambiamo questa pagina, aggiorniamo la data in alto. Le modifiche sostanziali vengono segnalate in home.",
      ],
    },
  ],
};

const en: LegalCopy = {
  metaTitle: "Privacy policy | Frasma",
  metaDescription:
    "What data frasma.org collects, why, for how long, and how to ask for deletion.",
  kicker: "Privacy",
  title: "How we handle your data",
  updated: `Last updated: ${UPDATED_EN}`,
  intro:
    "This page explains in plain words what data the frasma.org website collects, what it is used for, and how you can see or delete it. It covers the website, the chat, the contact forms, and the emails we exchange.",
  sections: [
    {
      title: "Who is responsible",
      paragraphs: [
        `${OWNER}, independent software studio based in Mantova, Italy, VAT ${VAT}. For any question about your data write to ${CONTACT.email} or on WhatsApp at ${CONTACT.phoneDisplay}.`,
      ],
    },
    {
      title: "What we collect",
      bullets: [
        "\"Assess a process\" form: name, work email, company and role (optional), process description, tools in use, and volumes.",
        "Website chat: name, email, company, and sector entered at the start, plus the messages you write. The conversation is stored on our server so you can resume it with the same email.",
        "Meeting request: email, chosen date and time, free-text description.",
        "Voice dictation: audio is transcribed to text and not kept.",
        "WhatsApp, phone, and email: the contact details and message content you choose to send us.",
        "Technical browsing data (IP address, browser, pages viewed) through Google Analytics and Google Tag Manager, described on the Cookies page.",
      ],
    },
    {
      title: "Why we use it",
      bullets: [
        "To answer your request, understand the process you describe, and prepare an assessment or a quote.",
        "To resume a chat conversation you already started.",
        "To arrange a meeting or a call.",
        "To see which pages are read and improve them.",
        "We do not sell your data, do not use it for advertising, and do not send newsletters unless you ask.",
      ],
    },
    {
      title: "Legal basis",
      paragraphs: [
        "We process data because you send it to receive a reply (pre-contractual steps) and, for browsing data, because we have a legitimate interest in running and improving the site. For analytics cookies we ask for your consent.",
      ],
    },
    {
      title: "Who can see it",
      bullets: [
        `Only ${OWNER}. There are no employees or call centers.`,
        "Technical providers hosting the site and data: Vercel (hosting), MongoDB Atlas (chat database), the email provider for sending messages, OpenAI for generating chat replies and transcribing dictation. Google for browsing statistics.",
        "These providers process data on our behalf and may be located outside the European Union; in that case the standard contractual clauses required by GDPR apply.",
      ],
    },
    {
      title: "For how long",
      bullets: [
        "Assessment requests and chat conversations: up to 24 months from the last contact, then deleted.",
        "If you become a client, data needed for the contract is kept for its duration and for tax obligations (10 years).",
        "Browsing data: according to Google Analytics retention (14 months at most).",
      ],
    },
    {
      title: "Your rights",
      paragraphs: [
        `You can ask at any time what data we hold about you, correct it, delete it, limit its use, or receive it in a readable format. Just write to ${CONTACT.email}. We reply within 30 days. If you think something is wrong, you can contact the Italian Data Protection Authority (garanteprivacy.it).`,
      ],
    },
    {
      title: "What not to enter",
      paragraphs: [
        "Do not enter passwords, credentials, bank details, or sensitive data about third parties in forms or chat. Sample documents are shared later, on an agreed channel.",
      ],
    },
    {
      title: "Changes",
      paragraphs: [
        "If we change this page we update the date at the top. Substantial changes are announced on the home page.",
      ],
    },
  ],
};

export default function PrivacyPage() {
  return <LegalPage path="/privacy" copy={{ it, en }} />;
}
