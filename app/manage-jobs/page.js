"use client";

import Sidebar from "../components/Sidebar";
import JobCard from "../components/JobCard";
import ProfileCard from "../components/ProfileCard";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setJobs([
      {
        id: 1,
        title: "Software Engineer",
        company: "Tech Corp",
        location: "Jakarta",
        type: "Full-time",
      },
      {
        id: 2,
        title: "UI/UX Designer",
        company: "Creative Studio",
        location: "Bandung",
        type: "Remote",
      },
      {
        id: 3,
        title: "Product Manager",
        company: "Startup XYZ",
        location: "Yogyakarta",
        type: "Hybrid",
      },
      {
        id: 4,
        title: "Data Analyst",
        company: "Data Corp",
        location: "Surabaya",
        type: "Full-time",
      },
    ]);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Header + Search */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 ml-4">Manage Jobs</h1>

          {/* Search Bar */}
          <div className="flex items-center bg-white border rounded-full overflow-hidden shadow-sm w-72 -mr-80 p-0 ">
            <input
              type="text"
              placeholder="Cari Pekerjaan..."
              className="p-3 flex-1 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-blue-500 text-white p-3 rounded-full flex items-center justify-center">
              <FaSearch className="text-lg" />
            </button>
          </div>
        </div>

       {/* Tombol Aksi */}
        <div className="flex space-x-4 mb-6 ml-28">
          <Link
            href="#"
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white shadow transition-colors duration-300"
          >
            + Tambah Lowongan
          </Link>
          <Link
            href="#"
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white shadow transition-colors duration-300"
          >
            Komunitas
          </Link>
          <Link
            href="#"
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white shadow transition-colors duration-300"
          >
            Pendaftar
          </Link>
        </div>
        
        {/* Job List */}
        <div>
          <div className="inline-grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-3 ml-4">
            {jobs.length > 0 ? (
              jobs
                .filter((job) =>
                  job.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <p className="text-gray-500">
                Tidak ada pekerjaan yang ditemukan.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ProfileCard */}
      <div className="mb-0 mt-14 p-0">
        <div className="mt-14 mr-16 p-0">
          <ProfileCard />
        </div>
      </div>
    </div>
  );
}
