"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { createJob, updateJob } from "../services/job";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const JobForm = ({ job, closeModal, triggerRefresh }) => {
  const editor = useRef(null);
  const router = useRouter();

  const [description, setDescription] = useState(job?.deskripsi || "");
  const [provinsiList, setProvinsiList] = useState([]);
  const [kabupatenList, setKabupatenList] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState("");
  const [selectedKabupaten, setSelectedKabupaten] = useState("");
  const [location, setLocation] = useState(job?.lokasi || "");
  const [title, setTitle] = useState(job?.judul || "");
  const [category, setCategory] = useState(job?.kategori || "");
  const [customCategory, setCustomCategory] = useState("");
  const [salary, setSalary] = useState(job?.gaji || "");
  const [type, setType] = useState(job?.tipe || "");
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["Kesehatan", "Pendidikan", "Logistik", "Rumah Tangga"];

  useEffect(() => {
    if (isEditMode) {
      setTitle(job?.judul || "");
      setCategory(job?.kategori || "");
      setSalary(job?.gaji || "");
      setType(job?.tipe || "");
      setLocation(job?.lokasi || "");
      setDescription(job?.deskripsi || "");
    }
  }, [job]);

  useEffect(() => {
    axios
      .get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => setProvinsiList(res.data))
      .catch((err) => console.error("Error fetching provinces:", err));
  }, []);

  const handleProvinsiChange = async (e) => {
    const provId = e.target.value;
    setSelectedProvinsi(provId);
    setKabupatenList([]);
    setSelectedKabupaten("");

    if (!provId) return;

    try {
      const { data } = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provId}.json`
      );
      setKabupatenList(data);
    } catch (err) {
      console.error("Error fetching regencies:", err);
    }
  };

  const handleKabupatenChange = (e) => {
    const kabId = e.target.value;
    const kabupaten = kabupatenList.find((kab) => kab.id === kabId);

    if (kabupaten && selectedProvinsi) {
      const provinsi = provinsiList.find((p) => p.id === selectedProvinsi);
      setSelectedKabupaten(kabId);
      setLocation(`${kabupaten.name}, ${provinsi?.name || ""}`);
    }
  };

  const isEditMode = !!job;
  const jobId = job?.id;
  const userToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!userToken) {
    alert("Anda harus login terlebih dahulu.");
    setIsLoading(false);
    return;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const plainText = description.replace(/<[^>]*>/g, "").trim();
    if (!plainText) {
      alert("Deskripsi wajib diisi!");
      setIsLoading(false);
      return;
    }

    const formData = {
      title,
      category: category === "lainnya" ? customCategory : category,
      salary,
      type,
      location,
      description,
    };

    try {
      if (isEditMode) {
          await updateJob(jobId, formData, userToken);
      } else {
          await createJob(formData, userToken);
      }
      if (closeModal) closeModal();
      if (triggerRefresh) triggerRefresh();
    } catch (error) {
      console.error("Error submitting job:", error.response?.data || error.message || error);
      alert("Terjadi kesalahan saat menyimpan pekerjaan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="overflow-auto max-h-[60vh] p-2">
        {/* Judul */}
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-1">Judul</label>
          <input
            type="text"
            placeholder="Masukkan judul pekerjaan"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-gray-500 w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Kategori */}
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-1">Kategori</label>
          <select
            className="text-gray-500 w-full p-2 border rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Pilih kategori</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
            <option value="lainnya">Lainnya...</option>
          </select>

          {category === "lainnya" && (
            <input
              type="text"
              className="mt-2 text-gray-500 w-full p-2 border rounded-md"
              placeholder="Masukkan kategori sendiri"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            />
          )}
        </div>

        {/* Tipe */}
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-1">Tipe</label>
          <select 
            className="text-gray-500 w-full p-2 border rounded-md"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Pilih tipe</option>
            <option>Remote</option>
            <option>On-Site</option>
            <option>Hybrid</option>
          </select>
        </div>

        {/* Gaji */}
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-1">Gaji</label>
          <input
            type="number"
            placeholder="Masukkan gaji"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
            className="text-gray-500 w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>


        {/* Lokasi */}
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-1">Lokasi</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div>
              <label className="block text-gray-600">Provinsi</label>
              <select 
                className="text-gray-500 w-full p-2 border rounded-md" 
                value={selectedProvinsi} onChange={handleProvinsiChange}
                required
              >
                <option value="">Pilih Provinsi</option>
                {provinsiList.map((prov) => (
                  <option key={prov.id} value={prov.id}>
                    {prov.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-600">Kabupaten/Kota</label>
              <select 
                className="text-gray-500 w-full p-2 border rounded-md" 
                value={selectedKabupaten} onChange={handleKabupatenChange} 
                disabled={!selectedProvinsi}
                required
              >
                <option value="">Pilih Kabupaten/Kota</option>
                {kabupatenList.map((kab) => (
                  <option key={kab.id} value={kab.id}>
                    {kab.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Lokasi yang akan disimpan */}
            <div>
              <label className="block text-gray-600">Lokasi yang Disimpan</label>
              <input
                type="text"
                className="text-gray-500 text-sm w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                value={location}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block text-gray-600 font-semibold mb-1">Deskripsi</label>
          <JoditEditor ref={editor} 
            value={description} 
            onChange={setDescription} 
          />
        </div>
      </div>

      <div className="w-full bg-gray-100 h-[3px] my-4"></div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md" disabled={isLoading}>
        {isLoading ? "Menyimpan..." : isEditMode ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default JobForm;
