import { router, useLocalSearchParams } from "expo-router";
import { Sparkles } from "lucide-react-native";
import { MotiView } from "moti";
import { useEffect, useRef } from "react";
import { Text, View } from "react-native";

import { AppCard } from "../../src/components/ui/AppCard";
import { ScreenContainer } from "../../src/components/ui/ScreenContainer";
import { mockGenerateStory } from "../../src/lib/ai/mockGenerate";
import type { StorySetupInput } from "../../src/types/story";

export default function StoryGeneratingScreen() {
  const params = useLocalSearchParams<Record<string, string>>();
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    async function generate() {
      const story = await mockGenerateStory({
        ageBand: (params.ageBand ?? "6-8") as "3-5" | "6-8" | "9-12",
        language: (params.language ?? "english") as StorySetupInput["language"],
        length: (params.length ?? "short") as StorySetupInput["length"],
        style: (params.style ?? "soft_cartoon") as StorySetupInput["style"],
        lesson: params.lesson ?? "Kindness",
        mainCharacterName: params.mainCharacterName ?? "Milo",
        characterType: params.characterType ?? "Curious child",
        setting: params.setting ?? "Moonlit forest",
        mood: params.mood ?? "Warm and emotional",
      });

      router.replace({
        pathname: "/story/result",
        params: {
          story: encodeURIComponent(JSON.stringify(story)),
        },
      });
    }

    generate();
  }, [params]);

  return (
    <ScreenContainer scroll={false}>
      <View className="flex-1 items-center justify-center">
        <MotiView
          from={{ opacity: 0.4, scale: 0.9, rotate: "0deg" }}
          animate={{ opacity: 1, scale: 1.08, rotate: "8deg" }}
          transition={{
            type: "timing",
            duration: 900,
            loop: true,
            repeatReverse: true,
          }}
          className="mb-8 h-28 w-28 items-center justify-center rounded-full bg-brand-yellow/30"
        >
          <Sparkles color="#FF6B6B" size={44} />
        </MotiView>

        <AppCard className="w-full">
          <Text className="text-center text-2xl font-bold text-brand-navy">
            Writing your story...
          </Text>
          <Text className="mt-3 text-center text-base leading-7 text-brand-ink/70">
            StoryNest is shaping the character, lesson, scenes, and ending into
            a child-safe story.
          </Text>
        </AppCard>
      </View>
    </ScreenContainer>
  );
}
