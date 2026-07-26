import type { ActivityEvent, ChatMessage } from "@/lib/contracts";
import type {
  ModelCompletion,
  ModelMessage,
  ProviderConstraints,
} from "@/lib/model/openrouter";
import { listNotes } from "@/lib/vault/list-notes";
import { readNote } from "@/lib/vault/read-note";
import { searchNotes } from "@/lib/vault/search-notes";
import type { VaultNote } from "@/lib/vault/types";

import { executeToolCall } from "./execute-tool";
import { AGENT_SYSTEM_PROMPT } from "./system-prompt";
import { NOTE_TOOL_DEFINITIONS } from "./tool-schemas";

export const AGENT_LIMITS = {
  maxModelCalls: 3,
  maxUniqueReads: 4,
  maxQuestionCharacters: 4_000,
  maxToolResultCharacters: 12_000,
  maxRecentMessages: 6,
  timeoutMilliseconds: 25_000,
} as const;

export interface AgentRunInput {
  messages: ChatMessage[];
  notes: VaultNote[];
  model: string;
  fallbackModel?: string;
  provider?: ProviderConstraints;
  signal?: AbortSignal;
}

export interface AgentDependencies {
  complete: (input: {
    model: string;
    messages: ModelMessage[];
    tools: typeof NOTE_TOOL_DEFINITIONS;
    provider?: ProviderConstraints;
    signal?: AbortSignal;
  }) => Promise<ModelCompletion>;
}

export interface AgentRunResult {
  answer: string;
  model: string;
  restarted: boolean;
  sources: string[];
  activity: ActivityEvent[];
  usage: {
    modelCalls: number;
    notesSent: number;
    notesRead: number;
    contextCharacters: number;
  };
}

const fallbackAnswer =
  "I could not gather enough reliable evidence from the vault to answer.";

export async function runAgent(
  input: AgentRunInput,
  deps: AgentDependencies,
): Promise<AgentRunResult> {
  const history = input.messages.slice(-AGENT_LIMITS.maxRecentMessages);
  const latest = history.at(-1);
  if (
    latest?.role !== "user" ||
    !latest.content.trim() ||
    latest.content.length > AGENT_LIMITS.maxQuestionCharacters
  ) {
    throw new Error("invalid_question");
  }

  const transcript: ModelMessage[] = [
    { role: "system", content: AGENT_SYSTEM_PROMPT },
    ...history,
  ];
  const uniqueReads = new Set<string>();
  const sources: string[] = [];
  const activity: ActivityEvent[] = [];
  let actualModel = input.model;
  let modelCalls = 0;
  let restarted = false;

  for (; modelCalls < AGENT_LIMITS.maxModelCalls;) {
    let completion: ModelCompletion;
    try {
      completion = await deps.complete({
        model: actualModel,
        messages: transcript,
        tools: NOTE_TOOL_DEFINITIONS,
        provider: input.provider,
        signal: input.signal,
      });
      modelCalls += 1;
    } catch (error) {
      if (!modelCalls && !uniqueReads.size && input.fallbackModel) {
        actualModel = input.fallbackModel;
        restarted = true;
        activity.push({
          type: "restart",
          message: "Restarted with fallback model",
        });
        continue;
      }
      throw error;
    }

    if (modelCalls === 1 || (restarted && modelCalls === 1)) {
      actualModel = completion.model;
    } else if (completion.model !== actualModel) {
      throw new Error("model_identity_changed");
    }

    const message = completion.message;
    const toolCalls = message.tool_calls ?? [];
    if (!toolCalls.length) {
      const answer = message.content?.trim() || fallbackAnswer;
      activity.push({
        type: "answer",
        message: "Answered from selected evidence",
      });
      return {
        answer,
        model: actualModel,
        restarted,
        sources,
        activity,
        usage: {
          modelCalls,
          notesSent: 0,
          notesRead: uniqueReads.size,
          contextCharacters: transcript.reduce(
            (sum, item) => sum + (item.content?.length ?? 0),
            0,
          ),
        },
      };
    }

    transcript.push({
      role: "assistant",
      content: message.content,
      tool_calls: toolCalls,
    });
    const results = await Promise.all(
      toolCalls.map((call) =>
        executeToolCall(call, {
          listNotes: (folder) => listNotes(input.notes, folder),
          searchNotes: (query) => searchNotes(input.notes, query),
          readNote: (path) => {
            if (
              !uniqueReads.has(path) &&
              uniqueReads.size >= AGENT_LIMITS.maxUniqueReads
            ) {
              throw new Error("read_limit");
            }
            return readNote(input.notes, path);
          },
          uniqueNoteReads: uniqueReads,
        }),
      ),
    );
    results.forEach((result, index) => {
      const call = toolCalls[index]!;
      const output = result.output.slice(
        0,
        AGENT_LIMITS.maxToolResultCharacters,
      );
      transcript.push({
        role: "tool",
        name: call.function.name,
        tool_call_id: call.id,
        content: output,
      });
      if (result.ok) {
        const type = result.name === "read_note" ? "read" : "search";
        activity.push({ type, message: `${result.name} completed` });
        if (
          result.readPath &&
          !result.duplicate &&
          !sources.includes(result.readPath)
        ) {
          sources.push(result.readPath);
        }
      } else {
        activity.push({ type: "error", message: result.output });
      }
    });
  }

  return {
    answer: fallbackAnswer,
    model: actualModel,
    restarted,
    sources,
    activity: [
      ...activity,
      { type: "answer", message: "Stopped at the model-call limit" },
    ],
    usage: {
      modelCalls,
      notesSent: 0,
      notesRead: uniqueReads.size,
      contextCharacters: transcript.reduce(
        (sum, item) => sum + (item.content?.length ?? 0),
        0,
      ),
    },
  };
}
