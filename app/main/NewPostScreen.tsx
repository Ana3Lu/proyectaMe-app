import FilterChip from "@/app/components/ui/FilterChip";
import HeaderButton from "@/app/components/ui/HeaderButton";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import SecondaryButton from "@/app/components/ui/SecondaryButton";
import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NewPostScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);
  const isPremium = user?.plan_type === "premium";

  const [text, setText] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const tags: string[] = ["Salud", "Tecnología", "Creatividad", "Educación", "Ciencia", "Arte", "Negocios"];

  const createPost = async () => {
    if (!user || !text.trim()) return;
    setLoading(true);
    try {
      // INSERT en posts con tags como array
      await supabase.from("posts").upsert({
        user_id: user.id,
        user_name: user.name ?? "Anónimo",
        text: text.trim(),
        tags: selectedTag ? [selectedTag] : [],
        likes: 0
      }, { onConflict: "id" });

      Alert.alert("¡Éxito!", "Tu publicación ha sido creada.");
      router.back();
    } catch (err) {
      console.error("Error creating post:", err);
      Alert.alert("Error", "No se pudo crear la publicación.");
    } finally {
      setLoading(false);
    }
  };

  const chunkArray = (arr: string[], size: number): string[][] => {
    const chunks: string[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };
  const tagRows = chunkArray(tags, 3);

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "#fff" }}>
      <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
        <View style={styles.headerRow}>
          <HeaderButton icon="arrow-back" onPress={() => router.back()} />
          <View style={{ flexShrink: 1 }}>
            <Text style={styles.headerTitle}>Nueva reflexión</Text>
            <Text style={styles.headerSubtitle}>Comparte tus pensamientos con la comunidad</Text>
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
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={styles.card}>
            <Text style={styles.label}>Compártenos...</Text>
            <TextInput
              placeholder="¿Qué descubriste hoy? Comparte tu experiencia..."
              placeholderTextColor="#888"
              value={text}
              onChangeText={setText}
              multiline
              numberOfLines={6}
              style={styles.textArea}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.card}>
            <Text style={[styles.section]}>Etiqueta (elige una)</Text>
            <View style={styles.tagsContainer}>
              {tagRows.map((row, idx) => (
                <View key={idx} style={styles.tagRow}>
                  {row.map(tag => (
                    <FilterChip
                      key={tag}
                      label={tag}
                      active={selectedTag === tag}
                      onPress={() => setSelectedTag(tag)}
                      activeColor="#2F32CD"
                      activeTextColor="#fff"
                      inactiveColor="#fff"
                      inactiveTextColor="#2F32CD"
                      style={{ borderWidth: 2, borderColor: "#2F32CD" }}
                    />
                  ))}
                </View>
              ))}
            </View>
          </View>

          <View style={styles.footerButtons}>
            <PrimaryButton
              title={loading ? "Publicando..." : "Publicar"}
              onPress={createPost}
            />
            <SecondaryButton title="Cancelar" onPress={() => router.back()} />

            <View style={styles.robbyWrapper}>
              <Image source={require("../../assets/images/robby.png")} style={styles.robbyImage} resizeMode="contain" />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 25, paddingBottom: 40, paddingTop: 35, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerRow: { flexDirection: "row", alignItems: "center" },
  headerTitle: { fontSize: 32, color: "#fff", fontFamily: "PoppinsBold" },
  headerSubtitle: { fontSize: 16, color: "#fff", marginTop: 5, fontFamily: "PoppinsRegular", maxWidth: 260 },
  card: { marginHorizontal: 20, marginTop: 20, padding: 18, backgroundColor: "#fff", borderRadius: 18, elevation: 3 },
  label: { fontFamily: "PoppinsSemiBold", marginBottom: 6, color: "#130F40" },
  textArea: { minHeight: 120, borderWidth: 1, borderColor: "#ddd", borderRadius: 16, padding: 14, backgroundColor: "#F7F7F7", fontFamily: "PoppinsRegular", fontSize: 15 },
  section: { fontSize: 18, fontFamily: "PoppinsBold", color: "#130F40", marginBottom: 10 },
  tagsContainer: { marginTop: 10 },
  tagRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  footerButtons: { marginTop: 20, paddingHorizontal: 20, gap: 12, alignItems: "center" },
  warningBox: { backgroundColor: "#FFF2F2", padding: 16, margin: 20, borderRadius: 16, alignItems: "center" },
  warningText: { color: "#DD3282", fontFamily: "PoppinsSemiBold", fontSize: 16 },
  robbyWrapper: { marginTop: 20, width: "100%", alignItems: "center" },
  robbyImage: { width: 350, height: 350 },
});
