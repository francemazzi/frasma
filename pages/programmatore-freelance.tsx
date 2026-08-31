import Link from "next/link";
import ProcessAssessment from "../components/organism/ProcessAssessment";
import Footer from "../components/organism/Footer";
import Header from "../components/organism/Header";
import Seo from "../components/Seo";
import {
  breadcrumbJsonLd,
  personJsonLd,
  professionalServiceJsonLd,
  SITE_URL,
} from "../lib/seo";

const services = [
  {
    title: "Sviluppo web app full stack",
    description:
      "Applicazioni React e Next.js, dashboard operative, backend API, database e strumenti interni per team che vogliono lavorare meglio.",
  },
  {
    title: "Automazioni e agenti AI",
    description:
      "Workflow con LLM, parsing documenti, assistenti AI e integrazioni che riducono tempi, errori e attivita ripetitive.",
  },
  {
    title: "Integrazioni software e dati",
    description:
      "Connessione tra ERP, gestionali, fogli Excel, API, servizi cloud e database per avere processi piu tracciabili.",
  },
];

const stacks = [
  "TypeScript",
  "React",
  "Next.js",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Docker",
  "AI agents",
];

export default function ProgrammatoreFreelancePage() {
  const title =
    "Programmatore freelance a Mantova | Software developer full stack";
  const description =
    "Cerchi un programmatore freelance a Mantova? Francesco Saverio Mazzi, founder dello studio Frasma, sviluppa software su misura, web app, automazioni e AI agents per aziende italiane.";

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/programmatore-freelance"
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            {
              name: "Programmatore freelance",
              path: "/programmatore-freelance",
            },
          ]),
          personJsonLd,
          professionalServiceJsonLd,
          {
            "@type": "Service",
            "@id": `${SITE_URL}/programmatore-freelance#service`,
            name: "Programmatore freelance e software developer full stack",
            description,
            provider: {
              "@id": `${SITE_URL}/#business`,
            },
            serviceType:
              "Sviluppo software su misura, web app, automazioni e AI agents",
            areaServed: {
              "@type": "Country",
              name: "Italia",
            },
          },
        ]}
      />

      <main className="min-h-screen bg-farm-bg font-poppins text-farm-text">
        <Header />

        <section className="section-farm py-16 sm:py-24">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-sage-500">
              Sviluppo software freelance · Mantova
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Programmatore freelance a Mantova per web app, automazioni e
              software su misura.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-farm-secondary sm:text-xl">
              Sono Francesco Saverio Mazzi, founder dello studio{" "}
              <Link href="/" className="font-semibold text-sage-600 hover:text-sage-500">
                Frasma
              </Link>
              . Come informatico freelance e software developer full stack
              aiuto aziende italiane a trasformare processi manuali in
              strumenti digitali concreti, mantenibili e pronti per l&apos;uso
              quotidiano. I servizi operativi dello studio sono su{" "}
              <Link href="/servizi" className="font-semibold text-sage-600 hover:text-sage-500">
                /servizi
              </Link>
              .
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ProcessAssessment textButton="Prenota una call gratuita" />
              <Link
                href="/servizi"
                className="text-sm font-semibold text-sage-600 hover:text-sage-500 transition-colors"
              >
                Vedi i servizi Frasma &rarr;
              </Link>
            </div>
          </div>
        </section>

        <section id="servizi" className="bg-farm-panel py-16 sm:py-20">
          <div className="section-farm">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-farm-text sm:text-4xl">
                Cosa posso sviluppare come freelance
              </h2>
              <p className="mt-4 text-base leading-relaxed text-farm-secondary sm:text-lg">
                Lavoro su progetti dove serve un referente tecnico capace di
                capire il processo, scrivere codice e portare il software in
                produzione.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="rounded-2xl border border-farm-border bg-farm-surface p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-farm-text">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-farm-secondary">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-farm py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-farm-text">
                Stack tecnico e metodo
              </h2>
              <p className="mt-4 text-base leading-relaxed text-farm-secondary">
                Parto dal problema operativo, non dalla tecnologia. Quando il
                flusso e chiaro, scelgo lo stack piu adatto e costruisco una
                prima versione testabile.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {stacks.map((stack) => (
                <span
                  key={stack}
                  className="rounded-full border border-farm-border bg-farm-surface px-4 py-2 text-sm font-medium text-farm-text"
                >
                  {stack}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-farm-panel py-16 sm:py-20">
          <div className="section-farm text-center">
            <h2 className="text-3xl font-bold tracking-tight text-farm-text sm:text-4xl">
              Cerchi un software developer freelance?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-farm-secondary sm:text-lg">
              Raccontami il processo che vuoi migliorare. Ti rispondo con le
              domande giuste per capire obiettivo, dati disponibili, vincoli e
              primo passo sensato.
            </p>
            <div className="mt-8 flex justify-center gap-6">
              <ProcessAssessment textButton="Parliamo del progetto" />
              <Link
                href="/servizi"
                className="self-center text-sm font-semibold text-sage-600 hover:text-sage-500 transition-colors"
              >
                Servizi operativi Frasma
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
