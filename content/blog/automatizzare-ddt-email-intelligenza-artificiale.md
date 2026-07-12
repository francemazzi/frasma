---
slug: automatizzare-ddt-email-intelligenza-artificiale
title: "Come automatizzare l'inserimento dei DDT ricevuti via email con l'intelligenza artificiale"
seoTitle: "Come automatizzare l'inserimento dei DDT ricevuti via email con l'intelligenza artificiale | Frasma"
seoDescription: "Un esempio pratico per leggere i Documenti di Trasporto allegati alle email, estrarre i dati dai PDF e aggiornare automaticamente un registro Excel."
excerpt: "Un esempio pratico per leggere i Documenti di Trasporto allegati alle email, estrarre i dati dai PDF e aggiornare automaticamente un registro Excel."
publishedAt: "2026-07-12"
updatedAt: "2026-07-12"
tags:
  - intelligenza-artificiale
  - automazione-documentale
  - ddt
  - excel
  - manifattura
status: published
---

In molte aziende manifatturiere i Documenti di Trasporto arrivano ancora come PDF allegati alle email. Qualcuno deve aprire ogni messaggio, scaricare il documento, leggere i dati e copiarli in un file Excel o nel gestionale.

È un'attività semplice, ma ripetitiva. Richiede tempo e può generare errori di trascrizione, documenti duplicati o registrazioni incomplete.

In questo tutorial mostro un piccolo flusso di automazione che utilizza l'intelligenza artificiale per:

1. controllare le email provenienti dai fornitori autorizzati;
2. individuare i PDF allegati contenenti i DDT;
3. estrarre dal documento i dati utili;
4. archiviare il PDF nella cartella corretta;
5. aggiornare automaticamente un registro Excel.

Il video completo è disponibile su YouTube:

[Guarda il tutorial: automatizzare l'inserimento dei DDT con l'AI](https://youtu.be/22K6TJAXmmE)

## Il problema: dati copiati a mano da email, PDF ed Excel

Il processo tradizionale è spesso composto da diversi passaggi manuali:

- ricezione dell'email del fornitore;
- apertura e download del PDF;
- verifica del documento;
- lettura di numero DDT, data, fornitore e articoli;
- copia dei dati nel registro Excel;
- salvataggio del documento in una cartella condivisa;
- eventuale inserimento successivo nel gestionale.

Il problema non è soltanto il tempo impiegato. Quando il volume dei documenti cresce, diventa più difficile capire quali DDT siano già stati registrati, quali contengano dati incompleti e quali richiedano una verifica.

L'automazione può preparare il lavoro, lasciando alla persona la gestione delle eccezioni e il controllo finale.

## 1. Creare una whitelist dei fornitori

Il primo elemento del flusso è un file Excel contenente i fornitori autorizzati.

Nel tutorial utilizzo tre informazioni essenziali:

| Nome fornitore | Partita IVA | Indirizzo email |
| --- | --- | --- |
| Fornitore Alfa | 01234567890 | ordini@fornitore-alfa.it |
| Fornitore Beta | 09876543210 | documenti@fornitore-beta.it |

Questo file funziona come una whitelist: il sistema deve elaborare soltanto i messaggi provenienti dagli indirizzi presenti nell'elenco.

La whitelist riduce il rischio che l'automazione analizzi email non pertinenti o allegati inviati da mittenti sconosciuti.

[Vai al passaggio sulla whitelist nel video](https://youtu.be/22K6TJAXmmE?t=51)

In un'applicazione aziendale reale, la verifica del mittente dovrebbe essere affiancata da ulteriori controlli, per esempio:

- formato e dimensione dell'allegato;
- presenza di un PDF valido;
- corrispondenza tra fornitore, Partita IVA e dati contenuti nel documento;
- rilevamento di DDT già importati;
- registrazione delle operazioni eseguite.

## 2. Definire con precisione cosa deve fare l'AI

Il secondo passaggio consiste nel descrivere il processo attraverso istruzioni chiare.

Un prompt operativo può chiedere al sistema di:

1. leggere gli indirizzi email dal file dei fornitori;
2. cercare nella casella di posta i nuovi messaggi ricevuti da quegli indirizzi;
3. verificare la presenza di PDF allegati;
4. scaricare i documenti nella cartella dedicata;
5. estrarre i campi richiesti da ciascun DDT;
6. aggiungere una nuova riga al registro Excel;
7. segnalare i documenti che non possono essere interpretati con sufficiente affidabilità.

[Guarda la creazione delle istruzioni](https://youtu.be/22K6TJAXmmE?t=127)

Il prompt, da solo, non rende affidabile il processo. È necessario stabilire anche quali campi estrarre e come rappresentarli.

Per esempio, il registro potrebbe contenere:

| Campo | Esempio |
| --- | --- |
| Fornitore | Fornitore Alfa S.r.l. |
| Partita IVA | 01234567890 |
| Numero DDT | 184/2026 |
| Data documento | 10/07/2026 |
| Codice articolo | ART-1042 |
| Descrizione | Piastra in acciaio 4 mm |
| Quantità | 25 |
| Unità di misura | pz |
| Nome file | DDT-184-2026.pdf |
| Stato verifica | Da verificare |

Più il formato di destinazione è esplicito, più semplice diventa controllare il risultato.

## 3. Configurare l'attività programmata

Nel video creo un'attività chiamata **"Estrazione documenti di trasporto"** all'interno di un ambiente di lavoro AI capace di accedere ai file e alla casella email autorizzata.

[Guarda la configurazione dell'automazione](https://youtu.be/22K6TJAXmmE?t=195)

L'attività contiene:

- le istruzioni operative;
- la posizione dei file utilizzati;
- la cartella in cui archiviare i DDT;
- il registro Excel da aggiornare;
- la frequenza di esecuzione;
- le autorizzazioni necessarie per accedere alla posta.

È importante concedere soltanto i permessi strettamente necessari. Un'automazione che deve leggere gli allegati non dovrebbe, per esempio, poter inviare o eliminare messaggi se queste azioni non fanno parte del processo.

## 4. Indicare correttamente file e cartelle

Per lavorare sui documenti corretti, il sistema deve conoscere i percorsi esatti delle risorse.

Nel tutorial vengono configurati tre riferimenti principali:

### File dei fornitori

È il foglio Excel contenente la whitelist con nome, Partita IVA e indirizzo email.

[Guarda la configurazione del file fornitori](https://youtu.be/22K6TJAXmmE?t=264)

### Cartella dei DDT

È la directory nella quale salvare i PDF recuperati dalla casella di posta.

[Guarda la configurazione della cartella DDT](https://youtu.be/22K6TJAXmmE?t=317)

### Registro DDT

È il file Excel nel quale aggiungere i dati estratti dai documenti.

[Guarda la configurazione del registro](https://youtu.be/22K6TJAXmmE?t=344)

In produzione, eviterei di affidarmi soltanto al nome del file. Ogni documento dovrebbe avere un identificatore univoco, costruito per esempio combinando fornitore, numero DDT e data.

Questo consente di impedire che lo stesso allegato venga registrato due volte.

## 5. Programmare la frequenza di esecuzione

L'attività può essere eseguita manualmente oppure secondo una pianificazione, per esempio ogni giorno alle 12:00.

[Guarda la programmazione del task](https://youtu.be/22K6TJAXmmE?t=433)

La frequenza corretta dipende dal processo aziendale:

- **una volta al giorno**, se i DDT vengono verificati in un momento prestabilito;
- **ogni ora**, se il registro deve essere aggiornato durante la giornata;
- **all'arrivo dell'email**, se è disponibile un'integrazione basata su eventi;
- **manualmente**, durante la fase iniziale di test.

Prima di programmare l'esecuzione automatica conviene testare il flusso su un insieme limitato di documenti reali, includendo anche PDF difficili da leggere, scansioni e formati provenienti da fornitori diversi.

## 6. Eseguire un test completo

Nel test mostrato nel video invio un'email contenente un DDT e avvio manualmente l'attività.

Il sistema:

- individua il messaggio;
- riconosce l'allegato;
- analizza il PDF;
- estrae gli articoli ricevuti;
- compila il registro Excel.

[Guarda il test dell'automazione](https://youtu.be/22K6TJAXmmE?t=469)

[Guarda il risultato nel registro Excel](https://youtu.be/22K6TJAXmmE?t=508)

Il risultato dimostra che un'attività documentale ripetitiva può essere trasformata in un flusso semi-automatico con strumenti accessibili.

## Dalla dimostrazione a un processo aziendale affidabile

Il tutorial mostra un prototipo funzionante. Per utilizzarlo ogni giorno in azienda servono però alcuni controlli aggiuntivi.

### Evitare i duplicati

Il sistema deve controllare se la combinazione tra fornitore, numero DDT e data è già presente nel registro.

### Gestire i campi mancanti

Se il numero del documento o la quantità non sono leggibili, il DDT non dovrebbe essere registrato come se fosse completo. È preferibile salvarlo con lo stato "da verificare".

### Conservare la fonte del dato

Ogni riga del registro dovrebbe mantenere un collegamento al PDF originale e, quando utile, all'email di provenienza.

### Separare automazione e approvazione

L'intelligenza artificiale può preparare i dati, ma una persona dovrebbe poter confermare o correggere i documenti dubbi prima della scrittura definitiva nel gestionale.

### Proteggere documenti e credenziali

Email, allegati e file aziendali devono essere gestiti con accessi limitati, registri delle operazioni, backup e tempi di conservazione definiti.

### Misurare l'affidabilità

Prima della messa in produzione conviene confrontare i dati estratti automaticamente con un insieme di DDT già verificati. In questo modo è possibile misurare:

- percentuale di documenti letti correttamente;
- accuratezza dei singoli campi;
- numero di eccezioni da gestire;
- tempo risparmiato;
- frequenza delle correzioni manuali.

## Excel può essere il punto di partenza, non necessariamente quello di arrivo

Per un primo test, Excel è spesso la soluzione più rapida: è conosciuto dal personale, può essere verificato facilmente e non richiede di modificare subito il gestionale.

Quando il processo diventa stabile, lo stesso flusso può essere collegato direttamente a:

- ERP aziendale;
- software di magazzino;
- sistema documentale;
- database interno;
- procedura di controllo qualità;
- dashboard per le eccezioni.

L'obiettivo non è aggiungere intelligenza artificiale a ogni passaggio, ma eliminare il copia-incolla dove produce realmente un vantaggio misurabile.

## Conclusione

L'inserimento dei DDT è un buon esempio di automazione documentale perché parte da un processo reale e ripetitivo: email in ingresso, PDF da leggere e dati da riportare in un sistema aziendale.

Una soluzione efficace combina:

- regole precise per selezionare i mittenti;
- estrazione assistita dall'intelligenza artificiale;
- archiviazione ordinata dei documenti;
- registro strutturato;
- gestione delle eccezioni;
- verifica umana nei casi dubbi.

Se nella tua azienda i dati vengono ancora copiati manualmente tra email, PDF, Excel ed ERP, possiamo partire da alcuni documenti reali e capire dove un prototipo può ridurre tempi ed errori.

[Prenota 30 minuti di analisi del processo con Frasma](https://www.frasma.org/)

---

**Video:** [Automatizzare l'inserimento dei DDT con l'intelligenza artificiale](https://youtu.be/22K6TJAXmmE)  
**Autore:** Francesco Saverio Mazzi — Frasma
