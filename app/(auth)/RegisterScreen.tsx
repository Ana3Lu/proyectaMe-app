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
import HeaderButton from "../components/ui/HeaderButton";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function RegisterScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        {/* Back Button */}
        <TouchableOpacity>
            <HeaderButton 
                icon="arrow-back" 
                color="#2F32CD"
                backgroundColor="transparent" 
                onPress={() => router.back()}
            />
        </TouchableOpacity>

        <View style={styles.container}>

          <StatusBar barStyle="dark-content" />

          {/* Header */}
          <Text style={styles.title}>Crea tu cuenta</Text>

          <Text style={styles.subtitle}>
            Descubre tu vocación con{" "}
            <Text style={{ color: "#2F32CD", fontFamily: "PoppinsBold" }}>
              Proyecta
            </Text>
            <Text style={{ color: "#DD3282", fontFamily: "PoppinsBold" }}>
              Me
            </Text>
          </Text>

          {/* Form */}
          <View style={styles.formCard}>

            <Text style={styles.label}>Nombre</Text>
            <TextInput placeholder="Tu nombre" placeholderTextColor="#A0A0A0" style={styles.input} />

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput placeholder="tu@email.com" placeholderTextColor="#A0A0A0" style={styles.input} />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput secureTextEntry placeholder="Tu contraseña" placeholderTextColor="#A0A0A0" style={styles.input} />

            <Text style={styles.label}>Confirmar contraseña</Text>
            <TextInput secureTextEntry placeholder="Tu contraseña" placeholderTextColor="#A0A0A0" style={styles.input} />

            <PrimaryButton 
              title="Confirmar"
              onPress={() => {}}
              fontSize={16}
            />
          </View>

          {/* Footer */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>¿Ya tienes cuenta?</Text>

            <TouchableOpacity onPress={() => router.push("/LoginScreen")}>
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
  container: {
    paddingHorizontal: 30,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontFamily: "PoppinsBold",
    color: "#130F40",
    marginTop: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#444",
    fontFamily: "PoppinsRegular",
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
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
  footerRow: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    color: "#444",
    marginRight: 6,
  },
  linkBlueUnderline: {
    color: "#2F32CD",
    fontFamily: "PoppinsSemiBold",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
