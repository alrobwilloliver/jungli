import path from "node:path";

import type { VaultNote } from "./types";

const decodeSafetyEscapes = (value: string) =>
  value.replace(/%([0-9a-f]{2})/gi, (_escape, hex: string) =>
    String.fromCharCode(Number.parseInt(hex, 16)),
  );

const validatePathVariant = (value: string) => {
  if (path.posix.isAbsolute(value) || path.win32.isAbsolute(value)) {
    throw new Error("Cannot read an absolute note path.");
  }

  const segments = value.replaceAll("\\", "/").split("/");
  if (segments.includes("..")) {
    throw new Error("Cannot read a note path containing traversal.");
  }
};

const validatePath = (requestedPath: string) => {
  let safetyVariant = requestedPath;

  while (true) {
    validatePathVariant(safetyVariant);
    const next = decodeSafetyEscapes(safetyVariant);
    if (next === safetyVariant) return;
    safetyVariant = next;
  }
};

export function readNote(
  notes: VaultNote[],
  requestedPath: string,
  uniqueReads?: Set<string>,
): VaultNote {
  validatePath(requestedPath);
  const note = notes.find((candidate) => candidate.path === requestedPath);

  if (!note) {
    throw new Error(`Unknown note path: ${requestedPath}`);
  }

  uniqueReads?.add(note.path);
  return note;
}
