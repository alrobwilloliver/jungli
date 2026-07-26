import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { describe, expect, test } from "vitest";

const finishedFile = (relativePath: string) =>
  fileURLToPath(new URL(`../${relativePath}`, import.meta.url));
const skeletonFile = (relativePath: string) =>
  fileURLToPath(new URL(`../../skeleton/${relativePath}`, import.meta.url));

const sharedClassroomFiles = [
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

const expectedDependencies = {
  "gray-matter": "4.0.3",
  next: "16.2.11",
  react: "19.2.7",
  "react-dom": "19.2.7",
  zod: "4.4.3",
};

const expectedDevDependencies = {
  "@types/node": "24.10.1",
  "@types/react": "19.2.17",
  "@types/react-dom": "19.2.3",
  eslint: "9.39.5",
  "eslint-config-next": "16.2.11",
  prettier: "3.9.6",
  tsx: "4.20.6",
  typescript: "5.9.3",
  vitest: "4.1.10",
};

describe("skeleton and finished project parity", () => {
  test("uses identical exact dependency pins", async () => {
    const [skeleton, finished] = await Promise.all(
      [skeletonFile("package.json"), finishedFile("package.json")].map(
        async (filename) =>
          JSON.parse(await readFile(filename, "utf8")) as {
            dependencies: Record<string, string>;
            devDependencies: Record<string, string>;
          },
      ),
    );

    expect(skeleton.dependencies).toEqual(expectedDependencies);
    expect(finished.dependencies).toEqual(expectedDependencies);
    expect(skeleton.devDependencies).toEqual(expectedDevDependencies);
    expect(finished.devDependencies).toEqual(expectedDevDependencies);
    expect(
      Object.values({
        ...finished.dependencies,
        ...finished.devDependencies,
      }).every((version) => /^\d+\.\d+\.\d+$/.test(version)),
    ).toBe(true);
  });

  test.each([
    "tsconfig.json",
    "eslint.config.mjs",
    "vitest.config.ts",
    "next.config.ts",
  ])("keeps %s equivalent", async (relativePath) => {
    const [skeleton, finished] = await Promise.all([
      readFile(skeletonFile(relativePath), "utf8"),
      readFile(finishedFile(relativePath), "utf8"),
    ]);

    expect(finished).toBe(skeleton);
  });

  test.each([...sharedClassroomFiles, ...vaultFixtures])(
    "keeps classroom file %s identical",
    async (relativePath) => {
      const [skeleton, finished] = await Promise.all([
        readFile(skeletonFile(relativePath), "utf8"),
        readFile(finishedFile(relativePath), "utf8"),
      ]);

      expect(finished).toBe(skeleton);
    },
  );
});
