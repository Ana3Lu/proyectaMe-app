import { GeminiResponse } from '../types/responses.type';
import { SimulationQuestion } from '../types/simulation.type';

export const fetchSimulation = async (): Promise<SimulationQuestion[]> => {
  const body = {
    contents: [
      {
        parts: [
          {
            text: "Retorna directamente una lista JSON con exactamente 6 decisiones secuenciales para una simulación narrativa tipo chat vocacional. Cada decisión representa un dilema o situación profesional donde el usuario debe elegir qué haría. La narrativa debe estar incluida dentro del campo 'question' (como si Robby presentara la situación, pero sin mencionarlo explícitamente). Cada decisión debe incluir: 4 opciones posibles ('options') y retroalimentación específica para cada opción ('feedback'). No incluyas texto introductorio, comentarios ni código Markdown — solo el array JSON. Ejemplos de simulaciones: 'Un día como médico', 'Estudio de diseño', 'Desarrollador de apps'."
          }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            question: { type: "STRING" },
            options: { type: "ARRAY", items: { type: "STRING" } },
            feedback: { type: "ARRAY", items: { type: "STRING" } }
          }
        }
      }
    }
  };

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "x-goog-api-key": process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data: GeminiResponse = await response.json();
    console.log("Raw data from Gemini:", JSON.stringify(data, null, 2));

    // 🧩 Obtener texto del modelo
    const textData = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textData) {
      console.warn("⚠️ No se recibió texto desde Gemini");
      return [];
    }

    // 🧹 Limpiar posibles bloques de Markdown o basura
    const cleanText = textData
      .replace(/```json/i, '')
      .replace(/```/g, '')
      .replace(/^[^{[]+/, '') // elimina texto antes del JSON
      .replace(/[^}\]]+$/, '') // elimina texto después del JSON
      .trim();

    console.log("🧾 Cleaned Gemini JSON:", cleanText);

    const parsedData: SimulationQuestion[] = JSON.parse(cleanText);

    if (Array.isArray(parsedData)) {
      // Validación mínima de estructura
      parsedData.forEach(q => {
        if (!q.options || q.options.length < 4)
          q.options = ["Opción 1", "Opción 2", "Opción 3", "Opción 4"];
        if (!q.feedback || q.feedback.length < 4)
          q.feedback = q.options.map(() => "Retroalimentación pendiente");
      });
      return parsedData;
    } else {
      console.warn("⚠️ La respuesta no es un array válido:", cleanText);
      return [];
    }

  } catch (err) {
    console.error("💥 Error al llamar a Gemini:", err);
    return [];
  }
};
