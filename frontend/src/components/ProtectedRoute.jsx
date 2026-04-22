import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth();

  // 🔐 Route protection (also applies offline for already authenticated users)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Optional role check
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
