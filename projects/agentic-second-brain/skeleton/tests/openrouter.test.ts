import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import {
  ModelAdapterError,
  createChatCompletion,
} from "@/lib/model/openrouter";

const originalApiKey = process.env.OPENROUTER_API_KEY;

const successfulResponse = (model = "actual/free-model") =>
  new Response(
    JSON.stringify({
      model,
      choices: [{ message: { role: "assistant", content: "Vault answer" } }],
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  );

describe("createChatCompletion", () => {
  beforeEach(() => {
    process.env.OPENROUTER_API_KEY = "server-only-secret";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(successfulResponse()));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    if (originalApiKey === undefined) {
      delete process.env.OPENROUTER_API_KEY;
    } else {
      process.env.OPENROUTER_API_KEY = originalApiKey;
    }
  });

  test("sends the server key, configured model, messages, and a timeout signal", async () => {
    const result = await createChatCompletion({
      model: "openrouter/free",
      messages: [{ role: "user", content: "What is in my vault?" }],
    });

    expect(result).toEqual({
      model: "actual/free-model",
      message: { role: "assistant", content: "Vault answer" },
    });
    expect(fetch).toHaveBeenCalledTimes(1);

    const [url, init] = vi.mocked(fetch).mock.calls[0]!;
    expect(url).toBe("https://openrouter.ai/api/v1/chat/completions");
    expect(init).toMatchObject({
      method: "POST",
      headers: {
        Authorization: "Bearer server-only-secret",
        "Content-Type": "application/json",
      },
    });
    expect(init?.signal).toBeInstanceOf(AbortSignal);
    expect(JSON.parse(String(init?.body))).toEqual({
      model: "openrouter/free",
      messages: [{ role: "user", content: "What is in my vault?" }],
    });
  });

  test("composes a caller abort signal with the timeout signal", async () => {
    const caller = new AbortController();

    await createChatCompletion({
      model: "openrouter/free",
      messages: [{ role: "user", content: "Question" }],
      signal: caller.signal,
    });

    const signal = vi.mocked(fetch).mock.calls[0]![1]?.signal;
    expect(signal).not.toBe(caller.signal);
    expect(signal?.aborted).toBe(false);

    caller.abort();
    expect(signal?.aborted).toBe(true);
  });

  test("rejects missing server configuration before making a request", async () => {
    delete process.env.OPENROUTER_API_KEY;

    await expect(
      createChatCompletion({
        model: "openrouter/free",
        messages: [{ role: "user", content: "Question" }],
      }),
    ).rejects.toMatchObject({
      name: "ModelAdapterError",
      code: "missing_api_key",
      message: "OpenRouter is not configured.",
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  test.each([
    [401, "invalid_api_key", "OpenRouter authentication failed."],
    [429, "rate_limited", "OpenRouter rate limit reached."],
    [400, "model_unavailable", "The configured model is unavailable."],
    [404, "model_unavailable", "The configured model is unavailable."],
    [500, "provider_unavailable", "OpenRouter is temporarily unavailable."],
    [503, "provider_unavailable", "OpenRouter is temporarily unavailable."],
  ])(
    "maps HTTP %s to the stable %s error without leaking provider content",
    async (status, code, message) => {
      vi.mocked(fetch).mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            error: {
              message: "raw provider detail server-only-secret",
            },
          }),
          {
            status,
            headers: { "x-secret-header": "do-not-leak" },
          },
        ),
      );

      let caught: unknown;
      try {
        await createChatCompletion({
          model: "openrouter/free",
          messages: [{ role: "user", content: "Question" }],
        });
      } catch (error) {
        caught = error;
      }

      expect(caught).toBeInstanceOf(ModelAdapterError);
      expect(caught).toMatchObject({ code, message });
      expect(JSON.stringify(caught)).not.toContain("server-only-secret");
      expect(JSON.stringify(caught)).not.toContain("do-not-leak");
    },
  );

  test("rejects malformed successful responses with a stable error", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ model: "actual/model", choices: [] }), {
        status: 200,
      }),
    );

    await expect(
      createChatCompletion({
        model: "openrouter/free",
        messages: [{ role: "user", content: "Question" }],
      }),
    ).rejects.toMatchObject({
      code: "invalid_response",
      message: "OpenRouter returned an invalid response.",
    });
  });
});
