export interface SimulationQuestion {
  question: string;           // Escenario o decisión a tomar
  options: string[];          // Opciones del usuario
  feedback: string[];         // Retroalimentación por opción
  strengths: string[];        // Habilidades asociadas a cada opción
}