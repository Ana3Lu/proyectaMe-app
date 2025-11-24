import CameraModal from "@/app/components/modals/CameraModal";
import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    avatar_url: "",
    education_level: "Bachillerato",
    notifications_enabled: true,
    dark_mode: false,
  });

  const [cameraVisible, setCameraVisible] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) setProfile(data);
    };

    load();
  }, [user]);

  const updateField = async (field: string, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }));

    await supabase
      .from("profiles")
      .update({ [field]: value })
      .eq("id", user?.id);
  };

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "#fff" }}>

      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>

          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>Configurar perfil</Text>

          <TouchableOpacity onPress={() => setCameraVisible(true)}>
            <Image
              source={{ uri: profile.avatar_url || "https://placehold.co/100x100" }}
              style={styles.avatar}
            />
            <View style={styles.editIcon}>
              <MaterialIcons name="photo-camera" size={24} color="#fff" />
            </View>
          </TouchableOpacity>

        </LinearGradient>

        <View style={styles.formCard}>
          <Text style={styles.section}>Información Personal</Text>

          <Text style={styles.label}>Nombre</Text>
          <TextInput
            value={profile.name}
            onChangeText={(v) => updateField("name", v)}
            style={styles.input}
          />

          <Text style={styles.label}>Correo</Text>
          <TextInput
            value={profile.email}
            onChangeText={(v) => updateField("email", v)}
            style={styles.input}
          />

          <Text style={styles.label}>Nivel educativo</Text>
          <TextInput
            value={profile.education_level}
            onChangeText={(v) => updateField("education_level", v)}
            style={styles.input}
          />

          <Text style={styles.section}>Preferencias</Text>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Notificaciones</Text>
            <Switch
              value={profile.notifications_enabled}
              onValueChange={(v) => updateField("notifications_enabled", v)}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Modo oscuro</Text>
            <Switch
              value={profile.dark_mode}
              onValueChange={(v) => updateField("dark_mode", v)}
            />
          </View>
        </View>

      </ScrollView>

      <CameraModal
        isVisible={cameraVisible}
        onCancel={() => setCameraVisible(false)}
        onConfirm={(url) => {
          updateField("avatar_url", url);
          setCameraVisible(false);
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontFamily: "PoppinsBold",
    marginTop: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 70,
    marginTop: 10,
    borderWidth: 4,
    borderColor: "#fff",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#DD3282",
    padding: 8,
    borderRadius: 20,
  },
  formCard: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  section: {
    fontSize: 20,
    fontFamily: "PoppinsBold",
    marginBottom: 10,
  },
  label: {
    fontFamily: "PoppinsSemiBold",
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#F7F7F7",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  switchLabel: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
  },
});
