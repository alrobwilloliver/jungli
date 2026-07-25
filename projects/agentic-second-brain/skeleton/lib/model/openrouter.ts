const endpoint = "https://openrouter.ai/api/v1/chat/completions";
const timeoutMilliseconds = 25_000;

export type ModelErrorCode =
  | "missing_api_key"
  | "invalid_api_key"
  | "rate_limited"
  | "model_unavailable"
  | "provider_unavailable"
  | "provider_error"
  | "timeout"
  | "request_aborted"
  | "invalid_response";

export class ModelAdapterError extends Error {
  constructor(
    public readonly code: ModelErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "ModelAdapterError";
  }
}

export interface ModelMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string | null;
  name?: string;
  tool_call_id?: string;
  tool_calls?: unknown[];
}

export interface ModelTool {
  type: "function";
  function: {
    name: string;
    description?: string;
    parameters: Record<string, unknown>;
  };
}

export interface ModelCompletion {
  model: string;
  message: {
    role: "assistant";
    content: string;
  };
}

interface CompletionPayload {
  model?: unknown;
  choices?: Array<{
    message?: {
      role?: unknown;
      content?: unknown;
    };
  }>;
}

const errorForStatus = (status: number): ModelAdapterError => {
  if (status === 401) {
    return new ModelAdapterError(
      "invalid_api_key",
      "OpenRouter authentication failed.",
    );
  }
  if (status === 429) {
    return new ModelAdapterError(
      "rate_limited",
      "OpenRouter rate limit reached.",
    );
  }
  if (status === 400 || status === 404) {
    return new ModelAdapterError(
      "model_unavailable",
      "The configured model is unavailable.",
    );
  }
  if (status >= 500) {
    return new ModelAdapterError(
      "provider_unavailable",
      "OpenRouter is temporarily unavailable.",
    );
  }
  return new ModelAdapterError("provider_error", "OpenRouter request failed.");
};

const parseCompletion = (payload: CompletionPayload): ModelCompletion => {
  const message = payload.choices?.[0]?.message;

  if (
    typeof payload.model !== "string" ||
    !payload.model ||
    message?.role !== "assistant" ||
    typeof message.content !== "string"
  ) {
    throw new ModelAdapterError(
      "invalid_response",
      "OpenRouter returned an invalid response.",
    );
  }

  return {
    model: payload.model,
    message: {
      role: "assistant",
      content: message.content,
    },
  };
};

export async function createChatCompletion(input: {
  model: string;
  messages: ModelMessage[];
  tools?: ModelTool[];
  signal?: AbortSignal;
}): Promise<ModelCompletion> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new ModelAdapterError(
      "missing_api_key",
      "OpenRouter is not configured.",
    );
  }

  const timeoutSignal = AbortSignal.timeout(timeoutMilliseconds);
  const requestSignal = input.signal
    ? AbortSignal.any([input.signal, timeoutSignal])
    : timeoutSignal;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: input.model,
        messages: input.messages,
        ...(input.tools ? { tools: input.tools } : {}),
      }),
      signal: requestSignal,
    });
  } catch {
    if (timeoutSignal.aborted) {
      throw new ModelAdapterError("timeout", "OpenRouter request timed out.");
    }
    if (input.signal?.aborted) {
      throw new ModelAdapterError("request_aborted", "Model request aborted.");
    }
    throw new ModelAdapterError(
      "provider_unavailable",
      "OpenRouter is temporarily unavailable.",
    );
  }

  if (!response.ok) {
    throw errorForStatus(response.status);
  }

  let payload: CompletionPayload;
  try {
    payload = (await response.json()) as CompletionPayload;
  } catch {
    throw new ModelAdapterError(
      "invalid_response",
      "OpenRouter returned an invalid response.",
    );
  }

  return parseCompletion(payload);
}
