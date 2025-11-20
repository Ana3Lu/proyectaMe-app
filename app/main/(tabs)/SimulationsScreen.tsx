import FilterChip from "@/app/components/ui/FilterChip";
import HeaderButton from "@/app/components/ui/HeaderButton";
import { SIMULATIONS } from "@/constants/simulations";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SimulationsScreen() {

  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const categories = ["Todas", "Salud", "Creatividad", "Tecnología", "Negocios", "Ciencia"];

  const filtered = selectedCategory === "Todas"
    ? SIMULATIONS
    : SIMULATIONS.filter(sim => sim.category === selectedCategory);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
          <View style={styles.headerRow}>
            <HeaderButton 
              icon="arrow-back" 
              onPress={() => router.back()}
            />

            <View style={{ flexShrink: 1 }}>
              <Text style={styles.headerTitle}>Simulaciones</Text>
              <Text style={styles.headerSubtitle}>
                Explora profesiones de forma interactiva
              </Text>
            </View>
          </View>

          {/* Filtros - Scroll Horizontal */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 18 }}
          >
            <View style={styles.filterRow}>
              {categories.map(cat => (
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


        {/* Lista de simulaciones filtradas */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 13 }}>
          {filtered.map(item => (
            <View key={item.id} style={[styles.card, { borderColor: item.color }]}>

              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={[styles.categoryTag, { backgroundColor: item.color }]}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
              </View>

              <Text style={styles.cardDesc}>{item.desc}</Text>

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
                onPress={() => router.push({
                  pathname: "../../simulations/[id]",
                  params: { id: item.id }
                })}
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
    paddingBottom: 30,
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
    flexWrap: "wrap",
    maxWidth: "85%",
  },
  filterRow: {
    flexDirection: "row",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 15,
    marginBottom: 12,
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
    maxWidth: "60%",
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
    fontSize: 14,
  },
  cardDesc: {
    marginTop: 8,
    fontFamily: "PoppinsRegular",
    color: "#130F40",
    flexWrap: "wrap",
    fontSize: 16,
  },
  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    marginBottom: 5,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 18,
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
