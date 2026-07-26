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
    vi.restoreAllMocks();
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

  test("preserves tool definitions and prior tool messages in the request", async () => {
    const toolCall = {
      id: "call-1",
      type: "function" as const,
      function: {
        name: "search_notes",
        arguments: '{"query":"growth"}',
      },
    };
    const messages = [
      { role: "user" as const, content: "What grew?" },
      {
        role: "assistant" as const,
        content: null,
        tool_calls: [toolCall],
      },
      {
        role: "tool" as const,
        content: '{"matches":["projects/newsletter-growth.md"]}',
        tool_call_id: "call-1",
      },
    ];
    const tools = [
      {
        type: "function" as const,
        function: {
          name: "search_notes",
          description: "Search note metadata and bodies.",
          parameters: {
            type: "object",
            properties: { query: { type: "string" } },
            required: ["query"],
          },
        },
      },
    ];

    await createChatCompletion({
      model: "tool-capable/model",
      messages,
      tools,
    });

    const requestBody = JSON.parse(
      String(vi.mocked(fetch).mock.calls[0]![1]?.body),
    );
    expect(requestBody).toEqual({
      model: "tool-capable/model",
      messages,
      tools,
    });
  });

  test("serializes fail-closed provider constraints", async () => {
    await createChatCompletion({
      model: "fixed/model",
      messages: [{ role: "user", content: "Question" }],
      provider: {
        only: ["fixed-provider"],
        allow_fallbacks: false,
        data_collection: "deny",
        zdr: true,
      },
    });

    const body = JSON.parse(String(vi.mocked(fetch).mock.calls[0]![1]?.body));
    expect(body.provider).toEqual({
      only: ["fixed-provider"],
      allow_fallbacks: false,
      data_collection: "deny",
      zdr: true,
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

  test("uses a 25-second timeout and maps its fetch rejection", async () => {
    const timeout = new AbortController();
    const timeoutSpy = vi
      .spyOn(AbortSignal, "timeout")
      .mockReturnValueOnce(timeout.signal);
    vi.mocked(fetch).mockImplementationOnce(
      (_url, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(new DOMException("Timed out", "AbortError"));
          });
        }),
    );

    const completion = createChatCompletion({
      model: "openrouter/free",
      messages: [{ role: "user", content: "Question" }],
    });
    expect(timeoutSpy).toHaveBeenCalledWith(25_000);

    timeout.abort(new DOMException("Timed out", "TimeoutError"));
    await expect(completion).rejects.toMatchObject({
      code: "timeout",
      message: "OpenRouter request timed out.",
    });
  });

  test("maps caller-aborted fetch rejection to request_aborted", async () => {
    const caller = new AbortController();
    vi.mocked(fetch).mockImplementationOnce(
      (_url, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(new DOMException("Aborted", "AbortError"));
          });
        }),
    );

    const completion = createChatCompletion({
      model: "openrouter/free",
      messages: [{ role: "user", content: "Question" }],
      signal: caller.signal,
    });
    caller.abort();

    await expect(completion).rejects.toMatchObject({
      code: "request_aborted",
      message: "Model request aborted.",
    });
  });

  test("preserves the first abort cause when caller and timeout both abort", async () => {
    const timeout = new AbortController();
    vi.spyOn(AbortSignal, "timeout").mockReturnValueOnce(timeout.signal);
    const caller = new AbortController();
    vi.mocked(fetch).mockImplementationOnce(
      (_url, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            queueMicrotask(() =>
              reject(new DOMException("Aborted", "AbortError")),
            );
          });
        }),
    );

    const completion = createChatCompletion({
      model: "openrouter/free",
      messages: [{ role: "user", content: "Question" }],
      signal: caller.signal,
    });
    caller.abort(new DOMException("Caller aborted", "AbortError"));
    timeout.abort(new DOMException("Timed out", "TimeoutError"));

    await expect(completion).rejects.toMatchObject({
      code: "request_aborted",
      message: "Model request aborted.",
    });
  });

  test("maps a timeout while reading the response body", async () => {
    const timeout = new AbortController();
    vi.spyOn(AbortSignal, "timeout").mockReturnValueOnce(timeout.signal);
    vi.mocked(fetch).mockImplementationOnce((_url, init) => {
      const signal = init?.signal;
      return Promise.resolve(
        new Response(
          new ReadableStream({
            start(controller) {
              signal?.addEventListener("abort", () => {
                controller.error(new DOMException("Timed out", "AbortError"));
              });
            },
          }),
          { status: 200 },
        ),
      );
    });

    const completion = createChatCompletion({
      model: "openrouter/free",
      messages: [{ role: "user", content: "Question" }],
    });
    timeout.abort(new DOMException("Timed out", "TimeoutError"));

    await expect(completion).rejects.toMatchObject({
      code: "timeout",
      message: "OpenRouter request timed out.",
    });
  });

  test("maps caller abort while reading the response body", async () => {
    const caller = new AbortController();
    vi.mocked(fetch).mockImplementationOnce((_url, init) => {
      const signal = init?.signal;
      return Promise.resolve(
        new Response(
          new ReadableStream({
            start(controller) {
              signal?.addEventListener("abort", () => {
                controller.error(new DOMException("Aborted", "AbortError"));
              });
            },
          }),
          { status: 200 },
        ),
      );
    });

    const completion = createChatCompletion({
      model: "openrouter/free",
      messages: [{ role: "user", content: "Question" }],
      signal: caller.signal,
    });
    caller.abort();

    await expect(completion).rejects.toMatchObject({
      code: "request_aborted",
      message: "Model request aborted.",
    });
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
    [400, "provider_error", "OpenRouter request failed."],
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

  test.each([null, [], "text", 42, true])(
    "classifies valid non-object JSON payload %# as an invalid response",
    async (payload) => {
      vi.mocked(fetch).mockResolvedValueOnce(
        new Response(JSON.stringify(payload), { status: 200 }),
      );

      await expect(
        createChatCompletion({
          model: "openrouter/free",
          messages: [{ role: "user", content: "Question" }],
        }),
      ).rejects.toMatchObject({
        name: "ModelAdapterError",
        code: "invalid_response",
        message: "OpenRouter returned an invalid response.",
      });
    },
  );

  test("preserves a validated assistant tool call with null content", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          model: "actual/model",
          choices: [
            {
              message: {
                role: "assistant",
                content: null,
                tool_calls: [
                  {
                    id: "call-1",
                    type: "function",
                    function: {
                      name: "search_notes",
                      arguments: '{"query":"growth"}',
                    },
                  },
                ],
              },
            },
          ],
        }),
        { status: 200 },
      ),
    );

    await expect(
      createChatCompletion({
        model: "openrouter/free",
        messages: [{ role: "user", content: "Question" }],
      }),
    ).resolves.toEqual({
      model: "actual/model",
      message: {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call-1",
            type: "function",
            function: {
              name: "search_notes",
              arguments: '{"query":"growth"}',
            },
          },
        ],
      },
    });
  });

  test("preserves empty assistant text for the caller to interpret", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          model: "actual/model",
          choices: [
            {
              message: {
                role: "assistant",
                content: "",
              },
            },
          ],
        }),
        { status: 200 },
      ),
    );

    await expect(
      createChatCompletion({
        model: "openrouter/free",
        messages: [{ role: "user", content: "Question" }],
      }),
    ).resolves.toEqual({
      model: "actual/model",
      message: {
        role: "assistant",
        content: "",
      },
    });
  });

  test.each([
    ["neither text nor tool calls", { content: null }],
    ["an empty tool-call list", { content: null, tool_calls: [] }],
    [
      "a missing tool-call id",
      {
        content: null,
        tool_calls: [
          {
            type: "function",
            function: { name: "search_notes", arguments: "{}" },
          },
        ],
      },
    ],
    [
      "a non-function tool-call type",
      {
        content: null,
        tool_calls: [
          {
            id: "call-1",
            type: "plugin",
            function: { name: "search_notes", arguments: "{}" },
          },
        ],
      },
    ],
    [
      "non-string tool arguments",
      {
        content: null,
        tool_calls: [
          {
            id: "call-1",
            type: "function",
            function: { name: "search_notes", arguments: {} },
          },
        ],
      },
    ],
  ])("rejects an assistant response with %s", async (_description, message) => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          model: "actual/model",
          choices: [{ message: { role: "assistant", ...message } }],
        }),
        { status: 200 },
      ),
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
