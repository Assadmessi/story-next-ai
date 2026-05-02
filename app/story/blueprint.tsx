import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import { AppButton } from "../../src/components/ui/AppButton";
import { AppCard } from "../../src/components/ui/AppCard";
import { ScreenContainer } from "../../src/components/ui/ScreenContainer";
import { ScreenHeader } from "../../src/components/ui/ScreenHeader";

export default function StoryBlueprintScreen() {
  const params = useLocalSearchParams<{
    ageBand?: string;
    language?: string;
    length?: string;
    style?: string;
    lesson?: string;
    mainCharacterName?: string;
    characterType?: string;
    setting?: string;
    mood?: string;
  }>();

  const titleIdeas = [
    `${params.mainCharacterName ?? "Milo"} and the Kind Little Light`,
    `The Secret of the ${params.setting ?? "Moonlit Forest"}`,
    `A Brave Day for ${params.mainCharacterName ?? "Milo"}`,
  ];

  return (
    <ScreenContainer>
      <ScreenHeader title="Story Blueprint" />
      <Text className="mt-2 text-base leading-7 text-brand-ink/70">
        Review the direction before generating the full story.
      </Text>

      <AppCard className="mt-6">
        <Text className="text-lg font-semibold text-brand-navy">
          Title ideas
        </Text>
        <View className="mt-3 gap-2">
          {titleIdeas.map((title) => (
            <Text key={title} className="text-base leading-6 text-brand-ink/80">
              • {title}
            </Text>
          ))}
        </View>
      </AppCard>

      <AppCard className="mt-4">
        <Text className="text-lg font-semibold text-brand-navy">
          Story direction
        </Text>
        <Text className="mt-3 text-sm leading-6 text-brand-ink/75">
          A {params.length ?? "short"} {params.style ?? "soft cartoon"} story
          for ages {params.ageBand ?? "6-8"} about{" "}
          {params.mainCharacterName ?? "Milo"}, a{" "}
          {params.characterType ?? "curious child"}, learning{" "}
          {params.lesson ?? "kindness"} in the{" "}
          {params.setting ?? "moonlit forest"}. The mood is{" "}
          {params.mood ?? "warm and emotional"}.
        </Text>
      </AppCard>

      <AppCard className="mt-4">
        <Text className="text-lg font-semibold text-brand-navy">
          Child-safe promise
        </Text>
        <Text className="mt-3 text-sm leading-6 text-brand-ink/75">
          This story should stay gentle, clear, emotionally warm, and suitable
          for children.
        </Text>
      </AppCard>

      <View className="mt-6">
        <AppButton
          label="Generate Story"
          onPress={() =>
            router.push({
              pathname: "/story/generating",
              params,
            })
          }
        />
      </View>
    </ScreenContainer>
  );
}
