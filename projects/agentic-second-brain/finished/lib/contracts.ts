export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
}

export interface ActivityEvent {
  type: "context";
  message: string;
}

export interface ChatResponse {
  mode: "baseline" | "agentic";
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
