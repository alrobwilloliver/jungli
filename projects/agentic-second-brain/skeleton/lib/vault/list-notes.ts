import type { NoteSummary, VaultNote } from "./types";

export function listNotes(
  _notes: VaultNote[],
  _folder?: string,
): NoteSummary[] {
  void _notes;
  void _folder;
  throw new Error("checkpoint_not_implemented");
}
