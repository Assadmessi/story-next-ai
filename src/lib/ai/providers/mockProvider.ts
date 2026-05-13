import type { AIProvider } from "./types";

export const mockProvider: AIProvider = {
  name: "mock",
  async generateText(messages) {
    const lastMessage = messages[messages.length - 1]?.content ?? "";

    await new Promise((resolve) => setTimeout(resolve, 500));

    return `MOCK AI RESPONSE

${lastMessage.slice(0, 600)}`;
  },
};
