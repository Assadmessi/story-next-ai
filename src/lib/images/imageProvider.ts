import type { StorybookImage, StorybookPage } from "../../types/story";

export type ImageProviderName = "mock" | "gemini" | "openai" | "stability";

export interface ImageGenerationRequest {
  page: StorybookPage;
  storyTitle: string;
  characterName: string;
  characterType: string;
  visualStyle: string;
  setting: string;
  ageBand: string;
  language: string;
}

export interface ImageGenerationResult extends StorybookImage {
  provider: ImageProviderName;
  promptUsed: string;
  generatedAt: string;
}

export interface ImageProvider {
  name: ImageProviderName;

  generateImage: (
    request: ImageGenerationRequest,
  ) => Promise<ImageGenerationResult>;
}

export function buildSafeImagePrompt(request: ImageGenerationRequest) {
  return `
Children's storybook illustration.

Story title: ${request.storyTitle}
Page number: ${request.page.pageNumber}
Character: ${request.characterName}, ${request.characterType}
Setting: ${request.setting}
Visual style: ${request.visualStyle}
Age group: ${request.ageBand}

Scene:
${request.page.text}

Image direction:
${request.page.imagePrompt}

Safety rules:
- Child-safe illustration only.
- No scary, violent, bloody, adult, or disturbing content.
- Keep the character design consistent.
- Warm, magical, friendly, premium storybook feeling.
- Suitable for parents and children.
`.trim();
}
