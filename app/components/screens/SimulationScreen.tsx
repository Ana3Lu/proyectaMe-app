import { ChatBubble } from '@/app/components/ui/ChatBubble';
import { OptionButton } from '@/app/components/ui/OptionButton';
import { ProgressBar } from '@/app/components/ui/ProgressBar';
import { FALLBACK_SIMULATIONS, GENERIC_FALLBACK } from "@/constants/simulationFallbacks";
import { SIMULATIONS } from "@/constants/simulations";
import { useSimulation } from '@/contexts/SimulationContext';
import { useVocational } from '@/contexts/VocationalContext';
import { GeminiResponse } from '@/types/responses.type';
import { SimulationQuestion } from '@/types/simulation.type';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView, Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderButton from '../ui/HeaderButton';

export default function SimulationScreen() {
  const [questions, setQuestions] = useState<SimulationQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [chatHistory, setChatHistory] = useState<{ message: string; sender: 'robby' | 'user' }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState<{ skill: string; score: number }[]>([]);
  
  const { saveSimulationResults } = useSimulation();
  const { markSimulationCompleted } = useVocational();
  const { id } = useLocalSearchParams<{ id: string }>();

  const simulation = SIMULATIONS.find(sim => sim.id === id);
  const topic = simulation?.topicPrompt;

  const insets = useSafeAreaInsets();

  const loadSimulation = useCallback(async () => {
    // Reiniciar todo antes de cargar
    setIsLoading(true);
    setIsFinished(false);
    setResults([]);
    setSelectedAnswers({});
    setCurrentIndex(0);
    setChatHistory([]);
    setQuestions([]);

    const body = {
      "contents": [
        {
          "parts": [
            {
              text: `
                Crea una simulación narrativa basada únicamente en este contexto profesional: "${topic}". 
                Retorna directamente una lista JSON con exactamente 6 decisiones secuenciales para una simulación 
                narrativa tipo chat vocacional de una carrera u oficio. Cada decisión representa un dilema o 
                situación profesional de ese oficio, donde el usuario debe elegir qué haría. 
                La narrativa debe ir en 'question' (como si Robby presentara la situación, pero sin mencionarlo). 
                Cada decisión debe incluir: mínimo 4 opciones posibles ('options'), retroalimentación específica por 
                opción ('feedback'), una puntuación del 1 al 5 ('scores') y una habilidad blanda asociada ('skills': 
                (ej: Empatía, Liderazgo, Comunicación, Creatividad, Trabajo en equipo, Adaptabilidad o Ética...)), manteniendo el mismo 
                orden entre arrays. Ejemplo de habilidades: empatía, liderazgo, comunicación, trabajo en equipo, 
                adaptabilidad, creatividad o ética. No incluyas texto extra ni código Markdown — solo el array JSON.`
            },
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
              "feedback": { "type": "ARRAY", "items": { "type": "STRING" } },
              "scores": { "type": "ARRAY", "items": { "type": "NUMBER" } },
              "skills": { "type": "ARRAY", "items": { "type": "STRING" } }
            }
          }
        }
      }
    };

    try {
      //console.log("API Key:", process.env.EXPO_PUBLIC_GEMINI_API_KEY);
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

      // Fallback profesional o genérico
      const fallback = FALLBACK_SIMULATIONS[id!] ?? GENERIC_FALLBACK;

      setQuestions(fallback);
      setChatHistory([
        { message: "Tu simulación se demoró un poco, preparé una versión alternativa para ti 😊", sender: "robby" },
        { message: fallback[0].question, sender: "robby" }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [topic, id]);

  useEffect(() => {
    if (!simulation) return;
    loadSimulation();
  }, [id, simulation, loadSimulation]);

  if (!simulation) {
    return (
      <View style={styles.container}>
        <Text>Simulación no encontrada</Text>
      </View>
    );
  }

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedAnswers[currentIndex] !== undefined) return;

    const current = questions[currentIndex];
    if (!current) return;

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
    }, 600);

    const selectedSkill = current.skills[optionIndex];
    const selectedScore = current.scores[optionIndex];
    setResults(prev => [...prev, { skill: selectedSkill, score: selectedScore }]);
  };

  const goToNext = () => {
    const nextIndex = currentIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setChatHistory(prev => [
        ...prev,
        { message: questions[nextIndex].question, sender: "robby" }
      ]);
    } else if (!isFinished) {

      // Sumar puntajes y contar apariciones por skill
      const skillTotals: Record<string, number> = {};
      const skillCounts: Record<string, number> = {};

      results.forEach(r => {
        skillTotals[r.skill] = (skillTotals[r.skill] || 0) + r.score;
        skillCounts[r.skill] = (skillCounts[r.skill] || 0) + 1;
      });

      // Convertirlos a porcentajes
      const finalPercentages: Record<string, number> = {};

      Object.entries(skillTotals).forEach(([skill, total]) => {
        const count = skillCounts[skill];
        const max = count * 5; // máximo posible
        finalPercentages[skill] = Math.round((total / max) * 100);
      });

      saveSimulationResults(id!, finalPercentages);  
      markSimulationCompleted(id!);

      setChatHistory(prev => [
        ...prev,
        { message: "¡Simulación finalizada! 🎉", sender: "robby" },
        { message: "Revisa tu perfil para ver tu rendimiento. 📊", sender: "robby" }
      ]);

      setIsFinished(true);
    }
  };

  const currentQuestion = questions[currentIndex];

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
        <HeaderButton 
          icon="close"
          onPress={() => router.push('/main/(tabs)/SimulationsScreen')}
        />

        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Text style={styles.topBarText}>
            Decisión {questions.length > 0 ? currentIndex + 1 : 0} de {questions.length}
          </Text>
        </View>

        <ProgressBar value={questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0} />
      </LinearGradient>

      <ScrollView 
        contentContainerStyle={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Cargando simulación...</Text>
          </View>
        ) : (
          chatHistory.map((chat, idx) => (
            <ChatBubble key={idx} message={chat.message} sender={chat.sender} />
          ))
        )}

        {/* Renderiza opciones solo si existen */}
        {!isLoading && currentQuestion?.options && selectedAnswers[currentIndex] === undefined && (
          <View style={{ marginTop: 16 }}>
            {currentQuestion.options.map((opt, idx) => (
              <OptionButton
                key={idx}
                option={opt}
                selected={false}
                onPress={() => handleOptionSelect(idx)}
              />
            ))}
          </View>
        )}

        {!isLoading && !isFinished && selectedAnswers[currentIndex] !== undefined && (
          <TouchableOpacity style={styles.nextButton} onPress={goToNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex < questions.length - 1 ? "Siguiente" : "Siguiente"}
            </Text>
          </TouchableOpacity>
        )}

        {/* Solo se muestra Finalizar si terminó y no está cargando */}
        {!isLoading && isFinished && (
          <TouchableOpacity
            style={[styles.nextButton, { marginTop: 8, backgroundColor: '#DD3282' }]}
            onPress={goFeedback => router.push('/main/FeedbackScreen')}
          >
            <Text style={styles.finalButtonText}>Finalizar</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Barra de chat falsa abajo */}
      <View style={[styles.fakeInputContainer, { paddingBottom: insets.bottom > 20 ? insets.bottom : 20 }]}>
        <View style={styles.fakeTextInput}>
          <Text style={styles.fakePlaceholder}>Decide con Rooby...</Text>
        </View>

        <TouchableOpacity style={styles.sendButton}>
          <LinearGradient
            colors={['#7794F5', '#2F32CD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sendButtonGradient}
          >
            <Ionicons name="send" size={20} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    paddingHorizontal: 30,
    paddingVertical: 16,
    paddingTop: 45,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarText: { color: 'white', fontWeight: '600', fontSize: 16 },
  contentContainer: { padding: 16, paddingBottom: 100 },
  loadingContainer: { justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  nextButton: {
    marginTop: 16,
    backgroundColor: '#2F32CD',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  nextButtonText: { color: 'white', fontWeight: '600', fontSize: 16 },
  finalButtonText: { color: '#FFF', fontWeight: '600', fontSize: 16 },
  fakeInputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  fakeTextInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  fakePlaceholder: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
  },
  sendButton: {
    marginLeft: 10,
    overflow: 'hidden',
    borderRadius: 20,
  },
  sendButtonGradient: {
    width: 50,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  
  },
});