import Link from "next/link";
import { FaBriefcase, FaUser, FaSignOutAlt, FaHome } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 fixed top-0 left-0 h-full bg-gradient-to-b from-blue-500 to-[#F8FAFB] shadow-lg p-6 flex flex-col justify-between rounded-tr-xl rounded-br-xl">
      <div>
        <h2 className="text-3xl font-bold text-white mb-3 mt-2 text-start">
          <Link href="/" className="hover:text-blue-700">
            Kita Bantu
          </Link>
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className="flex items-center space-x-4 text-black hover:bg-blue-700 hover:text-white px-4 py-2 rounded-lg"
            >
              <FaHome className="text-2xl" />
              <span className="text-xl">Beranda</span>
            </Link>
          </li>
          <li>
            <Link
              href="manage-jobs"
              className="flex items-center space-x-4 text-black hover:bg-blue-700 hover:text-white px-4 py-2 rounded-lg"
            >
              <FaBriefcase className="text-2xl" />
              <span className="text-xl">Manage Jobs</span>
            </Link>
          </li>
          <li>
            <button
            disabled
              className="flex items-center space-x-4 text-gray-500 px-4 py-2 rounded-lg"
            >
              <FaUser className="text-2xl" />
              <span className="text-xl">Profile</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Tombol Logout sebagai Button */}
      <button className="flex items-center space-x-4 text-wihte hover:bg-red-800 hover:text-white px-4 py-2 rounded-lg bg-red-500">
        <FaSignOutAlt className="text-2xl text-white ml-8" />
        <span className="text-xl text-white">Logout</span>
      </button>
    </aside>
  );
}
