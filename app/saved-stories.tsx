import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Text, View } from "react-native";

import { AppButton } from "../src/components/ui/AppButton";
import { AppCard } from "../src/components/ui/AppCard";
import { ScreenContainer } from "../src/components/ui/ScreenContainer";
import { useStories } from "../src/hooks/useStories";
import { formatStoryDate } from "../src/lib/utils/dates";

export default function SavedStoriesScreen() {
  const { stories, isLoading, loadStories } = useStories();

  useFocusEffect(
    useCallback(() => {
      loadStories();
    }, [loadStories]),
  );

  return (
    <ScreenContainer>
      <Text className="text-3xl font-bold text-brand-navy">Saved Stories</Text>
      <Text className="mt-2 text-base leading-7 text-brand-ink/70">
        Stories saved locally on this device during Phase 1.
      </Text>

      <View className="mt-6 gap-4">
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
            <AppCard key={story.id}>
              <Text className="text-lg font-semibold leading-6 text-brand-navy">
                {story.title}
              </Text>
              <Text className="mt-2 text-sm text-brand-ink/60">
                {formatStoryDate(story.createdAt)}
              </Text>
              <Text
                className="mt-3 text-sm leading-6 text-brand-ink/75"
                numberOfLines={4}
              >
                {story.story}
              </Text>
            </AppCard>
          ))
        )}
      </View>
    </ScreenContainer>
  );
}
