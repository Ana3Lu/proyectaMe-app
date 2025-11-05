import { useEffect, useState } from 'react';
import { 
  ActivityIndicator, ScrollView, Text, View, TouchableOpacity, 
  StyleSheet, KeyboardAvoidingView, Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { ChatBubble } from '../ui/ChatBubble';
import { OptionButton } from '../ui/OptionButton';
import { ProgressBar } from '../ui/ProgressBar';
import { fetchSimulation } from '../../services/gemini.service';
import { SimulationQuestion } from '../../types/simulation.type';

export default function MainScreen() {
  const [questions, setQuestions] = useState<SimulationQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [chatHistory, setChatHistory] = useState<{ message: string; sender: 'robby' | 'user' }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      console.error('Error al cargar simulación:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedAnswers[currentIndex] !== undefined) return;
    const current = questions[currentIndex];
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: optionIndex });
    setChatHistory(prev => [...prev, { message: current.options[optionIndex], sender: 'user' }]);

    setTimeout(() => {
      setChatHistory(prev => [...prev, { message: current.feedback[optionIndex], sender: 'robby' }]);
    }, 700);
  };

  const goToNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setChatHistory(prev => [...prev, { message: questions[nextIndex].question, sender: 'robby' }]);
    } else {
      setChatHistory(prev => [
        ...prev,
        { message: "🎉 ¡Simulación finalizada! Revisa tu perfil para descubrir nuevas rutas vocacionales.", sender: "robby" }
      ]);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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
            Decisión {questions.length > 0 ? currentIndex + 1 : 0} de {questions.length}
          </Text>
        </View>

        <ProgressBar value={((currentIndex + 1) / questions.length) * 100} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2F32CD" />
            <Text>Cargando simulación...</Text>
          </View>
        ) : (
          chatHistory.map((chat, idx) => (
            <ChatBubble key={idx} message={chat.message} sender={chat.sender} />
          ))
        )}

        {!isLoading && questions[currentIndex] && selectedAnswers[currentIndex] === undefined && (
          <View style={{ marginTop: 16 }}>
            {questions[currentIndex].options.map((opt, idx) => (
              <OptionButton key={idx} option={opt} selected={false} onPress={() => handleOptionSelect(idx)} />
            ))}
          </View>
        )}

        {!isLoading && selectedAnswers[currentIndex] !== undefined && (
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
