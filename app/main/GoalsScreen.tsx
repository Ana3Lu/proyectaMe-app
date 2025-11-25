import HeaderButton from "@/app/components/ui/HeaderButton";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import { useGoals } from "@/contexts/GoalsContext";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GoalsScreen() {
  const insets = useSafeAreaInsets();
  const { goals, completeGoal, deleteGoal } = useGoals();
  const [tab, setTab] = useState<"active" | "completed">("active");

  const filteredGoals = (goals || []).filter((g) =>
    tab === "active" ? !g.is_completed : g.is_completed
  );

  const handleDelete = (id: string) => {
    Alert.alert(
      "Eliminar meta",
      "¿Estás seguro que deseas eliminar esta meta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteGoal(id),
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: insets.top }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 180 }} // espacio para Robby
      >
        {/* HEADER */}
        <LinearGradient
          colors={["#7794F5", "#2F32CD"]}
          style={styles.header}
        >
          <View style={styles.headerRow}>
            <HeaderButton icon="arrow-back" onPress={() => router.back()} />

            <View style={{ flexShrink: 1 }}>
              <Text style={styles.headerTitle}>Mis metas</Text>
              <Text style={styles.headerSubtitle}>
                Define tus objetivos y alcanza tu futuro profesional
              </Text>
            </View>
          </View>

          {/* TABS */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tabPill,
                tab === "active" && styles.tabPillActive,
              ]}
              onPress={() => setTab("active")}
            >
              <Text
                style={[
                  styles.tabPillText,
                  tab === "active" && styles.tabPillTextActive,
                ]}
              >
                Metas activas
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabPill,
                tab === "completed" && styles.tabPillActive,
              ]}
              onPress={() => setTab("completed")}
            >
              <Text
                style={[
                  styles.tabPillText,
                  tab === "completed" && styles.tabPillTextActive,
                ]}
              >
                Completadas
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* BOTÓN NUEVA META usando PrimaryButton */}
        <View style={{ marginHorizontal: 20, marginTop: 18 }}>
          <PrimaryButton
            title="Nueva meta"
            onPress={() => router.push("/main/CreateGoalScreen")}
            fontSize={17}
          />
        </View>

        {/* LISTA */}
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          {filteredGoals.length === 0 ? (
            <Text style={styles.emptyText}>
              {tab === "active"
                ? "No tienes metas activas."
                : "No has completado ninguna meta aún."}
            </Text>
          ) : (
            filteredGoals.map((goal) => (
              <View
                key={goal.id}
                style={[
                  styles.goalCard,
                  goal.is_completed && { opacity: 0.55 },
                ]}
              >
                {/* TITULO + ICONOS */}
                <View style={styles.goalTextRow}>
                  <Text
                    style={[
                      styles.goalTitle,
                      goal.is_completed && styles.goalCompleted,
                    ]}
                  >
                    {goal.title}
                  </Text>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {!goal.is_completed && (
                      <TouchableOpacity
                        onPress={() => completeGoal(goal.id)}
                        style={styles.iconButton}
                      >
                        <MaterialIcons
                          name="check-circle"
                          size={26}
                          color="#59B5A2"
                        />
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      onPress={() => handleDelete(goal.id)}
                      style={styles.iconButton}
                    >
                      <MaterialIcons
                        name="delete"
                        size={24}
                        color="#DD3282"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* DESCRIPCIÓN */}
                <Text
                  style={[
                    styles.goalDesc,
                    goal.is_completed && styles.goalCompleted,
                  ]}
                >
                  {goal.description}
                </Text>

                {/* FECHA */}
                <View style={styles.dateRow}>
                  <MaterialIcons
                    name="calendar-today"
                    size={18}
                    color="#130F40"
                  />
                  <Text style={styles.dateText}>
                    {goal.due_date
                      ? new Date(goal.due_date).toLocaleDateString()
                      : new Date(goal.created_at).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* ROBBY — centrado y sobresaliente */}
        <View style={styles.robbyWrapper}>
          <Image
            source={require("../../assets/images/robby.png")}
            style={styles.robbyImage}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingTop: 45,
    paddingBottom: 35,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: {
    fontSize: 32,
    color: "#fff",
    fontFamily: "PoppinsBold",
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.9,
    color: "#fff",
    fontFamily: "PoppinsRegular",
    marginTop: 4,
  },

  tabsContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  tabPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: "center",
  },
  tabPillActive: {
    backgroundColor: "#DD3282",
  },
  tabPillText: {
    fontFamily: "PoppinsRegular",
    fontSize: 15,
    color: "#130F40AA",
  },
  tabPillTextActive: {
    color: "#fff",
    fontFamily: "PoppinsSemiBold",
  },

  goalCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "#eee",
  },
  goalTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goalTitle: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 17,
    color: "#130F40",
    flex: 1,
    flexWrap: "wrap",
    marginRight: 10,
  },
  goalDesc: {
    marginTop: 8,
    color: "#130F40",
    opacity: 0.8,
    fontFamily: "PoppinsRegular",
    fontSize: 15,
  },
  goalCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
  },
  dateText: {
    color: "#130F40",
    fontFamily: "PoppinsRegular",
  },

  iconButton: {
    padding: 6,
    marginLeft: 4,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
    fontFamily: "PoppinsRegular",
    fontSize: 16,
  },

  robbyWrapper: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  robbyImage: {
    width: 340,
    height: 340,
  },
});
