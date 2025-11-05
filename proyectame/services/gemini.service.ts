import { GeminiResponse } from '../types/responses.type';
import { SimulationQuestion } from '../types/simulation.type';

export const fetchSimulation = async (): Promise<SimulationQuestion[]> => {
  const body = {
  "contents": [
    {
      "parts": [
        {
          "text": `Genera 6 preguntas (decisiones secuenciales) de simulación vocacional con esta estructura estricta en JSON, donde siempre siga
          el siguiente formato con las posibles respuestas para el usuario:
              [
                  {
                      "question": "texto de la pregunta",
                      "options": ["opción 1", "opción 2", "opción 3", "opción 4"], 
                      "feedback": ["retroalimentación 1", "retroalimentación 2", "retroalimentación 3", "retroalimentación 4"]
                  }
              ], esto para tener una simulación narrativa interactiva para mi app vocacional ProyectaME que sirve para que 
            los usuarios puedan sentir por medio de una simulación los tipos de dilemas o situaciones que podrían ocurrir
            en distintos oficios o profesiones. Como si fuera un cuestionario pero
              todo se presenta como historia por medio de chats donde el usuario va haciendo la simulación junto con 
              robby, un asistente virtual de la app que serás tú (aunque tú no lo mencionas, empiezas de una vez explicando
              el escenario de la simulación de ese momento) y que va chateando con el usuario presentando el contexto de la situación de la simulación 
              y demás, y luego le pregunta qué haría el usuario, donde él responde y presentas una retroalimentación 
              de su decisión en la situación y continuas narrando hasta acabar la simulación.`
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
          "options": { 
            "type": "ARRAY", 
            "items": { "type": "STRING" } 
          },
          "feedback": { 
            "type": "ARRAY", 
            "items": { "type": "STRING" } 
          }
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
    console.log("Raw data from Gemini:", JSON.stringify(data, null, 2));

    // Extraemos el texto
    const textData = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textData) {
      console.warn("No llegaron datos de Gemini");
      return [];
    }

    // Intentamos parsear a JSON
    try {
      const parsedData = JSON.parse(textData);
      if (Array.isArray(parsedData)) {
        // Validamos propiedades de cada pregunta
        parsedData.forEach((q: SimulationQuestion) => {
        // Solo rellenar si no existe
        if (!q.options || q.options.length === 0) q.options = ['Opción 1','Opción 2','Opción 3','Opción 4'];
        if (!q.feedback || q.feedback.length === 0) q.feedback = q.options.map(() => 'Retroalimentación pendiente');
        });
        return parsedData;
      } else {
        console.warn("La respuesta de Gemini no es un array:", textData);
        return [];
      }
    } catch (err) {
      console.warn("Error parseando la respuesta de Gemini:", textData, err);
      return [];
    }
  } catch (err) {
    console.error("Error fetching Gemini simulation:", err);
    return [];
  }
};

//"strengths": ["(# puntaje) habilidad1", "(# puntaje) habilidad2", "(# puntaje) habilidad3", "(# puntaje) habilidad4"]
                    //if (!q.strengths || q.strengths.length === 0) q.strengths = [];
        //            strengths: { type: 'ARRAY', items: { type: 'STRING' } }
