import { expect, test } from "vitest";

import { runAgent } from "@/lib/agent/controller";
import type { ModelCompletion } from "@/lib/model/openrouter";

test("production controller completes search, read, and cited answer", async () => {
  const completions: ModelCompletion[] = [
    {
      model: "class/model",
      message: {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "search",
            type: "function",
            function: {
              name: "search_notes",
              arguments: '{"query":"newsletter"}',
            },
          },
        ],
      },
    },
    {
      model: "class/model",
      message: {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "read",
            type: "function",
            function: {
              name: "read_note",
              arguments: '{"path":"projects/growth.md"}',
            },
          },
        ],
      },
    },
    {
      model: "class/model",
      message: {
        role: "assistant",
        content: "Growth was 35% [projects/growth.md].",
      },
    },
  ];
  const result = await runAgent(
    {
      messages: [{ role: "user", content: "What grew?" }],
      notes: [
        {
          path: "projects/growth.md",
          title: "Newsletter growth",
          folder: "projects",
          summary: "",
          tags: ["growth"],
          body: "Growth was 35%.",
          characterCount: 15,
        },
      ],
      model: "class/model",
      requireAgentic: true,
    },
    {
      complete: async () => completions.shift()!,
    },
  );

  expect(result).toMatchObject({
    mode: "agentic",
    answer: "Growth was 35% [projects/growth.md].",
    sources: ["projects/growth.md"],
  });
});
