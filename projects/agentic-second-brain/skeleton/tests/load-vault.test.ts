import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { afterEach, describe, expect, test, vi } from "vitest";

import { loadVault } from "@/lib/vault/load-vault";

const fsMock = vi.hoisted(() => ({
  actualReadFile:
    undefined as unknown as typeof import("node:fs/promises").readFile,
  readFile: vi.fn(),
}));

vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs/promises")>();
  fsMock.actualReadFile = actual.readFile;
  fsMock.readFile.mockImplementation(actual.readFile);
  return { ...actual, readFile: fsMock.readFile };
});

const fixtureRoots: string[] = [];
const makeVault = async () => {
  const root = await mkdtemp(path.join(tmpdir(), "vault-loader-"));
  fixtureRoots.push(root);
  return root;
};
const sampleVault = fileURLToPath(new URL("../vault", import.meta.url));

describe("loadVault", () => {
  afterEach(async () => {
    fsMock.readFile.mockReset();
    fsMock.readFile.mockImplementation(fsMock.actualReadFile);
    await Promise.all(
      fixtureRoots.splice(0).map((root) => rm(root, { recursive: true })),
    );
  });

  test("recursively loads Markdown notes with stable POSIX paths and metadata", async () => {
    const root = await makeVault();
    await mkdir(path.join(root, "career"), { recursive: true });
    await mkdir(path.join(root, "projects"), { recursive: true });
    await writeFile(
      path.join(root, "projects", "zeta.md"),
      [
        "---",
        "title: Zeta launch",
        'summary: "  A launch note.  "',
        'tags: [" launch ", " ", growth, 42]',
        "---",
        "Launch body.",
      ].join("\n"),
    );
    await writeFile(
      path.join(root, "career", "about.md"),
      "# About Sam\n\nA product marketer.",
    );
    await writeFile(path.join(root, "ignored.txt"), "# Not a note");

    const notes = await loadVault(root);

    expect(notes).toEqual([
      {
        path: "career/about.md",
        title: "About Sam",
        folder: "career",
        summary: "",
        tags: [],
        body: "# About Sam\n\nA product marketer.",
        characterCount: 32,
      },
      {
        path: "projects/zeta.md",
        title: "Zeta launch",
        folder: "projects",
        summary: "A launch note.",
        tags: ["launch", "growth"],
        body: "Launch body.",
        characterCount: 12,
      },
    ]);
  });

  test("uses a dot folder for root notes and filename fallback for empty notes", async () => {
    const root = await makeVault();
    await writeFile(path.join(root, "empty-note.md"), "");

    await expect(loadVault(root)).resolves.toEqual([
      {
        path: "empty-note.md",
        title: "empty-note",
        folder: ".",
        summary: "",
        tags: [],
        body: "",
        characterCount: 0,
      },
    ]);
  });

  test("skips malformed front matter and normalizes unsupported metadata", async () => {
    const root = await makeVault();
    await writeFile(
      path.join(root, "bad.md"),
      "---\ntitle: [unterminated\n---\nBad",
    );
    await writeFile(
      path.join(root, "safe.md"),
      "---\nsummary: 42\ntags: growth\n---\n# Safe title\n\nBody",
    );

    await expect(loadVault(root)).resolves.toEqual([
      {
        path: "safe.md",
        title: "Safe title",
        folder: ".",
        summary: "",
        tags: [],
        body: "# Safe title\n\nBody",
        characterCount: 18,
      },
    ]);
  });

  test("isolates an expected per-note read error", async () => {
    const root = await makeVault();
    await writeFile(path.join(root, "unreadable.md"), "# Unreadable");
    fsMock.readFile.mockRejectedValueOnce(
      Object.assign(new Error("Permission denied"), { code: "EACCES" }),
    );

    await expect(loadVault(root)).resolves.toEqual([]);
  });

  test.each([
    ["a systemic filesystem error", "EMFILE"],
    ["an unexpected read error", undefined],
  ])("propagates %s", async (_description, code) => {
    const root = await makeVault();
    await writeFile(path.join(root, "note.md"), "# Note");
    const error = Object.assign(new Error("Unexpected read failure"), { code });
    fsMock.readFile.mockRejectedValueOnce(error);

    await expect(loadVault(root)).rejects.toBe(error);
  });

  test("does not follow file or directory symlinks", async (context) => {
    const root = await makeVault();
    const outside = await makeVault();
    await writeFile(path.join(outside, "secret.md"), "# Outside");

    try {
      await symlink(
        path.join(outside, "secret.md"),
        path.join(root, "linked-file.md"),
      );
      await symlink(outside, path.join(root, "linked-directory"), "dir");
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;
      if (code === "EPERM" || code === "EACCES" || code === "ENOSYS") {
        context.skip();
      }
      throw error;
    }

    await expect(loadVault(root)).resolves.toEqual([]);
  });

  test("loads the five fictional Sam Rivera notes", async () => {
    const notes = await loadVault(sampleVault);

    expect(notes.map((note) => note.path)).toEqual([
      "career/about-sam.md",
      "career/skills-marketing.md",
      "index.md",
      "projects/newsletter-growth.md",
      "projects/self-serve-launch.md",
    ]);
    expect(notes.every((note) => note.summary && note.tags.length > 0)).toBe(
      true,
    );
  });
});
