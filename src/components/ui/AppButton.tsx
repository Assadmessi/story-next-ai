import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

interface AppButtonProps {
  label: string;
  onPress?: () => void;
  icon?: ReactNode;
}

export function AppButton({ label, onPress, icon }: AppButtonProps) {
  return (
    <Pressable onPress={onPress} className="active:opacity-90">
      <LinearGradient
        colors={["#5DB9FF", "#7CCBFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="min-h-[56px] flex-row items-center justify-center rounded-full px-5"
      >
        {icon ? <View className="mr-2">{icon}</View> : null}
        <Text className="text-base font-semibold text-white">{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}
