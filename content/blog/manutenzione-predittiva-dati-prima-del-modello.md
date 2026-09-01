---
slug: manutenzione-predittiva-dati-prima-del-modello
title: "La manutenzione predittiva non parte dal modello. Parte dai dati che nessuno legge"
seoTitle: "Manutenzione predittiva PMI: dati prima del modello AI | Frasma"
seoDescription: "Perché in molte officine i sensori raccolgono dati e la manutenzione resta a guasto. Cosa dicono due paper, e da dove partire senza comprare una piattaforma."
excerpt: "La manutenzione predittiva non fallisce per il modello sbagliato. Fallisce perché i dati di macchina si raccolgono e non si analizzano, o arrivano a pezzi."
coverImage: /images/blog/cover-manutenzione-predittiva-dati.png
publishedAt: "2026-09-01"
updatedAt: "2026-09-01"
tags:
  - intelligenza-artificiale
  - manifattura
  - manutenzione-predittiva
status: published
---

«Vorremmo la manutenzione predittiva» è una richiesta che sento spesso. Arriva dopo un fermo non programmato, o dopo una demo in cui un cruscotto colorato anticipa il guasto.

Il passo sbagliato è scegliere il modello. In officina il collo di bottiglia è un altro: i dati di macchina o non ci sono, o ci sono e nessuno li legge in tempo, o arrivano a pezzi.

Due lavori pubblici lo dicono senza marketing. Il progetto [DETECTA 2.0](https://arxiv.org/abs/2405.15832), su PMI industriali, trova un buco tra raccolta e analisi. Uno studio sul campo in [Systems 2026](https://www.mdpi.com/2079-8954/14/5/515) sposta il collo di bottiglia ancora prima: senza una fondazione dati usabile, predizione e digital twin restano applicazioni appoggiate sul vuoto.

È la stessa regola del webinar [L'AI in azienda: delega la forma, verifica i fatti](/blog/ai-in-azienda-delega-la-forma-verifica-i-fatti). La macchina può segnalare. Una persona decide. Prima, però, il segnale deve esistere ed essere leggibile.

## I sensori ci sono. L'analisi, spesso no

DETECTA 2.0 parte da un'indagine su PMI (automotive e partner di cluster) e da un caso su una fresatrice CNC in un'azienda spagnola. Il dato che interessa un titolare non è l'algoritmo. È questo.

La maggior parte delle imprese cattura già dati, soprattutto chi ha un processo di produzione. Una quota importante di quei dati **non viene analizzata**, per mancanza di tempo e di persone. Nel paper:

- il **67%** delle aziende **non analizza i dati in tempo reale**;
- il **40%** li guarda **dopo il guasto**;
- solo il **20%** ha dati real-time su tutto il processo, il **40%** in parte, il **27%** non li ha;
- i metodi di raccolta sono misti: sensori messi in azienda (20%), sensori già in macchina (33%), il resto digitale manuale o carta.

Se i dati si aprono dopo il fermo, non è predittivo. È un diario del fermo, scritto tardi.

La query da cercare su Google è quella vera: *manutenzione predittiva PMI* non significa «quale rete neurale». Significa «perché abbiamo i dati della macchina e la manutenzione è ancora a guasto».

## Prima del modello serve un tubo che non perda

Kang e Park, su una PMI alimentare, formalizzano il punto. Le applicazioni «intelligenti» — monitoraggio, predittiva, digital twin — presuppongono un livello sotto: dati **continui, interpretabili, riutilizzabili**. Nelle PMI quel livello è fragile: macchine eterogenee, reti instabili, record manuali, poco personale dedicato.

Nel loro impianto di campo, un'instabilità di comunicazione si è vista confrontando i pezzi della pipeline (acquisizione, trasmissione, normalizzazione). La ricezione dei pacchetti è passata da circa **il 33% al 95%** dopo un intervento mirato, non dopo aver cambiato l'algoritmo di predizione.

Se tre pacchetti su quattro non arrivano, un modello «predittivo» sta imparando i buchi. L'allarme che esce non è un oracolo. È rumore con un grafico.

È lo stesso tipo di disordine che, sui documenti, ho descritto per le anagrafiche: tre scritture per un solo articolo e il modello le amplifica. Sulla macchina il disordine è un timestamp storto, un sensore che cade, un codice fermo che in ufficio significa un'altra cosa.

## Gli allarmi falsi bruciano la fiducia prima del ROI

DETECTA, sulla fresatrice, non si limita a «mettere l'AI». Etichetta le anomalie con un passaggio umano, poi addestra modelli più stretti. I falsi positivi, nel loro racconto di progetto, scendono dal **40% (fase I) al 10% (fase II)**.

Quel numero conta più dell'accuratezza da paper. In officina, se una volta su due l'allarme è vuoto, il capo officina lo silenzia. A quel punto il modello può anche essere buono: nessuno lo ascolta.

La predittiva utile manda alla persona **solo le eccezioni**, con un livello di certezza visibile. Non una chat che «ha visto qualcosa». La stessa logica di [non collegare un agente in scrittura diretta sull'ERP](/blog/non-collegare-agenti-ai-direttamente-erp): l'AI legge e segnala; la registrazione definitiva (ordine di lavoro, fermo, ricambio) resta di qualcuno.

## Cosa fare questa settimana, senza comprare una piattaforma

Non serve un digital twin. Serve un perimetro piccolo e misurabile.

1. **Scegli una macchina che ferma la settimana.** Quella il cui fermo si sente in consegna, non «tutta la linea».
2. **Scrivi cosa esiste già.** Pannello, CNC, ore, allarmi, Excel del manutentore, carta. Chi li guarda, e quando: in tempo reale, a fine turno, dopo il guasto.
3. **Misura un buco, non un KPI da brochure.** Quanti fermi nell'ultimo mese. Quanti segnali c'erano prima. Quanti dati si perdono (pacchetti, turni senza riga, sensore staccato).
4. **Tieni l'uomo sul dubbio.** Una coda «da verificare» vale più di un cruscotto che dipinge tutto di verde.
5. **Solo dopo, parla di modello.** Se i dati non arrivano o si aprono dopo il fermo, il fornitore sta vendendo un grafico.

Se in parallelo stai valutando interconnessione o hardware, l'[iperammortamento](/blog/iperammortamento-2026) riguarda beni e software collegati a un sistema. Non sostituisce la mappa di cui sopra. Il bando non sistema un sensore che perde i pacchetti.

## FAQ

### Abbiamo già i sensori sulla macchina. Ci manca solo l'AI?

Spesso no. Manca chi legge i dati prima del guasto, e un percorso che non perda pezzi. DETECTA mostra imprese che raccolgono e analizzano tardi. Kang e Park mostrano una rete che consegnava un terzo dei pacchetti. L'AI in cima a quello non predice: decora.

### Quanti dati servono per partire?

Abbastanza da vedere un pattern sul pezzo scelto, non «anni di Big Data». Meglio tre mesi puliti su una macchina che un data lake su tutta l'officina. Se manca lo storico, si parte da un registro di fermi e da un segnale già disponibile (assorbimento, allarme CNC, ore), con una persona che etichetta i dubbi.

### Un allarme in più in officina aiuta?

Solo se è raro e spiegabile. Un falso positivo su due addestra tutti a ignorare il sistema. Chiedi al fornitore il tasso di falsi allarmi sul vostro pezzo, non su un dataset pubblico.

### Da dove si parte, in pratica?

Da una macchina, un mese di fermi, e la domanda: i dati ci sono *prima* del guasto, e qualcuno li vede? Se la risposta è no, il lavoro è di processo e di fondazione dati. Se è sì, si può prototipare un segnale con verifica umana. Su questo, in Frasma lavoriamo con le [PMI manifatturiere](/manifattura): software quando toglie un passaggio cieco, non quando aggiunge un cruscotto da alimentare.

Se i fermi si scoprono ancora a macchina ferma, e i file della linea restano sul pannello o in un Excel aperto dopo, si può partire da lì.

[Valuta un processo in officina](/manifattura)

---

**Fonti:** Huertas-García et al., *DETECTA 2.0*, arXiv:2405.15832, 2024, <https://arxiv.org/abs/2405.15832>. Kang e Park, *Operational Data Foundation Framework for Smart Manufacturing in SMEs*, Systems 2026, 14(5), 515, <https://doi.org/10.3390/systems14050515>. In caso di differenza tra questo articolo e i paper, prevalgono i testi originali.

**Autore:** Francesco Saverio Mazzi — Frasma
