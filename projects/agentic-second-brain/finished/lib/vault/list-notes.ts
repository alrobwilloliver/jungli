import type { NoteSummary, VaultNote } from "./types";

const comparePaths = (left: VaultNote, right: VaultNote) =>
  left.path < right.path ? -1 : left.path > right.path ? 1 : 0;

export function listNotes(notes: VaultNote[], folder?: string): NoteSummary[] {
  return notes
    .filter((note) => folder === undefined || note.folder === folder)
    .toSorted(comparePaths)
    .map(({ path, title, folder: noteFolder, summary, tags }) => ({
      path,
      title,
      folder: noteFolder,
      summary,
      tags: [...tags],
    }));
}
