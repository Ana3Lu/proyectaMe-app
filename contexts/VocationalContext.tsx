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
  unlocked: boolean;
  x: number;
  y: number;
}

const INITIAL_CAREERS: CareerNode[] = SIMULATIONS.map(sim => ({
  id: sim.id,
  name: sim.title,
  category: sim.category,
  affinity: 0,
  unlocked: false,
  x: CONSTELLATION_POSITIONS[SIMULATIONS.indexOf(sim) % CONSTELLATION_POSITIONS.length].x,
  y: CONSTELLATION_POSITIONS[SIMULATIONS.indexOf(sim) % CONSTELLATION_POSITIONS.length].y,
}));

interface VocationalContextProps {
  careers: CareerNode[];
  updateAffinity: (category: string, score: number) => void;
  unlockCareer: (id: string) => void;

  // 👇 LO NUEVO
  completedSimulations: string[];
  markSimulationCompleted: (id: string) => void;

  stats: {
    unlocked: number;
    inProgress: number;
    total: number;
  };
}

const VocationalContext = createContext<VocationalContextProps | null>(null);

export const VocationalProvider = ({ children }: { children: ReactNode }) => {
  const [careers, setCareers] = useState<CareerNode[]>(INITIAL_CAREERS);

  // 👇 NUEVO
  const [completedSimulations, setCompletedSimulations] = useState<string[]>([]);

  function markSimulationCompleted(id: string) {
    setCompletedSimulations(prev =>
      prev.includes(id) ? prev : [...prev, id]
    );

    // 🔓 desbloquear carrera en el mapa automáticamente
    setCareers(prev =>
      prev.map(c =>
        c.id === id ? { ...c, unlocked: true } : c
      )
    );
  }

  const updateAffinity = (category: string, score: number) => {
    setCareers(prev =>
      prev.map(c =>
        c.category === category
          ? { ...c, affinity: Math.min(100, c.affinity + score) }
          : c
      )
    );
  };

  const unlockCareer = (id: string) => {
    setCareers(prev =>
      prev.map(c =>
        c.id === id ? { ...c, unlocked: true } : c
      )
    );
  };

  const stats = {
    unlocked: careers.filter(c => c.unlocked).length,
    inProgress: careers.filter(c => c.affinity > 0 && c.affinity < 60).length,
    total: careers.length,
  };

  return (
    <VocationalContext.Provider
      value={{
        careers,
        updateAffinity,
        unlockCareer,
        stats,

        completedSimulations,
        markSimulationCompleted,
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
