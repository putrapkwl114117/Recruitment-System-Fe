import { useState, useEffect } from "react";
import axios from "axios";

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Gagal ambil data jobs", err);
    }
  };

  const createJob = async (form) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    try {
      await axios.post("http://localhost:8000/api/jobs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      fetchJobs();
    } catch (err) {
      console.error("Gagal simpan job", err);
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (id, form) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    try {
      await axios.post(
        `http://localhost:8000/api/jobs/${id}?_method=PUT`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchJobs();
    } catch (err) {
      console.error("Gagal update job", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobs();
    } catch (err) {
      console.error("Gagal hapus job", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    loading,
    createJob,
    updateJob,
    deleteJob,
  };
}
        