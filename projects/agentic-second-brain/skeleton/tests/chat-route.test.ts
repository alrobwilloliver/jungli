import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import type { VaultNote } from "@/lib/vault/types";

const mocks = vi.hoisted(() => ({
  loadVault: vi.fn(),
  createChatCompletion: vi.fn(),
}));

vi.mock("@/lib/vault/load-vault", () => ({ loadVault: mocks.loadVault }));
vi.mock("@/lib/model/openrouter", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@/lib/model/openrouter")>();
  return {
    ...actual,
    createChatCompletion: mocks.createChatCompletion,
  };
});

import { POST } from "@/app/api/chat/route";
import { ModelAdapterError } from "@/lib/model/openrouter";

const originalModel = process.env.OPENROUTER_MODEL;

const notes: VaultNote[] = [
  {
    path: "career/about-sam.md",
    title: "About Sam",
    folder: "career",
    summary: "",
    tags: [],
    body: "Sam is a product marketer.",
    characterCount: 26,
  },
  {
    path: "projects/newsletter-growth.md",
    title: "Newsletter growth",
    folder: "projects",
    summary: "",
    tags: ["growth"],
    body: "Newsletter subscriptions grew by 35%.",
    characterCount: 36,
  },
];

const request = (body: unknown) =>
  new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

describe("POST /api/chat", () => {
  beforeEach(() => {
    process.env.OPENROUTER_MODEL = "configured/free-model";
    mocks.loadVault.mockResolvedValue(notes);
    mocks.createChatCompletion.mockResolvedValue({
      model: "actual/free-model",
      message: { role: "assistant", content: "Sam grew a newsletter." },
    });
  });

  afterEach(() => {
    if (originalModel === undefined) {
      delete process.env.OPENROUTER_MODEL;
    } else {
      process.env.OPENROUTER_MODEL = originalModel;
    }
    vi.clearAllMocks();
  });

  test.each([
    [null, "invalid_request"],
    [{}, "invalid_request"],
    [{ messages: [] }, "invalid_request"],
    [
      { messages: [{ role: "assistant", content: "No question" }] },
      "invalid_request",
    ],
    [{ messages: [{ role: "user", content: " " }] }, "invalid_request"],
    [
      { messages: [{ role: "user", content: "x".repeat(4001) }] },
      "invalid_request",
    ],
    [
      {
        messages: Array.from({ length: 21 }, (_, index) => ({
          role: index % 2 ? "assistant" : "user",
          content: `message ${index}`,
        })),
      },
      "invalid_request",
    ],
  ])("rejects invalid or unbounded input %#", async (body, code) => {
    const response = await POST(request(body));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: { code, message: "Send a valid user question." },
    });
    expect(mocks.loadVault).not.toHaveBeenCalled();
    expect(mocks.createChatCompletion).not.toHaveBeenCalled();
  });

  test("loads every note, calls the configured model once, and returns diagnostics", async () => {
    const response = await POST(
      request({
        messages: [
          { role: "user", content: "What did Sam grow?" },
          { role: "assistant", content: "Let me check." },
          { role: "user", content: "Please answer from the vault." },
        ],
      }),
    );

    expect(response.status).toBe(200);
    expect(mocks.loadVault).toHaveBeenCalledTimes(1);
    expect(mocks.createChatCompletion).toHaveBeenCalledTimes(1);
    expect(mocks.createChatCompletion).toHaveBeenCalledWith({
      model: "configured/free-model",
      messages: [
        expect.objectContaining({
          role: "system",
          content: expect.stringContaining("SOURCE: career/about-sam.md"),
        }),
        { role: "user", content: "What did Sam grow?" },
        { role: "assistant", content: "Let me check." },
        { role: "user", content: "Please answer from the vault." },
      ],
      signal: expect.any(AbortSignal),
    });

    const payload = await response.json();
    expect(payload).toEqual({
      answer: "Sam grew a newsletter.",
      model: "actual/free-model",
      sources: ["career/about-sam.md", "projects/newsletter-growth.md"],
      activity: [
        {
          type: "context",
          message: "Sent all 2 notes as context",
        },
      ],
      usage: {
        modelCalls: 1,
        notesSent: 2,
        contextCharacters: expect.any(Number),
      },
    });
    expect(payload.usage.contextCharacters).toBeGreaterThan(
      notes.reduce((sum, note) => sum + note.body.length, 0),
    );
  });

  test("uses openrouter/free when no model is configured", async () => {
    delete process.env.OPENROUTER_MODEL;

    await POST(request({ messages: [{ role: "user", content: "Question" }] }));

    expect(mocks.createChatCompletion).toHaveBeenCalledWith(
      expect.objectContaining({ model: "openrouter/free" }),
    );
  });

  test("passes the request abort signal to the model adapter", async () => {
    const chatRequest = request({
      messages: [{ role: "user", content: "Question" }],
    });

    await POST(chatRequest);

    expect(mocks.createChatCompletion).toHaveBeenCalledWith(
      expect.objectContaining({ signal: chatRequest.signal }),
    );
  });

  test("accepts a valid request without a Content-Length header", async () => {
    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Question" }],
        }),
      }),
    );

    expect(response.status).toBe(200);
    expect(mocks.createChatCompletion).toHaveBeenCalledTimes(1);
  });

  test.each(["not-a-number", "-1", "1.5"])(
    "rejects malformed Content-Length %s",
    async (contentLength) => {
      const response = await POST(
        new Request("http://localhost/api/chat", {
          method: "POST",
          headers: { "content-length": contentLength },
          body: JSON.stringify({
            messages: [{ role: "user", content: "Question" }],
          }),
        }),
      );

      expect(response.status).toBe(400);
      await expect(response.json()).resolves.toEqual({
        error: {
          code: "invalid_request",
          message: "Send a valid user question.",
        },
      });
      expect(mocks.loadVault).not.toHaveBeenCalled();
      expect(mocks.createChatCompletion).not.toHaveBeenCalled();
    },
  );

  test("rejects an excessive declared Content-Length before provider work", async () => {
    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        headers: { "content-length": "200000" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Question" }],
        }),
      }),
    );

    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toEqual({
      error: {
        code: "payload_too_large",
        message: "Chat request is too large.",
      },
    });
    expect(mocks.loadVault).not.toHaveBeenCalled();
    expect(mocks.createChatCompletion).not.toHaveBeenCalled();
  });

  test("rejects an actual body that exceeds an underreported Content-Length", async () => {
    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        headers: { "content-length": "10" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "x".repeat(200_000) }],
        }),
      }),
    );

    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toEqual({
      error: {
        code: "payload_too_large",
        message: "Chat request is too large.",
      },
    });
    expect(mocks.loadVault).not.toHaveBeenCalled();
    expect(mocks.createChatCompletion).not.toHaveBeenCalled();
  });

  test("rejects tool-call-only model output in the text baseline", async () => {
    mocks.createChatCompletion.mockResolvedValueOnce({
      model: "actual/free-model",
      message: {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call-1",
            type: "function",
            function: { name: "search_notes", arguments: "{}" },
          },
        ],
      },
    });

    const response = await POST(
      request({ messages: [{ role: "user", content: "Question" }] }),
    );

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      error: {
        code: "invalid_response",
        message: "OpenRouter returned an invalid response.",
      },
    });
  });

  test.each(["", " \n\t"])(
    "rejects blank assistant text in the text baseline",
    async (content) => {
      mocks.createChatCompletion.mockResolvedValueOnce({
        model: "actual/free-model",
        message: {
          role: "assistant",
          content,
        },
      });

      const response = await POST(
        request({ messages: [{ role: "user", content: "Question" }] }),
      );

      expect(response.status).toBe(502);
      await expect(response.json()).resolves.toEqual({
        error: {
          code: "invalid_response",
          message: "OpenRouter returned an invalid response.",
        },
      });
    },
  );

  test.each([
    ["missing_api_key", 503, "OpenRouter is not configured."],
    ["invalid_api_key", 401, "OpenRouter authentication failed."],
    ["rate_limited", 429, "OpenRouter rate limit reached."],
    ["model_unavailable", 502, "The configured model is unavailable."],
    ["provider_unavailable", 503, "OpenRouter is temporarily unavailable."],
    ["provider_error", 502, "OpenRouter request failed."],
    ["timeout", 504, "OpenRouter request timed out."],
    ["request_aborted", 408, "Model request aborted."],
    ["invalid_response", 502, "OpenRouter returned an invalid response."],
  ] as const)(
    "maps %s adapter errors to sanitized JSON",
    async (code, status, message) => {
      mocks.createChatCompletion.mockRejectedValueOnce(
        new ModelAdapterError(code, message),
      );

      const response = await POST(
        request({ messages: [{ role: "user", content: "Question" }] }),
      );

      expect(response.status).toBe(status);
      await expect(response.json()).resolves.toEqual({
        error: { code, message },
      });
    },
  );

  test("returns sanitized JSON for malformed request bodies", async () => {
    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        body: "{not-json",
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: {
        code: "invalid_request",
        message: "Send a valid user question.",
      },
    });
  });
});
