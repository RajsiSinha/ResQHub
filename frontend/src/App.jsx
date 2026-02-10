import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/victim/Dashboard";
import ResponderDashboard from "./pages/responder/ResponderDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import History from "./pages/victim/History";

function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Layout */}
      <Route element={<MainLayout />}>

        <Route
          path="/victim/dashboard"
          element={
            <ProtectedRoute allowedRole="victim">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/responder/dashboard"
          element={
            <ProtectedRoute allowedRole="responder">
              <ResponderDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
          
          <Route
            path="/victim/history"
            element={
              <ProtectedRoute allowedRole="victim">
                 <History />
               </ProtectedRoute>
             }
          />

      </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Home />} />

    </Routes>
  );
}

export default App;
