import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
    };

    load();
  }, [user]);

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Mi Perfil</Text>

            <TouchableOpacity onPress={() => router.push("/main/editProfileScreen")}>
              <MaterialIcons name="settings" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileCard}>
            <Image
              source={{ uri: profile?.avatar_url || "https://placehold.co/100x100" }}
              style={styles.avatar}
            />

            <View style={{ marginLeft: 12 }}>
              <Text style={styles.name}>{profile?.name || "Cargando..."}</Text>
              <Text style={styles.premiumTag}>Premium</Text>
              <Text style={styles.memberSince}>Miembro desde 2025</Text>
            </View>
          </View>

          <View style={styles.progressBox}>
            <Text style={styles.progressText}> Progreso al Nivel 4 </Text>
            <Text style={styles.progressBar}>230 / 300 XP</Text>
          </View>
        </LinearGradient>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <MaterialIcons name="psychology" size={40} color="#7794F5" />
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Simulaciones</Text>
          </View>

          <View style={styles.statBox}>
            <MaterialIcons name="emoji-events" size={40} color="#59B5A2" />
            <Text style={styles.statNumber}>230</Text>
            <Text style={styles.statLabel}>XP</Text>
          </View>

          <View style={styles.statBox}>
            <MaterialIcons name="local-fire-department" size={40} color="#DD3282" />
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Racha días</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Mis Afinidades</Text>

        <View style={styles.affinityCard}>
          <Text style={styles.affRow}>🔴 Salud — 75%</Text>
          <Text style={styles.affRow}>🔵 Tecnología — 35%</Text>
          <Text style={styles.affRow}>🟣 Creatividad — 54%</Text>
        </View>

        <TouchableOpacity style={styles.goalsButton}>
          <Text style={styles.goalsText}>Establecer metas</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingBottom: 60,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontFamily: "PoppinsBold",
  },
  profileCard: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  name: {
    fontSize: 22,
    color: "#fff",
    fontFamily: "PoppinsBold",
  },
  premiumTag: {
    backgroundColor: "#DD3282",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    fontSize: 12,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  memberSince: {
    color: "#fff",
    marginTop: 4,
  },
  progressBox: {
    marginTop: 18,
  },
  progressText: {
    color: "#fff",
    fontFamily: "PoppinsMedium",
  },
  progressBar: {
    color: "#fff",
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -30,
  },
  statBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 18,
    alignItems: "center",
    width: 100,
    elevation: 3,
  },
  statNumber: {
    fontSize: 22,
    fontFamily: "PoppinsBold",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#444",
  },
  sectionTitle: {
    fontSize: 24,
    marginTop: 25,
    marginLeft: 20,
    fontFamily: "PoppinsBold",
  },
  affinityCard: {
    marginHorizontal: 20,
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 18,
    marginTop: 10,
    elevation: 2,
  },
  affRow: {
    fontSize: 16,
    marginVertical: 6,
  },
  goalsButton: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#DD3282",
    padding: 15,
    borderRadius: 18,
    alignItems: "center",
  },
  goalsText: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },
});
