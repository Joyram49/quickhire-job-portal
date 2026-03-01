"use client";

import { createContext, useEffect, useState, ReactNode } from "react";

import * as authService from "@/services/auth/authService";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: typeof authService.login;
  signup: typeof authService.signup;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  //  fetch logged-in user
  const refreshUser = async () => {
    try {
      const res = await authService.getMe();
      setUser(res.data as User);
    } catch {
      setUser(null);
    }
  };

  //  restore session on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authService.getMe();
        setUser(res.data as User);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login: authService.login,
    signup: authService.signup,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
