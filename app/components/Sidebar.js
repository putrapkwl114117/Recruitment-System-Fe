import Link from "next/link";
import { FaBriefcase, FaUser, FaSignOutAlt, FaHome } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gradient-to-r from-blue-200 to-blue-400 shadow-lg p-6 flex flex-col justify-between rounded-tr-xl rounded-br-xl">
      <div>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          <Link href="/" className="hover:text-blue-500">
            Kita Bantu
          </Link>
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/manage-jobs"
              className="flex items-center space-x-4 text-white hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg"
            >
              <FaHome className="text-2xl text-black" />
              <span className="text-xl">Portal Jobs</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center space-x-4 text-white hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg"
            >
              <FaBriefcase className="text-2xl text-black" />
              <span className="text-xl">Manage Jobs</span>
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="flex items-center space-x-4 text-white hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg"
            >
              <FaUser className="text-2xl text-black" />
              <span className="text-xl">Perusahaan</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Tombol Logout sebagai Button */}
      <button className="flex items-center space-x-4 text-wihte hover:bg-blue-800 hover:text-white px-4 py-2 rounded-lg bg-blue-500">
        <FaSignOutAlt className="text-2xl text-white ml-8" />
        <span className="text-xl text-white">Logout</span>
      </button>
    </aside>
  );
}
