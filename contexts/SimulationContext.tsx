import { createContext, useContext, useState } from "react";

interface SimulationSummary {
  skills: Record<string, number>; // porcentajes (0–100)
  totalDecisions: number;
  lastSimulation: string | null;
}

interface SimulationContextProps {
  summary: SimulationSummary | null;
  saveSimulationResults: (skills: Record<string, number>) => void;
  resetSimulation: () => void;
}

const SimulationContext = createContext<SimulationContextProps>({
  summary: null,
  saveSimulationResults: () => {},
  resetSimulation: () => {},
});

export const SimulationProvider = ({ children }: any) => {
  const [summary, setSummary] = useState<SimulationSummary | null>(null);

  // Ahora recibe porcentajes directamente
  const saveSimulationResults = (skills: Record<string, number>) => {
    setSummary({
      skills,
      totalDecisions: Object.keys(skills).length,
      lastSimulation: null,
    });
  };

  const resetSimulation = () => setSummary(null);

  return (
    <SimulationContext.Provider
      value={{ summary, saveSimulationResults, resetSimulation }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => useContext(SimulationContext);