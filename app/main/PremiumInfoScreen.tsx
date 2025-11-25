import HeaderButton from "@/app/components/ui/HeaderButton";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PremiumInfoScreen() {
  const benefits = [
    "Acceso ilimitado a todas las simulaciones",
    "Chat sin límites con Robby",
    "Sin anuncios ni interrupciones",
    "Participar activamente en la comunidad",
    "Retos vocacionales semanales",
    "Contenido exclusivo con IA",
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER CON GRADIENTE */}
        <LinearGradient
          colors={["#F5D142", "#C89E00"]}
          style={styles.header}
        >
          {/* HEADER ROW */}
          <View style={styles.headerRow}>
            <HeaderButton icon="arrow-back" color="#fff" backgroundColor="#BD9D1E" onPress={() => router.back()} />
            <Text style={styles.title}>¡Te agradecemos!</Text>
          </View>

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
          <Text style={styles.newPrice}>$8.999 <Text style={styles.month}>/ mes</Text></Text> 
          <Text style={styles.discount}>25% de descuento 🎉</Text>
          <Text style={styles.cancel}>Cancela cuando quieras • Sin permanencia</Text>
        </View>

        {/* Lista de Beneficios con Cards */}
        <Text style={styles.sectionTitle}>Qué incluye Premium</Text>
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          {benefits.map((item, index) => (
            <View key={index} style={styles.cardItem}>
              <Text style={styles.itemText}>{item}</Text>
              <Text style={styles.check}>✓</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingBottom: 60,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontFamily: "PoppinsBold",
    marginLeft: 10, 
    flexShrink: 1, 
  },
  subtitle: {
    color: "#fff",
    marginTop: 10,
    fontWeight: "500",
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
    color: "#2F32CD",
  },
  month: {
    fontSize: 16,
    color: "#000",
  },
  discount: {
    backgroundColor: "#BD9D1E",
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
  cardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  itemText: {
    fontFamily: "PoppinsRegular",
    fontSize: 18,
    flexShrink: 1,
  },
  check: {
    fontSize: 24,
    color: "#41C27D",
    fontFamily: "PoppinsBold",
    marginLeft: 10,
  },
});
