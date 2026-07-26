import type { ActivityEvent, ChatMessage } from "@/lib/contracts";
import type {
  ModelCompletion,
  ModelMessage,
  ProviderConstraints,
} from "@/lib/model/openrouter";
import { buildAllContext } from "@/lib/vault/all-context";
import type { VaultNote } from "@/lib/vault/types";

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
    tools?: typeof NOTE_TOOL_DEFINITIONS;
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

export async function runAgent(
  input: AgentRunInput,
  deps: AgentDependencies,
): Promise<AgentRunResult> {
  const context = buildAllContext(input.notes);
  const completion = await deps.complete({
    model: input.model,
    messages: [
      {
        role: "system",
        content: `${AGENT_SYSTEM_PROMPT}\n\n${context.text}`,
      },
      ...input.messages,
    ],
    provider: input.provider,
    signal: input.signal,
  });
  if (!completion.message.content?.trim()) {
    throw new Error("invalid_response");
  }
  return {
    answer: completion.message.content,
    model: completion.model,
    restarted: false,
    sources: input.notes.map((note) => note.path),
    activity: [
      {
        type: "context",
        message: `Sent all ${context.notesSent} notes as context`,
      },
    ],
    usage: {
      modelCalls: 1,
      notesSent: context.notesSent,
      notesRead: 0,
      contextCharacters: context.contextCharacters,
    },
  };
}

// LEARNER CHECKPOINT 3 START
export async function runCheckpointAgent(): Promise<never> {
  throw new Error("checkpoint_not_implemented");
}
// LEARNER CHECKPOINT 3 END
