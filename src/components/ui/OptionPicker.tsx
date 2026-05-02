import { Pressable, Text, View } from "react-native";

interface OptionPickerItem<T extends string> {
  label: string;
  value: T;
  description?: string;
  emoji?: string;
}

interface OptionPickerProps<T extends string> {
  label: string;
  value: T;
  options: OptionPickerItem<T>[];
  onChange: (value: T) => void;
}

export function OptionPicker<T extends string>({
  label,
  value,
  options,
  onChange,
}: OptionPickerProps<T>) {
  return (
    <View className="mb-5">
      <Text className="mb-3 text-sm font-semibold text-brand-ink">{label}</Text>
      <View className="gap-3">
        {options.map((option) => {
          const active = option.value === value;

          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              className={`rounded-3xl border p-4 ${
                active
                  ? "border-brand-blue bg-brand-blue/15"
                  : "border-black/10 bg-white"
              }`}
            >
              <View className="flex-row items-start">
                {option.emoji ? (
                  <Text className="mr-3 text-2xl">{option.emoji}</Text>
                ) : null}
                <View className="flex-1">
                  <Text className="text-base font-semibold text-brand-navy">
                    {option.label}
                  </Text>
                  {option.description ? (
                    <Text className="mt-1 text-sm leading-5 text-brand-ink/65">
                      {option.description}
                    </Text>
                  ) : null}
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
