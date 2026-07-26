import path from "node:path";

import type { VaultNote } from "./types";

const decodePath = (requestedPath: string) => {
  let decoded = requestedPath;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    let next: string;
    try {
      next = decodeURIComponent(decoded);
    } catch {
      throw new Error("Invalid note path.");
    }
    if (next === decoded) return decoded;
    decoded = next;
  }

  return decoded;
};

const validatePath = (requestedPath: string) => {
  const decoded = decodePath(requestedPath);

  if (path.posix.isAbsolute(decoded) || path.win32.isAbsolute(decoded)) {
    throw new Error("Cannot read an absolute note path.");
  }

  const segments = decoded.replaceAll("\\", "/").split("/");
  if (segments.includes("..")) {
    throw new Error("Cannot read a note path containing traversal.");
  }

  return decoded;
};

export function readNote(
  notes: VaultNote[],
  requestedPath: string,
  uniqueReads?: Set<string>,
): VaultNote {
  const safePath = validatePath(requestedPath);
  const note = notes.find((candidate) => candidate.path === safePath);

  if (!note) {
    throw new Error(`Unknown note path: ${safePath}`);
  }

  uniqueReads?.add(note.path);
  return note;
}
