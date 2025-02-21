"use client";
import { useState, useEffect } from "react";
import { getJobs } from "./services/job";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WelcomeMessage from "./components/WelcomeMessage";
import JobCardList from "./components/JobCardList";
import JobCardListModal from "./components/JobCardListModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalType, setModalType] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true); 
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedName || "Pengguna");
    }
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        console.log("Data dari API:", data); 

        if (Array.isArray(data)) {
          setJobs(data);
          setFilteredJobs(data);
        } else if (data && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
          setFilteredJobs(data.jobs);
        } else {
          console.error("Format data tidak sesuai atau undefined:", data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) =>
        job.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  const openModal = (type, job = null, htmlContent) => {
    setSelectedJob(job);
    setModalType(type);
    setIsModalOpen(true);
    setHtmlContent(htmlContent);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setHtmlContent("");
  };

  // if (loading) return <p className="text-center text-gray-600 py-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-5 bg-gradient-to-br from-[#f0f9ff] via-[#d1e9ff] to-[#a3c8ff] overflow-hidden">
        <div className="absolute inset-0 bg-no-repeat bg-bottom bg-cover bg-contain" style={{ backgroundImage: "url('/lines.svg')" }} />
        <WelcomeMessage username={username} />
      </section>

      <section className="flex flex-col px-5 items-center">
        <div className="mt-6 flex items-center border rounded-full shadow-lg bg-white w-[90%] md:w-1/2 overflow-hidden">
          <input
            type="text"
            placeholder="Cari Pekerjaan..."
            className="w-full p-4 focus:outline-none text-gray-700"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 py-5">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCardList key={job.id} job={job} openModal={openModal} htmlContent={job.description}/>
            ))
          ) : (
            <div className="col-span-1 md:col-span-4 flex items-center justify-center py-10">
              <p className="text-gray-600 text-center">Tidak ada pekerjaan yang ditemukan.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {isModalOpen && <JobCardListModal closeModal={closeModal} job={selectedJob} />}
    </div>
  );
};

export default Home;
