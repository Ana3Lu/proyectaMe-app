import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

interface HeaderButtonProps {
  icon: keyof typeof Ionicons.glyphMap; // nombre del icono (arrow-back, close…)
  color?: string;                      
  size?: number;                       
  onPress: () => void;                 
  backgroundColor?: string;            
}

export default function HeaderButton({
  icon,
  onPress,
  color = "white",
  size = 24,
  backgroundColor = "#2F32CD",
}: HeaderButtonProps) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.button, { backgroundColor }]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
    marginRight: 15,
  },
});