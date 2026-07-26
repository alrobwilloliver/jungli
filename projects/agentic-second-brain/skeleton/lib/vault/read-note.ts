import type { VaultNote } from "./types";

export function readNote(
  _notes: VaultNote[],
  _requestedPath: string,
  _uniqueReads?: Set<string>,
): VaultNote {
  void _notes;
  void _requestedPath;
  void _uniqueReads;
  throw new Error("checkpoint_not_implemented");
}
