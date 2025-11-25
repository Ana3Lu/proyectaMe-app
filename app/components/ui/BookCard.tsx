import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BookCardProps {
  title: string;
  author?: string;
  image?: string;
  description?: string;
  onPress: () => void;
}

// Función que limpia etiquetas HTML <p>, <br>, etc.
const cleanHTML = (text?: string) => {
  if (!text) return "";
  return text.replace(/<[^>]+>/g, ""); // Remueve cualquier etiqueta
};

export default function BookCard({ title, author, image, description, onPress }: BookCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {image ? (
        <Image source={{ uri: image }} style={styles.cover} />
      ) : (
        <View style={styles.noImage} />
      )}

      <View style={styles.info}>
        <Text style={styles.title}>{cleanHTML(title)}</Text>

        {author && <Text style={styles.author}>{cleanHTML(author)}</Text>}

        {description && (
          <Text
            numberOfLines={3}
            style={styles.desc}
          >
            {cleanHTML(description)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 25,
    marginVertical: 10,
    backgroundColor: "#F5F4FF",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { height: 3, width: 0 },
    elevation: 4,
  },
  cover: {
    width: 65,
    height: 100,
    borderRadius: 12,
    marginRight: 15,
  },
  noImage: {
    width: 65,
    height: 100,
    borderRadius: 12,
    backgroundColor: "#D9D7FF",
    marginRight: 15,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontFamily: "PoppinsBold",
    color: "#130F40",
    fontSize: 18,
    marginBottom: 4,
  },
  author: {
    fontFamily: "PoppinsRegular",
    color: "#555",
    fontSize: 14,
  },
  desc: {
    fontFamily: "PoppinsRegular",
    color: "#666",
    fontSize: 13,
    marginTop: 5,
  },
});
