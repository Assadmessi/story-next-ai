import { Text } from "react-native";
import { ScreenContainer } from "../../src/components/ui/ScreenContainer";

export default function StoryGeneratingScreen() {
  return (
    <ScreenContainer>
      <Text className="text-2xl font-bold text-brand-navy">Generating</Text>
    </ScreenContainer>
  );
}
