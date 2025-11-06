export interface SimulationQuestion {
  question: string;   // Escenario o decisión a tomar
  options: string[];  // Opciones del usuario
  feedback: string[]; // Retroalimentación por opción
  scores: number[];   // Puntajes de afinidad
  skills: string[];   // Habilidades blandas asociadas
}
