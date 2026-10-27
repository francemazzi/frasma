---
slug: software-preventivi-lavorazioni-meccaniche
title: "Software preventivi lavorazioni meccaniche: dal disegno al prezzo, prima dell'invio"
seoTitle: "Software preventivi lavorazioni meccaniche | Frasma"
seoDescription: "Dal disegno (PDF, DXF, STEP) a tempi, materiale e prezzo. Cosa serve in officina, e perché una persona conferma prima di mandare il preventivo."
excerpt: "Il preventivo da disegno non è un listino automatico: si ricostruiscono tempi e materiale, una persona conferma, poi si invia. Il gestionale registra dopo."
coverImage: /images/blog/cover-software-preventivi-lavorazioni-meccaniche.png
publishedAt: "2026-10-27"
updatedAt: "2026-10-27"
tags:
  - intelligenza-artificiale
  - manifattura
  - erp
status: published
---

Arriva una richiesta di offerta. In allegato un PDF. A volte uno STEP, a volte un DXF. Qualcuno apre il disegno, stima i tempi a occhio, cerca il materiale, scrive un prezzo su Excel. Poi manda.

Chi cerca un **software preventivi lavorazioni meccaniche** sta chiedendo questo: togliere il copia-incolla dal disegno, arrivare a tempi, materiale e prezzo, e **non spedire** finché una persona non ha detto sì.

Non è un listino che si applica da solo. Non è «l'AI che fa il preventivo». E non è un secondo gestionale. Il gestionale già in uso resta il sistema di registrazione: ordine, magazzino, fattura. Il preventivo, prima, è un lavoro di officina.

## Cosa si intende per software preventivi lavorazioni meccaniche

La query è commerciale. In officina il lavoro è più stretto.

Serve un flusso che, dal disegno, proponga **tempi**, **materiale** e **prezzo** per *questa* officina: le macchine che ci sono, i cicli già chiusi, le barre e i piatti a magazzino. Poi una persona del commerciale o dell'ufficio tecnico guarda la proposta, corregge, conferma. Solo dopo si invia.

Tre cose che questa guida non è.

Non è la [distinta da un disegno](/blog/distinta-da-disegno-non-e-un-carico). Lì il cliente manda il complessivo e i particolari vanno creati. Qui il pezzo da quotare c'è già: manca il prezzo.

Non è [tolleranze, revisione e ciclo](/blog/ciclo-e-revisione-non-escono-dallo-step). Quello sta a bordo macchina, quando il codice torna e il programma vecchio non si rilancia alla cieca. Il preventivo sta prima: si decide se prendere il lavoro e a che cifra.

Non è un modulo «intelligente» dentro l'ERP. Se oggi il prezzo nasce su Excel, un assistente nel gestionale non toglie quel foglio.

## Il problema in officina: Excel, disegno e tempi inventati

Il disegno arriva. Il tempo no.

Chi quota apre il PDF, legge quote e note, stima le operazioni. Se lo STEP c'è, guarda la forma. Il materiale spesso lo indica il cliente; la sezione della barra o del piatto la decide chi conosce il magazzino. Il prezzo è tariffa oraria per i minuti immaginati, più il grezzo, più un margine. Tutto su un foglio che tiene insieme formule di tre anni fa e eccezioni a voce.

Due errori si pagano dopo, non in chat.

**Tempi corti.** Il pezzo entra. In macchina i minuti non tornano. Il lavoro è venduto sotto costo.

**Tempi lunghi.** Il cliente prende altrove. Il disegno era lo stesso; il prezzo no.

Arıkan e colleghi, in un [lavoro aperto su arXiv](https://arxiv.org/abs/2508.12440), partono da lì. Il costo di lavorazione, in officina, è ancora tariffa oraria per il tempo macchina, più materiale e indiretti. Stimare quel tempo chiede un ciclo: tornitura, fresatura, foratura, parametri, piazzamenti. A mano, scrivono, squadre di specialisti possono metterci settimane su un disegno. Nel loro settore — componentistica automotive — il bersaglio industriale è un'offerta entro 48 ore; molte ne prendono più di una settimana.

Non è un dato Frasma e non è la vostra officina. È il motivo per cui la query esiste: il disegno c'è, il preventivo no.

## Cosa deve fare un flusso dal PDF, dal DXF o dallo STEP

«Software» qui non significa un prodotto con un nome da listino. Significa un percorso con ingressi distinti e un'uscita controllabile.

1. **Si tengono separati i file.** Il PDF porta quote, tolleranze, note, materiale se è scritto. Lo STEP porta la forma. Il DXF, quando c'è, porta geometria 2D misurabile. Fonderli in un unico «allegato da importare» perde il pezzo che manca. Lo STEP, da solo, non ha le tolleranze: sta nel pezzo su [ciclo e revisione](/blog/ciclo-e-revisione-non-escono-dallo-step).
2. **Si propone una scheda, non un riassunto.** Materiale, sezione del grezzo, operazioni, tempi, prezzo. Se un campo manca — revisione non dichiarata, materiale assente, geometria che non torna con un ciclo già fatto — lo stato resta «da verificare». Non si completa a sentimento.
3. **Si usa la memoria di questa officina.** Lo stesso particolare si fa su macchine diverse. Un ciclo copiato da un'altra officina è un ciclo sbagliato con un bel 3D accanto. Se il codice è già stato lavorato e la revisione torna, la proposta parte da lì: l'ho pensata così, cambia qualcosa?
4. **Una persona conferma.** Poi si scrive l'offerta. Poi, se il cliente accetta, il gestionale riceve ordine e, se serve, i tempi già chiusi.

Yoo e Kang, su [arXiv](https://arxiv.org/abs/2010.14824), lavorano sul lato 3D: da un modello CAD stimano il costo di pezzi CNC e mostrano quali feature di lavorazione alzano il prezzo. Il loro Grad-CAM 3D, dicono, riconosce le feature e distingue la difficoltà anche sulla stessa feature. È un segnale utile: la forma da sola non basta; conta *come* si lavora.

Arıkan e colleghi restano sul 2D. Parsano 13.684 DWG (convertiti in DXF) di sospensioni e sterzo, 24 famiglie, circa 200 descrittori geometrici e statistici. I modelli a boosting arrivano a un errore percentuale medio (MAPE) tra il 3,91% e il 18,51% a seconda del gruppo; in dieci gruppi il MAPE sta sotto il 10%. L'abstract lo riassume come «circa il 10%».

Sono previsioni su famiglie già viste, con costi storici tra 0,50 € e 50 € a pezzo. Non sono i vostri preventivi. Un 18% su un prezzo mandato al cliente non è «abbastanza vicino». È un'offerta sbagliata con un numero pulito.

Per questo la sequenza che uso tiene la conferma prima dell'invio. L'agente propone. Segna il dubbio. Una persona chiude il dubbio. Il cliente riceve solo quello che è stato chiuso.

È la stessa regola di [non collegare un agente in scrittura diretta sull'ERP](/blog/non-collegare-agenti-ai-direttamente-erp), un passo prima: qui non c'è ancora un movimento di magazzino. C'è una cifra che, una volta partita, è già un impegno.

## Una proposta di tempi e prezzo non è ancora un preventivo

La tentazione è chiudere il cerchio: il disegno arriva, l'offerta esce. In officina non funziona così, e non deve.

Una proposta può essere sbagliata in modo convincente. Un tempo letto da un ciclo vecchio su una revisione nuova. Un materiale indicato dal cliente e una sezione che in magazzino non c'è. Una foratura contata due volte. Un grezzo dimensionato sulla quota esterna, senza il sovrametallo.

Chi conferma non «revisiona l'intelligenza artificiale». Controlla i fatti che, una volta spediti, sono già prezzo:

- il pezzo è quello, con la revisione giusta;
- il materiale e la sezione del grezzo tornano con quanto si compra o si ha in casa;
- i minuti sono di *questa* macchina, non di un ciclo standard;
- i campi incerti restano incerti, non vengono riempiti per chiudere la pratica.

Se il sistema mostra da dove ha preso il numero — il punto del PDF, il ciclo precedente, la riga di magazzino — il controllo è un confronto. Se mostra solo una cella Excel, il controllo è un secondo preventivo a mano.

Il passaggio tra disegno, commerciale e produzione è il contesto di [Frasma per la manifattura](/manifattura).

## Chi conferma, poi si invia

L'uscita del flusso è un'offerta, non un movimento nel gestionale.

Si scrive il preventivo. Si manda. Se il cliente accetta, allora sì: ordine, commessa, eventualmente distinta e tempi verso Mago, TeamSystem, Danea o quello che già usate. Il gestionale registra. Non inventa il prezzo.

I permessi seguono il ruolo. L'automazione legge disegni e cicli già chiusi, prepara la scheda, non spedisce email al cliente, non cambia listini, non crea l'ordine da sola. Le eccezioni restano assegnate a qualcuno, non in una conversazione.

Quando il cliente manda solo l'assieme e i particolari non esistono ancora, il lavoro è un altro: scomporre e creare i codici. Sta in [la distinta da un disegno non è un carico](/blog/distinta-da-disegno-non-e-un-carico). Qui si quota un pezzo che si può già fare.

Documenti, memoria dei cicli, e una persona che ferma il numero incerto: è il banco descritto in [l'officina intorno al modello](/blog/ai-manifattura-officina-intorno-al-modello).

## Questa settimana

Prendi tre richieste di preventivo vere, meglio se una è andata via in ritardo e una è stata venduta sotto i minuti reali. Sul tavolo tieni il disegno, il foglio Excel (o il gestionale) da cui è uscito il prezzo, e i rapportini se il pezzo è già stato fatto. Segna da dove sono arrivati tempi e materiale. Se la cifra è nata a occhio, il problema non è «manca il software». Manca un flusso: proposta, dubbio, conferma, invio.

Se i disegni, le schede e i preventivi si copiano ancora a mano tra email, PDF ed Excel, il racconto più vicino — documenti letti, persona che conferma, poi gestionale — è il caso [Documenti ERP e preventivi manifatturieri](/casi/documenti-erp-manifattura).

## FAQ

### Un software di preventivi sostituisce chi fa le offerte?

No. Sostituisce il copia-incolla sui pezzi già visti e sui campi leggibili. Chi quota continua a confermare, a gestire le eccezioni e a decidere il margine. La responsabilità del prezzo mandato al cliente resta umana.

### Si può partire da PDF, DXF e STEP insieme?

Sì, tenendoli separati. Il PDF porta quote e note. Lo STEP porta la forma. Il DXF, se c'è, porta geometria 2D. Trattarli come un unico file «da importare» butta via la parte che decide il ciclo. Si prova sui *vostri* disegni, non si promette lo stesso risultato su una scansione storta e su uno STEP pulito.

### I prezzi finiscono da soli nel gestionale o in mail al cliente?

No. Il sistema propone tempi, materiale e prezzo. Una persona conferma. Poi si scrive l'offerta. Se il lavoro viene accettato, si importa nel gestionale già in uso, sul tracciato che quel gestionale accetta. Non si apre una scrittura diretta e non si sostituisce Mago, TeamSystem o Danea.

### Cosa si fa se il tempo o il materiale non sono chiari?

Si marca «da verificare». Non si completa a indovinare. Il disegno e, se c'è, il ciclo precedente restano agganciati alla riga, così chi controlla vede la fonte.

### Da dove si parte, in pratica?

Da un insieme piccolo di richieste reali e dall'elenco di ciò che già mettete in offerta: materiale, operazioni, minuti, prezzo. Si misura cosa la proposta indovina e cosa no. Si tiene la persona nel punto di conferma. Si decide se allargare. Il contesto operativo è [Frasma per la manifattura](/manifattura); i percorsi di servizio stanno in [servizi](/servizi).

Se in ufficio i preventivi si digitano ancora a mano dal disegno, si può partire da lì: pochi pezzi, i campi giusti, una persona che conferma prima dell'invio.

[Valuta il flusso preventivi in manifattura](/manifattura)

---

**Fonti:** Arıkan, Özönder, Küçükkartal, Arslanoğlu, Çağırankaya, Ayvaz, Koçyiğit, Altun, *Machine Learning-Based Manufacturing Cost Prediction from 2D Engineering Drawings via Geometric Features*, arXiv:2508.12440, 2025, <https://arxiv.org/abs/2508.12440>. Yoo, Kang, *Explainable Artificial Intelligence for Manufacturing Cost Estimation and Machining Feature Visualization*, arXiv:2010.14824, Expert Systems with Applications 183:115430, 2021, <https://arxiv.org/abs/2010.14824>. In caso di differenza tra questo articolo e i paper, prevalgono i testi originali.

**Autore:** Francesco Saverio Mazzi — Frasma
