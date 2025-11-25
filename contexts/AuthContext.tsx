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
  avatar_url?: string | null;
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

// Default avatar require
const DEFAULT_AVATAR = require("../assets/images/robby.png");

// Helper to sanitize avatar
const sanitizeAvatar = (avatar: any): string | null => {
  if (!avatar) return null;
  if (typeof avatar !== "string") return null;
  const val = avatar.trim();
  if (!val || val === "null" || val === "undefined") return null;
  return val;
};

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getStreak = useCallback(async () => {
    if (!user?.id) return null;
    const { data, error } = await supabase
      .from("user_streaks")
      .select("current_streak, last_activity")
      .eq("user_id", user.id)
      .single();
    if (error) return null;
    return data;
  }, [user?.id]);

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileData) {
          setUser({
            ...profileData,
            avatar_url: sanitizeAvatar(profileData.avatar_url)
          });
        }
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

          if (profileData) {
            setUser({
              ...profileData,
              avatar_url: sanitizeAvatar(profileData.avatar_url)
            });
          }
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
      if (error || !data.user) return false;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (!profileData) {
        setUser({
          id: data.user.id,
          email: data.user.email!,
          name: data.user.email?.split("@")[0] || "Usuario",
          points: 0,
          bio: "hello!",
          avatar_url: null,
        });
      } else {
        setUser({
          ...profileData,
          avatar_url: sanitizeAvatar(profileData.avatar_url)
        });
      }

      await supabase.rpc("update_user_streak", { p_user_id: data.user.id });
      return true;
    } catch {
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
      if (error || !data.user) return false;

      await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          name: name.trim(),
          email: email.trim(),
          points: 0,
          bio: "hello!",
          avatar_url: null,
          plan_type: "free",
        });

      setUser({ id: data.user.id, name, email, points: 0, avatar_url: null });
      return true;
    } catch {
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
      const dataToUpdate = { ...profileData };
      delete (dataToUpdate as any).updated_at;

      const { error } = await supabase
        .from("profiles")
        .update(dataToUpdate)
        .eq("id", user.id);

      if (error) throw error;

      const nextAvatar = sanitizeAvatar(profileData.avatar_url) ?? user.avatar_url;

      setUser(prev => prev ? { ...prev, ...profileData, avatar_url: nextAvatar } : prev);
      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const resetPasswordSimulated = async (email: string) => {
    if (!email.includes("@")) return false;
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