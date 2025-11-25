import BookCard from "@/app/components/ui/BookCard";
import HeaderButton from "@/app/components/ui/HeaderButton";
import PostCard from "@/app/components/ui/PostCard";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import { ProgressBar } from "@/app/components/ui/ProgressBar";
import SecondaryButton from "@/app/components/ui/SecondaryButton";
import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";

import { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type GoogleBook = {
  id: string;
  volumeInfo: { title: string; authors?: string[]; imageLinks?: { thumbnail?: string } };
};

type Post = {
  id: string;
  user_id: string;
  user_name: string;
  text: string;
  created_at: string;
  likes: number;
  liked: boolean;
  tags?: string[];
  avatar_url?: string | null;
};

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);
  const isPremium = user?.plan_type === "premium";

  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  // Traer libros
  const fetchBooks = useCallback(async () => {
    if (!user) return;
    const { data: affinities } = await supabase
      .from("user_affinities")
      .select("affinity")
      .eq("user_id", user.id);

    const keywords = affinities?.map((a) => a.affinity).join(" ") || "career stories";
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keywords}&maxResults=6`);
    const json = await res.json();
    setBooks(json.items || []);
  }, [user]);

  // Traer posts
  const fetchPosts = useCallback(async () => {
    if (!user) return;

    const { data: postsData } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: likesData } = await supabase
      .from("posts_likes")
      .select("post_id, liked")
      .eq("user_id", user.id);

    const authorIds = Array.from(new Set(postsData?.map((p: any) => p.user_id)));

    const { data: profilesData } = await supabase
      .from("profiles")
      .select("id, avatar_url")
      .in("id", authorIds);

    const postsWithLikes: Post[] =
      postsData?.map((p: any) => ({
        id: p.id,
        user_id: p.user_id,
        user_name: p.user_name,
        text: p.text,
        created_at: p.created_at,
        likes: p.likes ?? 0,
        liked: likesData?.some((l) => l.post_id === p.id && l.liked) || false,
        tags: p.tags || [],
        avatar_url: profilesData?.find((prof) => prof.id === p.user_id)?.avatar_url || null,
      })) || [];

    setPosts(postsWithLikes);
  }, [user]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [fetchPosts])
  );

  // Toggle like
  const handleToggleLike = async (postId: string, currentlyLiked: boolean) => {
    if (!user) return;

    // Actualiza estado local inmediatamente y asegura min 0
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked: !currentlyLiked, likes: Math.max(0, p.likes + (currentlyLiked ? -1 : 1)) }
          : p
      )
    );

    // Actualiza o inserta en posts_likes
    await supabase
      .from("posts_likes")
      .upsert({ user_id: user.id, post_id: postId, liked: !currentlyLiked });

    // Actualiza contador de likes en posts (asegura mínimo 0)
    const { data: postData, error } = await supabase
      .from("posts")
      .select("likes")
      .eq("id", postId)
      .single();

    if (error) {
      console.error("Error fetching post likes:", error.message);
      return;
    }

    const newLikes = Math.max(0, currentlyLiked ? postData.likes - 1 : postData.likes + 1);
    await supabase.from("posts").update({ likes: newLikes }).eq("id", postId);
  };

  const handleDeletePost = async (postId: string) => {
    await supabase.from("posts").delete().eq("id", postId);
    fetchPosts();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
          <View style={styles.headerRow}>
            <HeaderButton icon="arrow-back" onPress={() => router.back()} />
            <View style={{ flexShrink: 1 }}>
              <Text style={styles.headerTitle}>Comunidad</Text>
              <Text style={styles.headerSubtitle}>
                Comparte tu experiencia y aprende de otros
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* RETO SEMANAL */}
        <View style={styles.weeklyCard}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.trophyCircle}>
              <MaterialIcons name="emoji-events" size={32} color="#130F40" />
            </View>
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.weeklyTitle}>Reto Semanal</Text>
              <Text style={styles.weeklyDesc}>Completa 3 simulaciones esta semana</Text>
            </View>
          </View>
          <View style={styles.progressRow}>
            <ProgressBar value={66} />
            <Text style={styles.progressText}>2/3</Text>
          </View>
        </View>

        {/* BOTONES PREMIUM */}
        <View style={styles.buttonRow}>
          <PrimaryButton
            title="Nueva reflexión"
            onPress={isPremium ? () => router.push("../NewPostScreen") : undefined}
            disabled={!isPremium}
          />
          <SecondaryButton
            title="Ver retos"
            onPress={isPremium ? () => router.push("../MyPostsScreen") : undefined}
            disabled={!isPremium}
          />
        </View>

        {!isPremium && (
          <View style={styles.freeMessageContainer}>
            <Text style={styles.freeMessageText}>
              Para publicar reflexiones y participar activamente, debes subir a plan Premium.
            </Text>
          </View>
        )}

        {/* PUBLICACIONES */}
        <Text style={styles.sectionTitle}>Publicaciones</Text>
        {posts.map((p) => (
          <PostCard
            key={p.id}
            postId={p.id}
            userName={p.user_name}
            time={new Date(p.created_at).toLocaleString()}
            text={p.text}
            likes={p.likes}
            comments={0}
            avatar={p.avatar_url ? { uri: p.avatar_url } : require("../../../assets/images/robby.png")}
            liked={p.liked}
            tag={p.tags?.[0]}
            onToggleLike={() => handleToggleLike(p.id, p.liked)}
            onDelete={p.user_id === user?.id ? () => handleDeletePost(p.id) : undefined}
          />
        ))}

        {/* LIBROS */}
        <Text style={styles.sectionTitle}>Recomendados</Text>
        {books.map((b) => (
          <BookCard
            key={b.id}
            title={b.volumeInfo.title}
            author={b.volumeInfo.authors?.join(", ")}
            image={b.volumeInfo.imageLinks?.thumbnail}
            onPress={() => {}}
          />
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 25, paddingBottom: 40, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerRow: { flexDirection: "row", alignItems: "center" },
  headerTitle: { fontSize: 32, color: "#fff", fontFamily: "PoppinsBold" },
  headerSubtitle: { color: "#fff", marginTop: 5, fontFamily: "PoppinsRegular", fontSize: 18, maxWidth: 260 },
  buttonRow: { 
    flexDirection: "column",
    paddingHorizontal: 25, 
    marginTop: 20, 
    justifyContent: "center", 
    gap: 12,
  },
  sectionTitle: { paddingHorizontal: 25, marginTop: 25, fontSize: 26, fontFamily: "PoppinsBold", color: "#130F40" },
  freeMessageContainer: { backgroundColor: "#FFF4E5", marginHorizontal: 25, marginTop: 15, padding: 12, borderRadius: 15 },
  freeMessageText: { color: "#FFA500", fontWeight: "bold", fontSize: 14, textAlign: "center" },
  weeklyCard: { backgroundColor: "#D9D7FF", marginHorizontal: 25, marginTop: -25, paddingVertical: 15, paddingHorizontal: 10, borderRadius: 20 },
  trophyCircle: { width: 55, height: 55, borderRadius: 20, backgroundColor: "#BEBBFF", justifyContent: "center", alignItems: "center" },
  weeklyTitle: { fontFamily: "PoppinsBold", color: "#130F40", fontSize: 18 },
  weeklyDesc: { fontFamily: "PoppinsRegular", fontSize: 14, color: "#130F40" },
  progressRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  progressText: { marginLeft: 10, fontFamily: "PoppinsBold", fontSize: 16, color: "#130F40" },
});
