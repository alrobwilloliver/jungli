import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { describe, expect, test } from "vitest";

const root = fileURLToPath(new URL("../../", import.meta.url));

describe("classroom materials", () => {
  test("provides exactly four bounded prompts and the timed recovery path", async () => {
    const prompts = await readFile(`${root}skeleton/PROMPTS.md`, "utf8");
    expect(prompts.match(/^## Prompt \d:/gm)).toHaveLength(4);
    for (const heading of [
      "Outcome",
      "Files allowed to change",
      "Do not change",
      "Verification",
      "Stop after",
    ]) {
      expect(prompts.match(new RegExp(`^### ${heading}$`, "gm"))).toHaveLength(
        4,
      );
    }
    const guide = await readFile(`${root}INSTRUCTOR-GUIDE.md`, "utf8");
    expect(guide).toContain("Minute 25");
    expect(guide).toContain("Minute 45");
    expect(guide).toContain("--port 3001");
    expect(guide.indexOf("validates both policies")).toBeLessThan(
      guide.indexOf("learner opts in"),
    );
    expect(guide.indexOf("learner opts in")).toBeLessThan(
      guide.indexOf("vault-personal"),
    );
  });
});
