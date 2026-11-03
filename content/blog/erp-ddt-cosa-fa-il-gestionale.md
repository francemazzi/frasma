---
slug: erp-ddt-cosa-fa-il-gestionale
title: "ERP e DDT: cosa fa il gestionale, cosa resta manuale e dove si perde tempo"
seoTitle: "ERP DDT: collegamento tra gestionale e documenti di trasporto | Frasma"
seoDescription: "ERP e DDT in entrata e in uscita: cosa registra il gestionale, cosa resta manuale in magazzino, dove si perde tempo e quando automatizzare con conferma umana."
excerpt: "Il gestionale non «fa» il DDT: collega movimenti, ordini e fatture. Qui la mappa di entrata e uscita, del lavoro manuale e del tempo che si può togliere senza scrivere al posto vostro."
coverImage: /images/blog/cover-erp-ddt-cosa-fa-il-gestionale.png
publishedAt: "2026-11-03"
updatedAt: "2026-11-03"
tags:
  - ddt
  - erp
  - manifattura
  - automazione-documentale
  - intelligenza-artificiale
status: published
---

Chi cerca **ERP DDT**, **DDT ERP**, **gestionale DDT** o **software gestionale DDT** di solito non sta chiedendo un nuovo programma. Sta chiedendo se Mago, TeamSystem, Zucchetti, eSolver, FullWORK o il gestionale già in azienda «parla» con i Documenti di Trasporto — quelli che arrivano dai fornitori e quelli che mandate ai clienti.

La risposta breve: l'ERP **non sostituisce** la bolla. Registra **effetti** che il DDT descrive: merce entrata o uscita, ordine evaso o aperto, riferimento per la fattura. Tutto il resto — contare i colli, decidere su una differenza, mappare il codice del fornitore sul vostro — resta sul tavolo, spesso a mano.

Questa guida è la **mappa**. Non spiega passo passo come registrare un DDT in entrata: quello sta in [registrazione DDT in entrata](/blog/registrazione-ddt-in-entrata). Non è un tutorial su email e Excel: quello sta in [automatizzare i DDT da email](/blog/automatizzare-ddt-email-intelligenza-artificiale). Non è il percorso commerciale di lettura e import: quello resta in [DDT verso ERP](/servizi/ddt-erp). Qui si capisce **dove** il gestionale entra nel ciclo, **cosa** resta umano e **dove** il tempo si consuma senza che nessuno lo misuri.

## DDT in entrata e in uscita: due facce dello stesso gestionale

In manifattura il Documento di Trasporto compare in due direzioni.

**In entrata (ciclo passivo)** il fornitore consegna merce e lascia una bolla. Voi dovete dire al gestionale: cosa è arrivato, a fronte di quale ordine, in che quantità, in quale deposito. Il DDT è in forma libera — layout, codici e riferimenti ordine dipendono da chi lo stampa. Il gestionale, invece, lavora con **i vostri** codici, unità di misura e ordini già aperti.

**In uscita (ciclo attivo)** spedite al cliente. Il DDT (o la bolla di accompagnamento collegata alla fattura) descrive cosa esce dal magazzino. L'ERP deve allineare **prelievo**, **giacenza**, **ordine cliente** e, quando serve, **lotto** o **matricola**. Spesso il documento lo stampa il gestionale; a volte lo completa qualcuno al banco spedizioni con etichette e pesi che il sistema non ha ancora.

Stesso software, due flussi. Confonderli è uno dei modi più rapidi per perdere tempo: chi cerca «DDT ERP» pensando solo agli acquisti dimentica che metà delle bolle esce dal vostro magazzino verso la produzione o il cliente.

## Cosa fa l'ERP con un DDT, in pratica

Il gestionale non «legge» il PDF. Fa operazioni controllate quando **qualcuno** (o un import tracciato, dopo conferma) gli passa i dati giusti.

### Sul passivo: dal DDT del fornitore al magazzino

Di solito, quando un DDT in entrata è registrato correttamente, l'ERP:

1. crea un **movimento di carico** (o mette la merce in un deposito di controllo, se serve collaudo);
2. **evade**, in tutto o in parte, le righe dell'ordine fornitore;
3. lascia un **riferimento** che servirà quando arriva la fattura del fornitore — collegamento che la normativa ha sempre distinto tra documento di trasporto e fattura.

Se manca uno di questi tre effetti, il problema non è «il PDF non si apre». È che magazzino, acquisti e amministrazione stanno guardando numeri diversi.

### Sul attivo: dall'ordine cliente al DDT in uscita

In uscita il gestionale fa il percorso inverso, ma con la stessa logica:

1. **scala** la giacenza (o prenota) in base a quanto spedite;
2. **evade** l'ordine cliente, totale o parziale;
3. **genera o registra** il documento di trasporto con numerazione progressiva e dati anagrafici obbligatori;
4. quando il processo lo prevede, aggancia **lotti**, **matricole** o **commessa**.

Qui l'ERP è spesso **fonte** del documento. Il lavoro manuale sta nel verificare che ciò che è sul camion coincida con ciò che il sistema ha scaricato.

### Cosa l'ERP non fa da solo

Nessun gestionale, da solo:

- **conta** i colli scesi dal camion;
- **decide** se accettare un'eccedenza o aprire una non conformità;
- **sceglie** tra due ordini aperti quando il fornitore non ha scritto il vostro numero d'ordine;
- **converte** automaticamente, senza regole, kg in pezzi o «conf.» in unità di magazzino;
- **sostituisce** una anagrafica articoli pulita quando i codici fornitore non sono mappati.

Sono decisioni e controlli fisici. Il software registra **dopo** che qualcuno ha chiuso il dubbio.

## Dove si perde tempo (e non sempre dove pensate)

Il collo di bottiglia non è sempre «Mago è lento». Spesso è **intorno** al gestionale.

| Punto | Cosa succede | Perché costa |
| --- | --- | --- |
| Ingresso documenti | Stesso DDT in email, cartaceo e allegato fattura | Duplicati e registrazioni doppie |
| Digitazione testata | Numero, data, fornitore ricopiati a mano | Errori di trascrizione, indietro rispetto al magazzino |
| Righe e codici | Codice fornitore ≠ codice interno | Ricerca a memoria, righe sbagliate |
| Abbinamento ordine | Riferimento ordine assente o errato | Ordini che non si chiudono, giacenze «fantasma» |
| Quantità | Si carica il DDT senza aver contato | Differenze che esplodono a inventario |
| Uscita | Prelievo fatto, bolla completata dopo | Sistema e camion non allineati |
| Canali paralleli | Excel «registro del giorno» + ERP | Due verità, riconciliazione a fine settimana |

Molte officine misurano il tempo **solo** sulla maschera del gestionale. Il tempo vero include aprire la mail, cercare l'ordine, chiamare il magazzino, correggere un codice. Quella parte è candidata a **preparazione automatica** — non a sostituire chi decide.

[Prenota 30 minuti di analisi del processo con Frasma](/manifattura)

## Cosa conviene tenere manuale (e cosa no)

**Resta manuale**, e deve restarlo:

- il **conteggio fisico** in accettazione e, dove serve, in spedizione;
- le **decisioni** su differenze, resi, conto lavoro, conto visione;
- la **conferma** prima che un movimento diventi giacenza ufficiale;
- la **gestione anagrafica**: creare un fornitore nuovo al volo per chiudere in fretta è un errore che paga interessi.

**Si può preparare in automatico**, con una persona che conferma:

- estrazione di testata e righe da PDF o email — come nella guida alla [lettura automatica dei DDT](/blog/lettura-automatica-ddt);
- controllo duplicati su fornitore + numero + data;
- proposta di abbinamento ordine–riga, con codice interno e unità già convertita dove le regole ci sono;
- evidenza dei campi illeggibili o incoerenti, senza completarli a sentimento.

È lo stesso schema del tutorial [DDT da email verso Excel](/blog/automatizzare-ddt-email-intelligenza-artificiale) e del caso [Documenti ERP e preventivi manifatturieri](/casi/documenti-erp-manifattura): documento → campi controllabili → persona → import tracciato. Il perché tecnico del confine con il gestionale sta in [non collegare gli agenti AI direttamente all'ERP](/blog/non-collegare-agenti-ai-direttamente-erp).

Automatizzare **senza** approvazione umana non accorcia il processo: sposta l'errore dentro magazzino e in fattura, più in fretta.

## Quando ha senso parlare di «software gestionale DDT»

Ha senso quando:

- i volumi di bolle in entrata (o in uscita, se il collo è lì) sono abbastanza da occupare una fetta riconoscibile della giornata;
- ordini e anagrafiche in ERP sono **usati sul serio** — altrimenti l'automazione propone abbinamenti inesistenti;
- lo stesso errore si ripete: codici, unità, duplicati, ordini non evasi;
- volete **misurare** prima di comprare un modulo o un progetto: campione di DDT reali, tempi, eccezioni.

Ha **meno** senso quando:

- i documenti sono pochi e chi li registra conosce ogni fornitore;
- il problema vero è l'anagrafica sporca o gli ordini mai chiusi — prima si sistema il processo, poi lo si accelera;
- cercate un gestionale nuovo «con l'AI dentro» in sostituzione di Mago o TeamSystem. Il punto di partenza resta l'ERP già in azienda.

Il passo successivo operativo — lettura, eccezioni, tracciato di import — è descritto nel servizio [DDT verso ERP](/servizi/ddt-erp), senza ripetere qui listini o perimetri di progetto.

## DDT in uscita: il pezzo che le guide sul passivo dimenticano

Chi lavora solo sul ciclo passivo a volte scopre che il magazzino perde tempo **sull'uscita**:

- ordine evaso a sistema ma picking incompleto;
- colli aggiunti a mano sulla bolla senza aggiornare le righe;
- lotti obbligatori per il cliente non registrati al momento del carico;
- DDT corretto ma fattura emessa su quantità diverse.

Anche qui l'ERP fa movimenti e riferimenti; la persona al banco chiude il gap tra **scaffale** e **documento**. Automatizzare l'uscita ha senso solo se entrata e anagrafica sono stabili — altrimenti si moltiplicano le eccezioni in entrambe le direzioni.

## Da dove partire, questa settimana

Senza cambiare gestionale:

1. **Separate entrata e uscita** sul foglio del team: dove nasce il ritardo?
2. **Segnate cinque DDT reali** per direzione — quelli «facili» e uno storto ciascuno.
3. **Scrivete cosa fa l'ERP oggi** per ciascuno (carico, evasione ordine, riferimento fattura / scarico, bolla cliente).
4. **Segnate i passaggi fuori dal gestionale** (email, Excel, telefonate, conteggi).
5. **Decidete cosa deve restare umano** per forza; il resto è candidato a preparazione automatica con conferma.

Se il collo è sul passivo, la checklist operativa è in [registrazione DDT in entrata](/blog/registrazione-ddt-in-entrata). Se volete capire come si integrano agenti e documenti in azienda, c'è la mappa [agenti AI per aziende](/blog/agenti-ai-per-aziende).

## FAQ

### Il gestionale legge da solo i PDF dei DDT?

No. Legge **dati** che gli passate — digitazione, import da file, integrazione. La lettura del PDF sta **prima**, in un flusso che estrae campi e chiede conferma. Non è una funzione magica del modulo DDT.

### Serve un «software gestionale DDT» diverso da Mago o TeamSystem?

Di rado. Serve un **flusso** intorno al gestionale già in uso: documento, registro di controllo, persona, import tracciato. Sostituire l'ERP raddoppia il problema.

### Cosa cambia tra DDT in entrata e in uscita nell'ERP?

In entrata il documento arriva dall'esterno e voi registrarne il carico e l'evasione ordine fornitore. In uscita il documento descrive ciò che **voi** spedite; l'ERP scala giacenza ed evade l'ordine cliente. I campi obbligatori sulla carta sono simili; il lavoro manuale intorno al sistema cambia.

### Si può automatizzare solo l'entrata?

Sì, ed è spesso il primo passo in officina. L'uscita si affronta quando picking, lotti e bolle cliente sono già allineati al gestionale — altrimenti le eccezioni si sommano.

### Dove finisce la guida e dove inizia il servizio Frasma?

Questa pagina è divulgativa: mappa ERP, DDT, tempo manuale. Il percorso concreto di lettura, validazione e import verso il vostro tracciato è [DDT verso ERP](/servizi/ddt-erp). Non c'è un prezzo qui né un impegno: c'è il modo in cui lavoriamo sul ciclo passivo.

---

**Autore:** Francesco Saverio Mazzi — Frasma

[Prenota 30 minuti di analisi del processo con Frasma](/manifattura)
