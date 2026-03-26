import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import Cal from "../components/organism/Cal";
import { Laptop, Smartphone, AlertCircle, Hourglass, Bot, Rocket, Lightbulb, MapPin } from "lucide-react";

/* ── Data ─────────────────────────────────────────────────── */

const problemi = [
  {
    icon: <Laptop className="w-7 h-7 text-sage-500" />,
    title: "\"Funziona sul mio PC\"",
    desc: "Hai buildato con Claude Code o Cursor su Windows. In produzione \u00e8 tutto rotto. Dipendenze, path, variabili d\u2019ambiente: un casino.",
  },
  {
    icon: <Smartphone className="w-7 h-7 text-sage-500" />,
    title: "App Expo nel limbo",
    desc: "L\u2019app gira sull\u2019emulatore ma non sai come pubblicarla sull\u2019App Store o Google Play. EAS Build, certificati, provisioning: una giungla.",
  },
  {
    icon: <AlertCircle className="w-7 h-7 text-sage-500" />,
    title: "Errori in produzione",
    desc: "Hai deployato qualcosa ma crasha, scala male o ha tempi di risposta assurdi. Il cliente ti sta scrivendo.",
  },
  {
    icon: <Hourglass className="w-7 h-7 text-sage-500" />,
    title: "Settimane perse",
    desc: "Hai gi\u00e0 perso ore su Stack Overflow e YouTube. Il tuo tempo vale. Delegare il deploy \u00e8 la mossa pi\u00f9 intelligente che puoi fare.",
  },
];

const steps = [
  {
    num: "01",
    label: "CALL GRATUITA",
    title: "30 min di consulenza",
    desc: "Mi mostri il progetto, mi spieghi cosa deve fare. Definisco un piano chiaro: cosa serve, quanto ci vuole, quanto costa. Zero sorprese.",
  },
  {
    num: "02",
    label: "LAVORO IN LIVE",
    title: "Sessione condivisa",
    desc: "Lavoriamo insieme in screen sharing oppure mi mandi accesso al repo. Fix, build, deploy, configurazione infrastruttura: tutto documentato.",
  },
  {
    num: "03",
    label: "CONSEGNA",
    title: "Sei online",
    desc: "L\u2019app \u00e8 pubblica, funziona, scala. Ti lascio tutte le chiavi: repo, dominio, credenziali, guida al deploy autonomo se serve.",
  },
];

type PackageFeature = { text: string; included: boolean };

const pacchetti: {
  name: string;
  title: string;
  price: string;
  unit: string;
  duration: string;
  features: PackageFeature[];
  featured: boolean;
  ctaText: string;
  note: string;
}[] = [
  {
    name: "STARTER",
    title: "Deploy & Fix",
    price: "\u20AC250",
    unit: "/ sessione",
    duration: "\u2248 3 ore di lavoro",
    features: [
      { text: "30 min di consulenza gratuita inclusa", included: true },
      { text: "Deploy su cloud (Vercel, Railway, Fly.io, AWS\u2026)", included: true },
      { text: "Fix degli errori di build e configurazione", included: true },
      { text: "Setup variabili d\u2019ambiente e secrets", included: true },
      { text: "Dominio custom + SSL", included: true },
      { text: "Code review non inclusa", included: false },
      { text: "Nuove feature non incluse", included: false },
    ],
    featured: false,
    ctaText: "PRENOTA ORA",
    note: "+ 30 min consulenza gratuita prima di iniziare",
  },
  {
    name: "PRO",
    title: "Deploy + Code Review",
    price: "\u20AC499",
    unit: "/ sessione",
    duration: "\u2248 5 ore di lavoro",
    features: [
      { text: "30 min di consulenza gratuita inclusa", included: true },
      { text: "Tutto incluso nel pacchetto Starter", included: true },
      { text: "2 ore di code review del tuo codice", included: true },
      { text: "Refactoring e pulizia del codebase", included: true },
      { text: "Performance audit + ottimizzazione", included: true },
      { text: "Monitoring base (uptime, logs, alerts)", included: true },
      { text: "1 settimana di supporto post-deploy", included: true },
    ],
    featured: true,
    ctaText: "PRENOTA ORA",
    note: "Consigliato se il codice \u00e8 ancora grezzo",
  },
  {
    name: "FULL BUILD",
    title: "Da Zero a Live",
    price: "\u20AC2500",
    unit: "/ progetto",
    duration: "App SaaS completa \u00b7 prezzo fisso",
    features: [
      { text: "Consulenza iniziale inclusa", included: true },
      { text: "Sviluppo dell\u2019app da zero alla pubblicazione", included: true },
      { text: "Frontend + Backend + Database", included: true },
      { text: "Autenticazione, pagamenti, API", included: true },
      { text: "Deploy su infrastruttura scalabile", included: true },
      { text: "App Store / Google Play se mobile", included: true },
      { text: "1 mese di supporto post-lancio", included: true },
    ],
    featured: false,
    ctaText: "PARLIAMO DEL PROGETTO",
    note: "Prezzo fisso. Nessuna sorpresa.",
  },
];

const personas = [
  {
    icon: <Bot className="w-7 h-7 text-sage-500" />,
    title: "Vibe coder",
    desc: "Hai buildato con Claude Code, Cursor, Bolt o Lovable. Il progetto funziona in locale ma non sai come pubblicarlo.",
  },
  {
    icon: <Rocket className="w-7 h-7 text-sage-500" />,
    title: "Founder / Maker",
    desc: "Vuoi lanciare veloce. Non hai voglia di perdere una settimana su Terraform o Docker. Deleghi il deploy a qualcuno di fiducia.",
  },
  {
    icon: <Smartphone className="w-7 h-7 text-sage-500" />,
    title: "App builder",
    desc: "Hai un\u2019app Expo / React Native che funziona sull\u2019emulatore. Vuoi arrivare sugli store senza impazzire con certificati e build pipeline.",
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-sage-500" />,
    title: "Dev senza DevOps",
    desc: "Sei bravo a scrivere codice ma non \u00e8 il tuo mestiere ottimizzare infrastrutture. Ti concentri sul prodotto, io gestisco il resto.",
  },
];

const aboutStats = [
  { value: "10+", label: "anni di esperienza full-stack" },
  { value: "TS", label: "TypeScript \u00b7 React \u00b7 Next.js" },
  { value: "AI", label: "LangChain \u00b7 Claude \u00b7 OpenAI" },
  { value: <MapPin className="w-8 h-8" />, label: "Guastalla, Reggio Emilia" },
];

const faqs = [
  {
    q: "E se il progetto \u00e8 pi\u00f9 complesso del previsto?",
    a: "Lo valutiamo nella call gratuita di 30 minuti prima di iniziare. Se serve pi\u00f9 tempo, te lo dico prima. Nessun extra a sorpresa.",
  },
  {
    q: "Funziona anche per app mobile (iOS / Android)?",
    a: "S\u00ec. Lavoro con Expo, React Native e Flutter. Mi occupo di tutto: EAS Build, TestFlight, App Store Connect, Google Play Console.",
  },
  {
    q: "Su quali piattaforme deployi?",
    a: "Vercel, Railway, Fly.io, Render, AWS, DigitalOcean, Cloudflare Pages, Supabase \u2014 dipende dal progetto. Ti consiglio l\u2019opzione pi\u00f9 adatta a costo e complessit\u00e0.",
  },
  {
    q: "Posso usare il pacchetto Starter per un\u2019app codificata con AI?",
    a: "Assolutamente s\u00ec. \u00c8 nato esattamente per chi vibe-coda con Claude Code, Bolt, Lovable o Cursor e non sa come pubblicare il risultato.",
  },
  {
    q: "Come si paga?",
    a: "Bonifico bancario o carta. Met\u00e0 prima, met\u00e0 a consegna per il pacchetto Full Build. Per Starter e Pro pagamento anticipato.",
  },
];

/* ── Animation helpers ────────────────────────────────────── */

const fadeUp = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-80px" } as const,
};

/* ── Page ─────────────────────────────────────────────────── */

export default function VibeUpPage() {
  return (
    <>
      <Head>
        <title>Vibe Up &mdash; Deploy as a Service | Frasma</title>
        <meta
          name="description"
          content="Hai vibe-codato qualcosa di figo ma non sai come pubblicarlo? Ti porto online in poche ore. Deploy, fix, code review. Garantito."
        />
      </Head>

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-8 lg:px-12 py-4 bg-farm-bg/85 backdrop-blur-md border-b border-farm-border">
        <a
          href="https://www.frasma.org"
          className="text-sm font-semibold tracking-wide text-sage"
          target="_blank"
          rel="noopener noreferrer"
        >
          VIBE UP{" "}
          <span className="text-farm-secondary font-normal">by frasma.org</span>
        </a>
        <Cal textButton="PRENOTA ORA" buttonType="default" />
      </nav>

      <main className="min-h-screen bg-farm-bg text-farm-text">
        {/* ── Hero ── */}
        <section className="section-farm pt-28 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden">
          {/* Decorative grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(107,143,87,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(107,143,87,0.05) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)",
            }}
          />
          {/* Glow */}
          <div
            className="absolute -top-[20%] -left-[10%] w-[700px] h-[700px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(107,143,87,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="relative lg:pr-[420px]">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-sage-50 px-4 py-2 text-xs font-semibold tracking-widest text-sage-600 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse" />
              VIBE UP &middot; DEPLOY AS A SERVICE
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight"
            >
              Hai vibe-codato
              <br />
              qualcosa di <span className="text-sage">figo.</span>
              <br />
              <span className="text-farm-secondary line-through decoration-terra decoration-2">
                Non sai
              </span>{" "}
              come
              <br />
              pubblicarlo.
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-7 text-farm-secondary text-base sm:text-lg leading-relaxed max-w-xl"
            >
              App Expo bloccata. Claude Code che funziona solo sul tuo laptop.
              <br />
              Errori in produzione che non capisci.
              <br />
              <strong className="text-farm-text">
                Ti porto online in poche ore. Garantito.
              </strong>
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Cal textButton="SCEGLI IL PACCHETTO" buttonType="default" />
              <a
                href="#come-funziona"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-sage-600 hover:text-sage-500 bg-sage-50 rounded-full transition duration-200"
              >
                Come funziona &darr;
              </a>
            </motion.div>
          </div>

          {/* Terminal mockup — desktop only */}
          <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-[380px] rounded-xl border border-farm-border bg-farm-panel shadow-2xl overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-farm-surface border-b border-farm-border">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="ml-auto text-[10px] text-farm-secondary">
                terminal &mdash; bash
              </span>
            </div>
            <div className="p-5 font-mono text-xs leading-[2]">
              <div className="text-farm-secondary">$ npm run build</div>
              <div className="text-red-500">
                &#10007; Error: Cannot find module &apos;./api&apos;
              </div>
              <div className="text-farm-secondary">$ expo publish</div>
              <div className="text-red-500">
                &#10007; EAS Build failed (exit 1)
              </div>
              <div className="text-farm-secondary">$ git push heroku main</div>
              <div className="text-red-500">
                &#10007; Application Error H10
              </div>
              <div className="my-2 border-t border-farm-border" />
              <div className="text-farm-secondary">$ vibe-up deploy .</div>
              <div className="text-sage-500">
                &#10003; Build completed in 4m 12s
              </div>
              <div className="text-sage-500">
                &#10003; Deployed &rarr;{" "}
                <span className="underline">tuaapp.com</span>
              </div>
              <div className="text-sage-500">
                &#10003; SSL, CDN, monitoring: OK
              </div>
              <div className="text-farm-text">
                ${" "}
                <span className="inline-block w-2 h-3.5 bg-sage-500 align-middle animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="h-px mx-6 sm:mx-8 lg:mx-12 bg-gradient-to-r from-transparent via-farm-border to-transparent" />

        {/* ── Problema ── */}
        <section className="section-farm py-16 sm:py-20" id="problema">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-sage-500 mb-5"
          >
            IL PROBLEMA
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight"
          >
            Vibe coding &egrave; facile.
            <br />
            <span className="text-sage">Il deploy no.</span>
          </motion.h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {problemi.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl border border-farm-border bg-farm-surface p-6 transition-colors hover:border-terra/40"
              >
                <div className="mb-3">{p.icon}</div>
                <h3 className="text-base font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-farm-secondary leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="h-px mx-6 sm:mx-8 lg:mx-12 bg-gradient-to-r from-transparent via-farm-border to-transparent" />

        {/* ── Come funziona ── */}
        <section className="section-farm py-16 sm:py-20" id="come-funziona">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-sage-500 mb-5"
          >
            COME FUNZIONA
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight"
          >
            Tre step.
            <br />
            <span className="text-sage">Poi sei live.</span>
          </motion.h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl border border-farm-border bg-farm-surface p-6"
              >
                <p className="text-xs font-semibold tracking-[0.15em] text-sage-500 mb-4">
                  {s.num} / {s.label}
                </p>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-farm-secondary leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="h-px mx-6 sm:mx-8 lg:mx-12 bg-gradient-to-r from-transparent via-farm-border to-transparent" />

        {/* ── Pacchetti ── */}
        <section className="section-farm py-16 sm:py-20" id="pacchetti">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-sage-500 mb-5"
          >
            PACCHETTI
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight"
          >
            Scegli il livello
            <br />
            <span className="text-sage">di supporto.</span>
          </motion.h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pacchetti.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative rounded-xl p-8 flex flex-col overflow-hidden transition-transform hover:-translate-y-1 ${
                  pkg.featured
                    ? "border-2 border-sage bg-gradient-to-br from-farm-surface to-sage-50 shadow-lg"
                    : "border border-farm-border bg-farm-surface"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute top-4 -right-8 bg-sage-500 text-white text-[9px] font-bold tracking-[0.1em] px-10 py-1 rotate-45 origin-center">
                    PI&Ugrave; POPOLARE
                  </span>
                )}

                <p className="text-xs font-semibold tracking-[0.15em] text-sage-500 uppercase mb-3">
                  {pkg.name}
                </p>
                <h3 className="text-xl font-extrabold mb-4">{pkg.title}</h3>
                <p className="text-5xl font-extrabold tracking-tight leading-none mb-1">
                  {pkg.price}{" "}
                  <span className="text-xl font-normal text-farm-secondary">
                    {pkg.unit}
                  </span>
                </p>
                <p className="text-xs text-farm-secondary font-mono mb-6">
                  {pkg.duration}
                </p>

                <div className="h-px bg-farm-border mb-6" />

                <ul className="flex-1 space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li
                      key={f.text}
                      className={`text-sm flex items-start gap-2.5 ${
                        f.included
                          ? "text-farm-secondary"
                          : "text-farm-tertiary"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 font-mono text-xs mt-0.5 ${
                          f.included ? "text-sage-500" : "text-farm-tertiary"
                        }`}
                      >
                        {f.included ? "\u2192" : "\u00b7"}
                      </span>
                      {f.text}
                    </li>
                  ))}
                </ul>

                <div className="[&>button]:w-full">
                  <Cal textButton={pkg.ctaText} buttonType="default" />
                </div>
                <p className="text-xs text-farm-secondary text-center mt-3">
                  {pkg.note}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="h-px mx-6 sm:mx-8 lg:mx-12 bg-gradient-to-r from-transparent via-farm-border to-transparent" />

        {/* ── Per chi e ── */}
        <section className="relative bg-farm-panel border-y border-farm-border py-16 sm:py-20 overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-sage to-transparent" />
          <div className="section-farm">
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.4 }}
              className="text-xs font-semibold tracking-[0.2em] uppercase text-sage-500 mb-5"
            >
              PER CHI &Egrave;
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight"
            >
              Se ti riconosci
              <br />
              <span className="text-sage">qui, scrivimi.</span>
            </motion.h2>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {personas.map((p, i) => (
                <motion.div
                  key={p.title}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-xl border border-farm-border bg-farm-bg p-5"
                >
                  <div className="mb-3">{p.icon}</div>
                  <h4 className="text-sm font-bold mb-2">{p.title}</h4>
                  <p className="text-xs text-farm-secondary leading-relaxed">
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Chi sono ── */}
        <section className="section-farm py-16 sm:py-20">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
              <span className="inline-block text-xs font-semibold tracking-[0.15em] text-sage-500 border border-sage/30 px-3 py-1 rounded mb-5">
                CHI SONO
              </span>
              <div className="relative mx-auto h-52 w-52 overflow-hidden rounded-2xl border border-farm-border bg-farm-panel mb-6 lg:mx-0">
                <Image
                  src="/profilo_home.jpg"
                  alt="Francesco Mazzi - sviluppatore full-stack"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight mb-6">
                Francesco Mazzi
                <br />
                <span className="text-sage">Frasma</span>
              </h2>
              <p className="text-farm-secondary leading-relaxed mb-4">
                Sviluppatore full-stack con{" "}
                <strong className="text-farm-text">
                  10 anni di esperienza
                </strong>{" "}
                su TypeScript, React, Next.js, Python, Flutter e Swift. Ho
                lavorato su SaaS, app mobile e sistemi AI per aziende
                manifatturiere e agricole.
              </p>
              <p className="text-farm-secondary leading-relaxed">
                So cos&apos;&egrave; un deploy rotto perch&eacute; ne ho fixati
                centinaia. So cosa vuol dire avere un&apos;idea in testa e non
                riuscire a portarla online.{" "}
                <strong className="text-farm-text">
                  Per questo ho creato Vibe Up.
                </strong>
              </p>
              <div className="flex flex-wrap gap-4 mt-7">
                {[
                  { label: "frasma.org", href: "https://www.frasma.org" },
                  {
                    label: "github",
                    href: "https://github.com/francemazzi",
                  },
                  { label: "seminai.tech", href: "https://seminai.tech" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-sage border-b border-sage/30 hover:border-sage pb-0.5 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-[2px] bg-farm-border rounded-xl overflow-hidden">
              {aboutStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-farm-surface p-7"
                >
                  <p className="text-3xl font-extrabold text-sage tracking-tight leading-none mb-1.5">
                    {s.value}
                  </p>
                  <p className="text-xs text-farm-secondary">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px mx-6 sm:mx-8 lg:mx-12 bg-gradient-to-r from-transparent via-farm-border to-transparent" />

        {/* ── FAQ ── */}
        <section className="section-farm py-16 sm:py-20">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-sage-500 mb-5"
          >
            FAQ
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight"
          >
            Domande
            <br />
            <span className="text-sage">frequenti.</span>
          </motion.h2>

          <div className="mt-10 max-w-2xl">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border-b border-farm-border py-6"
              >
                <h3 className="text-base font-semibold">{faq.q}</h3>
                <p className="mt-2 text-sm text-farm-secondary leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA Finale ── */}
        <section className="section-farm py-20 sm:py-28">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl border-2 border-sage/30 bg-farm-panel p-8 text-center sm:p-12 overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(107,143,87,0.06), transparent)",
              }}
            />
            <h2 className="relative text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight max-w-2xl mx-auto">
              Il tuo progetto
              <br />
              <span className="text-sage">merita di essere online.</span>
            </h2>
            <p className="relative mt-4 text-farm-secondary text-lg">
              Prenota 30 minuti gratuiti. Nessun impegno.
            </p>
            <div className="relative mt-8 flex justify-center">
              <Cal
                textButton="PRENOTA LA CALL GRATUITA"
                buttonType="default"
              />
            </div>
          </motion.div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-farm-border px-6 sm:px-8 lg:px-12 py-8 flex flex-wrap justify-between items-center gap-4 max-w-5xl mx-auto">
          <p className="text-xs text-farm-secondary">
            &copy; 2025{" "}
            <a
              href="https://www.frasma.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage hover:underline"
            >
              Frasma.org
            </a>{" "}
            &middot; Francesco Saverio Mazzi &middot; Guastalla, RE
          </p>
          <div className="flex gap-4">
            {[
              { label: "frasma.org", href: "https://www.frasma.org" },
              { label: "github", href: "https://github.com/francemazzi" },
              { label: "seminai.tech", href: "https://seminai.tech" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sage hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </main>
    </>
  );
}
