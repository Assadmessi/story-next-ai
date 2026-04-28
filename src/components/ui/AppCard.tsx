import { ReactNode } from "react";
import { View } from "react-native";

interface AppCardProps {
  children: ReactNode;
  className?: string;
}

export function AppCard({ children, className = "" }: AppCardProps) {
  return (
    <View
      className={`rounded-[28px] border border-black/5 bg-white/90 p-4 ${className}`}
      style={{
        shadowColor: "#223042",
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 8 },
        elevation: 4,
      }}
    >
      {children}
    </View>
  );
}
