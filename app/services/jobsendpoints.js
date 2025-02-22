import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api/jobs";

const JobService = {
  // Mengambil semua pekerjaan tanpa filter
  getAllJobs: async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all jobs:", error.response ? error.response.data : error);
      throw error;
    }
  },

  // Mengambil pekerjaan berdasarkan userId (filter berdasarkan pengguna)
  getJobs: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Mengambil pekerjaan berdasarkan ID
  getJobById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching job with ID ${id}:`, error.response ? error.response.data : error);
      throw error;
    }
  },

  // Membuat pekerjaan baru
  createJob: async (jobData) => {
    try {
      const response = await axios.post(API_URL, jobData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating job:", error.response ? error.response.data : error);
      throw error;
    }
  },

  // Mengupdate pekerjaan
  updateJob: async (id, jobData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, jobData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating job with ID ${id}:`, error.response ? error.response.data : error);
      throw error;
    }
  },

  // Menghapus pekerjaan
  deleteJob: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting job with ID ${id}:`, error.response ? error.response.data : error);
      throw error;
    }
  },
};

export default JobService;
