import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const problemi = [
  "Excel usati come ponte tra ufficio tecnico, commerciale e produzione.",
  "Preventivi costruiti con passaggi manuali.",
  "Ordini e commesse gestiti su strumenti diversi.",
  "Dati sparsi tra mail, PDF, cartelle condivise e software non integrati.",
  "Attivita ripetitive che rallentano il flusso e aumentano il rischio di errore.",
];

const areeIntervento = [
  "Preventivazione",
  "Gestione ordini",
  "Workflow tecnico-produttivi",
  "Commesse e task interni",
  "Richieste acquisto e fornitori",
  "Documentazione tecnica e commerciale",
  "Dashboard operative",
  "Integrazioni con software gia presenti",
];

const benefici = [
  "Ridurre attivita manuali e doppio inserimento dati.",
  "Centralizzare informazioni oggi sparse.",
  "Velocizzare passaggi tra reparti.",
  "Abbassare errori e colli di bottiglia.",
  "Avere una vista piu chiara sullo stato del lavoro.",
  "Costruire un processo meno fragile e meno dipendente da singoli operatori.",
];

const casiTipici = [
  {
    titolo: "Preventivi e ordini gestiti con troppo lavoro manuale",
    testo:
      "Quando ogni offerta richiede copia-incolla, verifiche continue e passaggi tra piu persone.",
  },
  {
    titolo: "Flussi spezzati tra ufficio tecnico, commerciale e produzione",
    testo:
      "Quando il gestionale esiste, ma il processo reale si regge su Excel, file condivisi e abitudini interne.",
  },
  {
    titolo: "Commesse, task e richieste interne poco tracciate",
    testo:
      "Quando manca uno strumento semplice per seguire avanzamento, responsabilita e priorita.",
  },
  {
    titolo: "Documentazione tecnica o commerciale dispersa",
    testo:
      "Quando le informazioni servono, ma sono distribuite tra mail, PDF, cartelle e software diversi.",
  },
];

const proof = [
  "Centralizzazione di task, preventivazione e richieste fornitori in un'unica piattaforma operativa.",
  "Automazione del flusso ordine -> distinta -> parti -> preventivo in contesti produttivi.",
  "Strumenti su misura per unificare workflow oggi dispersi tra piu sistemi.",
];

const progetti = [
  {
    titolo: "Configuratore preventivi per lavorazioni meccaniche",
    problema:
      "Offerte lente e dipendenti da fogli Excel con formule difficili da mantenere.",
    risultato:
      "Generazione guidata dei preventivi con dati centralizzati e tempi di risposta ridotti.",
  },
  {
    titolo: "Tracking commesse multi-reparto",
    problema:
      "Avanzamenti non allineati tra ufficio tecnico, produzione e commerciale.",
    risultato:
      "Vista unica sullo stato commessa, priorita chiare e passaggi tra reparti piu fluidi.",
  },
  {
    titolo: "Portale richieste acquisto e fornitori",
    problema:
      "Richieste materiali disperse tra mail e chat, con poca tracciabilita delle approvazioni.",
    risultato:
      "Workflow strutturato delle richieste con storico decisioni e controllo stato in tempo reale.",
  },
];

type CtaVariantKey = "a" | "b" | "c";

type CtaVariant = {
  heroPrimary: string;
  heroMicrocopy: string;
  finalPrimary: string;
  finalMicrocopy: string;
};

const ctaVariants: Record<CtaVariantKey, CtaVariant> = {
  a: {
    heroPrimary: "Analisi gratuita del tuo processo (30 minuti)",
    heroMicrocopy:
      "In 30 minuti identifichiamo i passaggi piu lenti tra gestionale, Excel e attivita manuali. Nessun impegno.",
    finalPrimary: "Prenota analisi gratuita",
    finalMicrocopy:
      "Call di 30 minuti, concreta e senza vendita aggressiva: capiamo se e dove conviene intervenire.",
  },
  b: {
    heroPrimary: "30 minuti per capire se puoi automatizzare",
    heroMicrocopy:
      "Sessione breve e pratica: analizziamo il tuo flusso e stimiamo priorita e impatto, senza impegno.",
    finalPrimary: "Blocca la tua call di 30 minuti",
    finalMicrocopy:
      "Nessun vincolo contrattuale: solo un confronto operativo sul tuo caso specifico.",
  },
  c: {
    heroPrimary: "Ti mostro come migliorare il tuo flusso operativo",
    heroMicrocopy:
      "Partiamo dal tuo processo reale: evidenziamo attriti, colli di bottiglia e opportunita di automazione.",
    finalPrimary: "Richiedi analisi sul tuo caso",
    finalMicrocopy:
      "Condividi il contesto, ricevi una direzione chiara. Nessuna offerta commerciale durante la call.",
  },
};

export default function ManifatturaPage() {
  const router = useRouter();
  const rawVariant = typeof router.query.cta === "string" ? router.query.cta.toLowerCase() : "a";
  const ctaVariantKey: CtaVariantKey =
    rawVariant === "b" || rawVariant === "c" ? rawVariant : "a";
  const activeCta = ctaVariants[ctaVariantKey];

  const bookingUrl =
    process.env.NEXT_PUBLIC_BOOKING_URL ??
    "https://calendly.com/frasma/analisi-processo-30-minuti";

  return (
    <>
      <Head>
        <title>Software operativo per aziende manifatturiere | Frasma</title>
        <meta
          name="description"
          content="Landing dedicata alle aziende manifatturiere: software verticale per ridurre passaggi manuali, errori e tempi morti."
        />
      </Head>

      <main className="min-h-screen bg-farm-bg text-farm-text">
        <section className="section-farm pt-14 pb-16 sm:pt-20 sm:pb-20">
          <p className="mb-4 inline-flex rounded-full border border-farm-border bg-farm-surface px-4 py-2 text-sm font-medium text-farm-secondary">
            Software su misura per la manifattura
          </p>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight sm:text-5xl">
            Software operativo per aziende manifatturiere che vogliono ridurre
            passaggi manuali, errori e tempi morti
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-farm-secondary sm:text-lg">
            Aiuto imprese manifatturiere e tecniche a unificare flussi oggi
            distribuiti tra gestionale, file Excel, documenti e attivita
            manuali, creando strumenti software leggeri, su misura e realmente
            utili nel lavoro quotidiano.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              data-cta-id={`hero-primary-${ctaVariantKey}`}
              className="rounded-xl bg-sage px-6 py-3 text-sm font-semibold text-white transition hover:bg-sage-600"
            >
              {activeCta.heroPrimary}
            </a>
            <a
              href="#casi-uso"
              data-cta-id="hero-secondary-cases"
              className="rounded-xl border border-farm-border bg-farm-surface px-6 py-3 text-sm font-semibold text-farm-text transition hover:border-sage hover:text-sage"
            >
              Vedi i casi d&apos;uso
            </a>
          </div>
          <p className="mt-4 max-w-3xl text-sm text-farm-secondary">
            {activeCta.heroMicrocopy}
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-farm-secondary">
            <span className="rounded-full border border-farm-border bg-farm-surface px-3 py-1">
              Nessun impegno
            </span>
            <span className="rounded-full border border-farm-border bg-farm-surface px-3 py-1">
              Nessuna offerta commerciale durante la call
            </span>
            <span className="rounded-full border border-farm-border bg-farm-surface px-3 py-1">
              Disponibilita mensile limitata
            </span>
          </div>
        </section>

        <section className="section-farm py-12 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Quando il processo reale non vive nel gestionale
          </h2>
          <ul className="mt-6 grid gap-3 text-farm-secondary">
            {problemi.map((item) => (
              <li key={item} className="rounded-lg bg-farm-panel px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-4xl text-farm-secondary">
            Il risultato e sempre lo stesso: piu tempo perso, meno visibilita e
            processi che dipendono troppo dalle persone che sanno dove trovare
            le cose.
          </p>
        </section>

        <section className="section-farm py-12 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Creo software verticale per far funzionare meglio i processi interni
          </h2>
          <p className="mt-5 max-w-4xl text-farm-secondary">
            Non propongo software generici da adattare a forza. Progetto
            strumenti operativi pensati sul flusso reale dell&apos;azienda, per
            aiutare i team a lavorare in modo piu ordinato, veloce e tracciabile.
          </p>
          <h3 className="mt-8 text-lg font-semibold">Posso intervenire su aree come:</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {areeIntervento.map((area) => (
              <div
                key={area}
                className="rounded-lg border border-farm-border bg-farm-surface px-4 py-3 text-sm font-medium"
              >
                {area}
              </div>
            ))}
          </div>
        </section>

        <section className="section-farm py-12 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Cosa migliora in pratica
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {benefici.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-farm-border bg-white px-4 py-3 text-farm-secondary"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="casi-uso" className="section-farm py-12 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Situazioni in cui intervengo piu spesso
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {casiTipici.map((caso) => (
              <article
                key={caso.titolo}
                className="rounded-xl border border-farm-border bg-farm-surface p-5"
              >
                <h3 className="text-lg font-semibold">{caso.titolo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-farm-secondary">
                  {caso.testo}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-farm py-12 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">Come lavoro</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-farm-border bg-farm-surface p-5">
              <p className="text-sm font-semibold text-sage">1. Analisi del processo</p>
              <p className="mt-2 text-sm text-farm-secondary">
                Mappo il flusso attuale, i punti di attrito e le attivita che
                oggi fanno perdere piu tempo.
              </p>
            </article>
            <article className="rounded-xl border border-farm-border bg-farm-surface p-5">
              <p className="text-sm font-semibold text-sage">2. Prototipo rapido</p>
              <p className="mt-2 text-sm text-farm-secondary">
                Sviluppo una prima versione testabile per validare subito utilita
                e adozione.
              </p>
            </article>
            <article className="rounded-xl border border-farm-border bg-farm-surface p-5">
              <p className="text-sm font-semibold text-sage">3. Software operativo</p>
              <p className="mt-2 text-sm text-farm-secondary">
                Rendo la soluzione robusta, integrata e pronta all&apos;uso quotidiano.
              </p>
            </article>
          </div>
        </section>

        <section className="section-farm py-12 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Non vendo digitalizzazione in astratto
          </h2>
          <p className="mt-5 max-w-4xl text-farm-secondary">
            Lavoro su problemi operativi concreti. Il focus non e aggiungere un
            altro software da gestire, ma costruire uno strumento che aiuti
            davvero a far scorrere meglio il lavoro, ridurre attriti tra
            reparti, semplificare attivita ripetitive e dare piu controllo al
            team.
          </p>
        </section>

        <section className="section-farm py-12 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Esempi di problemi gia affrontati
          </h2>
          <ul className="mt-6 grid gap-3">
            {proof.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-farm-border bg-farm-surface px-4 py-3 text-farm-secondary"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="section-farm py-12 sm:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
            <div className="relative h-60 w-60 overflow-hidden rounded-2xl border border-farm-border bg-farm-panel">
              <Image
                src="/profilo_home.jpg"
                alt="Francesco - consulente software per manifattura"
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">Chi sono</h2>
              <p className="mt-4 text-farm-secondary">
                Sono uno sviluppatore software freelance e lavoro con aziende
                manifatturiere e tecniche che vogliono rendere piu fluidi i
                processi interni. Progetto soluzioni snelle, concrete e orientate
                all&apos;operativita quotidiana, partendo sempre dal flusso reale di
                chi usa il sistema.
              </p>
            </div>
          </div>
        </section>

        <section className="section-farm py-12 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">I miei progetti</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {progetti.map((progetto) => (
              <article
                key={progetto.titolo}
                className="rounded-xl border border-farm-border bg-farm-surface p-5"
              >
                <h3 className="text-lg font-semibold">{progetto.titolo}</h3>
                <p className="mt-3 text-sm text-farm-secondary">
                  <span className="font-semibold text-farm-text">Problema:</span>{" "}
                  {progetto.problema}
                </p>
                <p className="mt-2 text-sm text-farm-secondary">
                  <span className="font-semibold text-farm-text">Risultato:</span>{" "}
                  {progetto.risultato}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="contatti" className="section-farm py-16 sm:py-20">
          <div className="rounded-2xl border border-farm-border bg-farm-panel p-8 text-center sm:p-10">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Hai un processo che oggi sopravvive tra gestionale, Excel e
              passaggi manuali?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-farm-secondary">
              Prenota una call di 30 minuti: analizziamo il tuo flusso e capiamo
              se ha senso intervenire con uno strumento software dedicato.
            </p>
            <p className="mx-auto mt-2 max-w-2xl text-sm font-medium text-farm-secondary">
              {activeCta.finalMicrocopy}
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-xs text-farm-secondary">
              Esempio reale: aiutata una realta manifatturiera a eliminare i
              preventivi manuali e ridurre tempi di risposta.
            </p>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              data-cta-id={`final-primary-${ctaVariantKey}`}
              className="mt-8 inline-flex rounded-xl bg-sage px-8 py-3 text-sm font-semibold text-white transition hover:bg-sage-600"
            >
              {activeCta.finalPrimary}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
