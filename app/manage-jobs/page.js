"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaSearch, FaPlusSquare, FaGlobe, FaListAlt, FaTimes,} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import JobCard from "../components/JobCard";
import JobService from "../services/jobsendpoints";
import JobForm from "../components/FormJob";
import JobDetail from "../components/JobDetail";
import ConfirmDeleteModal from "../components/DeleteModal"; 

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [editingJob, setEditingJob] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("User  is not logged in.");
      router.push("/login");
      return;
    }

    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("User  ID not found in local storage.");
      return;
    }

    fetchJobs(storedUserId);
  }, []);

  const fetchJobs = async (userId) => {
    try {
      const data = await JobService.getJobs(userId);
      if (Array.isArray(data)) {
        setJobs(data);
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error(
        "Failed to fetch jobs:",
        error.response ? error.response.data : error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const openForm = (job = null) => {
    setIsFormVisible(true);
    setEditingJob(job);
    setSelectedJob(null);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setEditingJob(null);
  };

  const handleFormSubmit = async () => {
    setMessage({
      text: "Pekerjaan berhasil ditambahkan atau diperbarui!",
      type: "success",
    });
    await fetchJobs(userId); 
    setTimeout(() => {
      setMessage({ text: "", type: "" });
      closeForm();
    }, 2000);
  };

  const handleEditJob = async (jobId) => {
    try {
      const job = await JobService.getJobById(jobId);
      openForm(job);
    } catch (error) {
      console.error("Failed to fetch job:", error);
    }
  };

  const handleDeleteJob = (jobId) => {
    setJobToDelete(jobId);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      JobService.deleteJob(jobToDelete)
        .then(() => {
          setJobs(jobs.filter((job) => job.id !== jobToDelete));
          setMessage({ text: "Pekerjaan berhasil dihapus!", type: "success" });
        })
        .catch((error) => {
          console.error("Failed to delete job:", error);
          setMessage({ text: "Gagal menghapus pekerjaan!", type: "error" });
        })
        .finally(() => {
          setIsDeleteModalVisible(false);
          setJobToDelete(null);
        });
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
    setJobToDelete(null);
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsFormVisible(false);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
          <div className="overlay-loading">
            <div className="light-effect"></div>
          </div>
        </div>
      )}
      <Sidebar className="w-full lg:w-1/4 bg-white shadow-md p-4 lg:sticky top-0 h-screen overflow-auto" />
      <div className="flex flex-1 mt-8 lg:mt-0 flex-col lg:flex-row px-0 p-4 gap-4 lg:ml-60">
        <div className="w-full lg:w-3/4 p-4">
          {message.text && (
            <div
              className="relative p-4 mb-4 text-white rounded-lg text-center"
              style={{ maxWidth: "550px", margin: "0 auto" }}
            >
              <button
                onClick={() => setMessage({ text: "", type: "" })} 
                className="absolute top-5 right-3 text-white"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <FaTimes size={30} /> 
              </button>
              <div
                className={`p-2 rounded-lg ${
                  message.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {message.text}
              </div>
            </div>
          )}

          <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Jobs</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <button
                onClick={() => openForm()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
              >
                <FaPlusSquare /> Tambah Lowongan
              </button>
              <button
                disabled
                className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-black rounded-lg shadow-md"
              >
                <FaGlobe /> Komunitas
              </button>
              <button
                disabled
                className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-black rounded-lg shadow-md"
              >
                <FaListAlt /> Pendaftar
              </button>
            </div>
            <div className="flex items-center bg-white rounded-full shadow-sm w-full md:w-72 overflow-hidden">
              <input
                type="text"
                placeholder="Cari Pekerjaan..."
                className="p-2 flex-1 outline-none bg-transparent text-gray-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="bg-blue-500 text-white p-2 rounded-full">
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="flex-1 relative p-0 m-0">
            {selectedJob ? (
              <JobDetail
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
              />
            ) : isFormVisible ? (
              <JobForm
                onClose={closeForm}
                onSubmit={handleFormSubmit}
                job={editingJob}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-0">
                {jobs.length > 0 ? (
                  jobs
                    .filter((job) =>
                      job.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onEdit={() => handleEditJob(job.id)}
                        onDelete={() => handleDeleteJob(job.id)}
                        onClick={handleJobClick}
                      />
                    ))
                ) : (
                  <p className="text-gray-500">
                    Tidak ada pekerjaan yang ditemukan.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/4 bg-white shadow-md p-2 mr-4 rounded-lg items-center">
          <div className="max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Cara Menggunakan Manage Jobs
            </h2>

            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-500 text-lg">📌</span>
                <span>
                  <span className="font-semibold">Tambah Lowongan:</span> Klik tombol{" "}
                  <span className="bg-blue-500 text-white px-2 py-1 rounded">Tambah Lowongan</span> 
                  <br></br>
                  untuk menambahkan pekerjaan baru.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-500 text-lg">✏️</span>
                <span>
                  <span className="font-semibold">Edit Lowongan:</span> Klik tombol{" "}
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</span> 
                  untuk mengubah informasi lowongan.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 text-lg">🗑️</span>
                <span>
                  <span className="font-semibold">Hapus Lowongan:</span> Klik tombol{" "}
                  <span className="bg-red-500 text-white px-2 py-1 rounded">Hapus</span> 
                  untuk menghapus lowongan yang tidak diperlukan.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 text-lg">🔍</span>
                <span>
                  <span className="font-semibold">Lihat Detail Pekerjaan:</span> Klik salah satu kartu pekerjaan untuk melihat detail informasi.
                </span>
              </li>
            </ul>

            <div className="mt-8 p-4 bg-gray-100 border-l-4 border-blue-500">
              <p className="text-gray-600">
                Gunakan fitur ini untuk mengelola daftar pekerjaan dengan mudah dan efisien.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmDeleteModal
        isVisible={isDeleteModalVisible}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <style jsx>{`
        .overlay-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(225, 255, 255, 0.5);
          overflow: hidden;
          z-index: 1000;
        }
        .light-effect {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.2)
          );
          animation: moveLight 2s linear infinite;
        }
        @keyframes moveLight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}