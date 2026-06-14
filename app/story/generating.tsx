import { router, useLocalSearchParams } from "expo-router";
import { Sparkles } from "lucide-react-native";
import { MotiView } from "moti";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

import { AppButton } from "../../src/components/ui/AppButton";
import { AppCard } from "../../src/components/ui/AppCard";
import { ScreenContainer } from "../../src/components/ui/ScreenContainer";
import {
  geminiResultToGeneratedStory,
  generateGeminiStory,
} from "../../src/lib/ai/engine/geminiStoryEngine";
import { saveTempStory } from "../../src/lib/storage/temStory";
import type { ProStoryRequest } from "../../src/types/ai";

const loadingSteps = [
  "Creating the story idea...",
  "Planning the scenes...",
  "Checking child-safe tone...",
  "Writing the first draft...",
  "Smoothing the dialogue...",
  "Polishing the ending...",
  "Preparing your story...",
];

export default function StoryGeneratingScreen() {
  const params = useLocalSearchParams<Record<string, string>>();
  const hasStarted = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    const stepTimer = setInterval(() => {
      setStepIndex((value) =>
        value >= loadingSteps.length - 1 ? loadingSteps.length - 1 : value + 1,
      );
    }, 3500);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, []);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    async function generate() {
      try {
        const request: ProStoryRequest = {
          ageBand: (params.ageBand ?? "6-8") as ProStoryRequest["ageBand"],
          language: (params.language ??
            "english") as ProStoryRequest["language"],
          length: (params.length ?? "short") as ProStoryRequest["length"],
          style: (params.style ?? "soft_cartoon") as ProStoryRequest["style"],
          lesson: params.lesson ?? "Kindness",
          mainCharacterName: params.mainCharacterName ?? "Milo",
          characterType: params.characterType ?? "Curious child",
          setting: params.setting ?? "Moonlit forest",
          mood: params.mood ?? "Warm and emotional",
        };

        const geminiResult = await generateGeminiStory(request);
        const story = geminiResultToGeneratedStory(geminiResult);

        const storyId = await saveTempStory(story);

        router.replace({
          pathname: "/story/result",
          params: {
            storyId,
          },
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to generate story.";
        setError(message);
      }
    }

    generate();
  }, [params]);

  const progress = Math.min(((stepIndex + 1) / loadingSteps.length) * 100, 96);

  return (
    <ScreenContainer>
      <View className="min-h-[650px] justify-center">
        <View className="items-center">
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

            <Text className="mt-3 text-center text-base leading-7 text-brand-ink">
              {error ?? loadingSteps[stepIndex]}
            </Text>

            {!error ? (
              <>
                <View className="mt-5 h-3 overflow-hidden rounded-full bg-brand-mist">
                  <View
                    className="h-full rounded-full bg-brand-blue"
                    style={{ width: `${progress}%` }}
                  />
                </View>

                <Text className="mt-4 text-center text-sm leading-6 text-brand-ink">
                  Time passed: {seconds}s
                </Text>

                <Text className="mt-2 text-center text-xs leading-5 text-brand-ink">
                  Burmese and bilingual stories can take longer because the app
                  is planning, writing, and checking the story carefully.
                </Text>
              </>
            ) : (
              <View className="mt-5">
                <AppButton
                  label="Back to Setup"
                  onPress={() => router.replace("/story/setup")}
                />
              </View>
            )}
          </AppCard>
        </View>
      </View>
    </ScreenContainer>
  );
}
