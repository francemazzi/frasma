---
slug: computer-per-intelligenza-artificiale-in-locale
title: "Quale computer scegliere per l'intelligenza artificiale in locale in azienda"
seoTitle: "Computer per AI in locale: hardware, modelli e costi per PMI | Frasma"
seoDescription: "Guida all'hardware per LLM in locale: memoria, banda, quantizzazione, Mac, NVIDIA DGX Spark, RTX 5090, Ryzen AI Max+ 395 e modelli open per documenti e agenti in PMI manifatturiera."
excerpt: "Per l'AI in locale il limite è quasi sempre memoria e banda, non i core: ecco come scegliere PC, mini server e modelli senza comprare hardware in eccesso."
coverImage: /images/blog/cover-computer-per-intelligenza-artificiale-in-locale.png
publishedAt: "2026-11-13"
updatedAt: "2026-11-13"
tags:
  - intelligenza-artificiale
  - manifattura
  - automazione-documentale
status: published
---

Chi cerca un **computer per intelligenza artificiale in locale** in una PMI manifatturiera di solito parte dalla domanda sbagliata: quanti core ha la CPU, quale scheda grafica «gaming» mettere sotto la scrivania. Nell'inferenza locale, invece, il collo di bottiglia è quasi sempre **quanta memoria avete e a che velocità la leggete** (banda in GB/s). Lo spiegano Yuan et al. con il modello roofline ([LLM Inference Unveiled](https://arxiv.org/abs/2402.16363)); lo mostrano in modo crudo i benchmark della community su [llama.cpp](https://github.com/ggml-org/llama.cpp/discussions/4167): sulla stessa famiglia di chip, più banda significa più token al secondo in generazione.

La **quantizzazione a 4 bit** è il compromesso usuale tra occupazione di memoria e qualità dei risultati (Dettmers & Zettlemoyer, [The case for 4-bit precision](https://arxiv.org/abs/2212.09720); [GPTQ](https://arxiv.org/abs/2210.17323); [AWQ](https://arxiv.org/abs/2306.00978)). Un modello da 70 miliardi di parametri in Q4_K_M sta intorno a 43 GB di pesi, non ai circa 141 GB in FP16 — verifica con il [README quantize di llama.cpp](https://github.com/ggml-org/llama.cpp/blob/master/tools/quantize/README.md).

I **modelli MoE** (mixture of experts) caricano tutti i pesi in memoria ma, per ogni token, attivano solo una frazione degli esperti: su macchine con tanta memoria ma banda media (NVIDIA GB10, AMD Strix Halo) spesso rendono molto meglio dei modelli **densi** della stessa «categoria commerciale».

**Sui prezzi:** Francesco ha chiesto esplicitamente i listini hardware di terzi. Qui sotto compaiono come **indicativi**, con fonte e con la dicitura «rilevato il 13/11/2026» dove il dossier lo consente. Dal primo trimestre 2026 la crisi delle memorie DRAM («RAMpocalypse») ha spostato configurazioni e prezzi: il Mac Studio M3 Ultra da 512 GB è stato tolto dal configuratore Apple ([macitynet, 06/03/2026](https://www.macitynet.it/mac-studio-con-512gb-ram/)); il Framework Desktop da 128 GB è passato da 2.329 € a 3.449 € in venti mesi ([BlogiPhone, 08/10/2026](https://www.blogiphone.fr/5250-framework-desktop-prix-en-precommande-des-7-659-eur-3-449-eur-avant.html)). **Non riporto** prezzi segnati nel dossier come calcolati o non verificati: per Mac Studio M5 Ultra da 256 GB o Mac mini / Studio con RAM massima scrivete «da verificare sul configuratore Apple». Nessun prezzo di servizi Frasma in questa pagina.

Il computer è il mezzo. Il lavoro, in azienda, resta trasformare disegni, DDT, ordini e procedure in dati controllabili verso il gestionale — non sostituirlo. Per l'architettura e l'integrazione rimanda a [AI on-premise](/servizi/ai-on-premise); per «locale o cloud» a [L'AI in azienda: delega la forma, verifica i fatti](/blog/ai-in-azienda-delega-la-forma-verifica-i-fatti).

## Memoria e banda contano più dei core

Dettmers e Zettlemoyer, in oltre 35.000 esperimenti, concludono che a parità di memoria disponibile la **precisione a 4 bit è quasi sempre ottimale** per l'inferenza ([arXiv:2212.09720](https://arxiv.org/abs/2212.09720)). Non è solo teoria: nella [discussione ufficiale llama.cpp #4167](https://github.com/ggml-org/llama.cpp/discussions/4167) (tabella del primo post, letta il 13/11/2026), con **Llama 2 7B Q4_0** la generazione (`tg`, token/s in uscita) scala con la banda:

| Chip | Banda (GB/s) | GPU core | tg Q4_0 |
| --- | --- | --- | --- |
| M6 (Mac mini base) | 170 | 8 | 35,7 |
| M4 Pro | 273 | 20 | 50,7 |
| M5 Pro | 307 | 20 | 66,3 |
| M3 Ultra | 800 | 80 | 92,1 |
| M5 Max | 614 | 40 | 119,9 |
| M5 Ultra | 1.228 | 80 | 179,1 |

Due chip di generazioni diverse con banda simile tendono a dare velocità simili: è un'osservazione ragionevole su quella tabella, non una legge fisica. M5 Max e M3 Ultra non seguono alla lettera la regola perché su M5 entrano in gioco i Neural Accelerator nella GPU.

Sul **NVIDIA DGX Spark** (GB10, 273 GB/s), il [file benchmark ufficiale llama.cpp](https://github.com/ggml-org/llama.cpp/blob/master/benches/dgx-spark/dgx-spark.md) mostra un punto didattico:

| Modello | Dimensione file | tg (contesto vuoto) | tg a 32K di contesto |
| --- | --- | --- | --- |
| gpt-oss-120b MXFP4 | 59,0 GiB | 58,7 | 42,8 |
| Qwen2.5-Coder-7B Q8_0 (denso) | 7,5 GiB | 29,4 | 22,5 |

Il **modello denso da 7B va più piano del MoE da 120B** (29 contro 59 tok/s nelle condizioni di quel test). Il denso deve attraversare tutti i pesi a ogni token; il MoE attiva solo gli esperti necessari ([scheda gpt-oss-120b](https://huggingface.co/openai/gpt-oss-120b): circa 5,1B parametri attivi su 117B totali).

Anche la **KV cache** pesa: con modelli grandi e contesti lunghi, la memoria oltre i pesi può riempire la scheda. Su RTX 5090, Hardware Corner riporta **Qwen3 14B con 131K di contesto a 31 GB di VRAM** su 8,5 GiB di pesi ([benchmark RTX 5090](https://www.hardware-corner.net/rtx-5090-llm-benchmarks/)) — concetto allineato a [PagedAttention / vLLM](https://arxiv.org/abs/2309.06180).

## Quantizzazione: cosa significa in pratica

Senza entrare in ingegneria del training, per una PMI servono tre idee:

1. **4 bit (Q4_K_M e affini)** — dimensione dei pesi ridotta, qualità in genere accettabile per estrazione e chat operative ([GPTQ](https://arxiv.org/abs/2210.17323), [AWQ](https://arxiv.org/abs/2306.00978)).
2. **8 bit** — metà memoria rispetto a FP16 senza perdita dichiarata fino a modelli molto grandi ([LLM.int8()](https://arxiv.org/abs/2208.07339)).
3. **Formati nativi come MXFP4** su alcuni modelli open (es. gpt-oss) — file più piccoli, ma dipendete dal backend (llama.cpp, vLLM, Ollama).

**Stima memoria pesi** = parametri × bit per peso ÷ 8. Esempio verificabile: Llama 3.1 70B in Q4_K_M → circa 43,1 GB ([README quantize](https://github.com/ggml-org/llama.cpp/blob/master/tools/quantize/README.md)). A quella cifra vanno sommati sistema operativo, runtime, **KV cache** (proporzionale a contesto e utenti in parallelo, [arXiv:2309.06180](https://arxiv.org/abs/2309.06180)) e, per modelli vision, le immagini nel prompt. Le cifre «Q4 stimato / Q8 stimato» nella tabella modelli sotto sono **stime**, non misure sul vostro carico.

Benazir e Lin ([Profiling on Apple Silicon](https://arxiv.org/abs/2508.08531)) ricordano che abbassare i bit non accelera sempre: c'è costo di dequantizzazione. Su Apple Silicon la memoria unificata grande rende comunque attraente l'inferenza di modelli molto grandi; per il **training** resta un divario netto verso GPU NVIDIA ([Profiling Apple Silicon Performance for ML Training](https://arxiv.org/abs/2501.14925)).

## Prima il lavoro, poi la macchina

Il computer segue i compiti, non il contrario. In manifattura, su documenti e agenti, il dossier di ricerca (13/11/2026) raggruppa così i casi — con modelli **aperti** e licenze lette su Hugging Face lo stesso giorno:

### Preventivi ed estrazione da documenti e disegni

DDT, ordini, distinte, PDF di tavole. Modelli vision o multimodali **8–30B**: [Qwen3-VL-8B-Instruct](https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct) (Apache-2.0, ~5 GB Q4 stimato), [Qwen3-VL-30B-A3B-Instruct](https://huggingface.co/Qwen/Qwen3-VL-30B-A3B-Instruct) (MoE vision, ~19 GB Q4 stimato), [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) (Apache-2.0), [google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it) o [gemma-4-26B-A4B-it](https://huggingface.co/google/gemma-4-26B-A4B-it) (Apache-2.0).

Memoria tipica: **16–64 GB** veloci bastano per molte prove; 128 GB apre i MoE grandi. Fondamento concettuale: Belcak et al. (NVIDIA Research), [Small Language Models are the Future of Agentic AI](https://arxiv.org/abs/2506.02153) — per compiti ripetitivi e specializzati, modelli piccoli sono spesso sufficienti ed economici.

Collegamenti operativi: [lettura automatica DDT](/blog/lettura-automatica-ddt), [preventivi da disegno](/blog/software-preventivi-lavorazioni-meccaniche), [agenti AI](/blog/agenti-ai-per-aziende), [AI on-premise](/servizi/ai-on-premise). Il computer da solo non basta: serve lo strato tra modello ed ERP descritto in [non collegare agenti AI direttamente all'ERP](/blog/non-collegare-agenti-ai-direttamente-erp).

### Chat e strategia su documenti lunghi

Bilanci, contratti, verbali. Servono MoE grandi o densi molto capaci: [openai/gpt-oss-120b](https://huggingface.co/openai/gpt-oss-120b) (Apache-2.0, MXFP4 ~59 GiB), [mistralai/Mistral-Small-4-119B-2603](https://huggingface.co/mistralai/Mistral-Small-4-119B-2603) (Apache-2.0, ~73 GB Q4 stimato, italiano tra le lingue dichiarate), con riserva su [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) (licenza **Qwen Community 1.0**, non Apache/MIT: verifica legale prima dell'uso in produzione).

Hardware: **128 GB** (DGX Spark, Ryzen AI Max+ 395, Mac Studio configurato a 128 GB — prezzo da configuratore) o **256 GB** su Mac Studio M5 Ultra per margine su contesto e più modelli. Avvertenza da benchmark DeepSeek V3 671B su Mac M3 Ultra 512 GB: con modelli giganti la **lettura del prompt** (`pp`) diventa lenta ([Hardware Corner, 27/03/2025](https://www.hardware-corner.net/mac-studio-m3-ultra-deepseek-llamacpp/) — pp 9,0 tok/s, 8.000 token in 14,8 minuti). Un modello locale non sostituisce i migliori modelli cloud per ragionamenti lunghi e sporadici: è già nel post [locale vs cloud](/blog/ai-in-azienda-delega-la-forma-verifica-i-fatti).

### RAG su documenti interni

Indice + chat: [Qwen3-Embedding-0.6B](https://huggingface.co/Qwen/Qwen3-Embedding-0.6B) (Apache-2.0) più [gpt-oss-20b](https://huggingface.co/openai/gpt-oss-20b) o Qwen3.8-27B. Dimensionate la memoria per **contesto e utenti contemporanei** (PagedAttention). Non è una cartella di PDF con una chat sopra: [wiki aziendale con AI](/blog/wiki-aziendale-ai-non-e-chatbot-su-pdf).

### Codice e script per l'ufficio IT

[Qwen3-Coder-30B-A3B-Instruct](https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct) (Apache-2.0): sullo Spark in Q8 misurato 61,1 tok/s ([bench DGX Spark](https://github.com/ggml-org/llama.cpp/blob/master/benches/dgx-spark/dgx-spark.md)); su RTX 5090, Qwen3 30B-A3B Q4 234,3 tok/s a contesto 4K ([Hardware Corner](https://www.hardware-corner.net/rtx-5090-llm-benchmarks/)).

### Fine-tuning su dati propri

Richiede in pratica **NVIDIA** e tanta VRAM (QLoRA: [arXiv:2305.14314](https://arxiv.org/abs/2305.14314)). DGX Spark: NVIDIA dichiara fine-tuning fino a 70B; RTX PRO 6000 ha 96 GB. Avvertenza da [Iyer, 2026 su due DGX Spark in cluster](https://arxiv.org/abs/2608.07226): il fine-tuning migliora categorie di dominio ma **può peggiorare la conoscenza generale** — prima RAG e prompt, poi eventuale addestramento.

---

Se state valutando dove collocare agenti e lettura documenti sulla vostra rete, il passo successivo non è il listino Amazon: è un processo vero, con dieci documenti storti. [Prenota 30 minuti di analisi del processo con Frasma](/manifattura) — contesto [PMI manifatturiere](/manifattura).

## Le fasce hardware: da Mac mini a DGX Station

### Fascia 0 — prova e modelli piccoli (8–12B)

**Apple Mac mini M6** (sostituisce la generazione citata in molti benchmark come «M4» nelle discussioni 2025):

- CPU 12-core, GPU 8–12 core, **16–32 GB** unificata, **153–170 GB/s**
- Da **1.079 €**, rilevato il 13/11/2026 — [specifiche Mac mini, Apple IT](https://www.apple.com/it/mac-mini/specs/)
- **Pro:** modo più economico per provare Ollama/llama.cpp; silenzioso; consumo contenuto
- **Contro:** non regge modelli vision grandi né chat strategiche con MoE da 100B+
- **Costo/beneficio:** ottimo per **classificazione, estrazione semplice, test** con Gemma 4 E4B o Qwen3-VL-8B

**Apple Mac mini M5 Pro**:

- CPU 15–18 core, GPU 16–20 core, **24–64 GB** (il prezzo con **64 GB non è verificato** — configuratore Apple), **307 GB/s**, max 155 W
- Da **2.029 €** con 24 GB, stessa fonte Apple
- Llama 2 7B Q4: **66,3 tok/s** nella tabella #4167
- **Pro:** estrazione da DDT/disegni con modelli vision fino a ~27–30B se configurate abbastanza RAM
- **Contro:** sopra ~48 GB il prezzo va ricontrollato; banda inferiore a Mac Studio

### Fascia 1 — 128 GB unificata, prezzo più basso per MoE grandi

**GMKtec EVO-X2** (Ryzen AI Max+ **395**, 16 core Zen 5, Radeon 8060S integrata):

- **128 GB** LPDDR5X-8000, banda teorica **256 GB/s** (~215 GB/s misurati in [lhl/strix-halo-testing](https://github.com/lhl/strix-halo-testing/blob/main/llm-bench/README.md))
- **3.999,96 €** su Amazon, rilevato il 13/11/2026 — [schedavideo](https://schedavideo.net/prezzi/sistemi-ai/gmktec-evo-x2)

**Framework Desktop**, Ryzen AI Max+ **395**, 128 GB DIY:

- **3.449 €** ([BlogiPhone, 08/10/2026](https://www.blogiphone.fr/5250-framework-desktop-prix-en-precommande-des-7-659-eur-3-449-eur-avant.html)) vs **3.889 €** UE ([localaiprices, verificato 12/11/2026](https://localaiprices.com/p/framework-desktop-128/)) — **non coincidono: verificate sul configuratore**

**Versione PRO 495, 192 GB**, 7.659 € in preordine (BlogiPhone); Framework la indica per DeepSeek V4.1 Flash Q2 ([frame.work/it/it/desktop](https://frame.work/it/it/desktop)).

Benchmark lhl (metà 2025, software non ultimo):

| Modello | tg miglior backend |
| --- | --- |
| Qwen3 30B-A3B Q4 (MoE) | 78,0 |
| gpt-oss-120b MXFP4 | 33,7 |
| Llama-3 70B Q4_K_M (denso) | **5,0** |

**Pro:** **costo più basso per 128 GB**; gpt-oss-120b usabile; adatto a chat/RAG in sede
**Contro:** 70B denso impraticabile; ecosistema AMD meno maturo di CUDA; fonti secondarie riportano gpt-oss-120b fino a ~55 tok/s con build più recenti ([localaiprices](https://localaiprices.com/p/framework-desktop-128/)) — citare come «fino a», con riserva

### Fascia 2 — NVIDIA GB10 (DGX Spark e cloni ASUS)

**Specifiche DGX Spark** — [NVIDIA IT](https://www.nvidia.com/it-it/products/workstations/dgx-spark/):

- CPU Arm 20 core, GPU Blackwell, **128 GB** LPDDR5X unificata, **273 GB/s** (variante 64 GB dagli OEM)
- Alimentazione 240 W, TDP GB10 140 W, DGX OS (Ubuntu), cluster fino a 4 unità
- NVIDIA dichiara inferenza fino a **200B** parametri e fine-tuning fino a **70B**

**NVIDIA DGX Spark Founders Edition** (4 TB SSD):

- 7.299 € PcComponentes; 9.699,11 € Senetic; idealo da 9.119,24 € (12/11); Amazon 7.835,01 € il 20/10/2026 — [idealo](https://www.idealo.it/confronta-prezzi/208146353/nvidia-dgx-spark-founders-edition-940-54242-0005-000.html), [schedavideo](https://schedavideo.net/prezzi/sistemi-ai/nvidia-dgx-spark)

**ASUS Ascent GX10** (GB10, 128 GB, 1 TB):

- **4.699 €** [asustore.it](https://www.asustore.it/mini-pc-e-nuc-asus/4429-asus-pc-desktop-ascent-gx10-ai-supercomputer-4711636204439.html) — **sospetto: listino basso, da verificare disponibilità**
- Altri negozi da **6.149 €** ([idealo, 09/11](https://www.idealo.it/confronta-prezzi/208466308/asus-ascent-gx10-gg0003bn.html)) a 7.564 € Senetic

**Pro:** stessa memoria dello Strix Halo con **CUDA**, vLLM/TensorRT, fine-tuning fino a 70B dichiarato
**Contro:** più caro del Framework a parità di banda (273 vs ~215–256 GB/s misurati); 240 W; prezzi molto dispersi tra negozi

### Fascia 3 — Apple Mac Studio (banda alta, silenzioso)

Fonti: [Newsroom Apple 25/08/2026](https://www.apple.com/it/newsroom/2026/08/apple-introduces-new-mac-studio-with-m5-max-and-m5-ultra/), [specifiche Mac Studio](https://www.apple.com/it/mac-studio/specs/). Potenza massima continua 480 W.

**Mac Studio M5 Max**: CPU 18-core, GPU 32/40 core, **36–128 GB**, **460/614 GB/s**, da **3.049 €** — configurazione **128 GB: prezzo da verificare sul configuratore**

**Mac Studio M5 Ultra**: CPU 30/36 core, GPU 64/80 core, **96 / 256 / 512 GB**, banda **1,2 TB/s**

- Base 96 GB: **6.699 €**
- **256 GB: da verificare sul configuratore** (il dossier segnala solo un calcolo interno non verificato)
- **512 GB**, SSD 1 TB: **25.179 €**, rilevato 29/10/2026 — [Saggiamente](https://saggiamente.com/2026/10/mac-studio-m5-ultra-512gb-di-ram-da-25-179e-in-italia/)
- 512 GB + 4 TB: 26.829 €, consegna 23/11 — fonte secondaria [pasqualepillitteri.it](https://pasqualepillitteri.it/news/27929/mac-studio-m5-ultra-512gb-4tb-consegna-23-novembre)

Benchmark MLX (Bohemian Silicon, 15/10/2026 — **nota:** noleggia Mac Studio; interesse commerciale): gpt-oss-120b **120 tok/s** vuoto, **96** a 32K su M5 Ultra ([blog](https://bohemiansilicon.com/blog/mac-studio-m5-ultra-local-llm-benchmark/)).

**Mac Studio M3 Ultra** ricondizionato 96 GB: **5.269 €** — [Apple IT](https://www.apple.com/it/shop/product/fu973t/a/Mac-Studio-ricondizionato-con-chip-Apple-M3-Ultra-CPU-28%E2%80%91core-e-GPU-60%E2%80%91core). Nuovo 512 GB: listini terzi esauriti ([AJ Store](https://www.ajstore.it/mac-studio-cto/4443-mac-studio-chip-apple-m3-ultra-con-cpu-32-core-gpu-80-core-ne-32-core-ram-512gb-hd-ssd-2tb.html)).

**Pro:** banda doppia o tripla rispetto a Spark/Strix a 128 GB; silenzioso in ufficio tecnico
**Contro:** niente CUDA; training debole (P13); cluster Thunderbolt con esperienze negative in discussione community ([HN 50341396](https://news.ycombinator.com/item?id=50341396))

### Fascia 4 — workstation NVIDIA dedicata

**GeForce RTX 5090**: 32 GB GDDR7, **1.792 GB/s**, 575 W

- **Solo scheda da 7.881,20 €** (Inno3D, idealo 13/11/2026 08:59) — [link](https://www.idealo.it/confronta-prezzi/205796379/inno3d-geforce-rtx-5090.html)
- A fine 2025 circa 2.500 $ USA ([Hardware Corner](https://www.hardware-corner.net/rtx-5090-llm-benchmarks/)) — il rincaro europeo è visibile
- **PC completo: non verificato** (CPU, RAM, alimentatore esclusi)

**RTX PRO 6000 Blackwell Workstation Edition**: 96 GB GDDR7 ECC, **1.792 GB/s**, 600 W

- **Solo scheda da 19.812,18 €** (idealo 13/11/2026) — [link](https://www.idealo.it/confronta-prezzi/206328547/nvidia-rtx-pro-6000-blackwell.html)

Token/s: usare **solo** la tabella Hardware Corner Qwen3 Q4 (non confondere con 120B in 32 GB):

| Modello | tg a 4K | tg a 32K |
| --- | --- | --- |
| Qwen3 30B-A3B (MoE) | 234,3 | 110,7 |
| Qwen3 32B (denso) | 61,4 | 43,8 |

**Pro:** massima velocità su modelli medi; più utenti; ecosistema CUDA
**Contro:** 32 GB VRAM limitano la dimensione; consumo; prezzo scheda oggi gonfio

### Oltre il budget PMI — NVIDIA DGX Station GB300

**252 GB HBM3e** + 496 GB LPDDR5X con Grace 72-core, raffreddamento a liquido — da **94.930 $** ([Tom's Hardware, 23/08/2026](https://www.tomshardware.com/desktops/nvidias-gb300-powered-dgx-station-desktop-tower-listed-for-nearly-usd100-000-online-enterprise-ai-powerhouse-now-available-to-buy-for-mere-mortals-with-lots-of-cash)). **Solo USD**, nessun listino € trovato. Limite superiore, non una raccomandazione per una PMI.

## Tabella comparativa

«Modello massimo ragionevole» = **stima** (pesi Q4 + margine 20–30% per contesto e SO). Token/s solo se misurati nelle fonti citate. Prezzi IVA inclusa dove indicato, rilevato il 13/11/2026 salvo altra data in nota.

| Computer | Prezzo indicativo (fonte) | RAM/VRAM per modelli | Banda | Modello massimo ragionevole (stima) | Velocità misurata (esempi) | Attività adatte | Costo/beneficio |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mac mini M6 | da 1.079 € (Apple IT) | 16–32 GB unificata | 153–170 GB/s | 8–12B Q4/Q8 | Llama 2 7B Q4: 35,7 tok/s (#4167) | Prove, classificazione, estrazione leggera | Il più economico per **iniziare** |
| Mac mini M5 Pro | da 2.029 € (24 GB; 64 GB da configuratore) | 24–64 GB | 307 GB/s | ~27–30B Q4 con 48–64 GB | Llama 2 7B Q4: 66,3 tok/s | DDT, disegni con vision, chat leggera | Ottimo ufficio tecnico silenzioso |
| PC + RTX 5090 | scheda da 7.881 € + PC non verificato | 32 GB VRAM | 1.792 GB/s | ~32B denso Q4; gpt-oss-20b | Qwen3 30B-A3B: 234 tok/s; 32B: 61 tok/s (HC) | Velocità, più utenti, CUDA | Top velocità, VRAM limitata, 575 W |
| GMKtec EVO-X2 / Framework 395 | 3.449–3.999,96 € | 128 GB unificata | 256 GB/s (~215 misurati) | MoE ~120B; 70B denso lento | gpt-oss-120b: 33,7 tok/s (lhl); fino a ~55 (aggregatore) | Chat MoE, RAG, prove grandi | **128 GB al minor costo** |
| DGX Spark / ASUS GX10 | 4.699 € (ASUS, da verificare) – 9.699 € | 128 GB unificata | 273 GB/s | MoE fino a ~200B (NVIDIA) | gpt-oss-120b: 58,7 tok/s (42,8 @32K) | Come Strix + CUDA, fine-tuning 70B | Più caro a pari banda, stack maturo |
| Mac Studio M5 Max 128 GB | da 3.049 €; 128 GB da configuratore | fino a 128 GB | 614 GB/s | MoE ~120B più veloce | Llama 2 7B Q4: 119,9 tok/s | Strategia, RAG, vision | Banda alta a 128 GB |
| Mac Studio M5 Ultra 256 GB | da verificare sul configuratore | 256 GB | 1,2 TB/s | MoE ~300B Q4 (es. DeepSeek V4 Flash ~174 GB) | gpt-oss-120b: 120 tok/s (Bohemian Silicon) | Modelli grandi, contesto lungo | «Oltre 10.000 €» con buon rapporto capacità/velocità |
| Mac Studio M5 Ultra 512 GB | 25.179 € (1 TB, Saggiamente) | 512 GB | 1,2 TB/s | fascia DeepSeek V4.1 Flash | — | Laboratorio, frontiera aperta | Solo esigenza precisa; 256+256 vs un 512 |
| Workstation RTX PRO 6000 | scheda da 19.812 € | 96 GB VRAM | 1.792 GB/s | ~120B MoE o 70B Q8 | — | vLLM, multi-utente, training serio | 96 GB a velocità 5090, 600 W |
| DGX Station GB300 | da 94.930 $ | 252 GB HBM3e + 496 GB | — | centinaia di B | — | Centro calcolo | Fuori scala PMI |

## Modelli open: licenze da controllare

| Modello | Licenza | Nota |
| --- | --- | --- |
| Gemma 4, Qwen3.x, gpt-oss, Mistral Small 4, Qwen3-Embedding | Apache-2.0 | Uso tipico in sede senza sorprese, ma il legale conferma sempre |
| Llama 3.3 70B | Llama 3.3 Community | **Non** Apache/MIT |
| Qwen3.8-Flash-Next | Qwen Community 1.0 | Uso interno permesso; serving «Model as a Service» regolato |
| DeepSeek V4/V4.1 Flash | MIT | DeepSeek V4 Flash su 128 GB solo in quantizzazione aggressiva (Framework: UD-IQ2_XXS 90,9 GB) |

Modelli **superati ma ancora citati**: Llama 3.3 70B denso lento su Strix (5 tok/s); preferire MoE recenti (Qwen3.8, Gemma 4, gpt-oss, DeepSeek V4 Flash, Mistral Small 4).

## Quanto costa davvero e quando conviene

**Studio PMI su GPU consumer** — Knoop & Holtmann, [arXiv:2601.09527](https://arxiv.org/abs/2601.09527) (gennaio 2026):

- costo inferenza locale **0,001–0,04 $ per milione di token** (solo elettricità);
- **40–200×** meno delle API cloud di fascia bassa nel loro scenario;
- break-even **sotto quattro mesi** a 30 milioni di token/giorno su RTX 5060 Ti–5090 con modelli come Qwen3-8B, Gemma3-12B/27B, GPT-OSS-20B; throughput 5090 **3,5–4,6×** rispetto a 5060 Ti; NVFP4 **+1,6×** con −41% energia e 2–4% qualità in meno.

**Avvertenza obbligatoria:** lo studio usa **prezzi GPU precedenti ai rincari** del 2026; oggi la RTX 5090 in Europa costa circa il triplo del listino USA di fine 2025 citato in Hardware Corner. **Rifate il conto** con listini attuali e con i volumi reali (documenti/giorno, utenti, contesto).

Controcanto qualitativo dalla community: anche con hardware costoso, per un singolo sviluppatore il locale può risultare «not remotely cost-effective compared to cloud models» ([commento HN 50342363](https://news.ycombinator.com/item?id=50342363)) — allineato al post Frasma su usi sporadici e cloud. Locale conviene per **volumi alti e ripetitivi** (documenti in entrata, estrazioni batch) o quando **i dati non possono uscire**, non per tre domande a settimana.

**Energia:** RTX 5090 e PRO 6000 fino a 575–600 W; DGX Spark alimentatore 240 W; Mac mini max 155 W (specifiche Apple). Zähl et al. ([arXiv:2608.00008](https://arxiv.org/abs/2608.00008)) su RTX 4060 Ti: fino a **8,6×** energia per token tra modelli piccoli — anche la scelta del modello pesa.

**Incentivi:** l'hardware può rientrare nell'[iperammortamento 2026](/blog/iperammortamento-2026) se ne avete i requisiti di interconnessione — senza ripetere qui gli importi del post dedicato.

## Errori da evitare

1. **Comprare 512 GB «per sicurezza»** senza un modello che li usa: Saggiamente nota che la differenza 256→512 GB può costare quanto un secondo Mac — sensato solo con esigenza misurata.
2. **Cluster di Mac Studio** per shardare un modello: esperienza negativa in thread community ([HN 50341396](https://news.ycombinator.com/item?id=50341396)).
3. **Fine-tuning come prima mossa** invece di RAG ([arXiv:2608.07226](https://arxiv.org/abs/2608.07226)).
4. **Benchmark solo con prompt corti** su modelli enormi: la lettura di documenti lunghi (`pp`) può richiedere minuti ([DeepSeek 671B su M3 Ultra](https://www.hardware-corner.net/mac-studio-m3-ultra-deepseek-llamacpp/)).
5. **Credere che il computer sostituisca processo e ERP** — vedi [agenti AI](/blog/agenti-ai-per-aziende) e [officina intorno al modello](/blog/ai-manifattura-officina-intorno-al-modello).

## Come provare prima di comprare

Prima del carrello: una cartella di **documenti veri** (DDT storti, PDF senza OCR perfetto, DWG con attributi mancanti). Fate girare un modello vision da 8B su Mac mini o un PC che avete già. Misurate: tempo per documento, campi sbagliati, chi conferma. Se i numeri non tornano, un server da 25.000 € non risolve.

Stack di partenza già allineato al lavoro Frasma su documenti: **Ollama** o **llama.cpp**, modelli **Qwen-VL** / **Qwen3.8** dove serve vision.

[Prenota 30 minuti di analisi del processo con Frasma](/manifattura) — per capire se il collo di bottiglia è hardware, flusso o dati, non solo la scheda video.

## Fonti e paper

### Paper (arXiv)

1. [GPTQ](https://arxiv.org/abs/2210.17323) — Frantar et al., 2022  
2. [AWQ](https://arxiv.org/abs/2306.00978) — Lin et al., 2023  
3. [QLoRA](https://arxiv.org/abs/2305.14314) — Dettmers et al., 2023  
4. [The case for 4-bit precision](https://arxiv.org/abs/2212.09720) — Dettmers & Zettlemoyer, 2022  
5. [LLM.int8()](https://arxiv.org/abs/2208.07339) — Dettmers et al., 2022  
6. [LLM Inference Unveiled (roofline)](https://arxiv.org/abs/2402.16363) — Yuan et al., 2024  
7. [Survey Efficient Inference](https://arxiv.org/abs/2404.14294) — Zhou et al., 2024  
8. [PagedAttention / vLLM](https://arxiv.org/abs/2309.06180) — Kwon et al., 2023  
9. [LLM in a flash (Apple)](https://arxiv.org/abs/2312.11514) — Alizadeh et al., 2023  
10. [Small Language Models are the Future of Agentic AI](https://arxiv.org/abs/2506.02153) — Belcak et al., 2025  
11. [Profiling LLM Inference on Apple Silicon](https://arxiv.org/abs/2508.08531) — Benazir & Lin, 2025  
12. [Local LLM Inference on Apple Silicon (comparative)](https://arxiv.org/abs/2511.05502) — Rajesh et al., 2025  
13. [Profiling Apple Silicon for ML Training](https://arxiv.org/abs/2501.14925) — Feng et al., 2025  
14. [Private LLM Inference on Consumer Blackwell GPUs (PMI)](https://arxiv.org/abs/2601.09527) — Knoop & Holtmann, 2026 — *prezzi GPU pre-rincari 2026*  
15. [Energy Efficiency of Local LLMs](https://arxiv.org/abs/2608.00008) — Zähl et al., 2026  
16. [Native LLM/MLLM at Scale on Apple Silicon](https://arxiv.org/abs/2601.19139) — Barrios, 2026  
17. [Dual-Node DGX Spark fine-tuning note](https://arxiv.org/abs/2608.07226) — Iyer, 2026  

### Benchmark e community

- [llama.cpp discussion #4167](https://github.com/ggml-org/llama.cpp/discussions/4167) (Apple Silicon, banda)  
- [llama.cpp DGX Spark benches](https://github.com/ggml-org/llama.cpp/blob/master/benches/dgx-spark/dgx-spark.md)  
- [llama.cpp quantize README](https://github.com/ggml-org/llama.cpp/blob/master/tools/quantize/README.md)  
- [lhl/strix-halo-testing](https://github.com/lhl/strix-halo-testing/blob/main/llm-bench/README.md)  
- [Hardware Corner — RTX 5090](https://www.hardware-corner.net/rtx-5090-llm-benchmarks/)  
- [Hardware Corner — M3 Ultra DeepSeek](https://www.hardware-corner.net/mac-studio-m3-ultra-deepseek-llamacpp/)  
- [Bohemian Silicon — M5 Ultra](https://bohemiansilicon.com/blog/mac-studio-m5-ultra-local-llm-benchmark/)  
- [HN Ask: hardware for local LLMs (02/11/2026)](https://news.ycombinator.com/item?id=50337431)  

### Hardware e prezzi (listini terzi)

Apple [Mac mini](https://www.apple.com/it/mac-mini/specs/) e [Mac Studio](https://www.apple.com/it/mac-studio/specs/) specifiche IT; [Newsroom M5 Studio 25/08/2026](https://www.apple.com/it/newsroom/2026/08/apple-introduces-new-mac-studio-with-m5-max-and-m5-ultra/); NVIDIA [DGX Spark IT](https://www.nvidia.com/it-it/products/workstations/dgx-spark/); idealo (RTX 5090, PRO 6000, Spark, GX10); schedavideo (EVO-X2, Spark); asustore GX10; frame.work Desktop; BlogiPhone Framework; Saggiamente M5 Ultra 512 GB; Tom's Hardware DGX Station GB300.

**Autore:** Francesco Saverio Mazzi — Frasma
