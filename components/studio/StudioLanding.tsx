"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import {
  ArrowUpRight,
  Bot,
  Boxes,
  CheckCircle2,
  Compass,
  Cpu,
  DatabaseZap,
  FileStack,
  Flag,
  Gauge,
  Hammer,
  MapPinned,
  Network,
  Radio,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Swords,
  TerminalSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Cal from "../organism/Cal";

const pixelGridStyle = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
} satisfies CSSProperties;

const TribalStudioCanvas = dynamic(
  () => import("./TribalStudioScene").then((mod) => mod.TribalStudioCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[#10251f]">
        <div className="absolute inset-0 opacity-70" style={pixelGridStyle} />
      </div>
    ),
  }
);

type Service = {
  title: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

type Mission = {
  id: string;
  title: string;
  status: string;
  metric: string;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    title: "AI agents",
    label: "Totem cognitivo",
    description:
      "Agenti verticali che leggono documenti, interrogano basi dati e preparano decisioni verificabili.",
    icon: Bot,
  },
  {
    title: "Software operativo",
    label: "Fucina custom",
    description:
      "Web app su misura per processi che oggi vivono fra Excel, email, PDF e gestionali scollegati.",
    icon: Hammer,
  },
  {
    title: "Integrazioni",
    label: "Ponte tra sistemi",
    description:
      "API, workflow e sincronizzazioni per far parlare ERP, documenti e strumenti interni.",
    icon: Network,
  },
  {
    title: "Dashboard e controllo",
    label: "Torre di guardia",
    description:
      "Stati, metriche e audit trail per vedere cosa sta succedendo prima che diventi un problema.",
    icon: Gauge,
  },
];

const missions: Mission[] = [
  {
    id: "scan",
    title: "Ricognizione processo",
    status: "Pronto",
    metric: "30 min",
    icon: ScanLine,
  },
  {
    id: "prototype",
    title: "Prototipo su caso reale",
    status: "Sprint",
    metric: "7-14 gg",
    icon: Boxes,
  },
  {
    id: "system",
    title: "Sistema integrato",
    status: "Deploy",
    metric: "MVP",
    icon: Cpu,
  },
];

const stackSignals = [
  "Next.js",
  "React",
  "TypeScript",
  "AI agents",
  "API",
  "ERP",
  "PDF",
  "Data flows",
];

function revealProps(reducedMotion: boolean | null, delay = 0) {
  if (reducedMotion) {
    return {
      initial: false,
      whileInView: undefined,
      viewport: undefined,
      transition: undefined,
    };
  }

  return {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.48, delay },
  };
}

function HudChip({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 border border-white/20 bg-[#10231d]/70 px-3 py-2 text-[#f7f1d8] shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-md">
      <Icon size={16} aria-hidden="true" className="shrink-0 text-[#ffd166]" />
      <span className="min-w-0">
        <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#a9d7cf]">
          {label}
        </span>
        <span className="block truncate text-sm font-semibold">{value}</span>
      </span>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#bb542f]">
        <Flag size={14} aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="font-serif text-4xl font-medium leading-tight text-[#192018] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-[#4d5647] sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      {...revealProps(reducedMotion, index * 0.07)}
      className="group relative overflow-hidden rounded-lg border border-[#d1c398] bg-[#fff7db] p-5 shadow-[0_18px_50px_rgba(70,58,32,0.10)] transition-transform duration-300 hover:-translate-y-1"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(168,65,43,0.10), transparent 45%), linear-gradient(rgba(25,32,24,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(25,32,24,0.07) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 18px 18px, 18px 18px",
        }}
      />
      <div className="relative">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#bd9f62] bg-[#203c31] text-[#ffe29a] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]">
            <Icon size={21} aria-hidden="true" />
          </div>
          <span className="rounded-full border border-[#c7a667] bg-[#f5d483] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#513719]">
            {service.label}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-[#192018]">{service.title}</h3>
        <p className="mt-3 text-sm leading-6 text-[#58604f]">{service.description}</p>
      </div>
    </motion.article>
  );
}

function MissionCard({ mission, index }: { mission: Mission; index: number }) {
  const Icon = mission.icon;
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      {...revealProps(reducedMotion, index * 0.08)}
      className="rounded-lg border border-[#315344] bg-[#10231d] p-5 text-[#fbf6e5] shadow-[0_22px_60px_rgba(5,18,14,0.22)]"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f0c15c] text-[#17221b]">
          <Icon size={21} aria-hidden="true" />
        </div>
        <span className="rounded-full border border-[#65d6c7]/40 bg-[#16362e] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8ee6d8]">
          {mission.status}
        </span>
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#d7b466]">
        Missione {mission.id}
      </p>
      <h3 className="mt-2 text-xl font-semibold">{mission.title}</h3>
      <div className="mt-5 flex items-center justify-between border-t border-white/12 pt-4">
        <span className="text-sm text-[#b8cabf]">Output</span>
        <span className="font-mono text-sm text-[#ffe29a]">{mission.metric}</span>
      </div>
    </motion.article>
  );
}

function StudioHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[82dvh] overflow-hidden bg-[#10231d] text-[#fbf6e5] lg:min-h-[86dvh]">
      <TribalStudioCanvas />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_24%,rgba(143,230,216,0.28),transparent_32%),linear-gradient(90deg,rgba(9,22,18,0.90)_0%,rgba(9,22,18,0.60)_42%,rgba(9,22,18,0.20)_100%)]" />
      <div className="absolute inset-0 opacity-45" style={pixelGridStyle} />

      <div className="pointer-events-none absolute right-4 top-5 z-10 hidden w-[280px] space-y-2 lg:block">
        <HudChip icon={Radio} label="Segnale" value="Studio online" />
        <HudChip icon={Compass} label="Coordinate" value="Mantova / remoto" />
        <HudChip icon={ShieldCheck} label="Metodo" value="Human in control" />
      </div>

      <div className="section-farm relative z-10 flex min-h-[82dvh] items-end pb-12 pt-20 lg:min-h-[86dvh]">
        <motion.div
          {...revealProps(reducedMotion)}
          className="w-full max-w-4xl pb-4 sm:pb-8"
        >
          <p className="mb-5 inline-flex items-center gap-2 border border-[#f0c15c]/50 bg-[#10231d]/72 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#ffe29a] backdrop-blur-md">
            <Swords size={15} aria-hidden="true" />
            Frasma Studio // AI outpost
          </p>
          <h1 className="max-w-3xl font-serif text-5xl font-medium leading-none text-[#fff7dc] sm:text-7xl lg:text-8xl">
            Frasma Studio
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d8eadf] sm:text-xl">
            Costruisco software operativo, agenti AI e dashboard per aziende che
            vogliono trasformare processi manuali in sistemi controllati.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Cal textButton="Avvia una missione" buttonType="default" showArrow />
            <Link
              href="#mission-board"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#f0c15c]/55 bg-[#10231d]/62 px-5 py-3 text-sm font-semibold text-[#fff4cf] backdrop-blur-md transition-colors hover:bg-[#f0c15c] hover:text-[#17221b] focus:outline-none focus:ring-2 focus:ring-[#f0c15c]"
            >
              Apri mission board
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ["Build", "MVP"],
              ["Stack", "AI + web"],
              ["Focus", "PMI"],
              ["Mode", "Operativo"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border border-white/18 bg-[#10231d]/58 px-3 py-3 backdrop-blur-md"
              >
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#8ee6d8]">
                  {label}
                </span>
                <span className="mt-1 block text-sm font-semibold text-[#fff7dc]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceGrid() {
  return (
    <section className="bg-[#f2e8c9] py-16 sm:py-24">
      <div className="section-farm">
        <SectionTitle
          eyebrow="Crafting camp"
          title="Una base operativa per prodotti, automazioni e AI agent."
          description="La pagina ha estetica da mappa 3D, ma il lavoro resta concreto: sistemi che riducono copia-incolla, errori e passaggi manuali fra persone e software."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionBoard() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="mission-board"
      className="relative overflow-hidden bg-[#163126] py-16 text-[#fbf6e5] sm:py-24"
    >
      <div className="absolute inset-0 opacity-25" style={pixelGridStyle} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f0c15c] to-transparent" />

      <div className="section-farm relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div {...revealProps(reducedMotion)}>
            <p className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#f0c15c]">
              <MapPinned size={15} aria-hidden="true" />
              Mission board
            </p>
            <h2 className="font-serif text-4xl font-medium leading-tight text-[#fff7dc] sm:text-5xl">
              Dal primo scouting a un sistema che gira ogni giorno.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#c8d9ce] sm:text-lg">
              Ogni progetto parte piccolo: si mappa il flusso reale, si costruisce
              un prototipo e poi si integra solo quello che dimostra valore.
            </p>
          </motion.div>

          <motion.div
            {...revealProps(reducedMotion, 0.12)}
            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
          >
            {stackSignals.map((signal) => (
              <span
                key={signal}
                className="border border-[#416c58] bg-[#0f241d] px-3 py-3 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-[#9eddd2]"
              >
                {signal}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {missions.map((mission, index) => (
            <MissionCard key={mission.id} mission={mission} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OperatingProtocol() {
  const reducedMotion = useReducedMotion();
  const steps = [
    {
      title: "Mappa il terreno",
      description:
        "Documenti, ruoli, strumenti, tempi morti e punti dove il dato viene ricopiato.",
      icon: Compass,
    },
    {
      title: "Costruisci il campo base",
      description:
        "Un prototipo usabile su un caso reale, con dati e vincoli già presenti in azienda.",
      icon: TerminalSquare,
    },
    {
      title: "Collega le rotte",
      description:
        "Integrazioni, permessi, log e dashboard per rendere il sistema stabile e misurabile.",
      icon: DatabaseZap,
    },
  ];

  return (
    <section className="bg-[#fbf6e5] py-16 sm:py-24">
      <div className="section-farm">
        <SectionTitle
          eyebrow="Protocollo operativo"
          title="Meno demo, più campo."
          description="L’obiettivo non è aggiungere un altro tool, ma far avanzare una metrica reale: tempo risparmiato, errori evitati, pratiche chiuse, passaggi automatizzati."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                {...revealProps(reducedMotion, index * 0.08)}
                className="rounded-lg border border-[#d8cba5] bg-white/62 p-6"
              >
                <div className="mb-8 flex items-center justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#203c31] text-[#ffe29a]">
                    <Icon size={21} aria-hidden="true" />
                  </div>
                  <span className="font-mono text-sm text-[#a8412b]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#192018]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#58604f]">
                  {step.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-[#f2e8c9] py-16 sm:py-24">
      <div className="section-farm">
        <motion.div
          {...revealProps(reducedMotion)}
          className="relative overflow-hidden rounded-lg border border-[#2c4f40] bg-[#122820] p-6 text-[#fbf6e5] shadow-[0_28px_80px_rgba(18,40,32,0.22)] sm:p-10 lg:p-12"
        >
          <div className="absolute inset-0 opacity-25" style={pixelGridStyle} />
          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#f0c15c]">
                <Sparkles size={15} aria-hidden="true" />
                Nuova missione
              </p>
              <h2 className="font-serif text-4xl font-medium leading-tight text-[#fff7dc] sm:text-5xl">
                Porta un processo reale. Lo trasformiamo in una mappa d’azione.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#c8d9ce] sm:text-lg">
                In una call capiamo se vale la pena automatizzare, dove partire e
                quale primo prototipo può dare un segnale concreto.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Analisi del flusso attuale",
                "Primo caso d’uso prioritario",
                "Roadmap MVP senza tecnologia inutile",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[#e9f4ea]">
                  <CheckCircle2 size={18} aria-hidden="true" className="text-[#8ee6d8]" />
                  <span>{item}</span>
                </div>
              ))}
              <div className="pt-3">
                <Cal textButton="Prenota la call" buttonType="default" showArrow />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function StudioLanding() {
  return (
    <>
      <StudioHero />
      <ServiceGrid />
      <MissionBoard />
      <OperatingProtocol />
      <FinalCta />
    </>
  );
}
