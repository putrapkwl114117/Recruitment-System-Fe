"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import JobCard from "../components/JobCard";
import ProfileCard from "../components/ProfileCard";
import JobService from "../services/jobsendpoints";
import JobForm from "../components/FormJob";
import JobDetail from "../components/JobDetail";
import ConfirmDeleteModal from "../components/DeleteModal"; // Import the modal

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

  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("User is not logged in.");
      router.push("/login");
      return;
    }

    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("User ID not found in local storage.");
      return;
    }

    JobService.getJobs(storedUserId)
      .then((data) => {
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => {
        console.error(
          "Failed to fetch jobs:",
          error.response ? error.response.data : error
        );
      });
  }, []);

  const openForm = (job = null) => {
    setIsFormVisible(true);
    setEditingJob(job);
    setSelectedJob(null);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setEditingJob(null);
  };

  const handleFormSubmit = () => {
    setMessage({
      text: "Pekerjaan berhasil ditambahkan atau diperbarui!",
      type: "success",
    });
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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 ml-4">Manage Jobs</h1>
          <div className="flex items-center bg-white border rounded-full overflow-hidden shadow-sm w-72 p-0 -mr-80">
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

        {message.text && (
          <div
            className={`mb-4 text-center font-bold ${
              message.type === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex space-x-4 mb-6 ml-28">
          <button
            onClick={() => openForm()}
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white shadow transition-colors duration-300"
          >
            + Tambah Lowongan
          </button>
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

        <div className="relative">
          {selectedJob ? (
            <JobDetail job={selectedJob} onClose={() => setSelectedJob(null)} />
          ) : isFormVisible ? (
            <JobForm
              onClose={closeForm}
              onSubmit={handleFormSubmit}
              job={editingJob}
            />
          ) : (
            <div className="inline-grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-3 ml-4">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onEdit={() => handleEditJob(job.id)}
                  onDelete={() => handleDeleteJob(job.id)}
                  onClick={handleJobClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mb-0 mt-14 p-0">
        <div className="mt-14 mr-16 p-0">
          <ProfileCard />
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmDeleteModal
        isVisible={isDeleteModalVisible}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
