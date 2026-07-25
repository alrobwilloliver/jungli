import { NextResponse } from "next/server";
import { z } from "zod";

import type { ChatResponse } from "@/lib/contracts";
import {
  ModelAdapterError,
  createChatCompletion,
  type ModelErrorCode,
} from "@/lib/model/openrouter";
import { buildAllContext } from "@/lib/vault/all-context";
import { loadVault } from "@/lib/vault/load-vault";

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
    body = await request.json();
  } catch {
    return errorResponse("invalid_request", "Send a valid user question.", 400);
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse("invalid_request", "Send a valid user question.", 400);
  }

  try {
    const notes = await loadVault();
    const context = buildAllContext(notes);
    const completion = await createChatCompletion({
      model: process.env.OPENROUTER_MODEL ?? "openrouter/free",
      messages: [
        { role: "system", content: context.text },
        ...parsed.data.messages,
      ],
    });

    const response: ChatResponse = {
      answer: completion.message.content,
      model: completion.model,
      sources: notes.map((note) => note.path),
      activity: [
        {
          type: "context",
          message: `Sent all ${context.notesSent} notes as context`,
        },
      ],
      usage: {
        modelCalls: 1,
        notesSent: context.notesSent,
        contextCharacters: context.contextCharacters,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
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
