import { GoogleGenAI } from "@google/genai";
import { AI_CONFIG } from "../config";
import type { AIProvider, AIProviderMessage } from "./types";

function getGeminiApiKey() {
  const key = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

  if (!key) {
    throw new Error(
      "Missing EXPO_PUBLIC_GEMINI_API_KEY. Add it to your .env file for local testing.",
    );
  }

  return key;
}

function messagesToPrompt(messages: AIProviderMessage[]) {
  return messages
    .map((message) => {
      const roleLabel = message.role.toUpperCase();
      return `${roleLabel}:\n${message.content}`;
    })
    .join("\n\n");
}

export const geminiProvider: AIProvider = {
  name: "gemini",

  async generateText(messages, options) {
    const ai = new GoogleGenAI({ apiKey: getGeminiApiKey() });

    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: messagesToPrompt(messages),
      config: {
        temperature: options?.temperature ?? 0.75,
        maxOutputTokens: options?.maxTokens ?? 4096,
      },
    });

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    return text;
  },

  async generateJson<T>(
    messages: AIProviderMessage[],
    schema: unknown,
    options?: {
      temperature?: number;
      maxTokens?: number;
    },
  ): Promise<T> {
    const ai = new GoogleGenAI({ apiKey: getGeminiApiKey() });

    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: messagesToPrompt(messages),
      config: {
        temperature: options?.temperature ?? 0.55,
        maxOutputTokens: options?.maxTokens ?? 4096,
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty JSON response.");
    }

    return JSON.parse(text) as T;
  },
};
