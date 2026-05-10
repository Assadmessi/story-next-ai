import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";
import { ScreenHeader } from "../../src/components/ui/ScreenHeader";

import { AppButton } from "../../src/components/ui/AppButton";
import { AppCard } from "../../src/components/ui/AppCard";
import { AppInput } from "../../src/components/ui/AppInput";
import { OptionPicker } from "../../src/components/ui/OptionPicker";
import { ScreenContainer } from "../../src/components/ui/ScreenContainer";
import {
  ageBandOptions,
  characterTypeOptions,
  languageOptions,
  lessonOptions,
  moodOptions,
  settingOptions,
  storyLengthOptions,
  visualStyleOptions,
} from "../../src/constants/storyOptions";

const storySetupSchema = z.object({
  ageBand: z.enum(["3-5", "6-8", "9-12"]),
  language: z.enum(["english", "burmese", "bilingual"]),
  length: z.enum(["short", "long"]),
  style: z.enum(["soft_cartoon", "bright_anime", "comic_panel"]),
  lesson: z.string().min(2, "Choose or write a lesson"),
  mainCharacterName: z
    .string()
    .min(2, "Character name must be at least 2 characters"),
  characterType: z.string().min(2, "Choose a character type"),
  setting: z.string().min(2, "Choose a setting"),
  mood: z.string().min(2, "Choose a mood"),
});

type StorySetupFormValues = z.infer<typeof storySetupSchema>;

function toQueryParams(values: StorySetupFormValues) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, String(value)]),
  );
}

export default function StorySetupScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StorySetupFormValues>({
    resolver: zodResolver(storySetupSchema),
    defaultValues: {
      ageBand: "6-8",
      language: "english",
      length: "short",
      style: "soft_cartoon",
      lesson: "Kindness",
      mainCharacterName: "Milo",
      characterType: "Curious child",
      setting: "Moonlit forest",
      mood: "Warm and emotional",
    },
  });

  const onSubmit = (values: StorySetupFormValues) => {
    router.push({
      pathname: "/story/blueprint",
      params: toQueryParams(values),
    });
  };

  return (
    <ScreenContainer>
      <ScreenHeader
        title="Story Setup"
        subtitle="Pick the story direction. In Phase 2, these controls will feed the veteran writer engine."
      />
      <Text className="mt-2 text-base leading-7 text-brand-ink/70">
        Pick the story direction. In Phase 2, these controls will feed the
        veteran writer engine.
      </Text>

      <AppCard className="mt-6">
        <Controller
          control={control}
          name="ageBand"
          render={({ field: { value, onChange } }) => (
            <OptionPicker
              label="Age group"
              value={value}
              options={ageBandOptions}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="language"
          render={({ field: { value, onChange } }) => (
            <OptionPicker
              label="Language"
              value={value}
              options={languageOptions}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="length"
          render={({ field: { value, onChange } }) => (
            <OptionPicker
              label="Story length"
              value={value}
              options={storyLengthOptions}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="style"
          render={({ field: { value, onChange } }) => (
            <OptionPicker
              label="Visual style"
              value={value}
              options={visualStyleOptions}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="mainCharacterName"
          render={({ field: { value, onChange } }) => (
            <AppInput
              label="Main character name"
              value={value}
              onChangeText={onChange}
              placeholder="Example: Milo"
              error={errors.mainCharacterName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="lesson"
          render={({ field: { value, onChange } }) => (
            <OptionPicker
              label="Lesson"
              value={value}
              options={lessonOptions.map((item) => ({
                label: item,
                value: item,
              }))}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="characterType"
          render={({ field: { value, onChange } }) => (
            <OptionPicker
              label="Character type"
              value={value}
              options={characterTypeOptions.map((item) => ({
                label: item,
                value: item,
              }))}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="setting"
          render={({ field: { value, onChange } }) => (
            <OptionPicker
              label="Setting"
              value={value}
              options={settingOptions.map((item) => ({
                label: item,
                value: item,
              }))}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="mood"
          render={({ field: { value, onChange } }) => (
            <OptionPicker
              label="Mood"
              value={value}
              options={moodOptions.map((item) => ({
                label: item,
                value: item,
              }))}
              onChange={onChange}
            />
          )}
        />
      </AppCard>

      <View className="mt-6">
        <AppButton
          label="Continue to Blueprint"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScreenContainer>
  );
}
