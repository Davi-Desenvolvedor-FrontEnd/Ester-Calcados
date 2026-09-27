import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { getToken, getCargo } from "../auth";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string, cargo: string, userId: string, expiresIn: Date) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const timerRef = useRef<number | null>(null);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("cargo");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiresIn");
    setIsAuthenticated(false);
    setIsAdmin(false);
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const checkAuth = useCallback(() => {
    const token = getToken();
    const expiresIn = localStorage.getItem("expiresIn");

    if (!token || !expiresIn) {
      logout();
      return false;
    }

    const expirationDate = new Date(expiresIn);
    if (isNaN(expirationDate.getTime()) || expirationDate <= new Date()) {
      logout();
      return false;
    }

    setIsAuthenticated(true);
    setIsAdmin(getCargo() === "adm");
    return true;
  }, [logout]);

  const scheduleAutoLogout = useCallback(() => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);

    const expiresIn = localStorage.getItem("expiresIn");
    if (!expiresIn) return;

    const ms = new Date(expiresIn).getTime() - Date.now();
    if (ms <= 0) {
      logout();
      return;
    }

    // setTimeout tem limite de ~24.8 dias
    if (ms > 2_147_483_647) return;

    timerRef.current = window.setTimeout(logout, ms);
  }, [logout]);

  const login = useCallback(
    (token: string, cargo: string, userId: string, expiresIn: Date) => {
      localStorage.setItem("token", token);
      localStorage.setItem("cargo", cargo);
      localStorage.setItem("userId", userId);
      localStorage.setItem("expiresIn", expiresIn.toISOString());
      checkAuth();
      scheduleAutoLogout();
    },
    [checkAuth, scheduleAutoLogout]
  );

  useEffect(() => {
    if (checkAuth()) scheduleAutoLogout();
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, [checkAuth, scheduleAutoLogout]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}