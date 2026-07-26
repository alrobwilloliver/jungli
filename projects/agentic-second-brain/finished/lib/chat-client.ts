import type { ChatMessage, ChatRequest } from "@/lib/contracts";

const maxMessages = 20;
const maxConversationCharacters = 32_000;
const maxMessageCharacters = 8_000;
const maxQuestionCharacters = 4_000;

export interface PendingChatTurn {
  previousMessages: ChatMessage[];
  question: string;
  displayMessages: ChatMessage[];
  request: ChatRequest;
}

const trimHistoryForRequest = (
  messages: ChatMessage[],
  questionCharacters: number,
) => {
  const recentMessages = messages.slice(-(maxMessages - 1));
  const selected: ChatMessage[] = [];
  let totalCharacters = questionCharacters;

  for (let index = recentMessages.length - 1; index >= 0; index -= 1) {
    const message = recentMessages[index];
    const normalised = {
      ...message,
      content: message.content.slice(0, maxMessageCharacters),
    };

    if (
      totalCharacters + normalised.content.length >
      maxConversationCharacters
    ) {
      break;
    }

    selected.unshift(normalised);
    totalCharacters += normalised.content.length;
  }

  return selected;
};

export const createPendingChatTurn = (
  messages: ChatMessage[],
  rawQuestion: string,
): PendingChatTurn | undefined => {
  const question = rawQuestion.trim().slice(0, maxQuestionCharacters);
  if (!question) return undefined;

  const previousMessages = [...messages];
  const userMessage: ChatMessage = { role: "user", content: question };

  return {
    previousMessages,
    question,
    displayMessages: [...previousMessages, userMessage],
    request: {
      messages: [
        ...trimHistoryForRequest(previousMessages, question.length),
        userMessage,
      ],
    },
  };
};

export const failPendingChatTurn = (turn: PendingChatTurn) => ({
  messages: turn.previousMessages,
  draft: turn.question,
});
