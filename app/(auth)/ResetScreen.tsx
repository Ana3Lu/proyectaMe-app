import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function ResetScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={26} color="#2F32CD" />
        </TouchableOpacity>

        <View style={styles.container}>

          <StatusBar barStyle="dark-content" />

          {/* Icon */}
          <View style={[styles.iconCircle, { backgroundColor: "#FEE543" }]}>
            <MaterialIcons name="email" size={46} color="#130F40" />
          </View>

          {/* Title */}
          <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>

          <Text style={styles.subtitle}>
            No te preocupes, te enviaremos instrucciones para recuperarla
          </Text>

          {/* Form */}
          <View style={styles.formCard}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              placeholder="tu@email.com"
              placeholderTextColor="#A0A0A0"
              style={styles.input}
            />

            <PrimaryButton 
              title="Enviar instrucciones"
              onPress={() => {}}
              fontSize={16}
            />
          </View>

          {/* Bottom Links */}
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={styles.smallLink}>
              ¿Recordaste tu contraseña?
            </Text>

            <TouchableOpacity onPress={() => router.push("/(auth)/LoginScreen")}>
              <Text style={styles.linkBlueUnderline}>
                Inicia sesión aquí
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    paddingLeft: 20,
    paddingTop: 20,
  },
  container: {
    paddingHorizontal: 30,
    paddingBottom: 40,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  icon: {
    width: 90,
    height: 90,
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: "PoppinsBold",
    color: "#130F40",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#444",
    textAlign: "center",
    fontFamily: "PoppinsRegular",
    marginVertical: 10,
    marginBottom: 20,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
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
    marginBottom: 6,
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
  smallLink: {
    fontSize: 16,
    color: "#444",
    fontFamily: "PoppinsRegular",
  },
  linkBlueUnderline: {
    color: "#2F32CD",
    fontFamily: "PoppinsSemiBold",
    textDecorationLine: "underline",
    fontSize: 16,
    marginTop: 4,
  },
});
