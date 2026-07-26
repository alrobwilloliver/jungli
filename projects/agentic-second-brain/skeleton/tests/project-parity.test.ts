import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { describe, expect, test } from "vitest";

const projectFile = (relativePath: string) =>
  fileURLToPath(new URL(`../${relativePath}`, import.meta.url));
const peerFile = (relativePath: string) =>
  fileURLToPath(new URL(`../../finished/${relativePath}`, import.meta.url));

const sharedFiles = [
  "lib/contracts.ts",
  "lib/mode-presentation.ts",
  "lib/agent/tool-schemas.ts",
  "lib/agent/execute-tool.ts",
  "lib/vault/types.ts",
  "app/page.tsx",
  "app/globals.css",
  "app/api/chat/route.ts",
  "tests/contracts.test.ts",
  "tests/chat-route.test.ts",
  "tests/tool-schemas.test.ts",
  "tests/mode-presentation.test.ts",
  "tests/checkpoint-tools.test.ts",
  "vitest.checkpoint.config.ts",
] as const;

const learnerToolFiles = [
  ["lib/vault/list-notes.ts", "listNotes"],
  ["lib/vault/search-notes.ts", "searchNotes"],
  ["lib/vault/read-note.ts", "readNote"],
] as const;

const vaultFixtures = [
  "vault/career/about-sam.md",
  "vault/career/skills-marketing.md",
  "vault/index.md",
  "vault/projects/newsletter-growth.md",
  "vault/projects/self-serve-launch.md",
] as const;

describe("skeleton and finished classroom parity", () => {
  test.each([...sharedFiles, ...vaultFixtures])(
    "keeps %s identical",
    async (relativePath) => {
      const [project, peer] = await Promise.all([
        readFile(projectFile(relativePath), "utf8"),
        readFile(peerFile(relativePath), "utf8"),
      ]);

      expect(project).toBe(peer);
    },
  );

  test.each(learnerToolFiles)(
    "keeps the %s learner export available",
    async (relativePath, exportName) => {
      const [project, peer] = await Promise.all([
        readFile(projectFile(relativePath), "utf8"),
        readFile(peerFile(relativePath), "utf8"),
      ]);

      expect(project).toMatch(
        new RegExp(`export function ${exportName}\\s*\\(`),
      );
      expect(peer).toMatch(new RegExp(`export function ${exportName}\\s*\\(`));
    },
  );

  test("keeps checkpoint scripts aligned", async () => {
    const [project, peer] = await Promise.all(
      [projectFile("package.json"), peerFile("package.json")].map(
        async (filename) =>
          JSON.parse(await readFile(filename, "utf8")) as {
            scripts: Record<string, string>;
          },
      ),
    );

    expect(project.scripts["test:checkpoint:tools"]).toBe(
      "vitest run --config vitest.checkpoint.config.ts tests/checkpoint-tools.test.ts",
    );
    expect(project.scripts["test:checkpoint:controller"]).toBe(
      "vitest run --config vitest.checkpoint.config.ts tests/checkpoint-controller.test.ts",
    );
    expect(peer.scripts["test:checkpoint:tools"]).toBe(
      project.scripts["test:checkpoint:tools"],
    );
    expect(peer.scripts["test:checkpoint:controller"]).toBe(
      project.scripts["test:checkpoint:controller"],
    );
  });
});
