import {
  DiagnosticFrameworkSchema,
  FrasmaProfileSchema,
  KnowledgeCatalogSchema,
  type DiagnosticFramework,
  type FrasmaProfile,
  type Locale,
  type LocalizedText,
} from "./types";

const text = (it: string, en: string): LocalizedText => ({ it, en });

export const knowledgeCatalog = KnowledgeCatalogSchema.parse({
  profile: {
    name: "Frasma",
    founder: "Francesco Saverio Mazzi",
    location: "Mantova, Italy",
    languages: ["it", "en"],
    kind: text(
      "Studio software indipendente specializzato in software operativo su misura e AI.",
      "Independent software studio specializing in custom operational software and AI.",
    ),
    description: text(
      "Frasma riduce il lavoro manuale tra documenti, email, fogli di calcolo ed ERP. Parte da un processo aziendale reale e costruisce strumenti controllabili, con validazione umana nei passaggi critici.",
      "Frasma reduces manual work across documents, email, spreadsheets, and ERP systems. It starts from a real business process and builds controllable tools with human validation at critical steps.",
    ),
    focus: [
      text(
        "Software operativo, automazioni AI e integrazioni dati.",
        "Operational software, AI automation, and data integrations.",
      ),
      text(
        "Processi documentali, workflow, ticket e conoscenza aziendale.",
        "Document processes, workflows, tickets, and company knowledge.",
      ),
      text(
        "Prototipi costruiti su dati e casi d'uso reali.",
        "Prototypes built on real data and use cases.",
      ),
    ],
    sectors: [
      "manufacturing",
      "food-quality",
      "agronomy-agri-food",
      "field-service",
    ],
    commercialLimits: [
      text(
        "Non esiste un listino universale: ambito, integrazioni e condizioni economiche richiedono una discovery.",
        "There is no universal price list: scope, integrations, and commercial terms require discovery.",
      ),
      text(
        "Frasma non promette prezzi, risparmi, tempi di rientro o risultati senza una baseline verificata.",
        "Frasma does not promise prices, savings, payback periods, or outcomes without a verified baseline.",
      ),
      text(
        "Stime e ipotesi vanno validate sui dati, sui vincoli e sul processo del cliente.",
        "Estimates and assumptions must be validated against the client's data, constraints, and process.",
      ),
    ],
  },
  diagnostic: {
    title: text(
      "Diagnosi di un processo operativo",
      "Operational process diagnostic",
    ),
    introduction: text(
      "La diagnosi verifica se un flusso ripetitivo può essere reso più controllabile con software su misura, integrazioni o AI.",
      "The diagnostic checks whether a repetitive workflow can become more controllable through custom software, integrations, or AI.",
    ),
    steps: [
      {
        id: "observe",
        title: text("Osservare il lavoro reale", "Observe the real work"),
        description: text(
          "Intervistare chi esegue il processo e ricostruire input, decisioni, eccezioni e passaggi manuali.",
          "Interview the people running the process and map inputs, decisions, exceptions, and manual steps.",
        ),
        evidence: [
          text(
            "Esempi reali di email, PDF, Excel, DDT, ticket o documenti tecnici.",
            "Real examples of email, PDFs, spreadsheets, delivery notes, tickets, or technical documents.",
          ),
          text(
            "Persone, sistemi e responsabilità coinvolte.",
            "People, systems, and responsibilities involved.",
          ),
        ],
      },
      {
        id: "baseline",
        title: text("Definire la baseline", "Define the baseline"),
        description: text(
          "Misurare volumi, tempi, errori, rilavorazioni e punti di attesa prima di proporre un risultato.",
          "Measure volumes, time, errors, rework, and waiting points before proposing an outcome.",
        ),
        evidence: [
          text(
            "Dati osservabili e periodo di riferimento.",
            "Observable data and reference period.",
          ),
          text(
            "Criteri condivisi per qualità e completamento.",
            "Shared criteria for quality and completion.",
          ),
        ],
      },
      {
        id: "prototype",
        title: text(
          "Prototipare sul caso reale",
          "Prototype on the real case",
        ),
        description: text(
          "Testare il flusso su un perimetro limitato, mantenendo controlli umani e tracciabilità.",
          "Test the workflow on a limited scope while retaining human checks and traceability.",
        ),
        evidence: [
          text(
            "Dataset rappresentativo, incluse eccezioni.",
            "Representative dataset, including exceptions.",
          ),
          text(
            "Output verificati dagli utenti responsabili.",
            "Outputs checked by accountable users.",
          ),
        ],
      },
      {
        id: "evaluate",
        title: text(
          "Confrontare e decidere",
          "Compare and decide",
        ),
        description: text(
          "Confrontare il prototipo con la baseline e decidere se estendere, correggere o fermare il progetto.",
          "Compare the prototype with the baseline and decide whether to extend, adjust, or stop the project.",
        ),
        evidence: [
          text(
            "Risultati misurati con gli stessi criteri della baseline.",
            "Results measured with the same criteria as the baseline.",
          ),
          text(
            "Vincoli tecnici, organizzativi e commerciali espliciti.",
            "Explicit technical, organizational, and commercial constraints.",
          ),
        ],
      },
    ],
    fitCriteria: [
      text(
        "Il team copia dati tra email, Excel, PDF ed ERP.",
        "The team copies data between email, spreadsheets, PDFs, and ERP systems.",
      ),
      text(
        "Il processo funziona già, ma contiene attività ripetitive, attese o controlli manuali.",
        "The process already works but contains repetitive tasks, delays, or manual checks.",
      ),
      text(
        "Esistono esempi reali, utenti disponibili e un responsabile del processo.",
        "Real examples, available users, and a process owner exist.",
      ),
      text(
        "Serve un software mirato senza sostituire necessariamente l'intero gestionale.",
        "A focused tool is needed without necessarily replacing the entire management system.",
      ),
    ],
    poorFitCriteria: [
      text(
        "Non esiste ancora un processo stabile da osservare o un problema specifico da risolvere.",
        "There is no stable process to observe or specific problem to solve yet.",
      ),
      text(
        "Si richiede automazione senza accesso a dati, utenti o criteri di validazione.",
        "Automation is requested without access to data, users, or validation criteria.",
      ),
      text(
        "Si pretende un risultato economico garantito prima di misurare la baseline.",
        "A guaranteed economic outcome is expected before measuring the baseline.",
      ),
    ],
    commercialLimits: [
      text(
        "La diagnosi non produce automaticamente un preventivo definitivo.",
        "The diagnostic does not automatically produce a final quotation.",
      ),
      text(
        "Qualsiasi stima dipende da perimetro, qualità dei dati, integrazioni e responsabilità operative.",
        "Any estimate depends on scope, data quality, integrations, and operational responsibilities.",
      ),
      text(
        "Nessun risparmio o risultato viene dichiarato senza evidenze verificabili del progetto.",
        "No savings or outcome is stated without verifiable project evidence.",
      ),
    ],
  },
  entries: [
    {
      id: "frasma-profile",
      category: "profile",
      title: text("Profilo Frasma", "Frasma profile"),
      summary: text(
        "Studio software indipendente di Mantova guidato da Francesco Saverio Mazzi.",
        "Independent software studio in Mantova led by Francesco Saverio Mazzi.",
      ),
      details: [
        text(
          "Costruisce software operativo, agenti AI e integrazioni dati per PMI.",
          "It builds operational software, AI agents, and data integrations for SMEs.",
        ),
        text(
          "Lavora in italiano e inglese con una struttura snella e una rete selezionata per competenze complementari.",
          "It works in Italian and English with a lean structure and a selected network for complementary expertise.",
        ),
      ],
      keywords: {
        it: ["Frasma", "Francesco Saverio Mazzi", "Mantova", "studio software", "PMI"],
        en: ["Frasma", "Francesco Saverio Mazzi", "Mantova", "software studio", "SME"],
      },
      pagePaths: ["/", "/for-agents"],
      relatedIds: ["diagnostic-method", "fit-criteria"],
    },
    {
      id: "delivery-notes-to-erp",
      category: "service",
      title: text(
        "Automatizzare i DDT verso Mago e TeamSystem",
        "Automate delivery notes into Mago and TeamSystem",
      ),
      summary: text(
        "Lettura di Documenti di Trasporto, bolle e fatture da email o PDF, con campi preparati per Mago Zucchetti, Mago4, TeamSystem o l'ERP già in uso.",
        "Reading delivery notes, packing slips, and invoices from email or PDF, with fields prepared for Mago Zucchetti, Mago4, TeamSystem, or the ERP already in use.",
      ),
      details: [
        text(
          "I documenti arrivano nel ciclo passivo: email del fornitore, PDF, scansioni o portali, non come tracciato già pronto per l'ERP.",
          "Documents arrive in the purchase cycle: supplier email, PDFs, scans, or portals, not as a file the ERP already accepts.",
        ),
        text(
          "Il flusso individua DDT e bolle, estrae fornitore, numero, data, articoli e quantità, e segnala i campi incerti.",
          "The workflow finds delivery notes and packing slips, extracts supplier, number, date, lines, and quantities, and flags uncertain fields.",
        ),
        text(
          "Una persona valida i dati prima dell'importazione: non c'è carico cieco in magazzino o in contabilità.",
          "A person validates the data before import: there is no blind stock or accounting load.",
        ),
        text(
          "I campi confermati vengono preparati per Mago, Mago4, TeamSystem o un altro gestionale già in azienda, senza sostituirlo.",
          "Confirmed fields are prepared for Mago, Mago4, TeamSystem, or another system already in the company, without replacing it.",
        ),
        text(
          "Excel può essere il primo registro di controllo; l'arrivo è l'importazione tracciata nell'ERP.",
          "Excel can be the first control register; the destination is a traced import into the ERP.",
        ),
      ],
      keywords: {
        it: [
          "DDT",
          "Documenti di Trasporto",
          "bolle",
          "ciclo passivo",
          "Mago",
          "Mago4",
          "Mago Zucchetti",
          "TeamSystem",
          "Zucchetti",
          "fatture",
          "PDF",
          "email",
          "ERP",
        ],
        en: [
          "delivery notes",
          "packing slips",
          "purchase cycle",
          "Mago",
          "Mago4",
          "Mago Zucchetti",
          "TeamSystem",
          "Zucchetti",
          "invoices",
          "PDF",
          "email",
          "ERP",
        ],
      },
      pagePaths: ["/servizi/ddt-erp", "/", "/#come-funziona"],
      relatedIds: ["manufacturing-erp-case", "manufacturing"],
    },
    {
      id: "workflow-procedures",
      category: "service",
      title: text(
        "Procedure HACCP, qualità e certificazioni",
        "HACCP, quality, and certification procedures",
      ),
      summary: text(
        "Procedure guidate per HACCP, controlli qualità e certificazioni: stati, regole, documenti e eccezioni visibili.",
        "Guided procedures for HACCP, quality controls, and certifications: states, rules, documents, and visible exceptions.",
      ),
      details: [
        text(
          "Si parte da una pratica reale: HACCP, non conformità, certificazione o controllo ripetuto con documenti da produrre.",
          "Work starts from a real filing: HACCP, nonconformity, certification, or a repeated control that produces documents.",
        ),
        text(
          "Il workflow fissa stati, responsabili e regole; i materiali sparsi diventano passaggi ordinati.",
          "The workflow sets states, owners, and rules; scattered materials become ordered steps.",
        ),
        text(
          "L'AI può preparare o classificare moduli e allegati; firme, avanzamenti e chiusure restano del team.",
          "AI can prepare or classify forms and attachments; signatures, status changes, and closures stay with the team.",
        ),
        text(
          "Le eccezioni restano visibili e assegnate, invece di perdersi in email o cartelle condivise.",
          "Exceptions stay visible and assigned, instead of disappearing into email or shared folders.",
        ),
      ],
      keywords: {
        it: [
          "HACCP",
          "procedure",
          "qualità",
          "certificazioni",
          "pratiche",
          "controlli",
          "non conformità",
          "workflow",
        ],
        en: [
          "HACCP",
          "procedures",
          "quality",
          "certifications",
          "filings",
          "controls",
          "nonconformity",
          "workflow",
        ],
      },
      pagePaths: ["/servizi/procedure-guidate", "/", "/#come-funziona"],
      relatedIds: ["food-quality-case", "agri-food-operations-case"],
    },
    {
      id: "field-service-ticketing",
      category: "service",
      title: text(
        "Ticketing per manutenzione e interventi sul campo",
        "Ticketing for field maintenance and interventions",
      ),
      summary: text(
        "Richieste, priorità, tecnici, fornitori, SLA e chiusura interventi in un flusso condiviso tra cliente, campo e back office.",
        "Requests, priorities, technicians, suppliers, SLAs, and intervention closure in one workflow across customer, field, and back office.",
      ),
      details: [
        text(
          "La richiesta arriva da email, telefono o portale e diventa un ticket con priorità e responsabile.",
          "The request arrives by email, phone, or portal and becomes a ticket with a priority and an owner.",
        ),
        text(
          "Tecnici e fornitori vedono assegnazione, stato e storico invece di ricostruire il caso in chat.",
          "Technicians and suppliers see assignment, status, and history instead of reconstructing the case in chat.",
        ),
        text(
          "SLA e scadenze restano visibili; la chiusura registra esito, ricambi e follow-up.",
          "SLAs and deadlines stay visible; closure records outcome, spare parts, and follow-up.",
        ),
        text(
          "Il flusso può collegare il cliente, l'attività sul campo e il back office senza un secondo gestionale.",
          "The workflow can connect the customer, field activity, and back office without a second management system.",
        ),
      ],
      keywords: {
        it: [
          "ticket",
          "field service",
          "manutenzione",
          "interventi",
          "tecnici",
          "fornitori",
          "SLA",
          "assistenza",
        ],
        en: [
          "tickets",
          "field service",
          "maintenance",
          "interventions",
          "technicians",
          "suppliers",
          "SLA",
          "support",
        ],
      },
      pagePaths: ["/servizi/ticketing-manutenzione", "/", "/#come-funziona"],
      relatedIds: ["industrial-maintenance-case", "field-service"],
    },
    {
      id: "custom-management-software",
      category: "service",
      title: text(
        "Gestionali personalizzati",
        "Custom management software",
      ),
      summary: text(
        "Web app operative su misura con tabelle, stati, ruoli, controlli ed export verso i sistemi esistenti.",
        "Custom operational web apps with tables, states, roles, checks, and exports into existing systems.",
      ),
      details: [
        text(
          "Si copre un processo specifico di back office — tabelle, stati, ruoli, controlli — senza sostituire l'ERP.",
          "It covers a specific back-office process — tables, states, roles, checks — without replacing the ERP.",
        ),
        text(
          "Utenti, dati e integrazioni reali definiscono il perimetro: Excel, listini, commesse o export verso il gestionale già in uso.",
          "Actual users, data, and integrations define the scope: spreadsheets, price lists, jobs, or exports into the management system already in use.",
        ),
        text(
          "La web app operativa resta il posto in cui il team lavora; l'ERP resta il sistema contabile o di magazzino.",
          "The operational web app stays where the team works; the ERP stays the accounting or warehouse system.",
        ),
        text(
          "Non è un prodotto a listino: serve una discovery su processo, volumi e vincoli.",
          "It is not a priced product: discovery on process, volumes, and constraints is required.",
        ),
      ],
      keywords: {
        it: [
          "gestionale",
          "software su misura",
          "web app",
          "ERP",
          "back office",
          "integrazioni",
          "commesse",
          "Excel",
        ],
        en: [
          "management software",
          "custom software",
          "web app",
          "ERP",
          "back office",
          "integrations",
          "jobs",
          "spreadsheets",
        ],
      },
      pagePaths: ["/servizi/software-operativo", "/", "/#come-funziona"],
      relatedIds: ["delivery-notes-to-erp", "workflow-procedures"],
    },
    {
      id: "ai-datasets-benchmarks",
      category: "service",
      title: text(
        "Dataset, benchmark e ottimizzazione AI",
        "AI datasets, benchmarks, and optimization",
      ),
      summary: text(
        "Preparazione di dataset operativi e benchmark per confrontare configurazioni AI su criteri verificabili.",
        "Preparation of operational datasets and benchmarks to compare AI configurations against verifiable criteria.",
      ),
      details: [
        text(
          "Si costruisce un dataset operativo su documenti e casi reali, con esempi normali ed eccezioni.",
          "An operational dataset is built on real documents and cases, including normal examples and exceptions.",
        ),
        text(
          "I test includono i casi che richiedono escalation umana, non solo il percorso felice.",
          "Tests include cases that need human escalation, not only the happy path.",
        ),
        text(
          "Il benchmark confronta configurazioni AI su criteri verificabili: qualità, affidabilità, latenza e costi osservati.",
          "The benchmark compares AI configurations on verifiable criteria: quality, reliability, latency, and observed costs.",
        ),
        text(
          "Non ci sono promesse preventive di accuratezza o risparmio: i numeri escono dalla baseline misurata.",
          "There are no advance promises of accuracy or savings: the numbers come from a measured baseline.",
        ),
      ],
      keywords: {
        it: ["dataset", "benchmark", "ottimizzazione AI", "valutazione", "baseline", "test"],
        en: ["dataset", "benchmark", "AI optimization", "evaluation", "baseline", "testing"],
      },
      pagePaths: ["/servizi/dataset-benchmark-ai", "/", "/for-agents"],
      relatedIds: ["diagnostic-method", "commercial-boundaries"],
    },
    {
      id: "company-wiki-brain",
      category: "service",
      title: text(
        "Wiki e cervello aziendale",
        "Company wiki and AI brain",
      ),
      summary: text(
        "Procedure, documenti e know-how in una base ricercabile con AI, collegata a ERP, workflow e lavoro quotidiano.",
        "Procedures, documents, and know-how in an AI-searchable base connected to ERP, workflows, and daily work.",
      ),
      details: [
        text(
          "Procedure, PDF e know-how non restano in una cartella sparsa: le fonti vengono strutturate e versionate.",
          "Procedures, PDFs, and know-how do not stay in a scattered folder: sources are structured and versioned.",
        ),
        text(
          "Ogni fonte ha un responsabile di aggiornamento; la ricerca AI cita da dove viene la risposta.",
          "Each source has an update owner; AI search cites where the answer comes from.",
        ),
        text(
          "Accessi e confini informativi restano espliciti: non è un chatbot su tutti i file aziendali.",
          "Access and information boundaries stay explicit: it is not a chatbot over every company file.",
        ),
        text(
          "La wiki si collega a ERP, workflow e lavoro quotidiano quando quei sistemi sono il posto in cui il team cerca già le procedure.",
          "The wiki connects to ERP, workflows, and daily work when those systems are already where the team looks up procedures.",
        ),
      ],
      keywords: {
        it: ["wiki", "cervello aziendale", "knowledge base", "procedure", "ricerca AI", "documenti", "ERP", "workflow"],
        en: ["wiki", "company brain", "knowledge base", "procedures", "AI search", "documents", "ERP", "workflow"],
      },
      pagePaths: [
        "/servizi/wiki-aziendale-ai",
        "/",
        "/#come-funziona",
        "/for-agents",
      ],
      relatedIds: ["local-ai-enterprise", "ai-presence", "workflow-procedures"],
    },
    {
      id: "local-ai-enterprise",
      category: "service",
      title: text(
        "AI in locale per aziende",
        "On-premise and private-network AI",
      ),
      summary: text(
        "Modelli e agenti AI su infrastruttura aziendale o rete privata, con dati sensibili che restano in sede.",
        "AI models and agents on company infrastructure or a private network, with sensitive data kept on site.",
      ),
      details: [
        text(
          "Modelli e agenti restano su server aziendali o rete privata; i documenti sensibili non vanno su un cloud pubblico di default.",
          "Models and agents stay on company servers or a private network; sensitive documents do not go to a public cloud by default.",
        ),
        text(
          "L'AI può rispondere su procedure interne, ERP e casi operativi solo dentro quel perimetro.",
          "AI can answer over internal procedures, ERP, and operational cases only inside that perimeter.",
        ),
        text(
          "Architettura, modelli e integrazioni dipendono da vincoli tecnici, privacy e GDPR del cliente.",
          "Architecture, models, and integrations depend on the client's technical constraints, privacy, and GDPR requirements.",
        ),
        text(
          "Non promettiamo uno stack generico né un'AI autonoma che decide al posto del team.",
          "We do not promise a generic stack or an autonomous AI that decides instead of the team.",
        ),
      ],
      keywords: {
        it: ["AI in locale", "on-prem", "rete privata", "GDPR", "dati sensibili", "infrastruttura aziendale", "agenti AI"],
        en: ["on-premise AI", "private network", "GDPR", "sensitive data", "company infrastructure", "AI agents", "local AI"],
      },
      pagePaths: ["/servizi/ai-on-premise", "/", "/#come-funziona"],
      relatedIds: ["company-wiki-brain", "ai-datasets-benchmarks"],
    },
    {
      id: "ai-presence",
      category: "service",
      title: text("Presenza AI esterna", "External AI presence"),
      summary: text(
        "Visibilità verso assistenti esterni come ChatGPT, Claude e Gemini: contenuti strutturati, connettori e hub per agenti.",
        "Visibility to external assistants such as ChatGPT, Claude, and Gemini: structured content, connectors, and an agents hub.",
      ),
      details: [
        text(
          "Servizio distinto dal cervello aziendale interno e dall'AI in locale: riguarda come l'azienda appare e risponde fuori dai propri sistemi.",
          "Distinct from the internal company brain and on-premise AI: this is about how the company appears and responds outside its own systems.",
        ),
        text(
          "Deliverable tipici: llms.txt, hub per agenti, schema.org, skill pubbliche e tool MCP read-only.",
          "Typical deliverables: llms.txt, an agents hub, schema.org, public skills, and read-only MCP tools.",
        ),
        text(
          "La presenza dipende dalle piattaforme esterne e non implica garanzie di ranking, citazione o visibilità.",
          "Presence depends on external platforms and does not imply ranking, citation, or visibility guarantees.",
        ),
      ],
      keywords: {
        it: ["presenza AI", "ChatGPT", "Claude", "Gemini", "dati strutturati", "connettori", "MCP", "llms.txt"],
        en: ["AI presence", "ChatGPT", "Claude", "Gemini", "structured data", "connectors", "MCP", "llms.txt"],
      },
      pagePaths: [
        "/servizi/presenza-ai",
        "/",
        "/#come-funziona",
        "/for-agents",
      ],
      relatedIds: ["company-wiki-brain", "local-ai-enterprise", "commercial-boundaries"],
    },
    {
      id: "vibeup-deploy-service",
      category: "service",
      title: text(
        "VibeUp Deploy as a Service",
        "VibeUp Deploy as a Service",
      ),
      summary: text(
        "Pacchetti a prezzo fisso per deploy, fix e rilascio di prototipi vibe-coded. Non sostituisce il software operativo su misura per PMI.",
        "Fixed-price packages for deploy, fixes, and launch of vibe-coded prototypes. It does not replace custom operational software for SMEs.",
      ),
      details: [
        text(
          "Pacchetti pubblicati solo su /vibeup: Starter €250, Pro €499, Launch Sprint €2500.",
          "Packages published only on /vibeup: Starter €250, Pro €499, Launch Sprint €2500.",
        ),
        text(
          "Ambito: deploy cloud, fix di build/config, code review e hardening di rilascio — non ERP, workflow PMI o diagnosi operativa Frasma.",
          "Scope: cloud deploy, build/config fixes, code review, and release hardening — not ERP, SME workflows, or Frasma operational diagnostics.",
        ),
        text(
          "Questi prezzi fissi non si applicano ai servizi operativi Frasma, che richiedono discovery e non hanno listino universale.",
          "These fixed prices do not apply to Frasma operational services, which require discovery and have no universal price list.",
        ),
      ],
      keywords: {
        it: ["VibeUp", "deploy", "vibe coding", "prototipo", "Vercel", "Railway", "prezzo fisso"],
        en: ["VibeUp", "deploy", "vibe coding", "prototype", "Vercel", "Railway", "fixed price"],
      },
      pagePaths: ["/vibeup"],
      relatedIds: ["commercial-boundaries"],
    },
    {
      id: "food-quality-case",
      category: "case-study",
      title: text(
        "Procedure e certificazioni alimentari",
        "Food procedures and certifications",
      ),
      summary: text(
        "Caso reale anonimo: pratiche HACCP e certificazioni trasformate da documenti sparsi in passaggi guidati e controllati.",
        "Anonymous real case: HACCP and certification work moved from scattered documents to guided, controlled steps.",
      ),
      details: [
        text(
          "Prima: compilazioni ripetitive, revisioni lente e materiali distribuiti.",
          "Before: repetitive form filling, slow reviews, and distributed materials.",
        ),
        text(
          "Dopo: dati guidati, documenti controllati e consulente responsabile della verifica finale.",
          "After: guided data, controlled documents, and the consultant responsible for final validation.",
        ),
      ],
      keywords: {
        it: ["HACCP", "certificazioni", "alimentare", "qualità", "procedure", "consulente"],
        en: ["HACCP", "certifications", "food", "quality", "procedures", "consultant"],
      },
      pagePaths: ["/casi/procedure-alimentari", "/", "/#casi-studio"],
      relatedIds: ["workflow-procedures", "food-quality"],
    },
    {
      id: "manufacturing-erp-case",
      category: "case-study",
      title: text(
        "Documenti ERP e preventivi manifatturieri",
        "Manufacturing ERP documents and quotes",
      ),
      summary: text(
        "Caso reale anonimo: dati da fatture, DDT e specifiche tecniche preparati per ERP e preventivi senza copia-incolla.",
        "Anonymous real case: data from invoices, delivery notes, and technical specifications prepared for ERP and quotes without copy-paste.",
      ),
      details: [
        text(
          "Prima: dati copiati a mano tra fatture, DDT, specifiche tecniche, Excel e preventivi.",
          "Before: data copied by hand across invoices, delivery notes, technical specs, spreadsheets, and quotes.",
        ),
        text(
          "Il lavoro gira tra ufficio tecnico, commerciale e produzione su versioni diverse della stessa commessa.",
          "Work moves between technical office, sales, and production on different versions of the same job.",
        ),
        text(
          "Dopo: lettura automatica dei documenti, controllo umano e output tracciato verso ERP e preventivi.",
          "After: automatic document reading, human review, and traced output into ERP and quotes.",
        ),
      ],
      keywords: {
        it: [
          "manifattura",
          "preventivi",
          "Excel",
          "commesse",
          "DDT",
          "fatture",
          "ERP",
          "ufficio tecnico",
        ],
        en: [
          "manufacturing",
          "quotes",
          "spreadsheets",
          "jobs",
          "delivery notes",
          "invoices",
          "ERP",
          "technical office",
        ],
      },
      pagePaths: ["/casi/documenti-erp-manifattura", "/", "/#casi-studio"],
      relatedIds: ["delivery-notes-to-erp", "manufacturing"],
    },
    {
      id: "industrial-maintenance-case",
      category: "case-study",
      title: text(
        "Manutenzione di impianti industriali",
        "Industrial plant maintenance",
      ),
      summary: text(
        "Caso reale anonimo: clienti, tecnici e fornitori collegati nello stesso flusso dalla richiesta alla chiusura.",
        "Anonymous real case: customers, technicians, and suppliers connected in one workflow from request to closure.",
      ),
      details: [
        text(
          "Prima: richieste via email e telefono con visibilità frammentata.",
          "Before: requests by email and phone with fragmented visibility.",
        ),
        text(
          "Dopo: ticket, assegnazioni, stati e storico condivisi.",
          "After: shared tickets, assignments, states, and history.",
        ),
      ],
      keywords: {
        it: ["manutenzione", "impianti", "ticket", "tecnici", "fornitori", "field service"],
        en: ["maintenance", "plants", "tickets", "technicians", "suppliers", "field service"],
      },
      pagePaths: ["/casi/manutenzione-impianti", "/", "/#casi-studio"],
      relatedIds: ["field-service-ticketing", "field-service"],
    },
    {
      id: "agri-food-operations-case",
      category: "case-study",
      title: text(
        "Pratiche agroalimentari multi-azienda",
        "Multi-company agri-food filings",
      ),
      summary: text(
        "Caso reale anonimo: pratiche diverse tra aziende ricondotte a un processo operativo condiviso.",
        "Anonymous real case: different company filings brought into a shared operational process.",
      ),
      details: [
        text(
          "Prima: passaggi manuali e scarsa standardizzazione tra aziende.",
          "Before: manual steps and limited standardization across companies.",
        ),
        text(
          "Dopo: flusso comune, eccezioni esplicite e migliore coordinamento della rete.",
          "After: a common workflow, explicit exceptions, and better network coordination.",
        ),
      ],
      keywords: {
        it: ["agroalimentare", "agronomia", "pratiche", "multi-azienda", "workflow", "rete"],
        en: ["agri-food", "agronomy", "filings", "multi-company", "workflow", "network"],
      },
      pagePaths: ["/casi/operazioni-agri-food", "/", "/#casi-studio"],
      relatedIds: ["workflow-procedures", "agronomy-agri-food"],
    },
    {
      id: "manufacturing",
      category: "sector",
      title: text("Manifattura", "Manufacturing"),
      summary: text(
        "Preventivi, Excel ponte ERP, commesse e passaggi tra ufficio tecnico e produzione — non MES o automazione di fabbrica.",
        "Quotes, spreadsheets as an ERP bridge, jobs, and handoffs between technical office and production — not MES or shop-floor automation.",
      ),
      details: [
        text(
          "Il lavoro ripetitivo sta tra Excel, mail, PDF e gestionale: preventivi, distinte, RFQ e avanzamento commessa.",
          "The repetitive work sits between spreadsheets, email, PDFs, and the management system: quotes, BOMs, RFQs, and job progress.",
        ),
        text(
          "Si collegano ERP, ufficio tecnico e produzione senza sostituire il gestionale e senza un progetto Industria 4.0 di macchina.",
          "ERP, technical office, and production are connected without replacing the management system and without a machine-level Industry 4.0 project.",
        ),
        text(
          "I Documenti di Trasporto e i preventivi da listini sono processi distinti, ciascuno con una spoke di servizio.",
          "Delivery notes and quotes from price lists are distinct processes, each with its own service spoke.",
        ),
      ],
      keywords: {
        it: [
          "manifattura",
          "preventivi",
          "Excel",
          "commesse",
          "ufficio tecnico",
          "produzione",
          "ERP",
          "DDT",
        ],
        en: [
          "manufacturing",
          "quotes",
          "spreadsheets",
          "jobs",
          "technical office",
          "production",
          "ERP",
          "delivery notes",
        ],
      },
      pagePaths: ["/manifattura", "/"],
      relatedIds: ["delivery-notes-to-erp", "manufacturing-erp-case"],
    },
    {
      id: "food-quality",
      category: "sector",
      title: text("Alimentare e qualità", "Food and quality"),
      summary: text(
        "HACCP, controlli, certificazioni e documentazione di qualità.",
        "HACCP, controls, certifications, and quality documentation.",
      ),
      details: [
        text(
          "HACCP, certificazioni e controlli qualità producono documenti ripetuti, revisioni e eccezioni.",
          "HACCP, certifications, and quality controls produce repeated documents, reviews, and exceptions.",
        ),
        text(
          "L'automazione prepara moduli e stati; la verifica resta allo specialista o al consulente responsabile.",
          "Automation prepares forms and states; validation stays with the specialist or responsible consultant.",
        ),
        text(
          "Il flusso utile è una procedura guidata, non un chatbot sulla cartella dei PDF di qualità.",
          "The useful workflow is a guided procedure, not a chatbot over a folder of quality PDFs.",
        ),
      ],
      keywords: {
        it: [
          "alimentare",
          "qualità",
          "HACCP",
          "certificazioni",
          "controlli",
          "procedure",
          "non conformità",
        ],
        en: [
          "food",
          "quality",
          "HACCP",
          "certifications",
          "controls",
          "procedures",
          "nonconformity",
        ],
      },
      pagePaths: ["/alimentare", "/"],
      relatedIds: ["food-quality-case", "workflow-procedures"],
    },
    {
      id: "agronomy-agri-food",
      category: "sector",
      title: text("Agronomia e agroalimentare", "Agronomy and agri-food"),
      summary: text(
        "Pratiche, tracciabilità, quaderni di campagna e conoscenza tecnica.",
        "Filings, traceability, field notebooks, and technical knowledge.",
      ),
      details: [
        text(
          "Pratiche, quaderni di campagna e tracciabilità cambiano da azienda ad azienda nella stessa rete.",
          "Filings, field notebooks, and traceability differ from company to company in the same network.",
        ),
        text(
          "Il sistema standardizza il flusso comune e rende esplicite le eccezioni, invece di copiare lo stesso Excel.",
          "The system standardizes the shared workflow and makes exceptions explicit, instead of copying the same spreadsheet.",
        ),
        text(
          "La conoscenza tecnica resta assegnata a chi la aggiorna; non è un archivio anonimo di PDF.",
          "Technical knowledge stays assigned to whoever updates it; it is not an anonymous PDF archive.",
        ),
      ],
      keywords: {
        it: ["agronomia", "agroalimentare", "tracciabilità", "pratiche", "quaderno di campagna"],
        en: ["agronomy", "agri-food", "traceability", "filings", "field notebook"],
      },
      pagePaths: ["/agronomia", "/"],
      relatedIds: ["agri-food-operations-case", "workflow-procedures"],
    },
    {
      id: "field-service",
      category: "sector",
      title: text("Servizi sul campo", "Field services"),
      summary: text(
        "Manutenzione, assistenza tecnica e coordinamento di interventi distribuiti.",
        "Maintenance, technical support, and coordination of distributed interventions.",
      ),
      details: [
        text(
          "Manutenzione e assistenza tecnica vivono tra telefono, email e tecnici in movimento.",
          "Maintenance and technical support live between phone, email, and technicians on the move.",
        ),
        text(
          "Il flusso collega richiesta cliente, pianificazione, intervento, fornitore e chiusura con storico condiviso.",
          "The workflow connects customer request, planning, intervention, supplier, and closure with shared history.",
        ),
        text(
          "Ticket e SLA rendono visibili ritardi e responsabilità; non sostituiscono il gestionale di magazzino.",
          "Tickets and SLAs make delays and ownership visible; they do not replace the warehouse management system.",
        ),
      ],
      keywords: {
        it: [
          "field service",
          "servizi sul campo",
          "manutenzione",
          "assistenza",
          "interventi",
          "ticket",
          "tecnici",
        ],
        en: [
          "field service",
          "maintenance",
          "support",
          "interventions",
          "tickets",
          "technicians",
        ],
      },
      pagePaths: ["/manutenzione", "/"],
      relatedIds: ["field-service-ticketing", "industrial-maintenance-case"],
    },
    {
      id: "diagnostic-method",
      category: "methodology",
      title: text("Metodo Frasma", "Frasma method"),
      summary: text(
        "Osservazione, baseline, prototipo controllato e confronto sui dati.",
        "Observation, baseline, controlled prototype, and data-based comparison.",
      ),
      details: [
        text(
          "Si parte da input frammentati, si disegna un flusso con regole e verifiche, quindi si valuta l'output operativo.",
          "The work starts from fragmented inputs, designs a workflow with rules and checks, then evaluates the operational output.",
        ),
        text(
          "L'AI prepara dove utile; il team valida i passaggi critici.",
          "AI prepares where useful; the team validates critical steps.",
        ),
      ],
      keywords: {
        it: ["metodo", "diagnosi", "baseline", "prototipo", "validazione", "misurazione"],
        en: ["method", "diagnostic", "baseline", "prototype", "validation", "measurement"],
      },
      pagePaths: ["/", "/for-agents"],
      relatedIds: ["fit-criteria", "commercial-boundaries", "post-golive-continuity"],
    },
    {
      id: "post-golive-continuity",
      category: "methodology",
      title: text("Continuità dopo il go-live", "Continuity after go-live"),
      summary: text(
        "Il pilot non chiude il rapporto: il flusso resta in esercizio con manutenzione ed evoluzione nel tempo.",
        "The pilot does not end the engagement: the workflow stays in service with maintenance and evolution over time.",
      ),
      details: [
        text(
          "Quando cambiano tracciati documentali, fornitori, versioni dell'ERP o obblighi normativi, si interviene sul flusso esistente invece di rifarlo.",
          "When document formats, suppliers, ERP versions, or regulatory obligations change, the existing workflow is updated rather than rebuilt.",
        ),
        text(
          "Il referente tecnico resta lo stesso dalla prima analisi alla manutenzione: chi ha costruito il flusso è chi risponde quando va aggiornato.",
          "The technical lead stays the same from the first analysis through maintenance: whoever built the workflow is who answers when it needs updating.",
        ),
        text(
          "Automatizzare l'attività successiva costa meno della prima, perché integrazioni, accessi e regole sono già in produzione.",
          "Automating the next activity costs less than the first, because integrations, access, and rules are already in production.",
        ),
        text(
          "I flussi Frasma in produzione sono seguiti con contratti di manutenzione attivi; durata e livelli di servizio si definiscono sul singolo processo e non esistono condizioni standard dichiarabili a priori.",
          "Frasma workflows running in production are covered by active maintenance agreements; duration and service levels are set per process, and no standard terms can be stated upfront.",
        ),
      ],
      keywords: {
        it: [
          "manutenzione",
          "continuità",
          "dopo il progetto",
          "lungo termine",
          "evoluzione",
          "assistenza",
          "aggiornamenti",
        ],
        en: [
          "maintenance",
          "continuity",
          "after the project",
          "long term",
          "evolution",
          "support",
          "updates",
        ],
      },
      pagePaths: ["/", "/for-agents"],
      relatedIds: ["diagnostic-method", "commercial-boundaries"],
    },
    {
      id: "fit-criteria",
      category: "fit",
      title: text("Criteri di compatibilità", "Fit criteria"),
      summary: text(
        "Frasma è adatta a processi esistenti con lavoro manuale, dati disponibili e persone responsabili.",
        "Frasma fits existing processes with manual work, available data, and accountable people.",
      ),
      details: [
        text(
          "Buon fit: copia-incolla tra sistemi, documenti tecnici, procedure ripetitive, ticket o bisogno di un gestionale mirato.",
          "Good fit: copy-paste across systems, technical documents, repetitive procedures, tickets, or need for focused management software.",
        ),
        text(
          "Fit debole: obiettivo non definito, dati indisponibili o richiesta di garanzie prima della misurazione.",
          "Poor fit: undefined objective, unavailable data, or demand for guarantees before measurement.",
        ),
      ],
      keywords: {
        it: ["fit", "compatibilità", "quando contattare", "processo", "dati", "requisiti"],
        en: ["fit", "when to contact", "process", "data", "requirements", "suitability"],
      },
      pagePaths: ["/", "/#contatti"],
      relatedIds: ["diagnostic-method", "commercial-boundaries"],
    },
    {
      id: "commercial-boundaries",
      category: "commercial-limit",
      title: text("Limiti commerciali", "Commercial boundaries"),
      summary: text(
        "Prezzi, risparmi e risultati non vengono inventati o garantiti senza discovery e baseline.",
        "Prices, savings, and outcomes are neither invented nor guaranteed without discovery and a baseline.",
      ),
      details: [
        text(
          "Il preventivo dipende da perimetro, dati, integrazioni, sicurezza e responsabilità.",
          "A quotation depends on scope, data, integrations, security, and responsibilities.",
        ),
        text(
          "Metriche e benefici devono essere definiti e verificati sul progetto reale.",
          "Metrics and benefits must be defined and verified on the real project.",
        ),
        text(
          "La presenza AI non garantisce ranking o citazioni su piattaforme esterne.",
          "AI presence does not guarantee rankings or citations on external platforms.",
        ),
      ],
      keywords: {
        it: ["prezzi", "costi", "risparmi", "garanzie", "preventivo", "limiti commerciali"],
        en: ["prices", "costs", "savings", "guarantees", "quotation", "commercial limits"],
      },
      pagePaths: ["/", "/#contatti"],
      relatedIds: ["diagnostic-method", "fit-criteria"],
    },
  ],
});

export function getFrasmaProfile(locale: Locale): FrasmaProfile {
  const profile = knowledgeCatalog.profile;

  return FrasmaProfileSchema.parse({
    name: profile.name,
    founder: profile.founder,
    location: profile.location,
    languages: profile.languages,
    kind: profile.kind[locale],
    description: profile.description[locale],
    focus: profile.focus.map((item) => item[locale]),
    sectors: profile.sectors,
    commercialLimits: profile.commercialLimits.map((item) => item[locale]),
  });
}

export function getDiagnosticFramework(
  locale: Locale,
): DiagnosticFramework {
  const diagnostic = knowledgeCatalog.diagnostic;

  return DiagnosticFrameworkSchema.parse({
    title: diagnostic.title[locale],
    introduction: diagnostic.introduction[locale],
    steps: diagnostic.steps.map((step) => ({
      id: step.id,
      title: step.title[locale],
      description: step.description[locale],
      evidence: step.evidence.map((item) => item[locale]),
    })),
    fitCriteria: diagnostic.fitCriteria.map((item) => item[locale]),
    poorFitCriteria: diagnostic.poorFitCriteria.map(
      (item) => item[locale],
    ),
    commercialLimits: diagnostic.commercialLimits.map(
      (item) => item[locale],
    ),
  });
}
