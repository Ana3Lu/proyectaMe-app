import MapNode from "@/app/components/ui/MapNode";
import { ALL_PROFESSIONS } from "@/constants/allProfessions";
import { useVocational } from "@/contexts/VocationalContext";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const { careers, completedSimulations } = useVocational();
  const [expanded, setExpanded] = useState(false);

  const available = careers; // simulaciones existentes
  const completed = completedSimulations.length;
  const totalUniverse = ALL_PROFESSIONS.length;

  const { userLevel } = useVocational();

const UNLOCK_BY_LEVEL = {
  1: 3,
  2: 5,
  3: 9,
  4: 14
};

const orderedUniverse = [...ALL_PROFESSIONS];

const maxUnlocked = UNLOCK_BY_LEVEL[userLevel] ?? 3;

const futureLocked = orderedUniverse
  .map((name, index) => {
    const requiredLevel = index + 1 <= maxUnlocked ? 1 : 99;

    return {
      id: `future-${name}`,
      name,
      affinity: 0,
      category: "Futuro",
      futureLocked: userLevel < requiredLevel,
      requiredLevel
    };
  })
  .filter(p => !available.some(c => c.name === p.name));

  const fullNodes = [
    ...available.map(c => ({
      ...c,
      futureLocked: false,
    })),
    ...futureLocked,
  ];

  // ordenar nodos
  const sortedNodes = [...fullNodes].sort((a, b) => {
    const aCompleted = completedSimulations.includes(a.id);
    const bCompleted = completedSimulations.includes(b.id);

    if (a.futureLocked !== b.futureLocked)
      return a.futureLocked ? 1 : -1;

    if (aCompleted !== bCompleted)
      return aCompleted ? -1 : 1;

    return b.affinity - a.affinity;
  });

  const nodes = expanded ? sortedNodes : sortedNodes.slice(0, 9);

  // niveles adaptativos
  const MAP_LEVEL_HEIGHT = 140;
  const MAP_TOP_OFFSET = 40;

  function generateAdaptiveLevels<T>(nodes: T[]): T[][] {
    const sorted = [...nodes];
    const levels: T[][] = [];

    let index = 0;
    let levelSize = 1;

    while (index < sorted.length) {
      levels.push(sorted.slice(index, index + levelSize));
      index += levelSize;
      if (levelSize < 3) levelSize++;
    }

    return levels;
  }

  const levels = generateAdaptiveLevels(nodes);
  const dynamicHeight =
    levels.length * MAP_LEVEL_HEIGHT + MAP_TOP_OFFSET + 20;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
          <Text style={styles.title}>Mapa vocacional</Text>
          <Text style={styles.subtitle}>Explora tu universo de carreras</Text>

          <View style={styles.statsBlock}>
            <View style={styles.statsInner}>

              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{available.length}</Text>
                <Text style={[styles.statLabel, { color: "#59B5A2" }]}>
                  Disponibles
                </Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{completed}</Text>
                <Text style={[styles.statLabel, { color: "#7794F5" }]}>
                  Completadas
                </Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{totalUniverse}</Text>
                <Text style={[styles.statLabel, { color: "#2F32CD" }]}>
                  Total
                </Text>
              </View>

            </View>
          </View>
        </LinearGradient>

        {/* Botón expandir */}
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={styles.expandBtn}
        >
          <MaterialIcons
            name={expanded ? "expand-less" : "expand-more"}
            size={24}
            color="#2F32CD"
          />
          <Text style={styles.expandText}>
            {expanded ? "Ver menos" : "Expandir"}
          </Text>
        </TouchableOpacity>

        {/* Mapa */}
        <View
          style={[
            styles.mapBox,
            { height: expanded ? dynamicHeight : 450 },
          ]}
        >
          {levels.map((level, levelIndex) => (
            <View
              key={`level-${levelIndex}`}
              style={{
                position: "absolute",
                top: levelIndex * MAP_LEVEL_HEIGHT + MAP_TOP_OFFSET,
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                gap: 15,
              }}
            >
              {level.map(node => (
                <MapNode
                  key={node.id}
                  node={node}
                  categoryColor={categoryColor}
                  futureLocked={node.futureLocked}
                />
              ))}
            </View>
          ))}
        </View>

        {/* Leyenda de categorías */}
        <View style={styles.legendBox}>
          <Text style={styles.legendTitle}>Categorías</Text>

          {[
            { name: "Salud", colors: ["#FF7AA5", "#DD3279"] as const },
            { name: "Creatividad", colors: ["#B56CFF", "#6E2BD9"] as const },
            { name: "Tecnología", colors: ["#68D4FF", "#1D8FE3"] as const },
            { name: "Negocios", colors: ["#FFC46E", "#D99300"] as const },
            { name: "Ciencia", colors: ["#7AD97A", "#2E8A2E"] as const },
            { name: "Futuro (Proximamente)", colors: ["#D1D1D1", "#A0A0A0"] as const },
          ].map(item => (
            <View key={item.name} style={styles.legendRow}>
              <LinearGradient colors={item.colors as [string, string]} style={styles.legendDot} />
              <Text style={styles.legendLabel}>{item.name}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

// Paletas de colores
const categoryColor = (cat: string): readonly [string, string] => {
  if (cat === "Futuro") return ["#D1D1D1", "#A0A0A0"];
  switch (cat) {
    case "Salud": return ["#FF7AA5", "#DD3279"];
    case "Creatividad": return ["#B56CFF", "#6E2BD9"];
    case "Tecnología": return ["#68D4FF", "#1D8FE3"];
    case "Negocios": return ["#FFC46E", "#D99300"];
    case "Ciencia": return ["#7AD97A", "#2E8A2E"];
    default: return ["#D1D1D1", "#A0A0A0"];
  }
};

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingBottom: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontFamily: "PoppinsBold",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "PoppinsRegular",
    marginTop: 4,
  },
  statsBlock: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 12,
  },
  statsInner: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  statNumber: {
    fontSize: 28,
    fontFamily: "PoppinsBold",
    color: "#130F40",
  },
  statLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expandBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  expandText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#2F32CD",
    fontFamily: "PoppinsMedium",
    textDecorationLine: "underline",
  },
  mapBox: {
    marginTop: 10,
    backgroundColor: "#F4F4F4",
    marginHorizontal: 20,
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
    elevation: 5,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    marginBottom: 40,
  },
  legendBox: {
    marginHorizontal: 20,
    marginBottom: 40,
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 4,
  },
  legendTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
    marginBottom: 12,
    color: "#130F40",
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  legendDot: {
    width: 22,
    height: 22,
    borderRadius: 20,
    marginRight: 10,
  },
  legendLabel: {
    fontFamily: "PoppinsMedium",
    fontSize: 15,
    color: "#130F40",
  },
});
