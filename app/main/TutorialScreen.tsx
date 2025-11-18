import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";

export default function TutorialScreen() {

  const robbyImage = require("../../assets/images/robby-character.png");

  return (
    <LinearGradient
      colors={["#7794F5", "#2F32CD"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View style={styles.contentArea}>

        {/* Wrapper del ovalo y logo */}
        <View style={styles.logoWrapper}>
          <View style={styles.ovalBackground} />
          <Image source={robbyImage} style={styles.logo} />
        </View>

        {/* Título */}
        <Text style={styles.title}>
          ¡Hola! Soy <Text style={styles.highlightText}>Robby</Text>
        </Text>

        {/* Subtítulos */}
        <Text style={styles.subtitle}>
          Tu compañero en el viaje hacia descubrir tu futuro profesional
        </Text>

        <Text style={[styles.sectionTitle, styles.highlightText]}>
          Encontrarás:
        </Text>

        {/* Tarjetas */}
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

        <View style={styles.card}>
          <Text style={styles.cardText}>
            💬 <Text style={styles.cardBold}>Comunidad educativa</Text> para compartir experiencias
          </Text>
        </View>

        {/* Botón */}
        <View style={styles.primaryButton} onTouchEnd={() => router.replace("/(auth)/LoginScreen")}>
          <Text style={styles.buttonText}>Explorar mi futuro</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentArea: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  logoWrapper: {
    width: 200,
    height: 140,   
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  ovalBackground: {
    position: 'absolute',
    width: 110,
    height: 110,
    backgroundColor: 'white',
    borderRadius: 100,
    transform: [{ scaleX: 1.6 }],
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    position: 'absolute',
    marginBottom: 25,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
    marginBottom: 10,
  },
  highlightText: {
    color: "#FEE543",
    fontFamily: 'PoppinsBold',
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: 'PoppinsBold',
    marginBottom: 12,
  },
  card: {
    width: "90%",
    backgroundColor: "#9DA5FF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: "#1A1A1A",
    fontFamily: "PoppinsRegular",
    textAlign: "center",
  },
  cardBold: {
    fontWeight: "bold"
  },
  primaryButton: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: "#DD3282",
    shadowColor: '#DD3282',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 12,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "PoppinsBold",
  },
});
