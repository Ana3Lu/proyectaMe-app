import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CreateGoalScreen() {
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Nueva Meta</Text>
          <Text style={styles.headerSubtitle}>
            Define qué quieres lograr y cuándo
          </Text>
        </LinearGradient>

        <View style={styles.form}>
          <Text style={styles.label}>Título de tu meta</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Fortalecer mi empatía"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>¿Qué quieres lograr?</Text>
          <TextInput
            style={[styles.input, { height: 90 }]}
            placeholder="Describe tu meta..."
            value={desc}
            onChangeText={setDesc}
            multiline
          />

          <Text style={styles.label}>¿Para cuándo?</Text>
          <TextInput
            style={styles.input}
            placeholder="Selecciona una fecha"
            value={date}
            onChangeText={setDate}
          />
        </View>

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Guardar meta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingBottom: 40,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 32,
    color: "#fff",
    fontFamily: "PoppinsBold",
    marginTop: 10,
  },
  headerSubtitle: {
    color: "#fff",
    marginTop: 5,
  },
  form: {
    marginTop: 25,
    marginHorizontal: 20,
  },
  label: {
    fontFamily: "PoppinsSemiBold",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F7F7F7",
    borderRadius: 16,
    padding: 14,
    marginBottom: 15,
  },
  saveBtn: {
    backgroundColor: "#DD3282",
    padding: 18,
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 15,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },
});
