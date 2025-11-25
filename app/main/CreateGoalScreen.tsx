// app/main/CreateGoalScreen.tsx
import HeaderButton from "@/app/components/ui/HeaderButton";
import { useGoals } from "@/contexts/GoalsContext";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
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
  const { addGoal } = useGoals();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeDate = (event: any, selected?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selected) {
      setDate(selected);
    }
  };

  const formattedDate = date
    ? date.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })
    : "";

  const validateAndSave = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Por favor ingresa el título de la meta.");
      return;
    }
    setLoading(true);
    try {
      // addGoal ahora acepta due_date como string ISO (yyyy-mm-dd) o null
      const due_date = date ? date.toISOString().split("T")[0] : null;
      await addGoal(title.trim(), desc.trim(), due_date ?? undefined);
      router.back();
    } catch (err) {
      console.error("Error creando meta:", err);
      Alert.alert("Error", "No se pudo guardar la meta. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
          <View style={styles.headerRow}>
            <HeaderButton icon="arrow-back" onPress={() => router.back()} color="#fff" />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.headerTitle}>Nueva Meta</Text>
              <Text style={styles.headerSubtitle}>Define qué quieres lograr y cuándo</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.form}>
          <Text style={styles.label}>Título de tu meta</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Fortalecer mi empatía"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>¿Qué quieres lograr?</Text>
          <TextInput
            style={[styles.input, { height: 110 }]}
            placeholder="Describe tu meta..."
            placeholderTextColor="#999"
            value={desc}
            onChangeText={setDesc}
            multiline
            textAlignVertical="top"
          />

          <Text style={styles.label}>¿Para cuándo?</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowPicker(true)}
            style={[styles.input, styles.dateInput]}
          >
            <MaterialIcons name="calendar-today" size={18} color="#444" />
            <Text style={{ marginLeft: 10, color: date ? "#130F40" : "#999" }}>
              {date ? formattedDate : "Selecciona una fecha"}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "calendar"}
              onChange={onChangeDate}
              minimumDate={new Date(2020, 0, 1)}
            />
          )}

          <TouchableOpacity
            style={[styles.saveBtn, loading && { opacity: 0.7 }]}
            onPress={validateAndSave}
            disabled={loading}
          >
            <Text style={styles.saveText}>{loading ? "Guardando..." : "Guardar meta"}</Text>
          </TouchableOpacity>

          {/* Robby image (inspiración visual similar a tus pantallas) */}
          <View style={{ alignItems: "center", marginTop: 24 }}>
            {/* if you have robby asset at assets/images/robby.png */}
            <View style={{ width: 160, height: 120 }} />
          </View>
        </View>
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    color: "#fff",
    fontFamily: "PoppinsBold",
  },
  headerSubtitle: {
    color: "#fff",
    marginTop: 3,
    fontFamily: "PoppinsRegular",
  },
  form: {
    marginTop: 22,
    marginHorizontal: 20,
  },
  label: {
    fontFamily: "PoppinsSemiBold",
    marginBottom: 8,
    color: "#130F40",
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#F7F7F7",
    borderRadius: 16,
    padding: 14,
    marginBottom: 15,
    fontFamily: "PoppinsRegular",
    fontSize: 15,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  saveBtn: {
    backgroundColor: "#DD3282",
    padding: 16,
    borderRadius: 18,
    marginTop: 10,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },
});
