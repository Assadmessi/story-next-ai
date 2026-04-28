import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import { AppButton } from "../../src/components/ui/AppButton";
import { AppCard } from "../../src/components/ui/AppCard";
import { AppInput } from "../../src/components/ui/AppInput";
import { ScreenContainer } from "../../src/components/ui/ScreenContainer";

export default function StorySetupScreen() {
  const [mainCharacterName, setMainCharacterName] = useState("Milo");
  const [lesson, setLesson] = useState("Kindness");
  const [setting, setSetting] = useState("Moonlit Forest");
  const [mood, setMood] = useState("Warm and adventurous");

  return (
    <ScreenContainer>
      <Text className="text-3xl font-bold text-brand-navy">Story Setup</Text>
      <Text className="mt-2 text-base leading-7 text-brand-ink/70">
        Start with a few guided inputs. We will turn this into a polished
        children’s story.
      </Text>

      <AppCard className="mt-6">
        <AppInput
          label="Main character name"
          value={mainCharacterName}
          onChangeText={setMainCharacterName}
          placeholder="Enter a name"
        />
        <AppInput
          label="Lesson"
          value={lesson}
          onChangeText={setLesson}
          placeholder="Kindness, bravery, sharing..."
        />
        <AppInput
          label="Setting"
          value={setting}
          onChangeText={setSetting}
          placeholder="Forest, school, magical town..."
        />
        <AppInput
          label="Mood"
          value={mood}
          onChangeText={setMood}
          placeholder="Warm, funny, emotional..."
        />
      </AppCard>

      <View className="mt-6">
        <AppButton
          label="Continue to Blueprint"
          onPress={() => router.push("/story/blueprint")}
        />
      </View>
    </ScreenContainer>
  );
}
