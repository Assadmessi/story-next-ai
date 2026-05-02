import { router, useFocusEffect } from "expo-router";
import { Plus } from "lucide-react-native";
import { useCallback } from "react";
import { Text, View } from "react-native";

import { AppButton } from "../../src/components/ui/AppButton";
import { AppCard } from "../../src/components/ui/AppCard";
import { ScreenContainer } from "../../src/components/ui/ScreenContainer";
import { ScreenHeader } from "../../src/components/ui/ScreenHeader";
import { useChildProfiles } from "../../src/hooks/useChildProfiles";

export default function ChildProfilesScreen() {
  const { profiles, isLoading, loadProfiles } = useChildProfiles();

  useFocusEffect(
    useCallback(() => {
      loadProfiles();
    }, [loadProfiles]),
  );

  return (
    <ScreenContainer>
      <ScreenHeader title="Child Profiles" />
      <Text className="mt-2 text-base leading-7 text-brand-ink/70">
        Save each child’s age, language, and story preferences.
      </Text>

      <View className="mt-6">
        <AppButton
          label="Create Child Profile"
          onPress={() => router.push("/child-profiles/create")}
          icon={<Plus color="#FFFFFF" size={18} />}
        />
      </View>

      <View className="mt-6 gap-4">
        {isLoading ? (
          <Text className="text-brand-ink/70">Loading profiles...</Text>
        ) : profiles.length === 0 ? (
          <AppCard>
            <Text className="text-lg font-semibold text-brand-navy">
              No profiles yet
            </Text>
            <Text className="mt-2 text-sm leading-6 text-brand-ink/70">
              Create a profile first. Later, stories can use the child’s age and
              language automatically.
            </Text>
          </AppCard>
        ) : (
          profiles.map((profile) => (
            <AppCard key={profile.id}>
              <Text className="text-lg font-semibold text-brand-navy">
                {profile.name}
              </Text>
              <Text className="mt-2 text-sm text-brand-ink/70">
                Age {profile.ageBand} • {profile.language}
              </Text>
              {profile.favoriteTheme ? (
                <Text className="mt-1 text-sm text-brand-ink/70">
                  Favorite theme: {profile.favoriteTheme}
                </Text>
              ) : null}
            </AppCard>
          ))
        )}
      </View>
    </ScreenContainer>
  );
}
