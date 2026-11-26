---
slug: software-gestione-produzione-meccanica
title: "Software gestione produzione meccanica: commesse, carico macchine e avanzamento oltre Excel"
seoTitle: "Software gestione produzione meccanica | Frasma"
seoDescription: "Commesse, fasi, carico macchine e avanzamento in reparto. Cosa deve fare un software gestione produzione officina e come sceglierlo senza un secondo ERP."
excerpt: "La pianificazione non è il preventivo né il consuntivo: serve vedere commesse, macchine, fasi e date di consegna. Una persona conferma, poi il gestionale registra."
coverImage: /images/blog/cover-software-gestione-produzione-meccanica.png
publishedAt: "2026-11-17"
updatedAt: "2026-11-17"
tags:
  - intelligenza-artificiale
  - manifattura
  - erp
  - excel
status: published
---

L'ordine è partito. In ufficio avete il codice, la distinta, i tempi sul preventivo. In reparto il capo tornio guarda tre macchine, tre date e un foglio Excel che nessuno ha aggiornato da venerdì. La domanda della settimana — **software gestione produzione meccanica**, o più larga **software gestione produzione** / **gestionale produzione officina meccanica** — non chiede un altro gestionale che stampi fatture. Chiede **pianificazione produzione officina**: commesse aperte, ciclo per fasi, **carico macchine**, **avanzamento in reparto**, confronto tra tempi preventivati e tempi reali, priorità e date di consegna.

Se oggi il problema è «quanto è costato il pezzo» o «dove si è mangiato il margine», il banco è un altro. Il consuntivo riga per riga — ore, materiale, setup, lavorazioni esterne — sta in [software calcolo costi produzione officina](/blog/software-calcolo-costi-produzione-officina). Il sospetto sul margine per commessa, prima ancora di aprire quella scheda, è in [costi nascosti officina metalmeccanica per commessa](/blog/costi-nascosti-commessa-officina-metalmeccanica). Qui si risponde a un altro buco: **il pezzo dove deve andare lunedì mattina**, su **quale macchina**, con **quale sequenza**, e se la consegna al cliente è ancora ragionevole.

## Cosa si intende per software gestione produzione meccanica

La query è commerciale. In officina il lavoro è più stretto.

Serve un flusso che, per *questa* officina, tenga insieme:

- le **commesse** aperte (ordinate, interne, stock);
- il **ciclo** o l'elenco **fasi** per codice e revisione;
- il **carico** per macchina o per centro di lavoro;
- lo **stato di avanzamento** («tagliato», «in tornitura», «da rettificare», «in attesa terzista»);
- i **tempi preventivati** accanto ai **tempi reali** quando i rapportini esistono;
- le **priorità** e le **date di consegna** con conseguenze visibili se si sposta un lotto.

Poi una persona — capo officina, responsabile di produzione, a volte l'ufficio tecnico — guarda la proposta di sequenza e di carico, corregge, conferma. Solo dopo quel piano è «ufficiale» per il reparto. Il gestionale, se c'è, continua a registrare ordine, magazzino e fattura. Non deve diventare un secondo cervello che nessuno aggiorna.

Tre cose che questa guida non è.

Non è il [software preventivi lavorazioni meccaniche](/blog/software-preventivi-lavorazioni-meccaniche). Lì il disegno arriva e manca il prezzo da mandare. Qui il cliente ha già detto sì, o il lotto interno è già deciso: manca l'ordine di lavoro sulle macchine.

Non è il [calcolo costi produzione officina](/blog/software-calcolo-costi-produzione-officina). Lì si chiude il consuntivo. Qui si decide **cosa fare prima** e **chi è libero**.

Non è un modulo MRP venduto come «pianificazione automatica» dentro l'ERP. Se oggi la sequenza nasce su un foglio condiviso, un flag nel gestionale non toglie quel foglio finché il reparto non vede carico, avanzamento e eccezioni nello stesso posto.

## Il problema in officina: Excel, buche nel gestionale, avanzamento a voce

Il disegno c'è. La commessa nel gestionale c'è. Il piano no.

Succede spesso così. L'ufficio commerciale apre l'ordine. Qualcuno scrive tempi su Excel o sulla cartellina. Il capo reparto riordina a mano in base a urgenze, allega una nota «cliente X prima». Le macchine segnano i pezzi su rapportini cartacei o su un altro foglio. Il terzista manda una mail. Nessuno aggiorna la colonna «reale». Giovedì qualcuno chiede «a che punto siamo con la commessa Y?» e la risposta è una telefonata.

Due errori si pagano in ritardi e rilavorazioni, non in slide.

**Priorità mute.** Il foglio dice una cosa, il reparto un'altra. La consegna promessa al cliente resta quella vecchia nel gestionale.

**Carico invisibile.** Due lavori lunghi finiscono sullo stesso centro nello stesso giorno. Il setup si somma. La data slitta e nessuno l'ha vista venire.

Quando il dubbio è solo «abbiamo margine su quella commessa?», il confronto preventivo/consuntivo è in [costi nascosti per commessa](/blog/costi-nascosti-commessa-officina-metalmeccanica). Quando il dubbio è «abbiamo messo i minuti giusti sul preventivo?», si torna al [preventivo da disegno](/blog/software-preventivi-lavorazioni-meccaniche). Questa guida parte dal **piano che non si aggiorna**.

## Cosa deve fare un software gestione produzione (officina meccanica)

«Software» qui non significa un prodotto con un nome da listino. Significa un percorso con stati chiari e un'uscita controllabile dal reparto.

### Commesse e cicli

Ogni commessa aperta aggancia codice, revisione, quantità, cliente o commessa interna, data di consegna. Il **ciclo** non è un PDF: è la sequenza di operazioni che *voi* fate — tornitura, fresatura, foratura, trattamento esterno, rettifica — con tempi previsti per fase. Se il ciclo vive solo in testa a chi programma, il software deve almeno poterlo registrare e versionare, non inventarlo da zero a ogni ordine.

Tolgo una confusione frequente: [tolleranze, revisione e ciclo](/blog/ciclo-e-revisione-non-escono-dallo-step) non escono dallo STEP. Il piano di produzione usa il ciclo che l'officina ha chiuso, non il file 3D da solo.

### Carico macchine e pianificazione produzione officina

Il **carico** risponde a domande semplici: quante ore o quanti lotti sono già impegnati su ogni tornio, centro di lavoro, rettifica? C'è spazio per un attrezzaggio pesante venerdì pomeriggio? Serve poter spostare un blocco e vedere subito cosa succede alle altre commesse, non un Gantt decorativo che nessuno apre.

Non serve prevedere il futuro con precisione assoluta. Serve **vedere il sovraccarico** prima che diventi ritardo.

### Avanzamento in reparto

L'**avanzamento** è dove la maggior parte dei progetti fallisce. Non basta «ordine aperto / chiuso» nel gestionale.

Serve uno stato per fase o per lotto: in coda, in macchina, in attesa materiale, da terzista, in controllo, pronto per consegna. Chi aggiorna deve poterlo fare senza aprire dieci schermate. Le eccezioni — pezzo rilavorato, fase saltata, quantità ridotta — restano visibili, non in un gruppo WhatsApp.

### Tempi preventivati vs reali

La colonna «previsto» viene dal preventivo o dal ciclo chiuso. La colonna «reale» viene dai rapportini, dalle ore macchina se le leggete, dalle chiusure a fine fase. Il confronto non serve a punire l'operatore: serve a **ripianare le commesse successive** e a capire se il ciclo standard è ancora credibile.

Il consuntivo economico di quel confronto è un passo dopo, in [calcolo costi produzione officina](/blog/software-calcolo-costi-produzione-officina). Qui il confronto alimenta il **piano**, non solo il bilancio.

### Priorità e date di consegna

Un **software gestione produzione** degno di questo nome mostra cosa succede alla data di consegna se sposto la commessa A prima della B. Le priorità non devono essere solo un numero in un campo nascosto: devono parlare con il carico. Quando la priorità la decide il titolare a voce, il sistema deve permettere di registrarla senza riscrivere tutto il foglio.

[Valuta il flusso di pianificazione e avanzamento in manifattura](/manifattura)

## Excel, gestionale ed ERP: collegare senza raddoppiare

La maggior parte delle PMI meccaniche ha già Mago, TeamSystem, Danea, Zucchetti o un altro **gestionale**. Il magazzino a volte è un [registro Excel](/blog/gestionale-magazzino-excel) agganciato all'import. I DDT e i documenti seguono un altro filtro: [cosa fa il gestionale e cosa resta manuale](/blog/erp-ddt-cosa-fa-il-gestionale).

Il piano di produzione non deve sostituire quell'ERP. Deve:

1. **Leggere** ordini e anagrafiche dove è sicuro farlo (export, API, file schedulati).
2. **Tenere** ciclo, carico e avanzamento nel posto dove il reparto lavora.
3. **Scrivere** verso il gestionale solo ciò che è stato **confermato**: chiusura fase, quantità prodotta, eventuale aggiornamento data consegna.

È la stessa regola di [non collegare un agente in scrittura diretta sull'ERP](/blog/non-collegare-agenti-ai-direttamente-erp), applicata al piano: proposta, dubbio visibile, persona, poi import tracciato. Se oggi il ponte è Excel, il racconto operativo è in [applicazioni operative sul processo](/servizi/software-operativo): tabelle e stati sul lavoro reale, export verso ciò che già registrate.

Quando i documenti entrano da email e PDF — DDT, bolle, schede — l'automazione prepara e una persona conferma, come nel flusso [DDT da email](/blog/automatizzare-ddt-email-intelligenza-artificiale). La produzione non è un PDF, ma il principio è lo stesso: non caricare errori nel sistema «ufficiale».

## Persone, ruoli e dove entra l'intelligenza artificiale

Nessuna **pianificazione produzione officina** seria chiude il carico da sola.

L'automazione può:

- proporre un ordine di commesse partendo da date di consegna e tempi ciclo;
- segnalare sovraccarichi su un centro;
- leggere rapportini o chiusure e aggiornare lo stato proposto;
- preparare un export verso il gestionale.

Non può, da sola:

- decidere di saltare il controllo qualità;
- spostare una consegna al cliente senza che qualcuno con quel ruolo lo sappia;
- scrivere movimenti di magazzino o chiusure ordine nel gestionale senza conferma.

Chi conferma non «revisiona l'intelligenza artificiale». Controlla fatti che, una volta chiusi, diventano piano per il reparto: la commessa è quella, la revisione torna, la macchina scelta esiste, il terzista è in corso, i tempi reali non sono ancora incerti.

Il quadro generale sugli agenti in azienda — cosa preparano, cosa no — è in [agenti AI per aziende](/blog/agenti-ai-per-aziende). Documenti, memoria dei cicli e persona che ferma il numero incerto: è il banco in [l'officina intorno al modello](/blog/ai-manifattura-officina-intorno-al-modello).

## Come scegliere: domande al fornitore e checklist

Prima di guardare demo e listini, portate in call **un elenco di commesse vere** e **l'elenco delle macchine** che contano per il carico. Poi fate queste domande.

**Sul perimetro**

- Il software gestisce solo meccanica di tornio/fresa o anche saldatura, montaggio, lavorazioni esterne con stati dedicati?
- Il ciclo si importa da dove oggi lo tenete (gestionale, Excel, CAM) o va ridigitato?
- L'avanzamento si aggiorna da mobile o solo da ufficio?

**Sul gestionale**

- Cosa legge dall'ERP oggi (ordini, articoli, distinta) e con quale frequenza?
- Cosa scrive nell'ERP dopo conferma, e chi ha il permesso?
- Cosa resta sul foglio o sul registro operativo senza doppia digitazione?

**Sul reparto**

- Chi aggiorna lo stato a fine turno e in quanti click?
- Come si vede un sovraccarico su una macchina prima che succeda?
- Cosa succede quando una fase torna indietro per rilavorazione?

**Su tempi e consegne**

- Dove confrontate preventivo e reale **per ripianare**, non solo per il consuntivo contabile?
- Le date di consegna si ricalcolano quando slitta una fase critica?

**Su automazione e AI**

- Cosa propone l'automazione e cosa non può mai confermare da sola?
- Ogni spostamento di priorità resta tracciato con chi l'ha approvato?

### Checklist rapida prima di firmare

- [ ] Almeno tre commesse pilota con cicli diversi entrano senza riscrivere tutto a mano.
- [ ] Il capo reparto vede carico e avanzamento senza chiedere a ufficio un export.
- [ ] Le eccezioni hanno uno stato «da verificare», non una cella nascosta.
- [ ] L'export verso il gestionale è sul **vostro** tracciato, non su un esempio generico.
- [ ] Formazione base per chi aggiorna in reparto, non solo per l'IT.
- [ ] Avete scritto nero su bianco cosa **non** entra nel gestionale in automatico.

Se il fornitore promette «pianificazione ottima» senza mostrarvi il sovraccarico sui *vostri* centri di lavoro, state comprando una presentazione, non uno **software gestione produzione**.

## Quando basta ancora Excel (e quando no)

Excel resta legittimo quando:

- le commesse aperte sono poche e tutte visibili su un foglio che **una persona** aggiorna ogni giorno;
- il carico macchine si decide a voce in cinque minuti e il foglio rispecchia quella decisione;
- l'avanzamento non serve al cliente con precisione, solo internamente;
- nessuno chiede confronto sistematico tra tempi preventivati e reali sul piano.

Excel diventa stretto quando:

- più persone editano versioni diverse dello stesso file;
- le date di consegna cambiano spesso e nessuno ricalcola il carico;
- i terzisti e i lavori esterni stanno in mail separate dal piano;
- il gestionale ha l'ordine ma il reparto non lo apre mai per sapere «dove siamo»;
- volete usare i rapportini per ripianare la settimana successiva, non solo per la busta paga.

In quel passaggio non serve per forza un MRP da catalogo. Serve un **flusso**: commessa, fasi, macchina, stato, conferma, eventuale scrittura sull'ERP. Se l'ERP è Odoo, distinta e MO vivono in Manufacturing: vedi [Odoo produzione e distinta base](/blog/odoo-produzione-distinta-base). È lo stesso principio del magazzino su foglio collegato al gestionale, descritto in [gestionale magazzino Excel](/blog/gestionale-magazzino-excel), applicato alla **coda di lavoro**.

## Questa settimana

Prendete tre commesse aperte con date diverse: una urgente, una standard, una con terzista in mezzo. Sul tavolo mettete il foglio Excel (o la stampa dal gestionale) da cui oggi decidete la sequenza, e chiedete al reparto come se aggiorna lo stato. Segnate dove nasce il ritardo: priorità, carico, materiale, programma, controllo. Se la risposta è «lo sappiamo solo se chiediamo a Mario», il problema non è «manca il software». Manca un posto unico per **pianificazione produzione officina** con una persona che conferma prima che diventi impegno ufficiale.

Se i cicli, le commesse e i rapportini si copiano ancora a mano tra email, PDF ed Excel, il racconto più vicino — documenti letti, persona che conferma, poi gestionale — è il caso [Documenti ERP e preventivi manifatturieri](/casi/documenti-erp-manifattura).

## FAQ

### Un software gestione produzione sostituisce il gestionale?

No. Registra ordini, magazzino e fatture l'ERP che già usate. Il piano di produzione tiene ciclo, carico e avanzamento dove lavora il reparto, poi scrive solo ciò che è stato confermato. Un secondo gestionale «tutto in uno» raddoppia i dati.

### Serve già avere i tempi preventivi perfetti?

No. Servono tempi abbastanza buoni da vedere il carico e l'ordine delle commesse. I preventivi da disegno e i cicli chiusi si allineano nel tempo con [preventivi lavorazioni meccaniche](/blog/software-preventivi-lavorazioni-meccaniche). Il piano migliora quando confrontate previsto e reale **per fase**, non solo a consuntivo fine mese.

### Il consuntivo economico entra qui?

Il confronto ore previste/reali sul piano alimenta il ripiano. Il consuntivo in valore — tariffe, materiale, setup, esterni — è il passo in [software calcolo costi produzione officina](/blog/software-calcolo-costi-produzione-officina). Non mescolate i due fogli in uno solo se il reparto deve vedere solo code e macchine.

### L'AI può aggiornare il carico da sola?

Può proporre sequenze e segnalare sovraccarichi. Non può spostare consegne al cliente o chiudere fasi nel gestionale senza conferma. Stessa regola degli altri flussi Frasma: [agenti AI](/blog/agenti-ai-per-aziende), [ERP e scrittura](/blog/non-collegare-agenti-ai-direttamente-erp).

### Da dove si parte, in pratica?

Da poche commesse reali e dall'elenco macchine che contano per il carico. Si misura dove oggi si perde l'avanzamento. Si tiene la persona nel punto di conferma. Si collega l'export al gestionale solo quando il reparto usa il piano ogni mattina. Il contesto operativo è [Frasma per la manifattura](/manifattura); i percorsi di servizio per tabelle, stati ed export stanno in [servizi](/servizi) e in [software operativo](/servizi/software-operativo).

Se in reparto la sequenza si decide ancora su un file condiviso che nessuno osa chiudere, si può partire da lì: commesse pilota, stati chiari, una persona che conferma prima che il piano diventi ordine per le macchine.

[Valuta commesse, carico macchine e avanzamento in manifattura](/manifattura)

---

**Fonti:** Panko, R., *What We Don't Know About Spreadsheet Errors Today: The Facts, Why We Don't Believe Them, and What We Need to Do*, arXiv:1602.02601, EuSpRIG 2015, <https://arxiv.org/abs/1602.02601>. Panko, R. R., *Spreadsheet Errors: What We Know. What We Think We Can Do*, arXiv:0802.3457, EuSpRIG 2000, <https://arxiv.org/abs/0802.3457>. In caso di differenza tra questo articolo e le fonti, prevalgono i testi originali.

**Autore:** Francesco Saverio Mazzi — Frasma