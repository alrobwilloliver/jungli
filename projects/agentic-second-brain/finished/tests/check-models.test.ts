import { describe, expect, test, vi } from "vitest";

import {
  runCompatibilityCheck,
  runCompatibilityTrial,
} from "@/scripts/check-models";
import { NOTE_TOOL_DEFINITIONS } from "@/lib/agent/tool-schemas";

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

  test("validates a real search, expected read path, and exact citation", async () => {
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
                arguments: '{"query":"newsletter"}',
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
          content: "Subscriptions grew 35% [projects/newsletter-growth.md].",
        },
      });

    const result = await runCompatibilityTrial("requested/model", 1, complete);

    expect(result.ok).toBe(true);
    expect(complete).toHaveBeenCalledTimes(3);
    expect(complete.mock.calls[0][0].tools).toEqual(NOTE_TOOL_DEFINITIONS);
  });

  test("rejects an invented citation", async () => {
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
                arguments: '{"query":"newsletter"}',
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
          content: "Made up [invented.md].",
        },
      });

    await expect(
      runCompatibilityTrial("requested/model", 1, complete),
    ).resolves.toMatchObject({ ok: false, failure: "invented_citation" });
  });
});
