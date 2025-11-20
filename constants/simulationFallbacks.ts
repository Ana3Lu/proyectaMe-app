import { SimulationQuestion } from "@/types/simulation.type";

export const FALLBACK_SIMULATIONS: Record<string, SimulationQuestion[]> = {
  medico: [
    {
      question: "Un paciente llega muy ansioso diciendo que no lo atienden rápido. ¿Qué haces?",
      options: [
        "Lo escuchas y explicas con calma el proceso.",
        "Le dices que debe esperar como todos.",
        "Lo ignoras para no alterar a los demás.",
        "Buscas acelerar su turno sin preguntar."
      ],
      feedback: [
        "Excelente: calma + información = confianza.",
        "Correcto pero frío, puede aumentar el estrés.",
        "Ignorar nunca ayuda en emergencias.",
        "Riesgoso: rompe la organización del servicio."
      ],
      scores: [5, 2, 1, 3],
      skills: ["Comunicación", "Ética", "Empatía", "Adaptabilidad"],
    },
    {
      question: "Un compañero está sobrecargado y te pide ayuda con un paciente.",
      options: [
        "Lo ayudas de inmediato si puedes.",
        "Le dices que espere a que termines todo.",
        "Le das instrucciones desde lejos.",
        "Pides a otro que lo ayude."
      ],
      feedback: [
        "Trabajo en equipo ideal.",
        "Demoras la atención general.",
        "Aporta poco y puede generar errores.",
        "No está mal, pero evades responsabilidad."
      ],
      scores: [5, 2, 1, 3],
      skills: ["Trabajo en equipo", "Ética", "Comunicación", "Adaptabilidad"],
    }
  ],

  diseno: [
    {
      question: "El cliente te pide un cambio que arruina la estética del diseño. ¿Qué haces?",
      options: [
        "Le explicas con claridad por qué afecta el resultado.",
        "Aceptas todo sin cuestionar.",
        "Te molestas y lo contradices.",
        "Haces una versión alternativa para mostrarle."
      ],
      feedback: [
        "Gran comunicación profesional.",
        "Puede resultar en un mal producto.",
        "Poco profesional.",
        "Muy buena iniciativa creativa."
      ],
      scores: [5, 2, 1, 4],
      skills: ["Comunicación", "Adaptabilidad", "Ética", "Creatividad"]
    }
  ],
  carpintero: [
    {
      question: "Te das cuenta que una pieza que cortaste está mal medida. ¿Qué haces?",
      options: [
        "La corriges antes de seguir.",
        "Sigues adelante y la ajustas al final.",
        "Ignoras el error, nadie lo notará.",
        "Haces una nueva pieza."
      ],
      feedback: [
        "Muy profesional.",
        "Riesgoso, puede afectar el ensamblaje.",
        "Poco ético y profesional.",
        "Muy buena iniciativa creativa."
      ],
      scores: [5, 2, 1, 4],
      skills: ["Comunicación", "Adaptabilidad", "Ética", "Creatividad"]
    }
  ],
  dev: [
    {
      question: "Tu app tiene un bug crítico justo antes de entregar. ¿Qué haces?",
      options: [
        "Respiras, revisas logs y priorizas el error.",
        "Lo ignoras esperando que no pase en la demo.",
        "Culpas al compañero que escribió esa parte.",
        "Reviertes a la última versión estable."
      ],
      feedback: [
        "Muy buen manejo de crisis.",
        "Altamente riesgoso.",
        "Crea conflictos, no soluciones.",
        "Técnicamente válido, pero lento."
      ],
      scores: [5, 1, 1, 4],
      skills: ["Adaptabilidad", "Ética", "Comunicación", "Liderazgo"]
    }
  ],
  ciberseguridad: [
    {
      question: "Detectas un intento de phishing en la red de la empresa. ¿Qué haces?",
      options: [
        "Alertas al equipo de TI y sigues protocolos.",
        "Ignoras el incidente, no es tu responsabilidad.",
        "Intentas rastrear al atacante por tu cuenta.",
        "Intentas rastrear al atacante por la red."
      ],
      feedback: [
        "Excelente respuesta profesional.",
        "Negligente y riesgoso.",
        "Poco profesional y riesgoso.",
        "Muy buena iniciativa creativa."
      ],
      scores: [5, 1, 1, 4],
      skills: ["Comunicación", "Adaptabilidad", "Ética", "Liderazgo"]
    }
  ],
};

// fallback genérico si no existe uno para el oficio
export const GENERIC_FALLBACK: SimulationQuestion[] = [
  {
    question: "Debes tomar una decisión importante en tu trabajo. ¿Qué haces?",
    options: [
      "Analizo todas las opciones.",
      "Pregunto la opinión de un colega.",
      "Actúo rápido confiando en mi intuición.",
      "Busco más información."
    ],
    feedback: [
      "Decisión equilibrada.",
      "Gran trabajo en equipo.",
      "Coraje, pero arriesgado.",
      "Muy buen enfoque investigativo."
    ],
    scores: [5, 4, 2, 4],
    skills: ["Adaptabilidad", "Comunicación", "Liderazgo", "Creatividad"],
  }
];