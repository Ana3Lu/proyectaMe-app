import CameraModal from "@/app/components/modals/CameraModal";
import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

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

  const saveChanges = async () => {
    setLoading(true);
    await supabase.from("profiles").update(profile).eq("id", user?.id);
    setLoading(false);
    router.back();
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
            onChangeText={(v) => setProfile({ ...profile, name: v })}
            style={styles.input}
          />

          <Text style={styles.label}>Correo</Text>
          <TextInput
            value={profile.email}
            onChangeText={(v) => setProfile({ ...profile, email: v })}
            style={styles.input}
          />

          <Text style={styles.label}>Nivel educativo</Text>
          <TextInput
            value={profile.education_level}
            onChangeText={(v) => setProfile({ ...profile, education_level: v })}
            style={styles.input}
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Botones inferior */}
      <View style={styles.footerButtons}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#DD3282" }]}
          onPress={saveChanges}
        >
          <Text style={styles.btnText}>{loading ? "Guardando..." : "Guardar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#aaa" }]}
          onPress={() => router.back()}
        >
          <Text style={styles.btnText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      <CameraModal
        isVisible={cameraVisible}
        onCancel={() => setCameraVisible(false)}
        onConfirm={(url) => {
          setProfile({ ...profile, avatar_url: url });
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
  footerButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#fff",
    gap: 10,
  },
  btn: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
});
