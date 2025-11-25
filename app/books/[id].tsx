import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Linking, ScrollView, Text } from "react-native";
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

  useEffect(() => {
    if (!id) return;
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((r) => r.json())
      .then((data) => setBook(data));
  }, [id]);

  if (!book) return null;

  return (
    <ScrollView style={{ padding: 20 }}>
      {book.volumeInfo.imageLinks?.thumbnail && (
        <Image
          source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
          style={{ width: 150, height: 230, alignSelf: "center" }}
        />
      )}

      <Text style={{ fontSize: 28, fontWeight: "bold", marginTop: 20 }}>
        {book.volumeInfo.title}
      </Text>

      <Text style={{ fontSize: 18, marginTop: 5 }}>
        {book.volumeInfo.authors?.join(", ")}
      </Text>

      <Text style={{ marginTop: 20 }}>
        {book.volumeInfo.description}
      </Text>

      <PrimaryButton
        title="Ver en Google Books"
        onPress={() => {
          if (book.volumeInfo.infoLink) {
            Linking.openURL(book.volumeInfo.infoLink);
          }
        }}
      />
    </ScrollView>
  );
}
