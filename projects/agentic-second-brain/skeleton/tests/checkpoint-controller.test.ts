import { expect, test } from "vitest";

import { runCheckpointAgent } from "@/lib/agent/controller";

test("controller learner checkpoint", async () => {
  await expect(runCheckpointAgent()).resolves.toBeDefined();
});
