---
slug: smartcaricrop-dss-fertilizzazione-caraibi
title: "SmartCariCrop a CIGR 2026: da Excel FAO a un DSS usabile sul campo"
seoTitle: "SmartCariCrop a CIGR 2026: da Excel FAO a un DSS sul campo | Frasma"
seoDescription: "Come un workflow FAO su Excel è diventato una PWA offline per fertilizzazione e gestione colturale nei Caraibi. Poster a CIGR Torino 2026."
excerpt: "Al congresso CIGR–EurAgEng 2026 a Torino ho presentato SmartCariCrop: un sistema di supporto alle decisioni che porta i modelli FAO di fertilizzazione fuori dai fogli Excel, sul campo e anche offline."
coverImage: "/image/blog/smartcaricrop/cover.webp"
publishedAt: "2026-08-31"
updatedAt: "2026-08-31"
tags:
  - sviluppo-software
  - agricoltura
  - pwa
  - digitalizzazione
status: published
---

A fine giugno, al [Joint CIGR–EurAgEng World Congress 2026](https://www.cigr-eurageng-2026.org/homepage/) del Politecnico di Torino, ho presentato come primo autore un poster su SmartCariCrop (paper ID 417). Il titolo del contributo è *A Decision Support System For Fertilization And Crop Management Based On FAO’s Workflow In The Caribbean Region*.

Il lavoro nasce da CREA e FAO. Il problema da cui partiamo non è un modello agronomico da inventare: è un workflow già validato, rimasto chiuso in fogli Excel difficili da condividere, aggiornare e usare in campo.

![Collage di SmartCariCrop: interfaccia di calcolo fertilizzanti al centro e tecnici e agricoltori che usano sensori, smartphone e laptop in serra e in campo](/image/blog/smartcaricrop/cover.webp)

## Il collo di bottiglia è lo strumento, non il modello

Negli Small Island Developing States caraibici il cambiamento climatico, l’impoverimento dei suoli e il rialzo dei prezzi degli input pesano sulla sicurezza alimentare dei piccoli produttori. Gli agronomi FAO pianificano fertilizzazione e trattamenti con fogli Excel: i calcoli sono potenti, ma il file non scala. Modificarlo, tracciarne le versioni, condividerlo tra uffici, servizi di estensione e agricoltori è faticoso. Aggiornarlo in modo uniforme tra paesi lo è ancora di più.

L’obiettivo del lavoro è portare quel workflow in uno strumento digitale accessibile: ridurre i dosaggi dove il modello lo consente, rendere visibili i costi, lasciare una traccia di chi ha calcolato cosa, e dare a FAO e alle amministrazioni nazionali dati aggregati invece di copie di file.

## Cos'è SmartCariCrop

SmartCariCrop è una Progressive Web App nata da interviste con tecnici, funzionari pubblici e agricoltori. Si installa dal browser e funziona anche offline: in campo e in zone con connettività limitata non si può dipendere da una scheda sempre aperta.

L’accesso è basato sui ruoli: amministratori FAO e CREA, servizi governativi e di estensione, agricoltori, fornitori di input. Le funzioni principali coprono:

- gestione di aziende e appezzamenti;
- pianificazione della fertilizzazione;
- esplorazione dei fungicidi;
- conversioni di unità localizzate.

L’architettura è pensata per un dispiegamento multi-paese tra Caraibi e Sud America, non per un prototipo da dimostrazione.

## I modelli decisionali

Il nucleo agronomico non è stato riscritto da zero. È lo stesso workflow dei fogli FAO, portato in un’applicazione.

**Fertilizzazione.** Un modello di programmazione lineare, derivato dalle funzioni circolari dei fogli Excel, minimizza l’apporto totale di fertilizzante rispettando i fabbisogni della coltura. Il calcolo tiene conto di analisi del suolo, resa attesa e fattori irrigui. In uscita c’è un calendario — giornaliero, settimanale o mensile — con i costi.

**Idroponica.** Un algoritmo iterativo di bilanciamento ionico combina analisi dell’acqua, profili ionici dei fertilizzanti e neutralizzazione acida del pH. Gira nel browser, nei Web Worker, così l’interfaccia resta usabile mentre il calcolo lavora.

**Difesa.** Un database ricercabile di fungicidi, filtrabile per coltura, sintomi, malattia e codici FRAC. Non sostituisce il giudizio agronomico: rende consultabile in pochi passaggi una conoscenza che altrimenti sta in tabelle e manuali.

## Stack e perché una PWA

Il frontend è React con Vite. Dietro c’è un’API REST in Node.js, un database MySQL e un dispiegamento su Docker.

La scelta della PWA non è di moda: in serra o in appezzamento serve un’app che si apre da un link, si installa sul telefono e continua a funzionare se la rete cade. I Web Worker per l’idroponica vanno nella stessa direzione: tenere il calcolo pesante lontano dal thread dell’interfaccia, senza chiedere un server sempre raggiungibile.

## Validazione e prossimi passi

Una release di test è stata valutata da agronomi in tre paesi caraibici. Accanto alle prove sul campo ci sono una survey con 20 agricoltori e policy maker e focus group per un’analisi SWOT.

L’impatto atteso, se lo strumento entra nel lavoro quotidiano, è un dosaggio più contenuto, costi più chiari per chi coltiva, tracciabilità completa dei piani e dati aggregati per il monitoraggio di FAO e delle politiche nazionali.

I passi successivi indicati nel poster sono formazione degli stakeholder, roll-out del modulo idroponica ed estensione ad altri paesi caraibici e sudamericani.

## Autori

Il poster è un lavoro collettivo CREA–FAO.

- **Francesco Saverio Mazzi**, Giacomo Colle, Alessandro Paletto — CREA, Centro di ricerca Foreste e Legno, Trento
- Simona Violino, Simone Figorilli, Corrado Costa, Federico Pallottino — CREA, Centro di ricerca Ingegneria e Trasformazioni agroalimentari, Monterotondo (Roma)
- Melvin Medina Navarro — FAO, Regional Office for Latin America and the Caribbean
- Anne Desrochers — FAO, Subregional Office for the Caribbean

Corrispondenza: [francescosaverio.mazzi@crea.gov.it](mailto:francescosaverio.mazzi@crea.gov.it)
