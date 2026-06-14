import type { StorybookImage, StorybookPage } from "../../types/story";

export async function mockGenerateStoryImage(
  page: StorybookPage,
): Promise<StorybookImage> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    pageId: page.id,
    status: "ready",
    imageUrl: `https://placehold.co/1024x1024/EEF6FF/1E2A38/png?text=Story+Page+${page.pageNumber}`,
  };
}
