import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { GeminiResponse } from '../../types/responses.type';

interface Question {
  question: string;
  options: string[];
  correctOption: number;
}

export default function MainScreen() {

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: number }>({});
  const [showAnswers, setShowAnswers] = useState<{ [key: number]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    getIAResponse();
  }, []);

  const getIAResponse = async () => {
    const body = {
      "contents": [{
        "parts": [
          { "text": "List of question about general culture about Colombia." }
        ]
      }],
      "generationConfig": {
        "responseMimeType": "application/json",
        "responseSchema": {
          "type": "ARRAY",
          "items": {
            "type": "OBJECT",
            "properties": {
              "question": { "type": "STRING" },
              "options": {
                "type": "ARRAY",
                "items": { "type": "STRING" }
              },
              "correctOption": { "type": "NUMBER" }
            }
          }
        }
      }
    };

    try {
      setIsLoading(true);
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
        method: "POST",
        headers: {
          "x-goog-api-key": process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? "",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const data: GeminiResponse = await response.json();
       console.log("Raw data from Gemini:", JSON.stringify(data, null, 2));

      // Validar que los datos existan
      const textData = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (textData) {
        try {
          const questionsData = JSON.parse(textData);
          if (Array.isArray(questionsData)) {
            setQuestions(questionsData);
          } else {
            console.warn("La respuesta de la IA no es un array de preguntas válido:", textData);
          }
        } catch (err) {
          console.warn("Error parseando la respuesta de la IA:", textData, err);
        }
      } else {
        console.warn("No llegaron datos de preguntas de la IA");
      }

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderQuestionCard = (question: Question, index: number) => (
    <View key={index} style={{ padding: 20, margin: 10, borderWidth: 1, borderRadius: 10, width: '90%' }}>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>{question.question}</Text>
      {question.options.map((option, idx) => (
        <TouchableOpacity
          key={idx}
          style={{
            padding: 10,
            marginVertical: 5,
            backgroundColor: selectedAnswer[index] === idx ? 'lightblue' : 'white',
            borderWidth: 1,
            borderRadius: 5
          }}
          onPress={() => setSelectedAnswer({ ...selectedAnswer, [index]: idx })}
        >
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
      {showAnswers[index] && (
        <Text style={{ marginTop: 10, color: selectedAnswer[index] === question.correctOption ? 'green' : 'red' }}>
          Correct answer: {question.options[question.correctOption]}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => setShowAnswers({ ...showAnswers, [index]: true })}
        style={{ marginTop: 10 }}
      >
        <Text>Show Answer</Text>
      </TouchableOpacity>
    </View>
  );

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
    >
      {isLoading ? (
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 25 }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando preguntas...</Text>
        </View>
      ) : (
        currentQuestion
          ? renderQuestionCard(currentQuestion, currentQuestionIndex)
          : <Text>No se pudieron cargar las preguntas.</Text>
      )}
    </ScrollView>
  );
}
