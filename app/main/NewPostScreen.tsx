import FilterChip from "@/app/components/ui/FilterChip";
import HeaderButton from "@/app/components/ui/HeaderButton";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NewPostScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);
  const isPremium = user?.plan_type === "premium";

  const [text, setText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const tags = ["Salud", "Creatividad", "Tecnología", "Negocios", "Ciencia"];

  const createPost = async () => {
    if (!user || !text.trim()) return;
    setLoading(true);
    await supabase.from("posts").insert({
      user_id: user.id,
      user_name: user.name ?? "Anónimo",
      text,
      tags: selectedTags,
      likes: 0
    });
    setLoading(false);
    router.back();
  };

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
          <View style={styles.headerRow}>
            <HeaderButton icon="arrow-back" onPress={() => router.back()} />
            <View style={{ flexShrink: 1 }}>
              <Text style={styles.headerTitle}>Nueva reflexión</Text>
              <Text style={styles.headerSubtitle}>
                Comparte tus pensamientos con la comunidad
              </Text>
            </View>
          </View>
        </LinearGradient>

        {!isPremium && (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              Para publicar reflexiones necesitas un plan premium.
            </Text>
          </View>
        )}

        {isPremium && (
          <View style={styles.formCard}>
            <Text style={styles.label}>Compártenos...</Text>
            <TextInput
              placeholder="¿Qué descubriste hoy? Comparte tu experiencia, aprendizaje o descubrimiento..."
              value={text}
              onChangeText={setText}
              multiline
              numberOfLines={8}
              style={styles.textArea}
              textAlignVertical="top"
            />
            <Text style={styles.section}>Etiquetas (opcional)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.tagRow}>
                {tags.map(tag => (
                  <FilterChip
                    key={tag}
                    label={tag}
                    active={selectedTags.includes(tag)}
                    onPress={() => {
                      if (selectedTags.includes(tag)) {
                        setSelectedTags(selectedTags.filter(t => t !== tag));
                      } else {
                        setSelectedTags([...selectedTags, tag]);
                      }
                    }}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>

      {isPremium && (
        <View style={styles.footerButtons}>
          <PrimaryButton
            title={loading ? "Publicando..." : "Publicar"}
            onPress={createPost}
          />
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 25, paddingBottom: 40, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerRow: { flexDirection: "row", alignItems: "center" },
  headerTitle: { fontSize: 32, color: "#fff", fontFamily: "PoppinsBold" },
  headerSubtitle: { color: "#fff", marginTop: 5, fontFamily: "PoppinsRegular", fontSize: 16, maxWidth: 260 },
  formCard: { marginTop: 20, marginHorizontal: 20 },
  label: { fontFamily: "PoppinsSemiBold", fontSize: 18, marginBottom: 6, color: "#130F40" },
  textArea: { minHeight: 160, borderWidth: 1, borderColor: "#ddd", borderRadius: 16, padding: 14, backgroundColor: "#F7F7F7", fontFamily: "PoppinsRegular", fontSize: 15 },
  section: { fontSize: 18, fontFamily: "PoppinsBold", marginTop: 20, marginBottom: 10, color: "#130F40" },
  tagRow: { flexDirection: "row", gap: 10 },
  footerButtons: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: "#fff", gap: 10 },
  cancelButton: { padding: 14, borderRadius: 30, borderWidth: 2, borderColor: "#130F40", alignItems: "center" },
  cancelText: { color: "#130F40", fontFamily: "PoppinsBold", fontSize: 16 },
  warningBox: { backgroundColor: "#FFF2F2", padding: 16, margin: 20, borderRadius: 16, alignItems: "center" },
  warningText: { color: "#DD3282", fontFamily: "PoppinsSemiBold", fontSize: 16 },
});
