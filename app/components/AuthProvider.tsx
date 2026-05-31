"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { AuthRole } from "@/app/types";

interface AuthContextValue {
  role: AuthRole;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<AuthRole>("recruiter");

  useEffect(() => {
    if (localStorage.getItem("portfolio_role") === "admin") setRole("admin");
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setRole("admin");
        localStorage.setItem("portfolio_role", "admin");
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message ?? "Login gagal." };
    } catch {
      return { success: false, message: "Tidak dapat terhubung ke server." };
    }
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setRole("recruiter");
    localStorage.removeItem("portfolio_role");
  }, []);

  return (
    <AuthContext.Provider value={{ role, isAdmin: role === "admin", login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
