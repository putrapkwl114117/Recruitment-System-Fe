"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import JobService from "./services/jobsendpoints";
import JobCard from "./components/Card";
import PostJobButton from "./components/PostJob";
import Modal from "./components/ModalCardHome";
import Link from "next/link";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalType, setModalType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await JobService.getAllJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  const openModal = (type, job = null) => {
    setSelectedJob(job);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  return (
    <div className="min-h-screen py-2 bg-white">
      <Navbar />

      <section className="relative min-h-[75vh] flex flex-col justify-center items-center text-center px-7  bg-gradient-to-br from-[#fff0fa] via-[#e7d1ff] to-[#ffa3eb] overflow-hidden">
        <div
          className="absolute inset-0 bg-no-repeat bg-bottom bg-cover bg-contain"
          style={{ backgroundImage: "url('/lines.svg')" }}
        />
        <div className="relative z-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-wide font-serif">
            Temukan Peluang, <br />
            Wujudkan Karier Impian
          </h2>
          <p className="text-gray-600 mt-4 mb-6 max-w-4xl mx-auto text-center">
            Jelajahi berbagai peluang kerja yang sesuai dengan keahlian dan
            tujuan Anda.
            <br />
            Wujudkan Bersama Kami di PT Winni Code, Garuda Teknolog{" "}
            <span className="font-semibold text-blue-600">
              {" "}
              Daftarkan Dirimu
            </span>{" "}
            Sekarang!
          </p>

          {/* Tombol Posting Pekerjaan */}
          <Link
            href={checkLoginStatus() ? "/manage-jobs" : "/login"}
            className="border-2 border-blue-500 shadow-lg text-blue-500 bg-transparent px-6 py-4 rounded-full hover:bg-blue-500 hover:text-white transition-all"
          >
            Lihat Lowongan 🚀
          </Link>
        </div>
      </section>

      <section className="flex flex-col px-5 items-center">
        <div className="mt-5 flex items-center border rounded-full shadow-lg bg-white w-[90%] md:w-1/2 overflow-hidden">
          <input
            type="text"
            placeholder="Cari Pekerjaan..."
            className="w-full p-4 focus:outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-blue-500 text-white px-6 py-4 rounded-full hover:bg-blue-700"
          >
            Cari
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 py-5">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <JobCard key={index} job={job} openModal={openModal} />
            ))
          ) : (
            <div className="col-span-1 md:col-span-4 flex items-center justify-center py-10">
              <p className="text-gray-600 text-center">
                Tidak ada pekerjaan yang ditemukan.
              </p>
            </div>
          )}
        </div>
      </section>

      {isModalOpen && (
        <Modal closeModal={closeModal} job={selectedJob} type={modalType} />
      )}
    </div>
  );
};

export default Home;
