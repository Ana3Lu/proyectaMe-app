import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
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
  tag?: string; // <-- opcional
}

export default function PostCard({
  userName,
  time,
  text,
  likes: initialLikes,
  comments,
  avatar,
  postId,
  onToggleLike,
  liked: initialLiked = false,
  onDelete,
  tag,
}: PostCardProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes(newLiked ? likes + 1 : likes - 1);
    onToggleLike?.(postId, newLiked);
  };

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={avatar} style={styles.avatar} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>

      {tag && (
        <View style={[styles.categoryTag, { backgroundColor: "#2F32CD" }]}>
          <Text style={styles.categoryText}>{tag}</Text>
        </View>
      )}

      <View style={styles.deleteIcon}>
        {onDelete && (
          <TouchableOpacity onPress={onDelete}>
            <MaterialIcons name="delete" size={26} color="#BD9D1E" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.text}>{text}</Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
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
  categoryText: {
    fontFamily: "PoppinsBold",
    color: "#fff",
    fontSize: 12,
  },
  deleteIcon: { position: "absolute", right: 20, top: 20 },
  text: { marginTop: 15, fontSize: 16, fontFamily: "PoppinsRegular" },
  actions: { flexDirection: "row", marginTop: 15 },
  likeButton: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  commentButton: { flexDirection: "row", alignItems: "center" },
  likeText: { marginLeft: 6, fontFamily: "PoppinsBold" },
});
