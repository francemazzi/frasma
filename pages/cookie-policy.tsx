import LegalPage, { type LegalCopy } from "../components/organism/LegalPage";
import { CONTACT } from "../lib/contact";

const UPDATED = "12 ottobre 2026";
const UPDATED_EN = "October 12, 2026";

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
        "Microsoft Clarity (_clck, _clsk, fino a 12 mesi) e Contentsquare registrano in forma anonima come vengono usate le pagine (scorrimento, clic), per capire dove il sito è poco chiaro. Fornitori: Microsoft Ireland Operations Ltd., Contentsquare SAS.",
      ],
    },
    {
      title: "Cookie di misurazione delle campagne",
      paragraphs: [
        "Quando pubblichiamo annunci in ChatGPT, il pixel di misurazione di OpenAI ci dice se una richiesta inviata dal sito è arrivata da uno di quegli annunci. Non serve a mostrarti pubblicità: serve a capire se la campagna porta richieste reali.",
      ],
      bullets: [
        "__oppref: identificativo del clic sull'annuncio, letto dall'indirizzo della pagina di arrivo. Dura 30 giorni.",
        "__obref: riferimento casuale del browser su questo sito. Dura 12 mesi.",
        "Fornitore: OpenAI. Informativa: openai.com/policies/privacy-policy. Il pixel è attivo solo quando una campagna è in corso.",
      ],
    },
    {
      title: "Cookie di terze parti",
      paragraphs: [
        "Il sito non incorpora social network. I video YouTube si caricano solo se premi play, nella versione a privacy rafforzata (youtube-nocookie.com): fino a quel momento YouTube non imposta cookie. I link a YouTube, LinkedIn, GitHub e WhatsApp aprono i rispettivi siti, con le loro regole.",
      ],
    },
    {
      title: "Come disattivarli",
      bullets: [
        "Puoi bloccare o cancellare i cookie dalle impostazioni del browser (Chrome, Safari, Firefox, Edge). Il sito continua a funzionare; perderai solo la lingua salvata e la ripresa della chat.",
        "Per Google Analytics puoi installare il componente di disattivazione: tools.google.com/dlpage/gaoptout.",
        "Il pixel di misurazione di OpenAI, Clarity e Contentsquare si bloccano dalle impostazioni del browser o con un'estensione che blocca i tracker: il sito continua a funzionare.",
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
        "Microsoft Clarity (_clck, _clsk, up to 12 months) and Contentsquare record anonymously how pages are used (scrolling, clicks), to see where the site is unclear. Providers: Microsoft Ireland Operations Ltd., Contentsquare SAS.",
      ],
    },
    {
      title: "Campaign measurement cookies",
      paragraphs: [
        "When we run ads in ChatGPT, OpenAI's measurement pixel tells us whether a request sent from the site came from one of those ads. It does not show you advertising: it tells us whether the campaign brings real requests.",
      ],
      bullets: [
        "__oppref: identifier of the ad click, read from the landing page address. Lasts 30 days.",
        "__obref: random browser reference for this site. Lasts 12 months.",
        "Provider: OpenAI. Policy: openai.com/policies/privacy-policy. The pixel is active only while a campaign is running.",
      ],
    },
    {
      title: "Third-party cookies",
      paragraphs: [
        "The site does not embed social networks. YouTube videos load only when you press play, in the privacy-enhanced version (youtube-nocookie.com): until then YouTube sets no cookies. Links to YouTube, LinkedIn, GitHub, and WhatsApp open those sites, under their own rules.",
      ],
    },
    {
      title: "How to turn them off",
      bullets: [
        "You can block or delete cookies from your browser settings (Chrome, Safari, Firefox, Edge). The site keeps working; you only lose the saved language and chat resume.",
        "For Google Analytics you can install the opt-out add-on: tools.google.com/dlpage/gaoptout.",
        "OpenAI's measurement pixel, Clarity and Contentsquare can be blocked from browser settings or with a tracker-blocking extension: the site keeps working.",
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
