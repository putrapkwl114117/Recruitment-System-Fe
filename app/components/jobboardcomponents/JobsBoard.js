"use client";
import { useState } from "react";
import { useJobs } from "../jobboardcomponents/UseJobs";
import JobForm from "../jobboardcomponents/JobForm";
import JobList from "../jobboardcomponents/JobsList";

export default function JobsBoard() {
  const { jobs, loading, createJob, deleteJob } = useJobs();
  const [form, setForm] = useState({
    title: "",
    description: "",
    salary: "",
    category: "",
    location: "",
    type: "",
    experience_level: "Junior",
    skills: "",
    image: null,
  });
          const [showModal, setShowModal] = useState(false);
          const [editingJob, setEditingJob] = useState(null);
          const [searchTerm, setSearchTerm] = useState("");
          const filteredJobs = jobs.filter((job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
                         


  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingJob) {
      updateJob(editingJob.id, form);
    } else {
      createJob(form);
    }        
    setForm({
      title: "",
      description: "",
      salary: "",
      category: "",
      location: "",
      type: "",
      experience_level: "Junior",
      skills: "",
      image: null,
    });
    setEditingJob(null);
    setShowModal(false);
          };
          

          const handleEdit = (job) => {
            setEditingJob(job);
            setForm({
              title: job.title,
              description: job.description,
              salary: job.salary,
              category: job.category,
              location: job.location,
              type: job.type,
              experience_level: job.experience_level,
              skills: job.skills,
              image: null, 
            });
            setShowModal(true);
          };
                  

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-4">
        {/* Kiri: Title */}
        <h2 className="text-xl font-semibold text-gray-700">Job Board</h2>

        {/* Tengah: Search */}
        <div className="relative ml-auto mr-4 w-72 h-9 flex items-center">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-full pl-3 pr-9 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
          />
          <button
            className="absolute right-[1px] top-[1px] bottom-[1px] w-8 flex items-center justify-center bg-blue-400 text-white rounded-r-sm text-sm"
            disabled
          >
            🔍
          </button>
        </div>

        {/* Kanan: Add Job */}
        <button
          onClick={() => {
            setEditingJob(null);
            setForm({
              title: "",
              description: "",
              salary: "",
              category: "",
              location: "",
              type: "",
              experience_level: "Junior",
              skills: "",
              image: null,
            });
            setShowModal(true);
          }}
          className="bg-blue-400 font-semibold text-gray-100 px-3 h-9 text-md rounded-sm hover:bg-blue-500"
        >
          Add Job
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-xl relative"
            style={{ maxHeight: "90vh" }}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              X
            </button>
            <div className="p-5 pt-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {editingJob ? "Edit Job" : "Add New Job"}
              </h3>

              <JobForm
                form={form}
                setForm={setForm}
                onSubmit={handleSubmit}
                loading={loading}
                isEditing={!!editingJob}
              />
            </div>
          </div>
        </div>
      )}
      <JobList jobs={filteredJobs} onDelete={deleteJob} onEdit={handleEdit} />
    </div>
  );
}
