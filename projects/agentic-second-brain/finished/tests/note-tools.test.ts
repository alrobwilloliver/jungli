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

describe("listNotes", () => {
  const notes = [
    note("projects/zeta.md", "Zeta", "Private zeta body"),
    note("career/alpha.md", "Alpha", "Private alpha body"),
    note("projects/beta.md", "Beta", "Private beta body"),
  ];

  test("lists all notes alphabetically as metadata-only summaries", () => {
    const result = listNotes(notes);

    expect(result.map(({ path }) => path)).toEqual([
      "career/alpha.md",
      "projects/beta.md",
      "projects/zeta.md",
    ]);
    expect(result[0]).toEqual({
      path: "career/alpha.md",
      title: "Alpha",
      folder: "career",
      summary: "Alpha summary",
      tags: [],
    });
    expect(result.every((item) => !("body" in item))).toBe(true);
  });

  test("filters by exact folder and returns an empty list for no match", () => {
    expect(listNotes(notes, "projects").map(({ path }) => path)).toEqual([
      "projects/beta.md",
      "projects/zeta.md",
    ]);
    expect(listNotes(notes, "project")).toEqual([]);
    expect(listNotes(notes, "")).toEqual([]);
  });
});

describe("searchNotes", () => {
  test("uses the locked field weights and breaks score ties by path", () => {
    const notes = [
      note("body.md", "Body only", "launch"),
      note("folder/term.md", "Folder only", "none", { folder: "launch" }),
      note("tag.md", "Tag only", "none", { tags: ["launch"] }),
      note("title-b.md", "Launch notes", "none"),
      note("title-a.md", "Launch plan", "none"),
      note("exact.md", "Launch", "none"),
    ];

    const result = searchNotes(notes, "launch");

    expect(result.map(({ path, score }) => [path, score])).toEqual([
      ["exact.md", 18],
      ["title-a.md", 6],
      ["title-b.md", 6],
      ["tag.md", 4],
      ["folder/term.md", 3],
    ]);
  });

  test("ranks a body-only term below title, tag, and folder matches", () => {
    const notes = [
      note("body.md", "Body only", "launch"),
      note("folder/term.md", "Folder only", "none", { folder: "launch" }),
      note("tag.md", "Tag only", "none", { tags: ["launch"] }),
      note("title.md", "Launch plan", "none"),
    ];

    expect(
      searchNotes(notes, "launch").map(({ path, score }) => [path, score]),
    ).toEqual([
      ["title.md", 6],
      ["tag.md", 4],
      ["folder/term.md", 3],
      ["body.md", 1],
    ]);
  });

  test("normalizes case and punctuation and scores every multi-word term", () => {
    const notes = [
      note("projects/growth.md", "Newsletter Growth", "Retention lessons", {
        tags: ["Customer-Success"],
      }),
      note("other.md", "Other", "newsletter only"),
    ];

    const result = searchNotes(notes, "NEWSLETTER, growth!");

    expect(result[0]).toMatchObject({
      path: "projects/growth.md",
      score: 24,
    });
  });

  test("returns at most five bounded snippets and never note bodies", () => {
    const secretTail = "SECRET-TAIL";
    const notes = Array.from({ length: 7 }, (_, index) =>
      note(
        `notes/${index}.md`,
        `Result ${index}`,
        `needle ${"x".repeat(500)} ${secretTail}-${index}`,
      ),
    );

    const result = searchNotes(notes, "needle");

    expect(result).toHaveLength(5);
    expect(result.every(({ snippet }) => snippet.length <= 320)).toBe(true);
    expect(result.every((item) => !("body" in item))).toBe(true);
    expect(JSON.stringify(result)).not.toContain(secretTail);
  });

  test("keeps the matched body term in a snippet after a long normalized prefix", () => {
    const result = searchNotes(
      [note("punctuation.md", "Punctuation", `${"!".repeat(500)}needle tail`)],
      "needle",
    );

    expect(result[0].snippet).toContain("needle");
    expect(result[0].snippet.length).toBeLessThanOrEqual(320);
  });

  test("returns no results for a punctuation-only query", () => {
    expect(searchNotes([note("one.md", "One", "body")], " ... !!! ")).toEqual(
      [],
    );
  });
});

describe("readNote", () => {
  const notes = [
    note("career/about.md", "About", "Complete note contents"),
    note("projects/launch.md", "Launch", "Launch contents"),
  ];

  test("returns an already-loaded allowlisted note and accounts unique reads", () => {
    const reads = new Set<string>();

    expect(readNote(notes, "career/about.md", reads)).toEqual(notes[0]);
    expect(readNote(notes, "career/about.md", reads)).toEqual(notes[0]);
    expect(readNote(notes, "projects/launch.md", reads)).toEqual(notes[1]);
    expect([...reads]).toEqual(["career/about.md", "projects/launch.md"]);
  });

  test("round-trips exact opaque paths emitted by listing and search", () => {
    const opaqueNotes = [
      note("notes/literal%20.md", "Encoded-looking", "opaque evidence"),
      note("notes/100%.md", "Percent", "opaque evidence"),
      note("notes/%ZZ.md", "Malformed escape", "opaque evidence"),
    ];
    const emittedPaths = new Set([
      ...listNotes(opaqueNotes).map(({ path }) => path),
      ...searchNotes(opaqueNotes, "opaque").map(({ path }) => path),
    ]);

    expect([...emittedPaths]).toEqual([
      "notes/%ZZ.md",
      "notes/100%.md",
      "notes/literal%20.md",
    ]);
    expect(
      [...emittedPaths].map((emittedPath) =>
        readNote(opaqueNotes, emittedPath),
      ),
    ).toEqual([opaqueNotes[2], opaqueNotes[1], opaqueNotes[0]]);
  });

  test.each([
    ["unknown.md", "unknown"],
    ["/career/about.md", "absolute"],
    ["C:\\career\\about.md", "absolute"],
    ["../secret.md", "traversal"],
    ["career/../../secret.md", "traversal"],
    ["%2e%2e%2fsecret.md", "traversal"],
    ["%252e%252e%252fsecret.md", "traversal"],
    ["%2fetc%2fsecret.md", "absolute"],
  ])("rejects %s without changing accounting", (requestedPath, reason) => {
    const reads = new Set<string>();

    expect(() => readNote(notes, requestedPath, reads)).toThrow(reason);
    expect(reads.size).toBe(0);
  });
});
