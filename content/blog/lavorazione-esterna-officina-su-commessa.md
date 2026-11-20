---
slug: lavorazione-esterna-officina-su-commessa
title: "Lavorazione esterna officina su commessa: conto lavoro, DDT e stato pezzi al terzista"
seoTitle: "Lavorazione esterna officina su commessa | Frasma"
seoDescription: "Conto lavoro e conto lavoro passivo in officina: DDT di uscita e rientro, pezzi presso il terzista e collegamento alla commessa, oltre Excel."
excerpt: "Quando i pezzi escono per trattamenti o lavorazioni esterne, la commessa non finisce: serve tracciare uscita, rientro, DDT e stato al terzista."
coverImage: /images/blog/cover-lavorazione-esterna-officina-su-commessa.png
publishedAt: "2026-11-19"
updatedAt: "2026-11-19"
tags:
  - intelligenza-artificiale
  - manifattura
  - ddt
  - erp
  - excel
status: published
---

Il tornio ha finito. Il lotto va fuori: trattamento termico, rettifica, verniciatura, zincatura. In ufficio la commessa nel gestionale è ancora «in lavorazione». In reparto nessuno sa con sicurezza quanti pezzi sono partiti ieri, se il DDT di rientro è arrivato solo in email o se il fornitore ha ancora metà lotto in cassa.

Chi cerca **lavorazione esterna officina su commessa** — o le varianti **conto lavoro**, **conto lavoro passivo**, **lavorazioni esterne produzione** — non sta chiedendo un nuovo listino terzisti. Sta chiedendo **come tenere agganciata ogni uscita e ogni rientro al numero commessa**, senza un altro Excel che vive solo sul desktop del capo officina.

Questa guida è operativa. Parlo di DDT, stati, collegamenti al gestionale e di cosa Excel può ancora fare da ponte. Il **costo** del terzista e il margine per commessa sono un altro tavolo: [costi nascosti officina metalmeccanica per commessa](/blog/costi-nascosti-commessa-officina-metalmeccanica) e, per le formule del consuntivo, [software calcolo costi produzione officina](/blog/software-calcolo-costi-produzione-officina). Qui il dubbio è **dove sono i pezzi** e **se la commessa può andare avanti**.

## Cosa significa conto lavoro in un'officina meccanica

**Conto lavoro** (nelle conversazioni d'officina spesso **conto lavoro passivo** o **lavorazioni esterne produzione**) non è un modulo contabile con un nome in più. È il flusso in cui **voi mandate materiale semi-lavorato o finito a un terzista**, lui esegue l'operazione concordata, vi restituisce il lotto con un documento di trasporto.

In pratica, per commessa:

- una o più **fasi esterne** nel ciclo — calore, superficie, rettifica, saldatura specializzata;
- **DDT di uscita** dalla vostra officina verso il terzista (conto lavoro attivo dal vostro punto di vista);
- **DDT di rientro** dal terzista con quantità, riferimento commessa o codice, eventuali note su non conformità;
- uno **stato** che dica al reparto: «da spedire», «presso terzista», «rientrato, da controllo», «rientrato in magazzino commessa».

Il gestionale può registrare movimenti di magazzino o ordini a fornitore. Spesso però **non racconta il piano**: chi chiama il terzista, chi ha firmato l'uscita, da quanti giorni i pezzi sono fuori. Lì nasce il foglio parallelo.

## Il problema: Excel, mail e commessa scollegata

Succede spesso così. Il capo reparto prepara il bancale e firma il DDT. Una copia finisce in una cartella. Il terzista manda il PDF del rientro altrimenti. L'amministrazione registra il documento in contabilità o in ciclo passivo. **Nessuna delle tre copie** porta lo stesso codice commessa, o porta il codice articolo interno che in produzione nessuno usa.

Due conseguenze sul pavimento, non sui bilanci.

**Avanzamento fermo a metà ciclo.** La fase «tornitura» è chiusa nel foglio. La fase «trattamento» non esiste come riga: è una nota in calce. Lunedì il cliente chiede la data di consegna e la risposta è «aspettiamo il rientro da Rossi».

**Pezzi persi nel tempo.** Riapre la commessa dopo due settimane. Nessuno ricorda se sono usciti dieci o dodici pezzi. Il terzista ha fatturato su quantità diverse dal DDT di uscita. Si fa una telefonata invece di aprire una riga.

Quando il sospetto è solo economico — «quanto ci è costato quel trattamento?» — si apre [costi nascosti per commessa](/blog/costi-nascosti-commessa-officina-metalmeccanica). Quando il sospetto è logistica — «possiamo mettere in macchina il lotto B se il lotto A è ancora dal zincatore?» — serve **tracciamento per commessa** delle **lavorazioni esterne**.

Se oggi il piano generale (macchine, priorità, code) vive altrove, il riferimento è [software gestione produzione meccanica](/blog/software-gestione-produzione-meccanica). Questa guida zooma sul **pezzo fuori casa**.

## DDT di uscita e DDT di rientro: cosa deve restare uguale

Un flusso controllato non chiede venti campi. Chiede **coerenza** tra uscita e rientro sulla stessa commessa.

### DDT di uscita (verso il terzista)

Sul documento o nel registro operativo servono almeno:

- **numero commessa** o ordine cliente riconoscibile dal reparto;
- **codice e revisione** del pezzo, **quantità** uscita;
- **terzista** e **operazione** richiesta (anche una riga testuale: «cementoazione 0,8 mm»);
- **data uscita** e **riferimento** al DDT cartaceo o al numero emesso dal gestionale;
- **stato successivo** della commessa: «presso terzista X per operazione Y».

Non è un problema di stampa perfetta. È un problema di **chi compila** e di **dove finisce la copia** che il reparto consulta.

### DDT di rientro (dal terzista)

All'arrivo servono:

- collegamento al **DDT di uscita** o alla **stessa commessa**;
- **quantità rientrate**, note su pezzi mancanti o da rilavorare;
- **data rientro** e aggiornamento stato: «in controllo», «ok per fase successiva».

Se il terzista manda solo PDF via email, il collo di bottiglia è lo stesso dei fornitori materiale: [registrazione DDT in entrata](/blog/registrazione-ddt-in-entrata), [lettura automatica DDT](/blog/lettura-automatica-ddt), [DDT da email](/blog/automatizzare-ddt-email-intelligenza-artificiale). La differenza è che qui **non basta archiviare il PDF**: bisogna **aggiornare lo stato commessa** che il capo officina guarda ogni mattina.

[Valuta tracciamento documenti e commesse in manifattura](/manifattura)

## Stato dei pezzi presso il terzista: oltre «siamo andati da loro»

«Da terzista» non è uno stato operativo. È un buco nero.

Stati che il reparto capisce senza aprire il gestionale:

| Stato (esempio) | Cosa deve dire a chi produce |
| --- | --- |
| Da spedire a terzista | Lotto pronto, DDT uscita non ancora emesso |
| Presso terzista | Uscita registrata, attesa rientro |
| Rientrato, da controllo qualità | DDT entrata registrato, misure da fare |
| Rientrato, in coda macchina | Ok qualità, prossima fase interna |
| Rilavorazione terzista | Pezzi tornati non conformi, nuova uscita |

Chi aggiorna lo stato deve poterlo fare **senza dieci click** e senza chiedere a contabilità se il DDT è «già caricato». Il gestionale può tenere il movimento di magazzino; la **vista commessa** per la produzione può vivere in un registro collegato, come nel caso [Documenti ERP e preventivi manifatturieri](/casi/documenti-erp-manifattura).

Tempi: non serve predire il giorno esatto del rientro con un algoritmo. Serve **data uscita** e, se avete accordi fissi col fornitore, **data prevista** o **giorni standard** per quell'operazione — così, quando slitta, la priorità sulle macchine interne si ricalcola.

## Collegamento alla commessa e avanzamento del ciclo

Ogni **lavorazione esterna** è una **fase del ciclo**, non un appendice.

Se il ciclo nel preventivo dice: tornitura → trattamento → rettifica → spedizione, il piano di avanzamento deve avere **quattro righe visibili**, non tre più una mail in archivio. Il passaggio tornitura/trattamento è dove si rompe più spesso: interno chiuso a rapportino, esterno aperto solo in testa al capo reparto.

Regola che propongo sul campo:

1. **Una riga esterna per operazione e per terzista**, agganciata al **numero commessa** (e, se serve, al lotto parziale).
2. **Chiusura fase interna** solo quando il pezzo è «da spedire» o «già uscito», non quando «secondo me è partito».
3. **Apertura fase successiva interna** solo dopo stato «rientrato, ok» o equivalente confermato da una persona.

Il preventivo ha già messo la riga «esterni»? Nasce in [software preventivi lavorazioni meccaniche](/blog/software-preventivi-lavorazioni-meccaniche). Qui si esegue quel pezzo del ciclo, non si rinegozia il prezzo.

## Gestionale, ERP ed Excel: chi fa cosa

**ERP / gestionale** (Mago, TeamSystem, Danea, Zucchetti, altri) di solito:

- emette o registra **DDT** con regole fiscali e magazzino;
- tiene **ordini a fornitore** per conto lavoro passivo quando configurato;
- collega **articoli** e **fornitori**;

 spesso **non** offre una **dashboard commessa** con «pezzi presso terzista T da N giorni» pronta per il capo officina.

**Excel o un registro operativo** può ancora essere il posto giusto se:

- legge ordini o export dal gestionale;
- tiene **stati** e **date** che il reparto aggiorna;
- genera **liste uscita** e **solleciti** quando un lotto resta in «presso terzista» troppo a lungo;
- scrive nel gestionale solo dopo **conferma umana** — stesso schema di [ERP e DDT: cosa fa il gestionale](/blog/erp-ddt-cosa-fa-il-gestionale) e di [non collegare agenti in scrittura diretta sull'ERP](/blog/non-collegare-agenti-ai-direttamente-erp).

**Automazione documentale** aiuta sui **PDF in entrata**: propone numero DDT, quantità, fornitore; una persona verifica e aggancia la commessa. Il percorso Frasma sul ciclo passivo è [DDT verso ERP](/servizi/ddt-erp). Non sostituisce la decisione su quale commessa apre la riga esterna: quella resta produzione.

Se in magazzino usate un foglio affiancato al gestionale, il parallelismo è descritto in [gestionale magazzino Excel](/blog/gestionale-magazzino-excel). Sul conto lavoro il rischio è doppio: **quantità fuori sincrono** con il magazzino e **avanzamento commessa** che non si aggiorna.

## Conto lavoro passivo in contabilità vs conto lavoro sul pavimento

In amministrazione «conto lavoro passivo» può significare ordine, registrazione fattura, scarico magazzino WIP. In officina significa **bancale, etichetta, tolleranza al rientro**.

Allineare i due piani senza fondere tutto in un foglio:

- **stesso identificativo commessa** su DDT uscita, DDT rientro e riga del piano produzione;
- **un ruolo che chiude il cerchio** quando contabilità ha registrato il rientro ma produzione non ha ancora messo «ok per fase successiva»;
- **eccezioni visibili**: quantità diversa, pezzi da rifare, seconda uscita.

Quando serve capire **quale programma DDT** usare tra stampa, gestionale e lettura, c'è [programma per DDT: come scegliere](/blog/programma-per-ddt-come-scegliere).

## Questa settimana

Prendete **una commessa** con almeno **un'uscita terzista** negli ultimi trenta giorni. Raccogliete: copia DDT uscita, mail o PDF di rientro, riga nel gestionale (se c'è), riga sul foglio di produzione.

Chiedete al reparto:

- sapevate che i pezzi erano ancora fuori?;
- la data di consegna al cliente aveva tenuto conto del tempo esterno?;
- chi avrebbe dovuto aggiornare lo stato alla ricezione?

Se le tre risposte non puntano allo stesso documento, il primo passo non è un nuovo ERP. È **una tabella commessa** con fasi esterne, stati e date, agganciata ai DDT che già emettete. Poi si decide se quel registro resta Excel collegato all'export o diventa parte di un flusso verso il gestionale.

## FAQ

### Il gestionale non ha il modulo conto lavoro: si può tracciare lo stesso?

Sì, con disciplina sui campi: numero commessa su ogni DDT, registro operativo con stati, persona che conferma il rientro prima di aprire la fase interna successiva. Il modulo nativo accelera la contabilità; non sostituisce la vista che il reparto usa.

### Basta registrare il DDT di rientro in ciclo passivo?

No, se nessuno aggiorna l'avanzamento commessa. Contabilità e produzione possono chiudere il documento in giorni diversi. Serve un aggancio esplicito alla **riga fase esterna** del piano.

### Excel è «sbagliato» per le lavorazioni esterne?

No, finché è **un registro controllato** con commessa, quantità, stato e aggiornamento dopo ogni uscita/rientro — non venti file inviati su WhatsApp. Quando le versioni si moltiplicano, si passa a tabelle condivise o export verso il gestionale, come per magazzino e pianificazione.

### L'intelligenza artificiale può leggere i DDT del terzista e aggiornare la commessa?

Può **proporre** i campi dal PDF e segnalare incongruenze quantità. **Non** deve chiudere fasi o scaricare magazzino senza una persona. Il confine è lo stesso degli altri flussi documentali verso l'ERP.

### Dove entrano i costi del terzista?

Nella guida [costi nascosti per commessa](/blog/costi-nascosti-commessa-officina-metalmeccanica) e nel dettaglio consuntivo in [calcolo costi produzione officina](/blog/software-calcolo-costi-produzione-officina). Questo articolo resta su **tracciamento fisico e avanzamento**.

[Valuta uscite terzista, DDT e avanzamento commessa in manifattura](/manifattura)

---

**Fonti:** Panko, R., *What We Don't Know About Spreadsheet Errors Today: The Facts, Why We Don't Believe Them, and What We Need to Do*, arXiv:1602.02601, EuSpRIG 2015, <https://arxiv.org/abs/1602.02601>. In caso di differenza tra questo articolo e le fonti, prevalgono i testi originali.

**Autore:** Francesco Saverio Mazzi — Frasma