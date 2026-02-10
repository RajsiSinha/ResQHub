import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Accept object
  const login = ({ email, role }) => {
    const fakeUser = { email, role };
    setUser(fakeUser);

    // Role-based redirect
    if (role === "victim") navigate("/dashboard");
    else if (role === "responder") navigate("/responder/dashboard");
    else if (role === "admin") navigate("/admin/dashboard");
  };

  const logout = () => {
    setUser(null);
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
