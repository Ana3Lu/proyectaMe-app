import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface FilterChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
  activeColor?: string;
  activeTextColor?: string;
  inactiveColor?: string;
  inactiveTextColor?: string;
  style?: any
}

export default function FilterChip({
  label,
  active,
  onPress,
  activeColor = "#fff",
  activeTextColor = "#2F32CD", 
  inactiveColor = "rgba(255,255,255,0.3)", 
  inactiveTextColor = "#fff", 
  style
}: FilterChipProps) {
  return (
    <TouchableOpacity 
      style={[styles.chip, style, { backgroundColor: active ? activeColor : inactiveColor }]} 
      onPress={onPress}
    >
      <Text style={[styles.text, { color: active ? activeTextColor : inactiveTextColor }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  text: {
    fontFamily: "PoppinsBold",
  }
});
