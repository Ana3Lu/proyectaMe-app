import { ALL_PROFESSIONS } from "@/constants/allProfessions";
import { SIMULATIONS } from "@/constants/simulations";
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

// 🆕 Import del nuevo componente
import MapNode from "@/app/components/ui/MapNode";

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const { careers, completedSimulations } = useVocational();
  const [expanded, setExpanded] = useState(false);

  const total = ALL_PROFESSIONS.length;
  const unlocked = SIMULATIONS.length;
  const completed = Object.keys(completedSimulations).length;

  const ITEMS_PER_ROW = 3;

  const generateLevels = <T,>(items: T[]): T[][] => {
    const levels: T[][] = [];
    for (let i = 0; i < items.length; i += ITEMS_PER_ROW) {
      levels.push(items.slice(i, i + ITEMS_PER_ROW));
    }
    return levels;
  };

  const nodes = expanded ? careers : careers.slice(0, 6);
  const levels = generateLevels<typeof nodes[0]>(nodes);

  const categoryColor = (cat: string): readonly [string, string] => {
    switch (cat) {
      case "Salud":
        return ["#FF7AA5", "#DD3279"] as const;
      case "Creatividad":
        return ["#B56CFF", "#6E2BD9"] as const;
      case "Tecnología":
        return ["#68D4FF", "#1D8FE3"] as const;
      case "Negocios":
        return ["#FFC46E", "#D99300"] as const;
      case "Ciencia":
        return ["#7AD97A", "#2E8A2E"] as const;
      default:
        return ["#D1D1D1", "#A0A0A0"] as const;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
          <Text style={styles.title}>Mapa vocacional</Text>
          <Text style={styles.subtitle}>Explora tu universo de carreras</Text>

          <View style={styles.statsBlock}>
            <View style={styles.statsInner}>
              <View style={styles.statItem}>
                <View style={styles.statTextBlock}>
                  <Text style={styles.statNumber}>{unlocked}</Text>
                  <Text style={[styles.statLabel, { color: "#59B5A2" }]}>
                    Desbloqueadas
                  </Text>
                </View>
              </View>

              <View style={styles.statItem}>
                <View style={styles.statTextBlock}>
                  <Text style={styles.statNumber}>{completed}</Text>
                  <Text style={[styles.statLabel, { color: "#7794F5" }]}>
                    Completadas
                  </Text>
                </View>
              </View>

              <View style={styles.statItem}>
                <View style={styles.statTextBlock}>
                  <Text style={styles.statNumber}>{total}</Text>
                  <Text style={[styles.statLabel, { color: "#2F32CD" }]}>
                    Total
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={styles.expandBtn}
        >
          <MaterialIcons
            name={expanded ? "expand-less" : "expand-more"}
            size={24}
            color="#130F40"
          />
          <Text style={styles.expandText}>
            {expanded ? "Ver menos" : "Expandir"}
          </Text>
        </TouchableOpacity>

        {/* MAPA */}
        <View
          style={[
            styles.mapBox,
            { height: expanded ? levels.length * 180 + 100 : 400 },
          ]}
        >
          {levels.map((level, levelIndex) => (
            <View
              key={`level-${levelIndex}`}
              style={{
                position: "absolute",
                top: levelIndex * 160 + 40,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              {level.map((node) => (
                <MapNode
                  key={node.id}
                  node={node}
                  categoryColor={categoryColor}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

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
  statTextBlock: {
    alignItems: "center",
    justifyContent: "center",
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
    color: "#130F40",
    fontFamily: "PoppinsMedium",
  },
  mapBox: {
    marginTop: 10,
    backgroundColor: "#F4F4F4",
    marginHorizontal: 20,
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
  },
});
