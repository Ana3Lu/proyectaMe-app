import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

export default function MapNode({ node, categoryColor }: any) {
  const colors = node.unlocked
    ? categoryColor(node.category)
    : ["#D9D9D9", "#A6A6A6"];

  return (
    <View style={{ alignItems: "center" }}>
      {/* Glow */}
      {node.unlocked && (
        <LinearGradient colors={colors} style={styles.glow} />
      )}

      {/* Circle */}
      <LinearGradient colors={colors} style={styles.nodeCircle}>
        {node.unlocked ? (
          <>
            <Text style={styles.star}>✨</Text>
            <Text style={styles.affinity}>{node.affinity}%</Text>
          </>
        ) : (
          <MaterialIcons name="lock" size={28} color="#555" />
        )}
      </LinearGradient>

      {/* Label */}
      <Text
        style={[
          styles.nodeLabel,
          { backgroundColor: categoryColor(node.category)[1] },
        ]}
      >
        {node.name}
      </Text>
    </View>
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
    fontSize: 14,
  },
  nodeLabel: {
    marginTop: -10,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
    maxWidth: 100,
    lineHeight: 16,
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
});