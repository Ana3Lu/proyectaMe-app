import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function LoginScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: "#fff" }}>
        <View style={styles.container}>

          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

          {/* Título */}
          <Text style={styles.title}>
            Bienvenido a {"\n"}
            <Text style={styles.highlight}>Proyecta</Text>
            <Text style={styles.highlightPink}>Me</Text>
          </Text>

          <Text style={styles.subtitle}>
            Inicia sesión para continuar tu exploración
          </Text>

          {/* Formulario */}
          <View style={styles.formCard}>

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              placeholder="tu@email.com"
              placeholderTextColor="#A0A0A0"
              style={styles.input}
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              secureTextEntry
              placeholder="Tu contraseña"
              placeholderTextColor="#A0A0A0"
              style={styles.input}
            />

            {/* Botón Iniciar sesión */}
            <PrimaryButton 
              title="Iniciar sesión" 
              onPress={() => router.push("/main/(tabs)/HomeScreen")} 
              fontSize={16} 
            />

            {/* Enlaces */}
            <View style={styles.linksRow}>
              <TouchableOpacity>
                <Text style={styles.linkUnderlined} onPress={() => router.push("/(auth)/ResetScreen")}>¿Olvidó su contraseña?</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.linkUnderlinedBlue} onPress={() => router.push("/(auth)/RegisterScreen")}>Registrarse</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Divisor */}
          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>O CONTINÚA CON</Text>
            <View style={styles.line} />
          </View>

          {/* Botón Google */}
          <TouchableOpacity style={styles.googleButtonDark}>
            <Ionicons name="logo-google" size={22} color="#ffffff" />
            <Text style={styles.googleTextDark}>Google</Text>
          </TouchableOpacity>

          {/* Imagen */}
          <Image
            source={require("../../assets/images/oficios.png")}
            style={styles.bottomImage}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center",
    backgroundColor: "#ffffff",
    flexGrow: 1,
  },
  title: {
    fontSize: 36,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    color: "#130F40",
    marginTop: 30,
  },
  highlight: {
    color: "#2F32CD",
  },
  highlightPink: {
    color: "#DD3282",
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    color: "#444",
    textAlign: "center",
    fontFamily: "PoppinsRegular",
    marginBottom: 16,
  },
  formCard: {
    width: "100%",
    padding: 22,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#EFEFEF",
    elevation: 2,
  },
  label: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    backgroundColor: "#F9F9F9",
    marginBottom: 18,
    fontFamily: "PoppinsRegular",
    fontSize: 16,
  },
  linksRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkUnderlined: {
    color: "#666",
    fontFamily: "PoppinsRegular",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  linkUnderlinedBlue: {
    color: "#2F32CD",
    fontFamily: "PoppinsSemiBold",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1.5,
    backgroundColor: "#2F32CD",
  },
  orText: {
    marginHorizontal: 6,
    fontWeight: "500",
    fontSize: 12,
    color: "#2F32CD",
  },
  googleButtonDark: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2F32CD",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 15,
  },
  googleTextDark: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 10,
  },
  bottomImage: {
    width: 250,
    height: 200,
    resizeMode: "contain",
    marginTop: 5,
  },
});
