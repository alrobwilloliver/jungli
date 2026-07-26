import type { NoteSearchResult, VaultNote } from "./types";

export function searchNotes(
  _notes: VaultNote[],
  _query: string,
): NoteSearchResult[] {
  void _notes;
  void _query;
  throw new Error("checkpoint_not_implemented");
}
