import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function TutorialScreen() {

  const robbyImage = require("../../assets/images/robby.png");

  return (
    <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          <View style={styles.logoWrapper}>
            <View style={styles.ovalBackground} />
            <Image source={robbyImage} style={styles.logo} />
          </View>

          <Text style={styles.title}>
            ¡Hola! Soy <Text style={styles.highlightText}>Robby</Text>
          </Text>

          <Text style={styles.subtitle}>
            Tu compañero en el viaje hacia descubrir tu futuro profesional
          </Text>

          <Text style={[styles.sectionTitle, styles.highlightText]}>
            Encontrarás:
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardText}>
              🎮 <Text style={styles.cardBold}>Simulaciones interactivas</Text> para explorar profesiones
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardText}>
              🗺️ <Text style={styles.cardBold}>Mapa vocacional</Text> personalizado según tus afinidades
            </Text>
          </View>

          <View style={[styles.card, { marginBottom: 30 }]}>
            <Text style={styles.cardText}>
              💬 <Text style={styles.cardBold}>Comunidad educativa</Text> para compartir experiencias
            </Text>
          </View>

          <PrimaryButton title="Explorar mi futuro" onPress={() => router.replace("/(auth)/LoginScreen")} />

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
  },
  logoWrapper: {
    width: 180,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  ovalBackground: {
    position: "absolute",
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 100,
    transform: [{ scaleX: 1.5 }],
    shadowColor: "#fff",
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    position: "absolute",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    textAlign: "center",
    fontFamily: "PoppinsBold",
    marginBottom: 10,
  },
  highlightText: {
    color: "#FEE543",
    fontFamily: "PoppinsBold",
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    marginBottom: 18,
  },
  card: {
    width: "100%",
    backgroundColor: "#ADB3FF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 16,
    color: "#130F40",
    fontFamily: "PoppinsRegular",
    textAlign: "center",
  },
  cardBold: {
    fontWeight: "bold"
  },
});