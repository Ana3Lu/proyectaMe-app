import { MaterialIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PostCardProps {
  userName: string;
  time: string;
  text: string;
  likes: number;
  comments: number;
  avatar: any;
  postId: string;
  onToggleLike?: (postId: string, liked: boolean) => void;
  liked?: boolean;
  onDelete?: (() => void) | (() => Promise<void>) | null;
  tag?: string;
}

export default function PostCard({
  userName,
  time,
  text,
  likes,
  comments,
  avatar,
  postId,
  onToggleLike,
  liked = false,
  onDelete,
  tag,
}: PostCardProps) {

  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={avatar} style={styles.avatar} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>

      {/* TAG */}
      {tag && (
        <View style={[styles.categoryTag, { backgroundColor: "#2F32CD" }]}>
          <Text style={styles.categoryText}>{tag}</Text>
        </View>
      )}

      {/* POST CONTENT */}
      <Text style={styles.text}>{text}</Text>

      {/* ACTIONS */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onToggleLike?.(postId, liked)} style={styles.likeButton}>
          <MaterialIcons
            name={liked ? "favorite" : "favorite-border"}
            size={28}
            color={liked ? "#FF3B3B" : "#130F40"}
          />
          <Text style={styles.likeText}>{likes}</Text>
        </TouchableOpacity>

        <View style={styles.commentButton}>
          <MaterialIcons name="comment" size={28} color="#130F40" />
          <Text style={styles.likeText}>{comments}</Text>
        </View>
      </View>

      {/* DELETE ICON */}
      {onDelete && (
        <View style={styles.deleteIcon}>
          <TouchableOpacity onPress={onDelete}>
            <MaterialIcons name="delete" size={26} color="#BD9D1E" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#fff",
    marginHorizontal: 25,
    marginTop: 20,
    borderRadius: 20,
    position: "relative", // necesario para posicionar absolute children
  },
  avatar: { width: 45, height: 45, borderRadius: 20 },
  userName: { fontFamily: "PoppinsBold" },
  time: { fontFamily: "PoppinsRegular", color: "#555" },
  categoryTag: {
    position: "absolute",
    top: 15,
    right: 15,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  categoryText: { fontFamily: "PoppinsBold", color: "#fff", fontSize: 12 },
  deleteIcon: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
  text: { marginTop: 15, fontSize: 16, fontFamily: "PoppinsRegular" },
  actions: { flexDirection: "row", marginTop: 15 },
  likeButton: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  commentButton: { flexDirection: "row", alignItems: "center" },
  likeText: { marginLeft: 6, fontFamily: "PoppinsBold" },
});
