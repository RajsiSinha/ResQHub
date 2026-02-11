import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";

import MainLayout from "./components/layout/MainLayout";
import ResponderLayout from "./layouts/ResponderLayout";
import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/victim/Dashboard";
import History from "./pages/victim/History";
import Map from "./pages/victim/Map";
import Resources from "./pages/victim/Resources";

import ResponderDashboard from "./pages/responder/ResponderDashboard";

import CommandCenter from "./pages/admin/CommandCenter";
import VictimRegistry from "./pages/admin/VictimRegistry";
import Responders from "./pages/admin/Responders";
import DeepAnalytics from "./pages/admin/DeepAnalytics";
import ZoneManagement from "./pages/admin/ZoneManagement";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= VICTIM ================= */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/victim/dashboard"
          element={
            <ProtectedRoute allowedRole="victim">
              <Dashboard />
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

        <Route
          path="/victim/map"
          element={
            <ProtectedRoute allowedRole="victim">
              <Map />
            </ProtectedRoute>
          }
        />

        <Route
          path="/victim/resources"
          element={
            <ProtectedRoute allowedRole="victim">
              <Resources />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ================= RESPONDER ================= */}
      <Route
        path="/responder"
        element={
          <ProtectedRoute allowedRole="responder">
            <ResponderLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<ResponderDashboard />} />
      </Route>

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CommandCenter />} />
        <Route path="dashboard" element={<CommandCenter />} />
        <Route path="victim-registry" element={<VictimRegistry />} />
        <Route path="responders" element={<Responders />} />
        <Route path="deep-analytics" element={<DeepAnalytics />} />
        <Route path="zone-management" element={<ZoneManagement />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Home />} />

    </Routes>
  );
}

export default App;
