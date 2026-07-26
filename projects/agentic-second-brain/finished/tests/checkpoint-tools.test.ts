import { describe, expect, test } from "vitest";

import { listNotes } from "@/lib/vault/list-notes";
import { readNote } from "@/lib/vault/read-note";
import { searchNotes } from "@/lib/vault/search-notes";
import type { VaultNote } from "@/lib/vault/types";

const note = (
  path: string,
  title: string,
  body: string,
  overrides: Partial<VaultNote> = {},
): VaultNote => ({
  path,
  title,
  folder: path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : ".",
  summary: `${title} summary`,
  tags: [],
  body,
  characterCount: body.length,
  ...overrides,
});

describe("tool checkpoint", () => {
  test("lists sorted metadata without exposing note bodies", () => {
    const notes = [
      note("projects/zeta.md", "Zeta", "private zeta"),
      note("career/alpha.md", "Alpha", "private alpha"),
    ];

    expect(listNotes(notes)).toEqual([
      {
        path: "career/alpha.md",
        title: "Alpha",
        folder: "career",
        summary: "Alpha summary",
        tags: [],
      },
      {
        path: "projects/zeta.md",
        title: "Zeta",
        folder: "projects",
        summary: "Zeta summary",
        tags: [],
      },
    ]);
    expect(JSON.stringify(listNotes(notes))).not.toContain("private");
    expect(listNotes(notes, "projects").map(({ path }) => path)).toEqual([
      "projects/zeta.md",
    ]);
  });

  test("ranks title above tag and folder above body matches", () => {
    const notes = [
      note("body.md", "Body only", "launch"),
      note("launch/item.md", "Folder only", "none"),
      note("tag.md", "Tag only", "none", { tags: ["launch"] }),
      note("title.md", "Launch plan", "none"),
    ];

    expect(
      searchNotes(notes, "launch").map(({ path, score }) => [path, score]),
    ).toEqual([
      ["title.md", 6],
      ["tag.md", 4],
      ["launch/item.md", 3],
      ["body.md", 1],
    ]);
  });

  test("returns no more than five metadata results with 320-character snippets", () => {
    const notes = Array.from({ length: 7 }, (_, index) =>
      note(
        `notes/${index}.md`,
        `Result ${index}`,
        `needle ${"x".repeat(500)} SECRET-${index}`,
      ),
    );

    const results = searchNotes(notes, "needle");

    expect(results).toHaveLength(5);
    expect(results.every(({ snippet }) => snippet.length <= 320)).toBe(true);
    expect(results.every((result) => !("body" in result))).toBe(true);
    expect(JSON.stringify(results)).not.toContain("SECRET");
  });

  test("reads only an exact allowlisted path and rejects traversal variants", () => {
    const notes = [note("career/about.md", "About", "complete note")];
    const reads = new Set<string>();

    expect(readNote(notes, "career/about.md", reads)).toEqual(notes[0]);
    expect([...reads]).toEqual(["career/about.md"]);
    expect(() => readNote(notes, "career/About.md")).toThrow("Unknown");

    for (const unsafePath of [
      "/career/about.md",
      "C:\\career\\about.md",
      "../secret.md",
      "career/../../secret.md",
      "%2e%2e%2fsecret.md",
      "%252e%252e%252fsecret.md",
      "%2fetc%2fsecret.md",
    ]) {
      expect(() => readNote(notes, unsafePath)).toThrow(/absolute|traversal/);
    }
  });

  test("round-trips opaque paths emitted by listing and search", () => {
    const notes = [
      note("notes/literal%20.md", "Encoded-looking", "opaque evidence"),
      note("notes/100%.md", "Percent", "opaque evidence"),
      note("notes/%ZZ.md", "Malformed escape", "opaque evidence"),
    ];
    const emittedPaths = new Set([
      ...listNotes(notes).map(({ path }) => path),
      ...searchNotes(notes, "opaque").map(({ path }) => path),
    ]);

    expect([...emittedPaths]).toEqual([
      "notes/%ZZ.md",
      "notes/100%.md",
      "notes/literal%20.md",
    ]);
    expect(
      [...emittedPaths].map((emittedPath) => readNote(notes, emittedPath)),
    ).toEqual([notes[2], notes[1], notes[0]]);
  });
});
