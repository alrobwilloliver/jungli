import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import type { VaultNote } from "./types";

const isolatedNoteReadErrorCodes = new Set(["EACCES", "ENOENT", "EPERM"]);

const firstHeading = (body: string) =>
  body.match(/^#\s+(.+?)\s*$/m)?.[1]?.trim();

const isIsolatedNoteReadError = (error: unknown) => {
  const code = (error as NodeJS.ErrnoException)?.code;
  return typeof code === "string" && isolatedNoteReadErrorCodes.has(code);
};

const isMalformedFrontMatterError = (error: unknown) =>
  error instanceof Error && error.name === "YAMLException";

const normalizeTags = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];

  return value
    .filter((tag): tag is string => typeof tag === "string")
    .map((tag) => tag.trim())
    .filter(Boolean);
};

async function findMarkdownFiles(
  root: string,
  segments: string[] = [],
): Promise<string[][]> {
  const entries = await readdir(path.join(root, ...segments), {
    withFileTypes: true,
  });
  const files: string[][] = [];

  for (const entry of entries) {
    if (entry.isSymbolicLink()) continue;

    const childSegments = [...segments, entry.name];
    if (entry.isDirectory()) {
      files.push(...(await findMarkdownFiles(root, childSegments)));
    } else if (entry.isFile() && path.extname(entry.name) === ".md") {
      files.push(childSegments);
    }
  }

  return files;
}

export async function loadVault(
  root = path.join(process.cwd(), "vault"),
): Promise<VaultNote[]> {
  const resolvedRoot = path.resolve(root);
  const files = await findMarkdownFiles(resolvedRoot);
  const notes: VaultNote[] = [];

  for (const segments of files) {
    const relativePath = segments.join("/");
    let source: string;

    try {
      source = await readFile(path.join(resolvedRoot, ...segments), "utf8");
    } catch (error) {
      if (isIsolatedNoteReadError(error)) continue;
      throw error;
    }

    let parsed: matter.GrayMatterFile<string>;
    try {
      parsed = matter(source);
    } catch (error) {
      if (isMalformedFrontMatterError(error)) continue;
      throw error;
    }

    const body = parsed.content;
    const frontMatterTitle =
      typeof parsed.data.title === "string" && parsed.data.title.trim()
        ? parsed.data.title.trim()
        : undefined;
    const title =
      frontMatterTitle ??
      firstHeading(body) ??
      path.basename(segments.at(-1)!, ".md");
    const summary =
      typeof parsed.data.summary === "string" ? parsed.data.summary.trim() : "";

    notes.push({
      path: relativePath,
      title,
      folder: segments.length === 1 ? "." : segments.slice(0, -1).join("/"),
      summary,
      tags: normalizeTags(parsed.data.tags),
      body,
      characterCount: body.length,
    });
  }

  return notes.sort((left, right) =>
    left.path < right.path ? -1 : left.path > right.path ? 1 : 0,
  );
}
