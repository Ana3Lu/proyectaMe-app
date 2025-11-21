import { SIMULATIONS } from "@/constants/simulations";
import { useVocational } from "@/contexts/VocationalContext";
import { createContext, useContext, useState } from "react";

interface SimulationSummary {
  skills: Record<string, number>; 
  lastSimulation: string | null;
}

interface SimulationContextProps {
  summary: SimulationSummary | null;
  saveSimulationResults: (simulationId: string, skills: Record<string, number>) => void;
  resetSimulation: () => void;
}

const SimulationContext = createContext<SimulationContextProps>({
  summary: null,
  saveSimulationResults: () => {},
  resetSimulation: () => {},
});

export const SimulationProvider = ({ children }: any) => {
  const [summary, setSummary] = useState<SimulationSummary | null>(null);

  const { updateAffinity, unlockCareer, careers } = useVocational();

  const saveSimulationResults = (simulationId: string, skills: Record<string, number>) => {
    
    // Guardar para la pantalla de Feedback
    setSummary({
      skills,
      lastSimulation: simulationId
    });

    const sim = SIMULATIONS.find(s => s.id === simulationId);
    if (!sim) return;

    const category = sim.category;

    // Convertimos skills a un puntaje total promedio
    const totalScore = Math.round(
      Object.values(skills).reduce((a, b) => a + b, 0) / Object.keys(skills).length
    );

    // Sumamos afinidad a la categoría
    updateAffinity(category, totalScore);

    // Ver si se desbloquea esta carrera
    const career = careers.find(c => c.id === simulationId);
    if (!career) return;

    if (career.affinity + totalScore >= 60) {
      unlockCareer(simulationId);
    }
  };

  const resetSimulation = () => setSummary(null);

  return (
    <SimulationContext.Provider value={{ summary, saveSimulationResults, resetSimulation }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => useContext(SimulationContext);