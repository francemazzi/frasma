import { title } from "process";

export const NAV_LINK: { name: string; href: string }[] = [
  { name: "About", href: "/AboutMe" },
  { name: "Contact", href: "/ContactMe" },
];

export const WORK_FLOW: { work: string }[] = [
  { work: "💻 Sviluppo Web" },
  { work: "📝 Marketing" },
  { work: "🚀 Lancio Progetti" },
  { work: "🔎 Test Mercato " },
  { work: "🔒 NFT e blockchain" },
];

export const WORK_WHY: { title: string; description: string }[] = [
  {
    title: "❤️ Non ti abbandonerò",
    description:
      "Seleziono solo alcune realtà che seguo dalla strategia allo sviluppo web",
  },
  {
    title: "🧑🏻‍🌾 Solo agricoltura",
    description:
      "In questo mondo non si può sapere tutto! La mia esperienza è nel mondo agricolo",
  },
  {
    title: "💸 Low cost",
    description:
      "Inzieremo con prove di mercato per definire come posizionare al meglio la tua azienda.",
  },
];

export const PORTFOLIO: {
  img: string;
  titolo: string;
  description: string;
  site: string;
}[] = [
  {
    img: "/img/valbindolaImg.jpg",
    titolo: "20000kg venduti",
    description:
      "Sviluppo di una Urban Farm verticale, progetto imprenditoriale riconosciuto dall'UniBo.",
    site: "https://www.valbindola.it/",
  },
  {
    img: "/img/baky.png",
    titolo: "Lancio di Startup",
    description:
      "Sviluppo della brand Identity e piano commerciale per il cliente finale e business",
    site: "https://www.linkedin.com/in/francesco-saverio-mazzi-1a76b4159/details/experience/",
  },
  {
    img: "/img/siestabio.jpg",
    titolo: "Ricerca di mercato",
    description:
      "Sviluppo di una piattaforma e-grocery, premiata da Emilbanca come startup emergente. + 100 clienti raggiunti.",
    site: "https://gazzettadimantova.gelocal.it/mantova/cronaca/2021/02/04/news/mantova-frutta-e-verdura-biologiche-consegnate-a-casa-o-in-azienda-1.39859212",
  },
  {
    img: "/img/hortown.jpg",
    titolo: "Sviluppo di prodotto",
    description:
      "Sviluppo di una piattaforma Saas, in base ai bisogni dei panificatori. + 130 produttori iscritti.",
    site: "https://www.linkedin.com/in/francesco-saverio-mazzi-1a76b4159/details/experience/1847811422/multiple-media-viewer/?treasuryMediaId=1635470524493",
  },
];
