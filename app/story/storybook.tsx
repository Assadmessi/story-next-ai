import { router, useLocalSearchParams } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  ImageIcon,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

import { AppButton } from "../../src/components/ui/AppButton";
import { AppCard } from "../../src/components/ui/AppCard";
import { ScreenContainer } from "../../src/components/ui/ScreenContainer";
import { ScreenHeader } from "../../src/components/ui/ScreenHeader";
import { mockGenerateStoryImage } from "../../src/lib/images/mockImageGenerator";
import { getTempStory } from "../../src/lib/storage/temStory";
import type { GeneratedStory, StorybookPage } from "../../src/types/story";

export default function StorybookScreen() {
  const params = useLocalSearchParams<{ storyId?: string }>();
  const [story, setStory] = useState<GeneratedStory | null>(null);
  const [pages, setPages] = useState<StorybookPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    async function loadStory() {
      if (!params.storyId) {
        setIsLoading(false);
        return;
      }

      const loadedStory = await getTempStory(params.storyId);

      setStory(loadedStory);
      setPages(loadedStory?.storybookPages ?? []);
      setIsLoading(false);
    }

    loadStory();
  }, [params.storyId]);

  if (isLoading) {
    return (
      <ScreenContainer>
        <ScreenHeader
          title="Opening Storybook"
          subtitle="Preparing story pages..."
        />
      </ScreenContainer>
    );
  }

  if (!story || pages.length === 0) {
    return (
      <ScreenContainer>
        <ScreenHeader
          title="Storybook Not Found"
          subtitle="This story does not have storybook pages yet."
        />
        <AppButton label="Back Home" onPress={() => router.replace("/home")} />
      </ScreenContainer>
    );
  }

  const currentPage = pages[pageIndex];
  const isLastPage = pageIndex === pages.length - 1;

  const handleGenerateImage = async () => {
    if (isGeneratingImage) return;

    setIsGeneratingImage(true);

    setPages((oldPages) =>
      oldPages.map((page) =>
        page.id === currentPage.id
          ? {
              ...page,
              image: {
                pageId: page.id,
                status: "generating",
              },
            }
          : page,
      ),
    );

    try {
      const generatedImage = await mockGenerateStoryImage(currentPage);

      setPages((oldPages) =>
        oldPages.map((page) =>
          page.id === currentPage.id
            ? {
                ...page,
                image: generatedImage,
              }
            : page,
        ),
      );
    } catch (error) {
      setPages((oldPages) =>
        oldPages.map((page) =>
          page.id === currentPage.id
            ? {
                ...page,
                image: {
                  pageId: page.id,
                  status: "failed",
                  error:
                    error instanceof Error
                      ? error.message
                      : "Failed to generate image.",
                },
              }
            : page,
        ),
      );
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <ScreenContainer>
      <ScreenHeader title={story.title} />

      <Text className="mb-4 text-sm font-medium text-brand-ink/60">
        Page {currentPage.pageNumber} of {pages.length}
      </Text>

      <AppCard className="min-h-[260px] justify-center bg-brand-mist/70">
        {currentPage.image?.status === "ready" && currentPage.image.imageUrl ? (
          <Image
            source={{ uri: currentPage.image.imageUrl }}
            className="h-64 w-full rounded-3xl"
            resizeMode="cover"
          />
        ) : (
          <>
            <Text className="text-center text-5xl">🎨</Text>

            <Text className="mt-4 text-center text-base font-semibold text-brand-navy">
              {currentPage.image?.status === "generating"
                ? "Painting illustration..."
                : currentPage.image?.status === "failed"
                  ? "Image failed"
                  : "Image placeholder"}
            </Text>

            <Text className="mt-2 text-center text-sm leading-6 text-brand-ink/65">
              {currentPage.image?.status === "failed"
                ? (currentPage.image.error ?? "Please try again.")
                : "Generate a preview illustration for this page."}
            </Text>

            <View className="mt-5">
              <AppButton
                label={
                  currentPage.image?.status === "generating" ||
                  isGeneratingImage
                    ? "Painting..."
                    : currentPage.image?.status === "failed"
                      ? "Try Again"
                      : "Generate Image Preview"
                }
                onPress={handleGenerateImage}
                icon={<ImageIcon color="#FFFFFF" size={18} />}
              />
            </View>
          </>
        )}
      </AppCard>

      <AppCard className="mt-4">
        <Text selectable className="text-lg leading-9 text-brand-ink">
          {currentPage.text}
        </Text>
      </AppCard>

      <AppCard className="mt-4">
        <Text className="text-sm font-semibold text-brand-navy">
          Image Prompt
        </Text>
        <Text selectable className="mt-2 text-sm leading-6 text-brand-ink/70">
          {currentPage.imagePrompt}
        </Text>
      </AppCard>

      <View className="mt-6 flex-row gap-3 pb-8">
        <View className="flex-1">
          <AppButton
            label="Previous"
            onPress={() => setPageIndex((value) => Math.max(value - 1, 0))}
            icon={<ChevronLeft color="#FFFFFF" size={18} />}
          />
        </View>

        <View className="flex-1">
          <AppButton
            label={isLastPage ? "Home" : "Next"}
            onPress={() => {
              if (isLastPage) {
                router.replace("/home");
              } else {
                setPageIndex((value) => Math.min(value + 1, pages.length - 1));
              }
            }}
            icon={
              isLastPage ? (
                <Home color="#FFFFFF" size={18} />
              ) : (
                <ChevronRight color="#FFFFFF" size={18} />
              )
            }
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
