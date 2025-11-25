import FilterChip from "@/app/components/ui/FilterChip";
import HeaderButton from "@/app/components/ui/HeaderButton";
import { AuthContext } from "@/contexts/AuthContext";

import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CommunityChallengesScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);
  const isPremium = user?.plan_type === "premium";

  const categories = ["Todos", "Semanal", "Creatividad", "Vocacional", "IA", "Comunidad"];
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  // Lista de retos ficticia (luego la puedes conectar a Supabase)
  const ALL_CHALLENGES = [
    {
      id: "1",
      title: "Semana de la Innovación",
      desc: "Resuelve un problema cotidiano usando creatividad.",
      category: "Creatividad",
      color: "#FF7A90",
      participants: "356 participantes",
      difficulty: "⭐ ⭐",
    },
    {
      id: "2",
      title: "Reto Vocacional: Explora tu futuro",
      desc: "Elige una profesión y crea un mini-plan de 24 horas.",
      category: "Vocacional",
      color: "#4FB3BF",
      participants: "290 participantes",
      difficulty: "⭐ ⭐ ⭐",
    },
    {
      id: "3",
      title: "Misión IA: Crea tu asistente",
      desc: "Usa IA para resolver un reto diario.",
      category: "IA",
      color: "#8C7BFF",
      participants: "448 participantes",
      difficulty: "⭐ ⭐ ⭐ ⭐",
    },
    {
      id: "4",
      title: "Reto Semanal",
      desc: "Completa 3 simulaciones antes del domingo.",
      category: "Semanal",
      color: "#FFC847",
      participants: "501 participantes",
      difficulty: "⭐ ⭐",
    },
  ];

  const filtered =
    selectedCategory === "Todos"
      ? ALL_CHALLENGES
      : ALL_CHALLENGES.filter((r) => r.category === selectedCategory);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: insets.top }}>
      {/* HEADER */}
      <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
        <View style={styles.headerRow}>
          <HeaderButton icon="arrow-back" onPress={() => router.back()} />

          <View style={{ flexShrink: 1 }}>
            <Text style={styles.headerTitle}>Retos</Text>
            <Text style={styles.headerSubtitle}>
              Participa en misiones vocacionales y desafíos de la comunidad
            </Text>
          </View>
        </View>

        {/* Filtros */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 18 }}>
          <View style={styles.filterRow}>
            {categories.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                active={selectedCategory === cat}
                onPress={() => setSelectedCategory(cat)}
              />
            ))}
          </View>
        </ScrollView>
      </LinearGradient>

      {/* CONTENIDO */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>

          {!isPremium && (
            <View style={styles.freeMessageContainer}>
              <Text style={styles.freeMessageText}>
                Con Premium puedes participar en retos y obtener retroalimentación avanzada 🤖✨
              </Text>
            </View>
          )}

          {filtered.map((item) => (
            <View key={item.id} style={[styles.card, { borderColor: item.color }]}>
              {/* Header */}
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>{item.title}</Text>

                <View style={[styles.categoryTag, { backgroundColor: item.color }]}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
              </View>

              <Text style={styles.cardDesc}>{item.desc}</Text>

              {/* Info */}
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <FontAwesome5 name="users" size={15} color="#130F40" />
                  <Text style={styles.infoText}>{item.participants}</Text>
                </View>

                <View style={styles.infoItem}>
                  <MaterialIcons name="local-fire-department" size={18} color="#FF5733" />
                  <Text style={styles.infoText}>{item.difficulty}</Text>
                </View>
              </View>

              {/* Botón */}
              <TouchableOpacity
                disabled={!isPremium}
                style={[
                  styles.startButton,
                  { opacity: isPremium ? 1 : 0.5 },
                ]}
              >
                <Text style={styles.startButtonText}>
                  {isPremium ? "Participar" : "Premium requerido"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingTop: 45,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    fontFamily: "PoppinsRegular",
    maxWidth: "85%",
  },
  filterRow: {
    flexDirection: "row",
  },
  freeMessageContainer: {
    backgroundColor: "#FFF4E5",
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
  },
  freeMessageText: {
    fontFamily: "PoppinsBold",
    color: "#FF8A00",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 17,
    marginBottom: 15,
    borderWidth: 2,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
    color: "#130F40",
    maxWidth: "65%",
  },
  categoryTag: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    justifyContent: "center",  
    alignItems: "center", 
  },
  categoryText: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 14,
  },
  cardDesc: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    color: "#130F40",
  },
  infoRow: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 5,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  infoText: {
    marginLeft: 6,
    color: "#130F40",
    fontFamily: "PoppinsRegular",
  },
  startButton: {
    alignSelf: "flex-end",
    backgroundColor: "#2F32CD",
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 20,
    marginTop: 10,
  },
  startButtonText: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 14,
  },
});
