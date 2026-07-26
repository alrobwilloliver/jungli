import { NextResponse } from "next/server";
import path from "node:path";
import { z } from "zod";

import { runAgent } from "@/lib/agent/controller";
import type { ChatResponse } from "@/lib/contracts";
import {
  ModelAdapterError,
  createChatCompletion,
  type ModelErrorCode,
} from "@/lib/model/openrouter";
import { resolveVaultConfig } from "@/lib/vault/config";
import { loadVault } from "@/lib/vault/load-vault";

const maxRequestBytes = 160_000;

class RequestBodyError extends Error {
  constructor(public readonly code: "invalid_request" | "payload_too_large") {
    super(code);
  }
}

const readRequestJson = async (request: Request): Promise<unknown> => {
  const contentLength = request.headers.get("content-length");
  if (contentLength !== null) {
    if (!/^\d+$/.test(contentLength)) {
      throw new RequestBodyError("invalid_request");
    }

    const declaredBytes = Number(contentLength);
    if (declaredBytes > maxRequestBytes) {
      throw new RequestBodyError("payload_too_large");
    }
    if (!Number.isSafeInteger(declaredBytes)) {
      throw new RequestBodyError("invalid_request");
    }
  }

  if (!request.body) {
    throw new RequestBodyError("invalid_request");
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > maxRequestBytes) {
        try {
          await reader.cancel();
        } catch {
          // The size error is more useful than a stream cancellation error.
        }
        throw new RequestBodyError("payload_too_large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return JSON.parse(text) as unknown;
  } catch {
    throw new RequestBodyError("invalid_request");
  }
};

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(8_000),
});

const requestSchema = z
  .object({
    messages: z.array(messageSchema).min(1).max(20),
  })
  .superRefine(({ messages }, context) => {
    const latest = messages.at(-1);
    if (
      latest?.role !== "user" ||
      !latest.content.trim() ||
      latest.content.length > 4_000
    ) {
      context.addIssue({
        code: "custom",
        path: ["messages", Math.max(0, messages.length - 1)],
        message: "A user question of at most 4,000 characters is required.",
      });
    }

    const totalCharacters = messages.reduce(
      (total, message) => total + message.content.length,
      0,
    );
    if (totalCharacters > 32_000) {
      context.addIssue({
        code: "custom",
        path: ["messages"],
        message: "Conversation history is too large.",
      });
    }
  });

const adapterStatus: Record<ModelErrorCode, number> = {
  missing_api_key: 503,
  invalid_api_key: 401,
  rate_limited: 429,
  model_unavailable: 502,
  provider_unavailable: 503,
  provider_error: 502,
  timeout: 504,
  request_aborted: 408,
  invalid_response: 502,
};

const errorResponse = (code: string, message: string, status: number) =>
  NextResponse.json({ error: { code, message } }, { status });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await readRequestJson(request);
  } catch (error) {
    if (
      error instanceof RequestBodyError &&
      error.code === "payload_too_large"
    ) {
      return errorResponse(
        "payload_too_large",
        "Chat request is too large.",
        413,
      );
    }
    return errorResponse("invalid_request", "Send a valid user question.", 400);
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse("invalid_request", "Send a valid user question.", 400);
  }

  try {
    let vaultConfig;
    try {
      vaultConfig = resolveVaultConfig();
    } catch {
      return errorResponse(
        "unsafe_personal_vault_configuration",
        "Personal vault mode is not safely configured.",
        400,
      );
    }
    const vaultRoot = vaultConfig.personal
      ? path.join(/* turbopackIgnore: true */ process.cwd(), "vault-personal")
      : path.join(process.cwd(), "vault");
    const notes = await loadVault(vaultRoot);
    const result = await runAgent(
      {
        messages: parsed.data.messages,
        notes,
        model: process.env.OPENROUTER_MODEL ?? "openrouter/free",
        fallbackModel: process.env.OPENROUTER_FALLBACK_MODEL ?? "",
        provider: vaultConfig.provider,
        signal: request.signal,
      },
      {
        complete: createChatCompletion,
      },
    );

    const response: ChatResponse = {
      ...result,
    };

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error && error.message === "invalid_response") {
      return errorResponse(
        "invalid_response",
        "OpenRouter returned an invalid response.",
        502,
      );
    }
    if (error instanceof ModelAdapterError) {
      return errorResponse(
        error.code,
        error.message,
        adapterStatus[error.code],
      );
    }

    return errorResponse(
      "application_error",
      "The chat request could not be completed.",
      500,
    );
  }
}
