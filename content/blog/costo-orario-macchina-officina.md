---
slug: costo-orario-macchina-officina
title: "Costo orario macchina officina: ammortamento, ore produttive e setup"
seoTitle: "Costo orario macchina officina e CNC | Frasma"
seoDescription: "Come calcolare il costo orario di macchina utensile o CNC: voci, ore produttive, setup e tariffa per centro. Excel o gestionale, senza tariffa unica a sentimento."
excerpt: "Il costo orario macchina non è un listino: si sommano ammortamento, energia, manutenzione e spazio, e si divide per ore produttive reali."
coverImage: /images/blog/cover-costo-orario-macchina-officina.png
publishedAt: "2026-11-26"
updatedAt: "2026-11-26"
tags:
  - intelligenza-artificiale
  - manifattura
  - excel
  - erp
status: published
---

Chi cerca **costo orario macchina officina**, **costo orario macchina utensile**, **costo orario macchina CNC** o un foglio **calcolo costo orario macchinari excel** non sta chiedendo il prezzo da mandare al cliente. Sta chiedendo quanto costa tenere accesa *questa* macchina per un'ora che conta in produzione. Quella cifra alimenta preventivi, consuntivi e confronti tra centri di lavoro. Se resta una tariffa unica sull'intera officina, i pezzi semplici e quelli sul CNC caro sembrano uguali sul foglio.

Questa guida spiega **come si calcola il costo orario di una macchina**, voce per voce, con formule solo in variabili. Nessun importo inventato: i numeri li mettete voi dai contratti e dai libri contabili.

Non è [software calcolo costi produzione officina](/blog/software-calcolo-costi-produzione-officina): lì si chiude il consuntivo del pezzo (materiale, minuti, setup, esterni). Qui si costruisce la **tariffa oraria del centro di lavoro** che moltiplica quei minuti.

Non è [dove si perde margine per commessa](/blog/costi-nascosti-commessa-officina-metalmeccanica): lì si confrontano preventivo e consuntivo. Qui si capisce se la tariffa che usate in quel confronto è fondata.

Non è [preventivo da disegno](/blog/software-preventivi-lavorazioni-meccaniche) né [piano commesse e carico](/blog/software-gestione-produzione-meccanica). Il costo orario macchina sta a monte: senza una tariffa per centro, i minuti preventivati partono da una media che non descrive nessuna macchina.

## Cosa si intende per costo orario macchina

In officina meccanica il **costo orario macchina** è il costo variabile e fisso di far girare un centro di lavoro per un'ora **imputabile al lavoro**. Si usa per moltiplicare i minuti di ciclo e di setup nei fogli costo e nelle offerte interne.

Due parole che confondono le conversazioni.

**Macchina sola** versus **posto di lavoro completo.** Il tornio ha ammortamento e consumi. L'operatore può stare nella tariffa macchina oppure in una riga a parte. La scelta va fatta una volta e tenuta uguale su tutti i centri, altrimenti due fogli non si sommano.

**Costo orario** versus **prezzo orario al cliente.** Il costo è interno. Il prezzo include margine, urgenza, complessità commerciale. Mescolarli in una sola cella Excel impedisce di vedere se il margine è sul listino o sul consuntivo.

## Le voci da mettere nel calcolo

Per ogni macchina o gruppo omogeneo (stesso CNC, stesso piano di ammortamento) si raccolgono i costi **annui** che volete imputare a quella risorsa. Poi si dividono per le **ore produttive** dell'anno. I nomi cambiano tra uffici; le categorie restano queste.

**Ammortamento del bene** (o quota canone leasing), coerente con il piano contabile. Variabile tipica: `A_ammortamento_annuo`.

**Energia e fluidi** legati al centro: corrente, aria compressa imputabile, oli per la macchina se li segregate. `A_energia_annuo`.

**Manutenzione** programmata e straordinaria attribuibile al centro, non il garage generico del reparto. `A_manutenzione_annuo`.

**Utensili e consumabili** se li mandate a quel centro e non al materiale del pezzo. Molte officine li tengono fuori dalla tariffa macchina e li mettono a consuntivo sul pezzo: va deciso e scritto. `A_utensili_annuo`.

**Spazio e spese generali** se ripartite per metro quadro o per numero macchine: affitto, assicurazioni, parte della struttura. Solo la quota che avete esplicitamente deciso di caricare sulla macchina, non tutto l'ammortamento dell'officina a sentimento. `A_spazio_SG_annuo`.

**Operatore.** Opzione A: fuori dalla tariffa macchina; si contano le ore uomo a parte con la relativa `tariffa_operatore`. Opzione B: dentro, se il centro è quasi sempre presidiato da un addetto dedicato e volete un unico moltiplicatore. `A_operatore_annuo` se incluso.

Costi annui della macchina:

`C_annuo_macchina = A_ammortamento_annuo + A_energia_annuo + A_manutenzione_annuo + A_utensili_annuo + A_spazio_SG_annuo + A_operatore_annuo`

(`A_operatore_annuo` vale zero se l'operatore è escluso.)

## Ore produttive, ore teoriche e saturazione

L'errore classico nel **calcolo costo orario macchinari excel** è dividere per le ore di calendario (otto ore al giorno, cinque giorni, cinquantadue settimane) e chiamarle produttive. Il reparto ha pause, cambi turno, fermi non pianificati, lotti che non partono.

Definite per ogni centro:

`H_teoriche_annue`: ore disponibili secondo calendario macchina.

`H_produttive_annue`: ore in cui la macchina lavora commesse imputabili, al netto delle fermate che escludete dalla base (o che caricate altrove).

Saturazione:

`saturazione = H_produttive_annue / H_teoriche_annue`

Costo orario sulla base produttiva:

`costo_orario_macchina = C_annuo_macchina / H_produttive_annue`

Se usate `H_teoriche_annue` al posto di `H_produttive_annue`, il costo orario risulta **più basso** del reale: ogni minuto in macchina sembra costare meno, finché il consuntivo non dice il contrario.

Tre regole pratiche.

1. **Una sola definizione di ora produttiva** per tutti i centri dello stesso foglio.
2. **Rivedere `H_produttive_annue` almeno una volta l'anno** con i dati che avete: rapportini, export macchina, MES leggero. Non serve precisione al decimo; serve non usare un calendario ideale se la macchina ferma ogni pomeriggio.
3. **Non confondere ore programma CN con ore fattura.** Il programma gira; la commessa conta quando il pezzo avanza.

## Come trattare il costo di setup

Il **costo di setup** (attrezzaggio, primo pezzo, cambio utensili, riferimenti) può entrare nel costo orario in due modi coerenti. Mescolarli sullo stesso lotto è il modo per perdere il confronto preventivo/consuntivo.

**Tariffa setup a parte.** Si contano le ore di setup e si moltiplicano per `costo_orario_macchina` (o per una tariffa setup dedicata se i costi fissi dell'attrezzaggio sono diversi). Poi:

`costo_setup_lotto = ore_setup × costo_orario_setup`

**Setup spalmato sul lotto.** Si calcola il costo setup come sopra e si divide per la quantità:

`costo_setup_per_pezzo = costo_setup_lotto / quantità_lotto`

In entrambi i casi il setup **non** va nascosto dentro la tariffa oraria «normale» se in officina lo contate a parte nei rapportini. Se è una riga, resta una riga. Il tema del riparto è affine al consuntivo pezzo in [calcolo costi produzione officina](/blog/software-calcolo-costi-produzione-officina); qui conta la regola: **stessa formula in preventivo interno e nel foglio tariffe**.

Per la carpenteria leggera o il montaggio, le ore setup sono spesso saldature e allestimenti: la logica è la stessa, anche se il centro non è un CNC. Per il contesto preventivo in quella filiera, vedi [software preventivi carpenteria metallica](/blog/software-preventivi-carpenteria-metallica).

[Valuta tariffe macchina e flusso consuntivo in manifattura](/manifattura)

## Una tariffa per macchina o tariffa unica d'officina

Una **tariffa unica d'officina** è una media. Va bene per una stima rapida in ufficio, non per capire se un pezzo vive sul tornio o sul centro a cinque assi.

| Approccio | Quando ha senso | Rischio |
| --- | --- | --- |
| Tariffa per macchina / centro | Consuntivo, preventivo interno, confronto margini | Più righe da aggiornare |
| Tariffa unica | Ordine di grandezza, commesse ripetitive omogenee | Pezzi facili «sovrapagati» e pezzi pesanti sul CNC sottostimati |

Se oggi avete una sola cella «tariffa officina», il passo minimo è **duplicare il foglio per ogni centro che conta** e portare la stessa struttura di voci. Non serve un gestionale nuovo; serve non mediare macchine che costano strutturalmente diversi.

Il **costo orario macchina utensile** di un centro CNC con pallet e misura in macchina non è confrontabile con quello di un trapano a colonna senza forzare i numeri: le voci `A_*` cambiano, e spesso anche `H_produttive_annue`.

## Tenere aggiornato il costo orario

Un foglio **calcolo costo orario macchinari excel** che resta fermo tre anni mente più di una tabella vuota.

**Trigger di revisione.**

- Cambio macchina, upgrade CN, nuovo canone leasing.
- Contratto energia o manutenzione che si sposta in modo visibile.
- Saturazione che si discosta a lungo da quella ipotizzata (`saturazione` sistematicamente sopra o sotto la stima usata nel divisore).
- Dopo un giro di consuntivi che mostra scostamenti ripetuti su *un solo* centro (il colpevole spesso è la tariffa, non il ciclo).

**Versione e data sul foglio.** Nome del file non basta: una riga «valido dal …» e chi ha approvato. Così un preventivo vecchio si spiega.

**Collegamento al gestionale.** Se l'ERP accetta listini costo per centro di lavoro, l'export è una copia controllata del foglio, non la fonte primaria. La fonte resta il calcolo con le voci visibili.

## Excel o gestionale: dove vive la tariffa

**Excel** resta lo strumento più usato per il **calcolo costo orario macchinari excel**: colonne chiare, una scheda per macchina, formule che mostrano `C_annuo_macchina` e `H_produttive_annue`. Può restare il registro di lavoro, come nel [magazzino sul foglio](/blog/gestionale-magazzino-excel), a patto che non si moltiplichino tre versioni salvate sul desktop.

**Gestionale** ha senso quando le tariffe devono alimentare ordini, distinte, consuntivi e magazzino senza ricopiare. Il modulo costi non sostituisce le voci: se nel gestionale compare una tariffa senza storia, il controllo torna a mano.

In entrambi i casi una persona dell'ufficio tecnico o della direzione **conferma** la tariffa prima che finisca nei preventivi. Nessun sistema inventa `H_produttive_annue` al posto vostro.

Il passaggio da tariffa a consuntivo commessa e da lì al margine è descritto nei post collegati sopra. Qui il lavoro è: **tariffa giusta per centro**, poi minuti veri.

## Questa settimana

Scegliete un centro che pesa sul fatturato: CNC, tornio o centro di lavoro. Aprite il foglio tariffe che usate oggi. Annotate se è unica o per macchina. Elencate le voci `A_*` che già conoscete e quali mancano. Stimate `H_produttive_annue` con gli ultimi dodici mesi di rapportini o export, anche grossolanamente. Ricalcolate `costo_orario_macchina` con la formula sopra. Confrontate con la tariffa in uso: se lo scostamento è grande, il problema non è «manca l'ERP». È la base del divisore o una voce dimenticata.

Se il passo successivo è mettere insieme materiale, minuti e setup sul pezzo, andate a [software calcolo costi produzione officina](/blog/software-calcolo-costi-produzione-officina). Se il dubbio è il margine commessa, partite da [costi nascosti per commessa](/blog/costi-nascosti-commessa-officina-metalmeccanica).

## FAQ

### Il costo orario include sempre l'operatore?

No. È una scelta di modello. Se l'operatore è escluso, moltiplicate le ore uomo per `tariffa_operatore` a parte. Se è incluso, `A_operatore_annuo` entra in `C_annuo_macchina` e non ricalcolate le ore uomo due volte sullo stesso minuto.

### Posso usare le ore teoriche invece di quelle produttive?

Potete, ma sottostimate `costo_orario_macchina` e sovrastimate il margine su ogni minuto. Meglio abbassare `H_produttive_annue` con dati reali che tenere un calendario ideale.

### Setup nella tariffa oraria o a parte?

O setup esplicito con `ore_setup`, o inclusione consapeole nella tariffa *solo* se non lo tracciate mai a parte. In preventivo e consuntivo la stessa regola.

### Excel basta per sempre?

Basta finché una persona controlla versioni e voci. Quando le tariffe devono alimentare gestionale e reparto senza errori di copia, conviene un export tracciato. Il calcolo resta uguale; cambia dove vive il numero approvato.

### Cosa c'entra con il preventivo al cliente?

Il preventivo usa tempi e tariffe (o prezzi di vendita derivati). Il costo orario macchina è il lato interno. Multiplicare minuti per una tariffa unica senza questo passaggio è il motivo per cui [preventivi lavorazioni meccaniche](/blog/software-preventivi-lavorazioni-meccaniche) e consuntivo non si parlano.

Da un elenco piccolo di centri e delle voci che già pagate: si misura se la tariffa in uso è aggiornata o se il consuntivo ha sempre torto sulla stessa macchina. Il contesto operativo è [Frasma per la manifattura](/manifattura); i percorsi di servizio stanno in [servizi](/servizi).

[Valuta tariffe macchina e consuntivo in manifattura](/manifattura)

---

**Fonti:** Silva, Sousa, Pinto, Ferreira, Pereira, *Build-Up an Economical Tool for Machining Operations Cost Estimation*, Metals 12(7):1205, 2022, <https://www.mdpi.com/2075-4701/12/7/1205>. Il paper tratta la stima dei costi di lavorazione in PMI, con enfasi su tempi e componenti di costo macchina. Non sostituisce il vostro piano ammortamenti. In caso di differenza tra questo articolo e il testo originale, prevale il paper.

**Autore:** Francesco Saverio Mazzi, Frasma