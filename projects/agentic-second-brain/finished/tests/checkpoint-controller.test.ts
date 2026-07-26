import { expect, test, vi } from "vitest";

import { runAgent } from "@/lib/agent/controller";

test("controller checkpoint answers through the bounded agent", async () => {
  const result = await runAgent(
    {
      messages: [{ role: "user", content: "What do the notes say?" }],
      notes: [],
      model: "class/model",
    },
    {
      complete: vi.fn().mockResolvedValue({
        model: "class/model",
        message: {
          role: "assistant",
          content: "There is insufficient evidence.",
        },
      }),
    },
  );

  expect(result.answer).toBe("There is insufficient evidence.");
  expect(result.usage.modelCalls).toBe(1);
});
