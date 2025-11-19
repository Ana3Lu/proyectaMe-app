import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function SimulacionesScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>

            <View style={{ flexShrink: 1 }}>
              <Text style={styles.headerTitle}>Simulaciones</Text>
              <Text style={styles.headerSubtitle}>
                Explora profesiones de forma interactiva
              </Text>
            </View>
          </View>

          {/* FILTROS - SCROLL HORIZONTAL */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 18 }}
          >
            <View style={styles.filterRow}>
              <Text style={[styles.filterChip, styles.filterChipActive]}>Todas</Text>
              <Text style={styles.filterChip}>Salud</Text>
              <Text style={styles.filterChip}>Creatividad</Text>
              <Text style={styles.filterChip}>Tecnología</Text>
              <Text style={styles.filterChip}>Negocios</Text>
              <Text style={styles.filterChip}>Ciencia</Text>
            </View>
          </ScrollView>
        </LinearGradient>


        {/* --- LISTA DE SIMULACIONES --- */}
        <View style={{ padding: 20 }}>

          {/* CARD TEMPLATE (Se repite) */}
          {[
            {
              title: "Día como Médico",
              desc: "Experimenta las decisiones diarias de un profesional de la salud en urgencias",
              color: "#6FD8C6",
              category: "Salud",
              time: "5–7 min",
              users: "2.341",
              stars: "4.2",
            },
            {
              title: "Laboratorio de Investigación",
              desc: "Descubre el mundo de la investigación médica y científica",
              color: "#6FD8C6",
              category: "Salud",
              time: "6–8 min",
              users: "1.586",
              stars: "4.6",
            },
            {
              title: "Estudio de Diseño",
              desc: "Crea un proyecto visual desde el concepto hasta la ejecución",
              color: "#8FB7FF",
              category: "Creatividad",
              time: "7–9 min",
              users: "3.798",
              stars: "4.9",
            },
            {
              title: "Producción musical",
              desc: "Explora el proceso creativo de producir una canción",
              color: "#8FB7FF",
              category: "Creatividad",
              time: "6–8 min",
              users: "1.020",
              stars: "4.7",
            },
          ].map((item, idx) => (
            <View key={idx} style={[styles.card, { borderColor: item.color }]}>

              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>{item.title}</Text>

                <View style={[styles.categoryTag, { backgroundColor: item.color }]}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
              </View>

              <Text style={styles.cardDesc}>{item.desc}</Text>

              {/* INFO WRAPS ON SMALL SCREENS */}
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <MaterialIcons name="access-time" size={18} color="#130F40" />
                  <Text style={styles.infoText}>{item.time}</Text>
                </View>

                <View style={styles.infoItem}>
                  <FontAwesome5 name="user-friends" size={15} color="#130F40" />
                  <Text style={styles.infoText}>{item.users}</Text>
                </View>

                <View style={styles.infoItem}>
                  <MaterialIcons name="star" size={18} color="#FFD700" />
                  <Text style={styles.infoText}>{item.stars}</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.startButton}
                onPress={() => router.push("/components/screens/SimulationScreen")}
              >
                <Text style={styles.startButtonText}>Comenzar</Text>
              </TouchableOpacity>
            </View>
          ))}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingTop: 45,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    color: "#fff",
    fontFamily: "PoppinsBold",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
    marginTop: 4,
    fontFamily: "PoppinsRegular",
    flexWrap: "wrap",
    maxWidth: "85%",
  },

  /* SCROLL HORIZONTAL */
  filterRow: {
    flexDirection: "row",
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    marginRight: 10,
    color: "#fff",
    fontFamily: "PoppinsRegular",
  },
  filterChipActive: {
    backgroundColor: "#fff",
    color: "#2F32CD",
    fontFamily: "PoppinsBold",
  },

  /* CARDS */
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 2,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    color: "#130F40",
    flexShrink: 1,
    maxWidth: "70%",
    flexWrap: "wrap",
  },
  categoryTag: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  categoryText: {
    fontFamily: "PoppinsBold",
    color: "#fff",
    fontSize: 13,
  },
  cardDesc: {
    marginTop: 8,
    fontFamily: "PoppinsRegular",
    color: "#130F40",
    flexWrap: "wrap",
  },

  /* INFO ROW WRAPS */
  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 18,
    marginBottom: 6,
  },
  infoText: {
    marginLeft: 6,
    color: "#130F40",
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },

  startButton: {
    alignSelf: "flex-end",
    backgroundColor: "#DD3282",
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 20,
    marginTop: 5,
  },
  startButtonText: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 14,
  },
});
