import { GoogleGenAI } from "@google/genai";

import type {
  ImageGenerationRequest,
  ImageGenerationResult,
  ImageProvider,
} from "./imageProvider";
import { buildSafeImagePrompt } from "./imageProvider";

function getGeminiApiKey() {
  const key = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

  if (!key) {
    throw new Error("Missing EXPO_PUBLIC_GEMINI_API_KEY.");
  }

  return key;
}

export const geminiImageProvider: ImageProvider = {
  name: "gemini",

  async generateImage(
    request: ImageGenerationRequest,
  ): Promise<ImageGenerationResult> {
    const ai = new GoogleGenAI({ apiKey: getGeminiApiKey() });
    const promptUsed = buildSafeImagePrompt(request);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: promptUsed,
      config: {
        responseModalities: ["Image"],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts ?? [];

    const imagePart = parts.find((part) => part.inlineData?.data);

    if (!imagePart?.inlineData?.data) {
      throw new Error("Gemini did not return image data.");
    }

    const mimeType = imagePart.inlineData.mimeType ?? "image/png";
    const base64 = imagePart.inlineData.data;

    return {
      pageId: request.page.id,
      status: "ready",
      imageUrl: `data:${mimeType};base64,${base64}`,
      provider: "gemini",
      promptUsed,
      generatedAt: new Date().toISOString(),
    };
  },
};
