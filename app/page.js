// pages/Home.js
"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import JobService from "./services/jobsendpoints";
import JobCard from "./components/Card";
import PostJobButton from "./components/PostJob";
import Modal from "./components/ModalCardHome";
import Link from "next/link";
import { useRouter } from "next/router"; // Menggunakan router untuk pengalihan

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const router = useRouter(); // Router untuk melakukan pengalihan

  useEffect(() => {
    // Memeriksa apakah user sudah login
    const token = localStorage.getItem("auth_token"); // Misalnya token disimpan di localStorage
    if (!token) {
      // Jika belum login, arahkan ke halaman login
      router.push("/login");
    }

    const fetchJobs = async () => {
      try {
        const jobsData = await JobService.getAllJobs(); // Ambil semua pekerjaan
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [router]); // Dependensi router untuk melakukan pengalihan

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

  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-5 bg-gradient-to-br from-[#f0f9ff] via-[#d1e9ff] to-[#a3c8ff] overflow-hidden">
        <div
          className="absolute inset-0 bg-no-repeat bg-bottom bg-cover bg-contain"
          style={{ backgroundImage: "url('/lines.svg')" }}
        />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 tracking-wide font-serif">
            Temukan Peluang, <br />
            Wujudkan Karier Impian
          </h2>
          <p className="text-gray-600 mt-4 max-w-4xl mx-auto text-center">
            Jelajahi berbagai peluang kerja yang sesuai dengan keahlian dan
            tujuan Anda. Baik Anda mencari pekerjaan tetap, freelance, atau
            proyek jangka pendek, semuanya ada di sini!
            <br />
            <br />
            Ingin merekrut tenaga profesional atau menawarkan jasa?
            <span className="font-semibold text-blue-600">
              {" "}
              Posting pekerjaan{" "}
            </span>
            Anda sekarang dan temukan orang yang tepat dalam hitungan menit!
          </p>
          {/* Tombol posting pekerjaan dengan pengecekan login */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 mt-6"
            onClick={() => {
              // Pengecekan login sebelum pengalihan
              const token = localStorage.getItem("auth_token");
              if (token) {
                router.push("/manage-jobs"); // Arahkan ke manage-jobs jika sudah login
              } else {
                router.push("/login"); // Arahkan ke login jika belum login
              }
            }}
          >
            Posting Pekerjaan
          </button>
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
              <div key={index} onClick={() => openModal(job)}>
                <JobCard job={job} />
              </div>
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

      {isModalOpen && <Modal closeModal={closeModal} job={selectedJob} />}
    </div>
  );
};

export default Home;
