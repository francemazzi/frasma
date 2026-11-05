---
slug: software-preventivi-carpenteria-metallica
title: "Software preventivi carpenteria metallica: peso, tagli, saldature e ore dal disegno"
seoTitle: "Software preventivi carpenteria metallica | Frasma"
seoDescription: "Dal disegno (DWG, PDF, DXF) a peso, lunghezze di taglio, saldature e ore di montaggio. Cosa serve in carpenteria, e perché una persona conferma prima di mandare il preventivo."
excerpt: "Il preventivo in carpenteria non è un listino sul kg: si ricostruiscono tagli, saldature e montaggio dal disegno, una persona conferma, poi si invia."
coverImage: /images/blog/cover-software-preventivi-carpenteria-metallica.png
publishedAt: "2026-11-05"
updatedAt: "2026-11-05"
tags:
  - intelligenza-artificiale
  - manifattura
  - erp
status: published
---

Arriva una richiesta di offerta per un telaietto, una scala, una struttura in carpenteria leggera o un assieme saldato. In allegato un DWG, a volte un PDF del complessivo, raramente un IFC. Qualcuno apre il disegno, stima a occhio i metri di saldatura, somma i pesi dei profili, aggiunge verniciatura e montaggio su Excel. Poi manda.

Chi cerca un **software preventivi carpenteria metallica** — o **preventivi carpenteria metallica**, o un **preventivo carpenteria metallica** singolo — sta chiedendo questo: togliere il copia-incolla dal disegno, arrivare a peso, tagli, saldature, ore e prezzo, e **non spedire** finché una persona dell'ufficio tecnico o del commerciale non ha detto sì.

Non è un listino al kg che si applica da solo. Non è «l'AI che fa il preventivo». E non è un secondo gestionale. Il gestionale già in uso resta il sistema di registrazione: ordine, commessa, magazzino, fattura. Il preventivo, prima, è un lavoro di officina.

## Cosa si intende per software preventivi carpenteria metallica

La query è commerciale. In carpenteria il lavoro è più stretto.

Serve un flusso che, dal disegno e dalle note, proponga **peso**, **lunghezze di taglio**, **saldature** (metri o ore), **lavorazioni di superficie** se sono in capitolato, **montaggio in officina** e **prezzo** per *questa* carpenteria: i profili che comprate di solito, le tariffe saldatura e verniciatura che usate voi, i telai già quotati in passato. Poi una persona guarda la proposta, corregge, conferma. Solo dopo si invia.

Tre cose che questa guida non è.

Non è il [software preventivi lavorazioni meccaniche](/blog/software-preventivi-lavorazioni-meccaniche). Lì il pezzo è spesso un particolare CNC: tornitura, fresatura, forature, tempi macchina da PDF, DXF o STEP. Qui il centro è **profili, piatti, taglio e saldatura**: carpenteria, non banco utensili.

Non è la [distinta base da AutoCAD](/blog/distinta-base-autocad). Lì si estrae la lista dei blocchi con DATAEXTRACTION, si controlla in Excel, poi si importa in anagrafica. Qui la distinta può essere il punto di partenza, ma l'uscita che manca è **l'offerta**: peso, tagli, saldature, ore, prezzo da mandare al cliente.

Non è il [software calcolo costi produzione officina](/blog/software-calcolo-costi-produzione-officina). Lì il pezzo è già stato fatto, o sta per esserlo, e manca il consuntivo. Qui il cliente aspetta ancora un **preventivo**.

## Il problema in carpenteria: Excel, disegno e ore inventate

Il disegno arriva. Il peso e le saldature no.

Chi quota apre il DWG o il PDF, legge le quote e le note di saldatura, conta a occhio i profili HEA, UPN, piatti e tubi. Il peso spesso nasce da tabelle a mano o da un add-in CAD che nessuno aggiorna. I tagli laser o plasma stanno in testa a chi conosce la macchina. I metri di cordone li stima il capo saldatore. Verniciatura, zincatura e montaggio finiscono in righe generiche sul foglio. Il prezzo è tariffa oraria per le ore immaginate, più il materiale, più un margine. Tutto su Excel con formule di anni fa ed eccezioni dette a voce.

Due errori si pagano dopo, non in chat.

**Peso o saldature sottostimate.** La commessa entra. In officina il materiale e le ore non tornano. Il lavoro è venduto sotto costo.

**Peso o saldature sovrastimate.** Il cliente prende altrove. Il disegno era lo stesso; il prezzo no.

Il motivo per cui la query esiste è semplice: il disegno c'è, il **preventivo carpenteria metallica** no, e ogni RFQ ricomincia da zero.

## Cosa deve fare un flusso dal DWG, dal PDF o dal DXF

«Software» qui non significa un prodotto con un nome da listino. Significa un percorso con ingressi distinti e un'uscita controllabile.

1. **Si tengono separati i file.** Il DWG o il DXF porta geometria, layer, blocchi profilo, quote utili. Il PDF porta note, simboli di saldatura, trattamenti, revisione. Un IFC, quando c'è, porta il modello strutturale ma non sostituisce il capitolato commerciale. Fonderli in un unico «allegato da importare» perde il pezzo che decide il prezzo.
2. **Si propone una scheda, non un riassunto.** Materiale per famiglia (profili, piatti, tubi), peso totale e per voce, lunghezze di taglio, metri di saldatura o ore saldatura, lavorazioni esterne (zincatura, verniciatura), ore di montaggio e allestimento, prezzo. Se un campo manca — simbolo saldatura ambiguo, profilo non in anagrafica, trattamento non scritto — lo stato resta «da verificare». Non si completa a sentimento.
3. **Si usa la memoria di questa carpenteria.** Lo stesso tipo di telaietto l'avete già quotato. Un peso copiato da un listino generico è un peso sbagliato con un bel disegno accanto. Se la commessa è simile e la revisione torna, la proposta parte da lì: l'ho fatto così, cosa cambia?
4. **Una persona conferma.** Poi si scrive l'offerta. Poi, se il cliente accetta, il gestionale riceve ordine e, se serve, distinta e tempi già chiusi.

Quando i particolari esistono già come blocchi nel DWG ma manca ancora la lista per il gestionale, il passaggio di estrazione e controllo sta in [distinta base da AutoCAD](/blog/distinta-base-autocad). Quando invece manca il prezzo su un pezzo meccanico unitario, il riferimento più vicino resta [software preventivi lavorazioni meccaniche](/blog/software-preventivi-lavorazioni-meccaniche).

### Campi che l'ufficio tecnico mette già in offerta

| Voce | Perché conta in carpenteria |
| --- | --- |
| Profilo / spessore | HEA, UPN, tubo, piatto: peso e taglio cambiano |
| Lunghezza taglio | Nesting, sfrido, tempo macchina taglio |
| Peso | Acquisto materiale, trasporto, man handling |
| Saldatura | Metri, tipologia, accessibilità, posizione |
| Trattamenti | Zincatura, verniciatura, sabbiatura se in capitolato |
| Montaggio officina | Assiemaggio, puntature, collaudo |
| Revisione | Stesso disegno, geometria diversa |

Non è un tracciato universale. È l'elenco operativo. Il vostro foglio offerta decide le colonne.

[Valuta il flusso preventivi in manifattura](/manifattura)

## Una proposta di peso, tagli e ore non è ancora un preventivo

La tentazione è chiudere il cerchio: il disegno arriva, l'offerta esce. In carpenteria non funziona così, e non deve.

Una proposta può essere sbagliata in modo convincente. Un profilo contato due volte perché compare su due tavole. Un cordone indicato sul PDF ma non saldabile in quella posizione. Un peso netto senza sfrido di taglio. Verniciatura dimenticata perché era solo in nota a piè di tavola.

Chi conferma non «revisiona l'intelligenza artificiale». Controlla i fatti che, una volta spediti, sono già prezzo:

- il disegno è quello, con la revisione giusta;
- i profili e gli spessori tornano con quanto comprate o avete in magazzino;
- peso e tagli sono coerenti con la geometria, non con una tabella generica;
- saldature e montaggio sono di *questa* officina, non di un listino standard;
- i campi incerti restano incerti, non vengono riempiti per chiudere la pratica.

Se il sistema mostra da dove ha preso il numero — la riga del DWG, la commessa precedente, la nota sul PDF — il controllo è un confronto. Se mostra solo una cella Excel, il controllo è un secondo preventivo a mano.

È la stessa regola di [non collegare un agente in scrittura diretta sull'ERP](/blog/non-collegare-agenti-ai-direttamente-erp), un passo prima: qui non c'è ancora un movimento di magazzino. C'è una cifra che, una volta partita, è già un impegno.

## Chi conferma, poi si invia

L'uscita del flusso è un'offerta, non un movimento nel gestionale.

Si scrive il preventivo. Si manda. Se il cliente accetta, allora sì: ordine, commessa, distinta se serve, tempi verso Mago, TeamSystem, Danea o quello che già usate. Il gestionale registra. Non inventa il prezzo.

I permessi seguono il ruolo. L'automazione legge disegni e commesse già chiuse, prepara la scheda, non spedisce email al cliente, non cambia listini, non crea l'ordine da sola. Le eccezioni restano assegnate a qualcuno, non in una conversazione.

Quando il cliente manda solo l'assieme e i particolari non esistono ancora, il lavoro è un altro: scomporre e creare i codici. Sta in [la distinta da un disegno non è un carico](/blog/distinta-da-disegno-non-e-un-carico). Qui si quota una carpenteria che si può già leggere e fare.

Documenti, memoria delle commesse, e una persona che ferma il numero incerto: è il banco descritto in [l'officina intorno al modello](/blog/ai-manifattura-officina-intorno-al-modello).

## Questa settimana

Prendi tre richieste di offerta vere in carpenteria, meglio se una è andata via in ritardo e una è stata venduta sotto le ore reali di saldatura o montaggio. Sul tavolo tieni il disegno, il foglio Excel da cui è uscito il prezzo, e i rapportini se la commessa è già stata fatta. Segna da dove sono arrivati peso, tagli e saldature. Se la cifra è nata a occhio, il problema non è «manca il software». Manca un flusso: proposta, dubbio, conferma, invio.

Se disegni, schede e preventivi si copiano ancora a mano tra email, DWG ed Excel, il racconto più vicino — documenti letti, persona che conferma, poi gestionale — è il caso [Documenti ERP e preventivi manifatturieri](/casi/documenti-erp-manifattura).

## FAQ

### Un software di preventivi sostituisce chi fa le offerte in carpenteria?

No. Sostituisce il copia-incolla sui telai già visti e sui campi leggibili dal disegno. Chi quota continua a confermare, a gestire le eccezioni e a decidere il margine. La responsabilità del prezzo mandato al cliente resta umana.

### Si può partire da DWG, PDF e DXF insieme?

Sì, tenendoli separati. Il DWG o il DXF porta profili e geometria. Il PDF porta note, saldature e trattamenti. Trattarli come un unico file «da importare» butta via la parte che decide taglio e saldatura. Si prova sui *vostri* disegni, non si promette lo stesso risultato su un PDF rasterizzato e su un DWG pulito.

### I prezzi finiscono da soli nel gestionale o in mail al cliente?

No. Il sistema propone peso, tagli, saldature, ore e prezzo. Una persona conferma. Poi si scrive l'offerta. Se il lavoro viene accettato, si importa nel gestionale già in uso, sul tracciato che quel gestionale accetta. Non si apre una scrittura diretta e non si sostituisce Mago, TeamSystem o Danea.

### Cosa si fa se peso, saldatura o trattamento non sono chiari?

Si marca «da verificare». Non si completa a indovinare. Il disegno e, se c'è, la commessa precedente restano agganciati alla riga, così chi controlla vede la fonte.

### Da dove si parte, in pratica?

Da un insieme piccolo di richieste reali e dall'elenco di ciò che già mettete in offerta: materiale, peso, tagli, saldature, montaggio, prezzo. Si misura cosa la proposta ricostruisce e cosa no. Si tiene la persona nel punto di conferma. Si decide se allargare. Il contesto operativo è [Frasma per la manifattura](/manifattura); i percorsi di servizio stanno in [servizi](/servizi).

Se in ufficio i preventivi in carpenteria si digitano ancora a mano dal disegno, si può partire da lì: poche commesse, i campi giusti, una persona che conferma prima dell'invio.

[Valuta il flusso preventivi in manifattura](/manifattura)

---

**Fonti:** ISO, *ISO 2553:2019 — Welding and allied processes — Symbolic representation on drawings — Welded joints*, <https://www.iso.org/standard/72746.html>. Autodesk, *DATAEXTRACTION (Command)*, AutoCAD 2026 Help (estrazione blocchi e attributi da DWG verso tabella o Excel, passo utile quando la distinta alimenta il preventivo). [https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-5A39FFE8-10AC-4AE5-8EF4-D097C8261D1A.htm](https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-5A39FFE8-10AC-4AE5-8EF4-D097C8261D1A.htm). In caso di differenza tra questo articolo, la norma ISO e l'help Autodesk, prevalgono i testi originali.

**Autore:** Francesco Saverio Mazzi — Frasma
