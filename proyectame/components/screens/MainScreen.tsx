import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SimulationQuestion } from '../../types/simulation.type';
import { ChatBubble } from '../ui/ChatBubble';
import { OptionButton } from '../ui/OptionButton';
import { ProgressBar } from '../ui/ProgressBar';
import { fetchNextSimulationStep } from '../../services/gemini.service';

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
    loadNextStep(); // Cargar primer paso
  }, []);

  const loadNextStep = async () => {
    setIsLoading(true);
    try {
      const nextStep = await fetchNextSimulationStep(questions);
      console.log('Paso de Gemini cargado:', nextStep);
      setQuestions([...questions, nextStep]);
    } catch (err) {
      console.warn('Fallo al cargar paso de Gemini, puedes usar fallback local');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedAnswers[currentQuestionIndex] !== undefined) return;

    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: optionIndex });

    const skillKey = questions[currentQuestionIndex].strengths?.[optionIndex];
    if (skillKey) {
      setUserScore({ ...userScore, [skillKey]: (userScore[skillKey] || 0) + 1 });
    }
  };

  const goToNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (questions.length < 6) {
      // Generar siguiente paso solo si no hemos completado los 6
      await loadNextStep();
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
          <ProgressBar value={((currentQuestionIndex + 1) / 6) * 100} />
          {selectedAnswers[currentQuestionIndex] !== undefined && (
            <Text
              style={{ marginTop: 12, fontWeight: 'bold', color: '#0288d1', textAlign: 'center' }}
              onPress={goToNext}
            >
              Siguiente
            </Text>
          )}
        </View>
      ) : (
        <Text>No se pudieron cargar las simulaciones.</Text>
      )}
    </ScrollView>
  );
}
