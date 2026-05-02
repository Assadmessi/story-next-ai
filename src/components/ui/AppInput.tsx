import { Text, TextInput, View } from "react-native";

interface AppInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  error?: string;
}

export function AppInput({
  label,
  placeholder,
  value,
  onChangeText,
  error,
}: AppInputProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-medium text-brand-ink">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8C9AB0"
        className={`min-h-[52px] rounded-2xl border bg-white px-4 text-[15px] text-brand-ink ${
          error ? "border-brand-coral" : "border-black/10"
        }`}
      />
      {error ? (
        <Text className="mt-2 text-xs font-medium text-brand-coral">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
