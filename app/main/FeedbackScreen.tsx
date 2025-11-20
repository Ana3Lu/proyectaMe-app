import { ProgressBar } from "@/app/components/ui/ProgressBar";
import { useSimulation } from "@/contexts/SimulationContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HeaderButton from "../components/ui/HeaderButton";

export default function FeedbackScreen() {
  const { summary } = useSimulation();

  if (!summary) {
    return (
      <View style={styles.centered}>
        <Text>No hay datos de simulación.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <LinearGradient
        colors={["#7794F5", "#2F32CD"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {/* Botón arriba a la izquierda */}
        <View style={styles.headerButtonContainer}>
            <HeaderButton 
            icon="arrow-back"
            onPress={() => router.push('/main/(tabs)/SimulationsScreen')}
            />
        </View>

        {/* Contenido centrado */}
        <View style={styles.headerContentCentered}>
            <Text style={styles.headerTitle}>¡Increíble!</Text>

            <View style={[styles.iconCircle, { backgroundColor: "#FEE543" }]}>
            <FontAwesome5 name="star" size={46} color="#130F40" />
            </View>

            <Text style={styles.headerSubtitle}>Has completado la simulación</Text>
        </View>
      </LinearGradient>

      {/* Card análisis */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Análisis de Robby</Text>
        <Text style={styles.cardText}>
          Basado en tus decisiones, estas son tus principales habilidades.
        </Text>
      </View>

      {/* Fortalezas */}
      <Text style={styles.sectionTitle}>Tus fortalezas</Text>

      {Object.entries(summary.skills).map(([skill, pct]) => (
        <View key={skill} style={styles.skillContainer}>
            <View style={styles.skillRow}>
            <Text style={styles.skillName}>{skill}</Text>
            <Text style={styles.skillPercent}>{pct}%</Text>
            </View>
            <ProgressBar value={pct} />
        </View>
      ))}

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerButtonContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  headerContentCentered: {
    width: "100%",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
    marginVertical: 8,
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  cardText: { color: "#555", fontSize: 14, lineHeight: 18 },
  sectionTitle: {
    marginTop: 25,
    marginLeft: 20,
    fontWeight: "700",
    fontSize: 18,
  },
  skillContainer: {
    marginTop: 16,
    marginHorizontal: 20,
    backgroundColor: "white",
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  skillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  skillName: { fontWeight: "600", fontSize: 14 },
  skillPercent: { fontWeight: "700", fontSize: 14, color: "#2F32CD" },
});