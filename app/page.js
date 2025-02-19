"use client";
import { useState } from 'react'; 
import Navbar from "./components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faClock, faSackDollar } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ closeModal, job, type }) => {
  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2">
        {type === "jobDetails" && job ? (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-blue-500">{job.title}</h2>
              <span className="flex text-center text-gray-600 bg-gray-100 p-2 rounded-lg">
                {job.category}
              </span>
            </div>  
            <div className="text-gray-500 text-sm flex items-center py-2">
              <span className="flex items-center">
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                {job.type}
              </span>
              <span className="flex items-center ms-5">
                <FontAwesomeIcon icon={faSackDollar} className="mr-2" />
                {job.salary}
              </span>
              <span className="flex items-center ms-5">
                <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                {job.location}
              </span>
            </div>
            <div className="w-full bg-gray-100 h-[3px]"></div>
            <p className="mt-4 text-[#555555] text-justify">
              <span className="font-semibold">DESKRIPSI:</span> <br /> 
              {job.description}
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-2 text-center text-red-600">AKSES DIBATASI !</h2>
            <p className="text-gray-600 mb-4 text-center">
              Anda harus login atau daftar terlebih dahulu untuk memposting lowongan kerja.
            </p>
          </>
        )}
        
        <div className="w-full bg-gray-100 h-[3px] my-4"></div>
        <div className="flex justify-end mt-4">
          <button onClick={closeModal} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">Close</button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalType, setModalType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const jobs = [
    {
      title: "Bidan",
      location: "Jakarta Timur, DKI Jakarta",
      type: "Penuh Waktu",
      category: "Kesehatan",
      salary: "Rp 4.000.000",
      description: "Kami mencari bidan yang berpengalaman untuk membantu dalam proses persalinan, pemeriksaan kehamilan, serta memberikan edukasi kesehatan bagi ibu dan bayi. Kandidat diharapkan memiliki sertifikasi dan pengalaman di bidang kebidanan.",
    },
    {
      title: "Perawat",
      location: "Bandung, Jawa Barat",
      type: "Penuh Waktu",
      category: "Kesehatan",
      salary: "Rp 3.500.000",
      description: "Dibutuhkan perawat yang berdedikasi untuk merawat pasien, memberikan obat sesuai resep dokter, serta membantu dalam pemulihan kesehatan pasien. Pengalaman di rumah sakit atau klinik menjadi nilai tambah.",
    },
    {
      title: "Guru Ngaji",
      location: "Surabaya, Jawa Timur",
      type: "Paruh Waktu",
      category: "Pendidikan",
      salary: "Rp 2.000.000",
      description: "Kami mencari guru ngaji yang sabar dan berpengalaman dalam mengajar anak-anak maupun dewasa dalam membaca Al-Qur'an. Diharapkan memiliki metode pengajaran yang baik dan dapat berinteraksi dengan santri secara efektif.",
    },
    {
      title: "Asisten Rumah Tangga (ART)",
      location: "Depok, Jawa Barat",
      type: "Penuh Waktu",
      category: "Rumah Tangga",
      salary: "Rp 2.500.000",
      description: "Dibutuhkan Asisten Rumah Tangga (ART) yang jujur dan rajin untuk membantu dalam pekerjaan rumah tangga seperti membersihkan rumah, mencuci pakaian, dan memasak. Pengalaman tidak diwajibkan, namun menjadi nilai tambah.",
    },
    {
      title: "Kurir",
      location: "Yogyakarta, DIY",
      type: "Penuh Waktu",
      category: "Logistik",
      salary: "Rp 3.000.000",
      description: "Kami mencari kurir yang memiliki kendaraan pribadi untuk mengantarkan barang ke berbagai lokasi dengan tepat waktu. Diharapkan memiliki SIM C yang masih berlaku dan memahami rute perjalanan dengan baik.",
    },
  ];  

  const filteredJobs = jobs.filter(job =>
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-5 bg-gradient-to-br from-[#f0f9ff] via-[#d1e9ff] to-[#a3c8ff] overflow-hidden">
        <div className="absolute inset-0 bg-no-repeat bg-bottom bg-cover bg-contain" style={{ backgroundImage: "url('/lines.svg')" }} />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 tracking-wide font-serif">
            Temukan Peluang, <br></br>Wujudkan Karier Impian 
          </h2>
          <p className="text-gray-600 mt-4 max-w-4xl mx-auto text-center">
            Jelajahi berbagai peluang kerja yang sesuai dengan keahlian dan tujuan Anda. Baik Anda mencari pekerjaan tetap, freelance, atau proyek jangka pendek, semuanya ada di sini!  
            <span className="font-semibold text-blue-600"> Gulir ke bawah</span> untuk melihat daftar pekerjaan terbaru.  
            <br /><br />
            Ingin merekrut tenaga profesional atau menawarkan jasa?  
            <span className="font-semibold text-blue-600"> Posting pekerjaan</span> Anda sekarang dan temukan orang yang tepat dalam hitungan menit!  
          </p>
          <button onClick={() => openModal("postJob")} className="border-2 border-blue-500 shadow-lg text-blue-500 bg-transparent mt-5 px-6 py-4 rounded-full hover:bg-blue-500 hover:text-white transition-all">
            POSTING PEKERJAAN 🚀
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
          <button type="button" onClick={handleSearch} className="bg-blue-500 text-white px-6 py-4 rounded-full hover:bg-blue-700">
            Cari
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 py-5">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <div
              key={index}
              onClick={() => openModal("jobDetails", job)}
              className="p-2 bg-[#F8FAFB] shadow-md rounded-xl hover:bg-gradient-to-br hover:from-[#80d1ff] to-[#80d1ff] transition duration-300"
              >
                <div className="p-6 bg-white rounded-xl">
                  <div className="flex justify-between items-center">
                    <h3 className="text-blue-500 text-xl font-semibold">{job.title}</h3>
                    <span className="flex text-center text-gray-600 bg-gray-100 p-2 rounded-lg">
                      {job.category}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-[3px] my-4"></div>
                  <div className="flex mt-3 text-gray-500">
                    <p className="line-clamp-2">{job.description}</p>
                  </div>
                </div>
                <div className="text-gray-500 text-sm flex justify-end items-center p-3">
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    {job.type}
                  </span>
                  <span className="flex items-center ms-4">
                    <FontAwesomeIcon icon={faSackDollar} className="mr-2" />
                    {job.salary}
                  </span>
                </div>
                <div className="text-gray-500 text-sm flex justify-end items-center px-3">
                  <span className="flex items-center justify-center">
                    <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                    {job.location}
                  </span>
                </div>
              </div>          
            ))
          ) : (
            <div className="col-span-1 md:col-span-4 flex items-center justify-center py-10">
              <p className="text-gray-600 text-center">Tidak ada pekerjaan yang ditemukan.</p>
            </div>
          )}
        </div>
      </section>

      {isModalOpen && <Modal closeModal={closeModal} job={selectedJob} type={modalType} />}
    </div>
  );
};

export default Home;
