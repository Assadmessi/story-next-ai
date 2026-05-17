export interface AIProviderMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIProviderGenerateOptions {
  temperature?: number;
  maxTokens?: number;
}

export interface AIProvider {
  name: string;

  generateText: (
    messages: AIProviderMessage[],
    options?: AIProviderGenerateOptions,
  ) => Promise<string>;

  generateJson: <T>(
    messages: AIProviderMessage[],
    schema: unknown,
    options?: AIProviderGenerateOptions,
  ) => Promise<T>;
}
