

import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/"; // Adjust based on backend

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set Authorization token dynamically
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers["Authorization"] = `Token ${token}`;
  } else {
    delete api.defaults.headers["Authorization"];
  }
};

// User Registration
export const registerUser = async (staffNo, email, password) => {
  try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/", {
          staff_no: staffNo,
          email: email,
          password: password
      });
      return response.data;
  } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      throw error;
  }
};



// Get Users (Requires Authentication)
export const getUsers = async () => {
  try {
    const response = await api.get("users/");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    throw error;
  }
};

// Get Submitted Forms (Adjusted Endpoint)
export const getSubmittedForms = async () => {
  try {
    const response = await api.get("submitted-forms/");
    return response.data;
  } catch (error) {
    console.error("Error fetching submitted forms:", error.response?.data || error.message);
    throw error;
  }
};

// Submit a New Form
export const createSubmittedForm = async (formData) => {
  try {
    const response = await api.post("submitted-forms/", formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting form:", error.response?.data || error.message);
    throw error;
  }
};

export default api;
