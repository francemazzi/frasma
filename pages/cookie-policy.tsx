import LegalPage, { type LegalCopy } from "../components/organism/LegalPage";
import { CONTACT } from "../lib/contact";

const UPDATED = "1 ottobre 2026";
const UPDATED_EN = "October 1, 2026";

const it: LegalCopy = {
  metaTitle: "Cookie policy | Frasma",
  metaDescription:
    "Quali cookie e dati salvati nel browser usa frasma.org, a cosa servono e come disattivarli.",
  kicker: "Cookie",
  title: "Cookie e dati salvati nel browser",
  updated: `Ultimo aggiornamento: ${UPDATED}`,
  intro:
    "I cookie sono piccoli file che il sito salva nel tuo browser. frasma.org ne usa pochi: alcuni servono a far funzionare il sito, altri a capire quali pagine vengono lette. Qui trovi l'elenco completo e come disattivarli.",
  sections: [
    {
      title: "Dati tecnici, sempre attivi",
      paragraphs: [
        "Non sono cookie veri e propri ma dati salvati nel browser (localStorage). Servono solo a te e non vengono inviati a terzi.",
      ],
      bullets: [
        "Lingua scelta (italiano o inglese), così il sito la ricorda alla visita successiva.",
        "Identificativo della conversazione in chat, per riprendere la chat dove l'avevi lasciata. Si cancella chiudendo la conversazione o svuotando i dati del browser.",
      ],
    },
    {
      title: "Cookie di analisi",
      paragraphs: [
        "Usiamo Google Analytics 4 e Google Tag Manager per sapere quante persone visitano il sito, da quali pagine entrano e quali leggono. I dati sono aggregati e l'indirizzo IP viene abbreviato.",
      ],
      bullets: [
        "_ga, _ga_*: distinguono i visitatori e le sessioni. Durano fino a 13 mesi.",
        "Fornitore: Google Ireland Ltd. Informativa: policies.google.com/privacy.",
      ],
    },
    {
      title: "Cookie di terze parti",
      paragraphs: [
        "Il sito non incorpora social network, video o pubblicità che impostano cookie propri. I link a YouTube, LinkedIn, GitHub e WhatsApp aprono i rispettivi siti, con le loro regole.",
      ],
    },
    {
      title: "Come disattivarli",
      bullets: [
        "Puoi bloccare o cancellare i cookie dalle impostazioni del browser (Chrome, Safari, Firefox, Edge). Il sito continua a funzionare; perderai solo la lingua salvata e la ripresa della chat.",
        "Per Google Analytics puoi installare il componente di disattivazione: tools.google.com/dlpage/gaoptout.",
      ],
    },
    {
      title: "Domande",
      paragraphs: [
        `Scrivi a ${CONTACT.email} o su WhatsApp al ${CONTACT.phoneDisplay}. Per il trattamento dei dati personali vedi la pagina Privacy.`,
      ],
    },
  ],
};

const en: LegalCopy = {
  metaTitle: "Cookie policy | Frasma",
  metaDescription:
    "Which cookies and browser-stored data frasma.org uses, what they do, and how to turn them off.",
  kicker: "Cookies",
  title: "Cookies and data stored in your browser",
  updated: `Last updated: ${UPDATED_EN}`,
  intro:
    "Cookies are small files a website saves in your browser. frasma.org uses only a few: some make the site work, others tell us which pages are read. Here is the full list and how to turn them off.",
  sections: [
    {
      title: "Technical data, always on",
      paragraphs: [
        "These are not cookies in the strict sense but data saved in the browser (localStorage). They serve only you and are not sent to third parties.",
      ],
      bullets: [
        "Chosen language (Italian or English), so the site remembers it next time.",
        "Chat conversation identifier, to resume the chat where you left it. It is removed when you close the conversation or clear browser data.",
      ],
    },
    {
      title: "Analytics cookies",
      paragraphs: [
        "We use Google Analytics 4 and Google Tag Manager to know how many people visit the site, which pages they land on, and which they read. Data is aggregated and the IP address is shortened.",
      ],
      bullets: [
        "_ga, _ga_*: tell visitors and sessions apart. They last up to 13 months.",
        "Provider: Google Ireland Ltd. Policy: policies.google.com/privacy.",
      ],
    },
    {
      title: "Third-party cookies",
      paragraphs: [
        "The site does not embed social networks, videos, or ads that set their own cookies. Links to YouTube, LinkedIn, GitHub, and WhatsApp open those sites, under their own rules.",
      ],
    },
    {
      title: "How to turn them off",
      bullets: [
        "You can block or delete cookies from your browser settings (Chrome, Safari, Firefox, Edge). The site keeps working; you only lose the saved language and chat resume.",
        "For Google Analytics you can install the opt-out add-on: tools.google.com/dlpage/gaoptout.",
      ],
    },
    {
      title: "Questions",
      paragraphs: [
        `Write to ${CONTACT.email} or on WhatsApp at ${CONTACT.phoneDisplay}. For personal data handling see the Privacy page.`,
      ],
    },
  ],
};

export default function CookiePolicyPage() {
  return <LegalPage path="/cookie-policy" copy={{ it, en }} />;
}
