export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ActivityEvent {
  type: "context";
  message: string;
}

export interface ChatResponse {
  answer: string;
  model: string;
  sources: string[];
  activity: ActivityEvent[];
  usage: {
    modelCalls: number;
    notesSent: number;
    contextCharacters: number;
  };
}
