import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  FileSpreadsheet,
  ClipboardList,
  FolderSearch,
  Calculator,
  GitBranch,
  Users,
  ShoppingCart,
  LayoutDashboard,
  Plug,
  ClipboardX,
  Unlink,
} from "lucide-react";
import Cal from "../components/organism/Cal";
import ProblemCard from "../components/organism/ProblemCard";
import AreaCard from "../components/organism/AreaCard";
import CaseCard from "../components/organism/CaseCard";
import DashboardMockup from "../components/organism/DashboardMockup";

const problemi = [
  {
    key: "excel",
    icon: FileSpreadsheet,
    node: (
      <>
        <strong>Excel usato come ponte</strong> tra ERP, ufficio tecnico e
        produzione.
      </>
    ),
  },
  {
    key: "preventivi",
    icon: ClipboardList,
    node: (
      <>
        Preventivi costruiti ricopiando dati da{" "}
        <strong>sistemi diversi: ERP, listini e specifiche tecniche</strong>.
      </>
    ),
  },
  {
    key: "distinte",
    icon: GitBranch,
    node: (
      <>
        Commerciale, ufficio tecnico e produzione lavorano su{" "}
        <strong>versioni diverse della stessa commessa</strong>.
      </>
    ),
  },
  {
    key: "rfq",
    icon: ShoppingCart,
    node: (
      <>
        RFQ e richieste fornitori gestite via <strong>mail</strong>, senza
        tracciabilita.
      </>
    ),
  },
  {
    key: "pdf",
    icon: Users,
    node: (
      <>
        Il flusso regge perché <strong>due persone tengono insieme tutto</strong>.
        Se non ci sono, si blocca.
      </>
    ),
  },
];

const areeIntervento = [
  {
    label: "Preventivazione automatica da dati tecnici e listini",
    icon: Calculator,
  },
  {
    label: "Flusso commerciale -> tecnico -> produzione senza passaggi manuali",
    icon: GitBranch,
  },
  {
    label: "Gestione RFQ e richieste fornitori con workflow tracciato",
    icon: ShoppingCart,
  },
  {
    label: "Parsing automatico PDF (DDT, certificazioni, schede tecniche)",
    icon: FolderSearch,
  },
  {
    label: "Generazione automatica documenti (Word, report, certificazioni)",
    icon: ClipboardList,
  },
  {
    label: "Avanzamento commesse e carico reparto in tempo reale",
    icon: LayoutDashboard,
  },
];

const benefici: { key: string; node: React.ReactNode }[] = [
  {
    key: "tempi",
    node: (
      <>
        Riduzione dei tempi operativi: <strong>preventivi da giorni a minuti</strong>{" "}
        e meno attivita ripetitive.
      </>
    ),
  },
  {
    key: "doppi",
    node: (
      <>
        Ogni dato inserito <strong>una volta sola</strong>: niente doppi
        aggiornamenti tra ERP, Excel e reparto.
      </>
    ),
  },
  {
    key: "errori",
    node: (
      <>
        Meno <strong>errori da copia-incolla</strong>, meno versioni non
        allineate e meno rilavorazioni.
      </>
    ),
  },
  {
    key: "tracciabilita",
    node: (
      <>
        <strong>Tracciabilita reale</strong> tra ufficio tecnico, acquisti e
        produzione: chi ha fatto cosa, quando e su quale commessa.
      </>
    ),
  },
];

const casiTipici = [
  {
    icon: ClipboardX,
    titolo: "Preventivi costruiti su fonti separate e non allineate",
    testo: (
      <>
        Ogni offerta richiede <strong>copia-incolla</strong>, verifiche su fonti
        diverse e passaggi tra piu persone.
      </>
    ),
  },
  {
    icon: Unlink,
    titolo: "ERP presente, ma processo reale ancora su Excel e mail",
    testo: (
      <>
        Il gestionale c&apos;e, ma la parte operativa si regge su{" "}
        <strong>file locali, messaggi e passaggi manuali</strong>.
      </>
    ),
  },
  {
    icon: LayoutDashboard,
    titolo:
      "Lo stato della commessa si scopre chiamando le persone, non guardando un sistema",
    testo: (
      <>
        Nessuna dashboard, nessuna fonte unica. I colli di bottiglia emergono{" "}
        <strong>quando e gia tardi</strong>.
      </>
    ),
  },
];

const proof: { key: string; node: React.ReactNode }[] = [
  {
    key: "avanzamento-commesse",
    node: (
      <>
        Avanzamento commesse <strong>multi-reparto</strong> con stato in tempo
        reale. Prima servivano <strong>tre telefonate al giorno</strong> per
        capire a che punto eravamo.
      </>
    ),
  },
  {
    key: "rfq",
    node: (
      <>
        Workflow RFQ e richieste fornitori con <strong>priorita visibili</strong>{" "}
        e storico decisioni: niente piu mail perse.
      </>
    ),
  },
  {
    key: "qualita",
    node: (
      <>
        Registrazione non conformita e documenti qualita: da moduli cartacei a
        <strong>flusso digitale tracciato</strong>.
      </>
    ),
  },
];

const progetti = [
  {
    titolo: "Configuratore preventivi per lavorazioni meccaniche",
    problema: (
      <>
        Offerte lente e dipendenti da <strong>fogli Excel</strong> con formule
        difficili da mantenere.
      </>
    ),
    risultato: (
      <>
        <strong>Generazione guidata</strong> dei preventivi con dati
        centralizzati: <strong>da 2 giorni a 20 minuti</strong> per preventivo.
      </>
    ),
  },
  {
    titolo: "Tracking commesse multi-reparto",
    problema: (
      <>
        Avanzamenti <strong>non allineati</strong> tra ufficio tecnico,
        produzione e commerciale.
      </>
    ),
    risultato: (
      <>
        <strong>Vista unica</strong> sullo stato commessa, priorita chiare e
        passaggi tra reparti piu fluidi. Circa{" "}
        <strong>8 ore risparmiate a settimana</strong> in allineamenti manuali.
      </>
    ),
  },
  {
    titolo: "Portale richieste acquisto e fornitori",
    problema: (
      <>
        Richieste materiali <strong>disperse tra mail e chat</strong>, con poca
        tracciabilita delle approvazioni.
      </>
    ),
    risultato: (
      <>
        <strong>Workflow strutturato</strong> delle richieste con storico
        decisioni e controllo stato in tempo reale.{" "}
        <strong>Tempo di approvazione ridotto del 70%</strong>.
      </>
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
      "Porta un processo reale: in 30 minuti identifichiamo colli di bottiglia, priorita e prossimo passo operativo.",
  },
  b: {
    finalPrimary: "Blocca la tua call di 30 minuti",
    finalMicrocopy:
      "Confronto operativo sul tuo caso: usciamo con una direzione pratica, non con una proposta generica.",
  },
  c: {
    finalPrimary: "Richiedi analisi sul tuo caso",
    finalMicrocopy:
      "Analizziamo un flusso reale e definiamo dove intervenire prima, con impatto misurabile.",
  },
};

export default function ManifatturaPage() {
  const router = useRouter();
  const rawVariant =
    typeof router.query.cta === "string" ? router.query.cta.toLowerCase() : "a";
  const ctaVariantKey: CtaVariantKey =
    rawVariant === "b" || rawVariant === "c" ? rawVariant : "a";
  const activeCta = ctaVariants[ctaVariantKey];

  return (
    <>
      <Head>
        <title>Software operativo per aziende manifatturiere | Frasma</title>
        <meta
          name="description"
          content="Software operativo per manifattura: integrazione ERP, ufficio tecnico e produzione, con automazioni su commesse, preventivi, PDF e flussi di approvazione."
        />
      </Head>

      <main className="min-h-screen bg-farm-bg text-farm-text">
        {/* ── Hero ── */}
        <section className="section-farm pt-16 pb-20 sm:pt-24 sm:pb-28 relative overflow-hidden">
          <div className="relative lg:pr-[420px]">
            <p className="mb-5 inline-flex rounded-full border border-farm-border bg-farm-surface px-4 py-2 text-sm font-medium text-farm-secondary">
              Il gestionale c&apos;e. Il processo no.
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
              Il gestionale c&apos;e. Ma il lavoro gira ancora su{" "}
              <span className="text-sage">Excel, mail e PDF</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-farm-secondary sm:text-lg">
              Sviluppo software su misura che collega <strong>ERP</strong>,{" "}
              <strong>ufficio tecnico</strong> e <strong>produzione</strong>,
              eliminando passaggi manuali e colli di bottiglia operativi.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-farm-secondary sm:text-base">
              Lavoro sul <strong>processo reale</strong>: quello che vive tra
              persone, reparti e strumenti, non solo nell&apos;ERP.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Cal textButton={activeCta.finalPrimary} buttonType="default" />
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

        {/* ── Caso in evidenza ── */}
        <section className="section-farm pb-8 sm:pb-10">
          <article className="rounded-2xl border border-sage/30 bg-sage-50/70 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-sage-700">
              Caso reale
            </p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Preventivi da 2 giorni a 20 minuti
            </h2>
            <p className="mt-4 max-w-3xl text-farm-secondary leading-relaxed">
              In una lavorazione meccanica, la preventivazione dipendeva da
              fogli Excel complessi e passaggi tra reparti. Abbiamo
              centralizzato dati tecnici e logica di calcolo in un flusso
              guidato, riducendo tempi, errori e dipendenza da file locali.
            </p>
            <a
              href="#progetti"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-sage-700 hover:text-sage-600"
            >
              Vedi altri progetti simili &rarr;
            </a>
          </article>
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
            Automazione operativa sui tuoi flussi reali
          </h2>
          <p className="mt-5 max-w-3xl text-farm-secondary leading-relaxed">
            Niente software generici. Progetto{" "}
            <strong>strumenti operativi</strong> su processi reali, con
            integrazioni tra sistemi esistenti e automazioni anche su documenti
            tecnici e PDF.
          </p>
          <h3 className="mt-10 text-lg font-semibold">
            Use case su cui intervengo
          </h3>
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
        <section id="come-lavoro" className="section-farm py-16 sm:py-20">
          <h2 className="text-2xl font-semibold sm:text-3xl">Come lavoro</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <article className="rounded-xl border border-farm-border bg-farm-surface p-5">
              <p className="text-sm font-semibold text-sage">
                1. Analisi del processo
              </p>
              <p className="mt-2 text-sm text-farm-secondary leading-relaxed">
                Mappo il <strong>flusso attuale</strong>, i punti di attrito e
                le attivita che oggi fanno perdere piu tempo.
              </p>
            </article>
            <article className="rounded-xl border border-farm-border bg-farm-surface p-5">
              <p className="text-sm font-semibold text-sage">
                2. Prototipo rapido
              </p>
              <p className="mt-2 text-sm text-farm-secondary leading-relaxed">
                Sviluppo una <strong>prima versione testabile</strong> per
                validare subito utilita e adozione.
              </p>
            </article>
            <article className="rounded-xl border border-farm-border bg-farm-surface p-5">
              <p className="text-sm font-semibold text-sage">
                3. Software operativo
              </p>
              <p className="mt-2 text-sm text-farm-secondary leading-relaxed">
                Rendo la soluzione <strong>robusta, integrata</strong> e pronta
                all&apos;uso quotidiano.
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
        <section id="chi-sono" className="section-farm py-16 sm:py-20">
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
                <strong>Francesco Saverio</strong> &mdash;{" "}
                <strong>11 anni</strong> nello sviluppo software, Laurea
                Magistrale in Scienze e Tecnologie Agrarie. Lavoro come
                freelance con aziende manifatturiere, progettando{" "}
                <strong>soluzioni snelle</strong> partendo dal{" "}
                <strong>flusso reale</strong> di chi usa il sistema.
              </p>
            </div>
          </div>
        </section>

        {/* ── Progetti ── */}
        <section id="progetti" className="section-farm py-16 sm:py-20">
          <h2 className="text-2xl font-semibold sm:text-3xl">Progetti</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {progetti.map((progetto) => (
              <article
                key={progetto.titolo}
                className="rounded-xl border border-farm-border bg-farm-surface p-5"
              >
                <h3 className="text-lg font-semibold">{progetto.titolo}</h3>
                <p className="mt-3 text-sm text-farm-secondary leading-relaxed">
                  <span className="font-semibold text-farm-text">
                    Problema:
                  </span>{" "}
                  {progetto.problema}
                </p>
                <p className="mt-2 text-sm text-farm-secondary leading-relaxed">
                  <span className="font-semibold text-farm-text">
                    Risultato:
                  </span>{" "}
                  {progetto.risultato}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ── CTA finale ── */}
        <section id="prenota" className="section-farm py-20 sm:py-28">
          <div className="rounded-2xl border-2 border-sage/30 bg-farm-panel p-8 text-center sm:p-14">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Processi ancora gestiti tra ERP, Excel, mail e PDF?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-farm-secondary leading-relaxed">
              <strong>Call di 30 minuti</strong>: analizziamo un processo reale
              della tua azienda e identifichiamo dove intervenire.
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm font-medium text-farm-secondary">
              {activeCta.finalMicrocopy}
            </p>
            <div className="mt-8 flex justify-center">
              <Cal textButton={activeCta.finalPrimary} buttonType="default" />
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
