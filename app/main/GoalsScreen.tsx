import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GoalsScreen() {
  const insets = useSafeAreaInsets();

  const [tab, setTab] = useState<"active" | "completed">("active");

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Mis Metas</Text>
          <Text style={styles.headerSubtitle}>
            Define tus objetivos y alcanza tu futuro profesional
          </Text>

          {/* Tabs */}
          <View style={styles.tabsRow}>
            <TouchableOpacity onPress={() => setTab("active")}>
              <Text
                style={[
                  styles.tabText,
                  tab === "active" && styles.tabTextActive,
                ]}
              >
                1{"\n"}Metas activas
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setTab("completed")}>
              <Text
                style={[
                  styles.tabText,
                  tab === "completed" && styles.tabTextActive,
                ]}
              >
                1{"\n"}Completadas
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("../CreateGoalScreen")}
        >
          <Text style={styles.addButtonText}>Nueva meta</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Metas activas</Text>

        {/* Card ejemplo */}
        <View style={styles.goalCard}>
          <Text style={styles.goalTitle}>Completar 5 simulaciones de Salud</Text>
          <Text style={styles.goalDesc}>
            Explorar diferentes áreas dentro del campo de la salud
          </Text>

          <View style={styles.dateRow}>
            <MaterialIcons name="calendar-today" size={18} color="#444" />
            <Text style={styles.dateText}>14 de noviembre de 2025</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingBottom: 40,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 32,
    fontFamily: "PoppinsBold",
    marginTop: 5,
  },
  headerSubtitle: {
    color: "#fff",
    marginTop: 4,
    fontFamily: "PoppinsRegular",
  },
  tabsRow: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
  },
  tabText: {
    color: "#fff8",
    textAlign: "center",
    fontFamily: "PoppinsMedium",
    fontSize: 16,
  },
  tabTextActive: {
    color: "#fff",
    borderBottomWidth: 2,
    borderColor: "#fff",
    paddingBottom: 4,
  },
  addButton: {
    backgroundColor: "#DD3282",
    padding: 14,
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: -20,
    zIndex: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },
  sectionTitle: {
    marginLeft: 20,
    marginTop: 25,
    fontSize: 22,
    fontFamily: "PoppinsBold",
  },
  goalCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 15,
    padding: 18,
    borderRadius: 18,
    elevation: 3,
  },
  goalTitle: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
  },
  goalDesc: {
    marginTop: 6,
    color: "#555",
  },
  dateRow: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
    gap: 6,
  },
  dateText: {
    color: "#444",
  },
});
