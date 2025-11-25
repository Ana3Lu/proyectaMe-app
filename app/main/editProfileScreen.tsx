import HeaderButton from "@/app/components/ui/HeaderButton";
import { ProgressBar } from "@/app/components/ui/ProgressBar";
import { AuthContext } from "@/contexts/AuthContext";
import { useVocational } from "@/contexts/VocationalContext";
import { supabase } from "@/utils/supabase";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useCallback, useContext, useState } from "react";
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
  const { user, getStreak } = useContext(AuthContext);
  const { userLevel, levelUp, stats } = useVocational();
  const [profile, setProfile] = useState<any>(null);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  const [userAffinities, setUserAffinities] = useState<{ affinity: string }[]>([]);
  const [strengths, setStrengths] = useState<{ skill: string; score: number }[]>([]);
  const [simCount, setSimCount] = useState(0);

  const LEVEL_XP = [0, 100, 200, 300, 500]; // XP requerido para cada nivel

  // Cargar perfil y stats
  const loadProfile = useCallback(async () => {
    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
    setXp(data?.points ?? 0);

    const { count: sims } = await supabase
      .from("completed_simulations")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    setSimCount(sims ?? 0);

    const streakData = await getStreak();
    if (streakData) setStreak(streakData.current_streak);
  }, [user, getStreak]);

  // Cargar afinidades y fortalezas
  const loadAffinitiesAndStrengths = useCallback(async () => {
    if (!user) return;

    const { data: affinitiesData } = await supabase
      .from("user_affinities")
      .select("*")
      .eq("user_id", user.id);

    setUserAffinities(affinitiesData || []);

    const { data: lastSimulation } = await supabase
      .from("simulations_results")
      .select("skills")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (lastSimulation?.skills) {
      const strongSkills = Object.entries(lastSimulation.skills)
        .filter(([_, score]) => typeof score === "number" && score >= 70)
        .map(([skill, score]) => ({ skill, score: score as number }));
      setStrengths(strongSkills);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
      loadAffinitiesAndStrengths();
    }, [loadProfile, loadAffinitiesAndStrengths])
  );

  // Calcular nivel actual y progreso
  const currentLevel = LEVEL_XP.findIndex(x => xp < x);
  const prevLevelXP = LEVEL_XP[currentLevel - 1] ?? 0;
  const nextLevelXP = LEVEL_XP[currentLevel] ?? LEVEL_XP[LEVEL_XP.length - 1];
  const progressPercent = ((xp - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100;

  const categoryColor = (cat: string) => {
    switch(cat) {
      case "Salud": return "#FF7AA5";
      case "Creatividad": return "#B56CFF";
      case "Tecnología": return "#68D4FF";
      case "Negocios": return "#FFC46E";
      case "Ciencia": return "#7AD97A";
      default: return "#D1D1D1";
    }
  };

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
            <HeaderButton
              onPress={() => router.push("/main/EditProfileScreen")}
              icon="settings"
              color="#fff"
              backgroundColor="#7794F5"
            />
          </View>

          {/* CARD DEL PERFIL */}
          <View style={styles.profileCard}>
            <View style={styles.profileRow}>
              <Image
                source={{ uri: profile?.avatar_url || "https://placehold.co/100x100" }}
                style={styles.avatar}
              />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={styles.name}>{profile?.name || "Cargando..."}</Text>
                  <TouchableOpacity
                    style={styles.premiumTag}
                    onPress={() => router.push("/main/PremiumInfoScreen")}
                  >
                    <MaterialIcons name="star" size={16} color="#fff" />
                    <Text style={styles.premiumText}>Premium</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.memberSince}>Miembro desde {memberSinceYear}</Text>
                <Text style={styles.bio}>{profile?.bio || "Sin biografía"}</Text>
                <Text style={styles.levelText}>Nivel {currentLevel}</Text>
              </View>
            </View>

            {/* PROGRESO */}
            <View style={styles.progressBox}>
              <View style={styles.progressRow}>
                <Text style={styles.progressText}>Progreso al Nivel {currentLevel + 1}</Text>
                <Text style={styles.progressDetail}>{xp} / {nextLevelXP} XP</Text>
              </View>
              <ProgressBar value={progressPercent} />
            </View>
          </View>
        </LinearGradient>

        {/* ESTADÍSTICAS */}
        <View style={styles.statsBlock}>
          <View style={styles.statsInner}>
            <View style={styles.statItem}>
              <FontAwesome5 name="brain" size={40} color="#7794F5" />
              <Text style={styles.statNumber}>{simCount}</Text>
              <Text style={[styles.statLabel, { color: "#7794F5" }]}>Simulaciones</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="emoji-events" size={48} color="#59B5A2" />
              <Text style={styles.statNumber}>{xp}</Text>
              <Text style={[styles.statLabel, { color: "#59B5A2" }]}>XP</Text>
            </View>
            <View style={styles.statItem}>
              <Feather name="trending-up" size={45} color="#C89E00" />
              <Text style={styles.statNumber}>{streak}</Text>
              <Text style={[styles.statLabel, { color: "#C89E00" }]}>Racha</Text>
            </View>
          </View>
        </View>

        {/* AFINIDADES */}
        <Text style={styles.sectionTitle}>Mis Afinidades</Text>
        <View style={styles.card}>
          {userAffinities.length > 0 ? (
            userAffinities.map((a, index) => (
              <Text key={index} style={[styles.affRow, { color: categoryColor(a.affinity) }]}>
                {a.affinity}
              </Text>
            ))
          ) : (
            <Text style={styles.affRow}>No hay afinidades registradas</Text>
          )}
        </View>

        {/* FORTALEZAS */}
        {strengths.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Fortalezas</Text>
            <View style={styles.card}>
              {strengths.map((s, index) => (
                <Text key={index} style={styles.affRow}>
                  {s.skill} — {s.score}%
                </Text>
              ))}
            </View>
          </>
        )}

        {/* BOTÓN GOALS */}
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
  header: { paddingTop: 25, paddingHorizontal: 25, paddingBottom: 15, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { color: "#fff", fontSize: 32, fontFamily: "PoppinsBold" },
  profileCard: { backgroundColor: "#fff", padding: 20, borderRadius: 20, elevation: 3, borderWidth: 1, borderColor: "#eee" },
  profileRow: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 90, height: 90, borderRadius: 50, borderWidth: 3, borderColor: "#7794F5" },
  name: { fontSize: 22, fontFamily: "PoppinsBold" },
  premiumTag: { flexDirection: "row", backgroundColor: "#DD3282", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, alignItems: "center" },
  premiumText: { color: "#fff", marginLeft: 4, fontSize: 12, fontFamily: "PoppinsBold" },
  memberSince: { marginTop: 4, color: "#555" },
  bio: { marginTop: 4, color: "#333" },
  levelText: { marginTop: 6, fontSize: 16, fontFamily: "PoppinsBold", color: "#2F32CD" },
  progressBox: { marginTop: 20 },
  progressRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  progressText: { fontFamily: "PoppinsMedium", fontSize: 16 },
  progressDetail: { fontFamily: "PoppinsMedium", fontSize: 16 },
  statsBlock: { marginTop: 10, flexDirection: "row", justifyContent: "center" },
  statsInner: { backgroundColor: "#fff", borderRadius: 20, borderWidth: 1, borderColor: "#D9D9D9", padding: 15, flexDirection: "row", justifyContent: "space-around", marginHorizontal: 20, marginBottom: 10, alignItems: "center" },
  statItem: { alignItems: "center", flexDirection: "column", marginHorizontal: 10 },
  statNumber: { fontSize: 28, fontFamily: "PoppinsBold", marginTop: 6 },
  statLabel: { fontSize: 16, fontWeight: "bold", marginTop: -2 },
  sectionTitle: { paddingHorizontal: 25, marginTop: 20, marginBottom: 10, fontSize: 22, fontFamily: "PoppinsBold", color: "#130F40" },
  card: { backgroundColor: "#fff", marginHorizontal: 20, marginBottom: 10, padding: 20, borderRadius: 20, elevation: 3, borderWidth: 1, borderColor: "#eee" },
  affRow: { fontSize: 16, marginVertical: 4 },
  goalsButton: { marginHorizontal: 20, marginTop: 20, padding: 15, backgroundColor: "#DD3282", borderRadius: 20, alignItems: "center" },
  goalsText: { color: "#fff", fontFamily: "PoppinsBold", fontSize: 18 },
});
