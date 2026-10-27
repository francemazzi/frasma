---
slug: distinta-da-disegno-non-e-un-carico
title: "La distinta base da un disegno non è un carico nel gestionale"
seoTitle: "Distinta base da disegno CAD, senza import cieco | Frasma"
seoDescription: "Il cliente manda il complessivo senza i particolari. La distinta si ricostruisce in ufficio tecnico; il gestionale riceve i codici già confermati."
excerpt: "Scomporre un assieme in particolari e codici è lavoro di ufficio tecnico. Il gestionale registra dopo, un minuto ad articolo, quando qualcuno ha già confermato."
coverImage: /images/blog/cover-distinta-da-disegno.png
publishedAt: "2026-10-22"
updatedAt: "2026-10-22"
tags:
  - intelligenza-artificiale
  - manifattura
  - erp
status: published
---

Arriva un ordine in PDF: codici, quantità, date di consegna. In allegato c'è il complessivo. A volte un DWG. Lo STEP, spesso, va chiesto. I disegni dei singoli particolari non ci sono.

La tentazione è trattare quel pacchetto come un DDT: l'agente legge, estrae le righe, qualcuno conferma, il gestionale riceve l'anagrafica. Sul documento di trasporto le righe ci sono già. Sul complessivo no. Lì il foglio mostra come i pezzi stanno insieme. Non dice, da solo, quali pezzi creare.

In un ufficio tecnico di carpenteria il passaggio è questo. Il cliente manda l'assieme e i particolari vanno ricostruiti: trenta componenti, a volte settanta. Dal disegno alla distinta passa una settimana o più. Il preventivo slitta di oltre quindici giorni. Creare poi l'articolo nel gestionale, distinta inclusa, è circa un minuto a codice. Su una commessa con una quarantina di articoli nuovi, il carico è un pomeriggio. La settimana è sparita prima, a tavolino, a scomporre l'assieme.

Il collo di bottiglia è l'ufficio tecnico. Il gestionale arriva quando i codici esistono già.

## Il complessivo è un disegno, la distinta è una tabella

Ridard, Lebhar, Letov, Mahdid e Zhao, nello [studio aperto sull'estrazione dai disegni meccanici](https://hal.science/hal-05002280), partono da un fatto che in officina si paga in ore. Un disegno mescola grafica, annotazioni, tabelle e testo. Archiviare il file — PDF, scansione, CAD — non mette in mano la distinta. I sistemi di gestione documentale conservano il foglio e non hanno un modo efficiente per recuperarne i dati. Il loro caso di studio estrae tre regioni, quando ci sono: cartiglio, distinta, note generali.

La distinta, quando c'è, è una tabella sul foglio. Righe, codici, quantità. Va letta come tabella, con gli errori di una tabella disegnata: bordi irregolari, celle vuote, caratteri piccoli. Non è l'assieme in 3D, e non è l'ordine.

Scheibel, Mangler e Rinderle-Ma, nel lavoro su [DigiEDraw](https://www.sciencedirect.com/science/article/pii/S016636152100049X), tengono separate due specie di disegno. Il disegno di particolare mostra un pezzo e le sue specifiche. Il disegno di assieme mostra come i pezzi si combinano. Il loro estrattore è pensato per il primo. Anche la letteratura, quindi, non tratta il complessivo come la lista dei componenti.

Quando quella lista manca, l'ufficio tecnico apre il modello, separa i particolari, decide i codici, scrive le quantità. Un agente che «importa il PDF» copia il cartiglio e si ferma. La commessa no.

## Una proposta, anche quando l'estrazione è buona

Khan e colleghi misurano, su [arXiv](https://arxiv.org/abs/2505.01530), quanto rende leggere un disegno 2D in modo strutturato. Nove categorie: tolleranze geometriche, tolleranze generali, quote, materiali, note, raggi, rugosità, filettature, cartiglio. Il modello unico arriva a una precisione del 94,77% sul GD&T, con richiamo al 100% sulla maggior parte delle categorie, F1 al 97,3%, e allucinazioni tenute al 5,23%.

È un estrattore serio. Resta una proposta. Su una cinquantina di codici, un campo inventato ogni tanto è una distinta che in magazzino non torna. Il 5,23% non si arrotonda a zero perché la frase è scorrevole.

Per questo la sequenza che uso tiene la conferma prima della scrittura. L'agente propone. Segna il dubbio. Una persona chiude il dubbio. Il gestionale riceve solo quello che è stato chiuso. È la stessa regola di [non collegare un agente in scrittura diretta sull'ERP](/blog/non-collegare-agenti-ai-direttamente-erp), applicata a monte: qui non c'è ancora un movimento di magazzino, c'è una struttura tecnica che non esisteva.

## Articolo già noto, articolo nuovo

Le due strade non si mescolano.

Se il codice è già in anagrafica, il lavoro è controllare la revisione e non ricreare l'articolo. La geometria può essere cambiata anche quando il cliente non lo scrive sull'ordine. Quel confronto — indice di revisione, e se ci sono due STEP la sovrapposizione dei modelli — sta nel pezzo su [ciclo e revisione](/blog/ciclo-e-revisione-non-escono-dallo-step).

Se il codice è nuovo, la sequenza è questa.

1. **Tre uscite, tenute separate.** L'ordine porta codici, quantità e date. Il modello, STEP o DWG, porta la geometria. Il disegno quotato porta tolleranze e note. Fonderli in un unico «documento da importare» perde il pezzo che manca.
2. **L'agente propone i componenti.** Per ogni riga segna il dubbio: particolare senza disegno, codice che non esiste, revisione non dichiarata.
3. **Una persona dell'ufficio tecnico conferma** codici e quantità. I dubbi restano aperti finché qualcuno non li chiude. Le conferme restano: la volta dopo la proposta è più stretta sui casi già visti.
4. **Solo dopo si creano anagrafica e distinta** nel gestionale già in uso. Un minuto a codice, quando la lista è vera. Prima no.

Quando i particolari ci sono già e manca il prezzo — tempi, materiale, offerta da mandare — il lavoro è un altro: sta in [software preventivi lavorazioni meccaniche](/blog/software-preventivi-lavorazioni-meccaniche).

## Questa settimana

Prendi una commessa vera, meglio se il cliente ha mandato solo l'assieme. Sul tavolo tieni tre pile: ordine, modello, disegno quotato. Conta quanti particolari non hanno un disegno proprio, e quanti minuti servono — solo dopo — per creare il codice. Se la settimana sta nella prima colonna, il problema è la scomposizione. L'import è il passo corto, in fondo.

Il passaggio tra ufficio tecnico, commerciale e produzione è il contesto di [Frasma per la manifattura](/manifattura). L'agente senza documenti, senza anagrafica e senza chi lo ferma è lo stesso limite descritto in [l'officina intorno al modello](/blog/ai-manifattura-officina-intorno-al-modello).

---

**Fonti:** Ridard, Lebhar, Letov, Mahdid, Zhao, *A Study of Structured/Semantic Data Extraction from Mechanical Engineering Drawings*, preprint HAL hal-05002280, 2025, <https://hal.science/hal-05002280>. Scheibel, Mangler, Rinderle-Ma, *Extraction of dimension requirements from engineering drawings for supporting quality control in production processes*, Computers in Industry, 2021, <https://www.sciencedirect.com/science/article/pii/S016636152100049X>. Khan, Yong, Chen, Tan, Feng, Moon, *Automated Parsing of Engineering Drawings for Structured Information Extraction Using a Fine-tuned Document Understanding Transformer*, arXiv:2505.01530, 2025, <https://arxiv.org/abs/2505.01530>. In caso di differenza tra questo articolo e i paper, prevalgono i testi originali.

**Autore:** Francesco Saverio Mazzi — Frasma
