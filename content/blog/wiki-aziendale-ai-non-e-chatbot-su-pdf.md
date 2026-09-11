---
slug: wiki-aziendale-ai-non-e-chatbot-su-pdf
title: "Wiki aziendale con AI: non è un chatbot sulla cartella dei PDF"
seoTitle: "Cervello aziendale PMI: wiki con fonti e citazioni | Frasma"
seoDescription: "Cosa è un company brain secondo i paper su RAG: non ChatGPT sui PDF. Fonti versionate, owner e citazioni, con verifica umana."
excerpt: "Il «cervello aziendale» non è ChatGPT sui PDF del server. È una base ricercabile con fonti strutturate, owner e citazioni."
coverImage: /images/blog/cover-wiki-aziendale-ai.png
publishedAt: "2026-09-11"
updatedAt: "2026-09-11"
tags:
  - intelligenza-artificiale
  - manifattura
status: published
---

«Vorremmo un cervello aziendale» arriva spesso dopo una settimana in cui nessuno trova la procedura giusta. PDF in una cartella, messaggi in chat, «chiedi a Marco». La tentazione è caricare tutto in un chatbot e chiudere.

Il passo sbagliato è quello. Un modello addestrato sul web **non sa** le vostre procedure. I paper lo dicono senza marketing, e in officina si vede ogni volta che la risposta arriva sicura e senza fonte.

È la stessa regola del webinar [L'AI in azienda: delega la forma, verifica i fatti](/blog/ai-in-azienda-delega-la-forma-verifica-i-fatti). La macchina può cercare e formattare. Una persona resta su validazione, owner e aggiornamento. Prima, però, deve esistere una fonte da citare.

## Il modello da solo non è la memoria dell'azienda

Lewis e colleghi, nel lavoro che introduce il [retrieval-augmented generation](https://arxiv.org/abs/2005.11401), partono da un limite dei modelli pre-addestrati: tengono molta conoscenza nei parametri, ma **accedere e manipolare quella conoscenza resta limitato**. Due problemi restano aperti se ci si ferma lì: **dare provenienza** alle risposte, e **aggiornare** ciò che il modello «sa» quando i fatti cambiano.

La proposta del paper è ibrida. Una memoria *parametrica* (il modello) più una memoria *non parametrica*: un indice di testi che si può **ispezionare, sostituire e allargare** senza riaddestrare tutto. Sui compiti di generazione, scrivono, i modelli RAG producono linguaggio più specifico, più vario e più fattuale rispetto a una baseline che usa solo i parametri.

Tradotto in officina: la procedura di cambio filtro non deve stare «dentro» il modello. Deve stare in un documento versionato. Il modello la recupera. Se cambia la v3, si aggiorna la fonte, non si spera che il chatbot se lo ricordi.

## Caricare i PDF non basta

Gao e colleghi, nella [survey su RAG e grandi modelli](https://arxiv.org/abs/2312.10997), elencano i tre buchi che un LLM da solo non chiude: **allucinazione**, **conoscenza datata**, ragionamento **non trasparente e non tracciabile**. RAG ci prova recuperando pezzi da una base esterna. Serve, dicono, ad alzare accuratezza e credibilità sui compiti *knowledge-intensive*, e a **aggiornare** la conoscenza di dominio senza rifare il pre-training.

Poi descrivono il «Naive RAG»: si puliscono PDF, HTML, Word; si spezzano in chunk; si indicizzano; si prendono i top-K più simili; si chiede al modello di rispondere. È esattamente «metti l'AI sulla cartella condivisa».

Nella stessa pagina elencano i difetti di quel primo passo. Il retrieval sbaglia precisione e richiamo: prende chunk storti o **perde** il passaggio utile. In generazione il modello può **inventare contenuto non sostenuto** dal testo recuperato. L'integrazione è disordinata, a volte ridondante. E il modello può appoggiarsi troppo al pezzo pescato, o ignorarlo.

Quindi: una cartella di PDF più un chatbot non è un cervello aziendale. È Naive RAG con i problemi del paper, più i vostri file sporchi.

## Cosa è, allora, il company brain

In Frasma lo chiamiamo [wiki e cervello aziendale](/servizi/wiki-aziendale-ai). Non è un agente che decide. Non è un chatbot su tutti i file. È una base ricercabile in cui:

- le fonti sono **strutturate e versionate**, non una cartella sparsa;
- ogni fonte ha un **owner** di aggiornamento;
- la ricerca **cita** da dove viene la risposta;
- accessi e confini restano espliciti;
- la wiki si collega a ERP e workflow **se** lì il team cerca già le procedure.

Il paper di Lewis spiega perché serve la memoria esterna e la provenienza. La survey di Gao spiega perché il retrieve-and-read nudo non regge. Il resto è mestiere: pulire le fonti, dare un responsabile, rifiutare la risposta senza citazione.

Non promettiamo un cervello autonomo. Promettiamo di accorciare la ricerca. Chi valida resta una persona.

## Cosa fare questa settimana

Scegli **una** procedura che oggi vive in chat o in un PDF senza data (cambio filtro, allarme cella, non conformità). Rispondi a tre domande, per iscritto:

1. Qual è il file o la pagina in vigore, e che versione è?
2. Chi la aggiorna quando cambia un pezzo o un fornitore?
3. Se qualcuno cerca «come si fa», dove deve arrivare — e cosa **non** deve inventare il modello?

Se manca la versione o manca l'owner, il lavoro è di fonti, non di modello. Se ci sono, si può prototipare una ricerca che mostra il passaggio e la citazione, con una persona che chiude i dubbi. Su questo, in Frasma lavoriamo con le [PMI manifatturiere](/manifattura).

## FAQ

### Basta caricare Drive o la cartella di rete?

No. Gao descrive proprio quel flusso (file eterogenei → chunk → similarità) e i suoi buchi: chunk sbagliati, passaggi persi, risposte non sostenute dal testo. Prima si scelgono le fonti in vigore e chi le firma.

### Il modello può sostituire chi aggiorna le procedure?

No. Lewis mette tra i problemi aperti, per i modelli solo parametrici, proprio l'aggiornamento della conoscenza e la provenienza. La wiki non toglie l'owner. Lo rende visibile.

### Serve l'AI in locale?

Solo se i documenti non possono uscire. Allora il pezzo da valutare è [l'AI on-premise](/servizi/ai-on-premise), non un altro chatbot in cloud. Il vincolo è di confini, non di «più intelligenza».

### Da dove si parte, in pratica?

Da una procedura, una versione, un owner. Poi una query che il team farebbe davvero, e una risposta che cita la fonte o dice che la fonte manca. Se la fonte manca, si scrive la procedura. Non si addestra un modello sul vuoto.

Se le procedure stanno ancora in PDF e in chat, e la domanda «come si fa» torna ogni settimana, si può partire da lì.

[Valuta una wiki sulle procedure](/servizi/wiki-aziendale-ai)

---

**Fonti:** Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*, arXiv:2005.11401, 2020, <https://arxiv.org/abs/2005.11401>. Gao et al., *Retrieval-Augmented Generation for Large Language Models: A Survey*, arXiv:2312.10997, 2023, <https://arxiv.org/abs/2312.10997>. In caso di differenza tra questo articolo e i paper, prevalgono i testi originali.

**Autore:** Francesco Saverio Mazzi — Frasma
