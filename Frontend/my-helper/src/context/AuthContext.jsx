import { createContext, useContext, useState, useEffect } from "react";
import { MOCK_USERS } from "../data/mockData";
import toast from "react-hot-toast";

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
    // Mock: find user
    const found = MOCK_USERS.find(
      (u) => u.phone === phone && u.password === password
    );
    if (!found) {
      throw new Error("Invalid phone or password");
    }
    const userData = { ...found };
    delete userData.password;
    setUser(userData);
    localStorage.setItem("kaamsetu_user", JSON.stringify(userData));
    localStorage.setItem("kaamsetu_token", "mock-jwt-token-" + found.id);
    toast.success(`Welcome back, ${found.name}!`);
    return userData;
  };

  const register = async ({ name, phone, password, role }) => {
    // Mock: check duplicate
    const exists = MOCK_USERS.find((u) => u.phone === phone);
    if (exists) {
      throw new Error("Phone number already registered");
    }
    const newUser = {
      id: "u" + Date.now(),
      name,
      phone,
      role,
      skills: [],
      rating: 0,
      tasksCompleted: 0,
      tasksPosted: 0,
      location: null,
      avatar: null,
      createdAt: new Date().toISOString(),
    };
    MOCK_USERS.push({ ...newUser, password });
    setUser(newUser);
    localStorage.setItem("kaamsetu_user", JSON.stringify(newUser));
    localStorage.setItem("kaamsetu_token", "mock-jwt-token-" + newUser.id);
    toast.success(`Welcome to KaamSetu, ${name}!`);
    return newUser;
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