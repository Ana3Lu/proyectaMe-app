import { supabase } from "@/utils/supabase";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

interface Goal {
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

const GoalsContext = createContext<GoalsContextProps | null>(null);

export const GoalsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [goals, setGoals] = useState<Goal[]>([]);

  const fetchGoals = useCallback(async () => {
    const { data } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

    setGoals(data || []);
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) fetchGoals();
  }, [user?.id, fetchGoals]);

  const addGoal = async (title: string, description: string) => {
    const { data } = await supabase
      .from("goals")
      .insert({
        user_id: user?.id,
        title,
        description,
      })
      .select()
      .single();

    setGoals(prev => [data, ...prev]);
  };

  const editGoal = async (id: string, fields: Partial<Goal>) => {
    const { data } = await supabase
      .from("goals")
      .update(fields)
      .eq("id", id)
      .select()
      .single();

    setGoals(prev => prev.map(g => (g.id === id ? data : g)));
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

    setGoals(prev => prev.map(g => (g.id === id ? data : g)));
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

export const useGoals = () => useContext(GoalsContext);
