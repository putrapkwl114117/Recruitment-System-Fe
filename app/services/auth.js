import axios from "axios";

// URL endpoint Laravel API
const API_URL = "http://localhost:8000/api"; 

export const register = async (data) => {
  try {
    console.log("Mengirim data register ke API:", data); // Debug: Lihat data yang dikirim
    const response = await axios.post(`${API_URL}/register`, data);
    console.log("Respons dari API (Register):", response.data); // Debug: Lihat respons dari API
    return response.data;
  } catch (error) {
    console.error("Error dari API (Register):", error.response?.data || error.message); // Debug: Lihat error dari API
    throw error.response?.data || error.message;
  }
};

export const login = async (data) => {
  try {
    console.log("Mengirim data login ke API:", data); // Debug: Lihat data yang dikirim
    const response = await axios.post(`${API_URL}/login`, data);
    console.log("Respons dari API (Login):", response.data); // Debug: Lihat respons dari API
    return response.data;
  } catch (error) {
    console.error("Error dari API (Login):", error.response?.data || error.message); // Debug: Lihat error dari API
    throw error.response?.data || error.message;
  }
};