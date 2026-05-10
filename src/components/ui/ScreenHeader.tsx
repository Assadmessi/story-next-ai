import { router, type Href } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  fallbackHref?: Href;
}

export function ScreenHeader({
  title,
  subtitle,
  showBack = true,
  fallbackHref = "/home",
}: ScreenHeaderProps) {
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(fallbackHref);
    }
  };

  return (
    <View className="mb-5">
      <View className="flex-row items-center">
        {showBack ? (
          <Pressable
            onPress={handleBack}
            className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-white"
          >
            <ChevronLeft size={22} color="#1E2A38" />
          </Pressable>
        ) : null}

        <Text className="flex-1 text-3xl font-bold text-brand-navy">
          {title}
        </Text>
      </View>

      {subtitle ? (
        <Text className="mt-3 text-base leading-7 text-brand-ink/70">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
