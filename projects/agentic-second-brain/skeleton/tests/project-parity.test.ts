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
  "app/page.tsx",
  "app/globals.css",
  "app/api/chat/route.ts",
  "tests/contracts.test.ts",
  "tests/chat-route.test.ts",
  "tests/tool-schemas.test.ts",
  "tests/mode-presentation.test.ts",
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
});
