---
name: weekly-manufacturing-ai-blog
description: Weekly Frasma blog post on manufacturing AI problems. Use when a Cursor Automation or Cloud Agent should research public papers and news, write one Italian article, generate a 16:9 cover, score the draft, and open a pull request.
---

# Weekly manufacturing AI blog

One article per run. Italian prose, English filenames and frontmatter keys. Follow existing posts in `content/blog/`. Do not merge the pull request.

## Cursor Automation prompt (paste in the UI)

```
Follow .cursor/skills/weekly-manufacturing-ai-blog/SKILL.md.

Write exactly one Italian blog post on a manufacturing + AI problem, anchored to at least one public scientific paper. Generate a 16:9 cover. Open one pull request only if the scorecard total is ≥18/25 and no criterion is 1. Put the scorecard in the PR body. Do not merge. If sources are weak or the topic duplicates an existing post, do nothing.
```

UI settings:

- Trigger: scheduled cron, Monday. Example `0 8 * * 1`. Confirm timezone in the Automations UI.
- Repository: this repo (cron defaults to no repository — that cannot write files or open PRs).
- Tools: pull request creation on, Memories on, computer use on.

## Existing slugs (do not repeat these theses)

Read every file in `content/blog/` before choosing a topic.

Already covered — pick a different problem:

- `non-collegare-agenti-ai-direttamente-erp` — do not write AI agents straight into the ERP
- `automatizzare-ddt-email-intelligenza-artificiale` — DDT from email → Excel → ERP
- `ai-in-azienda-delega-la-forma-verifica-i-fatti` — webinar: delegate form, verify facts
- `bando-si40-2026`, `voucher-cloud-cybersecurity-2026`, `voucher-doppia-transizione-lombardia-2026`, `iperammortamento-2026` — funding instruments
- `smartcaricrop-dss-fertilizzazione-caraibi`, `seminai`, `freelancedev` — product/project posts

Also skip any topic listed in Memories from previous weekly runs.

Do not cannibalize the Search Console probes in `docs/seo-geo-offsite.md`. DDT → Mago stays on `/servizi/ddt-erp` and the existing DDT posts.

## Research

1. Search the public web for a **manufacturing + AI problem** a shop owner would type into Google (downtime, dirty machine data, false alerts, quality inspection, changeover, spare parts, operator trust, small data).
2. Find **at least one open scientific paper** (arXiv, conference, open journal). Open the URL. Quote only numbers and claims that are on that page. No invented DOI.
3. News and Google queries are demand signals, not the only source. Do not copy paywalled text.
4. Prefer field evidence (survey, factory deployment) over generic AI overviews.

If you cannot verify one paper URL, stop. Do not open a PR.

## Article file

Create `content/blog/{slug}.md`. Mirror frontmatter from `content/blog/iperammortamento-2026.md`:

```yaml
slug: kebab-case-italian
title: "Concrete Italian title"
seoTitle: "Query-shaped title | Frasma"
seoDescription: "One or two sentences, under ~160 characters"
excerpt: "One sentence the shop owner can use"
coverImage: /images/blog/cover-{slug}.png
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
tags:
  - intelligenza-artificiale
  - manifattura
status: published
```

Add more tags only if they already appear on other posts (`automazione-documentale`, `ddt`, `erp`, `finanza-agevolata`, …) or are a clear new topic slug (`manutenzione-predittiva`).

Voice:

- First person, Francesco / Frasma.
- Problem → consequence on the floor → what to do this week.
- No hype, no “Industry 4.0 software house”, no invented savings.
- Internal links to 1–3 existing posts or `/manifattura` / `/servizi/...` when they help. Do not force DDT links.
- End with sources (paper URLs) and `**Autore:** Francesco Saverio Mazzi — Frasma`.

`status: published` is correct: the PR is the review. Merge publishes.

## Cover

1. Generate a 16:9 illustration (`GenerateImage`, `aspect_ratio: "16:9"`).
2. Style: vintage hand-drawn workshop illustration, parchment/sepia, like `public/images/blog/cover-agenti-ai-erp.png`. Little or no text. If text is needed, Italian only, short labels.
3. Save as `public/images/blog/cover-{slug}.png`.
4. Set `coverImage: /images/blog/cover-{slug}.png`.

If image generation is unavailable in Cloud, try computer use. If that fails, still open the PR only if the scorecard passes otherwise, and mark the cover as missing in the PR body (not merge-ready).

## Scorecard (put in the PR body)

Score each criterion 1–5:

| Criterion | What 5 means |
| --- | --- |
| Fonti | Paper URL opened; numbers match the page; no fake DOI |
| Originalità | Different thesis from every existing slug |
| Fit query | Title and H2 match a real shop-owner Google query |
| Utilità officina | Problem → consequence → a concrete next step |
| On-page | Frontmatter complete, 16:9 cover committed, tags, internal links |

- Total /25.
- Open a PR only if total ≥ 18 and **no criterion is 1**.
- Verdict line: `apri PR` or `non aprire`.

This score is editorial/SEO of the draft, not live Google rank. Do not claim Search Console positions.

## Memories

After a successful PR, append to Memories:

- date, slug, one-line thesis, paper URL, total score

Next week, refuse that thesis.

## Quality gate

Do nothing (no PR) when:

- no verified open paper
- topic duplicates an existing post or a Memory
- scorecard fails the threshold
- you would have to invent facts, quotes, or funding numbers

## Do not

- Auto-merge
- Scrape paywalled journals
- Publish via CMS APIs
- Change homepage title or DDT cluster URLs
- Write application code unless a post is broken without it
