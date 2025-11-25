import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import HeaderButton from "../components/ui/HeaderButton";
import PrimaryButton from "../components/ui/PrimaryButton";

type GoogleBookDetail = {
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    infoLink?: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
};

export default function BookScreen() {
  const { id } = useLocalSearchParams();
  const [book, setBook] = useState<GoogleBookDetail | null>(null);

  const clean = (txt: string) =>
    txt?.replace(/<[^>]+>/g, "").trim() ?? "No hay descripción disponible.";

  useEffect(() => {
    if (!id) return;
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((r) => r.json())
      .then((data) => setBook(data));
  }, [id]);

  if (!book) return null;

  const volume = book.volumeInfo;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* HEADER */}
      <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.header}>
        <View style={styles.headerRow}>
          <HeaderButton icon="arrow-back" onPress={() => router.back()} />
          <View style={{ flexShrink: 1 }}>
            <Text style={styles.headerTitle}>{volume.title}</Text>
            <Text style={styles.headerSubtitle}>
              {volume.authors?.join(", ") ?? ""}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* BODY */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {/* Imagen */}
        {volume.imageLinks?.thumbnail ? (
          <Image
            source={{ uri: volume.imageLinks.thumbnail }}
            style={styles.cover}
          />
        ) : (
          <View style={styles.noImage} />
        )}

        {/* Título completo */}
        <Text style={styles.bigTitle}>{volume.title}</Text>

        {/* Autor */}
        {volume.authors && (
          <Text style={styles.author}>{volume.authors.join(", ")}</Text>
        )}

        <View style={styles.divider} />

        {/* Descripción limpia */}
        <Text style={styles.description}>
          {clean(volume.description ?? "")}
        </Text>

        {/* Acción */}
        <View style={{ paddingHorizontal: 25, marginTop: 25 }}>
          <PrimaryButton
            title="Ver en Google Books"
            onPress={() => {
              if (volume.infoLink) Linking.openURL(volume.infoLink);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingTop: 55,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerRow: { flexDirection: "row", alignItems: "center" },
  headerTitle: {
    fontSize: 26,
    color: "#fff",
    fontFamily: "PoppinsBold",
    flexWrap: "wrap",
    maxWidth: "80%",
  },
  headerSubtitle: {
    color: "#fff",
    fontSize: 16,
    opacity: 0.8,
    marginTop: 4,
    fontFamily: "PoppinsRegular",
  },
  cover: {
    width: "80%",
    height: 320,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  noImage: {
    width: "80%",
    height: 320,
    backgroundColor: "#D9D7FF",
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  bigTitle: {
    fontSize: 28,
    fontFamily: "PoppinsBold",
    color: "#130F40",
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  author: {
    fontSize: 18,
    fontFamily: "PoppinsRegular",
    color: "#555",
    textAlign: "center",
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
    marginHorizontal: 25,
  },
  description: {
    paddingHorizontal: 25,
    fontSize: 16,
    color: "#130F40",
    fontFamily: "PoppinsRegular",
    lineHeight: 22,
  },
});
