import { router, useLocalSearchParams } from "expo-router";
import { BookOpen, Home, Save } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { AppButton } from "../../src/components/ui/AppButton";
import { AppCard } from "../../src/components/ui/AppCard";
import { ScreenContainer } from "../../src/components/ui/ScreenContainer";
import { ScreenHeader } from "../../src/components/ui/ScreenHeader";
import { useStories } from "../../src/hooks/useStories";
import { getTempStory } from "../../src/lib/storage/temStory";
import type { GeneratedStory } from "../../src/types/story";

export default function StoryResultScreen() {
  const params = useLocalSearchParams<{ storyId?: string }>();
  const [story, setStory] = useState<GeneratedStory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { saveStory } = useStories();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadStory() {
      if (!params.storyId) {
        setStory(null);
        setIsLoading(false);
        return;
      }

      const loadedStory = await getTempStory(params.storyId);
      setStory(loadedStory);
      setIsLoading(false);
    }

    loadStory();
  }, [params.storyId]);

  const handleSave = async () => {
    if (!story || saved) return;
    await saveStory(story);
    setSaved(true);
  };

  if (isLoading) {
    return (
      <ScreenContainer>
        <ScreenHeader
          title="Opening Story"
          subtitle="Preparing your generated story..."
        />
        <AppCard className="mt-4">
          <Text className="text-base leading-7 text-brand-ink/75">
            Please wait a moment.
          </Text>
        </AppCard>
      </ScreenContainer>
    );
  }

  if (!story) {
    return (
      <ScreenContainer>
        <ScreenHeader
          title="Story Not Found"
          subtitle="The story could not be opened from temporary storage."
        />

        <AppCard className="mt-4">
          <Text className="text-base leading-7 text-brand-ink/75">
            Please generate the story again. This should be rare after switching
            away from URL story passing.
          </Text>
        </AppCard>

        <View className="mt-6">
          <AppButton
            label="Back to Setup"
            onPress={() => router.replace("/story/setup")}
          />
        </View>
      </ScreenContainer>
    );
  }

  const storyText = story.story?.trim() || "No story text was generated.";
  const scenes = Array.isArray(story.scenes) ? story.scenes : [];

  return (
    <ScreenContainer>
      <ScreenHeader title={story.title || "Generated Story"} />

      <Text className="mt-1 text-base leading-7 text-brand-ink/70">
        {story.setup?.length === "short" ? "Short story" : "Long story"} •{" "}
        {story.setup?.language ?? "english"}
      </Text>

      <AppCard className="mt-5">
        <Text className="text-lg font-semibold text-brand-navy">Story</Text>

        <Text selectable className="mt-4 text-base leading-8 text-brand-ink">
          {storyText}
        </Text>
      </AppCard>

      <AppCard className="mt-4">
        <Text className="text-lg font-semibold text-brand-navy">
          Scene breakdown
        </Text>

        <View className="mt-3 gap-2">
          {scenes.length > 0 ? (
            scenes.map((scene, index) => (
              <Text
                key={`${scene}-${index}`}
                className="text-sm leading-6 text-brand-ink/75"
              >
                {index + 1}. {scene}
              </Text>
            ))
          ) : (
            <Text className="text-sm leading-6 text-brand-ink/70">
              No scene breakdown available.
            </Text>
          )}
        </View>
      </AppCard>

      <AppCard className="mt-4">
        <Text className="text-lg font-semibold text-brand-navy">Moral</Text>
        <Text className="mt-3 text-base leading-7 text-brand-ink/75">
          {story.moral || "No moral available."}
        </Text>
      </AppCard>

      <View className="mt-6 gap-3 pb-10">
        <AppButton
          label={saved ? "Saved" : "Save Story"}
          onPress={handleSave}
          icon={<Save color="#FFFFFF" size={18} />}
        />

        <AppButton
          label="Saved Stories"
          onPress={() => router.push("/saved-stories")}
          icon={<BookOpen color="#FFFFFF" size={18} />}
        />

        <AppButton
          label="Back Home"
          onPress={() => router.replace("/home")}
          icon={<Home color="#FFFFFF" size={18} />}
        />
      </View>
    </ScreenContainer>
  );
}
