import CameraModal from "@/app/components/modals/CameraModal";
import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useContext(AuthContext);

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
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* HEADER */}
        <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>Configurar perfil</Text>

          <TouchableOpacity onPress={() => setCameraVisible(true)}>
            <Image
              source={{ uri: profile.avatar_url || "https://placehold.co/120x120" }}
              style={styles.avatar}
            />
            <View style={styles.editIcon}>
              <MaterialIcons name="photo-camera" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
        </LinearGradient>

        {/* CARD INFORMACIÓN PERSONAL */}
        <View style={styles.card}>
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
            onChangeText={(v) =>
              setProfile({ ...profile, education_level: v })
            }
            style={styles.input}
          />
        </View>

        {/* CARD PREFERENCIAS */}
        <View style={styles.card}>
          <Text style={styles.section}>Preferencias</Text>

          {/* Notificaciones */}
          <View style={styles.prefRow}>
            <Feather name="bell" size={22} color="#333" />

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.prefTitle}>Notificaciones</Text>
              <Text style={styles.prefSub}>Recibe recordatorios diarios</Text>
            </View>

            <Switch
              value={profile.notifications_enabled}
              onValueChange={(v) =>
                setProfile({ ...profile, notifications_enabled: v })
              }
            />
          </View>

          {/* Modo oscuro */}
          <View style={styles.prefRow}>
            <Feather name="moon" size={22} color="#333" />

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.prefTitle}>Modo oscuro</Text>
              <Text style={styles.prefSub}>Activa el tema oscuro</Text>
            </View>

            <Switch
              value={profile.dark_mode}
              onValueChange={(v) =>
                setProfile({ ...profile, dark_mode: v })
              }
            />
          </View>
        </View>

        {/* CARD CUENTA */}
        <View style={styles.card}>
          <Text style={styles.section}>Cuenta</Text>

          {/* Cambiar contraseña */}
          <TouchableOpacity style={styles.accountRow}>
            <FontAwesome5 name="lock" size={20} color="#444" />
            <Text style={styles.accountText}>Cambiar contraseña</Text>
          </TouchableOpacity>

          {/* Cerrar sesión */}
          <TouchableOpacity
            style={styles.logoutRow}
            onPress={() => {
              logout();
              router.replace("/(auth)/LoginScreen");
            }}
          >
            <MaterialIcons name="logout" size={22} color="#DD3282" />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* BOTONES ABAJO */}
      <View style={styles.footer}>
        <TouchableOpacity
            style={styles.primaryButton}
            onPress={saveChanges}
        >
            <Text style={styles.primaryButtonText}>
            {loading ? "Guardando..." : "Guardar"}
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.back()}
        >
            <Text style={styles.secondaryButtonText}>Cancelar</Text>
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

  /* CARD */
  card: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 18,
    elevation: 3,
  },

  section: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    marginBottom: 12,
  },

  /* INPUTS */
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

  /* PREFERENCIAS */
  prefRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  prefTitle: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
  prefSub: {
    fontSize: 12,
    color: "#666",
  },

  /* CUENTA */
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  accountText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#DD3282",
    fontFamily: "PoppinsBold",
  },

  /* FOOTER BUTTONS */
  footer: {
  paddingHorizontal: 20,
  paddingBottom: 25,
  paddingTop: 10,
  backgroundColor: "#fff",
},
primaryButton: {
  backgroundColor: "#DD3282",
  paddingVertical: 16,
  borderRadius: 18,
  alignItems: "center",
  marginBottom: 12,
  shadowColor: "#DD3282",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 4,
},
primaryButtonText: {
  color: "#fff",
  fontFamily: "PoppinsBold",
  fontSize: 18,
},
secondaryButton: {
  backgroundColor: "#D3D3D3",
  paddingVertical: 16,
  borderRadius: 18,
  alignItems: "center",
},
secondaryButtonText: {
  color: "#333",
  fontSize: 16,
  fontFamily: "PoppinsSemiBold",
},
});
