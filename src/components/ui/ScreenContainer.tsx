import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenContainerProps {
  children: ReactNode;
  scroll?: boolean;
  wide?: boolean;
}

export function ScreenContainer({
  children,
  scroll = true,
  wide = false,
}: ScreenContainerProps) {
  const content = (
    <View className="w-full items-center">
      <View
        className={`w-full px-5 pb-8 pt-4 ${wide ? "max-w-5xl" : "max-w-2xl"}`}
      >
        {children}
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#FFF8E7", "#EEF6FF", "#FFFFFF"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1">
        {scroll ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {content}
          </ScrollView>
        ) : (
          content
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}
