import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface ScreenHeaderProps {
  title: string;
  showBack?: boolean;
}

export function ScreenHeader({ title, showBack = true }: ScreenHeaderProps) {
  return (
    <View className="mb-4 flex-row items-center">
      {showBack && (
        <Pressable
          onPress={() => router.back()}
          className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white"
        >
          <ChevronLeft size={20} color="#1E2A38" />
        </Pressable>
      )}

      <Text className="text-2xl font-bold text-brand-navy">{title}</Text>
    </View>
  );
}
