import { knowledgeCatalog } from "./catalog";
import {
  SearchKnowledgeInputSchema,
  SearchResultSchema,
  type Locale,
  type LocalizedKnowledgeEntry,
  type SearchKnowledgeInput,
  type SearchResult,
} from "./types";

const MAX_RESULTS = 5;

const STOP_WORDS: Record<Locale, ReadonlySet<string>> = {
  it: new Set([
    "a",
    "al",
    "con",
    "da",
    "dei",
    "del",
    "della",
    "di",
    "e",
    "gli",
    "i",
    "il",
    "in",
    "la",
    "le",
    "lo",
    "per",
    "su",
    "un",
    "una",
  ]),
  en: new Set([
    "a",
    "an",
    "and",
    "for",
    "from",
    "in",
    "of",
    "on",
    "the",
    "to",
    "with",
  ]),
};

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function queryTokens(query: string, locale: Locale): string[] {
  const uniqueTokens = new Set(
    normalize(query)
      .split(" ")
      .filter((token) => token.length > 1 && !STOP_WORDS[locale].has(token)),
  );

  return [...uniqueTokens];
}

function pageBoost(entry: LocalizedKnowledgeEntry, pagePath?: string): number {
  if (!pagePath) return 0;

  const normalizedPagePath = pagePath.replace(/\/+$/, "") || "/";
  const pageWithoutHash = normalizedPagePath.split("#")[0] || "/";

  if (
    entry.pagePaths.some(
      (candidate) => (candidate.replace(/\/+$/, "") || "/") === normalizedPagePath,
    )
  ) {
    return 25;
  }

  if (
    entry.pagePaths.some(
      (candidate) => (candidate.split("#")[0].replace(/\/+$/, "") || "/") === pageWithoutHash,
    )
  ) {
    return 10;
  }

  return 0;
}

function scoreEntry(
  entry: LocalizedKnowledgeEntry,
  query: string,
  tokens: string[],
  locale: Locale,
  pagePath?: string,
): number {
  const title = normalize(entry.title[locale]);
  const summary = normalize(entry.summary[locale]);
  const details = normalize(entry.details.map((item) => item[locale]).join(" "));
  const keywords = entry.keywords[locale].map(normalize);

  let score = 0;

  if (title === query) score += 140;
  else if (title.includes(query)) score += 90;

  if (keywords.includes(query)) score += 80;
  else if (keywords.some((keyword) => keyword.includes(query))) score += 45;

  if (summary.includes(query)) score += 50;
  if (details.includes(query)) score += 25;

  for (const token of tokens) {
    if (title.split(" ").includes(token)) score += 20;
    else if (title.includes(token)) score += 12;

    if (keywords.some((keyword) => keyword === token)) score += 18;
    else if (keywords.some((keyword) => keyword.includes(token))) score += 9;

    if (summary.includes(token)) score += 7;
    if (details.includes(token)) score += 4;
  }

  return score > 0 ? score + pageBoost(entry, pagePath) : 0;
}

export function searchKnowledge(input: SearchKnowledgeInput): SearchResult[] {
  const parsedInput = SearchKnowledgeInputSchema.parse(input);
  const normalizedQuery = normalize(parsedInput.query);
  const tokens = queryTokens(parsedInput.query, parsedInput.locale);

  if (!normalizedQuery || tokens.length === 0) return [];

  return knowledgeCatalog.entries
    .map((entry) => ({
      entry,
      score: scoreEntry(
        entry,
        normalizedQuery,
        tokens,
        parsedInput.locale,
        parsedInput.pagePath,
      ),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      if (left.entry.id === right.entry.id) return 0;
      return left.entry.id < right.entry.id ? -1 : 1;
    })
    .slice(0, MAX_RESULTS)
    .map(({ entry, score }) =>
      SearchResultSchema.parse({
        id: entry.id,
        category: entry.category,
        title: entry.title[parsedInput.locale],
        summary: entry.summary[parsedInput.locale],
        details: entry.details.map((item) => item[parsedInput.locale]),
        score,
      }),
    );
}
