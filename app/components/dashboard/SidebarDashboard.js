// components/Sidebar.jsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  HomeIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar({ activeMenu }) {
  const router = useRouter();

  const handleMenuClick = (menu) => {
    router.push(`?menu=${menu}`, { shallow: true });
  };

  return (
    <aside className="w-64 h-screen bg-slate-50 text-gray-700 px-4 py-2 flex flex-col justify-between fixed">
      <div>
        {/* Logo */}
        <div className="flex justify-start -mt-10">
          <Link href="/">
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={180}
              height={70}
              className="object-contain ml-4"
            />
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="space-y-4 ml-6 -mt-6">
          <button
            onClick={() => handleMenuClick("dashboard")}
            className={
              activeMenu === "dashboard"
                ? "text-blue-600 flex items-center space-x-3 "
                : "hover:text-blue-500 text-gray-600 flex items-center space-x-3"
            }
          >
            <HomeIcon className="h-5 w-5" />
            <span>Dashboard</span>
          </button>
          <Link
            href="#"
            className="flex items-center space-x-3 hover:text-blue-500"
          >
            <UserGroupIcon className="h-5 w-5" />
            <span>Applicants</span>
          </Link>
          <Link
            href="#"
            className="flex items-center space-x-3 hover:text-blue-500"
          >
            <DocumentTextIcon className="h-5 w-5" />
            <span>CV & Portfolio</span>
          </Link>
          <button
            onClick={() => handleMenuClick("jobBoard")}
            className={
              activeMenu === "jobBoard"
                ? "text-blue-600 flex items-center space-x-3"
                : "hover:text-blue-500 text-gray-600 flex items-center space-x-3"
            }
          >
            <BriefcaseIcon className="h-5 w-5" />
            <span>Job Board</span>
          </button>
          <Link
            href="#"
            className="flex items-center space-x-3 hover:text-blue-500"
          >
            <CalendarDaysIcon className="h-5 w-5" />
            <span>Schedule</span>
          </Link>
        </nav>
      </div>

      {/* Settings Menu at Bottom */}
      <div className="mt-8">
        <Link
          href="#"
          className="flex items-center space-x-3 hover:text-blue-500"
        >
          <Cog6ToothIcon className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
