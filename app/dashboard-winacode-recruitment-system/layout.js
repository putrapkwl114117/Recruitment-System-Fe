"use client";
import Sidebar from "../components/dashboard/SidebarDashboard";
import NavbarWrapper from "../components/dashboard/NavbarWrapper";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-60">
        <NavbarWrapper />
        <main className="p-8 bg-sky-50 min-h-screen ">{children}</main>
      </div>
    </div>
  );
}
