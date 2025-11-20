import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface FilterChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export default function FilterChip({ label, active, onPress }: FilterChipProps) {
  return (
    <TouchableOpacity 
      style={[styles.chip, active ? styles.activeChip : null]} 
      onPress={onPress}
    >
      <Text style={[styles.text, active ? styles.activeText : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    marginRight: 10,
  },
  text: {
    fontFamily: "PoppinsRegular",
    color: "#fff",
  },
  activeChip: {
    backgroundColor: "#fff",
  },
  activeText: {
    color: "#2F32CD",
    fontFamily: "PoppinsBold",
  }
});