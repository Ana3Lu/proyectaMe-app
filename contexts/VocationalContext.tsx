import { SIMULATIONS } from "@/constants/simulations";
import { createContext, ReactNode, useContext, useState } from "react";

const CONSTELLATION_POSITIONS = [
  { x: 50, y: 10 },
  { x: 20, y: 25 },
  { x: 80, y: 25 },
  { x: 35, y: 55 },
  { x: 65, y: 55 },
  { x: 15, y: 80 },
  { x: 85, y: 80 }
];

export interface CareerNode {
  id: string;
  name: string;
  category: string;
  affinity: number; 
  x: number;
  y: number;
}

interface VocationalContextProps {
  careers: CareerNode[];
  updateCareerAffinity: (id: string, score: number) => void;

  completedSimulations: string[];
  markSimulationCompleted: (id: string) => void;

  userLevel: number;
  levelUp: () => void;

  stats: {
    completed: number;
    total: number;
  };
}

const VocationalContext = createContext<VocationalContextProps | null>(null);

export const VocationalProvider = ({ children }: { children: ReactNode }) => {
  const [careers, setCareers] = useState<CareerNode[]>(
    SIMULATIONS.map((sim, index) => ({
      id: sim.id,
      name: sim.title,
      category: sim.category,
      affinity: 0,
      x: CONSTELLATION_POSITIONS[index % CONSTELLATION_POSITIONS.length].x,
      y: CONSTELLATION_POSITIONS[index % CONSTELLATION_POSITIONS.length].y,
    }))
  );

  const [completedSimulations, setCompletedSimulations] = useState<string[]>([]);
  const [userLevel, setUserLevel] = useState(1);

  const MAX_LEVEL = 4;

  const levelUp = () => {
    setUserLevel(prev => Math.min(prev + 1, MAX_LEVEL));
  };

  function markSimulationCompleted(id: string) {
    setCompletedSimulations(prev => {
      if (prev.includes(id)) return prev;

      const updated = [...prev, id];

      if (updated.length % 3 === 0) levelUp();

      return updated;
    });
  }

  const updateCareerAffinity = (id: string, score: number) => {
    setCareers(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, affinity: Math.min(100, score) }
          : c
      )
    );
  };

  const stats = {
    completed: completedSimulations.length,
    total: careers.length,
  };

  return (
    <VocationalContext.Provider
      value={{
        careers,
        updateCareerAffinity,
        completedSimulations,
        markSimulationCompleted,
        stats,
        userLevel,
        levelUp,
      }}
    >
      {children}
    </VocationalContext.Provider>
  );
};

export const useVocational = () => {
  const ctx = useContext(VocationalContext);
  if (!ctx) throw new Error("useVocational debe usarse dentro de VocationalProvider");
  return ctx;
};
