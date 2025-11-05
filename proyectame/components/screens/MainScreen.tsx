import { useEffect, useState } from 'react';
import { 
  ActivityIndicator, ScrollView, Text, View, TouchableOpacity, 
  StyleSheet, KeyboardAvoidingView, Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface SimulationQuestion {
  question: string;
  options: string[];
  feedback: string[];
}

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];
}

export default function MainScreen() {
  const [questions, setQuestions] = useState<SimulationQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [chatHistory, setChatHistory] = useState<{ message: string; sender: 'robby' | 'user' }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSimulation();
  }, []);

  const loadSimulation = async () => {
    setIsLoading(true);
    const body = {
      "contents": [
        {
          "parts": [
            {
              text: "Retorna directamente una lista JSON con exactamente 6 decisiones secuenciales para una simulación narrativa tipo chat vocacional. Cada decisión representa un dilema o situación profesional donde el usuario debe elegir qué haría. La narrativa debe estar incluida dentro del campo 'question' (como si Robby presentara la situación, pero sin mencionarlo explícitamente). Cada decisión debe incluir: 4 opciones posibles ('options') y retroalimentación específica para cada opción ('feedback'). No incluyas texto introductorio, comentarios ni código Markdown — solo el array JSON. Ejemplos de simulaciones: 'Un día como médico', 'Estudio de diseño', 'Desarrollador de apps'."            }
          ]
        }
      ],
      "generationConfig": {
        "responseMimeType": "application/json",
        "responseSchema": {
          "type": "ARRAY",
          "items": {
            "type": "OBJECT",
            "properties": {
              "question": { "type": "STRING" },
              "options": { "type": "ARRAY", "items": { "type": "STRING" } },
              "feedback": { "type": "ARRAY", "items": { "type": "STRING" } }
            }
          }
        }
      }
    };

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "x-goog-api-key": process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? "",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const data: GeminiResponse = await response.json();
      console.log("Raw Gemini data:", JSON.stringify(data, null, 2));

      const textData = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      const cleanText = textData
        .replace(/```json/i, "")
        .replace(/```/g, "")
        .trim();

      const parsedData: SimulationQuestion[] = JSON.parse(cleanText);
      if (Array.isArray(parsedData)) {
        setQuestions(parsedData);
        setChatHistory([{ message: parsedData[0].question, sender: "robby" }]);
      } else {
        console.warn("Respuesta inválida de Gemini:", cleanText);
      }
    } catch (error) {
      console.error("Error cargando simulación:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedAnswers[currentIndex] !== undefined) return;

    const current = questions[currentIndex];
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: optionIndex });

    setChatHistory(prev => [
      ...prev,
      { message: current.options[optionIndex], sender: "user" }
    ]);

    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        { message: current.feedback[optionIndex], sender: "robby" }
      ]);
    }, 700);
  };

  const goToNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setChatHistory(prev => [
        ...prev,
        { message: questions[nextIndex].question, sender: "robby" }
      ]);
    } else {
      setChatHistory(prev => [
        ...prev,
        { message: "¡Simulación finalizada! 🎉 Revisa tu perfil para más recomendaciones.", sender: "robby" }
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <LinearGradient
        colors={['#7794F5', '#2F32CD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.topBar}
      >
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={styles.topBarText}>
            Decisión {questions.length > 0 ? currentIndex + 1 : 0} de {questions.length}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2F32CD" />
            <Text>Cargando simulación...</Text>
          </View>
        ) : (
          chatHistory.map((chat, idx) => (
            <View
              key={idx}
              style={[
                styles.chatBubble,
                chat.sender === "user" ? styles.userBubble : styles.robbyBubble
              ]}
            >
              <Text style={{ color: chat.sender === "user" ? "black" : "white" }}>
                {chat.message}
              </Text>
            </View>
          ))
        )}

        {!isLoading && questions[currentIndex] && selectedAnswers[currentIndex] === undefined && (
          <View style={{ marginTop: 16 }}>
            {questions[currentIndex].options.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.optionButton}
                onPress={() => handleOptionSelect(idx)}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {!isLoading && selectedAnswers[currentIndex] !== undefined && currentIndex < questions.length && (
          <TouchableOpacity style={styles.nextButton} onPress={goToNext}>
            <Text style={styles.nextButtonText}>Siguiente</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#2F32CD",
    borderRadius: 15,
    padding: 4,
    marginTop: 10,
  },
  topBarText: { color: "white", fontWeight: "600", fontSize: 16 },
  contentContainer: { padding: 16, paddingBottom: 100 },
  loadingContainer: { justifyContent: "center", alignItems: "center", marginTop: 50 },
  chatBubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 16,
    maxWidth: "90%",
  },
  userBubble: {
    backgroundColor: "#E3E3E3",
    alignSelf: "flex-end",
  },
  robbyBubble: {
    backgroundColor: "#2F32CD",
    alignSelf: "flex-start",
  },
  optionButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2F32CD",
    padding: 10,
    marginVertical: 5,
  },
  optionText: { color: "#2F32CD", fontWeight: "500", textAlign: "center" },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#2F32CD",
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
  },
  nextButtonText: { color: "white", fontWeight: "600", fontSize: 16 },
});
