import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { describe, expect, test } from "vitest";

const projectFile = (relativePath: string) =>
  fileURLToPath(new URL(`../${relativePath}`, import.meta.url));

const normaliseProse = (source: string) =>
  source.replace(/^>\s?/gm, "").replace(/\s+/g, " ");

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

  test("states that local note files are transmitted to OpenRouter during chat", async () => {
    const layoutSource = await readFile(projectFile("app/layout.tsx"), "utf8");

    expect(normaliseProse(layoutSource)).toContain(
      "Your note files stay in your project, but note contents are sent to OpenRouter when you chat.",
    );
    expect(layoutSource).not.toContain("Your notes stay in your project.");
  });

  test("keeps the shared exercise fictional and gates real-note use on provider policy", async () => {
    const vaultIndex = await readFile(projectFile("vault/index.md"), "utf8");

    const prose = normaliseProse(vaultIndex);

    expect(prose).toContain("Keep the shared exercise fictional");
    expect(prose).toContain(
      "review and accept your selected model provider's data policy",
    );
    expect(vaultIndex).not.toMatch(
      /Replace with notes about you or your product/i,
    );
  });
});
