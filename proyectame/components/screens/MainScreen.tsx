import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SimulationQuestion } from '../../types/simulation.type';
import { ChatBubble } from '../ui/ChatBubble';
import { OptionButton } from '../ui/OptionButton';
import { ProgressBar } from '../ui/ProgressBar';
import { fetchSimulationFromGemini } from '../../services/gemini.service';

interface UserScore {
  [key: string]: number;
}

export default function MainScreen() {
  const [questions, setQuestions] = useState<SimulationQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [userScore, setUserScore] = useState<UserScore>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSimulation();
  }, []);

  const loadSimulation = async () => {
    setIsLoading(true);
    const data = await fetchSimulationFromGemini();
    setQuestions(data);
    setIsLoading(false);
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: optionIndex });
    const key = `strength-${currentQuestionIndex}-${optionIndex}`;
    setUserScore({ ...userScore, [key]: (userScore[key] || 0) + 1 });
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Simulación terminada. Puntuación:', userScore);
      alert('¡Simulación finalizada! Revisa tu perfil para sugerencias de carrera.');
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ScrollView style={{ flex: 1, padding: 16 }} contentContainerStyle={{ alignItems: 'center' }}>
      {isLoading ? (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando simulación...</Text>
        </View>
      ) : currentQuestion ? (
        <View style={{ width: '100%' }}>
          <ChatBubble message={currentQuestion.question} sender="robby" />
          {currentQuestion.options.map((opt, idx) => (
            <OptionButton
              key={idx}
              option={opt}
              selected={selectedAnswers[currentQuestionIndex] === idx}
              onPress={() => handleOptionSelect(idx)}
            />
          ))}
          {selectedAnswers[currentQuestionIndex] !== undefined && (
            <ChatBubble
              message={currentQuestion.feedback[selectedAnswers[currentQuestionIndex]]}
              sender="robby"
            />
          )}
          <ProgressBar value={((currentQuestionIndex + 1) / questions.length) * 100} />
          <Text
            style={{ marginTop: 12, fontWeight: 'bold', color: '#0288d1', textAlign: 'center' }}
            onPress={goToNext}
          >
            Siguiente
          </Text>
        </View>
      ) : (
        <Text>No se pudieron cargar las simulaciones.</Text>
      )}
    </ScrollView>
  );
}
