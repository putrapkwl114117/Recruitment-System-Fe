"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import JobService from "../services/jobsendpoints"; 

const JobForm = ({ onClose, onSubmit, job }) => {
  const [description, setDescription] = useState("");
  const [provinsiList, setProvinsiList] = useState([]);
  const [kabupatenList, setKabupatenList] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState("");
  const [selectedKabupaten, setSelectedKabupaten] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [salary, setSalary] = useState("");
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["Kesehatan", "Pendidikan", "Logistik", "Rumah Tangga"];

  useEffect(() => {
    console.log("Received job data:", job);
    axios
      .get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => setProvinsiList(res.data))
      .catch((err) => console.error("Error fetching provinces:", err));

    if (job) {
      setTitle(job.title);
      setDescription(job.description);
      setSalary(job.salary);
      setType(job.type);
      setLocation(job.location);

      // Set category and custom category if applicable
      if (categories.includes(job.category)) {
        setCategory(job.category);
      } else {
        setCategory("lainnya");
        setCustomCategory(job.category);
      }

      // Parse job.location to set selectedProvinsi and selectedKabupaten
      const [kabupaten, provinsi] = job.location.split(", ");
      setSelectedProvinsi(provinsi);
      setSelectedKabupaten(kabupaten); 

      handleProvinsiChange({ target: { value: provinsi } });
    }
  }, [job]);


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


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const plainText = description.trim();
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
      if (job) {
        await JobService.updateJob(job.id, formData);
      } else {
        await JobService.createJob(formData);
      }
      onSubmit();
    } catch (error) {
      console.error("Error submitting job:", error.response?.data || error.message || error);
      alert("Terjadi kesalahan saat menyimpan pekerjaan.");
    } finally {
      setIsLoading(false);
      if (!job) resetForm();
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setCustomCategory("");
    setSalary("");
    setType("");
    setLocation("");
    setDescription("");
    setSelectedProvinsi("");
    setSelectedKabupaten("");
    setKabupatenList([]);
  };

  return (
    <form onSubmit={handleSubmit} className="form px-4">
      <div className="overflow-auto max-h-[75vh] p-2 bg-white border rounded-lg shadow-lg transition-transform transform translate-x-0">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Judul
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Kategori
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Pilih Kategori</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="lainnya">Lainnya</option>
          </select>
          {category === "lainnya" && (
            <input
              type="text"
              placeholder="Masukkan kategori kustom"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
            Gaji
          </label>
          <input
            type="number"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
            Tipe Pekerjaan
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Pilih Tipe</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Lokasi
          </label>
          <select
            id="provinsi"
            value={selectedProvinsi}
            onChange={handleProvinsiChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Pilih Provinsi</option>
            {provinsiList.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.name}
              </option>
            ))}
          </select>
          {selectedProvinsi && (
            <select
                    id="kabupaten"
                    value={selectedKabupaten}
                    onChange={handleKabupatenChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                    >
                    <option value="">Pilih Kabupaten</option>
                    {kabupatenList.map((kab) => (
                    <option key={kab.id} value={kab.id}>
                    {kab.name}
                    </option>
                    ))}
                    </select>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Deskripsi
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="5"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Mengirim..." : "Simpan"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Kembali
          </button>
        </div>
      </div>
    </form>
  );
};

export default JobForm;
