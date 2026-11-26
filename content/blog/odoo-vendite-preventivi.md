---
slug: odoo-vendite-preventivi
title: "Odoo preventivi in manifattura: dal disegno alla bozza, poi nel modulo Vendite"
seoTitle: "Odoo preventivi e vendite in manifattura | Frasma"
seoDescription: "Richiesta, PDF, disegno: bozza di preventivo con conferma umana, poi registrazione in Odoo Sales (preventivi, ordini, listini). Cosa resta alle persone."
excerpt: "Odoo registra preventivi e ordini: il prezzo da disegno nasce prima, con proposta ed eccezioni visibili. Poi l'export verso il modulo Vendite, dopo conferma."
coverImage: /images/blog/cover-odoo-vendite-preventivi.png
publishedAt: "2026-11-26"
updatedAt: "2026-11-26"
tags:
  - intelligenza-artificiale
  - manifattura
  - erp
status: published
---

Chi cerca **odoo preventivi** in una PMI manifatturiera di solito ha già due mondi separati. Da una parte email, PDF e disegni: lì si decidono tempi, materiale e prezzo. Dall'altra il modulo **Vendite** di Odoo: lì vivono preventivi, ordini di vendita, prodotti e listini. Il salto tra i due oggi è copia-incolla, righe riscritte a mano, codici articolo inventati sulla lettera del cliente.

Questa guida parla del pezzo in mezzo: una bozza controllata da ufficio tecnico e commerciale, poi la registrazione in Odoo. Non sostituiamo Odoo. Non sostituiamo CAD o Inventor. L'export si definisce sul tracciato reale del cliente, come per qualsiasi altro gestionale già in uso.

Se il problema è solo «come si fa un preventivo in Odoo», la [documentazione ufficiale sulle quotation](https://www.odoo.com/documentation/18.0/applications/sales/sales/sales_quotations.html) basta. Se il problema è **preventivo da disegno in odoo**, manca quasi sempre il passaggio prima del gestionale.

## Cosa fa il modulo Vendite di Odoo (solo ciò che dice la documentazione)

Secondo la documentazione Odoo 18, l'app **Sales** gestisce il processo di vendita **dal preventivo all'ordine di vendita**, fino a consegna e fatturazione del venduto.

Il flusso descritto è sequenziale:

1. **Preventivo (quotation):** proposta al cliente con prodotti e prezzi.
2. **Ordine di vendita (sales order):** si crea quando il cliente accetta il preventivo e conferma la vendita.
3. **Consegna** (se applicabile): spedizione prodotti o erogazione servizi.
4. **Fattura:** documento finale collegato all'ordine o a quanto consegnato.
5. **Pagamento:** chiusura del ciclo.

Un preventivo di vendita, nella documentazione, è un documento inviato al cliente con **costi stimati e condizioni** per beni e servizi. Una volta accettato, può diventare ordine di vendita.

La documentazione elenca anche i componenti tipici di un preventivo strutturato: numero e data, dati cliente e indirizzi, **elenco prodotti e servizi** con quantità e prezzo unitario, **termini di pagamento e listini**, eventuali sconti sulle righe, totali e valuta. Nel modulo Vendite si possono usare modelli di preventivo, varianti prodotto sulle righe, scadenze e altre opzioni descritte nella stessa sezione Sales.

Odoo può generare preventivi anche da CRM, Helpdesk o Abbonamenti. In officina il caso più comune resta comunque: richiesta con disegno, prezzo costruito fuori, poi riga su preventivo Odoo.

Questa guida **non** copre distinte base, manifattura o magazzino in Odoo. Sono percorsi distinti nel gestionale.

## Dove si rompe il flusso in officina

La richiesta del cliente arriva come email, PDF o disegno. Qualcuno apre l'allegato, stima operazioni e materiale, scrive il prezzo su Excel o su una scheda interna. Solo dopo, se il cliente dice sì, compare una riga in Odoo: prodotto, quantità, prezzo, listino.

Due punti delicati.

**Prima di Odoo:** il disegno non è un codice articolo. La revisione, il grezzo, i minuti macchina e le lavorazioni esterne stanno nel disegno e nella memoria dell'officina, non nel catalogo prodotti.

**Dentro Odoo:** il modulo Vendite vuole prodotti, listini e righe coerenti. Se il prezzo nasce a occhio sul foglio, l'ordine di vendita registra quel numero senza che nessuno abbia chiuso i dubbi sul disegno.

Per il pezzo tornitura e fresatura da PDF, DXF o STEP c'è la guida [software preventivi lavorazioni meccaniche](/blog/software-preventivi-lavorazioni-meccaniche). Per carpenteria: [software preventivi carpenteria metallica](/blog/software-preventivi-carpenteria-metallica). Qui il filo è **odoo vendite manifattura**: come far atterrare una bozza già controllata nel posto giusto del gestionale, senza agenti che scrivono da soli.

## Proposta, eccezione visibile, conferma umana, poi Odoo

Il modo di lavorare che usiamo in Frasma non mette il modello dentro Odoo con permessi di scrittura. Segue la stessa regola degli altri ERP: [non collegare gli agenti AI direttamente all'ERP](/blog/non-collegare-agenti-ai-direttamente-erp).

1. **Ingresso documenti.** Email, PDF, disegno. L'AI legge e struttura ciò che è leggibile: quote, materiale indicato, quantità richieste, riferimenti cliente. Non inventa il ciclo.
2. **Proposta di scheda.** Tempi, materiale, lavorazioni, prezzo per *questa* officina. I campi incerti restano in stato «da verificare», visibili. Non si completa a sentimento.
3. **Conferma umana.** Ufficio tecnico o commerciale confronta la proposta con il disegno e con i listini interni. Corregge. Solo allora la scheda è «pronta per il gestionale».
4. **Export tracciato verso Odoo.** Righe preventivo con prodotti o servizi, quantità, prezzi, listino dove serve. Il tracciato segue quello che il cliente usa davvero: import file, API, o passaggio manuale guidato sullo stesso layout. Non promettiamo un connettore universale.

La web app operativa resta il banco di lavoro. Odoo resta il sistema di registrazione vendite. Il [calcolo dei costi di produzione](/blog/software-calcolo-costi-produzione-officina) resta un altro passo: consuntivo dopo, non confondere costo interno e riga di preventivo al cliente.

[Valuta il flusso preventivi in manifattura](/manifattura)

## Cosa registra Odoo dopo la conferma

Quando la bozza è chiusa da una persona, ha senso aprire o aggiornare un **preventivo** nell'app Sales, come descritto nella documentazione: righe articolo o servizio, condizioni, totali. Se il cliente accetta, il preventivo diventa **ordine di vendita** nel flusso standard Odoo, poi consegna e fattura se il perimetro lo prevede.

Sul lato anagrafica, la documentazione collega preventivi e ordini a **prodotti** e **listini** (sezione Products & Prices dell'app Sales). In manifattura spesso significa: codici commessa, profili, lavorazioni a quantità o a ore, listini cliente. Frasma non crea quel catalogo al posto vostro. Prepara righe coerenti con ciò che avete già in Odoo, dopo la conferma.

Cosa **non** fa un agente nel nostro perimetro:

- non invia il preventivo al cliente senza una persona;
- non conferma l'ordine di vendita al posto del commerciale;
- non modifica listini o anagrafiche in autonomia;
- non sostituisce il disegno o il CAM.

Le eccezioni (materiale ambiguo, revisione mancante, quantità non chiara) restano assegnate a qualcuno, non in una chat.

## Cosa resta in mano alle persone

Il gestionale non «capisce» il disegno. Capisce righe, prezzi e stati. Per questo il controllo umano non è decorazione.

Chi conferma verifica i fatti che, una volta in Odoo, diventano impegno commerciale:

- il riferimento cliente e la revisione del pezzo sono quelli giusti;
- materiale e lavorazioni corrispondono a ciò che si può produrre;
- il prezzo riflette listini e margini che avete deciso voi;
- ogni campo ancora dubbio resta visibile, non viene nascosto per chiudere la pratica.

La diagnosi iniziale con Frasma **non produce automaticamente un preventivo definitivo**. Serve a capire volumi, sistemi e chi valida, prima di definire il perimetro dell'export.

## Questa settimana

Prendi una richiesta di offerta recente con allegato tecnico e il preventivo Odoo (o la bozza Excel) da cui è nato. Mettili affiancati. Segna riga per riga: cosa è nato dal disegno, cosa è stato digitato due volte, dove un codice prodotto non esisteva ancora in anagrafica. Se ogni campo incerto è stato chiuso a voce, manca il passaggio «eccezione visibile» prima del modulo Vendite.

## FAQ

### Frasma sostituisce Odoo o il CAD?

No. Odoo resta il gestionale vendite. Inventor, SolidWorks, AutoCAD o Bystronic restano dove sono. Frasma lavora sul passaggio documenti, bozza e export controllato.

### L'AI scrive direttamente nei preventivi Odoo?

No. Legge, propone, segnala i dubbi. Una persona conferma. Poi si importa o si registra sul tracciato concordato. Stessa regola degli altri ERP.

### Basta il listino prodotti Odoo per quotare da disegno?

Il listino in Odoo gestisce prezzi e regole sul catalogo, come nella documentazione Sales. Il preventivo da disegno chiede tempi e materiale dal PDF o dal modello 3D prima di scegliere la riga giusta. Le guide su [lavorazioni meccaniche](/blog/software-preventivi-lavorazioni-meccaniche) e [carpenteria metallica](/blog/software-preventivi-carpenteria-metallica) stanno su quel lato.

### Preventivo Odoo e costo di produzione sono la stessa cosa?

No. Il preventivo al cliente è una riga commerciale. Il costo reale (ore, setup, materiale) si ricostruisce a parte. Vedi [software calcolo costi produzione officina](/blog/software-calcolo-costi-produzione-officina).

### Da dove si parte, in pratica?

Da un campione di richieste reali e dal modo in cui oggi create un preventivo in Odoo: prodotti, servizi, listini, chi conferma. Si mappa il passaggio prima del gestionale. Si definisce l'export sul tracciato reale. Si tiene la persona nel punto di conferma.

Se le offerte nascono ancora tra email, disegni ed Excel e poi finiscono a mano in Odoo Vendite, si può partire da lì.

[Valuta il flusso preventivi in manifattura](/manifattura)

---

**Fonti:** Odoo S.A., documentazione ufficiale 18.0 — [Sales quotations](https://www.odoo.com/documentation/18.0/applications/sales/sales/sales_quotations.html), [Sales (overview)](https://www.odoo.com/documentation/18.0/applications/sales/sales.html). In caso di differenza tra questo articolo e la documentazione Odoo, prevalgono i testi su odoo.com/documentation.

**Autore:** Francesco Saverio Mazzi — Frasma