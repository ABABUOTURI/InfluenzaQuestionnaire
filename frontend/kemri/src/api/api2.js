import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";  // Ensure your backend is running

export const fetchStaffList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/staff-list/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching staff list:", error);
    return [];
  }
};
