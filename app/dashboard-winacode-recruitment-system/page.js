"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/dashboard/NavbarDashboard";
import Sidebar from "../components/dashboard/SidebarDashboard";
import JobBoard from "../components/dashboard/JobsBoard";

export default function HRDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userName, setUserName] = useState("");
  const menu = searchParams.get("menu") || "dashboard";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    if (!token || role !== "hr") {
      router.push("/");
    } else {
      setUserName(name || "HR");
    }
  }, [router]);

  return (
    <div className="flex">
      <Sidebar activeMenu={menu} />
      <div className="flex-1 ml-64">
        <Navbar userName={userName} />
        <main className="p-8 bg-sky-50 min-h-screen">
          {menu === "dashboard" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Selamat Datang, {userName}</h2>
              {/* Isi dashboard... */}
            </div>
          )}
          {menu === "jobBoard" && <JobBoard />}
        </main>
      </div>
    </div>
  );
}
