"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "../services/auth";
import { FaEye, FaEyeSlash, FaStar } from "react-icons/fa";
import Link from "next/link";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const router = useRouter();

  const testimonials = [
    {
      name: "Mitha Aprilia",
      text: "Platform ini membantu saya mendapatkan pekerjaan impian saya dalam seminggu!",
    },
    {
      name: "Azahra",
      text: "Sangat mudah digunakan dan banyak pilihan pekerjaan yang sesuai dengan keahlian saya.",
    },
    {
      name: "Faisal Dwi",
      text: "Proses rekrutmen jadi lebih cepat dan efisien. Sangat saya rekomendasikan!",
    },
    {
      name: "Devita Ayu",
      text: "Proses rekrutmen sangat cepat dan mudah. Saya sangat tertarik!",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister && password !== confirmPassword) {
      setError("Password dan Confirm Password tidak cocok.");
      return;
    }

    const userData = isRegister
      ? { name, email, password, password_confirmation: confirmPassword }
      : { email, password };

    try {
      setIsLoading(true);
      const response = isRegister
        ? await register(userData)
        : await login(userData);
      localStorage.setItem("token", response.token);

      // Menyimpan nama pengguna di localStorage setelah login atau registrasi
      if (isRegister) {
        localStorage.setItem("name", name); 
        setIsRegister(false);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        localStorage.setItem("name", response.name || "Pengguna"); 
        router.push("/"); 
      }
    } catch (err) {
      console.error("Error dari API:", err);

      if (err.response) {
        setError(err.response.data.message || "Terjadi kesalahan");
      } else {
        setError("Terjadi kesalahan pada server. Coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Layout  */}
      <div className="w-1/2 bg-gradient-to-r from-blue-400 to-blue-700 p-10 flex flex-col justify-center items-center text-center relative">
        <div className="absolute top-5 left-5">
          <Link
            href="/"
            className="text-white text-xl font-bold hover:underline"
          >
            KITA BANTU
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-white">
          Temukan Pekerjaan Impianmu
        </h2>
        <p className="text-white mt-4">
          Kami membantu ribuan orang mendapatkan pekerjaan terbaik sesuai
          keahlian mereka.
        </p>

        {/* TESTIMONI */}
        <div className="mt-14 w-full max-w-md relative">
          <div className="relative h-36">
            {testimonials.map((testi, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full p-6 bg-gradient-to-r from-blue-300 to-blue-600 rounded-lg shadow-md transition-opacity duration-500 ${
                  index === activeTestimonial ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-gray-200 italic">{testi.text}</p>
                <p className="text-black font-semibold mt-2">- {testi.name}</p>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Indikator */}
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === activeTestimonial
                    ? "bg-blue-800 w-4"
                    : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Form Login/Register */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md transition-all duration-300">
          {isRegister ? (
            <>
              <h2 className="text-2xl font-bold text-blue-800 text-center">
                Daftar
              </h2>
              <form onSubmit={handleSubmit} className="mt-6">
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4">
                  <label className="block text-gray-600">Nama</label>
                  <input
                    type="text"
                    placeholder="Nama"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-gray-500 w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-gray-500 w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-gray-500 w-full px-4 py-2 border rounded-md"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 cursor-pointer"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-600">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="text-gray-500 w-full px-4 py-2 border rounded-md"
                    />
                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-3 cursor-pointer"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className={`w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-800 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Daftar"}
                </button>
              </form>
              <p className="text-center mt-4 text-gray-600">
                Sudah punya akun?{" "}
                <button
                  onClick={() => setIsRegister(false)}
                  className="text-blue-800 hover:underline"
                >
                  Login di sini
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-blue-800 text-center">
                Masuk
              </h2>
              <form onSubmit={handleSubmit} className="mt-6">
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4">
                  <label className="block text-gray-600">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-gray-500 w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-600">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-gray-500 w-full px-4 py-2 border rounded-md"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 cursor-pointer"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className={`w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-800 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Masuk"}
                </button>
              </form>
              <p className="text-center mt-4 text-gray-600">
                Belum punya akun?{" "}
                <button
                  onClick={() => setIsRegister(true)}
                  className="text-blue-800 hover:underline"
                >
                  Daftar di sini
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
