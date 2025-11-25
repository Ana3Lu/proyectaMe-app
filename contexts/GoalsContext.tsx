import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description: string;
  is_completed: boolean;
  created_at: string;
  completed_at?: string;
}

interface GoalsContextProps {
  goals: Goal[];
  addGoal: (title: string, description: string) => Promise<void>;
  editGoal: (id: string, fields: Partial<Goal>) => Promise<void>;
  completeGoal: (id: string) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
}

// Opción 1️⃣: el context nunca es null
const GoalsContext = createContext<GoalsContextProps>({} as GoalsContextProps);

interface GoalsProviderProps {
  children: ReactNode;
}

export const GoalsProvider: React.FC<GoalsProviderProps> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [goals, setGoals] = useState<Goal[]>([]);

  const fetchGoals = useCallback(async () => {
  if (!user?.id) {
    setGoals([]);
    return;
  }

    const { data } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setGoals(data || []);
  }, [user?.id]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const addGoal = async (title: string, description: string) => {
    if (!user?.id) return;

    const { data } = await supabase
      .from("goals")
      .insert({
        user_id: user.id,
        title,
        description,
      })
      .select()
      .single();

    if (data) setGoals(prev => [data, ...prev]);
  };

  const editGoal = async (id: string, fields: Partial<Goal>) => {
    const { data } = await supabase
      .from("goals")
      .update(fields)
      .eq("id", id)
      .select()
      .single();

    if (data) setGoals(prev => prev.map(g => (g.id === id ? data : g)));
  };

  const completeGoal = async (id: string) => {
    const { data } = await supabase
      .from("goals")
      .update({
        is_completed: true,
        completed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (data) setGoals(prev => prev.map(g => (g.id === id ? data : g)));
  };

  const deleteGoal = async (id: string) => {
    await supabase.from("goals").delete().eq("id", id);
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  return (
    <GoalsContext.Provider value={{ goals, addGoal, editGoal, completeGoal, deleteGoal }}>
      {children}
    </GoalsContext.Provider>
  );
};

// Hook para usar el context
export const useGoals = () => useContext(GoalsContext);
