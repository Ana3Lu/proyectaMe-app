import { AuthContext } from "@/contexts/AuthContext";
import { useVocational } from "@/contexts/VocationalContext";
import { supabase } from "@/utils/supabase";
import { createContext, useContext, useState } from "react";

interface SimulationSummary {
  skills: Record<string, number>;
  lastSimulation: string | null;
}

interface SimulationContextProps {
  summary: SimulationSummary | null;
  saveSimulationResults: (simulationId: string, skills: Record<string, number>) => Promise<void>;
  resetSimulation: () => void;
}

const mapSkillToAffinity = (skill: string): string | null => {
  const mapping: Record<string, string> = {
    creatividad: "diseño",
    empatía: "psicología",
    liderazgo: "administración",
    adaptabilidad: "sostenibilidad",
    comunicación: "comunicación",
    "trabajo en equipo": "coaching",
    ética: "servicio público"
  };

  return mapping[skill.toLowerCase()] ?? null;
};

const SimulationContext = createContext<SimulationContextProps>({
  summary: null,
  saveSimulationResults: async () => {},
  resetSimulation: () => {},
});

export const SimulationProvider = ({ children }: any) => {
  const [summary, setSummary] = useState<SimulationSummary | null>(null);

  const { user } = useContext(AuthContext);
  const { updateCareerAffinity, markSimulationCompleted } = useVocational();

  const saveSimulationResults = async (simulationId: string, skills: Record<string, number>) => {
    if (!user) return;

    setSummary({ skills, lastSimulation: simulationId });

    const totalScore = Math.round(
      Object.values(skills).reduce((a, b) => a + b, 0) /
      Object.keys(skills).length
    );

    // GUARDAR RESULTADO DE SIMULACIÓN EN SUPABASE
    await supabase.from("simulations_results").insert({
      user_id: user.id,
      simulation_id: simulationId,
      score: totalScore,
      skills,
    });

    // GUARDAR AFINIDADES BASADAS EN LOS PORCENTAJES
    const affinitiesToInsert = Object.keys(skills)
      .filter(skill => skills[skill] >= 70) // si sacó más de 70%
      .map(skill => {
        const affinity = mapSkillToAffinity(skill);
        return affinity
          ? { user_id: user.id, affinity }
          : null;
      })
      .filter(Boolean);

    if (affinitiesToInsert.length > 0) {
      await supabase.from("user_affinities").insert(affinitiesToInsert);
    }

    // ACTUALIZAR AFINIDAD
    await updateCareerAffinity(simulationId, totalScore);

    // MARCAR COMPLETADA
    await markSimulationCompleted(simulationId);
  };

  const resetSimulation = () => setSummary(null);

  return (
    <SimulationContext.Provider value={{ summary, saveSimulationResults, resetSimulation }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => useContext(SimulationContext);