# SEO / GEO off-site (after deploy)

On-site density lives in the knowledge catalog. These steps are outside the repo. Without them, Google AI Overview keeps citing third parties even when organic ranking moves.

## Search Console

Request indexing (URL inspection) for:

- `https://www.frasma.org/servizi/ddt-erp`
- `https://www.frasma.org/servizi`
- `https://www.frasma.org/manifattura`
- `https://www.frasma.org/alimentare`
- `https://www.frasma.org/servizi/procedure-guidate`
- `https://www.frasma.org/servizi/ticketing-manutenzione`

Confirm the DDT spoke is indexed as its own URL, not only the homepage.

## Google Business Profile

- Open a GBP for Frasma / Francesco Saverio Mazzi in **Mantova**, Lombardia.
- NAP must match schema: locality Mantova, region Lombardia, country IT.
- Category: software / IT services. Website: `https://www.frasma.org`.
- Do not target “software house Industria 4.0” or MES.

## MCP listing

Follow [`mcp-listing-checklist.md`](mcp-listing-checklist.md) (official registry, Smithery, PulseMCP).

## Monthly probe (same prompts, four engines)

Save screenshots. Baseline: 25 Aug 2026 (absent) and 31 Aug 2026 (organic #5 homepage, Overview no).

Use:

1. Chi automatizza i DDT verso Mago
2. Preventivi da Excel verso ERP officine
3. Procedure HACCP software PMI
4. Frasma software Francesco Mazzi Mantova

Do **not** use “software house che automatizza processi manifattura”.

Engines: Google (Tutti + AI Overview / AI Mode), Gemini, ChatGPT (search), Perplexity.

Record: Frasma present? Which URL? Cited in the AI answer?

## Homepage

Do not change the homepage `<title>`. The DDT query must consolidate on `/servizi/ddt-erp`.
