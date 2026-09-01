---
slug: non-collegare-agenti-ai-direttamente-erp
title: "Non collegare gli agenti AI direttamente all'ERP"
seoTitle: "Come collegare l'AI all'ERP senza sostituire il gestionale | Frasma"
seoDescription: "Perché un agente non deve scrivere nel gestionale in diretta, e come partire da un processo (DDT, validazione, import tracciato) verso Mago o TeamSystem."
excerpt: "La richiesta «integrare l'ERP con l'AI» parte dal posto sbagliato. Si sceglie un processo, si valida, poi si importa nel gestionale già in uso."
publishedAt: "2026-09-01"
updatedAt: "2026-09-01"
tags:
  - intelligenza-artificiale
  - automazione-documentale
  - ddt
  - erp
  - mago
status: published
---

«Vorrei integrare il mio ERP con l'AI» è una richiesta onesta. È anche il passo sbagliato.

Il gestionale è il sistema di registrazione: magazzino, contabilità, ordini. Non è il posto in cui un modello linguistico deve scrivere da solo. Se un agente sbaglia un fornitore, una quantità o un lotto, l'errore non resta in una chat: entra in magazzino e in fattura.

Si parte da un processo ripetitivo, non dal connettore. L'ERP resta dove sta. L'AI legge, struttura e segnala. Una persona conferma. Poi arriva un import tracciato.

È la stessa regola del webinar [L'AI in azienda: delega la forma, verifica i fatti](/blog/ai-in-azienda-delega-la-forma-verifica-i-fatti).

## Cosa non fare

**Non dare a un agente il permesso di scrivere nell'ERP.** Un modello può inventare un codice articolo, confondere due fornitori o chiudere un movimento su un documento illeggibile. Senza uno stato «da verificare», nessuno se ne accorge in tempo.

**Non sostituire il gestionale.** Mago, Mago4, TeamSystem o un altro ERP già in azienda restano il sistema contabile e di magazzino. Un secondo gestionale «intelligente» raddoppia i dati e i conflitti.

**Non trattare il modulo AI nativo come scorciatoia.** Se il processo è ancora copia-incolla tra email, PDF ed Excel, un assistente dentro l'ERP non toglie quel lavoro. Copre il buco con una chat.

## Come collegare invece

Il collegamento utile sta *intorno* all'ERP, non dentro.

1. **Si sceglie un processo.** Un flusso con volume, errori visibili e un arrivo chiaro: per molte officine è l'inserimento dei DDT.
2. **L'AI legge i documenti.** Email, PDF, scansioni. Estrae campi. Segnala i dubbi. Non decide.
3. **Una persona valida.** I campi incerti restano visibili. Non c'è carico cieco in magazzino o in contabilità.
4. **Si importa nel gestionale già in uso.** File di import, API o tracciato verso Mago o TeamSystem, con lo stesso perimetro che usereste per un import manuale controllato.

Excel può essere il primo registro di controllo. Non è l'arrivo. L'arrivo è l'ERP, dopo la conferma.

I permessi seguono il ruolo: l'automazione legge documenti e prepara righe; non invia email, non cancella movimenti, non cambia anagrafiche. Le eccezioni restano assegnate a qualcuno, non in una conversazione.

API o middleware servono quando il gestionale accetta un tracciato. Gli «agenti nativi» dell'ERP servono se esistono davvero e restano dentro i permessi del ruolo. In entrambi i casi il punto fermo è lo stesso: nessuna scrittura definitiva senza validazione.

## Un esempio: i DDT da email

In accettazione i Documenti di Trasporto arrivano come PDF. Qualcuno li ricopia. Dieci minuti a documento, ogni giorno.

Il [tutorial su DDT da email verso Excel](/blog/automatizzare-ddt-email-intelligenza-artificiale) mostra il pezzo operativo: whitelist dei fornitori, estrazione, registro, eccezioni. Il passo successivo non è «attaccare ChatGPT a Mago». È [preparare i campi confermati per l'ERP già in uso](/servizi/ddt-erp).

Stesso processo, stesso controllo. Niente agente con write diretto.

## FAQ

### Si può collegare ChatGPT, Claude o Gemini direttamente all'ERP?

No. Un assistente esterno può leggere un estratto o preparare un tracciato. Non deve avere credenziali di scrittura sul gestionale. Se serve una risposta su una procedura, si parte da documenti e permessi espliciti, non da un connettore aperto.

### Serve cambiare gestionale per usare l'AI?

No. Si parte dal sistema già in azienda. L'AI lavora sui documenti e sui passaggi manuali; Mago, TeamSystem o l'ERP corrente restano il punto di registrazione.

### Da dove si parte, in pratica?

Da un processo circoscritto, con documenti reali. Per molte manifatture è il ciclo passivo: DDT, bolle, email dei fornitori. Si misura il lavoro attuale, si prototipa su un perimetro limitato, si decide se estendere.

### Chi controlla i dati prima che entrino in magazzino o in contabilità?

Una persona del team. L'AI struttura e segnala. La conferma, le eccezioni e la responsabilità restano umane. Non esiste un listino universale e non deleghiamo importazioni cieche.

### API, middleware o agenti nativi dell'ERP: quale scegliere?

Quello che il gestionale già consente, sul processo scelto. Un file di import controllato è spesso sufficiente. Un agente nativo ha senso solo se rispetta ruoli e non scrive da solo. La scelta tecnica viene dopo la mappa del lavoro reale.

Se i DDT, le bolle o i preventivi si copiano ancora a mano tra email, PDF, Excel ed ERP, si può partire da lì.

[Valuta il processo DDT verso ERP](/servizi/ddt-erp)

---

**Autore:** Francesco Saverio Mazzi — Frasma
