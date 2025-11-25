import { SIMULATIONS } from "@/constants/simulations";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

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
  updateCareerAffinity: (id: string, score: number) => Promise<void>;
  completedSimulations: string[];
  markSimulationCompleted: (id: string) => Promise<void>;
  userLevel: number;
  levelUp: () => void;
  stats: {
    completed: number;
    total: number;
  };
}

const VocationalContext = createContext<VocationalContextProps | null>(null);

export const VocationalProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);

  // 🔹 Lista de simulaciones permitidas según plan
  const allowedSimulations = user?.plan_type === "premium"
    ? SIMULATIONS
    : SIMULATIONS.slice(0, 5); // Free solo las primeras 5

  const [careers, setCareers] = useState<CareerNode[]>(
    allowedSimulations.map((sim, index) => ({
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
  const levelUp = () => setUserLevel(prev => Math.min(prev + 1, MAX_LEVEL));

  const updateCareerAffinity = async (id: string, score: number) => {
    setCareers(prev =>
      prev.map(c => (c.id === id ? { ...c, affinity: score } : c))
    );
  };

  const markSimulationCompleted = async (id: string) => {
    setCompletedSimulations(prev => [...prev, id]);
  };

  const stats = {
    completed: completedSimulations.length,
    total: allowedSimulations.length,
  };

  // 🔹 Actualizamos nodos si cambia el usuario (ej: free -> premium)
  useEffect(() => {
    const updatedCareers = (user?.plan_type === "premium" ? SIMULATIONS : SIMULATIONS.slice(0, 5))
      .map((sim, index) => ({
        id: sim.id,
        name: sim.title,
        category: sim.category,
        affinity: 0,
        x: CONSTELLATION_POSITIONS[index % CONSTELLATION_POSITIONS.length].x,
        y: CONSTELLATION_POSITIONS[index % CONSTELLATION_POSITIONS.length].y,
      }));
    setCareers(updatedCareers);
  }, [user?.plan_type]);

  return (
    <VocationalContext.Provider value={{
      careers,
      updateCareerAffinity,
      completedSimulations,
      markSimulationCompleted,
      userLevel,
      levelUp,
      stats,
    }}>
      {children}
    </VocationalContext.Provider>
  );
};

export const useVocational = () => useContext(VocationalContext)!;
