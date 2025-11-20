import PrimaryButton from "@/app/components/ui/PrimaryButton";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>      
      <ScrollView showsVerticalScrollIndicator={false}>

        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        {/* Encabezado */}
        <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
        <View style={styles.headerContent}>

            {/* Textos */}
            <View>
            <Text style={styles.headerTitle}>¡Hola,</Text>
            <Text style={styles.headerTitle}>Explorador!</Text>
            <Text style={styles.headerSubtitle}>
                Listo para descubrir más sobre ti
            </Text>
            </View>

            {/* Robby */}
            <TouchableOpacity
            style={styles.robbyWrapper}
            activeOpacity={0.8}
            onPress={() => router.push("/components/screens/ChatScreen")}
            >
            <View style={styles.robbyCircle} />

            <View style={styles.clickWrapper}>
                <Text style={styles.clickMessage}>
                ¡Hazme <Text style={{ color: "#85E0CD", fontSize: 20 }}>CLIC</Text> para hablar!
                </Text>
            </View>
                
            <Image
                source={require("../../../assets/images/robby.png")}
                style={styles.robbyImage}
            />
            </TouchableOpacity>

        </View>  
        </LinearGradient>

        {/* Bloque de estadísticas */}
        <View style={styles.statsBlock}>
          <View style={styles.statsInner}>
            
            <View style={styles.statItem}>
              <MaterialIcons name="emoji-events" size={65} color="#59B5A2" />
              <View style={styles.statTextBlock}>
                <Text style={styles.statNumber}>230</Text>
                <Text style={[styles.statLabel, { color: "#59B5A2" }]}>XP</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <FontAwesome name="bullseye" size={65} color="#7794F5" />
              <View style={styles.statTextBlock}>
                <Text style={styles.statNumber}>2</Text>
                <Text style={[styles.statLabel, { color: "#7794F5" }]}>Afinidades</Text>
              </View>
            </View>

          </View>
        </View>

        {/* Explora tu futuro */}
        <Text style={styles.sectionTitle}>Explora tu futuro</Text>

        <View style={styles.featureRow}>
          <TouchableOpacity style={[styles.featureCard, { backgroundColor: "#7ED2C4" }]} onPress={() => router.push("/main/(tabs)/SimulacionesScreen")}>
            <View style={[styles.iconCircleMini, { backgroundColor: "#59B5A2" }]}>
              <FontAwesome5 name="brain" size={25} color="#130F40" />
            </View>
            <Text style={styles.featureTitle}>Simulaciones</Text>
            <Text style={styles.featureDesc}>Experiencias interactivas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.featureCard, { backgroundColor: "#FFE45E" }]}>
            <View style={[styles.iconCircleMini, { backgroundColor: "#E8D551" }]}>
              <MaterialIcons name="map" size={30} color="#130F40" />
            </View>
            <Text style={styles.featureTitle}>Mapa Vocacional</Text>
            <Text style={styles.featureDesc}>Tu universo de carreras</Text>
          </TouchableOpacity>
        </View>

        {/* Comunidad */}
        <TouchableOpacity style={styles.communityCard}>
          <View style={[styles.iconCircleMini, { backgroundColor: "#8E9099" }]}>
            <MaterialIcons name="forum" size={30} color="#130F40" />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.communityTitle}>Comunidad</Text>
            <Text style={styles.communityDesc}>Comparte y aprende</Text>
          </View>
        </TouchableOpacity>

        {/* Recomendaciones */}
        <Text style={styles.sectionTitle}>Recomendado para ti</Text>

        <View style={styles.recommendedCard}>
          <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
            <View style={[styles.iconCircleMini, { backgroundColor: "#85E0CD" }]}>
                <FontAwesome5 name="brain" size={25} color="#130F40" />
            </View>

            <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={styles.recTitle}>Simulación: Día como Médico</Text>
                <Text style={styles.recDesc}>
                    Experimenta las decisiones de un profesional real
                </Text>
            </View>
          </View>

          {/* Botón */}
          <View style={styles.buttonRow}>
                <PrimaryButton 
                title="Probar ya"
                fontSize={14}
                onPress={() => router.push("/components/screens/SimulationScreen")}
                />
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingTop: 50,
    paddingBottom: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  robbyWrapper: {
    position: "relative",
    width: 110,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  robbyCircle: {
    width: 100,
    height: 100,
    backgroundColor: "#DD3282",
    shadowColor: "#DD3282",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 5,
    borderRadius: 999,
    position: "absolute",
  },
  robbyImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    transform: [{ rotate: "-12deg" }],
  },
  clickWrapper: {
    position: "absolute",
    top: -10,
    left: -65,
    maxWidth: 120,
  },
  clickMessage: {
    color: "#FEE543",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 16,
    flexWrap: "wrap",
  },
  statsBlock: {
    marginTop: -30,
    flexDirection: "row",
    justifyContent: "center",
  },
  statsInner: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  statTextBlock: {
    marginLeft: 8,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  statNumber: {
    fontSize: 32,
    fontFamily: "PoppinsBold",
    color: "#130F40",
    paddingTop: 4,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: -9,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  sectionTitle: {
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 28,
    fontFamily: "PoppinsBold",
    color: "#130F40",
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  featureCard: {
    width: "48%",
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  iconCircleMini: {
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  featureTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    color: "#130F40",
    textAlign: "center",
  },
  featureDesc: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    color: "#130F40",
    marginTop: 4,
    textAlign: "center",
  },
  communityCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
    marginTop: 15,
    backgroundColor: "#ACAEB5",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  communityTitle: {
    fontSize: 16,
    fontFamily: "PoppinsBold",
    color: "#130F40",
  },
  communityDesc: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
  },
  recommendedCard: {
    marginHorizontal: 25,
    backgroundColor: "#E9FFF5",
    padding: 15,
    borderRadius: 20,
    flexDirection: "column",    
    alignItems: "center",
    shadowColor: "#59B5A2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#CFF6EB",
  },
  recTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
  recDesc: {
    fontFamily: "PoppinsRegular",
    color: "#130F40",
    marginTop: 4,
    fontSize: 16,
  },
  buttonRow: {
    marginTop: 10,
    alignSelf: "flex-end",
    width: 110,
    },
});
