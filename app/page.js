"use client";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fde2ff] to-[#fad1e3] relative">
      <Navbar />

      <div className="transition-all duration-300">
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-5">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800">
            Modernisasi Pengalaman Mencari Kerja
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl">
            Temukan dan lamar pekerjaan impian Anda dengan mudah. Telusuri
            berbagai lowongan dan dapatkan pekerjaan yang sesuai dengan keahlian
            Anda.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-6 flex items-center border rounded-full shadow-lg bg-white w-[90%] md:w-1/2 overflow-hidden">
            <input
              type="text"
              placeholder="Cari pekerjaan..."
              className="w-full p-4 focus:outline-none text-gray-700"
            />
            <button className="bg-pink-500 text-white px-6 py-4 rounded-full hover:bg-pink-700">
              Cari
            </button>
          </div>

          {/* INFO & STATISTIK */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl">
            <div className="p-6 bg-white shadow-md rounded-xl text-center">
              <h3 className="text-pink-500 text-xl font-semibold">
                Kategori Pekerjaan
              </h3>
              <p className="text-gray-600 mt-2">
                Produk, Konten, Keuangan, Desain
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-xl text-center">
              <h3 className="text-purple-500 text-xl font-semibold">
                Efisiensi Meningkat
              </h3>
              <p className="text-gray-600 mt-2">80% lebih efisien</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-xl text-center">
              <h3 className="text-blue-500 text-xl font-semibold">
                Desain & Engineer
              </h3>
              <p className="text-gray-600 mt-2">Pelajari lebih lanjut</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
