import HeaderButton from "@/app/components/ui/HeaderButton";
import { useGoals } from "@/contexts/GoalsContext";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GoalsScreen() {
  const insets = useSafeAreaInsets();
  const { goals, completeGoal } = useGoals();
  const [tab, setTab] = useState<"active" | "completed">("active");

  const filteredGoals = (goals || []).filter(
    g => (tab === "active" ? !g.is_completed : g.is_completed)
  );

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Mis Metas</Text>
            <HeaderButton
              onPress={() => router.push("../CreateGoalScreen")}
              icon="add"
              color="#fff"
              backgroundColor="#DD3282"
            />
          </View>
          <Text style={styles.headerSubtitle}>
            Define tus objetivos y alcanza tu futuro profesional
          </Text>

          <View style={styles.tabsRow}>
            <TouchableOpacity onPress={() => setTab("active")}>
              <Text
                style={[
                  styles.tabText,
                  tab === "active" && styles.tabTextActive,
                ]}
              >
                Metas activas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTab("completed")}>
              <Text
                style={[
                  styles.tabText,
                  tab === "completed" && styles.tabTextActive,
                ]}
              >
                Completadas
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
          {filteredGoals.length === 0 ? (
            <Text style={styles.emptyText}>
              {tab === "active"
                ? "No tienes metas activas."
                : "No has completado ninguna meta aún."}
            </Text>
          ) : (
            filteredGoals.map(goal => (
              <View
                key={goal.id}
                style={[
                  styles.goalCard,
                  goal.is_completed && styles.goalCardCompleted,
                ]}
              >
                <View style={styles.goalTextRow}>
                  <Text
                    style={[
                      styles.goalTitle,
                      goal.is_completed && styles.goalTitleCompleted,
                    ]}
                  >
                    {goal.title}
                  </Text>
                  {!goal.is_completed && (
                    <TouchableOpacity
                      onPress={() => completeGoal(goal.id)}
                      style={styles.completeButton}
                    >
                      <MaterialIcons
                        name="check-circle"
                        size={24}
                        color="#59B5A2"
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <Text
                  style={[
                    styles.goalDesc,
                    goal.is_completed && styles.goalDescCompleted,
                  ]}
                >
                  {goal.description}
                </Text>
                <View style={styles.dateRow}>
                  <MaterialIcons name="calendar-today" size={18} color="#444" />
                  <Text style={styles.dateText}>
                    {new Date(goal.created_at).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
        <View style={{ height: 40 }} />
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 32,
    fontFamily: "PoppinsBold",
  },
  headerSubtitle: {
    color: "#fff",
    marginTop: 6,
    fontFamily: "PoppinsRegular",
    fontSize: 16,
  },
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  tabText: {
    color: "#fff8",
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
  tabTextActive: {
    color: "#fff",
    borderBottomWidth: 2,
    borderColor: "#fff",
    paddingBottom: 4,
  },
  goalCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 20,
    elevation: 3,
    marginBottom: 15,
  },
  goalCardCompleted: {
    opacity: 0.5,
  },
  goalTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goalTitle: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
    color: "#130F40",
  },
  goalTitleCompleted: {
    textDecorationLine: "line-through",
    color: "#444",
  },
  goalDesc: {
    marginTop: 6,
    color: "#555",
    fontFamily: "PoppinsRegular",
  },
  goalDescCompleted: {
    textDecorationLine: "line-through",
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
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
    fontFamily: "PoppinsRegular",
    fontSize: 16,
  },
  completeButton: {
    padding: 4,
  },
});
