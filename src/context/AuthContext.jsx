import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load user from localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username, password) => {
    // Hardcoded admin
    if (username === "admin" && password === "admin") {
      const adminData = { name: "Admin", role: "admin", id: "admin" };
      setUser(adminData);
      localStorage.setItem("user", JSON.stringify(adminData));
      return { success: true };
    }

    // For regular users, create id from username
    const userData = { name: username, role: "user", id: username.toLowerCase().replace(/\s/g, "_") };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
