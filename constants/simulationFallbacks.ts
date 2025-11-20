import { SimulationQuestion } from "@/types/simulation.type";

export const FALLBACK_SIMULATIONS: Record<string, SimulationQuestion[]> = {
  medico: [
    {
      question: "Un paciente llega muy ansioso diciendo que no lo atienden rápido. ¿Qué haces?",
      options: [
        "Lo escuchas y explicas con calma el proceso.",
        "Le dices que debe esperar como todos.",
        "Lo ignoras para evitar más tensión.",
        "Intentas adelantarlo sin consultar al equipo."
      ],
      feedback: [
        "Excelente: reduces ansiedad y mantienes orden.",
        "Correcto, pero frío: puede elevar el estrés.",
        "Ignorar empeora la relación paciente-médico.",
        "Riesgoso: rompes el flujo del servicio."
      ],
      scores: [5, 2, 1, 3],
      skills: ["Comunicación", "Empatía", "Ética", "Adaptabilidad"]
    },
    {
      question: "Un compañero está sobrecargado y te pide ayuda con un paciente.",
      options: [
        "Lo ayudas si puedes.",
        "Le dices que espere.",
        "Das instrucciones a distancia.",
        "Pides a otro que lo apoye."
      ],
      feedback: [
        "Trabajo en equipo ideal.",
        "Demoras la atención general.",
        "Puede generar errores.",
        "Ayuda, pero evades responsabilidad."
      ],
      scores: [5, 2, 1, 3],
      skills: ["Trabajo en equipo", "Ética", "Comunicación", "Adaptabilidad"]
    },
    {
      question: "Un paciente se niega a recibir un procedimiento simple.",
      options: [
        "Escuchas y explicas riesgos/beneficios.",
        "Respetas su decisión sin explicar nada.",
        "Insistes hasta que acepte.",
        "Delegas el caso sin hablar con él."
      ],
      feedback: [
        "Excelente manejo de autonomía + claridad.",
        "Correcto pero incompleto.",
        "Poco ético y controlador.",
        "Falta responsabilidad profesional."
      ],
      scores: [5, 3, 1, 2],
      skills: ["Comunicación", "Ética", "Empatía", "Liderazgo"]
    }
  ],

  laboratorio: [
    {
      question: "Notas que una muestra está mal rotulada. ¿Qué haces?",
      options: [
        "Detienes el proceso y verificas con el equipo.",
        "Continuas esperando que no afecte.",
        "La descartas sin avisar.",
        "La envías igual para no retrasar."
      ],
      feedback: [
        "Excelente control de calidad.",
        "Riesgoso para los resultados.",
        "Falta de trazabilidad.",
        "Puede comprometer el estudio."
      ],
      scores: [5, 2, 1, 1],
      skills: ["Ética", "Pensamiento crítico", "Comunicación", "Trabajo en equipo"]
    },
    {
      question: "El equipo solicita un análisis urgente fuera de tu turno.",
      options: [
        "Evalúas si es seguro hacerlo y ayudas.",
        "Lo ignoras, no es tu turno.",
        "Lo haces rápido sin revisar.",
        "Lo delegas sin informar."
      ],
      feedback: [
        "Gran compromiso profesional.",
        "Puede retrasar decisiones clínicas.",
        "Riesgoso para el paciente.",
        "Falta comunicación."
      ],
      scores: [5, 1, 1, 2],
      skills: ["Trabajo en equipo", "Ética", "Responsabilidad", "Comunicación"]
    },
    {
      question: "El software del laboratorio muestra un error inesperado.",
      options: [
        "Sigues protocolos y reportas.",
        "Reinicias sin avisar al equipo.",
        "Ignoras el mensaje.",
        "Intentas corregirlo sin conocimiento."
      ],
      feedback: [
        "Excelente adherencia a protocolos.",
        "Puede causar pérdida de datos.",
        "Riesgo alto de errores.",
        "Puedes empeorar el fallo."
      ],
      scores: [5, 3, 1, 1],
      skills: ["Ética", "Liderazgo", "Adaptabilidad", "Comunicación"]
    }
  ],

  enfermeria: [
    {
      question: "Un paciente tiene dolor persistente y nadie ha pasado revisarlo.",
      options: [
        "Verificas signos y avisas al médico.",
        "Le dices que espere.",
        "Ignoras la solicitud.",
        "Le das un medicamento sin autorización."
      ],
      feedback: [
        "Excelente criterio clínico.",
        "Correcto pero frío.",
        "Poco profesional.",
        "Riesgoso y no ético."
      ],
      scores: [5, 2, 1, 1],
      skills: ["Empatía", "Ética", "Comunicación", "Liderazgo"]
    },
    {
      question: "Un familiar exige información que no puedes dar.",
      options: [
        "Explicas límites y contactas al médico.",
        "Le das la información igual.",
        "Lo ignoras.",
        "Le dices que busque al médico sin más."
      ],
      feedback: [
        "Excelente manejo ético.",
        "Violación a la privacidad.",
        "Poco profesional.",
        "Correcto pero incompleto."
      ],
      scores: [5, 1, 1, 3],
      skills: ["Ética", "Comunicación", "Empatía", "Liderazgo"]
    },
    {
      question: "Un paciente está a punto de caer al intentar levantarse solo.",
      options: [
        "Lo acompañas y aseguras el entorno.",
        "Le dices que no se levante.",
        "Llamas a otro sin intervenir.",
        "Ignoras la situación."
      ],
      feedback: [
        "Prevención activa excelente.",
        "Correcto pero pasivo.",
        "Puede ser tarde.",
        "Muy riesgoso."
      ],
      scores: [5, 3, 1, 1],
      skills: ["Empatía", "Adaptabilidad", "Liderazgo", "Ética"]
    }
  ],

  diseno: [
    {
      question: "El cliente te pide un cambio que arruina la estética del diseño. ¿Qué haces?",
      options: [
        "Explicas por qué afecta el resultado.",
        "Aceptas sin comentar.",
        "Te molestas y lo contradices.",
        "Haces una versión alternativa."
      ],
      feedback: [
        "Gran comunicación profesional.",
        "Puede afectar la calidad.",
        "Poco profesional.",
        "Excelente iniciativa creativa."
      ],
      scores: [5, 2, 1, 4],
      skills: ["Comunicación", "Adaptabilidad", "Ética", "Creatividad"]
    },
    {
      question: "Tu diseño no cumple los requisitos técnicos.",
      options: [
        "Revisas las especificaciones y ajustas.",
        "Ignoras y entregas igual.",
        "Culpas al cliente.",
        "Haces un parche rápido."
      ],
      feedback: [
        "Excelente rigor.",
        "Riesgoso profesionalmente.",
        "Poco profesional.",
        "Solución rápida pero pobre."
      ],
      scores: [5, 1, 1, 2],
      skills: ["Pensamiento crítico", "Ética", "Comunicación", "Creatividad"]
    },
    {
      question: "Tu equipo propone un estilo diferente al tuyo.",
      options: [
        "Evalúas y consideras su propuesta.",
        "Defiendes el tuyo sin escucharlos.",
        "Aceptas por evitar discusiones.",
        "Los ignoras."
      ],
      feedback: [
        "Gran trabajo colaborativo.",
        "Falta apertura.",
        "Evitas el conflicto sin criterio.",
        "Cierra la creatividad del equipo."
      ],
      scores: [5, 2, 2, 1],
      skills: ["Comunicación", "Trabajo en equipo", "Creatividad", "Adaptabilidad"]
    }
  ],

  musica: [
    {
      question: "El artista quiere un cambio de último minuto en la mezcla.",
      options: [
        "Evalúas impacto y ajustas si es viable.",
        "Te niegas automáticamente.",
        "Lo cambias sin revisar.",
        "Lo ignoras esperando que olvide."
      ],
      feedback: [
        "Excelente manejo creativo.",
        "Poco flexible.",
        "Riesgoso técnicamente.",
        "Poco profesional."
      ],
      scores: [5, 2, 1, 1],
      skills: ["Creatividad", "Adaptabilidad", "Comunicación", "Ética"]
    },
    {
      question: "Tu software de audio empieza a fallar.",
      options: [
        "Reinicias sesión y verificas plugins.",
        "Ignoras los fallos.",
        "Sigues grabando igual.",
        "Culpas al artista."
      ],
      feedback: [
        "Excelente control técnico.",
        "Puede dañar la grabación.",
        "Muy riesgoso.",
        "Poco profesional."
      ],
      scores: [5, 1, 1, 1],
      skills: ["Liderazgo", "Adaptabilidad", "Ética", "Pensamiento crítico"]
    },
    {
      question: "Una pista no encaja en la mezcla.",
      options: [
        "Revisas niveles y ecualización.",
        "La duplicas sin pensar.",
        "La silencias.",
        "Pides al músico regrabar."
      ],
      feedback: [
        "Excelente criterio técnico.",
        "Poco efectivo.",
        "Solución extrema.",
        "Buena estrategia cuando es necesario."
      ],
      scores: [5, 2, 1, 4],
      skills: ["Creatividad", "Pensamiento crítico", "Comunicación", "Ética"]
    }
  ],

  carpintero: [
    {
      question: "Te das cuenta que una pieza está mal medida.",
      options: [
        "La corriges antes de seguir.",
        "La ajustas al final.",
        "Ignoras el error.",
        "Haces una nueva pieza."
      ],
      feedback: [
        "Muy profesional.",
        "Puede afectar el ensamblaje.",
        "Poco ético.",
        "Excelente iniciativa."
      ],
      scores: [5, 2, 1, 4],
      skills: ["Adaptabilidad", "Ética", "Calidad", "Responsabilidad"]
    },
    {
      question: "Tu herramienta principal deja de funcionar.",
      options: [
        "Usas una alternativa segura.",
        "La fuerzas para terminar.",
        "Pides ayuda.",
        "Ignoras el problema."
      ],
      feedback: [
        "Gran adaptabilidad.",
        "Peligroso.",
        "Buena colaboración.",
        "Riesgoso."
      ],
      scores: [5, 1, 4, 1],
      skills: ["Adaptabilidad", "Seguridad", "Trabajo en equipo", "Ética"]
    },
    {
      question: "El cliente cambia el diseño a mitad del proyecto.",
      options: [
        "Evalúas impacto y ajustas costos.",
        "Aceptas sin preguntar.",
        "Te molestas.",
        "Ignoras y sigues el plan original."
      ],
      feedback: [
        "Excelente gestión profesional.",
        "Puede afectarte.",
        "Poco profesional.",
        "Falta de comunicación."
      ],
      scores: [5, 2, 1, 1],
      skills: ["Comunicación", "Ética", "Adaptabilidad", "Responsabilidad"]
    }
  ],

  fotografo: [
    {
      question: "El modelo está incómodo durante la sesión.",
      options: [
        "Hablas y ajustas la dinámica.",
        "Sigues como si nada.",
        "Terminas rápido.",
        "Lo ignoras."
      ],
      feedback: [
        "Excelente comunicación.",
        "Poco profesional.",
        "Resultados pobres.",
        "Descuido total."
      ],
      scores: [5, 1, 2, 1],
      skills: ["Empatía", "Comunicación", "Creatividad", "Liderazgo"]
    },
    {
      question: "La luz natural cambia drásticamente.",
      options: [
        "Ajustas configuración.",
        "Sigues igual.",
        "Cancela sesión.",
        "Culpas al clima."
      ],
      feedback: [
        "Excelente adaptación.",
        "Fotos inconsistentes.",
        "Medida extrema.",
        "Nada profesional."
      ],
      scores: [5, 2, 1, 1],
      skills: ["Adaptabilidad", "Técnica", "Creatividad", "Responsabilidad"]
    },
    {
      question: "Tu cámara marca error.",
      options: [
        "Revisas batería y tarjeta.",
        "La golpeas.",
        "Sigues disparando.",
        "Pides equipo de respaldo."
      ],
      feedback: [
        "Excelente diagnóstico.",
        "Riesgoso.",
        "Puede dañar archivos.",
        "Buena alternativa."
      ],
      scores: [5, 1, 1, 4],
      skills: ["Pensamiento crítico", "Adaptabilidad", "Responsabilidad", "Comunicación"]
    }
  ],

  dev: [
    {
      question: "Tu app tiene un bug crítico antes de entregar.",
      options: [
        "Revisas logs y priorizas.",
        "Lo ignoras.",
        "Culpas a otro.",
        "Reviertes a versión estable."
      ],
      feedback: [
        "Excelente manejo técnico.",
        "Muy riesgoso.",
        "Poco profesional.",
        "Válido pero lento."
      ],
      scores: [5, 1, 1, 4],
      skills: ["Adaptabilidad", "Ética", "Liderazgo", "Comunicación"]
    },
    {
      question: "El equipo no entiende tu solución técnica.",
      options: [
        "Explicas con diagramas.",
        "Los culpas por no entender.",
        "Cambias todo sin razón.",
        "Ignoras comentarios."
      ],
      feedback: [
        "Excelente comunicación.",
        "Daño al equipo.",
        "Poco profesional.",
        "Cierra la colaboración."
      ],
      scores: [5, 2, 1, 1],
      skills: ["Comunicación", "Trabajo en equipo", "Liderazgo", "Ética"]
    },
    {
      question: "Tu repositorio tiene conflictos de merge.",
      options: [
        "Los resuelves con calma.",
        "Fuerzas un push.",
        "Borras los cambios ajenos.",
        "Pides ayuda con contexto."
      ],
      feedback: [
        "Gran técnica.",
        "Riesgoso.",
        "Poco ético.",
        "Buena colaboración."
      ],
      scores: [5, 1, 1, 4],
      skills: ["Pensamiento crítico", "Ética", "Comunicación", "Trabajo en equipo"]
    }
  ],

  ciberseguridad: [
    {
      question: "Detectas un intento de phishing.",
      options: [
        "Alertas al equipo.",
        "Ignoras.",
        "Rastrear atacante solo.",
        "Rastrear sin permiso."
      ],
      feedback: [
        "Excelente respuesta profesional.",
        "Negligente.",
        "Riesgoso.",
        "Poco ético."
      ],
      scores: [5, 1, 1, 4],
      skills: ["Comunicación", "Ética", "Liderazgo", "Pensamiento crítico"]
    },
    {
      question: "Un empleado usa una contraseña débil.",
      options: [
        "Le explicas riesgos.",
        "Lo ignoras.",
        "Lo reportas sin hablar.",
        "Cambias la contraseña sin avisar."
      ],
      feedback: [
        "Excelente educación preventiva.",
        "Riesgoso.",
        "Correcto pero frío.",
        "Poco ético."
      ],
      scores: [5, 1, 3, 1],
      skills: ["Comunicación", "Ética", "Adaptabilidad", "Liderazgo"]
    },
    {
      question: "Encuentras un servidor expuesto.",
      options: [
        "Cierras acceso y reportas.",
        "Documentas sin actuar.",
        "Ignoras.",
        "Intentas repararlo sin saber."
      ],
      feedback: [
        "Excelente acción inmediata.",
        "Puede tardar demasiado.",
        "Muy riesgoso.",
        "Puede empeorar vulnerabilidad."
      ],
      scores: [5, 3, 1, 1],
      skills: ["Liderazgo", "Ética", "Pensamiento crítico", "Comunicación"]
    }
  ],

  analistaDatos: [
    {
      question: "Los datos tienen valores faltantes.",
      options: [
        "Analizas impacto y decides técnica.",
        "Ignoras los valores.",
        "Inventas datos.",
        "Eliminas todo sin revisar."
      ],
      feedback: [
        "Excelente rigor.",
        "Riesgos altos.",
        "Poco profesional.",
        "Puede destruir el dataset."
      ],
      scores: [5, 2, 1, 1],
      skills: ["Pensamiento crítico", "Ética", "Comunicación", "Liderazgo"]
    },
    {
      question: "El equipo no entiende tu visualización.",
      options: [
        "Simplificas y explicas.",
        "Los culpas.",
        "Ignoras comentarios.",
        "Cargas más gráficos sin criterio."
      ],
      feedback: [
        "Gran comunicación.",
        "Poco empático.",
        "Cierra retroalimentación.",
        "Confunde más."
      ],
      scores: [5, 1, 1, 2],
      skills: ["Comunicación", "Trabajo en equipo", "Pensamiento crítico", "Ética"]
    },
    {
      question: "Un modelo no da buenos resultados.",
      options: [
        "Revisas features y ajustas.",
        "Cambias de modelo al azar.",
        "Ignoras rendimiento.",
        "Culpas a los datos."
      ],
      feedback: [
        "Excelente criterio analítico.",
        "Sin estrategia.",
        "Muy riesgoso.",
        "Poco profesional."
      ],
      scores: [5, 1, 1, 2],
      skills: ["Pensamiento crítico", "Ética", "Responsabilidad", "Comunicación"]
    }
  ],

  emprendedor: [
    {
      question: "Tu MVP tiene errores y el demo es mañana.",
      options: [
        "Enfocas en corregir lo crítico.",
        "Cambias todo el producto.",
        "Ignoras los errores.",
        "Cancelas el demo."
      ],
      feedback: [
        "Excelente priorización.",
        "Perderías tiempo.",
        "Muy riesgoso.",
        "Evitas desafíos."
      ],
      scores: [5, 2, 1, 1],
      skills: ["Liderazgo", "Pensamiento crítico", "Adaptabilidad", "Responsabilidad"]
    },
    {
      question: "Un inversionista pide cifras que no tienes.",
      options: [
        "Admites y prometes enviar datos reales.",
        "Inventas números.",
        "Cambias de tema.",
        "Te enojas."
      ],
      feedback: [
        "Excelente transparencia.",
        "Poco ético.",
        "Poco profesional.",
        "Muy poco estratégico."
      ],
      scores: [5, 1, 1, 1],
      skills: ["Ética", "Comunicación", "Liderazgo", "Responsabilidad"]
    },
    {
      question: "Tu equipo está desmotivado.",
      options: [
        "Hablas y escuchas causas reales.",
        "Ignoras emociones.",
        "Das órdenes más estrictas.",
        "Les dices que trabajen más."
      ],
      feedback: [
        "Excelente liderazgo humano.",
        "Poco empático.",
        "Control sin estrategia.",
        "Causa más burnout."
      ],
      scores: [5, 2, 1, 1],
      skills: ["Comunicación", "Liderazgo", "Empatía", "Ética"]
    }
  ],

  ventas: [
    {
      question: "El cliente duda sobre comprar.",
      options: [
        "Escuchas y respondes objeciones.",
        "Presionas para cerrar.",
        "Ignoras sus dudas.",
        "Ofreces un descuento inmediato."
      ],
      feedback: [
        "Excelente técnica de ventas.",
        "Puede alejar al cliente.",
        "Poco profesional.",
        "No es sostenible."
      ],
      scores: [5, 1, 1, 3],
      skills: ["Comunicación", "Ética", "Empatía", "Negociación"]
    },
    {
      question: "Tu CRM está desactualizado.",
      options: [
        "Actualizas y organizas.",
        "Ignoras.",
        "Culpas al sistema.",
        "Pides ayuda sin revisarlo."
      ],
      feedback: [
        "Excelente disciplina comercial.",
        "Puede perder clientes.",
        "Poco profesional.",
        "Correcto, pero incompleto."
      ],
      scores: [5, 1, 1, 3],
      skills: ["Responsabilidad", "Ética", "Comunicación", "Liderazgo"]
    },
    {
      question: "Un cliente quiere algo que no existe.",
      options: [
        "Exploras alternativas posibles.",
        "Prometes funciones inexistentes.",
        "Lo ignoras.",
        "Le dices que no se puede sin explicaciones."
      ],
      feedback: [
        "Excelente solución consultiva.",
        "Muy poco ético.",
        "Poca atención.",
        "Correcto pero frío."
      ],
      scores: [5, 1, 1, 3],
      skills: ["Comunicación", "Ética", "Empatía", "Negociación"]
    }
  ],

  astronomo: [
    {
      question: "El telescopio presenta lecturas inconsistentes.",
      options: [
        "Revisas calibración.",
        "Ignoras.",
        "Culpas al clima sin verificar.",
        "Pides ayuda técnica."
      ],
      feedback: [
        "Excelente protocolo.",
        "Riesgoso.",
        "Poco analítico.",
        "Buena colaboración."
      ],
      scores: [5, 1, 1, 4],
      skills: ["Pensamiento crítico", "Responsabilidad", "Comunicación", "Ética"]
    },
    {
      question: "Descubres un patrón extraño.",
      options: [
        "Verificas datos.",
        "Publicas de inmediato.",
        "Lo ignoras.",
        "Culpas al software."
      ],
      feedback: [
        "Excelente rigor científico.",
        "Prematuro.",
        "Puede perder información.",
        "Falta análisis."
      ],
      scores: [5, 2, 1, 1],
      skills: ["Pensamiento crítico", "Ética", "Comunicación", "Liderazgo"]
    },
    {
      question: "Un colega propone una teoría distinta.",
      options: [
        "Analizas juntos.",
        "Descartas sin escuchar.",
        "Evitas hablarlo.",
        "Presentas solo tu enfoque."
      ],
      feedback: [
        "Gran colaboración científica.",
        "Poca apertura.",
        "Evita crecimiento.",
        "Individualista."
      ],
      scores: [5, 2, 2, 1],
      skills: ["Comunicación", "Trabajo en equipo", "Pensamiento crítico", "Ética"]
    }
  ],

  biologo: [
    {
      question: "Un animal observado cambia su comportamiento.",
      options: [
        "Documentas y analizas.",
        "Ignoras.",
        "Asumes causa sin evidencia.",
        "Detienes estudio."
      ],
      feedback: [
        "Excelente método científico.",
        "Falta rigurosidad.",
        "Poco profesional.",
        "Medida extrema."
      ],
      scores: [5, 2, 1, 1],
      skills: ["Pensamiento crítico", "Ética", "Comunicación", "Responsabilidad"]
    },
    {
      question: "El clima afecta la observación.",
      options: [
        "Adaptas técnicas.",
        "Cancelas sin evaluar.",
        "Ignoras limitantes.",
        "Culpas al equipo."
      ],
      feedback: [
        "Gran adaptabilidad.",
        "Falta análisis.",
        "Poco científico.",
        "Poco profesional."
      ],
      scores: [5, 1, 1, 1],
      skills: ["Adaptabilidad", "Ética", "Pensamiento crítico", "Trabajo en equipo"]
    },
    {
      question: "Encuentras una muestra dañada.",
      options: [
        "La descartas y registras.",
        "Intentas usarla igual.",
        "La ignoras.",
        "Culpas sin investigar."
      ],
      feedback: [
        "Excelente trazabilidad.",
        "Riesgoso.",
        "Poco profesional.",
        "Sin evidencia."
      ],
      scores: [5, 1, 1, 1],
      skills: ["Ética", "Responsabilidad", "Pensamiento crítico", "Comunicación"]
    }
  ]
};


// GENÉRICO
export const GENERIC_FALLBACK: SimulationQuestion[] = [
  {
    question: "Necesitas tomar una decisión importante con poca información. ¿Qué haces?",
    options: [
      "Analizo lo disponible y decido.",
      "Pido opinión a alguien con experiencia.",
      "Actúo rápido confiando en mi intuición.",
      "Busco más datos antes de decidir."
    ],
    feedback: [
      "Gran equilibrio bajo incertidumbre.",
      "Excelente trabajo colaborativo.",
      "Valiente, pero arriesgado.",
      "Muy buen enfoque analítico."
    ],
    scores: [5, 4, 2, 4],
    skills: ["Adaptabilidad", "Comunicación", "Liderazgo", "Pensamiento crítico"]
  },
  {
    question: "Recibes una crítica sobre tu trabajo.",
    options: [
      "Escuchas y preguntas cómo mejorar.",
      "La ignoras.",
      "Respondes de forma defensiva.",
      "La aceptas pero sin cambiar nada."
    ],
    feedback: [
      "Excelente crecimiento profesional.",
      "Pierdes una oportunidad de mejora.",
      "Poco profesional.",
      "Falta reflexión real."
    ],
    scores: [5, 1, 1, 2],
    skills: ["Adaptabilidad", "Ética", "Comunicación", "Liderazgo"]
  },
  {
    question: "Tu equipo no está alineado en una tarea.",
    options: [
      "Propones aclarar roles y objetivos.",
      "Esperas a que se organicen solos.",
      "Haces todo tú por rapidez.",
      "Delegas sin explicar."
    ],
    feedback: [
      "Gran liderazgo colaborativo.",
      "Puede seguir el caos.",
      "Te sobrecargas y limitas al equipo.",
      "Genera confusión."
    ],
    scores: [5, 2, 1, 1],
    skills: ["Liderazgo", "Comunicación", "Trabajo en equipo", "Adaptabilidad"]
  },
  {
    question: "Tienes varias tareas urgentes al tiempo.",
    options: [
      "Priorizas por impacto.",
      "Las haces en el orden que llegaron.",
      "Haces muchas a la vez.",
      "Delegas sin revisar."
    ],
    feedback: [
      "Muy buena gestión del tiempo.",
      "Puede no ser eficiente.",
      "Multitarea baja calidad.",
      "Delegar sin control es riesgoso."
    ],
    scores: [5, 3, 2, 1],
    skills: ["Adaptabilidad", "Liderazgo", "Pensamiento crítico", "Comunicación"]
  },
  {
    question: "Hay una herramienta que no sabes usar.",
    options: [
      "Buscas tutoriales y practicas.",
      "Pides ayuda.",
      "Intentas usarla sin entender.",
      "Evitas usarla."
    ],
    feedback: [
      "Excelente autonomía.",
      "Buena colaboración.",
      "Riesgoso.",
      "Limita tu crecimiento."
    ],
    scores: [5, 4, 2, 1],
    skills: ["Aprendizaje", "Comunicación", "Adaptabilidad", "Ética"]
  },
  {
    question: "Algo sale mal en una entrega.",
    options: [
      "Asumes responsabilidad y corriges.",
      "Culpas al entorno.",
      "Ignoras el fallo.",
      "Esperas a que alguien más lo arregle."
    ],
    feedback: [
      "Muy profesional y ético.",
      "Evita el crecimiento.",
      "Poco profesional.",
      "Falta compromiso."
    ],
    scores: [5, 1, 1, 1],
    skills: ["Ética", "Liderazgo", "Adaptabilidad", "Pensamiento crítico"]
  }
];
