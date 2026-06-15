import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("amazon_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    // Simulated login logic: ideally this verifies against a backend
    // For now we just create a session object based on what they gave
    const name = email.split("@")[0]; // Simple dummy name extraction
    const loggedInUser = { email, name };
    setUser(loggedInUser);
    localStorage.setItem("amazon_user", JSON.stringify(loggedInUser));
  };

  const register = (name, email, password) => {
    const newUser = { name, email };
    setUser(newUser);
    localStorage.setItem("amazon_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("amazon_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
