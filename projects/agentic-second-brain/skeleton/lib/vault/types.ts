export interface VaultNote {
  path: string;
  title: string;
  folder: string;
  summary: string;
  tags: string[];
  body: string;
  characterCount: number;
}

export type NoteSummary = Pick<
  VaultNote,
  "path" | "title" | "folder" | "summary" | "tags"
>;

export interface NoteSearchResult extends NoteSummary {
  score: number;
  snippet: string;
}
