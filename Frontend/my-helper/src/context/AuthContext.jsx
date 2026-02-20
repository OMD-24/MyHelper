import { createContext, useContext, useState, useEffect } from "react";
import { MOCK_USERS } from "../data/mockData";
import toast from "react-hot-toast";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("kaamsetu_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("kaamsetu_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (phone, password) => {
  const res = await api.post("/auth/login", {
    phone,
    password,
  });

  const { token, user } = res.data;

  setUser(user);
  localStorage.setItem("kaamsetu_user", JSON.stringify(user));
  localStorage.setItem("kaamsetu_token", token);

  toast.success(`Welcome back, ${user.name}!`);
  return user;
};

  const register = async (data) => {
  const res = await api.post("/auth/register", data);

  const { token, user } = res.data;

  setUser(user);
  localStorage.setItem("kaamsetu_user", JSON.stringify(user));
  localStorage.setItem("kaamsetu_token", token);

  toast.success(`Welcome to KaamSetu, ${user.name}!`);
  return user;
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