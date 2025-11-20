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
    title: "Día como Médico",
    desc: "Experimenta decisiones diarias en urgencias.",
    category: "Salud",
    color: "#6FD8C6",
    time: "5–7 min",
    users: "2.341",
    stars: "4.2",
    topicPrompt: "Simulación sobre la vida de un médico en urgencias."
  },
  {
    id: "laboratorio",
    title: "Laboratorio de Investigación",
    desc: "Descubre el mundo de la investigación científica.",
    category: "Salud",
    color: "#6FD8C6",
    time: "6–8 min",
    users: "1.586",
    stars: "4.6",
    topicPrompt: "Simulación sobre dilemas científicos en un laboratorio."
  },
  {
    id: "diseno",
    title: "Estudio de Diseño",
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
    title: "Producción musical",
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
    title: "Taller de Carpintería",
    desc: "Construye muebles y aprende técnicas de carpintería.",
    category: "Creatividad",
    color: "#8FB7FF",
    time: "6–8 min",
    users: "1.120",
    stars: "4.8",
    topicPrompt: "Simulación sobre el trabajo de un carpintero en un taller de carpintería."
  },
  {
    id: "dev",
    title: "Desarrollador de Apps",
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
  }
];