import HeaderButton from "@/app/components/ui/HeaderButton";
import PostCard from "@/app/components/ui/PostCard";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import { ProgressBar } from "@/app/components/ui/ProgressBar";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();

  // Función para manejar likes
  const handleToggleLike = (postId, liked) => {
    console.log("Toggle like:", { postId, liked });
    // Aquí puedes guardar en Supabase si después lo quieres
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <LinearGradient
          colors={["#7794F5", "#2F32CD"]}
          style={styles.header}
        >
          <View style={styles.headerRow}>
            <HeaderButton 
              icon="arrow-back" 
              onPress={() => router.back()}
            />

            <View style={{ flexShrink: 1 }}>
              <Text style={styles.headerTitle}>Comunidad</Text>
              <Text style={styles.headerSubtitle}>
                Comparte tu experiencia y aprende de otros
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Reto semanal */}
        <View style={styles.weeklyCard}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.trophyCircle}>
              <MaterialIcons name="emoji-events" size={32} color="#130F40" />
            </View>
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.weeklyTitle}>Reto Semanal</Text>
              <Text style={styles.weeklyDesc}>Completa 3 simulaciones esta semana</Text>
            </View>
          </View>

          <View style={styles.progressRow}>
            <ProgressBar value={66} />
            <Text style={styles.progressText}>2/3</Text>
          </View>
        </View>

        {/* Botones principales */}
        <View style={styles.buttonRow}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <PrimaryButton title="Nueva reflexión" onPress={() => {}} />
          </View>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Ver retos</Text>
          </TouchableOpacity>
        </View>

        {/* Publicaciones */}
        <Text style={styles.sectionTitle}>Publicaciones</Text>

        <PostCard
          postId={1}
          onToggleLike={handleToggleLike}
          userName="Juliana Martínez"
          time="Hace 23 minutos"
          text="Reflexión del día: no hay que tener miedo a explorar diferentes áreas. Empecé con Arte y ahora también me interesa UX Design. ¡Todo se conecta! ✨"
          likes={36}
          comments={15}
          avatar={require("../../../assets/images/robby.png")}
        />

        <PostCard
          postId={2}
          onToggleLike={handleToggleLike}
          userName="Santiago López"
          time="Hace 1 hora"
          text="Mi primera simulación fue increíble, nunca pensé que conectaría con ingeniería ambiental 🌱."
          likes={14}
          comments={3}
          avatar={require("../../../assets/images/robby.png")}
        />

        <View style={{ height: 40 }} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingBottom: 40,
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
    color: "#fff",
    marginTop: 5,
    fontFamily: "PoppinsRegular",
    fontSize: 18,
    maxWidth: 260,
  },
  weeklyCard: {
    backgroundColor: "#D9D7FF",
    marginHorizontal: 25,
    marginTop: -25,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { height: 4, width: 0 },
    elevation: 5,
  },
  trophyCircle: {
    width: 55,
    height: 55,
    borderRadius: 20,
    backgroundColor: "#BEBBFF",
    justifyContent: "center",
    alignItems: "center",
  },
  weeklyTitle: {
    fontFamily: "PoppinsBold",
    color: "#130F40",
    fontSize: 18,
  },
  weeklyDesc: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    color: "#130F40",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  progressText: {
    marginLeft: 10,
    fontFamily: "PoppinsBold",
    fontSize: 16,
    color: "#130F40",
  },
  buttonRow: {
    flexDirection: "row",
    paddingHorizontal: 25,
    marginTop: 20,
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#130F40",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontFamily: "PoppinsBold",
    color: "#130F40",
    fontSize: 16,
  },
  sectionTitle: {
    paddingHorizontal: 25,
    marginTop: 25,
    fontSize: 26,
    fontFamily: "PoppinsBold",
    color: "#130F40",
  },
});
