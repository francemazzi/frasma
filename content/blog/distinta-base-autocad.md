---
slug: distinta-base-autocad
title: "Distinta base da AutoCAD: DATAEXTRACTION, Excel e carico nel gestionale"
seoTitle: "Distinta base AutoCAD: da DWG a Excel e gestionale | Frasma"
seoDescription: "Come estrarre la distinta base da un DWG AutoCAD con attributi e DATAEXTRACTION, controllarla in Excel e importarla nel gestionale dopo conferma."
excerpt: "DATAEXTRACTION estrae blocchi e attributi in CSV o Excel. La distinta entra nel gestionale solo dopo che una persona ha confermato le righe."
coverImage: /images/blog/cover-distinta-base-autocad.png
publishedAt: "2026-10-26"
updatedAt: "2026-10-26"
tags:
  - intelligenza-artificiale
  - manifattura
  - erp
  - excel
status: published
---

In un ufficio tecnico di PMI il DWG è già sul tavolo. I particolari sono blocchi. Qualcuno ha compilato gli attributi: codice, descrizione, materiale. La domanda è concreta: **come si ottiene una distinta base da AutoCAD** senza ricopiare ogni riga a mano in Mago, TeamSystem o nell'altro gestionale già in uso?

Non è la stessa domanda di quando il cliente manda solo il complessivo. Lì i particolari non esistono ancora: vanno scomposti, nominati, quotati. Quel collo di bottiglia sta in [la distinta da un disegno non è un carico](/blog/distinta-da-disegno-non-e-un-carico). Qui il disegno c'è, e dentro ci sono già i pezzi. Il lavoro è portarli fuori in una lista utilizzabile, controllarli, e solo dopo caricarli.

La tentazione è trattare l'export come un import. Si lancia DATAEXTRACTION, esce un Excel, qualcuno lo butta nel gestionale. L'Excel è un registro. Non è ancora la distinta in anagrafica.

## Cosa esce dal DWG, e cosa no

Un blocco è un oggetto ripetibile. Un attributo è testo informativo agganciato a quel blocco: tag e valore. Se i tag ci sono — CODICE, DESCRIZIONE, MATERIALE, QTA — l'estrazione ha da dove partire. Se il particolare è solo un rettangolo senza attributi, AutoCAD esporta il nome del blocco e le proprietà grafiche. Non inventa il codice articolo.

Autodesk lo scrive nella [guida al comando DATAEXTRACTION](https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-5A39FFE8-10AC-4AE5-8EF4-D097C8261D1A.htm): il comando esporta proprietà degli oggetti, **attributi di blocco** e informazioni del disegno verso una tabella nel DWG o verso un file esterno. Può anche collegare un foglio Excel già esistente. Non crea anagrafica. Non mappa i vostri codici su quelli del cliente.

Quando la distinta manca del tutto, o il file è uno STEP senza struttura, il forum lo dice da anni: dallo STEP resta il nome del file, e la lista va ricostruita. È la domanda aperta su [CAD3D.it](https://www.cad3d.it/forum1/discussione/estrarre-distinta-base-da-file-step.52125/). Qui parliamo del caso più stretto: un DWG AutoCAD in cui i blocchi tengono già i dati.

Tolleranze, indice di revisione e ciclo di lavorazione non stanno in questa estrazione. Se la domanda è quella, il pezzo è [ciclo e revisione non escono dallo STEP](/blog/ciclo-e-revisione-non-escono-dallo-step).

## Come funziona DATAEXTRACTION

Il comando apre un assistente. La [documentazione Autodesk](https://help.autodesk.com/cloudhelp/2027/ENU/AutoCAD-Core/files/GUID-D1433C93-0E7F-46D0-8D05-78DF3626B146.htm) elenca le pagine, in quest'ordine.

1. **Begin.** Si crea una nuova estrazione e la si salva in un file DXEX. Si può riusare un'estrazione precedente come modello, così la volta dopo non si rimescolano le colonne.
2. **Define Data Source.** Il disegno corrente, altri DWG, una cartella. Serve quando la commessa è sparsa su più tavole, non solo sul complessivo.
3. **Select Objects.** Qui si restringe. L'opzione utile in officina è *Display Blocks with Attributes Only*: restano i blocchi che hanno attributi. I tratteggi, le quote, i cartigli vuoti escono di mezzo.
4. **Select Properties.** Le categorie sono quelle della palette Proprietà. Per la distinta conta **Attribute**: i tag che avete definito voi. Colore e layer, di solito, no.
5. **Refine Data.** Si riordinano le colonne. *Combine Identical Rows* raggruppa i record uguali e aggiorna la colonna Count con la somma. È la quantità, se gli attributi coincidono. Se due blocchi hanno lo stesso nome e un materiale diverso, non vanno fusi a occhi chiusi.
6. **Choose Output.** Tabella nel disegno, file esterno, o entrambi.

Sull'export Autodesk è esplicita, nella pagina [About Exporting Extracted Data](https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-39165928-A505-464B-8536-5817BA9DEC27.htm). I formati del file esterno sono Microsoft Excel (XLSX), Access (MDB), CSV (campi separati da virgola, record su righe nuove) e TXT (campi separati da tabulazione). Il file si crea quando si preme Fine. Su XLSX e MDB il tetto è **255 colonne**.

La tabella inserita nel DWG ha le celle bloccate di default: non si modifica se non le si sblocca. In AutoCAD LT quella tabella si vede, ma non si aggiorna. Lo stesso perimetro vale per lo strumento: Autodesk conferma che [DATAEXTRACTION non è in AutoCAD LT](https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/How-to-extract-block-attributes-in-AutoCAD-LT.html). Lì si usa ATTEXT, con un file di modello, verso un testo da aprire in Excel.

Nessuno di questi passaggi è il carico nel gestionale. È la lista.

## Excel è il registro, non l'arrivo

Il CSV o l'XLSX è il foglio su cui si lavora. Lo tengo come registro di controllo, con le stesse regole che uso sui documenti in ingresso: ogni riga ha una fonte, uno stato, e non entra a sistema se lo stato è aperto.

Le colonne che servono in ufficio tecnico sono poche:

| Campo | Perché serve |
| --- | --- |
| Codice | Il vostro, o quello del cliente da mappare |
| Descrizione | Serve quando il codice manca o non torna |
| Quantità | Count dell'estrazione, da confrontare con l'assieme |
| Unità di misura | pz, kg, m: non è decorazione |
| Materiale | Se sta negli attributi; altrimenti resta vuoto |
| Nome blocco / tag | Da dove è uscita la riga |
| Revisione | Se c'è nel DWG; se non c'è, non si deduce dal nome file |
| File di origine | Quale tavola, quale cartella |
| Stato verifica | Completo, da controllare, senza attributi |

Non è un tracciato universale. È l'elenco operativo. Il tracciato vero lo decide il gestionale già in azienda. Se un campo non ha dove arrivare, non si estrae «perché sì».

*Combine Identical Rows* aiuta. Può anche nascondere una variante: stesso blocco, attributo diverso su una sola istanza. Per questo il foglio resta accanto al DWG, non al posto del DWG.

Chi in officina chiede una macro «distinta verso Excel» cerca proprio questo foglio. Su [CAD3D.it](https://www.cad3d.it/forum1/discussione/macro-estrazione-distinta-base.57540/page-2) le liste utili tengono almeno codice, quantità e descrizione, e segnalano i componenti senza codice. È un segnale di domanda, non una ricetta da copiare. Il pezzo che manca, in una PMI, è il passo dopo: chi conferma, e dove si carica.

[Valuta il passaggio da AutoCAD a distinta e gestionale](/casi/documenti-erp-manifattura)

## Una persona conferma, poi si importa

La tentazione è chiudere il cerchio: il DWG si apre, il gestionale si aggiorna. In anagrafica non funziona così, e non deve.

Una riga estratta può essere sbagliata in modo pulito. Un blocco senza attributo che diventa un codice inventato. Una quantità sommata su due particolari che non sono lo stesso pezzo. Un commerciale già in anagrafica che viene ricreato. Un particolare nuovo che nessuno ha ancora nominato.

Chi conferma non «revisiona l'export». Controlla i fatti che, una volta scritti, sono già distinta e già fabbisogno:

- il codice è vostro, o è mappato sul vostro, non un omonimo;
- la quantità coincide con l'assieme, o almeno con i blocchi che avete deciso di contare;
- i blocchi senza attributi restano «da verificare», non vengono riempiti per chiudere il foglio;
- l'articolo già in anagrafica non si ricrea;
- la revisione, se serve, si legge dal foglio o dal cartiglio, non dal nome del file.

È la stessa regola di [non collegare un agente in scrittura diretta sull'ERP](/blog/non-collegare-agenti-ai-direttamente-erp): si prepara, si conferma, poi arriva un import tracciato. Qui non c'è un movimento di magazzino. C'è una struttura tecnica che, se sbagliata, tira dietro acquisti e ciclo.

Il caso [Documenti ERP e preventivi manifatturieri](/casi/documenti-erp-manifattura) parte da lì: documenti e dati tecnici letti, controllati da una persona, poi usati per ERP e preventivo. La distinta da AutoCAD è lo stesso banco, con il DWG al posto del PDF.

## Il gestionale riceve la lista già chiusa

Solo dopo si prepara il tracciato verso Mago, TeamSystem o l'ERP già in uso. File di import, CSV, procedura che quel gestionale accetta. Non si apre una scrittura diretta e non si sostituisce il gestionale.

Due strade, tenute separate.

**Articolo già noto.** Si controlla il codice e la revisione. Non si ricrea l'anagrafica. Se la geometria è cambiata e il cliente non l'ha scritto, il confronto sta nel pezzo su [ciclo e revisione](/blog/ciclo-e-revisione-non-escono-dallo-step).

**Articolo nuovo.** Si conferma codice, descrizione, quantità. Poi si crea. Il minuto a codice arriva in fondo, quando la riga è vera.

Se il DWG non ha attributi, o se il cliente ha mandato solo l'assieme, DATAEXTRACTION non risolve il vuoto. Si torna alla scomposizione: [la distinta da un disegno non è un carico](/blog/distinta-da-disegno-non-e-un-carico).

## Limiti dell'estrazione da AutoCAD

Il perimetro va detto prima di partire.

**Blocchi senza attributi.** Il comando esporta quello che trova. Un rettangolo chiamato «Pezzo24» non è un codice. Resta eccezione.

**AutoCAD LT.** DATAEXTRACTION non c'è. ATTEXT esporta attributi verso un file di testo, con modello. Il controllo sul foglio resta lo stesso; l'assistente no.

**Più tavole, più definizioni.** Lo stesso particolare disegnato in due modi produce due righe. Combine le unisce solo se i campi coincidono.

**255 colonne su XLSX e MDB.** Lo scrive Autodesk. In officina non è il vincolo frequente. Lo è se qualcuno esporta tutte le proprietà grafiche «per sicurezza».

**La tabella nel DWG non è il registro.** Celle bloccate, aggiornamento che in LT non c'è. Il foglio esterno è quello che si controlla e si archivia.

**Niente anagrafica da sola.** Estrarre «PIASTRA 10x80» non la collega al codice in Mago. La mappatura è lavoro vostro, sui vostri codici.

**File che non sono un DWG strutturato.** STEP, PDF del complessivo, scansione del cartiglio: un altro mestiere. Non si promette lo stesso risultato.

## Da dove si parte, in pratica

Non si sceglie «un software di distinta AutoCAD» in astratto. Si sceglie un perimetro.

1. **Prendete un DWG vero.** Una commessa recente, meglio se con più tavole.
2. **Contate i blocchi con attributi e quelli senza.** Quelli senza sono la coda, non un dettaglio.
3. **Lanciate DATAEXTRACTION** (o ATTEXT in LT) sulle colonne che già usate in distinta: codice, descrizione, quantità. Non tutte le proprietà.
4. **Confrontate il foglio con la distinta che avreste scritto a mano.** Dove diverge, segnate perché: attributo vuoto, Count sbagliato, codice già in anagrafica.
5. **Decidete l'arrivo.** Registro di controllo, conferma, poi import nel gestionale già in uso. Non un agente con permesso di scrittura.

Il passaggio tra ufficio tecnico, commerciale e produzione è il contesto di [Frasma per la manifattura](/manifattura). Se state valutando documenti, distinte e preventivo verso l'ERP, il racconto operativo è il caso [Documenti ERP e preventivi manifatturieri](/casi/documenti-erp-manifattura).

## FAQ

### DATAEXTRACTION produce già la distinta nel gestionale?

No. Produce una tabella o un file (XLSX, CSV, MDB, TXT). La distinta in anagrafica nasce dopo: una persona conferma le righe, poi si importa nel gestionale già in uso.

### Funziona anche con AutoCAD LT?

DATAEXTRACTION no: Autodesk lo limita ad AutoCAD completo. In LT si usa ATTEXT, con un file di modello, verso un testo da aprire in Excel. Il controllo umano resta.

### Cosa succede se i blocchi non hanno attributi?

Escono nome del blocco e proprietà grafiche, non un codice articolo. Quelle righe restano «da verificare». Non si completano a indovinare.

### I dati finiscono da soli in Mago o TeamSystem?

No. L'export prepara il foglio. Una persona conferma. Poi si importa sul tracciato che quel gestionale accetta. Non si apre una scrittura diretta e non si sostituisce Mago o TeamSystem.

### Da dove si parte, se il cliente ha mandato solo il complessivo?

Dalla scomposizione, non dall'export. Se i particolari non esistono ancora, il lavoro è [ricostruire la distinta dal disegno](/blog/distinta-da-disegno-non-e-un-carico). DATAEXTRACTION serve quando i blocchi e gli attributi ci sono già.

Se in ufficio tecnico la distinta si digita ancora a mano dal DWG, si può partire da lì: un disegno vero, le colonne giuste, una persona che conferma.

[Valuta il passaggio da AutoCAD a distinta e gestionale](/manifattura)

---

**Fonti**

- Autodesk, *DATAEXTRACTION (Command)*, AutoCAD 2026 Help. [https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-5A39FFE8-10AC-4AE5-8EF4-D097C8261D1A.htm](https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-5A39FFE8-10AC-4AE5-8EF4-D097C8261D1A.htm)
- Autodesk, *Data Extraction Wizard*, AutoCAD 2027 Help. [https://help.autodesk.com/cloudhelp/2027/ENU/AutoCAD-Core/files/GUID-D1433C93-0E7F-46D0-8D05-78DF3626B146.htm](https://help.autodesk.com/cloudhelp/2027/ENU/AutoCAD-Core/files/GUID-D1433C93-0E7F-46D0-8D05-78DF3626B146.htm)
- Autodesk, *About Exporting Extracted Data*, AutoCAD 2026 Help. Formati XLSX, CSV, MDB, TXT; tetto di 255 colonne su XLSX e MDB. [https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-39165928-A505-464B-8536-5817BA9DEC27.htm](https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-39165928-A505-464B-8536-5817BA9DEC27.htm)
- Autodesk, *How to extract block attributes in AutoCAD LT*, articolo di supporto, 4 marzo 2026. DATAEXTRACTION non è in AutoCAD LT; in LT si usa ATTEXT. [https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/How-to-extract-block-attributes-in-AutoCAD-LT.html](https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/How-to-extract-block-attributes-in-AutoCAD-LT.html)
- CAD3D.it, discussioni di domanda su estrazione distinta da STEP e su export verso Excel (segnale di domanda, non procedura). [https://www.cad3d.it/forum1/discussione/estrarre-distinta-base-da-file-step.52125/](https://www.cad3d.it/forum1/discussione/estrarre-distinta-base-da-file-step.52125/), [https://www.cad3d.it/forum1/discussione/macro-estrazione-distinta-base.57540/page-2](https://www.cad3d.it/forum1/discussione/macro-estrazione-distinta-base.57540/page-2)

In caso di differenza tra questo articolo e le pagine Autodesk, prevalgono i testi originali.

**Autore:** Francesco Saverio Mazzi — Frasma
