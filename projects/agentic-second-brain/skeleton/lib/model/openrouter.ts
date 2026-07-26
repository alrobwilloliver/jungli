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

export interface ModelToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

export interface ModelMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string | null;
  name?: string;
  tool_call_id?: string;
  tool_calls?: ModelToolCall[];
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
    content: string | null;
    tool_calls?: ModelToolCall[];
  };
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

const invalidResponse = () =>
  new ModelAdapterError(
    "invalid_response",
    "OpenRouter returned an invalid response.",
  );

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseToolCall = (value: unknown): ModelToolCall | undefined => {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    !value.id ||
    value.type !== "function" ||
    !isRecord(value.function) ||
    typeof value.function.name !== "string" ||
    !value.function.name ||
    typeof value.function.arguments !== "string"
  ) {
    return undefined;
  }

  return {
    id: value.id,
    type: "function",
    function: {
      name: value.function.name,
      arguments: value.function.arguments,
    },
  };
};

const parseCompletion = (payload: unknown): ModelCompletion => {
  if (!isRecord(payload) || !Array.isArray(payload.choices)) {
    throw invalidResponse();
  }

  const choice = payload.choices[0];
  const message = isRecord(choice) ? choice.message : undefined;

  if (
    typeof payload.model !== "string" ||
    !payload.model ||
    !isRecord(message) ||
    message.role !== "assistant"
  ) {
    throw invalidResponse();
  }

  const rawToolCalls = message.tool_calls;
  const parsedToolCalls = Array.isArray(rawToolCalls)
    ? rawToolCalls.map(parseToolCall)
    : [];
  const toolCalls = parsedToolCalls.filter(
    (call): call is ModelToolCall => call !== undefined,
  );
  const hasInvalidToolCalls =
    rawToolCalls !== undefined &&
    (!Array.isArray(rawToolCalls) ||
      toolCalls.length !== parsedToolCalls.length);
  const content =
    typeof message.content === "string" || message.content === null
      ? message.content
      : undefined;
  const hasToolCalls = toolCalls.length > 0;

  if (
    hasInvalidToolCalls ||
    content === undefined ||
    (content === null && !hasToolCalls)
  ) {
    throw invalidResponse();
  }

  return {
    model: payload.model,
    message: {
      role: "assistant",
      content,
      ...(hasToolCalls ? { tool_calls: toolCalls } : {}),
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
  let abortCause: "caller" | "timeout" | undefined;
  const recordCallerAbort = () => {
    abortCause ??= "caller";
  };
  const recordTimeoutAbort = () => {
    abortCause ??= "timeout";
  };

  if (input.signal?.aborted) {
    recordCallerAbort();
  } else if (timeoutSignal.aborted) {
    recordTimeoutAbort();
  } else {
    input.signal?.addEventListener("abort", recordCallerAbort, { once: true });
    timeoutSignal.addEventListener("abort", recordTimeoutAbort, { once: true });
  }

  const abortError = () => {
    if (abortCause === "timeout") {
      return new ModelAdapterError("timeout", "OpenRouter request timed out.");
    }
    if (abortCause === "caller") {
      return new ModelAdapterError("request_aborted", "Model request aborted.");
    }
  };

  try {
    const response = await fetch(endpoint, {
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

    requestSignal.throwIfAborted();
    if (!response.ok) {
      throw errorForStatus(response.status);
    }

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      throw abortError() ?? invalidResponse();
    }

    requestSignal.throwIfAborted();
    return parseCompletion(payload);
  } catch (error) {
    if (error instanceof ModelAdapterError) {
      throw error;
    }
    throw (
      abortError() ??
      new ModelAdapterError(
        "provider_unavailable",
        "OpenRouter is temporarily unavailable.",
      )
    );
  } finally {
    input.signal?.removeEventListener("abort", recordCallerAbort);
    timeoutSignal.removeEventListener("abort", recordTimeoutAbort);
  }
}
