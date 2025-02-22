import Link from "next/link";
import { FaBriefcase, FaUser, FaSignOutAlt, FaHome, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);

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
    router.push("/");
  };

  return (
    <div className="flex min-h-screen fixed h-full">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      <aside
        className={`fixed lg:static top-0 left-0 h-full bg-gradient-to-b from-blue-400 to-blue-200 shadow-lg p-6 flex flex-col justify-between rounded-tr-xl rounded-br-xl transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        >
        <div>
          <h2 className="text-3xl font-bold text-white mb-5 mt-2 text-center">
            <Link href="/" className="hover:text-blue-500">
              Kita Bantu
            </Link>
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="flex items-center space-x-4 text-white hover:bg-blue-500 px-4 py-2 rounded-lg"
              >
                <FaHome className="text-xl text-black" />
                <span className="text-lg">Beranda</span>
              </Link>
            </li>
            <li>
              <Link
                href="/manage-jobs"
                className="flex items-center space-x-4 text-white hover:bg-blue-500 px-4 py-2 rounded-lg"
              >
                <FaBriefcase className="text-xl text-black" />
                <span className="text-lg">Manage Jobs</span>
              </Link>
            </li>
            <li>
              <Link
                href="/manage-jobs"
                className="flex items-center space-x-4 text-white hover:bg-blue-500 px-4 py-2 rounded-lg"
              >
                <FaUser className="text-xl text-black" />
                <span className="text-lg">Profile</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Tombol Logout sebagai Button */}
        <button onClick={handleLogout} className="flex items-center space-x-4 text-wihte hover:bg-red-800 hover:text-white px-4 py-2 rounded-lg bg-red-500">
          <FaSignOutAlt className="text-2xl text-white ml-4" />
          <span className="text-xl text-white">Logout</span>
        </button>
      </aside>

    <div className="flex-1 flex flex-col">
      <div className="lg:hidden p-4 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl text-blue-500">
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <main className="p-4 flex-1">{children}</main>
      </div>
  </div>
  );
}
