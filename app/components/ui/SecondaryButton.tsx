import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  fontSize?: number;
}

export default function SecondaryButton({ title, onPress, fontSize = 16 }: SecondaryButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={[styles.text, { fontSize }]}>{title}</Text>
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
});
