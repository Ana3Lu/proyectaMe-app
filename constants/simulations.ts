export interface SimulationMeta {
  id: string;
  title: string;
  desc: string;
  category: string;
  color: string;
  time: string;
  users: string;
  stars: string;
  topicPrompt: string;
}

export const SIMULATIONS: SimulationMeta[] = [
  {
    id: "medico",
    title: "Médico",
    desc: "Experimenta las decisiones diarias de un profesional de la salud en urgencias.",
    category: "Salud",
    color: "#6FD8C6",
    time: "5–7 min",
    users: "2.341",
    stars: "4.2",
    topicPrompt: "Simulación sobre la vida de un médico en urgencias."
  },
  {
    id: "laboratorio",
    title: "Investigador de Laboratorio",
    desc: "Descubre el mundo de la investigación médica y científica",
    category: "Salud",
    color: "#6FD8C6",
    time: "6–8 min",
    users: "1.586",
    stars: "4.6",
    topicPrompt: "Simulación sobre dilemas científicos en un laboratorio."
  },
  {
    id: "enfermeria",
    title: "Enfermero",
    desc: "Vive un día en la vida de un enfermero en un hospital ocupado.",
    category: "Salud",
    color: "#6FD8C6",
    time: "5–7 min",
    users: "2.004",
    stars: "4.4",
    topicPrompt: "Simulación sobre el trabajo de un enfermero en un hospital."  
  },
  {
    id: "diseno",
    title: "Diseñador Gráfico",
    desc: "Crea un proyecto visual desde el concepto hasta la ejecución.",
    category: "Creatividad",
    color: "#8FB7FF",
    time: "7–9 min",
    users: "3.798",
    stars: "4.9",
    topicPrompt: "Simulación sobre el trabajo de un diseñador en un estudio creativo."
  },
  {
    id: "musica",
    title: "Productor Musical",
    desc: "Explora el proceso creativo de producir una canción.",
    category: "Creatividad",
    color: "#8FB7FF",
    time: "6–8 min",
    users: "1.020",
    stars: "4.7",
    topicPrompt: "Simulación sobre desafíos reales en la producción musical."
  },
  {
    id: "carpintero",
    title: "Carpintero",
    desc: "Construye muebles y aprende técnicas de carpintería.",
    category: "Creatividad",
    color: "#8FB7FF",
    time: "6–8 min",
    users: "1.120",
    stars: "4.8",
    topicPrompt: "Simulación sobre el trabajo de un carpintero en un taller de carpintería."
  },
  {
    id: "fotografo",
    title: "Fotógrafo",
    desc: "Dirige una sesión fotográfica desde la planificación hasta la edición.",
    category: "Creatividad",
    color: "#8FB7FF",
    time: "6–8 min",
    users: "1.120",
    stars: "4.8",
    topicPrompt: "Simulación sobre el trabajo de un fotógrafo en una sesión fotográfica."
  },
  {
    id: "dev",
    title: "Desarrollador de Software",
    desc: "Toma decisiones técnicas y creativas en un proyecto digital.",
    category: "Tecnología",
    color: "#BD9D1E",
    time: "6–8 min",
    users: "5.120",
    stars: "4.8",
    topicPrompt: "Simulación sobre decisiones en el desarrollo de aplicaciones web y móviles."
  },
  {
    id: "ciberseguridad",
    title: "Especialista en Ciberseguridad",
    desc: "Protege sistemas y datos frente a amenazas digitales.",
    category: "Tecnología",
    color: "#BD9D1E",
    time: "6–8 min",
    users: "1.120",
    stars: "4.8",
    topicPrompt: "Simulación sobre el trabajo de un especialista en ciberseguridad."
  },
  {
    id: "analistaDatos",
    title: "Analista de Datos",
    desc: "Interpreta datos para tomar decisiones informadas.",
    category: "Tecnología",
    color: "#BD9D1E",
    time: "6–8 min",
    users: "1.120",
    stars: "4.8",
    topicPrompt: "Simulación sobre el trabajo de un analista de datos."
  },
  {
    id: "emprendedor",
    title: "Emprendedor",
    desc: "Navega los desafíos de iniciar y hacer crecer un negocio.",
    category: "Negocios",
    color: "#FF7F50",
    time: "7–9 min",
    users: "4.230",
    stars: "4.9",
    topicPrompt: "Simulación sobre el proceso de lanzar y gestionar una startup."
  },
  {
    id: "ventas",
    title: "Especialista en Ventas",
    desc: "Desarrolla tácticas para cerrar tratos y satisfacer clientes.",
    category: "Negocios",
    color: "#FF7F50",  
    time: "6–8 min",  
    users: "1.120",  
    stars: "4.8",  
    topicPrompt: "Simulación sobre el trabajo de un especialista en ventas."
  },
  {
    id: "astronomo",
    title: "Astrónomo",
    desc: "Explora el universo y toma decisiones en investigaciones astronómicas.",
    category: "Ciencia",
    color: "#dda0c7ff",
    time: "7–9 min",
    users: "2.340",
    stars: "4.7",
    topicPrompt: "Simulación sobre el trabajo de un astronomo en un observatorio astronómico."
  },
  {
    id: "biologo",
    title: "Biólogo",
    desc: "Realiza investigaciones y toma decisiones en estudios de campo.",
    category: "Ciencia",
    color: "#dda0c7ff",
    time: "6–8 min",
    users: "1.120",
    stars: "4.8",
    topicPrompt: "Simulación sobre el trabajo de un biólogo en estudios de campo."
  }
];