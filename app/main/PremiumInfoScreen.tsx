import HeaderButton from "@/app/components/ui/HeaderButton";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PremiumInfoScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <LinearGradient
          colors={["#F5D142", "#C89E00"]}
          style={styles.header}
        >
          <HeaderButton icon="arrow-back" onPress={() => router.back()} />

          <Text style={styles.title}>¡Te agradecemos!</Text>
          <Text style={styles.subtitle}>
            Recuerda que tu cuenta Premium te incluye los beneficios descritos acá
          </Text>

          <View style={styles.iconCircle}>
            <FontAwesome5 name="crown" size={50} color="#000" />
          </View>
        </LinearGradient>

        {/* Precio */}
        <View style={styles.priceBox}>
          <Text style={styles.oldPrice}>$11.999 / mes</Text>
          <Text style={styles.newPrice}>$8.999 / mes</Text>
          <Text style={styles.discount}>25% de descuento 🎉</Text>
          <Text style={styles.cancel}>Cancela cuando quieras • Sin permanencia</Text>
        </View>

        {/* Lista */}
        <Text style={styles.sectionTitle}>Qué incluye Premium</Text>

        {[
          "Acceso ilimitado a todas las simulaciones",
          "Chat sin límites con Robby",
          "Sin anuncios ni interrupciones",
          "Participar activamente en la comunidad",
          "Retos vocacionales semanales",
          "Contenido exclusivo con IA",
        ].map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemText}>{item}</Text>
            <Text style={styles.check}>✓</Text>
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingBottom: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontFamily: "PoppinsBold",
    marginTop: 20,
  },
  subtitle: {
    color: "#fff",
    marginTop: 10,
    fontFamily: "PoppinsRegular",
    fontSize: 18,
    maxWidth: 300,
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  priceBox: {
    marginTop: -40,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    elevation: 8,
    alignItems: "center",
  },
  oldPrice: {
    textDecorationLine: "line-through",
    fontSize: 16,
    color: "#777",
  },
  newPrice: {
    fontSize: 36,
    fontFamily: "PoppinsBold",
    color: "#130F40",
  },
  discount: {
    backgroundColor: "#FF4F9E",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 5,
    fontFamily: "PoppinsBold",
  },
  cancel: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
  sectionTitle: {
    paddingHorizontal: 25,
    marginTop: 30,
    fontSize: 26,
    fontFamily: "PoppinsBold",
    color: "#130F40",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    paddingVertical: 12,
  },
  itemText: {
    fontFamily: "PoppinsRegular",
    fontSize: 18,
    maxWidth: 260,
  },
  check: {
    fontSize: 24,
    color: "#41C27D",
    fontFamily: "PoppinsBold",
  },
});
