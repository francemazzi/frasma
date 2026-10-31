---
slug: registrazione-ddt-in-entrata
title: "Registrazione DDT in entrata: controlli, abbinamento all'ordine e differenze di quantità"
seoTitle: "Registrazione DDT in entrata nel gestionale: guida pratica | Frasma"
seoDescription: "Come registrare i DDT dei fornitori nell'ERP: controlli, abbinamento all'ordine, differenze di quantità, errori comuni e quando automatizzare."
excerpt: "Registrare un DDT in entrata non è ricopiarlo: è decidere cosa è arrivato, a fronte di quale ordine e in che quantità, prima che diventi magazzino."
publishedAt: "2026-10-31"
updatedAt: "2026-10-31"
tags:
  - ddt
  - erp
  - manifattura
  - automazione-documentale
  - intelligenza-artificiale
status: published
---

Chi cerca **registrazione DDT in entrata** di solito sta in uno di due posti. In magazzino, con il camion appena ripartito e una bolla in mano. Oppure in ufficio acquisti, con i PDF dei fornitori da caricare nel gestionale prima di sera.

Il gesto sembra lo stesso: prendere il Documento di Trasporto del fornitore e inserirlo nell'ERP. In realtà, in quel momento si decidono tre cose: **cosa è arrivato**, **a fronte di quale ordine**, **in che quantità e in che stato**. Se una delle tre è sbagliata, l'errore non resta sul foglio. Diventa giacenza, ordine aperto che non si chiude, fattura del fornitore che non torna.

Questa guida è sul processo di registrazione: i controlli, l'abbinamento all'ordine, le differenze di quantità, gli errori più comuni e quando ha senso automatizzare. Non parla di come prendere i PDF dalla posta e leggerli: quello sta nel tutorial su [come automatizzare i DDT ricevuti via email](/blog/automatizzare-ddt-email-intelligenza-artificiale) e nella guida alla [lettura automatica dei DDT](/blog/lettura-automatica-ddt). Qui il documento è già sul tavolo. Il problema è registrarlo bene.

## Cosa vuol dire registrare un DDT in entrata

Nel gestionale, la registrazione di un DDT fornitore produce di solito tre effetti:

1. un **movimento di carico** a magazzino, o in un deposito di controllo se la merce va collaudata;
2. l'**evasione**, totale o parziale, delle righe dell'ordine fornitore;
3. un **riferimento** che servirà quando arriva la fattura del fornitore.

Il terzo punto si dimentica spesso. Quando il fornitore emette fattura differita, la fattura richiama data e numero dei documenti di trasporto a cui si riferisce: è il collegamento descritto nella Circolare 225/E del 1996, quella che accompagnò il passaggio dalla bolla di accompagnamento al DDT. Se il DDT è stato registrato con il numero sbagliato, o due volte, il controllo della fattura parte già storto.

La stessa circolare chiarisce un punto che spiega metà dei problemi in accettazione: il documento di trasporto è **in forma libera**, senza vincoli di forma, dimensioni o tracciato. Deve riportare data, dati di chi cede, di chi riceve e dell'eventuale vettore, la descrizione di natura, qualità e quantità dei beni, e va numerato progressivamente. Tutto il resto — il codice articolo, il riferimento al vostro ordine, il lotto, il prezzo — c'è se il fornitore lo mette. Per questo ogni fornitore ha una bolla diversa. E per questo, a volte, il numero d'ordine non c'è.

## Prima di registrare: i controlli sul documento

Prima di toccare le righe si guarda la testata. Sono controlli rapidi, ma sono quelli che evitano gli errori più faticosi da sistemare dopo.

| Controllo | Cosa guardare | Se non torna |
| --- | --- | --- |
| Fornitore | Ragione sociale e Partita IVA coincidono con l'anagrafica | Non si crea un fornitore nuovo al volo: si chiede a chi gestisce l'anagrafica |
| Numero e data | La combinazione fornitore + numero + data non è già registrata | Probabile copia (PDF in email più cartaceo, o reinvio): ci si ferma |
| Destinatario e sede | La merce è per questo stabilimento o magazzino | Si segnala, non si carica nel deposito sbagliato |
| Causale del trasporto | Vendita, conto lavorazione, conto visione, reso, sostituzione | Un rientro da conto lavoro non è un acquisto: va registrato con la causale giusta |
| Riferimento ordine | Il vostro numero d'ordine, se c'è | Se manca, si cerca tra gli ordini aperti di quel fornitore (sotto) |
| Colli e imballo | Numero colli e stato dell'imballo alla consegna | Colli danneggiati o mancanti si annotano quando il vettore è ancora lì, non il giorno dopo |

Il controllo sui duplicati merita due righe in più. Lo stesso DDT può arrivare in PDF via email, in cartaceo con la merce e magari di nuovo allegato alla fattura. Se la registrazione parte da canali diversi senza una chiave unica, prima o poi lo stesso carico entra due volte.

## Il controllo sulla merce: contare prima di registrare

Il DDT dice cosa il fornitore *dichiara* di aver spedito. Non dice cosa è sceso dal camion.

Per questo, in una registrazione fatta bene, le quantità sono tre e restano distinte:

- **quantità ordinata**, sulla riga dell'ordine fornitore;
- **quantità dichiarata**, sul DDT;
- **quantità ricevuta**, contata o pesata in accettazione.

Il problema nasce quando una delle tre viene sovrascritta per far tornare le altre. Si carica la quantità del DDT senza aver contato. Oppure si «aggiusta» il carico perché l'ordine diceva un'altra cifra. In entrambi i casi la differenza sparisce dal gestionale, ma resta sullo scaffale.

Quale quantità caricare — la dichiarata o la ricevuta — è una regola aziendale, e va scritta. Quello che non funziona è che ognuno faccia a modo suo. Se magazzino e acquisti seguono due regole diverse, se ne accorge l'inventario.

Poi c'è la merce da collaudare. Se un articolo richiede un controllo qualità in accettazione, la registrazione può metterlo in uno stato bloccato o in un deposito di controllo, prima di renderlo disponibile alla produzione. Come si fa dipende dal gestionale. Il principio no: **arrivato** e **utilizzabile** non sono la stessa cosa.

## Abbinare il DDT all'ordine fornitore

È il passaggio che chiede più testa. Il DDT parla la lingua del fornitore. L'ordine parla la vostra.

### Codici articolo: quello del fornitore e il vostro

Il fornitore scrive il suo codice, a volte solo una descrizione. Il gestionale lavora con il vostro codice interno. Serve una corrispondenza, e di solito l'ERP ha un posto per tenerla: il codice fornitore sull'articolo o sul listino d'acquisto. Se quella tabella è vuota o vecchia, ogni registrazione diventa una ricerca a memoria. E la memoria, il venerdì pomeriggio, sbaglia.

### Unità di misura

Il fornitore vende a chili, voi gestite a pezzi. Lui spedisce barre, voi caricate metri. Lui scrive «1 conf.», voi avete in anagrafica il singolo pezzo. Se il fattore di conversione non è definito sull'articolo, la quantità giusta finisce caricata nell'unità sbagliata. E sembra corretta finché qualcuno non va a prelevare.

### Riferimento ordine assente o sbagliato

Quando il DDT non riporta il vostro numero d'ordine, si cerca tra gli ordini aperti dello stesso fornitore, per articolo e quantità residua. Se ci sono più ordini aperti sullo stesso articolo, la scelta non si fa a caso. La regola può essere «si evade il più vecchio» oppure «si segue la commessa scritta sul documento»: conta che sia decisa una volta, non ogni mattina da chi è di turno.

### Un DDT, più ordini. Un ordine, più DDT

Le consegne parziali sono normali. Un ordine può essere evaso da più spedizioni. Un DDT può portare righe di ordini diversi. L'abbinamento si fa **riga per riga**, non documento per documento. Chi abbina solo a livello di testata chiude ordini che non sono finiti, o lascia aperti ordini già evasi.

## Differenze di quantità: cosa registrare e chi decide

Le differenze non sono un incidente. Sono parte del lavoro. Il punto non è evitarle, è registrarle in modo che qualcuno le veda e le chiuda.

| Situazione | Cosa si registra | Chi decide il seguito |
| --- | --- | --- |
| Ricevuto meno di quanto dichiarato sul DDT | La quantità ricevuta, con la differenza segnata | Acquisti: reclamo, nota di credito o attesa del resto |
| Ricevuto più di quanto dichiarato | Niente, finché non si capisce se è un errore di spedizione | Acquisti con il fornitore: reso o regolarizzazione |
| DDT corretto, ma inferiore all'ordinato | Consegna parziale: la riga d'ordine resta aperta per il residuo | Acquisti: saldo atteso o chiusura a saldo motivata |
| DDT superiore all'ordinato | Eccedenza: l'ordine non si allarga in silenzio | Acquisti: accettare, rendere o tenere in sospeso |
| Unità di misura diversa | La quantità convertita, con il fattore usato | Chi gestisce l'anagrafica articoli, se il fattore manca |
| Merce non conforme o danneggiata | Carico in stato bloccato o non conformità aperta | Qualità e acquisti |

Due cose da non fare:

- **chiudere a saldo** una riga d'ordine solo perché il DDT «sembra l'ultimo»: il residuo sparisce e nessuno lo sollecita più;
- **correggere la quantità** per allinearla all'ordine: la differenza deve restare visibile finché qualcuno non la chiude, con un motivo.

Se in accettazione queste decisioni oggi vivono in una mail, su un post-it o nella testa di una sola persona, il primo passo è dare loro uno stato nel processo. È da lì che parto con le aziende manifatturiere: dal flusso reale tra magazzino, acquisti e gestionale, non da un software da installare.

[Scopri come lavoro con le PMI manifatturiere](/manifattura)

## Errori comuni nella registrazione dei DDT in entrata

Sono errori prevedibili. Raramente sono disattenzione: più spesso il processo non ha previsto il caso.

1. **Stesso DDT registrato due volte.** Arriva in PDF e in cartaceo, due persone lo caricano. Manca un controllo sulla chiave fornitore + numero + data.
2. **Fornitore sbagliato.** Due ragioni sociali simili, o due sedi dello stesso gruppo con anagrafiche diverse. Il carico va su un fornitore, la fattura arriva dall'altro.
3. **Riga d'ordine chiusa a saldo con una consegna parziale.** Il residuo non viene più sollecitato. Ci si accorge quando la produzione resta senza materiale.
4. **Unità di misura ignorata.** Chili caricati come pezzi, metri come barre. La giacenza è un numero, ma non quello giusto.
5. **Causale sbagliata.** Un rientro da conto lavoro registrato come acquisto, o merce in conto visione caricata come se fosse vostra.
6. **Registrazione in ritardo.** La merce è sullo scaffale, il gestionale non lo sa. Nel frattempo qualcuno riordina, o la produzione vede una mancanza che non c'è.
7. **Lotti non registrati.** Dove il lotto conta, scriverlo «dopo» vuol dire non scriverlo. In una contestazione non si sa più da quale consegna veniva il pezzo.
8. **Nessun legame con il documento.** La registrazione esiste, il PDF o la bolla firmata stanno in un'altra cartella. Quando arriva la fattura o un reclamo, si ricostruisce tutto a mano.

Quasi tutti questi errori si vedono a valle: nel controllo fattura, nell'inventario, in un fermo di produzione. Conviene intercettarli nel momento della registrazione, quando il documento è ancora sul tavolo e la merce è ancora in baia.

## Magazzino e ufficio acquisti: chi fa cosa

La registrazione dei DDT in entrata attraversa più uffici, e di solito si inceppa nel passaggio.

- **Magazzino** riceve, conta, controlla l'imballo, firma il documento del vettore, segnala le differenze.
- **Ufficio acquisti** abbina all'ordine, gestisce le differenze con il fornitore, decide saldi ed eccedenze.
- **Amministrazione** usa la registrazione per controllare la fattura del fornitore.

Tra questi ruoli serve uno **stato del DDT** che tutti vedono: ricevuto, controllato, registrato, con differenze aperte, chiuso. Un foglio Excel va bene come registro di lavoro, purché sia uno solo e non diventi il magazzino — il discorso è quello del [gestionale magazzino su Excel](/blog/gestionale-magazzino-excel). Se lo stato vive nelle email, non è uno stato. È una caccia.

## Quando conviene automatizzare la registrazione, e cosa resta umano

Non sempre. Automatizzare un processo confuso produce errori più in fretta.

Conviene pensarci quando:

- i DDT arrivano soprattutto come PDF via email, da molti fornitori con layout diversi;
- le righe per documento sono tante e la digitazione occupa una parte riconoscibile della giornata;
- gli ordini fornitore sono già nel gestionale, con righe e quantità residue affidabili;
- la registrazione si accumula e il gestionale resta sistematicamente indietro rispetto al magazzino.

Conviene aspettare quando:

- i DDT sono pochi e chi li registra conosce già ogni fornitore;
- gli ordini non sono a sistema, oppure ci sono ma nessuno li evade;
- le anagrafiche di articoli e fornitori sono sporche: codici doppi, conversioni mancanti. Prima si sistemano quelle.

Quando conviene, l'automazione utile non «registra al posto vostro». **Prepara** la registrazione:

1. legge il DDT ed estrae testata e righe — è la parte descritta nella guida alla [lettura automatica dei DDT](/blog/lettura-automatica-ddt);
2. controlla i duplicati sulla chiave fornitore + numero + data;
3. propone l'abbinamento di ogni riga a una riga d'ordine aperta, con codice interno e unità di misura convertita;
4. mette in evidenza le differenze tra ordinato e dichiarato, e i campi che non è riuscita a leggere;
5. lascia a una persona la **conferma**, riga per riga dove serve;
6. solo dopo prepara l'import nel gestionale già in uso, sul tracciato che quel gestionale accetta.

Resta umano tutto quello che è una decisione: accettare un'eccedenza, chiudere a saldo, aprire una non conformità, scegliere tra due ordini aperti, chiamare il fornitore. E resta umano il conteggio fisico: nessun PDF sa cosa è sceso dal camion.

È la stessa regola di [non collegare gli agenti AI direttamente all'ERP](/blog/non-collegare-agenti-ai-direttamente-erp): l'AI prepara, una persona conferma, poi arriva un import tracciato. Il percorso operativo, dai DDT dei fornitori al gestionale, è in [DDT verso ERP](/servizi/ddt-erp). Lo stesso schema applicato a fatture, DDT e schede tecniche è raccontato nel caso [Documenti ERP e preventivi manifatturieri](/casi/documenti-erp-manifattura). Se volete vedere il primo pezzo del flusso — email, PDF, registro di controllo — c'è il [tutorial sui DDT da email](/blog/automatizzare-ddt-email-intelligenza-artificiale).

## Checklist per registrare un DDT in entrata

Da tenere vicino al terminale del magazzino, o da trasformare negli stati del vostro flusso:

- fornitore riconosciuto in anagrafica, Partita IVA coerente;
- numero e data non già registrati per quel fornitore;
- causale del trasporto corretta;
- colli e imballo controllati alla consegna;
- quantità ricevuta contata, tenuta distinta da quella dichiarata;
- ogni riga abbinata a una riga d'ordine aperta, o segnalata come «senza ordine»;
- codice interno e unità di misura verificati;
- differenze registrate con un motivo e un responsabile;
- lotto registrato, dove serve;
- documento (PDF o bolla firmata) collegato alla registrazione.

## FAQ

### Che differenza c'è tra registrare il DDT e registrare la fattura del fornitore?

Il DDT registra il movimento della merce: cosa è entrato in magazzino e quale ordine ha evaso. La fattura registra il debito verso il fornitore. Sono due momenti diversi, spesso in giorni diversi. Una registrazione corretta del DDT è ciò che permette, dopo, di controllare la fattura.

### Si carica la quantità scritta sul DDT o quella contata?

Lo decide l'azienda, e la regola va scritta. L'importante è che le tre quantità — ordinata, dichiarata, ricevuta — restino distinte e che la differenza resti visibile, invece di sparire correggendo un numero.

### Cosa si fa se il DDT non riporta il numero d'ordine?

Si cerca tra gli ordini aperti di quel fornitore, per articolo e quantità residua. Se gli ordini possibili sono più di uno, si segue una regola decisa prima, per esempio l'ordine più vecchio o quello della commessa indicata. Se nessun ordine torna, la riga resta in sospeso e passa all'ufficio acquisti.

### Si può automatizzare la registrazione dei DDT in entrata senza cambiare gestionale?

Sì. L'automazione lavora intorno al gestionale: legge il documento, propone l'abbinamento all'ordine, mette in evidenza le differenze. Una persona conferma, poi si importa nell'ERP già in uso. Non serve sostituire Mago, TeamSystem o il gestionale attuale.

### Da dove si parte, in pratica?

Da un campione di DDT reali, compresi quelli difficili, e dalle regole che oggi vivono a voce: quale quantità si carica, come si sceglie l'ordine, chi chiude le differenze. Una volta scritte, si vede quale parte della registrazione conviene preparare in automatico e quale deve restare a una persona.

Se in accettazione la registrazione dei DDT è ancora un lavoro di memoria — chi sa quale ordine, chi sa quale conversione — si può partire da lì: regole scritte, una persona che conferma, un gestionale che riceve dati già controllati.

[Parliamo del vostro processo di accettazione](/manifattura)

---

**Fonti:** Ministero delle finanze, Dipartimento delle entrate, *Circolare n. 225/E del 16 settembre 1996*, sul D.P.R. 14 agosto 1996, n. 472 (soppressione della bolla di accompagnamento e documento di trasporto), testo consultabile su <https://www.edizionieuropee.it/LAW/HTML/71/zn98_01_036323.html>. In caso di differenza tra questo articolo e il testo originale, prevale il testo originale.

**Autore:** Francesco Saverio Mazzi — Frasma
