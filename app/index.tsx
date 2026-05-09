import { router } from "expo-router";
import { MotiView } from "moti";
import { useEffect } from "react";
import { Text, View } from "react-native";

import { ScreenContainer } from "../src/components/ui/ScreenContainer";

export default function IndexScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScreenContainer scroll={false}>
      <View className="flex-1 items-center justify-center">
        <MotiView
          from={{ opacity: 0, translateY: 18, scale: 0.96 }}
          animate={{ opacity: 1, translateY: 0, scale: 1 }}
          transition={{ type: "timing", duration: 600 }}
          className="items-center"
        >
          <View className="mb-5 h-24 w-24 items-center justify-center rounded-full bg-brand-blue/20">
            <Text className="text-4xl">📚</Text>
          </View>
          <Text className="text-3xl font-bold text-brand-navy">
            StoryNest AI
          </Text>
          <Text className="mt-3 text-center text-base text-brand-ink/70">
            Magical stories for children, shaped with care.
          </Text>
        </MotiView>
      </View>
    </ScreenContainer>
  );
}
