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
        "DDT e documenti verso ERP",
        "Delivery notes and documents into ERP",
      ),
      summary: text(
        "Estrazione controllata di dati da DDT, fatture e schede tecniche verso Mago Zucchetti, TeamSystem o altri ERP.",
        "Controlled extraction of data from delivery notes, invoices, and technical sheets into Mago Zucchetti, TeamSystem, or other ERP systems.",
      ),
      details: [
        text(
          "Il sistema legge il documento, struttura i campi e segnala quelli da verificare prima dell'importazione.",
          "The system reads the document, structures fields, and flags those requiring review before import.",
        ),
        text(
          "La validazione umana e la tracciabilità restano parte del flusso.",
          "Human validation and traceability remain part of the workflow.",
        ),
      ],
      keywords: {
        it: ["DDT", "documenti", "ERP", "Mago Zucchetti", "TeamSystem", "fatture", "estrazione dati"],
        en: ["delivery notes", "documents", "ERP", "Mago Zucchetti", "TeamSystem", "invoices", "data extraction"],
      },
      pagePaths: ["/", "/#piattaforma"],
      relatedIds: ["manufacturing-erp-case", "manufacturing"],
    },
    {
      id: "workflow-procedures",
      category: "service",
      title: text("Workflow e procedure", "Workflows and procedures"),
      summary: text(
        "Procedure guidate con stati, regole, validazioni e generazione di documenti.",
        "Guided procedures with states, rules, validations, and document generation.",
      ),
      details: [
        text(
          "Adatto a pratiche, controlli qualità, certificazioni e attività ripetitive con eccezioni.",
          "Suitable for filings, quality controls, certifications, and repetitive work with exceptions.",
        ),
        text(
          "L'AI può preparare o classificare; il team mantiene il controllo delle decisioni.",
          "AI can prepare or classify; the team retains control over decisions.",
        ),
      ],
      keywords: {
        it: ["workflow", "procedure", "pratiche", "validazioni", "documenti", "controlli"],
        en: ["workflow", "procedures", "filings", "validation", "documents", "controls"],
      },
      pagePaths: ["/", "/#piattaforma"],
      relatedIds: ["food-quality-case", "agri-food-operations-case"],
    },
    {
      id: "field-service-ticketing",
      category: "service",
      title: text(
        "Ticketing per field service",
        "Field service ticketing",
      ),
      summary: text(
        "Un flusso condiviso per richieste, priorità, tecnici, fornitori, SLA e chiusura interventi.",
        "A shared workflow for requests, priorities, technicians, suppliers, SLAs, and intervention closure.",
      ),
      details: [
        text(
          "Rende visibili stato, assegnazione, storico e responsabilità del ticket.",
          "It makes ticket status, assignment, history, and responsibility visible.",
        ),
        text(
          "Può collegare portale cliente, attività sul campo e back office.",
          "It can connect the customer portal, field activity, and back office.",
        ),
      ],
      keywords: {
        it: ["ticket", "field service", "manutenzione", "tecnici", "fornitori", "SLA", "interventi"],
        en: ["tickets", "field service", "maintenance", "technicians", "suppliers", "SLA", "interventions"],
      },
      pagePaths: ["/", "/#piattaforma"],
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
          "Copre il processo specifico senza imporre la sostituzione completa dell'ERP.",
          "It covers the specific process without forcing a complete ERP replacement.",
        ),
        text(
          "Il perimetro viene definito attorno agli utenti, ai dati e alle integrazioni reali.",
          "Scope is defined around actual users, data, and integrations.",
        ),
      ],
      keywords: {
        it: ["gestionale", "software su misura", "web app", "ERP", "back office", "integrazioni"],
        en: ["management software", "custom software", "web app", "ERP", "back office", "integrations"],
      },
      pagePaths: ["/", "/#piattaforma"],
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
          "I test includono esempi normali, eccezioni e casi che richiedono escalation umana.",
          "Tests include normal examples, exceptions, and cases requiring human escalation.",
        ),
        text(
          "L'ottimizzazione riguarda qualità, affidabilità, latenza e costi tecnici osservati, senza promesse preventive.",
          "Optimization covers observed quality, reliability, latency, and technical costs, without advance promises.",
        ),
      ],
      keywords: {
        it: ["dataset", "benchmark", "ottimizzazione AI", "valutazione", "baseline", "test"],
        en: ["dataset", "benchmark", "AI optimization", "evaluation", "baseline", "testing"],
      },
      pagePaths: ["/", "/for-agents"],
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
          "Le fonti sono strutturate, versionate e associate a responsabilità di aggiornamento.",
          "Sources are structured, versioned, and assigned update responsibilities.",
        ),
        text(
          "La ricerca AI cita le fonti, rispetta accessi e confini informativi ed è integrata nei sistemi che il team usa ogni giorno.",
          "AI search cites sources, respects access and information boundaries, and is integrated into the systems the team uses every day.",
        ),
      ],
      keywords: {
        it: ["wiki", "cervello aziendale", "knowledge base", "procedure", "ricerca AI", "documenti", "ERP", "workflow"],
        en: ["wiki", "company brain", "knowledge base", "procedures", "AI search", "documents", "ERP", "workflow"],
      },
      pagePaths: ["/", "/#piattaforma", "/for-agents"],
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
          "L'AI risponde su documenti interni, procedure, ERP e casi d'uso operativi senza inviare dati sensibili al cloud pubblico.",
          "AI answers over internal documents, procedures, ERP, and operational use cases without sending sensitive data to the public cloud.",
        ),
        text(
          "Architettura, modelli e integrazioni dipendono da vincoli tecnici, privacy e GDPR del cliente; non promettiamo un stack generico.",
          "Architecture, models, and integrations depend on the client's technical constraints, privacy, and GDPR requirements; we do not promise a generic stack.",
        ),
      ],
      keywords: {
        it: ["AI in locale", "on-prem", "rete privata", "GDPR", "dati sensibili", "infrastruttura aziendale", "agenti AI"],
        en: ["on-premise AI", "private network", "GDPR", "sensitive data", "company infrastructure", "AI agents", "local AI"],
      },
      pagePaths: ["/", "/#piattaforma"],
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
      pagePaths: ["/", "/#piattaforma", "/for-agents"],
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
      pagePaths: ["/", "/#casi-studio"],
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
          "Prima: dati riportati manualmente tra documenti, ERP e preventivi.",
          "Before: data manually copied across documents, ERP, and quotes.",
        ),
        text(
          "Dopo: lettura automatica, controllo umano e output tracciato.",
          "After: automatic reading, human review, and traceable output.",
        ),
      ],
      keywords: {
        it: ["manifattura", "DDT", "fatture", "preventivi", "ERP", "gru", "lamiera"],
        en: ["manufacturing", "delivery notes", "invoices", "quotes", "ERP", "cranes", "sheet metal"],
      },
      pagePaths: ["/", "/#casi-studio"],
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
      pagePaths: ["/", "/#casi-studio"],
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
      pagePaths: ["/", "/#casi-studio"],
      relatedIds: ["workflow-procedures", "agronomy-agri-food"],
    },
    {
      id: "manufacturing",
      category: "sector",
      title: text("Manifattura", "Manufacturing"),
      summary: text(
        "Documenti tecnici, DDT, preventivi, ordini e integrazioni ERP.",
        "Technical documents, delivery notes, quotes, orders, and ERP integrations.",
      ),
      details: [
        text(
          "Il focus è sui passaggi ripetitivi tra ufficio, produzione, fornitori e sistemi gestionali.",
          "The focus is on repetitive handoffs between office, production, suppliers, and management systems.",
        ),
      ],
      keywords: {
        it: ["manifattura", "produzione", "DDT", "ERP", "preventivi"],
        en: ["manufacturing", "production", "delivery notes", "ERP", "quotes"],
      },
      pagePaths: ["/", "/manifattura"],
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
          "Le automazioni supportano la preparazione, mentre la responsabilità di verifica resta agli specialisti.",
          "Automation supports preparation while validation responsibility remains with specialists.",
        ),
      ],
      keywords: {
        it: ["alimentare", "qualità", "HACCP", "certificazioni", "controlli"],
        en: ["food", "quality", "HACCP", "certifications", "controls"],
      },
      pagePaths: ["/"],
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
          "I sistemi aiutano a standardizzare il flusso mantenendo esplicite differenze ed eccezioni aziendali.",
          "Systems help standardize the workflow while keeping company differences and exceptions explicit.",
        ),
      ],
      keywords: {
        it: ["agronomia", "agroalimentare", "tracciabilità", "pratiche", "quaderno di campagna"],
        en: ["agronomy", "agri-food", "traceability", "filings", "field notebook"],
      },
      pagePaths: ["/"],
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
          "Il flusso collega richiesta cliente, pianificazione, tecnico, fornitore e chiusura.",
          "The workflow connects customer request, planning, technician, supplier, and closure.",
        ),
      ],
      keywords: {
        it: ["field service", "servizi sul campo", "manutenzione", "assistenza", "interventi"],
        en: ["field service", "maintenance", "support", "interventions", "technicians"],
      },
      pagePaths: ["/"],
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
      relatedIds: ["fit-criteria", "commercial-boundaries"],
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
