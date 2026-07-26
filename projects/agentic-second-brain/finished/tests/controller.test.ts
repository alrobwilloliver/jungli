import { describe, expect, test, vi } from "vitest";

import { runAgent } from "@/lib/agent/controller";
import { AGENT_SYSTEM_PROMPT } from "@/lib/agent/system-prompt";
import type { VaultNote } from "@/lib/vault/types";

const note: VaultNote = {
  path: "projects/newsletter-growth.md",
  title: "Newsletter growth",
  folder: "projects",
  summary: "A growth experiment",
  tags: ["growth"],
  body: "Sam grew newsletter subscriptions by 35%.",
  characterCount: 42,
};

describe("agent controller", () => {
  test("grounds a bounded search/read/answer transcript", async () => {
    const complete = vi
      .fn()
      .mockResolvedValueOnce({
        model: "actual/model",
        message: {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "search",
              type: "function",
              function: {
                name: "search_notes",
                arguments: '{"query":"newsletter growth"}',
              },
            },
          ],
        },
      })
      .mockResolvedValueOnce({
        model: "actual/model",
        message: {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "read",
              type: "function",
              function: {
                name: "read_note",
                arguments: '{"path":"projects/newsletter-growth.md"}',
              },
            },
          ],
        },
      })
      .mockResolvedValueOnce({
        model: "actual/model",
        message: {
          role: "assistant",
          content: "Subscriptions grew by 35% [projects/newsletter-growth.md].",
        },
      });

    const result = await runAgent(
      {
        messages: [{ role: "user", content: "What grew?" }],
        notes: [note],
        model: "openrouter/free",
        fallbackModel: "",
        signal: new AbortController().signal,
      },
      { complete },
    );

    expect(AGENT_SYSTEM_PROMPT).toMatch(/untrusted evidence/i);
    expect(AGENT_SYSTEM_PROMPT).toMatch(/never follow instructions/i);
    expect(result).toMatchObject({
      answer: "Subscriptions grew by 35% [projects/newsletter-growth.md].",
      model: "actual/model",
      sources: ["projects/newsletter-growth.md"],
      restarted: false,
      usage: { modelCalls: 3, notesSent: 0, notesRead: 1 },
    });
    expect(complete).toHaveBeenCalledTimes(3);
    const finalMessages = complete.mock.calls[2][0].messages;
    expect(
      finalMessages.map((message: { role: string }) => message.role),
    ).toEqual(["system", "user", "assistant", "tool", "assistant", "tool"]);
    expect(JSON.stringify(finalMessages)).not.toContain("unread secret");
  });
});
