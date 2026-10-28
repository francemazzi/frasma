---
slug: gestionale-magazzino-excel
title: "Gestionale magazzino Excel: quando il foglio basta, e quando va collegato"
seoTitle: "Gestionale magazzino Excel: quando basta e quando collegarlo | Frasma"
seoDescription: "Magazzino su Excel: quando il foglio basta, quando si rompe, e come usarlo come registro prima dell'import nel gestionale già in uso."
excerpt: "Il magazzino su Excel non è il gestionale: è un registro di lavoro. Quando basta, quando si rompe, e come caricarlo in Mago o TeamSystem dopo una conferma."
coverImage: /images/blog/cover-gestionale-magazzino-excel.png
publishedAt: "2026-10-28"
updatedAt: "2026-10-28"
tags:
  - intelligenza-artificiale
  - manifattura
  - erp
  - excel
status: published
---

Chi cerca **gestionale magazzino Excel** ha già le scorte su un foglio. A volte due. Uno lo apre chi riceve. L'altro sta sul desktop di chi fattura. Il gestionale, se c'è, dice una terza quantità.

La domanda onesta non è «Excel o gestionale». È: **il foglio basta ancora, o è già il posto sbagliato per chiudere il magazzino?**

Non butto Excel. Non lo faccio passare per ERP. Il foglio può restare il registro di lavoro. L'arrivo, quando il movimento conta, è Mago, TeamSystem o il gestionale già in uso — dopo che una persona ha detto sì. È la stessa regola dei [DDT da email verso un registro](/blog/automatizzare-ddt-email-intelligenza-artificiale): Excel prepara, qualcuno conferma, poi si importa.

## Il problema: scorte su Excel, file doppi, nessuna fonte unica

Il magazzino piccolo nasce così. Un foglio con codice, descrizione, quantità, a volte un prezzo. Chi entra merce aggiunge una riga. Chi preleva toglie un numero. Funziona finché una persona tiene il file, i pezzi sono pochi e nessuno chiede il lotto.

Poi arrivano le copie. `magazzino.xlsx`, `magazzino_nuovo.xlsx`, `scorte_ok.xlsx`. Due persone aprono due versioni. Un DDT è sul foglio e non in gestionale. Una fattura è in gestionale e non sul foglio. A fine mese si fa l'inventario e nessuno sa quale numero era quello vero.

Il problema non è Excel come calcolatrice. È Excel usato come **sistema di registrazione** da più persone, su movimenti che poi diventano carico, scarico e fattura.

## Quando Excel basta ancora

Excel basta per un po'. Lo dico senza marketing.

Basta se il magazzino è di **una persona**, i movimenti si chiudono nello stesso giorno, i lotti non servono, e il gestionale — se c'è — riceve pochi carichi a mano, già controllati. Basta se il foglio è un taccuino: «cosa è arrivato oggi», «cosa ho dato in produzione», non «questa è la giacenza ufficiale».

In quel perimetro il foglio è conosciuto, si apre in due secondi, si corregge a vista. Sostituirlo «perché sì» aggiunge un secondo posto in cui scrivere gli stessi numeri.

Quello che non basta è trattare quel taccuino come se fosse il magazzino del gestionale. I due lavori restano distinti. Il foglio aiuta a lavorare. Il gestionale registra.

## Quando il foglio si rompe

Si rompe in punti prevedibili. Non serve un volume da grande magazzino.

**Più persone sullo stesso file.** Uno ha la copia in cloud, uno quella sul PC, uno quella di venerdì. La quantità «vera» è una conversazione, non una riga.

**I DDT e le fatture.** Il carico arriva come PDF. Qualcuno lo ricopia sul foglio. Qualcun altro lo ricopia in gestionale. Due digitazioni, due occasioni di sbagliare fornitore, quantità o unità di misura. La [lettura automatica dei DDT](/blog/lettura-automatica-ddt) parla di quel pezzo: campi, dubbi, conferma. Qui conta l'effetto a valle: se il foglio e il gestionale non si parlano, il magazzino è già doppio.

**I lotti.** Un codice, due consegne, due date. Sul foglio resta «25 pezzi». In richiamo o in contestazione non si sa quale sacco, quale barra, quale collo.

**L'inventario che non torna.** Si conta in corsia. Il foglio dice un numero. Il gestionale un altro. Si «sistema» una cella. La settimana dopo il disallineamento torna, perché il movimento vero non è mai passato da un solo posto.

Panko, in un [lavoro aperto su arXiv](https://arxiv.org/abs/1602.02601), riassume decenni di studi sugli errori nei fogli. Quattordici esperimenti di laboratorio, 967 persone che lavorano da sole: il tasso medio di errore per cella è il **3,9%**. Sembra poco. Su un magazzino con decine di formule e cascade, la probabilità di un valore finale sbagliato sale in fretta. Negli audit sul traffico reale — 85 fogli, metodi più solidi — trova errori nel **94%** dei fogli. Non è il vostro file e non è un dato Frasma. Dice una cosa utile: un foglio «che conosciamo bene» non è, per questo, un registro affidabile.

Nel [paper EuSpRIG del 2000](https://arxiv.org/abs/0802.3457), sempre di Panko, i developer stimano in mediana un 10% di probabilità di aver sbagliato; l'86% aveva comunque un errore. L'eccesso di fiducia è parte del problema. Si guarda il totale, «sembra ragionevole», si chiude.

DeHoratius e Raman, sull'[abstract pubblico di Management Science](https://pubsonline.informs.org/doi/10.1287/mnsc.1070.0789), guardano l'altro lato: quasi 370.000 record di giacenza in 37 negozi di un retailer, il **65%** non coincide con quanto c'è sullo scaffale. È retail, non la vostra officina. Serve a ricordare che anche un sistema automatico sbaglia la giacenza se il processo a monte è sporco. Comprare un gestionale di magazzino, o far scrivere un agente nel gestionale che già avete, non pulisce da solo i movimenti.

## Excel come registro, il gestionale come arrivo

La via di mezzo che uso è quella. Excel resta. Non è l'ERP.

1. **Si tiene un solo registro di lavoro.** Un foglio, una cartella, un proprietario. Codice, quantità, unità, riferimento documento, stato (`da verificare` / `confermato`). Niente copie «di sicurezza» sul desktop.
2. **I movimenti arrivano dai documenti, non a sentimento.** DDT, bolla, prelievo, reso. Se un campo manca — lotto illeggibile, quantità in dubbio, codice che non sta in anagrafica — la riga resta da verificare. Non si completa per chiudere la giornata.
3. **Una persona conferma.** Confronta foglio, documento e, se serve, quanto è sceso dal camion o uscito in produzione. Chi conferma non «revisiona un software». Controlla i fatti che, una volta scritti, sono già magazzino.
4. **Si importa nel gestionale già in uso.** File di import, tracciato, API se il gestionale le ha. Mago, TeamSystem o quello che già registrate. Stesso perimetro di un import manuale controllato. Nessuna scrittura diretta da un agente.

È il flusso descritto in [applicazioni operative sul processo](/servizi/software-operativo): tabelle e stati sul lavoro reale — qui il magazzino di tutti i giorni — con export verso il gestionale, senza sostituirlo. Excel, listini, commesse: il perimetro lo decidono utenti e dati veri, non un prodotto di magazzino con un nome da listino. Frasma non vende un «gestionale magazzino» da catalogo. Collega il registro che già usate a quello che già registrate.

I DDT, quando sono il collo di bottiglia, restano sul percorso [DDT verso ERP](/servizi/ddt-erp): lettura, eccezioni, conferma, poi il tracciato. Il magazzino sul foglio è lo stesso schema, un passo a lato: giacenze e prelievi, non solo bolle in ingresso.

[Valuta il flusso Excel verso il gestionale già in uso](/servizi/software-operativo)

## Cosa non fare

**Non far scrivere l'AI da sola sulle scorte.** Un modello può inventare un codice, confondere due articoli, chiudere un carico su un DDT già registrato. Senza uno stato «da verificare», l'errore entra in magazzino e in fattura. Stessa tesi di [non collegare gli agenti AI direttamente all'ERP](/blog/non-collegare-agenti-ai-direttamente-erp).

**Non buttare Excel il primo giorno.** Se oggi il lavoro gira sul foglio, il primo passo è renderlo un registro unico e controllabile, non sostituirlo con un secondo gestionale «più intelligente». Due sistemi che non si parlano raddoppiano i conflitti.

**Non trattare il modulo magazzino del gestionale come scorciatoia.** Se i movimenti nascono ancora sul foglio, un assistente dentro Mago o TeamSystem non toglie quel foglio. Copre il buco con una maschera.

**Non fondere tre file in uno e chiamarlo integrazione.** L'integrazione è un tracciato, un responsabile, una conferma. Non è un `CERCA.VERT` tra cartelle.

I permessi seguono il ruolo. L'automazione può leggere documenti e preparare righe. Non cambia anagrafiche, non chiude inventari, non spedisce scarichi. Le eccezioni restano assegnate a qualcuno, non in una chat.

## Questa settimana

Prendi tre articoli che vi hanno fatto discutere: uno in più sul foglio, uno in meno, uno con due file diversi. Sul tavolo tieni il foglio, la maschera del gestionale e il documento (DDT, bolla, prelievo). Segna dove è nato il numero. Se è nato in una cella e poi è stato «allineato» a mano, il problema non è «manca il gestionale». Manca un flusso: registro, dubbio, conferma, import.

Se il lavoro è più largo — fatture, DDT, schede, preventivo, e il foglio in mezzo — il racconto più vicino è il caso [Documenti ERP e preventivi manifatturieri](/casi/documenti-erp-manifattura). Il contesto di officina, con Excel usato come ponte verso il gestionale, sta in [Frasma per la manifattura](/manifattura).

## FAQ

### Excel può restare il gestionale di magazzino?

No. Può restare il registro di lavoro: scorte del giorno, eccezioni, controllo. Il gestionale già in uso resta il punto di registrazione. Quando il foglio è l'unico posto in cui esiste la quantità, non avete un magazzino. Avete un file.

### Serve buttare Excel e comprare un altro software di magazzino?

No. Si parte da quello che già c'è. Si tiene un registro unico, si conferma, si importa in Mago, TeamSystem o nell'ERP corrente. Un secondo gestionale raddoppia i dati. Il percorso operativo, quando il foglio è il ponte, è [applicazioni operative sul processo](/servizi/software-operativo).

### L'intelligenza artificiale può aggiornare le scorte da sola?

No. Può leggere un DDT, proporre una riga, segnalare un dubbio. Una persona conferma. Poi si importa. Non si apre una scrittura diretta e non si delega il magazzino a una chat.

### Cosa si fa se foglio e gestionale non coincidono?

Si marca «da verificare». Non si sistema una cella per far tornare il totale. Si cerca il documento del movimento. Se il documento non c'è, il dubbio resta visibile.

### Da dove si parte, in pratica?

Da un insieme piccolo di articoli reali e dall'elenco dei movimenti che già fate: carico, scarico, reso, inventario. Si misura dove nasce il numero. Si tiene la persona nel punto di conferma. Si decide se allargare. Se il collo è sui DDT, si parte da [DDT verso ERP](/servizi/ddt-erp). Se è sul foglio di magazzino, da [software operativo](/servizi/software-operativo).

Se in magazzino le quantità vivono ancora su due file Excel e una maschera del gestionale, si può partire da lì: un registro, i campi giusti, una persona che conferma.

[Valuta il flusso Excel verso il gestionale](/servizi/software-operativo)

---

**Fonti:** Panko, R., *What We Don't Know About Spreadsheet Errors Today: The Facts, Why We Don't Believe Them, and What We Need to Do*, arXiv:1602.02601, EuSpRIG 2015, <https://arxiv.org/abs/1602.02601>. Panko, R. R., *Spreadsheet Errors: What We Know. What We Think We Can Do*, arXiv:0802.3457, EuSpRIG 2000, <https://arxiv.org/abs/0802.3457>. DeHoratius, N., Raman, A., *Inventory Record Inaccuracy: An Empirical Analysis*, Management Science 54(4), 2008, abstract, <https://pubsonline.informs.org/doi/10.1287/mnsc.1070.0789>. In caso di differenza tra questo articolo e le fonti, prevalgono i testi originali.

**Autore:** Francesco Saverio Mazzi — Frasma
