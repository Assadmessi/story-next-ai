import type {
    ImageGenerationRequest,
    ImageGenerationResult,
    ImageProvider,
} from "./imageProvider";
import { buildSafeImagePrompt } from "./imageProvider";

export const mockImageProvider: ImageProvider = {
  name: "mock",

  async generateImage(
    request: ImageGenerationRequest,
  ): Promise<ImageGenerationResult> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const promptUsed = buildSafeImagePrompt(request);

    return {
      pageId: request.page.id,
      status: "ready",
      imageUrl: `https://placehold.co/1024x1024/EEF6FF/1E2A38/png?text=Story+Page+${request.page.pageNumber}`,
      provider: "mock",
      promptUsed,
      generatedAt: new Date().toISOString(),
    };
  },
};
