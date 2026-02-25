import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("kaamsetu_user");
    const token = localStorage.getItem("kaamsetu_token");

    if (stored && token) {
      try {
        // Validate token format (must have 3 parts)
        if (token.split(".").length !== 3) {
          throw new Error("Invalid token format");
        }
        setUser(JSON.parse(stored));
      } catch {
        // Clear corrupted data
        localStorage.removeItem("kaamsetu_user");
        localStorage.removeItem("kaamsetu_token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (phone, password) => {
    const res = await api.post("/auth/login", { phone, password });

    // Backend returns FLAT object: { token, id, name, phone, role, ... }
    const data = res.data;

    // Extract user info (everything except token)
    const userData = {
      id: data.id,
      name: data.name,
      phone: data.phone,
      role: data.role,
      skills: data.skills || [],
      rating: data.rating || 0,
      tasksCompleted: data.tasksCompleted || 0,
      createdAt: data.createdAt,
    };

    setUser(userData);
    localStorage.setItem("kaamsetu_user", JSON.stringify(userData));
    localStorage.setItem("kaamsetu_token", data.token);

    toast.success(`Welcome back, ${userData.name}!`);
    return userData;
  };

  const register = async ({ name, phone, password, role, skills }) => {
    const res = await api.post("/auth/register", {
      name,
      phone,
      password,
      role,
      skills: skills || [],
    });

    // Backend returns FLAT object: { token, id, name, phone, role, ... }
    const data = res.data;

    const userData = {
      id: data.id,
      name: data.name,
      phone: data.phone,
      role: data.role,
      skills: data.skills || [],
      rating: data.rating || 0,
      tasksCompleted: data.tasksCompleted || 0,
      createdAt: data.createdAt,
    };

    setUser(userData);
    localStorage.setItem("kaamsetu_user", JSON.stringify(userData));
    localStorage.setItem("kaamsetu_token", data.token);

    toast.success(`Welcome to KaamSetu, ${userData.name}!`);
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("kaamsetu_user");
    localStorage.removeItem("kaamsetu_token");
    toast.success("Logged out successfully");
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem("kaamsetu_user", JSON.stringify(updated));
    toast.success("Profile updated!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};