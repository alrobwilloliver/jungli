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
    message.role !== "assistant" ||
    typeof message.content !== "string"
  ) {
    throw invalidResponse();
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
    if (abortCause === "timeout") {
      throw new ModelAdapterError("timeout", "OpenRouter request timed out.");
    }
    if (abortCause === "caller") {
      throw new ModelAdapterError("request_aborted", "Model request aborted.");
    }
    throw new ModelAdapterError(
      "provider_unavailable",
      "OpenRouter is temporarily unavailable.",
    );
  } finally {
    input.signal?.removeEventListener("abort", recordCallerAbort);
    timeoutSignal.removeEventListener("abort", recordTimeoutAbort);
  }

  if (!response.ok) {
    throw errorForStatus(response.status);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw invalidResponse();
  }

  return parseCompletion(payload);
}
