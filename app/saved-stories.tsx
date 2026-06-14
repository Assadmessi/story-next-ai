import { router, useFocusEffect } from "expo-router";
import { BookOpen, Trash2 } from "lucide-react-native";
import { useCallback } from "react";
import { Pressable, Text, View } from "react-native";

import { AppButton } from "../src/components/ui/AppButton";
import { AppCard } from "../src/components/ui/AppCard";
import { ScreenContainer } from "../src/components/ui/ScreenContainer";
import { ScreenHeader } from "../src/components/ui/ScreenHeader";
import { useStories } from "../src/hooks/useStories";
import { saveTempStory } from "../src/lib/storage/temStory";
import { formatStoryDate } from "../src/lib/utils/dates";
import type { GeneratedStory } from "../src/types/story";

export default function SavedStoriesScreen() {
  const { stories, isLoading, loadStories, removeStory } = useStories();

  useFocusEffect(
    useCallback(() => {
      loadStories();
    }, [loadStories]),
  );

  const openStory = async (story: GeneratedStory) => {
    const storyId = await saveTempStory(story);

    router.push({
      pathname: "/story/result",
      params: {
        storyId,
      },
    });
  };

  return (
    <ScreenContainer>
      <ScreenHeader
        title="Saved Stories"
        subtitle="Stories saved locally on this device during Phase 1."
      />

      <View className="gap-4">
        {isLoading ? (
          <Text className="text-brand-ink/70">Loading stories...</Text>
        ) : stories.length === 0 ? (
          <AppCard>
            <Text className="text-lg font-semibold text-brand-navy">
              No saved stories yet
            </Text>
            <Text className="mt-2 text-sm leading-6 text-brand-ink/70">
              Generate a story first, then save it from the result screen.
            </Text>
            <View className="mt-4">
              <AppButton
                label="Create Story"
                onPress={() => router.push("/story/setup")}
              />
            </View>
          </AppCard>
        ) : (
          stories.map((story) => (
            <Pressable key={story.id} onPress={() => openStory(story)}>
              <AppCard>
                <View className="flex-row items-start justify-between gap-4">
                  <View className="flex-1">
                    <Text className="text-lg font-semibold leading-6 text-brand-navy">
                      {story.title}
                    </Text>
                    <Text className="mt-2 text-sm text-brand-ink/60">
                      {formatStoryDate(story.createdAt)}
                    </Text>
                  </View>

                  <Pressable
                    onPress={(event) => {
                      event.stopPropagation();
                      removeStory(story.id);
                    }}
                    className="h-10 w-10 items-center justify-center rounded-full bg-brand-coral/10"
                  >
                    <Trash2 color="#FF6B6B" size={18} />
                  </Pressable>
                </View>

                <Text
                  className="mt-3 text-sm leading-6 text-brand-ink/75"
                  numberOfLines={4}
                >
                  {story.story}
                </Text>

                <View className="mt-4 flex-row items-center">
                  <BookOpen color="#5DB9FF" size={16} />
                  <Text className="ml-2 text-sm font-semibold text-brand-blue">
                    Tap to open
                  </Text>
                </View>
              </AppCard>
            </Pressable>
          ))
        )}
      </View>
    </ScreenContainer>
  );
}
