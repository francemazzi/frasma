import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  FileSpreadsheet,
  ClipboardList,
  FolderSearch,
  RefreshCw,
  Calculator,
  PackageCheck,
  GitBranch,
  ShoppingCart,
  LayoutDashboard,
  Plug,
  ClipboardX,
  Unlink,
  ListChecks,
} from "lucide-react";
import Cal from "../components/organism/Cal";
import ProblemCard from "../components/organism/ProblemCard";
import AreaCard from "../components/organism/AreaCard";
import CaseCard from "../components/organism/CaseCard";
import DashboardMockup from "../components/organism/DashboardMockup";

const problemi = [
  { key: "excel", icon: FileSpreadsheet, node: <><strong>Excel come ponte</strong> tra ufficio tecnico, commerciale e produzione.</> },
  { key: "preventivi", icon: ClipboardList, node: <>Preventivi con troppi <strong>passaggi manuali</strong>.</> },
  { key: "dati", icon: FolderSearch, node: <>Dati sparsi tra <strong>mail, PDF e cartelle condivise</strong>.</> },
  { key: "ripetitive", icon: RefreshCw, node: <><strong>Attivita ripetitive</strong> che rallentano il flusso.</> },
];

const areeIntervento = [
  { label: "Preventivazione", icon: Calculator },
  { label: "Gestione ordini e commesse", icon: PackageCheck },
  { label: "Workflow tecnico-produttivi", icon: GitBranch },
  { label: "Richieste acquisto e fornitori", icon: ShoppingCart },
  { label: "Dashboard operative", icon: LayoutDashboard },
  { label: "Integrazioni con software esistenti", icon: Plug },
];

const benefici: { key: string; node: React.ReactNode }[] = [
  { key: "manuali", node: <>Meno <strong>attivita manuali</strong> e doppi inserimenti.</> },
  { key: "velocizzare", node: <><strong>Passaggi piu fluidi</strong> tra reparti.</> },
  { key: "errori", node: <>Meno <strong>errori</strong> e <strong>colli di bottiglia</strong>.</> },
  { key: "vista", node: <><strong>Vista chiara</strong> sullo stato del lavoro.</> },
];

const casiTipici = [
  {
    icon: ClipboardX,
    titolo: "Preventivi con troppo lavoro manuale",
    testo: (
      <>Ogni offerta richiede <strong>copia-incolla</strong>, verifiche e <strong>passaggi tra piu persone</strong>.</>
    ),
  },
  {
    icon: Unlink,
    titolo: "Flussi spezzati tra reparti",
    testo: (
      <>Il gestionale c&apos;e, ma il <strong>processo reale</strong> si regge su <strong>Excel e abitudini interne</strong>.</>
    ),
  },
  {
    icon: ListChecks,
    titolo: "Commesse e task poco tracciate",
    testo: (
      <>Manca uno <strong>strumento semplice</strong> per seguire <strong>avanzamento e priorita</strong>.</>
    ),
  },
];

const proof: { key: string; node: React.ReactNode }[] = [
  { key: "task", node: <><strong>Centralizzazione</strong> di task e preventivazione in un&apos;<strong>unica piattaforma</strong>.</> },
  { key: "flusso", node: <><strong>Automazione</strong> del flusso ordine &rarr; distinta &rarr; preventivo.</> },
  { key: "misura", node: <>Workflow <strong>su misura</strong> per unificare sistemi oggi dispersi.</> },
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
        <section className="section-farm pt-16 pb-20 sm:pt-24 sm:pb-28 relative overflow-hidden">
          <div className="relative lg:pr-[420px]">
            <p className="mb-5 inline-flex rounded-full border border-farm-border bg-farm-surface px-4 py-2 text-sm font-medium text-farm-secondary">
              Quando il gestionale non basta
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
              Meno passaggi manuali,{" "}
              <span className="text-sage">piu controllo sui processi</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-farm-secondary sm:text-lg">
              Creo <strong>software su misura</strong> per aziende manifatturiere che vogliono
              unificare flussi oggi sparsi tra gestionale, Excel e attivita manuali.
            </p>
            <p className="mt-3 max-w-2xl text-base font-medium text-farm-text sm:text-lg">
              Francesco Saverio &mdash; sviluppatore freelance per la manifattura.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Cal
                textButton={activeCta.finalPrimary}
                buttonType="default"
              />
              <a
                href="#casi-uso"
                data-cta-id="hero-secondary-cases"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-sage-600 hover:text-sage-500 bg-sage-50 rounded-full transition duration-200"
              >
                Vedi i casi d&apos;uso &rarr;
              </a>
            </div>
          </div>

          <DashboardMockup />
        </section>

        {/* ── Problemi ── */}
        <section className="section-farm py-16 sm:py-20">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Situazioni che riconosci?
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {problemi.map((item) => (
              <ProblemCard key={item.key} icon={item.icon}>
                {item.node}
              </ProblemCard>
            ))}
          </ul>
        </section>

        {/* ── Cosa faccio ── */}
        <section className="section-farm py-16 sm:py-20">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Software verticale, pensato sul tuo flusso
          </h2>
          <p className="mt-5 max-w-3xl text-farm-secondary leading-relaxed">
            Niente software generici. Progetto <strong>strumenti operativi</strong> sul{" "}
            <strong>flusso reale</strong> dell&apos;azienda.
          </p>
          <h3 className="mt-10 text-lg font-semibold">Aree di intervento</h3>
          <div className="mt-4 grid gap-3 grid-cols-2 lg:grid-cols-3">
            {areeIntervento.map((area) => (
              <AreaCard key={area.label} icon={area.icon} label={area.label} />
            ))}
          </div>
        </section>

        {/* ── Benefici ── */}
        <section className="section-farm py-16 sm:py-20">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Cosa cambia in pratica
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
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
        <section id="casi-uso" className="section-farm py-16 sm:py-20">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Casi d&apos;uso frequenti
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {casiTipici.map((caso) => (
              <CaseCard
                key={caso.titolo}
                icon={caso.icon}
                titolo={caso.titolo}
                testo={caso.testo}
              />
            ))}
          </div>
        </section>

        {/* ── Come lavoro ── */}
        <section className="section-farm py-16 sm:py-20">
          <h2 className="text-2xl font-semibold sm:text-3xl">Come lavoro</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
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

        {/* ── Proof ── */}
        <section className="section-farm py-16 sm:py-20">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Problemi gia affrontati
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
        <section className="section-farm py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[200px_minmax(0,1fr)]">
            <div className="relative mx-auto h-52 w-52 overflow-hidden rounded-2xl border border-farm-border bg-farm-panel lg:mx-0">
              <Image
                src="/profilo_home.jpg"
                alt="Francesco Saverio - consulente software per manifattura"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">Chi sono</h2>
              <p className="mt-4 max-w-2xl text-farm-secondary leading-relaxed">
                <strong>Francesco Saverio</strong> &mdash; <strong>11 anni</strong> nello sviluppo software,
                Laurea Magistrale in Scienze e Tecnologie Agrarie. Lavoro come freelance
                con aziende manifatturiere, progettando <strong>soluzioni snelle</strong> partendo
                dal <strong>flusso reale</strong> di chi usa il sistema.
              </p>
            </div>
          </div>
        </section>

        {/* ── Progetti ── */}
        <section className="section-farm py-16 sm:py-20">
          <h2 className="text-2xl font-semibold sm:text-3xl">Progetti</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
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
          <div className="rounded-2xl border-2 border-sage/30 bg-farm-panel p-8 text-center sm:p-14">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Processi che sopravvivono tra Excel e passaggi manuali?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-farm-secondary leading-relaxed">
              <strong>Call di 30 minuti</strong>: analizziamo il tuo flusso e capiamo
              se conviene intervenire.
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm font-medium text-farm-secondary">
              {activeCta.finalMicrocopy}
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
