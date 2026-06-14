import type {
    ImageGenerationRequest,
    ImageGenerationResult,
    ImageProvider,
} from "./imageProvider";

import { mockImageProvider } from "./mockImageGenerator";

// ==========================
// Configuration
// ==========================

const IMAGE_PROVIDER: ImageProvider = mockImageProvider;

// Future:
// import { geminiImageProvider } from "./geminiImageProvider";
// const IMAGE_PROVIDER = geminiImageProvider;

// ==========================
// Main Image Engine
// ==========================

export async function generateStoryImage(
  request: ImageGenerationRequest,
): Promise<ImageGenerationResult> {
  try {
    return await IMAGE_PROVIDER.generateImage(request);
  } catch (error) {
    console.error("Image generation failed:", error);

    return {
      pageId: request.page.id,
      status: "failed",
      provider: IMAGE_PROVIDER.name,
      promptUsed: request.page.imagePrompt,
      generatedAt: new Date().toISOString(),
      error:
        error instanceof Error
          ? error.message
          : "Unknown image generation error",
    };
  }
}
