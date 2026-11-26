---
slug: odoo-magazzino-ddt
title: "Odoo magazzino e DDT: ricevimenti, consegne e movimenti senza sostituire l'ERP"
seoTitle: "Odoo magazzino DDT: ricevimenti e consegne in Inventario | Frasma"
seoDescription: "Come il modulo Inventario di Odoo registra ricevimenti e consegne collegati agli ordini, e dove i DDT in entrata e in uscita restano un lavoro di conferma umana prima del carico."
excerpt: "In Odoo i DDT non vivono in un modulo a parte: diventano ricevimenti e ordini di consegna dopo che qualcuno ha validato quantità e abbinamenti all'ordine."
coverImage: /images/blog/cover-odoo-magazzino-ddt.png
publishedAt: "2026-11-26"
updatedAt: "2026-11-26"
tags:
  - ddt
  - erp
  - manifattura
  - automazione-documentale
  - intelligenza-artificiale
status: published
---

Chi cerca **odoo magazzino ddt**, **ddt in entrata odoo** o **odoo inventario ricevimento merce** di solito ha già Odoo in azienda, o lo sta valutando. Il modulo **Inventario** tiene giacenze, ricevimenti e consegne. I DDT, in italiano, sono i documenti di trasporto che accompagnano la merce: in entrata dal fornitore, in uscita verso il cliente.

La confusione arriva subito. Sul banco c'è una bolla cartacea o un PDF. Dentro Odoo ci sono ordini d'acquisto, ordini di vendita, ricevimenti (receipt) e ordini di consegna (delivery). Non è lo stesso schermo. Il DDT non si «carica» come file dentro Inventario e non sostituisce la validazione del ricevimento.

Questa guida collega i due mondi. Spiego cosa fa Inventario secondo la documentazione ufficiale Odoo. Poi dove Frasma entra: lettura del DDT, confronto con l'ordine, eccezioni visibili, conferma umana, import sul tracciato reale senza sostituire il gestionale.

Non è una guida alla [registrazione DDT in entrata](/blog/registrazione-ddt-in-entrata) generica su Mago o TeamSystem: i controlli ci sono lì. Non è il tutorial [DDT da email](/blog/automatizzare-ddt-email-intelligenza-artificiale). Non parlo di produzione o distinte base in Odoo: altri articoli coprono quei moduli. Qui resto su **magazzino**, **ricevimenti**, **consegne** e **movimenti di stock**.

## Cosa fa il modulo Inventario di Odoo, in sintesi

La documentazione Odoo descrive Inventario come tracciamento per **magazzino e ubicazione**, con operazioni strutturate: ricevere, stoccare, spostare, prelevare, consegnare. Ogni operazione validata genera **movimenti di stock** tra ubicazioni (ad esempio da fornitore a stock, da stock a cliente).

Per impostazione predefinita, le spedizioni in entrata e in uscita possono essere gestite in **un solo passaggio**: l'acquisto viene ricevuto direttamente in stock e la consegna passa dallo stock al cliente. È il flusso «one-step» descritto nella guida ufficiale su ricevimenti e consegne in un passaggio.

Se il magazzino lo richiede, si attivano le **rotte multi-step**. Con due passaggi in entrata la merce va prima in un'area di input, poi in stock. In uscita può passare da stock a un'area di output prima della consegna al cliente. Con tre passaggi in uscita si aggiunge una fase di packing. Le opzioni si scelgono sulla configurazione del magazzino, non creando regole manuali duplicate, come avverte la documentazione sulle rotte standard.

Il punto utile per chi arriva dal DDT: in Odoo il ricevimento nasce dall'**ordine d'acquisto confermato** (pulsante Receipt nella PO), e la consegna dall'**ordine di vendita confermato** (pulsante Delivery nella SO). Validare il ricevimento o l'ordine di consegna aggiorna le quantità ricevute o consegnate sulle righe ordine e chiude il movimento in stato Done.

Il modulo non legge da solo il PDF del fornitore. Il legame con il documento di trasporto cartaceo o email lo costruite voi, contando e confermando prima di premere Validate.

## DDT in entrata e ricevimento merce in Odoo

Nel ciclo passivo il fornitore lascia un DDT. In officina qualcuno controlla colli e quantità. In Odoo, parallelamente, esiste un ricevimento legato alla purchase order.

Secondo la documentazione ufficiale, il percorso tipico è:

1. creare e confermare un ordine d'acquisto verso il fornitore;
2. aprire il **ricevimento** (operazione di tipo receipt, spesso etichettata WH/IN) dal smart button sulla PO;
3. inserire o confermare le **quantità ricevute** sulle righe;
4. cliccare **Validate** per portare il ricevimento in Done e aggiornare la colonna Received sulla PO.

Se il magazzino è configurato in due passaggi, dopo il primo validate la merce è nell'ubicazione di input, non ancora disponibile in stock come da documentazione two-step. Serve un **trasferimento interno** verso stock. Stessa logica se avete controllo qualità in tre passaggi: più operazioni, stessa idea. Una validazione alla volta.

Il DDT cartaceo parla con codici e layout del fornitore. La PO parla con i **vostri** prodotti e unità di misura. Il gap è lo stesso di ogni ERP: mappare righe, gestire consegne parziali, segnalare differenze tra quantità sul documento e quantità contate. La checklist processuale sta in [registrazione DDT in entrata](/blog/registrazione-ddt-in-entrata). Qui il riferimento è **dove** atterrano quei numeri in Odoo: sul ricevimento, prima del validate.

### Differenze di quantità: eccezione visibile, non riga nascosta

Quando il DDT dice 100 e in magazzino ne contate 96, succede una di queste cose, a processo deciso:

- si valida il ricevimento per 96 e si apre un discorso con acquisti sul residuo;
- si trattiene il carico in un deposito di controllo se il magazzino lo prevede nella configurazione;
- si blocca la validazione finché non c'è una decisione.

In ogni caso, la differenza deve restare **visibile** tra documento, conteggio e schermata Odoo. Completare il ricevimento con la quantità del PDF senza aver contato sposta l'errore dentro Inventario. A inventario fisico il gestionale e gli scaffali non tornano.

[Prenota 30 minuti di analisi del processo con Frasma](/manifattura)

## DDT in uscita e ordini di consegna in Odoo

In uscita il DDT descrive ciò che esce verso il cliente. In Odoo la spedizione passa dall'ordine di vendita confermato.

In un flusso a un passaggio, la documentazione descrive un ordine di consegna che sposta la merce dallo **stock** alla **ubicazione cliente** alla validazione. In due o tre passaggi compaiono prima il prelievo (pick), eventualmente il packing, poi il delivery order verso il cliente.

Anche qui Validate è il momento in cui il sistema registra il movimento. Il banco spedizioni può aggiungere colli, pesi o etichette che il documento cartaceo mostra ma che le righe SO non avevano ancora. Se si valida prima di controllare il camion, giacenza e bolla cliente divergono. La mappa generica entrata e uscita sta in [ERP e DDT: cosa fa il gestionale](/blog/erp-ddt-cosa-fa-il-gestionale).

Per conto lavoro e pezzi al terzista il DDT ha altre regole: vedi [lavorazione esterna officina su commessa](/blog/lavorazione-esterna-officina-su-commessa). Il modulo Inventario registra i movimenti che decidete; non sostituisce il registro Excel se usate ancora un foglio parallelo. Su quello: [gestionale magazzino Excel](/blog/gestionale-magazzino-excel).

## Dove Frasma si collega, senza sostituire Odoo

Frasma non sostituisce Odoo. L'export verso Odoo, come verso Mago, TeamSystem, Zucchetti o altri gestionali già in uso, si definisce sul **tracciato reale** del cliente: campi, formati e regole che il vostro ambiente accetta.

Il flusso che descriviamo sul sito, in [DDT verso ERP](/servizi/ddt-erp), resta lo stesso anche quando l'ERP è Odoo:

1. il DDT arriva da email o PDF;
2. il sistema **legge** testata e righe e segnala i campi incerti, come nella guida alla [lettura automatica dei DDT](/blog/lettura-automatica-ddt);
3. propone l'**abbinamento** alle righe dell'ordine aperto in Odoo (fornitore o cliente), non a memoria;
4. mette in evidenza **differenze di quantità** e codici non mappati come eccezioni, non come valori definitivi;
5. una **persona conferma**;
6. solo dopo arriva la **registrazione** nel gestionale, come import tracciato o come dati pronti per il ricevimento o la consegna che il team valida in Odoo.

Non colleghiamo un agente AI direttamente all'API di Odoo senza quel passaggio. La ragione è la stessa di [non collegare gli agenti AI direttamente all'ERP](/blog/non-collegare-agenti-ai-direttamente-erp): il movimento di magazzino deve restare reversibile e auditable finché qualcuno non ha controllato fisica e documento.

Non racconto integrazioni già finite né casi con numeri inventati. Ogni officina ha layout DDT diversi, regole diverse su chi chiude l'ordine, depositi diversi. La discovery parte da un campione di bolle reali e dalle schermate Odoo che usate oggi.

## Cosa chiedere prima di automatizzare verso Odoo Inventario

Prima di parlare di lettura automatica, conviene essere chiari su quattro punti interni:

| Domanda | Perché conta per Odoo |
| --- | --- |
| Gli ordini d'acquisto e di vendita sono davvero aperti in Odoo prima del DDT? | Senza PO/SO confermati, receipt e delivery non hanno un aggancio pulito. |
| Il magazzino è in 1, 2 o 3 passaggi? | Cambia quante operazioni validate tra bolla sul banco e merce in stock o sul camion. |
| Chi conta e chi valida sono la stessa persona? | Se no, serve uno stato condiviso tra documento, conteggio e schermata Inventario. |
| I codici fornitore sono mappati sui prodotti Odoo? | Altrimenti ogni bolla riparte dalla ricerca manuale, import o meno. |

Se il collo è «mappiamo i campi del PDF sul ricevimento», il percorso comincia da [programma per DDT: come scegliere](/blog/programma-per-ddt-come-scegliere) tra stampa, gestionale e lettura automatica.

## Da dove partire questa settimana

Senza cambiare Odoo:

1. prendere **un DDT in entrata** e **uno in uscita** ancora aperti;
2. aprire la PO o la SO e il receipt/delivery collegato;
3. scrivere su carta cosa deve coincidere tra bolla, conteggio e quantità Demand/Quantity sulle righe;
4. segnare un'eccezione reale (codice, unità, parziale) e dove oggi si perde;
5. decidere cosa deve restare umano prima di ogni Validate.

Se il collo è sul passivo con molti PDF, il passo successivo operativo è [DDT verso ERP](/servizi/ddt-erp), sempre con conferma umana sulle eccezioni.

[Prenota 30 minuti di analisi del processo con Frasma](/manifattura)

## FAQ

### Odoo ha un modulo DDT italiano dentro Inventario?

La documentazione ufficiale di Inventario parla di ricevimenti, consegne e movimenti tra ubicazioni, non di un modulo autonomo «DDT Italia». In azienda il documento di trasporto resta l'obbligo e il riferimento cartaceo o digitale che accompagna la merce; in Odoo il carico o lo scarico passa dalla validazione delle operazioni di magazzino legate agli ordini. Eventuali localizzazioni contabili o di stampa documenti vanno verificate nel vostro database e nella vostra versione, non inventate qui.

### Posso registrare un ricevimento in Odoo solo dal PDF del fornitore?

Non in automatico, secondo il modello descritto nella documentazione: si conferma la PO, si apre il receipt, si indicano le quantità ricevute, si valida. Il PDF serve al controllo fuori dal sistema o in un flusso di preparazione dati che poi una persona approva. È lo stesso confine degli altri ERP spiegato in [lettura automatica dei DDT](/blog/lettura-automatica-ddt).

### Frasma installa o personalizza Odoo?

No. Prepariamo dati da documenti e definiamo l'import sul tracciato che avete già. Odoo resta il sistema di magazzino e ordini; Frasma lavora sul pezzo documento, conferma, eccezioni.

### Entrata a due passaggi: il DDT basta per chiudere il carico?

Il DDT indica cosa il fornitore dichiara di aver spedito. Il carico in stock, in due passaggi, chiede receipt su input più trasferimento interno verso stock, come da documentazione Odoo. Due momenti, due validate. Un solo PDF non sostituisce il conteggio in entrambi se il processo li separa.

### Devo migrare da Excel prima di collegare i DDT a Odoo?

Non per forza. L'Excel può restare registro di lavoro finché una persona conferma e il movimento ufficiale finisce in Odoo. Quando il foglio diventa una seconda giacenza, il problema è di processo, non solo di software. Vedi [gestionale magazzino Excel](/blog/gestionale-magazzino-excel).

---

**Fonti (documentazione ufficiale Odoo):**

- [One-step receipt and delivery](https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/inventory/shipping_receiving/daily_operations/receipts_delivery_one_step.html) (ricevimento da PO, consegna da SO, Validate, quantità Received/Delivered).
- [Two-step receipt and delivery](https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/inventory/shipping_receiving/daily_operations/receipts_delivery_two_steps.html) (flussi input/stock e pick/output/delivery).
- [Routes and push/pull rules](https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/inventory/shipping_receiving/daily_operations/use_routes.html) (rotte standard 1/2/3 passaggi, ubicazioni WH/Stock, WH/Input, WH/Output).
- [Operation types](https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/inventory/warehouses_storage/inventory_management/operation_type.html) (operazioni e movimenti di stock).

In caso di differenza tra questo articolo e la documentazione Odoo aggiornata, prevale la documentazione sul sito odoo.com.

**Autore:** Francesco Saverio Mazzi, Frasma