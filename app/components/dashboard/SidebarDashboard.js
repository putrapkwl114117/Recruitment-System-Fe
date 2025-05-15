"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  HomeIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <HomeIcon className="h-6 w-6" />,
      path: "/dashboard-winacode-recruitment-system",
    },
    {
      name: "Applicants",
      icon: <UserGroupIcon className="h-6 w-6" />,
      path: "/dashboard-winacode-recruitment-system/applicants",
    },
    {
      name: "CV & Portfolio",
      icon: <DocumentTextIcon className="h-6 w-6" />,
      path: "/dashboard-winacode-recruitment-system/cv-portfolio",
    },
    {
      name: "Job Board",
      icon: <BriefcaseIcon className="h-6 w-6" />,
      path: "/dashboard-winacode-recruitment-system/jobs-board",
    },
    {
      name: "Schedule",
      icon: <CalendarDaysIcon className="h-6 w-6" />,
      path: "/dashboard-winacode-recruitment-system/schedule",
    },
  ];

  return (
    <aside className="w-60 h-screen bg-slate-50 text-gray-700 px-4 py-2 flex flex-col justify-between fixed">
      <div>
        {/* Logo */}
        <div className="flex justify-start -mt-14">
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

        {/* Menu */}
        <nav className="space-y-5 ml-6 -mt-6">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`flex items-center space-x-3 font-semibold text-md ${
                pathname === item.path
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Settings */}
      <div className="mt-8">
        <Link
          href="/dashboard-winacode-recruitment-system/settings"
          className="flex items-center space-x-3 hover:text-blue-500"
        >
          <Cog6ToothIcon className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
