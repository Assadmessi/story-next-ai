import { router, useLocalSearchParams } from "expo-router";
import { Sparkles } from "lucide-react-native";
import { MotiView } from "moti";
import { useEffect, useRef } from "react";
import { Text, View } from "react-native";

import { AppCard } from "../../src/components/ui/AppCard";
import { ScreenContainer } from "../../src/components/ui/ScreenContainer";
import {
  generateproStory,
  proResultToGeneratedStory,
} from "../../src/lib/ai/engine/proStoryEngine";
import type { proStoryRequest } from "../../src/types/ai";

export default function StoryGeneratingScreen() {
  const params = useLocalSearchParams<Record<string, string>>();
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    async function generate() {
      const request: proStoryRequest = {
        ageBand: (params.ageBand ?? "6-8") as proStoryRequest["ageBand"],
        language: (params.language ?? "english") as proStoryRequest["language"],
        length: (params.length ?? "short") as proStoryRequest["length"],
        style: (params.style ?? "soft_cartoon") as proStoryRequest["style"],
        lesson: params.lesson ?? "Kindness",
        mainCharacterName: params.mainCharacterName ?? "Milo",
        characterType: params.characterType ?? "Curious child",
        setting: params.setting ?? "Moonlit forest",
        mood: params.mood ?? "Warm and emotional",
      };

      const proResult = await generateproStory(request);
      const story = proResultToGeneratedStory(proResult);

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
            Building the story engine...
          </Text>
          <Text className="mt-3 text-center text-base leading-7 text-brand-ink/70">
            Creating blueprint, scenes, draft, safety check, and polish
            structure.
          </Text>
        </AppCard>
      </View>
    </ScreenContainer>
  );
}
