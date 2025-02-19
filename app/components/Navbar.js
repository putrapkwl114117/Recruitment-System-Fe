"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-500">Kita Bantu</h1>

        <ul className="hidden md:flex space-x-6">
          {[
            { href: "/", label: "Cari Pekerjaan" },
            { href: "/", label: "Perusahaan" },
            { href: "/", label: "Cara Kerja" },
            { href: "/", label: "Blog" },
            { href: "/", label: "Kontak" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="text-gray-600 hover:text-blue-500"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="space-x-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 border bg-blue-500 text-white rounded-full hover:bg-blue-700"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="px-4 py-2 border bg-blue-500 text-white rounded-full hover:bg-blue-700">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
