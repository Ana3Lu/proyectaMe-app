import { useEffect, useState } from 'react';
import { 
  ActivityIndicator, ScrollView, Text, View, StyleSheet, 
  TouchableOpacity, KeyboardAvoidingView, Platform 
} from 'react-native';
import { SimulationQuestion } from '../../types/simulation.type';
import { ChatBubble } from '../ui/ChatBubble';
import { OptionButton } from '../ui/OptionButton';
import { ProgressBar } from '../ui/ProgressBar';
import { fetchSimulation } from '../../services/gemini.service';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function MainScreen() {
  const [questions, setQuestions] = useState<SimulationQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [chatHistory, setChatHistory] = useState<{ message: string; sender: 'robby' | 'user' }[]>([]);

  useEffect(() => { loadSimulation(); }, []);

  const loadSimulation = async () => {
    setIsLoading(true);
    try {
      const simulation = await fetchSimulation();
      if (!simulation || simulation.length === 0) {
        console.warn('Simulación vacía');
        return;
      }
      setQuestions(simulation);
      setChatHistory([{ message: simulation[0].question, sender: 'robby' }]);
    } catch (err) {
      console.warn('Fallo al cargar simulación:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedAnswers[currentQuestionIndex] !== undefined) return;

    const currentQuestion = questions[currentQuestionIndex];
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: optionIndex });

    // Mensaje del usuario
    setChatHistory(prev => [...prev, { message: currentQuestion.options[optionIndex], sender: 'user' }]);
    
    // Mensaje de Robby con retroalimentación
    setTimeout(() => {
      setChatHistory(prev => [...prev, { message: currentQuestion.feedback[optionIndex], sender: 'robby' }]);
    }, 600);
  };

  const goToNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setChatHistory(prev => [...prev, { message: questions[nextIndex].question, sender: 'robby' }]);
    } else {
      alert('¡Simulación finalizada! Revisa tu perfil para sugerencias de carrera.');
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

        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Text style={styles.topBarText}>
  Decisión {questions.length > 0 ? currentQuestionIndex + 1 : 0} de {questions.length}
</Text>

        </View>

        <ProgressBar value={((currentQuestionIndex + 1) / questions.length) * 100} />
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

        {!isLoading && questions[currentQuestionIndex] && selectedAnswers[currentQuestionIndex] === undefined && (
          <View style={{ marginTop: 16 }}>
            {questions[currentQuestionIndex].options.map((opt, idx) => (
              <OptionButton
                key={idx}
                option={opt}
                selected={false}
                onPress={() => handleOptionSelect(idx)}
              />
            ))}
          </View>
        )}

        {!isLoading && selectedAnswers[currentQuestionIndex] !== undefined && (
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#2F32CD',
    borderRadius: 15,
    padding: 4,
    marginTop: 10, 
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
});
