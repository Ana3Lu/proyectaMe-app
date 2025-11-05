import { View, StyleSheet } from "react-native";

interface ProgressBarProps {
  value: number; // 0 a 100
}

export const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${value}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    backgroundColor: "#4F46E5",
    borderRadius: 4,
  },
});
