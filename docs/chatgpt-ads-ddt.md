# ChatGPT Ads: campagna di test "DDT verso ERP"

Primo test di annunci in ChatGPT, su un solo servizio. Landing: `https://www.frasma.org/servizi/ddt-erp`. Il test è un'eccezione alla regola "paid: non ora" di `distribuzione.md` e vive dentro i limiti dell'ADR `2026-10-12_test_chatgpt_ads` (budget tetto, durata, regola di stop: li fissa Francesco).

## Struttura

- 1 campagna: "Frasma · DDT verso ERP".
- 1 gruppo di annunci: "DDT verso ERP". Obiettivo **Clicks**, CPC massimo iniziale 3-5 USD (indicazione OpenAI). Si passa a **Conversions** quando `lead_created` compare nella tab Conversions con volume sufficiente.
- Budget giornaliero: `__BUDGET__` (Francesco). Spend in dashboard ritardato di 7-8 ore: uno zero non significa zero costi.
- Nome inserzionista: Frasma. Favicon: quella del sito. Immagine: screenshot pulito del mock "DDT · Mago / TeamSystem" (documento a sinistra, campi a destra), senza testo sovrapposto.

## Context hints (gruppo di annunci, in italiano)

Conversazioni su: inserire DDT o bolle nel gestionale; Mago, Mago4, TeamSystem, Zucchetti, eSolver, FullWORK; ciclo passivo e carico magazzino da bolla; OCR di fatture e DDT; estrarre dati da PDF per l'ERP; import DDT nel gestionale; automazione documentale per PMI manifatturiere; agenti AI e ERP; ricopiare documenti a mano in Excel.

## Varianti di annuncio (`utm_content=vN`)

Ogni variante prende un angolo diverso. Adattare ai limiti di caratteri mostrati in Ads Manager; non promettere tempi, prezzi o risparmi.

| Variante | Angolo | Titolo | Descrizione |
|---|---|---|---|
| v1 | tempo | DDT da email o PDF dentro Mago o TeamSystem | Niente inserimento a mano: i campi escono dal documento, una persona conferma, l'ERP riceve l'import. |
| v2 | errori | Meno errori sui DDT in ciclo passivo | Campi incerti segnalati prima dell'import. Validazione umana e import tracciato nel gestionale già in uso. |
| v3 | nessuna sostituzione | Automatizza i DDT senza cambiare gestionale | Mago, TeamSystem, Zucchetti, eSolver, FullWORK: l'export si definisce sul tracciato reale. L'ERP resta quello. |
| v4 | validazione umana | L'AI legge i DDT, una persona conferma | Nessun carico cieco in magazzino o contabilità: il flusso prepara, il team valida, poi l'import. |
| v5 | tutorial pubblico | Come automatizzare i DDT: video e articolo | Tutorial pubblico su email, PDF e registro Excel, base per il flusso verso il tuo ERP. |
| v6 | verifica di fattibilità | Verifica di fattibilità sui tuoi DDT reali | Mandi un campione di documenti e vedi se il flusso verso il tuo ERP regge, prima di qualsiasi preventivo. |
| v7 | Excel ponte | Dai DDT in email al gestionale, senza Excel ponte | Per PMI che registrano ancora bolle a mano. Excel resta registro di controllo; l'arrivo è l'import nell'ERP. |
| v8 | bolla fotografata | Bolle di carta fotografate, carico in eSolver o Mago | Fornitore, quantità e lotto letti dalla foto; una persona conferma; poi il carico magazzino nell'ERP. |

## URL di destinazione

```
https://www.frasma.org/servizi/ddt-erp?utm_source=chatgpt&utm_medium=ads&utm_campaign=ddt-erp&utm_content=vN
```

OpenAI aggiunge `oppref` al clic; il pixel lo salva nel cookie `__oppref`. Il sito salva gli UTM in `sessionStorage` e li allega alla richiesta: in email, Mongo e Notion ogni lead porta `Canale: annuncio ChatGPT` e la pagina di arrivo.

## Cosa conta

Contano solo i passaggi del funnel di `distribuzione.md`:

1. **Richiesta qualificata**: problema ripetitivo (almeno 20 ore/mese o costo degli errori rilevante), campione di documenti fornibile entro 7 giorni, process owner e decisore raggiungibili, budget plausibile per un pilot.
2. Call di qualificazione fissata.
3. Campione ricevuto e verifica di fattibilità fatta.
4. Preventivo mostrato in call.
5. Cliente.

Non contano: clic, impression, tap su WhatsApp, visite alla pagina.

Lettura settimanale: Notion `ricerca_clienti` filtrato su "Modalità primo contatto contiene annuncio ChatGPT"; GA4 evento `generate_lead` per `landing` e `utm_content`; Ads Manager (clic, CPC, conversioni `lead_created`).

## Regola di stop

`__N__` clic oppure `__X__` euro spesi senza una richiesta qualificata: pausa della campagna e revisione di copy e landing prima di riprendere. Valori e durata del test nell'ADR.

## Checklist pre-lancio

- [ ] `curl -sS -A "OAI-AdsBot" -o /dev/null -w "%{http_code}\n" https://www.frasma.org/servizi/ddt-erp` → `200` (idem con `OAI-SearchBot`).
- [ ] `curl -s https://www.frasma.org/robots.txt` mostra i gruppi `OAI-AdsBot` e `OAI-SearchBot`.
- [ ] Pannello Vercel → Firewall: nessuna challenge o blocco bot per `OAI-AdsBot`.
- [ ] Pixel ID creato nella tab Conversions di Ads Manager; `NEXT_PUBLIC_OAI_PIXEL_ID` impostata su Vercel (Production) e deploy rifatto; `view-source` della landing contiene `oaiq("init"`.
- [ ] Lead di prova end-to-end dall'URL con UTM: redirect a `/discount?conv=contact&lp=ddt-erp`, email con `Canale: annuncio ChatGPT`, pagina Notion con l'opzione "annuncio ChatGPT" (cancellare la pagina di prova).
- [ ] GA4 DebugView: `conversion_event_contact` e `generate_lead` con `landing=ddt-erp`; evento di prova visibile in Ads Manager.
- [ ] Mobile 375px: form compilabile, nessuno scroll orizzontale, bottone non coperto dalla chat.
- [ ] Cookie policy pubblicata con i cookie `__oppref` e `__obref`.
- [ ] Search Console: ispezione URL di `/servizi/ddt-erp` dopo il deploy.
