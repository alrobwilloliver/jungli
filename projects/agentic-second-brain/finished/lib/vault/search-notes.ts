import type { NoteSearchResult, VaultNote } from "./types";

const WEIGHTS = {
  exactTitle: 12,
  titleTerm: 6,
  tagTerm: 4,
  folderTerm: 3,
  bodyTerm: 1,
} as const;

const MAX_RESULTS = 5;
const MAX_SNIPPET_CHARACTERS = 320;

const normalize = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("en")
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .trim();

const termsFor = (value: string) =>
  new Set(normalize(value).split(" ").filter(Boolean));

const scoreNote = (note: VaultNote, query: string, queryTerms: string[]) => {
  const title = normalize(note.title);
  const titleTerms = termsFor(note.title);
  const tagTerms = termsFor(note.tags.join(" "));
  const folderTerms = termsFor(note.folder);
  const bodyTerms = termsFor(note.body);
  let score = title === query ? WEIGHTS.exactTitle : 0;

  for (const term of queryTerms) {
    if (titleTerms.has(term)) score += WEIGHTS.titleTerm;
    if (tagTerms.has(term)) score += WEIGHTS.tagTerm;
    if (folderTerms.has(term)) score += WEIGHTS.folderTerm;
    if (bodyTerms.has(term)) score += WEIGHTS.bodyTerm;
  }

  return score;
};

const snippetFor = (body: string, queryTerms: string[]) => {
  if (body.length <= MAX_SNIPPET_CHARACTERS) return body;

  const normalizedBody = normalize(body);
  const firstMatch = queryTerms
    .map((term) => normalizedBody.indexOf(term))
    .filter((index) => index >= 0)
    .sort((left, right) => left - right)[0];
  const start =
    firstMatch === undefined
      ? 0
      : Math.max(0, firstMatch - Math.floor(MAX_SNIPPET_CHARACTERS / 3));

  return body.slice(start, start + MAX_SNIPPET_CHARACTERS);
};

export function searchNotes(
  notes: VaultNote[],
  rawQuery: string,
): NoteSearchResult[] {
  const query = normalize(rawQuery);
  if (!query) return [];

  const queryTerms = [...termsFor(query)];

  return notes
    .map((note) => ({ note, score: scoreNote(note, query, queryTerms) }))
    .filter(({ score }) => score > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        (left.note.path < right.note.path
          ? -1
          : left.note.path > right.note.path
            ? 1
            : 0),
    )
    .slice(0, MAX_RESULTS)
    .map(({ note, score }) => ({
      path: note.path,
      title: note.title,
      folder: note.folder,
      summary: note.summary,
      tags: [...note.tags],
      score,
      snippet: snippetFor(note.body, queryTerms),
    }));
}
