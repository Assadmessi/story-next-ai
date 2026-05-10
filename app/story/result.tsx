import { router, useLocalSearchParams } from "expo-router";
import { BookOpen, Home, Save } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Text, View } from "react-native";

import { AppButton } from "../../src/components/ui/AppButton";
import { AppCard } from "../../src/components/ui/AppCard";
import { ScreenContainer } from "../../src/components/ui/ScreenContainer";
import { ScreenHeader } from "../../src/components/ui/ScreenHeader";
import { useStories } from "../../src/hooks/useStories";
import type { GeneratedStory } from "../../src/types/story";

function parseStory(raw?: string | string[]) {
  if (!raw || Array.isArray(raw)) return null;

  try {
    return JSON.parse(decodeURIComponent(raw)) as GeneratedStory;
  } catch {
    return null;
  }
}

export default function StoryResultScreen() {
  const params = useLocalSearchParams<{ story?: string }>();
  const story = useMemo(() => parseStory(params.story), [params.story]);
  const { saveStory } = useStories();
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!story || saved) return;
    await saveStory(story);
    setSaved(true);
  };

  if (!story) {
    return (
      <ScreenContainer>
        <ScreenHeader
          title="Story Not Found"
          subtitle="Something went wrong while opening this story."
        />
        <View className="mt-6">
          <AppButton label="Go Home" onPress={() => router.replace("/home")} />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScreenHeader title={story.title} />
      <Text className="mt-2 text-base leading-7 text-brand-ink/70">
        {story.setup.length === "short" ? "Short story" : "Long story"} •{" "}
        {story.setup.language}
      </Text>

      <AppCard className="mt-6">
        <Text className="text-lg font-semibold text-brand-navy">Story</Text>
        <Text className="mt-3 text-base leading-8 text-brand-ink/85">
          {story.story}
        </Text>
      </AppCard>

      <AppCard className="mt-4">
        <Text className="text-lg font-semibold text-brand-navy">
          Scene breakdown
        </Text>
        <View className="mt-3 gap-2">
          {story.scenes.map((scene, index) => (
            <Text
              key={`${scene}-${index}`}
              className="text-sm leading-6 text-brand-ink/75"
            >
              {index + 1}. {scene}
            </Text>
          ))}
        </View>
      </AppCard>

      <AppCard className="mt-4">
        <Text className="text-lg font-semibold text-brand-navy">Moral</Text>
        <Text className="mt-3 text-base leading-7 text-brand-ink/75">
          {story.moral}
        </Text>
      </AppCard>

      <View className="mt-6 gap-3">
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
