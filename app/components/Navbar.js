"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Cek apakah ada token di localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Hapus token dari localStorage saat logout
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Set status login ke false
    router.push("/login"); // Redirect ke halaman login
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-pink-500">Kita Bantu</h1>
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link href="/" className="text-gray-600 hover:text-pink-500">
                Cari Pekerjaan
              </Link>
            </li>
            <li>
              <Link href="/" className="text-gray-600 hover:text-pink-500">
                Perusahaan
              </Link>
            </li>
            <li>
              <Link href="/" className="text-gray-600 hover:text-pink-500">
                Cara Kerja
              </Link>
            </li>
            <li>
              <Link href="/" className="text-gray-600 hover:text-pink-500">
                Upload Loker
              </Link>
            </li>
            <li>
              <Link href="/" className="text-gray-600 hover:text-pink-500">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/" className="text-gray-600 hover:text-pink-500">
                Kontak
              </Link>
            </li>
          </ul>
          <div className="space-x-4">
            {!isLoggedIn ? (
              <Link href="/login">
                <button className="px-4 py-2 border bg-pink-500 text-white rounded-lg hover:bg-pink-700">
                  Login
                </button>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 border bg-pink-500 text-white rounded-lg hover:bg-pink-700"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
