import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SecondaryButtonProps {
  title: string;
  onPress?: () => void;
  fontSize?: number;
  disabled?: boolean;
}

export default function SecondaryButton({ title, onPress, fontSize = 16, disabled }: SecondaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={disabled ? undefined : onPress}
    >
      <Text style={[styles.text, { fontSize }, disabled && styles.disabledText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#130F40",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "PoppinsBold",
    color: "#130F40",
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: "#E0E0E0",
    borderColor: "#A0A0A0",
  },
  disabledText: {
    color: "#A0A0A0",
  },
});