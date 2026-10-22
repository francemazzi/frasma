---
slug: lettura-automatica-ddt
title: "Lettura automatica dei DDT: cosa estrarre da PDF e email, e chi conferma"
seoTitle: "Lettura automatica DDT da PDF o email | Frasma"
seoDescription: "Come funziona la lettura automatica dei DDT: campi da estrarre, controllo umano prima dell'import in Mago o TeamSystem, limiti e da dove partire."
excerpt: "La lettura automatica dei DDT non è un OCR magico: estrae i campi, segnala i dubbi e chiede a una persona di confermare prima dell'import."
coverImage: /images/blog/cover-lettura-automatica-ddt.png
publishedAt: "2026-10-22"
updatedAt: "2026-10-22"
tags:
  - intelligenza-artificiale
  - automazione-documentale
  - ddt
  - erp
  - manifattura
status: published
---

In molte PMI manifatturiere il Documento di Trasporto arriva ancora come PDF in email, come scansione dal banco di accettazione o come bolla del corriere. Qualcuno lo apre, legge numero, data, fornitore e righe, e li ricopia in Mago, TeamSystem o in un altro gestionale già in uso.

La domanda non è «come si collega ChatGPT all'ERP». È più concreta: **si possono leggere i DDT in automatico?** Quali campi si estraggono? Cosa succede se il PDF è storto? Chi è responsabile se un codice articolo è sbagliato?

Questa guida risponde a quelle domande. Non è un tutorial passo-passo: quello sta in [come automatizzare i DDT ricevuti via email](/blog/automatizzare-ddt-email-intelligenza-artificiale). Qui parlo di lettura: cosa si estrae, come funziona, dove serve il controllo umano, quali limiti restano e da dove conviene iniziare. Lo stesso schema, sul campo, è il caso [Documenti ERP e preventivi manifatturieri](/casi/documenti-erp-manifattura).

## Cosa significa lettura automatica dei DDT

«Lettura automatica» non vuol dire archiviare il PDF in una cartella. Non vuol dire nemmeno che un modello linguistico «capisca» il documento e scriva da solo in magazzino.

Vuol dire tre cose, in quest'ordine:

1. **riconoscere** che il file è un DDT (e non una fattura, un'offerta o un buono di prelievo);
2. **estrarre** un insieme di campi concordati, in un formato controllabile;
3. **lasciare a una persona** la conferma prima che quei campi diventino un movimento nel gestionale.

Se manca il terzo punto, non è un processo. È una scommessa. Lo stesso principio sta in [Non collegare gli agenti AI direttamente all'ERP](/blog/non-collegare-agenti-ai-direttamente-erp): l'AI prepara, il team conferma, poi arriva un import tracciato.

La ricerca su questo lavoro ha un nome preciso. Nel benchmark [DocILE](https://arxiv.org/abs/2302.05658) (ICDAR 2023) si distingue l'estrazione dei campi dalla **localizzazione**: sapere *dove* sta il valore nel PDF. Gli autori lo dicono esplicitamente: la posizione serve alle verifiche *human-in-the-loop* e all'audit. Senza quel riferimento, chi conferma vede un numero in tabella, non il punto del DDT da cui è uscito.

## Quali campi estrarre da un DDT

Prima di scegliere uno strumento, si scrive l'elenco dei campi. Non «tutto il documento». I campi che servono a chi registra il carico.

Nella pratica di officina, la testata è quasi sempre questa:

| Campo | Perché serve |
| --- | --- |
| Fornitore | Collegarlo all'anagrafica, non inventare un nome nuovo |
| Partita IVA | Controllo di coerenza con il fornitore |
| Numero DDT | Chiave insieme a fornitore e data |
| Data documento | Carico, competenza, duplicati |
| Destinatario / sede | Utile se avete più stabilimenti |
| Riferimento ordine | Abbina il DDT a un ordine già aperto |
| Nome file e provenienza | Email, scansione, cartella: la fonte resta visibile |

Poi arrivano le **righe**. Sono il pezzo che costa di più a mano e quello che un sistema di lettura sbaglia più facilmente:

| Campo riga | Perché serve |
| --- | --- |
| Codice articolo fornitore | Va mappato sul vostro codice, se esiste |
| Descrizione | Serve quando il codice non c'è o non torna |
| Quantità | Il dato che, se sbagliato, sposta il magazzino |
| Unità di misura | pz, kg, m, fogli: non è decorazione |
| Lotto / colli | Dove il processo lo chiede |
| Stato verifica | Completo, da controllare, illeggibile |

Non è un elenco legale e non è un tracciato universale. È l'elenco operativo da cui si parte. Il tracciato vero lo decide il gestionale già in azienda: Mago, TeamSystem o un altro ERP. Se un campo non ha dove arrivare, non si estrae «perché sì».

Il caso [Documenti ERP e preventivi manifatturieri](/casi/documenti-erp-manifattura) parte da lì: fatture, DDT e schede tecniche letti, controllati da una persona, poi usati per ERP e preventivo.

DocILE, su documenti B2B (fatture, ordini, note), annota **55 classi** di campo e tratta a parte il *Line Item Recognition*: assegnare ogni valore alla riga giusta. Un DDT con dieci articoli è quel problema. Leggere «25» non basta: deve restare agganciato alla riga corretta.

## Come funziona la lettura automatica da PDF o email

Il flusso, in officina, è più corto di quanto sembri.

### Il documento entra

Arriva da una casella, da una cartella condivisa o da uno scanner. Serve una regola su *quali* file toccare: mittenti noti, estensioni ammesse, dimensione, presenza di un PDF valido. Il resto si lascia da parte. Il tutorial sui [DDT da email](/blog/automatizzare-ddt-email-intelligenza-artificiale) mostra questo ingresso con una whitelist di fornitori e un registro di controllo.

### Si ottiene testo e posizione

Un PDF nativo ha già il testo. Una scansione no: serve un passaggio di riconoscimento. In entrambi i casi la sola trascrizione non basta. Il numero «184» può essere il DDT, una quantità o un codice interno. Conta *dove* sta sulla pagina: in alto a destra, in una tabella, vicino a «N. doc.».

### Si riempiono i campi concordati

Il sistema propone fornitore, numero, data, righe. Non «riassume» il documento. Compila una scheda. Se un valore manca o è incerto, lo stato resta «da verificare». Non si completa a indovinare.

### Una persona guarda le eccezioni

I documenti puliti arrivano già strutturati. Quelli dubbi restano in coda, con il PDF a fianco. La persona corregge, conferma o scarta. Solo dopo si prepara l'import.

### L'import è un passo successivo

Excel può essere il primo registro, come nel tutorial. Non è l'arrivo. L'arrivo è il tracciato verso Mago, TeamSystem o l'ERP già in uso, dopo la conferma. La [pagina sul flusso ordini e DDT](/lp/ordini-ddt) descrive lo stesso percorso: da email e PDF a dati verificabili, poi trasferimento nel formato concordato.

## Il controllo umano prima dell'import

La tentazione è chiudere il cerchio: il PDF arriva, il gestionale si aggiorna. In accettazione non funziona così, e non deve.

Una proposta può essere sbagliata in modo convincente: due fornitori simili, un codice di un'altra commessa, una quantità letta dalla colonna sbagliata, un DDT già registrato e arrivato di nuovo in copia.

Chi conferma non «revisiona l'intelligenza artificiale». Controlla i fatti che, una volta scritti, sono già magazzino e già fattura:

- il fornitore è quello giusto, non un omonimo;
- numero e data non sono già presenti;
- le quantità coincidono con quanto è sceso dal camion, o almeno con quanto è scritto in modo leggibile;
- i campi illeggibili restano illeggibili, non vengono riempiti per chiudere la pratica.

Se il sistema evidenzia *dove* ha letto il valore, il controllo è un confronto. Se mostra solo una riga Excel, il controllo è un secondo inserimento a mano. La localizzazione dei campi, nel paper DocILE, esiste proprio per questo: la verifica umana ha bisogno del punto sul documento, non solo del testo estratto.

[Valuta il processo DDT verso ERP](/servizi/ddt-erp)

## Limiti della lettura automatica dei DDT

La lettura automatica ha un perimetro. Fuori da quel perimetro il lavoro torna alla persona, e va detto prima di partire.

**Layout che non avete mai visto.** In DocILE il test è costruito così: il 25% dei documenti è *zero-shot* (layout assente in addestramento), il 25% è *few-shot* (al massimo tre esempi visti), il 50% è di layout già noti. Non è un dato di officina e non è un risultato Frasma. Dice una cosa utile: un fornitore nuovo, con una bolla disegnata diversamente, è il caso difficile. Si misura, non si presume.

**Campi in tabella.** Le righe restano più difficili della testata. Anche i baseline del paper — RoBERTa, LayoutLMv3, un Table Transformer — trattano il *Line Item Recognition* come compito a parte. Un DDT con descrizioni spezzate su due righe, o con colonne senza intestazione chiara, finisce in eccezione.

**Scansioni, timbri, pieghe.** Un PDF nativo e una foto dal telefono non sono lo stesso input. Timbri sul numero, firme sopra la quantità, pagine storte: il sistema deve poter dire «non lo leggo», non inventare.

**Anagrafiche che non tornano.** Estrarre «Fornitore Alfa S.r.l.» non è collegarlo al codice fornitore in Mago. La mappatura articoli è un lavoro vostro, o un lavoro da fare insieme, sui vostri codici. Nessun lettore di PDF la risolve da solo.

**Documenti che non sono DDT.** Offerte, fatture, buoni di prelievo, packing list del corriere. Se il filtro in ingresso è largo, la coda di verifica si riempie di rumore.

I numeri del paper restano nel paper. LayoutLMv3 BASE, sul test DocILE, arriva a un F1 0,698 sull'estrazione dei campi e 0,721 sulle righe; i modelli addestrati solo sul benchmark stanno più in basso. Non sono valori da copiare in un preventivo. Servono a ricordare che, anche su dataset annotati, una parte dei campi non esce corretta. In officina quella parte è la coda di verifica.

## Come scegliere e da dove iniziare

Non si sceglie «un software di lettura DDT» in astratto. Si sceglie un perimetro.

1. **Prendete i documenti veri.** Dieci o venti DDT degli ultimi mesi, di fornitori diversi. Compresi quelli brutti.
2. **Scrivete i campi che registrate oggi.** Testata e righe. Quelli, non di più.
3. **Misurate il lavoro attuale.** Quante persone, in quale momento della giornata, con quale sequenza: email, PDF, Excel, gestionale.
4. **Provate la lettura su quel campione.** Confrontate campo per campo. Contate le eccezioni. Non chiedete «quanto risparmiamo»: chiedete quali campi tornano e quali no.
5. **Decidete l'arrivo.** Registro di controllo, poi import in Mago o TeamSystem. Non un agente con permesso di scrittura.

Per un prototipo già spiegato, partite dal [tutorial sui DDT da email](/blog/automatizzare-ddt-email-intelligenza-artificiale): whitelist, estrazione, Excel, eccezioni. Se il problema è più largo — DDT, fatture, schede, preventivo — il racconto è il caso [Documenti ERP e preventivi manifatturieri](/casi/documenti-erp-manifattura). Se state valutando il flusso da ordini e bolle verso il gestionale, c'è la [pagina ordini e DDT](/lp/ordini-ddt).

La scelta tecnica (file di import, API, cartella sorvegliata) viene dopo. Prima si capisce se la lettura, sui *vostri* PDF, produce campi che una persona può confermare in pochi secondi.

## FAQ

### La lettura automatica dei DDT sostituisce chi registra i documenti?

No. Sostituisce il copia-incolla sui documenti leggibili. Chi registra continua a confermare, a gestire le eccezioni e a rispondere quando un valore non torna. La responsabilità del carico resta umana.

### Si possono leggere sia i PDF nativi sia le scansioni?

Sì, con perimetri diversi. Un PDF generato dal gestionale del fornitore è il caso più semplice. Una scansione o una foto chiede un passaggio in più e produce più eccezioni. Si prova su entrambi, non si promette lo stesso risultato.

### I dati finiscono da soli in Mago o TeamSystem?

No. L'AI propone i campi. Una persona conferma. Poi si importa nel gestionale già in uso, sul tracciato che quel gestionale accetta. Non si apre una scrittura diretta e non si sostituisce Mago o TeamSystem.

### Cosa si fa se un campo non è leggibile?

Si marca «da verificare» o «illeggibile». Non si completa a indovinare. Il PDF resta agganciato alla riga, così chi controlla vede la fonte.

### Da dove si parte, in pratica?

Da un insieme piccolo di DDT reali e dall'elenco dei campi che già inserite. Si misura cosa viene letto bene, si tiene la persona nel punto di conferma, si decide se allargare. Il percorso operativo è [DDT verso ERP](/servizi/ddt-erp).

Se in accettazione i DDT si digitano ancora a mano, si può partire da lì: pochi documenti, i campi giusti, una persona che conferma.

[Valuta il processo DDT verso ERP](/servizi/ddt-erp)

---

**Fonti**

- Šimsa, Š., Šulc, M., Uřičář, M. et al., *DocILE Benchmark for Document Information Localization and Extraction*, arXiv:2302.05658, ICDAR 2023. [https://arxiv.org/abs/2302.05658](https://arxiv.org/abs/2302.05658)

**Autore:** Francesco Saverio Mazzi — Frasma
