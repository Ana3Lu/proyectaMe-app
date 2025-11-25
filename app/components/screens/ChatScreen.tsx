import { AuthContext } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChatBubble } from "../ui/ChatBubble";
import HeaderButton from "../ui/HeaderButton";
import { OptionButton } from "../ui/OptionButton";

export default function ChatScreen() {
  const [chat, setChat] = useState<{ sender: "robby" | "user"; message: string }[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);

  const freeLimit = 5;

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 200);
  };

  useEffect(() => {
    // Mensaje inicial
    setChat([
      {
        sender: "robby",
        message: "¡Hola! Soy Robby, tu asistente vocacional 👋\n¿Sobre qué te gustaría hablar hoy?",
      },
    ]);
  }, []);

  useEffect(() => scrollToBottom(), [chat]);

  // -------------------------------
  // FUNCION PARA PREGUNTAR A GEMINI
  // -------------------------------
  const askGemini = async (prompt: string) => {
    try {
      setLoading(true);

      const body = {
        contents: [
          {
            parts: [
              {
                text: `
Eres Robby, un asistente vocacional amable. Responde solo con texto simple, máximo tipo 120 palabras. 
Tema actual: "${selectedTopic ?? "general"}"
Pregunta del usuario: "${prompt}"
              `,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 500,
        },
      };

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? "",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      //console.log("Raw Gemini response:", JSON.stringify(data, null, 2));

      // Tomamos el primer candidato y su texto
      const candidate = data?.candidates?.[0];
      let contentText = "Lo siento, no pude procesar tu pregunta. Intenta de nuevo 😊";

      if (candidate?.content?.parts?.length) {
        contentText = candidate.content.parts.map((p: any) => p.text).join(" ");
      }

      setChat((prev) => [...prev, { sender: "robby", message: contentText }]);
    } catch (err) {
      console.error(err);
      setChat((prev) => [
        ...prev,
        { sender: "robby", message: "Hubo un error temporal. Intenta otra vez 😊" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // ENVIAR MENSAJE
  // -------------------------------
  const handleSend = () => {
    if (!input.trim() || loading) return;

    const userMessages = chat.filter((c) => c.sender === "user").length;

    if (user?.plan_type === "free" && userMessages >= freeLimit) {
      setChat((prev) => [
        ...prev,
        { sender: "robby", message: "Ya llegaste al límite de preguntas gratuitas 😊" },
      ]);
      setInput("");
      return;
    }

    const msg = input.trim();
    setInput("");
    setChat((prev) => [...prev, { sender: "user", message: msg }]);
    askGemini(msg);
  };

  // -------------------------------
  // SELECCIONAR TEMA
  // -------------------------------
  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setChat((prev) => [
      ...prev,
      { sender: "robby", message: `¡Genial! Hablemos sobre ${topic.toLowerCase()}.` },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* HEADER */}
      <LinearGradient
        colors={["#7794F5", "#2F32CD"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <HeaderButton icon="chevron-back" onPress={() => router.back()} />
        <Text style={styles.headerText}>Tu guía Robby</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      {/* CHAT */}
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={[
            styles.contentContainer,
            { paddingBottom: insets.bottom + 140 } 
            ]}
        showsVerticalScrollIndicator={false}
      >
        {chat.map((c, i) => (
          <ChatBubble key={i} message={c.message} sender={c.sender} />
        ))}

        {!selectedTopic && (
          <View style={{ marginTop: 16 }}>
            <OptionButton option="Metas" selected={false} onPress={() => handleTopicSelect("Metas")} />
            <OptionButton
              option="Explorar oficios y carreras"
              selected={false}
              onPress={() => handleTopicSelect("Explorar oficios y carreras")}
            />
            <OptionButton
              option="Recomendaciones vocacionales"
              selected={false}
              onPress={() => handleTopicSelect("Recomendaciones vocacionales")}
            />
          </View>
        )}
      </ScrollView>

      {/* INPUT BAR */}
      {selectedTopic && (
        <View
          style={[
            styles.inputContainer,
            { paddingBottom: insets.bottom > 20 ? insets.bottom : 20 },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Escribe tu mensaje..."
            value={input}
            onChangeText={setInput}
            multiline
          />

          <TouchableOpacity style={styles.sendWrapper} onPress={handleSend} disabled={loading}>
            <LinearGradient colors={["#7794F5", "#2F32CD"]} style={styles.sendButton}>
              {loading ? <ActivityIndicator color="#fff" size="small" /> : <Ionicons name="send" size={18} color="#fff" />}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

// -------------------------
// STYLES
// -------------------------
const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: { color: "white", fontSize: 18, fontWeight: "600" },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 15,
  },
  input: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
  },
  sendWrapper: { marginLeft: 10 },
  sendButton: { width: 45, height: 45, borderRadius: 22, justifyContent: "center", alignItems: "center" },
  contentContainer: { padding: 16, paddingBottom: 40 },
});
