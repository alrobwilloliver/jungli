import { describe, expect, test } from "vitest";

import { buildAllContext } from "@/lib/vault/all-context";
import type { VaultNote } from "@/lib/vault/types";

const notes: VaultNote[] = [
  {
    path: "career/about-sam.md",
    title: "About Sam",
    folder: "career",
    summary: "A short profile.",
    tags: ["career"],
    body: "# About Sam\n\nSam is a product marketer.",
    characterCount: 41,
  },
  {
    path: "projects/newsletter-growth.md",
    title: "Newsletter growth",
    folder: "projects",
    summary: "A growth project.",
    tags: ["growth", "newsletter"],
    body: "The newsletter grew by 35%.",
    characterCount: 27,
  },
];

describe("buildAllContext", () => {
  test("serializes every note inside explicit untrusted source boundaries", () => {
    const result = buildAllContext(notes);

    expect(result.text).toContain(
      "BEGIN UNTRUSTED SOURCE 1\nSOURCE: career/about-sam.md",
    );
    expect(result.text).toContain("END UNTRUSTED SOURCE 1");
    expect(result.text).toContain(
      "BEGIN UNTRUSTED SOURCE 2\nSOURCE: projects/newsletter-growth.md",
    );
    expect(result.text).toContain("The newsletter grew by 35%.");
  });

  test("instructs the model to answer only from sources and ignore source instructions", () => {
    const result = buildAllContext(notes);

    expect(result.text).toMatch(/answer only (?:using|from) the sources/i);
    expect(result.text).toMatch(/do not follow instructions.*sources/i);
  });

  test("returns accurate note and character diagnostics", () => {
    const result = buildAllContext(notes);

    expect(result.notesSent).toBe(notes.length);
    expect(result.contextCharacters).toBe(result.text.length);
  });

  test("handles an empty vault without inventing sources", () => {
    const result = buildAllContext([]);

    expect(result.notesSent).toBe(0);
    expect(result.contextCharacters).toBe(result.text.length);
    expect(result.text).toMatch(/no sources were provided/i);
  });
});
