"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-500">Kita Bantu</h1>
        <ul className="hidden md:flex space-x-6">
          <li><Link href="/" className="text-gray-600 hover:text-blue-500">Cari Pekerjaan</Link></li>
          <li><Link href="/" className="text-gray-600 hover:text-blue-500">Perusahaan</Link></li>
          <li><Link href="/" className="text-gray-600 hover:text-blue-500">Cara Kerja</Link></li>
          <li><Link href="/" className="text-gray-600 hover:text-blue-500">Blog</Link></li>
          <li><Link href="/" className="text-gray-600 hover:text-blue-500">Kontak</Link></li>
        </ul>
        <div className="space-x-4">
          <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">Login</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Daftar</button>
        </div>
      </div>
    </nav>
  );
}
