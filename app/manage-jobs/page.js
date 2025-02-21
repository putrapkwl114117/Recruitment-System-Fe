"use client";

import Sidebar from "../components/Sidebar";
import JobCardList from "../components/JobCardList";
import ProfileCard from "../components/ProfileCard";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faSquarePlus, faListUl, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { getJobs } from "../services/job";
import { jwtDecode } from "jwt-decode";
import JobCardListModal from "../components/JobCardListModal";
import JobForm from "../components/JobForm";

const Modal = ({ closeModal, job, formType, htmlContent, triggerRefresh }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            {formType === "edit" ? "Edit Lowongan Pekerjaan" : "Tambah Lowongan Pekerjaan"}
          </h2>
          <FontAwesomeIcon icon={faXmark} onClick={closeModal} className="text-red-500 mx-2 h-10 hover:text-red-700 cursor-pointer" />
        </div>
        <div className="w-full bg-gray-100 h-[3px] my-3"></div>
        <JobForm closeModal={closeModal} triggerRefresh={triggerRefresh}/>
      </div>
    </div>
  );
};

export default function ManageJobs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalFormType, setModalFormType] = useState("");
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev); 
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const allJobs = await getJobs();
        setJobs(allJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [refresh]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        if (decoded && decoded.sub) {
          setUserId(decoded.sub);
          setToken(storedToken);
        } else {
          console.error("Invalid token structure");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);
  
  useEffect(() => {
    if (userId && token) {
      const fetchJobs = async () => {
        try {
          const allJobs = await getJobs();
          const userJobs = allJobs.filter(job => String(job.user_id) === String(userId));
          setJobs(userJobs);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      };
      fetchJobs();
    }
  }, [userId, token]);

  const openModal = (formType, job = null, htmlContent = "") => {
    setSelectedJob(job);
    setModalFormType(formType);
    setIsModalOpen(true);
    setHtmlContent(htmlContent);
  };  

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setHtmlContent("");
    triggerRefresh();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 ml-60 mr-80">
        <h1 className="text-3xl font-bold text-gray-800 ml-4 my-4">Manage Jobs</h1>

        <div className="flex space-x-4 mb-6 ml-4">
          <button
            onClick={() => openModal("post")}
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white shadow transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faSquarePlus} /> Tambah Lowongan
          </button>
          <button
            disabled
            className="bg-white text-gray-400 px-4 py-2 rounded-lg"
          >
            <FontAwesomeIcon icon={faGlobe} /> Komunitas
          </button>
          <button
            disabled
            className="bg-white text-gray-400 px-4 py-2 rounded-lg"
          >
            <FontAwesomeIcon icon={faListUl} /> Pendaftar
          </button>
          <div className="flex items-center bg-white border rounded-full overflow-hidden shadow-sm w-72 p-0 ">
            <input
              type="text"
              placeholder="Cari Pekerjaan..."
              className="p-3 flex-1 outline-none text-gray-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-blue-500 text-white p-3 rounded-full flex items-center justify-center">
              <FaSearch className="text-lg" />
            </button>
          </div>
        </div>

        <div>
          <div className="inline-grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-3 ml-4">
            {jobs.length > 0 ? (
              jobs
                .filter((job) =>
                  job.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((job) => (
                  <JobCardList 
                    key={job.id} 
                    job={job} 
                    userId={userId}
                    triggerRefresh={triggerRefresh}
                    setModalFormType={setModalFormType}
                    openModal={() => openModal("jobDetails", job, job.description)} 
                  />
                ))
            ) : (
              <p className="text-gray-500">Tidak ada pekerjaan yang ditemukan.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-0 p-0">
        <div className="fixed right-0 mt-10 mr-3 p-0">
          <ProfileCard />
        </div>
      </div>

      {isModalOpen && (
        modalFormType === "jobDetails" ? (
          <JobCardListModal closeModal={closeModal} job={selectedJob} htmlContent={htmlContent} triggerRefresh={triggerRefresh} />
        ) : (
          <Modal closeModal={closeModal} job={selectedJob} formType={modalFormType} htmlContent={htmlContent} />
        )
      )}
    </div>
  );
}
