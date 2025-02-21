import axios from 'axios';

const API_URL = "http://localhost:8000/api"; 

// Mendapatkan daftar semua pekerjaan
export const getJobs = async () => {
    try {
        const response = await axios.get(`${API_URL}/jobs`);
        return response.data;
    } catch (error) {
        console.error("Error fetching jobs:", error.response ? error.response.data : error.message);
        throw error.response?.data || { message: "Error fetching jobs", details: error.message };
    }
};

// Mendapatkan detail pekerjaan berdasarkan ID
export const getJobById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/jobs/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error fetching job details";
    }
};

export const getJobsByUser = async (userId, token) => {
    console.log("API Call: getJobsByUser");
    console.log("User ID:", userId);
    console.log("Token:", token);
  
    try {
      const response = await fetch(`http://localhost:8000/api/jobs/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pastikan token dikirim
        },
      });
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch jobs");
      }
  
      return data;
    } catch (error) {
      console.error("Error in getJobsByUser:", error);
      return [];
    }
  };
  

// Menambahkan pekerjaan baru (Harus login)
export const createJob = async (jobData, token) => {
    try {
        const response = await axios.post(`${API_URL}/jobs`, jobData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error creating job";
    }
};

// Mengupdate pekerjaan berdasarkan ID (Harus login)
export const updateJob = async (id, jobData, token) => {
    try {
        const response = await axios.put(`${API_URL}/jobs/${id}`, jobData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error updating job";
    }
};

// Menghapus pekerjaan berdasarkan ID (Harus login)
export const deleteJob = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/jobs/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error deleting job";
    }
};
