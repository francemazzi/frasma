import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Cal from "../components/organism/Cal";

const problemi: { key: string; node: React.ReactNode }[] = [
  { key: "excel", node: <><strong>Excel usati come ponte</strong> tra ufficio tecnico, commerciale e produzione.</> },
  { key: "preventivi", node: <>Preventivi costruiti con <strong>passaggi manuali</strong>.</> },
  { key: "ordini", node: <>Ordini e commesse gestiti su <strong>strumenti diversi</strong>.</> },
  { key: "dati", node: <>Dati sparsi tra <strong>mail, PDF, cartelle condivise</strong> e software non integrati.</> },
  { key: "ripetitive", node: <><strong>Attivita ripetitive</strong> che rallentano il flusso e aumentano il <strong>rischio di errore</strong>.</> },
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

const benefici: { key: string; node: React.ReactNode }[] = [
  { key: "manuali", node: <>Ridurre <strong>attivita manuali</strong> e doppio inserimento dati.</> },
  { key: "centralizzare", node: <><strong>Centralizzare informazioni</strong> oggi sparse.</> },
  { key: "velocizzare", node: <><strong>Velocizzare passaggi</strong> tra reparti.</> },
  { key: "errori", node: <>Abbassare <strong>errori</strong> e <strong>colli di bottiglia</strong>.</> },
  { key: "vista", node: <>Avere una <strong>vista piu chiara</strong> sullo stato del lavoro.</> },
  { key: "processo", node: <>Costruire un processo <strong>meno fragile</strong> e meno dipendente da singoli operatori.</> },
];

const casiTipici = [
  {
    titolo: "Preventivi e ordini gestiti con troppo lavoro manuale",
    testo: (
      <>Quando ogni offerta richiede <strong>copia-incolla</strong>, verifiche continue e <strong>passaggi tra piu persone</strong>.</>
    ),
  },
  {
    titolo: "Flussi spezzati tra ufficio tecnico, commerciale e produzione",
    testo: (
      <>Quando il gestionale esiste, ma il <strong>processo reale</strong> si regge su <strong>Excel, file condivisi</strong> e abitudini interne.</>
    ),
  },
  {
    titolo: "Commesse, task e richieste interne poco tracciate",
    testo: (
      <>Quando manca uno <strong>strumento semplice</strong> per seguire <strong>avanzamento, responsabilita e priorita</strong>.</>
    ),
  },
  {
    titolo: "Documentazione tecnica o commerciale dispersa",
    testo: (
      <>Quando le informazioni servono, ma sono <strong>distribuite tra mail, PDF, cartelle</strong> e software diversi.</>
    ),
  },
];

const proof: { key: string; node: React.ReactNode }[] = [
  { key: "task", node: <><strong>Centralizzazione</strong> di task, preventivazione e richieste fornitori in un&apos;<strong>unica piattaforma operativa</strong>.</> },
  { key: "flusso", node: <><strong>Automazione</strong> del flusso ordine &rarr; distinta &rarr; parti &rarr; preventivo in contesti produttivi.</> },
  { key: "misura", node: <>Strumenti <strong>su misura</strong> per unificare workflow oggi dispersi tra piu sistemi.</> },
];

const progetti = [
  {
    titolo: "Configuratore preventivi per lavorazioni meccaniche",
    problema: (
      <>Offerte lente e dipendenti da <strong>fogli Excel</strong> con formule difficili da mantenere.</>
    ),
    risultato: (
      <><strong>Generazione guidata</strong> dei preventivi con dati centralizzati: <strong>da 2 giorni a 20 minuti</strong> per preventivo.</>
    ),
  },
  {
    titolo: "Tracking commesse multi-reparto",
    problema: (
      <>Avanzamenti <strong>non allineati</strong> tra ufficio tecnico, produzione e commerciale.</>
    ),
    risultato: (
      <><strong>Vista unica</strong> sullo stato commessa, priorita chiare e passaggi tra reparti piu fluidi. Circa <strong>8 ore risparmiate a settimana</strong> in allineamenti manuali.</>
    ),
  },
  {
    titolo: "Portale richieste acquisto e fornitori",
    problema: (
      <>Richieste materiali <strong>disperse tra mail e chat</strong>, con poca tracciabilita delle approvazioni.</>
    ),
    risultato: (
      <><strong>Workflow strutturato</strong> delle richieste con storico decisioni e controllo stato in tempo reale. <strong>Tempo di approvazione ridotto del 70%</strong>.</>
    ),
  },
];

type CtaVariantKey = "a" | "b" | "c";

type CtaVariant = {
  finalPrimary: string;
  finalMicrocopy: string;
};

const ctaVariants: Record<CtaVariantKey, CtaVariant> = {
  a: {
    finalPrimary: "Prenota analisi gratuita",
    finalMicrocopy:
      "Call di 30 minuti, concreta e senza vendita aggressiva: capiamo se e dove conviene intervenire.",
  },
  b: {
    finalPrimary: "Blocca la tua call di 30 minuti",
    finalMicrocopy:
      "Nessun vincolo contrattuale: solo un confronto operativo sul tuo caso specifico.",
  },
  c: {
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
        {/* ── Hero ── */}
        <section className="section-farm pt-14 pb-16 sm:pt-20 sm:pb-20">
          <p className="mb-4 inline-flex rounded-full border border-farm-border bg-farm-surface px-4 py-2 text-sm font-medium text-farm-secondary">
            Quando il gestionale non basta e Excel sta diventando un problema
          </p>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight sm:text-5xl">
            Software operativo per aziende manifatturiere che vogliono{" "}
            <span className="text-sage">ridurre passaggi manuali, errori e tempi morti</span>
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-farm-secondary sm:text-lg">
            Aiuto imprese manifatturiere e tecniche a <strong>unificare flussi</strong> oggi
            distribuiti tra gestionale, file Excel, documenti e attivita
            manuali, creando <strong>strumenti software leggeri, su misura</strong> e realmente
            utili nel lavoro quotidiano.
          </p>
          <p className="mt-4 max-w-3xl text-base font-medium text-farm-text sm:text-lg">
            Sono Francesco Saverio, sviluppatore freelance &mdash; lavoro esclusivamente con aziende manifatturiere.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Cal
              textButton={activeCta.finalPrimary}
              buttonType="default"
            />
            <a
              href="#casi-uso"
              data-cta-id="hero-secondary-cases"
              className="rounded-xl border border-farm-border bg-farm-surface px-6 py-3 text-sm font-semibold text-farm-text transition hover:border-sage hover:text-sage"
            >
              Vedi i casi d&apos;uso &darr;
            </a>
          </div>
        </section>

        {/* ── Problemi ── */}
        <section className="section-farm py-12 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Quando il processo reale non vive nel gestionale
          </h2>
          <ul className="mt-6 grid gap-3 text-farm-secondary">
            {problemi.map((item) => (
              <li key={item.key} className="rounded-lg bg-farm-panel px-4 py-3 leading-relaxed">
                {item.node}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-4xl text-farm-secondary leading-relaxed">
            Il risultato e sempre lo stesso: <strong>piu tempo perso</strong>, meno visibilita e
            processi che dipendono troppo dalle persone che sanno dove trovare
            le cose.
          </p>
        </section>

        {/* ── Cosa faccio ── */}
        <section className="section-farm py-12 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Creo software verticale per far funzionare meglio i processi interni
          </h2>
          <p className="mt-5 max-w-4xl text-farm-secondary leading-relaxed">
            Non propongo software generici da adattare a forza. Progetto{" "}
            <strong>strumenti operativi</strong> pensati sul <strong>flusso reale</strong> dell&apos;azienda, per
            aiutare i team a lavorare in modo piu ordinato, veloce e tracciabile.
          </p>
          <h3 className="mt-8 text-lg font-semibold">Posso intervenire su aree come:</h3>
          <div className="mt-4 grid gap-3 grid-cols-2 lg:grid-cols-4">
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

        {/* ── Benefici ── */}
        <section className="section-farm py-12 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Cosa migliora in pratica
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {benefici.map((item) => (
              <li
                key={item.key}
                className="rounded-lg border border-farm-border bg-white px-4 py-3 text-farm-secondary leading-relaxed"
              >
                {item.node}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Casi d'uso ── */}
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

        {/* ── Come lavoro ── */}
        <section className="section-farm py-12 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">Come lavoro</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-farm-border bg-farm-surface p-5">
              <p className="text-sm font-semibold text-sage">1. Analisi del processo</p>
              <p className="mt-2 text-sm text-farm-secondary leading-relaxed">
                Mappo il <strong>flusso attuale</strong>, i punti di attrito e le attivita che
                oggi fanno perdere piu tempo.
              </p>
            </article>
            <article className="rounded-xl border border-farm-border bg-farm-surface p-5">
              <p className="text-sm font-semibold text-sage">2. Prototipo rapido</p>
              <p className="mt-2 text-sm text-farm-secondary leading-relaxed">
                Sviluppo una <strong>prima versione testabile</strong> per validare subito utilita
                e adozione.
              </p>
            </article>
            <article className="rounded-xl border border-farm-border bg-farm-surface p-5">
              <p className="text-sm font-semibold text-sage">3. Software operativo</p>
              <p className="mt-2 text-sm text-farm-secondary leading-relaxed">
                Rendo la soluzione <strong>robusta, integrata</strong> e pronta all&apos;uso quotidiano.
              </p>
            </article>
          </div>
        </section>

        {/* ── Non vendo digitalizzazione in astratto ── */}
        <section className="section-farm py-12 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Non vendo digitalizzazione in astratto
          </h2>
          <p className="mt-5 max-w-4xl text-farm-secondary leading-relaxed">
            Lavoro su <strong>problemi operativi concreti</strong>. Il focus non e aggiungere un
            altro software da gestire, ma costruire uno strumento che aiuti
            davvero a <strong>far scorrere meglio il lavoro</strong>, ridurre attriti tra
            reparti, <strong>semplificare attivita ripetitive</strong> e dare piu controllo al
            team.
          </p>
        </section>

        {/* ── Proof ── */}
        <section className="section-farm py-12 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Esempi di problemi gia affrontati
          </h2>
          <ul className="mt-6 grid gap-3">
            {proof.map((item) => (
              <li
                key={item.key}
                className="rounded-lg border border-farm-border bg-farm-surface px-4 py-3 text-farm-secondary leading-relaxed"
              >
                {item.node}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Chi sono ── */}
        <section className="section-farm py-12 sm:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
            <div className="relative mx-auto h-60 w-60 overflow-hidden rounded-2xl border border-farm-border bg-farm-panel lg:mx-0">
              <Image
                src="/profilo_home.jpg"
                alt="Francesco Saverio - consulente software per manifattura"
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">Chi sono</h2>
              <p className="mt-4 text-farm-secondary leading-relaxed">
                Mi chiamo <strong>Francesco Saverio</strong>, ho <strong>11 anni di esperienza</strong> nello
                sviluppo software e una <strong>Laurea Magistrale in Scienze e Tecnologie Agrarie</strong>.
                Lavoro come freelance con aziende manifatturiere e tecniche che vogliono rendere
                piu fluidi i processi interni. Progetto <strong>soluzioni snelle, concrete</strong> e orientate
                all&apos;operativita quotidiana, partendo sempre dal <strong>flusso reale</strong> di
                chi usa il sistema.
              </p>
            </div>
          </div>
        </section>

        {/* ── Progetti ── */}
        <section className="section-farm py-12 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">I miei progetti</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {progetti.map((progetto) => (
              <article
                key={progetto.titolo}
                className="rounded-xl border border-farm-border bg-farm-surface p-5"
              >
                <h3 className="text-lg font-semibold">{progetto.titolo}</h3>
                <p className="mt-3 text-sm text-farm-secondary leading-relaxed">
                  <span className="font-semibold text-farm-text">Problema:</span>{" "}
                  {progetto.problema}
                </p>
                <p className="mt-2 text-sm text-farm-secondary leading-relaxed">
                  <span className="font-semibold text-farm-text">Risultato:</span>{" "}
                  {progetto.risultato}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ── CTA finale ── */}
        <section id="contatti" className="section-farm py-20 sm:py-28">
          <div className="rounded-2xl border-2 border-sage/30 bg-farm-panel p-8 text-center sm:p-12">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Hai un processo che oggi sopravvive tra gestionale, Excel e
              passaggi manuali?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-farm-secondary leading-relaxed">
              Prenota una <strong>call di 30 minuti</strong>: analizziamo il tuo flusso e capiamo
              se ha senso intervenire con uno <strong>strumento software dedicato</strong>.
            </p>
            <p className="mx-auto mt-2 max-w-2xl text-sm font-medium text-farm-secondary">
              {activeCta.finalMicrocopy}
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-xs text-farm-secondary">
              Esempio reale: aiutata una realta manifatturiera a <strong>ridurre i tempi di preventivazione da 2 giorni a 20 minuti</strong>.
            </p>
            <div className="mt-8 flex justify-center">
              <Cal
                textButton={activeCta.finalPrimary}
                buttonType="default"
              />
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs font-medium text-farm-secondary">
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
          </div>
        </section>
      </main>
    </>
  );
}
