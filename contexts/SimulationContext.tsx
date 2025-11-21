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

  const { updateCareerAffinity } = useVocational();
  const { markSimulationCompleted } = useVocational();

  const saveSimulationResults = (simulationId: string, skills: Record<string, number>) => {
    setSummary({
      skills,
      lastSimulation: simulationId
    });

    // Calcular promedio para puntuación de la carrera
    const totalScore = Math.round(
      Object.values(skills).reduce((a, b) => a + b, 0) /
      Object.keys(skills).length
    );

    // Asigna SOLO a esa carrera
    updateCareerAffinity(simulationId, totalScore);

    // Marca simulación hecha
    markSimulationCompleted(simulationId);
  };

  const resetSimulation = () => setSummary(null);

  return (
    <SimulationContext.Provider value={{ summary, saveSimulationResults, resetSimulation }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => useContext(SimulationContext);
