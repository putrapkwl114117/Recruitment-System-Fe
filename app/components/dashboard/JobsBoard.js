"use client";
import { useEffect, useState } from "react";
import JobService from "../../services/jobsendpoints";
import ModalJobForm from "../dashboard/ModalJobForm";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await JobService.getAllJobs();
        setJobs(data);
      } catch (error) {
        console.error("Gagal mengambil data pekerjaan:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-700">
          Daftar Lowongan Kerja
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Tambah Lowongan
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="px-4 py-2">Judul</th>
              <th className="px-4 py-2">Kategori</th>
              <th className="px-4 py-2">Tipe</th>
              <th className="px-4 py-2">Gaji</th>
              <th className="px-4 py-2">Lokasi</th>
              <th className="px-4 py-2">Gambar</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{job.title}</td>
                <td className="px-4 py-2">{job.category}</td>
                <td className="px-4 py-2">{job.type}</td>
                <td className="px-4 py-2">{job.salary}</td>
                <td className="px-4 py-2">{job.location}</td>
                <td className="px-4 py-2">
                  {job.image && (
                    <img
                      src={`http://127.0.0.1:8000/${job.image}`}
                      alt={job.title}
                      className="h-12 w-20 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && <ModalJobForm closeModal={() => setShowModal(false)} />}
    </div>
  );
}
