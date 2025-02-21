"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("name"); 
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedName || "Pengguna");
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    setShowMenu(false);
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

        <div className="relative">
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <span className="text-gray-700 font-medium">{username}</span>{" "}
              {/* Menampilkan nama pengguna */}
              <div className="relative">
                <button onClick={() => setShowMenu(!showMenu)}>
                  <FaUserCircle className="text-3xl text-blue-500 hover:text-blue-700 cursor-pointer" />
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                    <ul className="py-2">
                      <li>
                        <Link
                          href="/manage-jobs"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowMenu(false)}
                        >
                          Manage Jobs
                        </Link>
                      </li>
                      <li>
                        <button
                          disabled
                          className="block px-4 py-2 text-gray-400"
                          onClick={() => setShowMenu(false)}
                        >
                          Profile
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
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
