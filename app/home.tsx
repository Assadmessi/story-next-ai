import { router } from "expo-router";
import { BookOpen, Settings, Sparkles, Users } from "lucide-react-native";
import { MotiView } from "moti";
import { Pressable, Text, View } from "react-native";

import { AppButton } from "../src/components/ui/AppButton";
import { AppCard } from "../src/components/ui/AppCard";
import { ScreenContainer } from "../src/components/ui/ScreenContainer";

export default function HomeScreen() {
  return (
    <ScreenContainer>
      <MotiView
        from={{ opacity: 0, translateY: 24 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}
      >
        <Text className="mt-2 text-sm font-medium text-brand-ink/60">
          Welcome back
        </Text>
        <Text className="mt-1 text-3xl font-bold leading-tight text-brand-navy">
          Build warm, safe, beautiful stories for children.
        </Text>
        <Text className="mt-3 text-base leading-7 text-brand-ink/75">
          Start with a child profile, then shape a premium story with style,
          lesson, and emotion.
        </Text>
      </MotiView>

      <AppCard className="mt-6">
        <Text className="text-lg font-semibold text-brand-navy">
          Start a new story
        </Text>
        <Text className="mt-2 text-sm leading-6 text-brand-ink/70">
          Choose short or long story generation with guided inputs.
        </Text>
        <View className="mt-4">
          <AppButton
            label="Create Story"
            onPress={() => router.push("/story/setup")}
            icon={<Sparkles color="#FFFFFF" size={18} />}
          />
        </View>
      </AppCard>

      <View className="mt-6 gap-4">
        <Pressable onPress={() => router.push("/child-profiles")}>
          <AppCard>
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-lg font-semibold text-brand-navy">
                  Child Profiles
                </Text>
                <Text className="mt-2 text-sm leading-6 text-brand-ink/70">
                  Save age, language, and favorite themes for each child.
                </Text>
              </View>
              <Users color="#1E2A38" size={22} />
            </View>
          </AppCard>
        </Pressable>

        <Pressable onPress={() => router.push("/saved-stories")}>
          <AppCard>
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-lg font-semibold text-brand-navy">
                  Saved Stories
                </Text>
                <Text className="mt-2 text-sm leading-6 text-brand-ink/70">
                  Reopen finished stories and continue refining later.
                </Text>
              </View>
              <BookOpen color="#1E2A38" size={22} />
            </View>
          </AppCard>
        </Pressable>

        <Pressable onPress={() => router.push("/settings")}>
          <AppCard>
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-lg font-semibold text-brand-navy">
                  Settings
                </Text>
                <Text className="mt-2 text-sm leading-6 text-brand-ink/70">
                  Tune app behavior before cloud sync and voice arrive in later
                  phases.
                </Text>
              </View>
              <Settings color="#1E2A38" size={22} />
            </View>
          </AppCard>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
