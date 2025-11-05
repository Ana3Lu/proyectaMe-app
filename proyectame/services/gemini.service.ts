import { GeminiResponse } from '../types/responses.type';
import { SimulationQuestion } from '../types/simulation.type';

export const fetchNextSimulationStep = async (
  previousSteps: SimulationQuestion[]
): Promise<SimulationQuestion> => {
  const previousContext = previousSteps.length
    ? JSON.stringify(previousSteps)
    : '[]';

  const body = {
    contents: [
      {
        parts: [
          {
            text: `Genera una simulación narrativa interactiva para mi app vocacional ProyectaME que sirve para que 
              los usuarios puedan sentir por medio de una simulacion los tipos de dilemas o situaciones que podrían ocurrir
              en distintos oficios o profesiones.
                La simulación debe tener 6 decisiones secuenciales (es como si fuera un cuestionario pero
                todo se presenta como historia por medio de chats donde el usuario va haciendo la simulación junto con 
                robby, un asistente virtual de la app que serás tú y que va chateando con el usuario presentando el 
                contexto de la situación de la simulación y demás, y luego le pregunta qué haría el usuario, donde el responde y 
                presentas una retroalimentación de su decisión en la situación y continuas narrando hasta acabar la simulación), 
                cada decisión con:
                - question: escenario o situación a resolver
                - options: mínimo 4 opciones de respuesta
                - feedback: retroalimentación para cada opción

                - strengths: habilidades asociadas a cada opción (ej: empatía, lkiderazgo, creatividad)`
          }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          question: { type: 'STRING' },
          options: { type: 'ARRAY', items: { type: 'STRING' } },
          feedback: { type: 'ARRAY', items: { type: 'STRING' } },
          strengths: { type: 'ARRAY', items: { type: 'STRING' } }
        }
      }
    }
  };

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'x-goog-api-key': process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const data: GeminiResponse = await response.json();
        console.log('Raw data from Gemini:', JSON.stringify(data, null, 2));
    const textData = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log('Text data from Gemini:', textData);

    if (textData) {
      try {
        return JSON.parse(textData) as SimulationQuestion;
      } catch (e) {
        console.error('Error parsing Gemini JSON:', e, textData);
        throw e;
      }
    }

    throw new Error('No se recibió texto de Gemini');
  } catch (err) {
    console.error('Error fetching Gemini step:', err);
    throw err;
  }
};
