import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";

import { AppButton } from "../../src/components/ui/AppButton";
import { AppCard } from "../../src/components/ui/AppCard";
import { AppInput } from "../../src/components/ui/AppInput";
import { OptionPicker } from "../../src/components/ui/OptionPicker";
import { ScreenContainer } from "../../src/components/ui/ScreenContainer";
import {
  ageBandOptions,
  languageOptions,
} from "../../src/constants/storyOptions";
import { useChildProfiles } from "../../src/hooks/useChildProfiles";
import { createId } from "../../src/lib/utils/ids";

const childProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  ageBand: z.enum(["3-5", "6-8", "9-12"]),
  language: z.enum(["english", "burmese", "bilingual"]),
  favoriteTheme: z.string().optional(),
});

type ChildProfileFormValues = z.infer<typeof childProfileSchema>;

export default function CreateChildProfileScreen() {
  const { createProfile } = useChildProfiles();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChildProfileFormValues>({
    resolver: zodResolver(childProfileSchema),
    defaultValues: {
      name: "",
      ageBand: "6-8",
      language: "english",
      favoriteTheme: "",
    },
  });

  const onSubmit = async (values: ChildProfileFormValues) => {
    await createProfile({
      id: createId("child"),
      name: values.name.trim(),
      ageBand: values.ageBand,
      language: values.language,
      favoriteTheme: values.favoriteTheme?.trim(),
      bedtimeMode: false,
      createdAt: new Date().toISOString(),
    });

    router.replace("/child-profiles");
  };

  return (
    <ScreenContainer>
      <Text className="text-3xl font-bold text-brand-navy">Create Profile</Text>
      <Text className="mt-2 text-base leading-7 text-brand-ink/70">
        This helps StoryNest shape stories for the child’s age and language.
      </Text>

      <AppCard className="mt-6">
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <AppInput
              label="Child name"
              value={value}
              onChangeText={onChange}
              placeholder="Example: Aye Aye"
              error={errors.name?.message}
            />
          )}
        />

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
          name="favoriteTheme"
          render={({ field: { value, onChange } }) => (
            <AppInput
              label="Favorite theme optional"
              value={value}
              onChangeText={onChange}
              placeholder="Animals, space, school, princess..."
            />
          )}
        />
      </AppCard>

      <View className="mt-6">
        <AppButton
          label={isSubmitting ? "Saving..." : "Save Profile"}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScreenContainer>
  );
}
