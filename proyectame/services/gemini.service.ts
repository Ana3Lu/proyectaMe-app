import { GeminiResponse } from '../types/responses.type';
import { SimulationQuestion } from '../types/simulation.type';

export const fetchSimulation = async () => {
  const body = {
  "contents": [
    {
      "parts": [
        {
          "text": `Genera una array de objetos que es una simulación narrativa de solo 6 decisiones tipo cuestionario (tamaño de array), interactiva para mi app vocacional ProyectaME que sirve para que 
              los usuarios puedan sentir por medio de una simulacion los tipos de dilemas o situaciones que podrían ocurrir
              en distintos oficios o profesiones.
                La simulación debe tener 6 decisiones secuenciales (es como si fuera un cuestionario pero
                todo se presenta como historia por medio de chats donde el usuario va haciendo la simulación junto con 
                robby, un asistente virtual de la app que serás tú (pero no te menciones... inicia con la simulación de una vez) y que va chateando con el usuario presentando el 
                contexto de la situación de la simulación y demás, y luego le pregunta qué haría el usuario, donde el responde y 
                presentas una retroalimentación de su decisión en la situación y continuas narrando hasta acabar la simulación), 
                cada decisión (que es un objeto de la simulación dentro de un array) debe tener la siguiente estructura con:
                - question: escenario o situación a resolver (string)
                - options: mínimo 4 opciones de respuesta posibles (array de strings)
                - feedback: retroalimentación para cada opción (equivalente a la cantidad de opciones, array de strings)

                Ejemplo de simulaciones: Día como médico, Estudio de diseño, Desarrollador de apps.
                Devuelve un array JSON de objetos siguiendo esta estructura... Asi simple y claro, sin nada adicional, y el feedback debe ser concreto y breve (1-2 frases máximo).`
        }
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

    if (!textData) return [];

    try {
      const parsedData: SimulationQuestion[] = JSON.parse(textData);
      if (Array.isArray(parsedData)) {
        // Aseguramos opciones y feedback por seguridad
        parsedData.forEach(q => {
          if (!q.options || q.options.length !== 4) q.options = ['Opción 1','Opción 2','Opción 3','Opción 4'];
          if (!q.feedback || q.feedback.length !== 4) q.feedback = q.options.map(() => 'Retroalimentación pendiente');
        });
        return parsedData;
      } else {
        console.warn('Respuesta de Gemini no es un array:', textData);
        return [];
      }
    } catch (err) {
      console.warn('Error parseando respuesta de Gemini:', textData, err);
      return [];
    }
  } catch (err) {
    console.error('Error fetching Gemini simulation:', err);
    return [];
  }
};