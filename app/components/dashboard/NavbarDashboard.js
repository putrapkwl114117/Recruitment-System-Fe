// components/Navbar.jsx
"use client";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar({ userName }) {
  return (
    <nav className="bg-slate-200 shadow-gray-2xl p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-700">HR Dashboard</h1>
      <div className="flex items-center space-x-2 text-gray-700">
        <span>{userName}</span>
        <UserCircleIcon className="h-8 w-8" />
      </div>
    </nav>
  );
}
