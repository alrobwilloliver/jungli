import { describe, expect, test } from "vitest";

import { createPendingChatTurn, failPendingChatTurn } from "@/lib/chat-client";
import type { ChatMessage } from "@/lib/contracts";

const charactersIn = (messages: ChatMessage[]) =>
  messages.reduce((total, message) => total + message.content.length, 0);

describe("baseline chat client state", () => {
  test("sends only the most recent history accepted by the route", () => {
    const history = Array.from({ length: 24 }, (_, index): ChatMessage => ({
      role: index % 2 === 0 ? "user" : "assistant",
      content: `message ${index}`,
    }));

    const turn = createPendingChatTurn(history, "latest question");

    expect(turn?.request.messages).toHaveLength(20);
    expect(turn?.request.messages.slice(0, -1)).toEqual(history.slice(-19));
    expect(turn?.request.messages.at(-1)).toEqual({
      role: "user",
      content: "latest question",
    });
  });

  test("keeps request characters and individual messages within route limits", () => {
    const history = Array.from({ length: 19 }, (_, index): ChatMessage => ({
      role: index % 2 === 0 ? "user" : "assistant",
      content: String(index).repeat(9_000),
    }));

    const turn = createPendingChatTurn(history, "q".repeat(4_500));
    const requestMessages = turn?.request.messages ?? [];

    expect(charactersIn(requestMessages)).toBeLessThanOrEqual(32_000);
    expect(
      requestMessages.every(({ content }) => content.length <= 8_000),
    ).toBe(true);
    expect(requestMessages.at(-1)?.content).toHaveLength(4_000);
  });

  test("rolls back the optimistic question and restores it for retry", () => {
    const history: ChatMessage[] = [
      { role: "user", content: "Earlier question" },
      { role: "assistant", content: "Earlier answer" },
    ];
    const turn = createPendingChatTurn(history, "Please try this");

    expect(turn?.displayMessages.at(-1)).toEqual({
      role: "user",
      content: "Please try this",
    });

    expect(failPendingChatTurn(turn!)).toEqual({
      messages: history,
      draft: "Please try this",
    });
  });
});
