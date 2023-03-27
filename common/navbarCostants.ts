import { title } from "process";

export const NAV_LINK: { name: string; href: string }[] = [
  { name: "Github 🐈‍⬛", href: "https://github.com/francemazzi" },
  { name: "Gitlab 🧪", href: "https://gitlab.com/francesco.mazzi" },
  {
    name: "Linkedin 🧑🏻‍💻",
    href: "https://www.linkedin.com/in/francesco-saverio-mazzi-1a76b4159/",
  },
  // TODO -> queste pagine
  // { name: "About", href: "/AboutMe" },
  // { name: "Contact", href: "/ContactMe" },
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
    title: "🧑🏻‍🌾 Solo sostenibilità",
    description:
      "In questo mondo non si può sapere tutto! La mia esperienza è nel mondo agricolo",
  },
  {
    title: "💸 Low cost",
    description:
      "Inzieremo con prove di mercato per definire secondo il modello lean canvas",
  },
  {
    title: "🧑🏻‍💻 Innovation",
    description:
      "Per sviluppare utilizzo: next.js, react, Remix, typescript, web3.js, firebase, solidity, Flutter, GraphQL...",
  },
];

export const PORTFOLIO: {
  img: string;
  titolo: string;
  description: string;
  site: string;
}[] = [
  {
    img: "/image/valbindolaImg.jpg",
    titolo: "20000kg venduti",
    description:
      "Sviluppo di una Urban Farm verticale, progetto imprenditoriale riconosciuto dall'UniBo.",
    site: "https://www.valbindola.it/",
  },
  {
    img: "/image/baky.png",
    titolo: "Lancio di Startup",
    description:
      "Sviluppo della brand Identity e piano commerciale per il cliente finale e business",
    site: "https://bologna.repubblica.it/cronaca/2022/07/04/news/food_delivery_i_prodotti_dei_forni_artigianali_a_domicilio_lidea_e_di_due_studenti_dellalma_mater-356510683/",
  },
  {
    img: "/image/siestabio.jpg",
    titolo: "Sviluppo E-grocery",
    description:
      "Startup emergente premiata da Emilbanca. + 100 clienti raggiunti.",
    site: "https://gazzettadimantova.gelocal.it/mantova/cronaca/2021/02/04/news/mantova-frutta-e-verdura-biologiche-consegnate-a-casa-o-in-azienda-1.39859212",
  },
  {
    img: "/image/hortown.jpg",
    titolo: "Sviluppo di prodotto",
    description:
      "Creazione di una vertical farm modulare dedicata al Future food Institute.",
    site: "https://drive.google.com/file/d/1E1hMW8aibWGEf6dVqG6Vvcgvf3Rh7Pzf/view?usp=sharing",
  },
  {
    img: "/image/ValmarecchiaTeam.png",
    titolo: "Sviluppo web",
    description:
      "Sviluppo di una piattaforma web per la vendita dei prodotti e la presentazione delle varietà antiche di grani.",
    site: "https://valmarecchiabionatura.com",
  },
];
