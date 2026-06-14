import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, ChevronRight, Home } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { AppButton } from "../../src/components/ui/AppButton";
import { AppCard } from "../../src/components/ui/AppCard";
import { ScreenContainer } from "../../src/components/ui/ScreenContainer";
import { ScreenHeader } from "../../src/components/ui/ScreenHeader";
import { getTempStory } from "../../src/lib/storage/temStory";
import type { GeneratedStory } from "../../src/types/story";

export default function StorybookScreen() {
  const params = useLocalSearchParams<{ storyId?: string }>();
  const [story, setStory] = useState<GeneratedStory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    async function loadStory() {
      if (!params.storyId) {
        setIsLoading(false);
        return;
      }

      const loadedStory = await getTempStory(params.storyId);
      setStory(loadedStory);
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

  if (!story || !story.storybookPages?.length) {
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

  const pages = story.storybookPages;
  const currentPage = pages[pageIndex];
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === pages.length - 1;

  return (
    <ScreenContainer>
      <ScreenHeader title={story.title} />

      <Text className="mb-4 text-sm font-medium text-brand-ink/60">
        Page {currentPage.pageNumber} of {pages.length}
      </Text>

      <AppCard className="min-h-[260px] justify-center bg-brand-mist/70">
        <Text className="text-center text-5xl">🎨</Text>
        <Text className="mt-4 text-center text-base font-semibold text-brand-navy">
          Image placeholder
        </Text>
        <Text className="mt-2 text-center text-sm leading-6 text-brand-ink/65">
          Real generated image will be added in Phase 2 Part D.
        </Text>
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

      {isFirstPage ? null : null}
    </ScreenContainer>
  );
}
