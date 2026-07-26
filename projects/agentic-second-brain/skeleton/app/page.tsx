"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

import { createPendingChatTurn, failPendingChatTurn } from "@/lib/chat-client";
import type { ChatMessage, ChatResponse } from "@/lib/contracts";

const suggestions = [
  "What measurable growth work has Sam done?",
  "Which projects show Sam's launch experience?",
  "What product marketing skills does Sam have?",
  "What is Sam's favorite restaurant?",
];

interface ApiError {
  error?: {
    code?: string;
    message?: string;
  };
}

const readJson = async (response: Response): Promise<unknown> => {
  try {
    return await response.json();
  } catch {
    return undefined;
  }
};

export default function HomePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState("");
  const [diagnostics, setDiagnostics] = useState<ChatResponse | null>(null);
  const [error, setError] = useState<{
    code?: string;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const mode = diagnostics?.mode ?? "baseline";

  useEffect(() => {
    const transcript = transcriptRef.current;
    if (!transcript || (messages.length === 0 && !isLoading)) return;

    transcript.scrollTop = transcript.scrollHeight;
  }, [isLoading, messages]);

  const askQuestion = async (nextQuestion: string) => {
    const turn = createPendingChatTurn(messages, nextQuestion);
    if (!turn || isLoading) return;

    setMessages(turn.displayMessages);
    setQuestion("");
    setDiagnostics(null);
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(turn.request),
      });
      const payload = (await readJson(response)) as
        ChatResponse | ApiError | undefined;

      if (!response.ok) {
        const apiError = payload as ApiError | undefined;
        throw {
          code: apiError?.error?.code,
          message:
            apiError?.error?.message ??
            "The assistant could not answer. Please try again.",
        };
      }

      const result = payload as ChatResponse;
      setMessages([
        ...turn.displayMessages,
        { role: "assistant", content: result.answer },
      ]);
      setDiagnostics(result);
    } catch (cause) {
      const rollback = failPendingChatTurn(turn);
      const failure =
        typeof cause === "object" &&
        cause !== null &&
        "message" in cause &&
        typeof cause.message === "string"
          ? {
              code:
                "code" in cause && typeof cause.code === "string"
                  ? cause.code
                  : undefined,
              message: cause.message,
            }
          : {
              message:
                "The assistant could not be reached. Check your connection and try again.",
            };
      setMessages(rollback.messages);
      setQuestion(rollback.draft);
      setError(failure);
    } finally {
      setIsLoading(false);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void askQuestion(question);
  };

  return (
    <article className="chat-page">
      <header className="chat-intro">
        <div>
          <p className={`mode-badge ${mode}`}>
            {mode === "agentic" ? "Agentic" : "Non-agentic baseline"}
          </p>
          <h1>Ask Sam&apos;s second brain</h1>
          <p className="lede">
            This starting version sends all five notes to the model on every
            message. Watch the activity and context counters—we will make that
            behavior agentic in the next build.
          </p>
        </div>

        <div className="flow-card" aria-label="Current request flow">
          <span>Question</span>
          <span aria-hidden="true">→</span>
          <span>Every note</span>
          <span aria-hidden="true">→</span>
          <span>One answer</span>
        </div>
      </header>

      <div className="chat-layout">
        <section className="chat-card" aria-labelledby="conversation-heading">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">Conversation</p>
              <h2 id="conversation-heading">Chat with the vault</h2>
            </div>
            {messages.length > 0 && (
              <span className="message-count">
                {messages.length}{" "}
                {messages.length === 1 ? "message" : "messages"}
              </span>
            )}
          </div>

          <div
            ref={transcriptRef}
            className={`transcript ${messages.length === 0 ? "is-empty" : ""}`}
            aria-live="polite"
            aria-busy={isLoading}
          >
            {messages.length === 0 ? (
              <div className="empty-transcript">
                <span className="spark" aria-hidden="true">
                  ✦
                </span>
                <h3>Start with a question</h3>
                <p>
                  Answers are grounded in the fictional Sam Rivera vault. Try a
                  prompt below or write your own.
                </p>
              </div>
            ) : (
              <ol className="message-list">
                {messages.map((message, index) => (
                  <li className={`message ${message.role}`} key={index}>
                    <span className="message-role">
                      {message.role === "user" ? "You" : "Second brain"}
                    </span>
                    <p>{message.content}</p>
                  </li>
                ))}
              </ol>
            )}

            {isLoading && (
              <p className="loading-status">
                <span aria-hidden="true" className="loading-dot" />
                Sending all five notes and waiting for the model…
              </p>
            )}
          </div>

          {error && (
            <div className="error-message" role="alert">
              <strong>
                {error.code === "missing_api_key"
                  ? "Model setup needed"
                  : "Could not get an answer"}
              </strong>
              <p>{error.message}</p>
              {error.code === "missing_api_key" && (
                <a href="/setup">Open the private setup guide</a>
              )}
            </div>
          )}

          <div className="suggestions" aria-label="Suggested questions">
            {suggestions.map((suggestion) => (
              <button
                type="button"
                className="suggestion"
                disabled={isLoading}
                key={suggestion}
                onClick={() => void askQuestion(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form className="composer" onSubmit={submit}>
            <label htmlFor="question">
              Ask a question about Sam&apos;s notes
            </label>
            <div className="composer-row">
              <input
                id="question"
                type="text"
                maxLength={4_000}
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="e.g. What outcomes has Sam delivered?"
                disabled={isLoading}
              />
              <button
                className="send-button"
                type="submit"
                disabled={isLoading || !question.trim()}
              >
                {isLoading ? "Sending…" : "Send"}
              </button>
            </div>
          </form>
        </section>

        <aside className="activity-card" aria-labelledby="activity-heading">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">Behind the answer</p>
              <h2 id="activity-heading">Activity</h2>
            </div>
            <span className="live-badge">Visible trace</span>
          </div>

          {diagnostics ? (
            <>
              <ol className="activity-list">
                {diagnostics.activity.map((event, index) => (
                  <li key={`${event.type}-${index}`}>
                    <span className="activity-marker" aria-hidden="true" />
                    {event.message}
                  </li>
                ))}
              </ol>

              <dl className="metrics">
                <div>
                  <dt>Actual model</dt>
                  <dd>{diagnostics.model}</dd>
                </div>
                <div>
                  <dt>Model calls</dt>
                  <dd>{diagnostics.usage.modelCalls}</dd>
                </div>
                <div>
                  <dt>Notes sent</dt>
                  <dd>{diagnostics.usage.notesSent}</dd>
                </div>
                <div>
                  <dt>Notes read</dt>
                  <dd>{diagnostics.usage.notesRead}</dd>
                </div>
                <div>
                  <dt>Restarted</dt>
                  <dd>{diagnostics.restarted ? "Yes" : "No"}</dd>
                </div>
                <div>
                  <dt>Context characters</dt>
                  <dd>
                    ≈ {diagnostics.usage.contextCharacters.toLocaleString()}
                  </dd>
                </div>
              </dl>

              <div className="sources">
                <h3>Sources</h3>
                <div className="source-list">
                  {diagnostics.sources.map((source) => (
                    <span className="source-chip" key={source}>
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="empty-activity">
              <p>
                Ask a question to see what the application sends, which model
                answers, and how much context the request uses.
              </p>
              <dl className="metrics placeholder-metrics">
                <div>
                  <dt>Model calls</dt>
                  <dd>—</dd>
                </div>
                <div>
                  <dt>Notes sent</dt>
                  <dd>—</dd>
                </div>
                <div>
                  <dt>Notes read</dt>
                  <dd>—</dd>
                </div>
                <div>
                  <dt>Context characters</dt>
                  <dd>—</dd>
                </div>
              </dl>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
