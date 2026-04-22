/* eslint react-refresh/only-export-components: off */
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 🔐 LOGIN (session manager)
  // Accepts: { token, user } from backend auth responses.
  const login = ({ token, user: userData }) => {
    if (!token || !userData) return;

    setUser(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify(userData));

    // Role-based redirect
    switch (userData.role) {
      case "victim":
        navigate("/victim/dashboard");
        break;
      case "responder":
        navigate("/responder/dashboard");
        break;
      case "admin":
        navigate("/admin/dashboard");
        break;
      default:
        navigate("/");
    }
  };

  // 🔓 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
