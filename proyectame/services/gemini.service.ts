import { GeminiResponse } from '../types/responses.type';
import { SimulationQuestion } from '../types/simulation.type';

export const fetchSimulationFromGemini = async (): Promise<SimulationQuestion[]> => {
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

                Ejemplo de simulaciones: Día como médico, Estudio de diseño, Desarrollador de apps.
                Devuelve un array JSON de objetos siguiendo esta estructura.`
            }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            question: { type: 'STRING' },
            options: { type: 'ARRAY', items: { type: 'STRING' } },
            feedback: { type: 'ARRAY', items: { type: 'STRING' } }
          }
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
    const textData = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (textData) {
      return JSON.parse(textData) as SimulationQuestion[];
    }

    return [];
  } catch (err) {
    console.error('Error fetching Gemini simulation:', err);
    return [];
  }
};
