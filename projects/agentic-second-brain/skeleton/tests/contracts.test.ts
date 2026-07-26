import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { describe, expect, test } from "vitest";

import type { ActivityEvent, ChatRequest, ChatResponse } from "@/lib/contracts";

const projectFile = (relativePath: string) =>
  fileURLToPath(new URL(`../${relativePath}`, import.meta.url));

describe("browser/server chat contracts", () => {
  test("keeps the request and response independent of model-provider types", async () => {
    const source = await readFile(projectFile("lib/contracts.ts"), "utf8");

    expect(source).toContain("export interface ChatRequest");
    expect(source).not.toMatch(/from ["'].*(?:model|openrouter)/i);
    expect(source).not.toMatch(
      /\b(?:ModelMessage|ModelCompletion|ModelToolCall|OpenRouter)\b/,
    );
  });

  test("preserves sources, activity, actual model, and usage through JSON", () => {
    const request: ChatRequest = {
      messages: [{ role: "user", content: "What did Sam grow?" }],
    };
    const activity: ActivityEvent[] = [
      { type: "context", message: "Sent all 5 notes as context" },
      { type: "search", message: "Searched notes" },
      { type: "read", message: "Read a note" },
      { type: "answer", message: "Answered from evidence" },
      { type: "restart", message: "Restarted once" },
      { type: "error", message: "Stopped safely" },
    ];
    const response: ChatResponse = {
      mode: "baseline",
      answer: "Sam grew the newsletter.",
      model: "provider/actual-free-model",
      restarted: false,
      sources: ["projects/newsletter-growth.md"],
      activity,
      usage: {
        modelCalls: 1,
        notesSent: 5,
        notesRead: 0,
        contextCharacters: 4_321,
      },
    };

    expect(JSON.parse(JSON.stringify(request))).toEqual(request);
    expect(JSON.parse(JSON.stringify(response))).toEqual(response);
  });

  test("the client uses the shared mode presentation and complete diagnostics", async () => {
    const source = await readFile(projectFile("app/page.tsx"), "utf8");

    expect(source).toContain('"use client"');
    expect(source).toContain("getModePresentation");
    expect(source).toContain("diagnostics?.mode");
    expect(source).toContain("presentation.badge");
    expect(source).toContain("presentation.description");
    expect(source).toContain("presentation.flow");
    expect(source).toContain("presentation.loading");
    expect(source).toContain('fetch("/api/chat"');
    expect(source).toContain("Model calls");
    expect(source).toContain("Notes sent");
    expect(source).toContain("Notes read");
    expect(source).toContain("Context characters");
    expect(source).toContain("Restarted");
    expect(source).toContain("Sources");
    expect(source).toContain("What is Sam's favorite restaurant?");
    expect(source).toContain('role="alert"');
    expect(source).toContain('href="/setup"');
    expect(source).toContain("scrollTop");
    expect(source).not.toMatch(/ReadableStream|EventSource|useChat/);
    expect(source).not.toContain("Sending all five notes and waiting");
  });

  test("setup only uses an absolute repository URL for the model guide", async () => {
    const source = await readFile(projectFile("app/setup/page.tsx"), "utf8");

    expect(source).toMatch(
      /https:\/\/github\.com\/[^"']+\/blob\/[^"']+\/MODEL-SETUP\.md/,
    );
    expect(source).not.toMatch(/href=["'](?:\.{0,2}\/).*MODEL-SETUP\.md/);
  });
});
