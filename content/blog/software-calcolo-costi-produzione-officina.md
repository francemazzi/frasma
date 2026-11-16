---
slug: software-calcolo-costi-produzione-officina
title: "Software calcolo costi produzione officina: ore, materiale e setup, oltre Excel"
seoTitle: "Software calcolo costi produzione officina | Frasma"
seoDescription: "Oltre Excel: ore macchina, materiale, setup e lavorazioni esterne. Come si calcola il costo reale del pezzo, e chi conferma i numeri."
excerpt: "Il costo di produzione non è il preventivo: si sommano ore macchina, materiale, setup e lavori esterni. Excel può calcolare; non è la fonte."
coverImage: /images/blog/cover-software-calcolo-costi-produzione-officina.png
publishedAt: "2026-11-02"
updatedAt: "2026-11-02"
tags:
  - intelligenza-artificiale
  - manifattura
  - excel
  - erp
status: published
---

Chi cerca un **software calcolo costi produzione officina** — o un **programma costi produzione officina meccanica** — non sta chiedendo un listino da mandare al cliente. Sta chiedendo quanto è costato *davvero* fare quel pezzo: ore macchina, materiale, setup, lavorazioni esterne. Oggi quel numero nasce su Excel, con una tariffa unica e tre voci che nessuno ha scritto.

Se il sospetto è diverso — **margini che non tornano per commessa** e voci che non si agganciano al preventivo (terzisti, setup, scarti, scostamento tra tempi preventivati e reali) — il punto di partenza è [costi nascosti officina metalmeccanica per commessa](/blog/costi-nascosti-commessa-officina-metalmeccanica). Qui, invece, si costruisce il consuntivo riga per riga.

Il gestionale, se c'è, registra ordine, magazzino e fattura. Il costo del pezzo, prima, è un lavoro di officina. Si ricostruisce. Una persona lo conferma. Poi, se serve, si importa.

Non è «l'AI che sa il costo». Non è un secondo gestionale. E non è il [preventivo da disegno](/blog/software-preventivi-lavorazioni-meccaniche): lì si decide se prendere il lavoro e a che cifra. Qui il pezzo è già stato fatto, o sta per esserlo, e manca il costo reale.

## Cosa si intende per software calcolo costi produzione officina

La query è commerciale. In officina il lavoro è più stretto.

Serve un flusso che, per *questa* officina, metta insieme le voci che già pagate: tempo macchina, setup, grezzo, lavori dati fuori. Poi una persona dell'ufficio tecnico o del capo officina guarda la scheda, corregge, conferma. Solo dopo quel numero è «il costo».

Tre cose che questa guida non è.

Non è il [software preventivi lavorazioni meccaniche](/blog/software-preventivi-lavorazioni-meccaniche). Lì il disegno arriva e manca il prezzo da mandare. Qui il prezzo al cliente può già essere partito: manca quanto il pezzo è costato in casa.

Non è [tolleranze, revisione e ciclo](/blog/ciclo-e-revisione-non-escono-dallo-step). Quello sta a bordo macchina, quando il codice torna e il programma vecchio non si rilancia alla cieca. Il costo sta dopo: si sommano i minuti veri, non si rilancia una tariffa.

Non è un modulo «intelligente» dentro l'ERP. Se oggi il costo nasce su un foglio, un assistente nel gestionale non toglie quel foglio.

## Il problema in officina: una tariffa, un foglio, tre voci che mancano

Il pezzo esce. Il costo no.

Chi calcola apre Excel. Mette il materiale, moltiplica i minuti immaginati per una tariffa oraria unica, aggiunge un margine a sentimento. Il setup — attrezzaggio, primo pezzo, cambio utensili — sta nella testa di chi ha fatto la macchina. Il trattamento termico o la rettifica esterna arrivano dopo, su un'altra email, e nessuno li riaggancia alla commessa.

Due errori si pagano in mesi, non in chat.

**Voci corte.** Il pezzo «torna». In macchina i minuti sono di più, il setup è stato due volte, il lavoro esterno non era in riga. Avete venduto sotto costo e lo scoprite a consuntivo, se lo scoprite.

**Voci gonfiate.** Una tariffa unica su tutte le macchine. Il centro di lavoro e il trapano vecchio costano lo stesso, sul foglio. I lavori semplici sembrano cari; quelli che tengono occupato il mezzo più caro sembrano convenienti.

Silva e colleghi, in un [lavoro aperto su Metals](https://www.mdpi.com/2075-4701/12/7/1205), partono da lì. Nelle PMI di lavorazione, scrivono, il costo del pezzo si stima spesso solo sul materiale, oppure con un'analisi tecnica lunga e non standard. Il tempo di produzione — disegno, programmazione, setup, lavorazione, finitura — è la voce che pesa di più: tariffa dell'operatore, ammortamento della macchina, energia. Il setup, aggiungono, non è sempre definito. Nel loro test su fresatura, lo scostamento medio sui tempi di lavorazione è del **14%** in un caso e del **12%** in un altro. Sulla finitura, nel primo caso, lo scostamento arriva al **−71%**: dipende dal lavoro a mano, e il modello lo prende male.

Non è un dato Frasma e non è la vostra officina. È il motivo per cui la query esiste: il pezzo c'è, il costo no.

## Come si calcola il costo reale di un pezzo

«Software» qui non significa un prodotto con un nome da listino. Significa un percorso con voci distinte e un'uscita controllabile.

La formula è quella dell'officina, non quella del listino. Senza cifre: si sommano.

- **Materiale:** grezzo che si compra o si preleva, con il sovrametallo che usate voi, non il netto del disegno.
- **Tempo macchina:** per ogni operazione, minuti di *quella* macchina per la tariffa di *quella* macchina.
- **Setup:** tempo per preparare, attribuito al lotto, poi spalmato sui pezzi di quel lotto. Se il lotto è uno, il setup sta intero su quel pezzo.
- **Lavorazioni esterne:** trattamento, rettifica, saldatura data fuori. Una riga a parte, agganciata alla commessa.
- **Indiretti:** solo quelli che avete deciso di mettere nella tariffa o a parte. Non un «più qualcosa» a occhio.

In sintesi, per un lotto:

`tempo lotto = (quantità × tempo ciclo) + setup`

`costo pezzo = materiale + (tempi × tariffe) + (setup / quantità) + esterni + indiretti previsti`

Chi chiude il numero deve vedere da dove è nata ogni voce. Se vede solo una cella, il controllo è un secondo calcolo a mano.

Quattro regole che uso.

1. **Si tengono separate le voci.** Materiale, macchina, setup, esterno. Fonderli in un «totale pezzo» perde il pezzo che manca. Se manca il DDT del trattamento, lo stato resta «da verificare». Non si completa a sentimento.
2. **Si usa la tariffa di questa macchina.** Lo stesso particolare su un centro a cinque assi e su un tornio non costa uguale. Una tariffa unica di officina è una media che non descrive nessun pezzo.
3. **Si usa la memoria di questa officina.** Se il codice è già stato lavorato e la revisione torna, la proposta parte dai rapportini, non da un ciclo da catalogo. L'ho fatto così: i minuti tornano?
4. **Una persona conferma.** Poi, se serve, il gestionale riceve il consuntivo. Il gestionale registra. Non inventa il costo.

È la stessa regola di [non collegare un agente in scrittura diretta sull'ERP](/blog/non-collegare-agenti-ai-direttamente-erp), un passo a lato: qui non c'è ancora un movimento di magazzino. C'è un numero che, una volta chiuso, decide se la commessa era in piedi.

Il passaggio tra rapportini, materiale e lavori esterni è il contesto di [Frasma per la manifattura](/manifattura).

## Una proposta di costo non è ancora il costo

La tentazione è chiudere il cerchio: i minuti escono dalla macchina, il costo è pronto. In officina non funziona così, e non deve.

Una proposta può essere sbagliata in modo convincente. Un tempo letto da un ciclo vecchio su una revisione nuova. Un grezzo dimensionato sulla quota esterna, senza il sovrametallo. Un setup contato una volta sola, quando in macchina si è attrezzato due volte. Un lavoro esterno pagato e mai agganciato.

Chi conferma non «revisiona l'intelligenza artificiale». Controlla i fatti che, una volta chiusi, sono già costo:

- il pezzo è quello, con la revisione giusta;
- il materiale e la sezione del grezzo tornano con quanto si è prelevato o comprato;
- i minuti sono di *questa* macchina, non di una tariffa unica;
- setup e lavori esterni sono in riga, o restano «da verificare»;
- i campi incerti restano incerti, non vengono riempiti per chiudere la pratica.

Se il sistema mostra da dove ha preso il numero — il rapportino, la riga di magazzino, la fattura del terzista — il controllo è un confronto. Se mostra solo una cella Excel, il controllo è un secondo foglio.

[Valuta il flusso di calcolo costi in manifattura](/manifattura)

## Il costo calcolato non è il preventivo

L'uscita di questo flusso è un consuntivo, non un'offerta.

Si chiude il costo. Si confronta, se serve, con quanto era stato mandato al cliente. Se i due numeri non tornano, il problema non è «manca un programma». Manca un passaggio: il preventivo è nato a occhio, o il costo ha perso il setup.

Quando il disegno arriva e manca il prezzo da spedire, il lavoro è un altro: tempi proposti, persona che conferma, poi si invia. Sta in [software preventivi lavorazioni meccaniche](/blog/software-preventivi-lavorazioni-meccaniche). Qui si misura un pezzo che si può già fare, o che è già uscito.

I permessi seguono il ruolo. L'automazione legge rapportini, prelievi e fatture già chiuse, prepara la scheda, non cambia listini, non riscrive il preventivo mandato, non crea movimenti da sola. Le eccezioni restano assegnate a qualcuno, non in una conversazione.

Documenti, memoria dei cicli, e una persona che ferma il numero incerto: è il banco descritto in [l'officina intorno al modello](/blog/ai-manifattura-officina-intorno-al-modello).

## Questa settimana

Prendi tre commesse vere, meglio se una è andata via «in pari» e una, a posteriori, era sotto i minuti. Sul tavolo tieni il foglio Excel da cui è uscito il costo, i rapportini se ci sono, e le fatture dei lavori esterni. Segna da dove sono arrivati minuti, materiale, setup. Se una voce è nata a occhio, il problema non è «manca il software». Manca un flusso: proposta, dubbio, conferma, consuntivo.

Se rapportini, prelievi e fatture dei terzisti si copiano ancora a mano tra email, PDF ed Excel, il racconto più vicino — documenti letti, persona che conferma, poi gestionale — è il caso [Documenti ERP e preventivi manifatturieri](/casi/documenti-erp-manifattura).

## FAQ

### Un software di calcolo costi sostituisce chi chiude i consuntivi?

No. Sostituisce il copia-incolla sulle voci già viste e sui campi leggibili. Chi chiude il costo continua a confermare, a recuperare il setup mancante e a decidere cosa entra nella tariffa. La responsabilità del numero che finisce in commessa resta umana.

### Excel può restare il programma costi produzione officina meccanica?

Può restare il registro di lavoro, come per il [magazzino sul foglio](/blog/gestionale-magazzino-excel). Non è la fonte. Un foglio con una tariffa unica e tre versioni sul desktop non è un costo. È una conversazione. Si tiene un registro, si conferma, si importa nel gestionale già in uso.

### I costi finiscono da soli nel gestionale?

No. Il sistema propone voci e totale. Una persona conferma. Poi si importa nel gestionale già in uso, sul tracciato che quel gestionale accetta. Non si apre una scrittura diretta e non si sostituisce Mago, TeamSystem o Danea.

### Cosa si fa se manca il setup o il lavoro esterno?

Si marca «da verificare». Non si completa a indovinare. Il rapportino, il prelievo e, se c'è, la fattura del terzista restano agganciati alla riga, così chi controlla vede la fonte.

### Da dove si parte, in pratica?

Da un insieme piccolo di commesse reali e dall'elenco di ciò che già mettete nel costo: materiale, operazioni, minuti, setup, esterni. Si misura cosa la proposta ricostruisce e cosa no. Si tiene la persona nel punto di conferma. Si decide se allargare. Il contesto operativo è [Frasma per la manifattura](/manifattura); i percorsi di servizio stanno in [servizi](/servizi).

Se in ufficio i costi si digitano ancora a mano dai rapportini, si può partire da lì: poche commesse, le voci giuste, una persona che conferma prima del consuntivo.

[Valuta il flusso di calcolo costi in manifattura](/manifattura)

---

**Fonti:** Silva, Sousa, Pinto, Ferreira, Pereira, *Build-Up an Economical Tool for Machining Operations Cost Estimation*, Metals 12(7):1205, 2022, <https://www.mdpi.com/2075-4701/12/7/1205>. Il paper valida uno strumento di stima tempi e costo su fresatura, in un contesto di PMI, confrontando i tempi stimati con quelli reali. Non è un dato della vostra officina. In caso di differenza tra questo articolo e il testo originale, prevale il paper.

**Autore:** Francesco Saverio Mazzi — Frasma
