import { createContext, useCallback, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export interface Profile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  phone?: string;
  gender?: string;
  points?: number;
  avatar_url?: string;
  role?: string;
  plan_type?: string;
  plan_expires_at?: string;
  created_at?: string;
}

interface AuthContextProps {
  user: Profile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  updateProfile: (profileData: Partial<Profile>) => Promise<boolean>;
  setUser: (user: Profile | null) => void;
  logout: () => Promise<void>;
  resetPasswordSimulated: (email: string) => Promise<boolean>;
  getStreak: () => Promise<any>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get user streak
  const getStreak = useCallback(async () => {
    if (!user?.id) return null;
    const { data, error } = await supabase
      .from("user_streaks")
      .select("current_streak, last_activity")
      .eq("user_id", user.id)
      .single();
    if (error) {
      console.error("Error fetching streak:", error.message);
      return null;
    }
    return data;
  }, [user?.id]);

  // Load user session
  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        if (profileData) setUser(profileData);
      }
    };
    loadUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          if (profileData) setUser(profileData);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, []);

  // LOGIN
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.user) {
        alert(error?.message || "Login failed");
        return false;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileError || !profileData) {
        // fallback simple profile
        setUser({
          id: data.user.id,
          email: data.user.email!,
          name: data.user.email?.split("@")[0] || "Usuario",
          points: 0,
          bio: "hello!",
        });
      } else {
        setUser(profileData);
      }

      // Update streak
      await supabase.rpc("update_user_streak", { p_user_id: data.user.id });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // REGISTER
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error || !data.user) {
        alert(error?.message || "Registration failed");
        return false;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          name: name.trim(),
          email: email.trim(),
          points: 0,
          bio: "hello!",
          plan_type: "free",
        });

      if (profileError) {
        alert(profileError.message);
        return false;
      }

      setUser({ id: data.user.id, name, email, points: 0 });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATE PROFILE
  const updateProfile = async (profileData: Partial<Profile>) => {
    if (!user?.id) return false;
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ ...profileData })
        .eq("id", user.id);
      if (error) throw error;

      setUser(prev => prev ? { ...prev, ...profileData } : prev);
      return true;
    } catch (err) {
      console.error("Update profile error:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // LOGOUT
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // SIMULATED PASSWORD RESET
  const resetPasswordSimulated = async (email: string) => {
    if (!email.includes("@")) {
      alert("Invalid email");
      return false;
    }
    alert(`If an account exists with ${email}, an email will be sent.`);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, updateProfile, setUser, logout, resetPasswordSimulated, getStreak }}
    >
      {children}
    </AuthContext.Provider>
  );
};
