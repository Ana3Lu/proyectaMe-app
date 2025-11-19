import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  fontSize?: number;
}

export default function PrimaryButton({ title, onPress, fontSize = 16 }: PrimaryButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={[styles.text, { fontSize }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: "#DD3282",
    shadowColor: "#DD3282",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 5,
  },
  text: {
    color: "#fff",
    fontFamily: "PoppinsBold",
  },
});
