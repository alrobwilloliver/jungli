import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { describe, expect, test } from "vitest";

const projectFile = (relativePath: string) =>
  fileURLToPath(new URL(`../${relativePath}`, import.meta.url));

describe("workshop scaffold", () => {
  test("provides the required scripts without check-models", async () => {
    const packageJson = JSON.parse(
      await readFile(projectFile("package.json"), "utf8"),
    ) as { scripts: Record<string, string> };

    expect(packageJson.scripts).toMatchObject({
      dev: "next dev",
      build: "next build",
      format: "prettier --write .",
      "format:check": "prettier --check .",
      lint: "eslint .",
      typecheck: "tsc --noEmit",
      test: "vitest run",
      "test:watch": "vitest",
    });
    expect(packageJson.scripts).not.toHaveProperty("check-models");
  });

  test("keeps key setup server-side for local and deployed use", async () => {
    const setupSource = await readFile(
      projectFile("app/setup/page.tsx"),
      "utf8",
    );

    expect(setupSource).toContain("Vercel");
    expect(setupSource).toContain("Environment Variables");
    expect(setupSource).not.toMatch(/<input\b/i);
  });
});
