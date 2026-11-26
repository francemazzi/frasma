---
slug: odoo-produzione-distinta-base
title: "Odoo produzione e distinta base: da CAD a MRP con controllo prima del carico"
seoTitle: "Odoo MRP distinta base: da CAD e Excel a Produzione | Frasma"
seoDescription: "Come Odoo Manufacturing usa distinte base e operazioni, e come portarci codici e quantità da Inventor o AutoCAD dopo controllo umano, sul tracciato reale."
excerpt: "In Odoo la distinta base vive in Manufacturing. Dal DWG o da Inventor serve un registro, revisioni e quantità controllate, poi l'import sul tracciato che Odoo accetta."
coverImage: /images/blog/cover-odoo-produzione-distinta-base.png
publishedAt: "2026-11-26"
updatedAt: "2026-11-26"
tags:
  - intelligenza-artificiale
  - manifattura
  - erp
  - excel
status: published
---

In ufficio tecnico avete il modello in Inventor, o il DWG con i blocchi compilati. In contabilità e in magazzino gira **Odoo**. La ricerca che compare spesso è concreta: **odoo mrp distinta base**, oppure **odoo produzione** quando si parla di ordini di fabbricazione, oppure **distinta base da CAD in odoo** quando il disegno è la fonte e il gestionale deve ricevere componenti, quantità e, se serve, le operazioni.

Non è lo stesso tema dei DDT in entrata, dei preventivi commerciali o del magazzino sul foglio. Qui il punto è il modulo **Produzione** di Odoo e il passaggio dalla lista che esce dal CAD alla **distinta base** e alle **operazioni** che Odoo usa sugli ordini di fabbricazione.

La tentazione è trattare l'export come un import. Si lancia un'estrazione, esce un Excel, qualcuno clicca «importa» in Odoo. Il foglio non è ancora una distinta nel gestionale, e Odoo non indovina codici e revisioni al posto dell'ufficio tecnico.

## Cosa fa Odoo in Manufacturing, in sintesi

La documentazione ufficiale Odoo descrive la **distinta base** (bill of materials, BoM) come l'elenco dei componenti e delle quantità servono per produrre o riparare un prodotto. In Odoo le BoM sono il «progetto» del prodotto finito: componenti, eventuali operazioni e istruzioni passo passo.

Per creare una BoM si va in **Manufacturing app → Products → Bills of Materials** e si apre **New**. Si sceglie il **Product**, opzionalmente la variante, la **Quantity** prodotta con quella BoM, un **Reference** se servono più BoM per lo stesso articolo (per esempio due configurazioni hardware), e il **BoM Type** *Manufacture this product*. Nel tab **Components** si aggiungono le righe componente; nel tab **Operations** si descrivono le fasi, se è attiva la funzione **Work Orders** in **Manufacturing → Configuration → Settings**.

Quando si crea un **manufacturing order** (MO), Odoo precompila la BoM collegata al prodotto. Se esistono più BoM, si può scegliere quale usare sul MO. Per prodotti con assiemi annidati, la guida sulle **multilevel BoMs** spiega come una sotto-distinta alimenta un prodotto di livello superiore, con regole di approvvigionamento o percorsi MTO/Manufacture.

Per la pianificazione a livello MRP, Odoo offre anche il **Master Production Schedule**: suggerisce quantità da riapprovvigionare in base a forecast e obiettivi di stock, ma **non crea da solo** ordini di acquisto o di produzione. La conferma e la creazione dei MO restano un passaggio esplicito.

Queste definizioni vengono dalla documentazione Odoo su [Bill of materials](https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing/basic_setup/bill_configuration.html), [One-step manufacturing](https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing/basic_setup/one_step_manufacturing.html), [Multilevel BoMs](https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing/advanced_configuration/sub_assemblies.html) e [Master production schedule](https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing/workflows/use_mps.html). Non cito numeri di versione installata in azienda: quel dettaglio va verificato sul vostro Odoo.

Quello che Odoo **non** fa da solo è leggere il DWG, capire la revisione del cartiglio o decidere se un codice cliente coincide con un articolo di magazzino. Quello resta fuori dal modulo Manufacturing.

## Da Inventor, AutoCAD o Excel: stesso lavoro, arrivo diverso

Il disegno resta la fonte. Inventor e AutoCAD non si sostituiscono. Odoo non si sostituisce. L'export verso Odoo si definisce sul **tracciato reale** del cliente: quali colonne, quali codici prodotto, come mappare assiemi e componenti, se le operazioni si caricano insieme alla BoM o in un secondo momento.

Il caso più stretto, DWG con blocchi e attributi, è quello di [distinta base da AutoCAD](/blog/distinta-base-autocad): DATAEXTRACTION verso XLSX o CSV, controllo in Excel, conferma umana. Da Inventor la lista può uscire da struttura del modello o da un foglio già esportato: la regola non cambia. Excel è il **registro di controllo**, non l'arrivo in Odoo.

Quando il cliente manda solo l'assieme e i particolari non ci sono ancora, il lavoro è un altro: [la distinta da un disegno non è un carico](/blog/distinta-da-disegno-non-e-un-carico). Quando mancano tolleranze, revisione e ciclo nel file 3D, il pezzo è [ciclo e revisione non escono dallo STEP](/blog/ciclo-e-revisione-non-escono-dallo-step). Prima di parlare di BoM in Odoo, quelle lacune vanno chiuse in ufficio tecnico, non al momento dell'import.

Per **pianificazione commesse e carico macchine** dopo che la distinta esiste, il quadro operativo è in [software gestione produzione meccanica](/blog/software-gestione-produzione-meccanica). Odoo può ospitare MO e work order; il reparto però deve vedere eccezioni e stati, non solo un flag in anagrafica.

[Valuta il passaggio da CAD a distinta e Odoo in produzione](/manifattura)

## Controllo codici, revisioni e quantità prima del carico

In Odoo ogni riga BoM punta a un **product** esistente (o da creare con attenzione). Se l'estrazione CAD porta un codice che non esiste in anagrafica, o porta la stessa quantità sbagliata perché *Combine Identical Rows* ha fuso due varianti, l'errore entra in produzione e in magazzino.

Il foglio di controllo che usiamo in Frasma segue lo stesso principio dei documenti in ingresso: ogni riga ha fonte, stato, eccezioni visibili. Campi tipici:

| Campo | Perché serve prima di Odoo |
| --- | --- |
| Codice articolo Odoo / codice interno | Deve esistere o essere creato con regola chiara |
| Quantità per unità di prodotto finito | Allineata alla Quantity della BoM |
| Unità di misura | pz, kg, m: non decorazione |
| Revisione disegno | Se c'è nel CAD; se non c'è, non si deduce dal nome file |
| Riferimento BoM | Utile quando convivono più distinte sullo stesso PF |
| Stato verifica | Completo, da controllare, codice assente, revisione discordante |

Non è un tracciato universale. È l'elenco operativo. Il tracciato vero lo definisce l'Odoo già in uso e il modo in cui caricate anagrafiche e BoM (import CSV, API, modulo custom). Se un campo non ha dove arrivare, non si estrae «perché sì».

Le **operazioni** sul tab Operations di Odoo vanno allineate ai centri di lavoro reali. Il ciclo non esce dal file STEP; se oggi vive su un foglio o in testa commessa, va trascritto o confermato prima che finisca nella BoM. Altrimenti il MO mostra fasi generiche che il reparto ignora.

## Proposta, eccezione visibile, conferma, poi Odoo

Il flusso che descriviamo sul sito non è «CAD collegato in diretta a Odoo». È:

1. **Lettura o estrazione** dal disegno, dal modello o dal foglio già esistente.
2. **Proposta** strutturata: componenti, quantità, note, dubbi segnalati.
3. **Eccezione visibile**: codice assente, revisione diversa dall'ultima BoM in Odoo, quantità che non torna con l'assieme.
4. **Conferma umana** da ufficio tecnico o chi tiene la distinta.
5. **Import sul tracciato reale** verso Odoo: anagrafica se serve, BoM, eventualmente operazioni.

Gli agenti AI, quando entrano, stanno nel passo 2 e 3: preparano righe, non scrivono in Odoo senza controllo. La regola è la stessa per Mago, TeamSystem o qualsiasi ERP: [non collegare gli agenti AI direttamente all'ERP](/blog/non-collegare-agenti-ai-direttamente-erp). Odoo non è un'eccezione.

Applicazioni operative e export verso Sage X3, TeamSystem Enterprise, **Odoo**, TeamSystem Manufacturing o MES si adattano al percorso reale documentato in [software operativo](/servizi/software-operativo). Non raddoppiamo il gestionale e non spostiamo Inventor o le macchine Bystronic dal loro posto.

## Ordine di fabbricazione: cosa si aspetta il reparto

Dopo il carico, in Odoo un MO porta componenti dalla BoM e, con i work order attivi, le operazioni sul **Work Center**. Il tablet in reparto o il terminale aggiornano avanzamento. Tutto questo presume che la BoM rifletta il disegno approvato, non un export di venerdì sera non controllato.

Se la distinta in Odoo è obsoleta rispetto al DWG in revisione B, il magazzino preleva componenti giusti sul paper e sbagliati sul sistema. Per questo il controllo revisione sul registro Excel (o equivalente) è obbligatorio **prima** dell'import, non dopo il primo MO.

Multilevel: un sotto-assieme ha la sua BoM in Odoo. La distinta del livello superiore richiama il prodotto semifinito, non tutti i bulloni del sotto-livello. Dal CAD a volte esce una lista piatta: qualcuno deve decidere dove tagliare i livelli, coerentemente con come strutturate gli articoli in Odoo.

## Cosa fare questa settimana, se usate già Odoo Manufacturing

1. **Aprire una BoM campione in Odoo** e confrontarla con il foglio che oggi usate dal CAD. Allineate nomenclatura componenti, Quantity e Reference.
2. **Verificare che ogni codice dell'estrazione esista** come product in Odoo, o avete una regola per crearne uno nuovo senza duplicati.
3. **Segnare cosa manca nel file sorgente**: revisione, operazioni, assiemi multilevel. Quello non si risolve con un import.
4. **Definire chi conferma** le righe e chi lancia l'import. Due ruoli possono coincidere in una PMI piccola, ma il passaggio deve essere esplicito.
5. **Tenere Odoo fuori dal percorso diretto del CAD**. Registro, conferma, tracciato. Niente agente con permesso di scrittura sul database di produzione.

Il contesto manifattura con documenti, distinte e back office è in [Frasma per la manifattura](/manifattura). Per il racconto su DDT e documenti verso l'ERP resta il caso [Documenti ERP e preventivi manifatturieri](/casi/documenti-erp-manifattura), senza mescolare il modulo Produzione con il ciclo passivo.

## FAQ

### Odoo importa da solo la distinta da Inventor o AutoCAD?

No. Il modulo Manufacturing gestisce BoM e MO **dopo** che i product e le righe componente esistono in Odoo. Dal CAD serve un passaggio intermedio: estrazione, registro, conferma, import sul tracciato accettato dal vostro Odoo.

### DATAEXTRACTION o l'export Inventor creano la BoM in Odoo?

No. Creano un file o una tabella. La BoM in Odoo nasce dopo il controllo umano e un import definito sul vostro ambiente. È lo stesso schema di [distinta base da AutoCAD](/blog/distinta-base-autocad), con arrivo Odoo invece di un altro gestionale.

### Serve abilitare Work Orders per caricare il ciclo?

Per usare il tab **Operations** dentro la BoM, la documentazione Odoo indica di attivare **Work Orders** in configurazione Manufacturing. Il contenuto delle operazioni (nomi, centri, durate) lo definite voi a partire dal ciclo reale, non dal file CAD.

### Si può collegare un agente AI direttamente a Odoo per aggiornare le distinte?

Non è il percorso che proponiamo. L'AI può preparare righe e segnalare anomalie; una persona valida; poi si importa. Vedi [non collegare gli agenti AI direttamente all'ERP](/blog/non-collegare-agenti-ai-direttamente-erp).

### Cosa cambia tra MRP in Odoo e il foglio commesse in officina?

Odoo pianifica MO, consumi e, con MPS, suggerimenti di riapprovvigionamento. Il foglio in reparto resta utile finché non vedete carico, eccezioni e avanzamento nello stesso flusso. Il tema è approfondito in [software gestione produzione meccanica](/blog/software-gestione-produzione-meccanica).

### Il cliente ha mandato solo il complessivo 3D: si parte da Odoo?

No. Si parte dalla scomposizione e dai codici: [la distinta da un disegno non è un carico](/blog/distinta-da-disegno-non-e-un-carico). Odoo entra quando la lista è affidabile.

Se in ufficio tecnico state già su Odoo Manufacturing ma la distinta arriva ancora copiata dal CAD, si può chiudere il cerchio sul tracciato reale, con una persona che conferma ogni volta.

[Valuta il passaggio da CAD a distinta e Odoo in produzione](/manifattura)

---

**Fonti**

- Odoo S.A., *Bill of materials*, documentazione Odoo. [https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing/basic_setup/bill_configuration.html](https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing/basic_setup/bill_configuration.html)
- Odoo S.A., *One-step manufacturing*, documentazione Odoo. [https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing/basic_setup/one_step_manufacturing.html](https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing/basic_setup/one_step_manufacturing.html)
- Odoo S.A., *Multilevel BoMs*, documentazione Odoo. [https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing/advanced_configuration/sub_assemblies.html](https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing/advanced_configuration/sub_assemblies.html)
- Odoo S.A., *Master production schedule*, documentazione Odoo. [https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing/workflows/use_mps.html](https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing/workflows/use_mps.html)

In caso di differenza tra questo articolo e la documentazione Odoo, prevalgono i testi originali su odoo.com/documentation.

**Autore:** Francesco Saverio Mazzi — Frasma