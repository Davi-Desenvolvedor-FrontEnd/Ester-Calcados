import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { getToken, getCargo } from "../auth";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string, cargo: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAuth = () => {
    const token = getToken();
    const cargo = getCargo();
    setIsAuthenticated(!!token);
    setIsAdmin(cargo === "adm");
    console.log("Auth check:", {
      token,
      cargo,
      isAuthenticated: !!token,
      isAdmin: cargo === "adm",
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (token: string, cargo: string, userId: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("cargo", cargo);
    localStorage.setItem("userId", userId);
    checkAuth();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cargo");
    localStorage.removeItem("userId");
    checkAuth();
  };

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
