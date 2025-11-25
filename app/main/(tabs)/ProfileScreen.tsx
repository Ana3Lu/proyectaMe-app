import { ProgressBar } from "@/app/components/ui/ProgressBar";
import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const [profile, setProfile] = useState<any>(null);
  const [xp, setXp] = useState(0);
  const [simCount, setSimCount] = useState(0);
  const [affinityCount, setAffinityCount] = useState(0);
  const { user, getStreak } = useContext(AuthContext);
  const [streak, setStreak] = useState(0);

  const loadStats = useCallback(async () => {
    if (!user) return;

    const { data: profileData } = await supabase
      .from("profiles")
      .select("points")
      .eq("id", user.id)
      .single();

    setXp(profileData?.points ?? 0);

    const { count: sims } = await supabase
      .from("completed_simulations")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    setSimCount(sims ?? 0);

    const { count: affinities } = await supabase
      .from("user_affinities")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    setAffinityCount(affinities ?? 0);
  }, [user]);

  useEffect(() => {
    const load = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);

      loadStats();

      const streakData = await getStreak();
      if (streakData) setStreak(streakData.current_streak);
    };
    load();
  }, [user, loadStats]);

  const memberSinceYear = profile?.created_at
    ? new Date(profile.created_at).getFullYear()
    : "—";

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Mi Perfil</Text>

            <TouchableOpacity onPress={() => router.push("../EditProfileScreen")}>
              <MaterialIcons name="settings" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* CARD DEL PERFIL COMPLETA */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <Image
              source={{
                uri: profile?.avatar_url || "https://placehold.co/100x100",
              }}
              style={styles.avatar}
            />

            <View style={{ marginLeft: 12, flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>
                  {profile?.name || "Cargando..."}
                </Text>

                {/* PREMIUM */}
                <View style={styles.premiumTag}>
                  <MaterialIcons name="star" size={16} color="#fff" />
                  <Text style={styles.premiumText}>Premium</Text>
                </View>
              </View>

              <Text style={styles.memberSince}>
                Miembro desde {memberSinceYear}
              </Text>

              <Text style={styles.bio}>
                {profile?.bio || "Sin biografía"}
              </Text>
            </View>
          </View>

          {/* PROGRESS */}
          <View style={styles.progressBox}>
            <Text style={styles.progressText}>Progreso al Nivel 4</Text>
            <ProgressBar value={(xp / 300) * 100} />
            <Text style={styles.progressDetail}>{xp} / 300 XP</Text>
          </View>
        </View>

        {/* STATS CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <FontAwesome5 name="brain" size={40} color="#7794F5" />
              <Text style={styles.statNumber}>{simCount}</Text>
              <Text style={styles.statLabel}>Simulaciones</Text>
            </View>

            <View style={styles.statItem}>
              <MaterialIcons name="emoji-events" size={45} color="#59B5A2" />
              <Text style={styles.statNumber}>{xp}</Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>

            <View style={styles.statItem}>
              <Feather name="trending-up" size={45} color="#C89E00" />
              <Text style={styles.statNumber}>{streak}</Text>
              <Text style={styles.statLabel}>Racha</Text>
            </View>
          </View>
        </View>

        {/* AFINIDADES */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Mis Afinidades</Text>

          <Text style={styles.affRow}>🔴 Salud — 75%</Text>
          <Text style={styles.affRow}>🔵 Tecnología — 35%</Text>
          <Text style={styles.affRow}>🟣 Creatividad — 54%</Text>
        </View>

        {/* BOTON GOALS */}
        <TouchableOpacity
          style={styles.goalsButton}
          onPress={() => router.push("../GoalsScreen")}
        >
          <Text style={styles.goalsText}>Establecer metas</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingBottom: 30,
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

  /* CARD GENERAL */
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#eee",
  },

  /* PROFILE CARD */
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#7794F5",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontSize: 22,
    fontFamily: "PoppinsBold",
  },
  premiumTag: {
    flexDirection: "row",
    backgroundColor: "#DD3282",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignItems: "center",
  },
  premiumText: {
    color: "#fff",
    marginLeft: 4,
    fontSize: 12,
    fontFamily: "PoppinsBold",
  },
  memberSince: {
    marginTop: 4,
    color: "#555",
  },
  bio: {
    marginTop: 4,
    color: "#333",
  },

  /* PROGRESS */
  progressBox: {
    marginTop: 20,
  },
  progressText: {
    fontFamily: "PoppinsMedium",
    marginBottom: 6,
  },
  progressDetail: {
    marginTop: 4,
    color: "#333",
  },

  /* STATS */
  sectionTitle: {
    fontSize: 20,
    fontFamily: "PoppinsBold",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  statItem: {
    alignItems: "center",
    width: "33%",
  },
  statNumber: {
    fontSize: 28,
    fontFamily: "PoppinsBold",
    marginTop: 6,
  },
  statLabel: {
    fontSize: 13,
    color: "#666",
  },

  /* AFINIDADES */
  affRow: {
    fontSize: 16,
    marginVertical: 4,
  },

  /* BOTON */
  goalsButton: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    backgroundColor: "#DD3282",
    borderRadius: 20,
    alignItems: "center",
  },
  goalsText: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },
});
