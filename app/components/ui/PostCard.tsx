import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

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
  onDelete
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes(newLiked ? likes + 1 : likes - 1);
    onToggleLike?.(postId, newLiked);
  };

  return (
    <View style={{ padding: 20, backgroundColor: "#fff", marginHorizontal: 25, marginTop: 20, borderRadius: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={avatar} style={{ width: 45, height: 45, borderRadius: 20 }} />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontFamily: "PoppinsBold" }}>{userName}</Text>
          <Text style={{ fontFamily: "PoppinsRegular", color: "#555" }}>{time}</Text>
        </View>
      </View>

      <View style={{ position: "absolute", right: 20, top: 20 }}>
        {onDelete && (
          <TouchableOpacity onPress={onDelete}>
            <MaterialIcons name="delete" size={26} color="#FF3B3B" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={{ marginTop: 15, fontSize: 16, fontFamily: "PoppinsRegular" }}>{text}</Text>

      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <TouchableOpacity onPress={handleLike} style={{ flexDirection: "row", alignItems: "center", marginRight: 20 }}>
          <MaterialIcons 
            name={liked ? "favorite" : "favorite-border"} 
            size={28} 
            color={liked ? "#FF3B3B" : "#130F40"} 
          />
          <Text style={{ marginLeft: 6, fontFamily: "PoppinsBold" }}>{likes}</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="mode-comment" size={28} color="#130F40" />
          <Text style={{ marginLeft: 6, fontFamily: "PoppinsBold" }}>{comments}</Text>
        </View>
      </View>
    </View>
  );
}
