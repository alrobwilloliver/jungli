import { describe, expect, test, vi } from "vitest";

import { runCompatibilityCheck } from "@/scripts/check-models";

describe("model compatibility checker", () => {
  test("runs five trials and passes at four successful grounded flows", async () => {
    const call = vi.fn(async ({ trial }: { trial: number }) => ({
      ok: trial !== 3,
      actualModel: "provider/tool-model",
      identity: `trial-${trial}`,
      failure: trial === 3 ? "missing_citation" : undefined,
    }));

    const report = await runCompatibilityCheck("router/model", call);

    expect(call).toHaveBeenCalledTimes(5);
    expect(report).toMatchObject({
      requestedModel: "router/model",
      actualModel: "provider/tool-model",
      requestCount: 5,
      successes: 4,
      passed: true,
    });
    expect(report.trials).toHaveLength(5);
    expect(report.timestamp).toMatch(/T/);
  });
});
