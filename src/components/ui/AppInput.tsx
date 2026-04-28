import { Text, TextInput, View } from "react-native";

interface AppInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
}

export function AppInput({
  label,
  placeholder,
  value,
  onChangeText,
}: AppInputProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-medium text-brand-ink">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8C9AB0"
        className="min-h-[52px] rounded-2xl border border-black/10 bg-white px-4 text-[15px] text-brand-ink"
      />
    </View>
  );
}
