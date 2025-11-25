import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Camera } from 'expo-camera';
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
import CameraModal from "../components/modals/CameraModal";
import HeaderButton from "../components/ui/HeaderButton";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useContext(AuthContext);
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
    (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== 'granted') {
        alert('Se necesita permiso para usar la cámara');
        }
    })();
    }, []);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (data) setProfile(data);
    };
    loadProfile();
  }, [user]);

  const saveChanges = async () => {
    await supabase.from("profiles").update(profile).eq("id", user?.id);
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: insets.top }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* HEADER */}
        <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
          <View style={styles.headerRow}>
            <HeaderButton icon="arrow-back" onPress={() => router.back()} />
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.headerTitle}>Configurar perfil</Text>
            </View>
          </View>

          {/* AVATAR CENTRADO */}
        <View style={styles.avatarWrapper}>
        <View style={styles.avatarContainer}>
            <Image
            source={{
                uri: profile.avatar_url || "../../assets/images/robby.png",
            }}
            style={styles.avatar}
            />
            <TouchableOpacity
            style={styles.editIcon}
            onPress={() => {
                console.log("Abrir cámara");
                setCameraVisible(true);
                }}
            >
            <MaterialIcons name="photo-camera" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
        </View>
        </LinearGradient>

        {/* INFORMACIÓN PERSONAL */}
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

        {/* PREFERENCIAS */}
        <View style={styles.card}>
          <Text style={styles.section}>Preferencias</Text>
          <View style={styles.prefRow}>
            <Feather name="bell" size={22} color="#59B5A2" />
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

          <View style={styles.prefRow}>
            <Feather name="moon" size={22} color="#130F40" />
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

        {/* CUENTA */}
        <View style={styles.card}>
          <Text style={styles.section}>Cuenta</Text>
          <TouchableOpacity style={styles.accountRow}>
            <FontAwesome5 name="lock" size={20} color="#7794F5" />
            <Text style={styles.accountText}>Cambiar contraseña</Text>
          </TouchableOpacity>

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

        {/* BOTONES DE ACCIÓN */}
        <View style={styles.footerButtons}>
          <PrimaryButton
            title="Guardar cambios"
            onPress={saveChanges}
          />
          <SecondaryButton
            title="Cancelar"
            onPress={() => router.back()}
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* CAMERA MODAL */}
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
    paddingTop: 45,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    color: "#fff",
    fontFamily: "PoppinsBold",
  },
  avatarWrapper: {
  marginTop: 15,
  alignItems: "center",
  justifyContent: "center",
},
avatarContainer: {
  position: "relative",
},
avatar: {
  width: 120,
  height: 120,
  borderRadius: 70,
  borderWidth: 4,
  borderColor: "#fff",
  backgroundColor: "#eee",
  elevation: 5,
},
editIcon: {
  position: "absolute",
  bottom: 0,
  right: 0,
  transform: [{ translateX: 10 }, { translateY: 10 }], // Ajusta este valor para que quede pegadito
  backgroundColor: "#DD3282",
  padding: 10,
  borderRadius: 30,
  elevation: 5,
},
  card: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 18,
    elevation: 3,
  },
  section: { fontSize: 18, fontFamily: "PoppinsBold", marginBottom: 12 },
  label: { fontFamily: "PoppinsSemiBold", marginTop: 10, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#F7F7F7",
  },
  prefRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  prefTitle: { fontSize: 16, fontFamily: "PoppinsSemiBold" },
  prefSub: { fontSize: 12, color: "#666" },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  accountText: { marginLeft: 12, fontSize: 16, fontFamily: "PoppinsSemiBold" },
  logoutRow: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  logoutText: { marginLeft: 12, fontSize: 16, color: "#DD3282", fontFamily: "PoppinsBold" },
  footerButtons: {
    marginTop: 20,
    paddingHorizontal: 20,
    gap: 12, // espaciado entre los botones
  },
});
