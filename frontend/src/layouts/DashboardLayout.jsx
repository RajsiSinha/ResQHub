import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#101922] text-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
