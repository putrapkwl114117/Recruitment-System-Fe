"use client";

import { useRef, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Footer from "./components/Footer";

export default function Home() {
  const aboutRef = useRef(null);
  const [search, setSearch] = useState("");

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = () => {
    console.log("Searching for:", search);
  };

  useEffect(() => {
    // Menjalankan kode hanya di sisi client jika diperlukan
    console.log("Component mounted on client side");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onAboutClick={scrollToAbout} />

      {/* SEARCH BAR */}
      <div className="container mx-auto px-5 mt-20 mb-10 flex justify-center">
        <div className="flex w-full md:w-1/2 border rounded-lg shadow-sm overflow-hidden">
          <input
            type="text"
            placeholder="Cari sesuatu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-green-400 text-white px-5 py-3 hover:bg-green-700 transition-all"
          >
            Search
          </button>
        </div>
      </div>

      {/* CARD LIST */}
      <main className="flex-1 container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        <Card title="Card 1" description="Deskripsi card pertama." />
        <Card title="Card 2" description="Deskripsi card kedua." />
        <Card title="Card 3" description="Deskripsi card ketiga." />
      </main>

      {/* SECTION ABOUT */}
      <section
        ref={aboutRef}
        className="container mx-auto p-5 bg-gray-100 rounded-lg mt-40"
      >
        <h2 className="text-2xl font-bold text-center mb-4">About Us</h2>
        <p className="text-gray-700 text-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </section>

      <Footer />
    </div>
  );
}
