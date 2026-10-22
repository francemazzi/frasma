---
slug: ciclo-e-revisione-non-escono-dallo-step
title: "Tolleranze, revisione e ciclo non stanno nello STEP"
seoTitle: "Tolleranze nel PDF e ciclo di lavorazione dal CAD | Frasma"
seoDescription: "Lo STEP dà la forma e il PDF le tolleranze. Il ciclo resta in officina: si confronta la revisione prima di riusare il programma."
excerpt: "Il modello 3D dice la forma. Quote, tolleranze e il modo in cui l'officina ha già lavorato il pezzo stanno altrove, e il gestionale li riceve solo dopo."
coverImage: /images/blog/cover-ciclo-revisione-step.png
publishedAt: "2026-10-22"
updatedAt: "2026-10-22"
tags:
  - intelligenza-artificiale
  - manifattura
  - erp
status: published
---

Lo STEP dice com'è fatto il pezzo. Il PDF dice entro quanto va tenuto. La cartella a bordo macchina dice come l'officina l'ha già lavorato: programma, piazzamento, utensili. Il gestionale, in molte officine piccole, tiene ordine, magazzino e fattura.

Quattro posti. Quattro lavori. Caricare lo STEP in anagrafica non porta le tolleranze, e non sceglie la macchina.

In un'officina che lavora pezzi singoli — l'assieme lo fa il cliente — gli ingressi sono cambiati. Il PDF da solo è sceso intorno al 30%. Il resto arriva come STEP con il PDF accanto. Il PDF resta perché le tolleranze non stanno nel modello. Programmi, piazzamenti e utensili vivono in cartelle per codice. L'operatore le apre a bordo macchina, da solo.

Se il pezzo torna e nessuno ricontrolla, i tempi possono triplicare. Succede quando chi tiene i preventivi non guarda i rapportini per quattro o cinque giorni, e in macchina si rilancia il programma della volta prima. Il codice è lo stesso. Il pezzo, a volte, no.

## Il modello non porta le quote

Scheibel, Mangler e Rinderle-Ma lo scrivono nel lavoro su [DigiEDraw](https://www.sciencedirect.com/science/article/pii/S016636152100049X), in aperto su Computers in Industry. In produzione si usa il modello CAD. Il disegno resta la base contrattuale e il riferimento per il controllo qualità, perché lì stanno tolleranze e norme. Di default quelle informazioni non sono nel modello 3D: si aggiungono a mano sul disegno. Ed è ancora pratica comune tenerle solo lì.

Sui formati sono netti: i CAD puri, come lo STEP, spesso non includono le tolleranze. Il PDF le include, e tiene già separati tratto e testo. Il loro estrattore assume che il modello ci sia già, e va a prendere dal PDF quello che il modello non ha. Poi una persona può sempre verificare.

È il pacchetto che arriva in officina. Due file, due contenuti. Trattarli come un allegato unico — «c'è il 3D, il PDF è una copia» — butta via la parte che decide se il pezzo è buono.

Una quota, da sola, non basta. Nello stesso paper una dimensione è un insieme: valore nominale, tolleranze, e il tratto a cui si riferisce. Staccare il numero dal simbolo, o dal foro sbagliato, produce un JSON pulito e un pezzo fuori misura. L'estrazione tiene insieme quegli elementi, oppure segna che non ci è riuscita.

## La revisione è una tabella, non il nome del file

Sull'ordine c'è un indice di revisione. Non tutti i clienti segnalano che il disegno è cambiato. In un ufficio tecnico ho visto il controllo fatto codice per codice, fino a una cinquantina di componenti. Con due STEP si sovrappongono i modelli e si vede la geometria diversa. Quello che la sovrapposizione non dice è la lavorazione: una tolleranza più stretta, un materiale diverso, un piazzamento che non vale più.

Ridard e colleghi, nello [studio sull'estrazione semantica dai disegni](https://hal.science/hal-05002280), trovano la revisione dove sta davvero: in tabella, accanto al cartiglio e alla distinta. Il cartiglio porta la versione. La tabella delle revisioni porta che cosa è cambiato. Va letta dal foglio. Non si deduce dal nome del file, e non si dà per uguale perché il codice articolo è lo stesso.

Khan e colleghi misurano, su [arXiv](https://arxiv.org/abs/2505.01530), quanto è ancora fragile leggere quelle quote da un disegno 2D. Nove categorie, dal GD&T al cartiglio. Il modello unico raggiunge una precisione del 94,77% sulle tolleranze geometriche e tiene le allucinazioni al 5,23%. Un numero incerto non entra nel ciclo. Resta un dubbio, con il punto del foglio da cui è stato letto.

## Il ciclo è di questa officina

Lo stesso particolare si può fare su macchine diverse. Materiale, sequenza e tempi dipendono da come lavora quel reparto: quali utensili ci sono, come si piazza la barra, quali piatti sono a magazzino. Il modello non sceglie. Un ciclo «standard» copiato da un'altra officina è un ciclo sbagliato con un bel 3D accanto.

La proposta che ha senso è locale, e chiede conferma. L'agente guarda il codice, la revisione e i cicli già chiusi da questa officina. Se la revisione torna e la geometria non è cambiata, propone materiale, lavorazioni e tempi come l'altra volta: l'ho pensata così, cambia qualcosa? La persona corregge. Quella correzione resta, per il pezzo simile che arriverà.

Se la revisione è diversa, o se i due STEP non si sovrappongono, il programma vecchio non si rilancia. Si riparte dalla proposta, con le differenze in vista.

Il gestionale riceve, dopo, codice, revisione e tempi già confermati. Non riceve il PDF. Non riceve il programma macchina. È lo stesso confine di [non collegare un agente in scrittura diretta sull'ERP](/blog/non-collegare-agenti-ai-direttamente-erp), un passo prima del magazzino.

Quando invece il cliente manda solo l'assieme e i particolari non esistono ancora, il lavoro è un altro: scomporre e creare i codici. Sta in [la distinta da un disegno non è un carico](/blog/distinta-da-disegno-non-e-un-carico).

## Questa settimana

Prendi un codice che torna in macchina. Prima di rilanciare il programma, metti vicini tre cose: l'indice di revisione sull'ordine, il PDF quotato, lo STEP se c'è. Se la revisione è diversa, o se i due modelli non coincidono, il ciclo vecchio resta in cartella e non va in macchina. Segna da dove arrivano tolleranze e differenze. Il tempo triplicato, quando capita, nasce da un programma riusato su un pezzo che non è più quello.

Documenti, memoria dei cicli già fatti, e una persona che ferma il numero incerto: è il banco descritto in [l'officina intorno al modello](/blog/ai-manifattura-officina-intorno-al-modello).

---

**Fonti:** Scheibel, Mangler, Rinderle-Ma, *Extraction of dimension requirements from engineering drawings for supporting quality control in production processes*, Computers in Industry, 2021, <https://www.sciencedirect.com/science/article/pii/S016636152100049X>. Ridard, Lebhar, Letov, Mahdid, Zhao, *A Study of Structured/Semantic Data Extraction from Mechanical Engineering Drawings*, preprint HAL hal-05002280, 2025, <https://hal.science/hal-05002280>. Khan, Yong, Chen, Tan, Feng, Moon, *Automated Parsing of Engineering Drawings for Structured Information Extraction Using a Fine-tuned Document Understanding Transformer*, arXiv:2505.01530, 2025, <https://arxiv.org/abs/2505.01530>. In caso di differenza tra questo articolo e i paper, prevalgono i testi originali.

**Autore:** Francesco Saverio Mazzi — Frasma
