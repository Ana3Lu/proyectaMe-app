import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function MapNode({ node, categoryColor, onPress }: any) {
  const isFuture = node.futureLocked === true;
  const isCompleted = node.unlocked && node.affinity === 100;
  const isPlayable = !isFuture && !isCompleted;

  // Colores según estado
  const colors = isFuture
    ? ["#D9D9D9", "#A6A6A6"]
    : categoryColor(node.category);

  return (
    <TouchableOpacity
      disabled={isFuture}
      onPress={onPress}
      style={{ alignItems: "center" }}
    >
      {(isPlayable || isCompleted) && (
        <LinearGradient colors={colors} style={styles.glow} />
      )}

      <LinearGradient colors={colors} style={styles.nodeCircle}>
        {isFuture ? (
          <MaterialIcons name="lock" size={30} color="#555" />
        ) : isCompleted ? (
          <MaterialIcons name="check-circle" size={32} color="#fff" />
        ) : (
          <>
            <Text style={styles.star}>✨</Text>
            <Text style={styles.affinity}>{node.affinity}%</Text>
          </>
        )}
      </LinearGradient>

      <Text
        style={[
          styles.nodeLabel,
          {
            backgroundColor: isFuture ? "#A6A6A6" : colors[1],
          },
        ]}
      >
        {isFuture ? `${node.name} (Futuro)` : node.name}
      </Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  glow: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 50,
    opacity: 0.35,
  },
  nodeCircle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  star: {
    fontSize: 22,
    color: "#fff",
  },
  affinity: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },
  nodeLabel: {
    marginTop: -10,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    maxWidth: 100,
    lineHeight: 16,
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  futureLabel: {
    fontSize: 10,
    color: "#555",
    marginTop: 2,
    fontFamily: "PoppinsMedium",
    },
});
