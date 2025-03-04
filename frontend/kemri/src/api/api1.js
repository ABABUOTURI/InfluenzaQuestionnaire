import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/"; // Adjust based on your backend URL

// Create an Axios instance with default settings
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
          username: staffNo, // ✅ Use staffNo as username
          email: email,
          password: password,
      });
      return response.data;
  } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      throw error.response?.data || error;
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

// Get Respondents
export const getRespondents = async () => {
  try {
    const response = await api.get("respondents/");
    return response.data;
  } catch (error) {
    console.error("Error fetching respondents:", error.response?.data || error.message);
    throw error;
  }
};

// Create Respondent
export const createRespondent = async (respondentData) => {
  try {
    const response = await api.post("respondents/", respondentData);
    return response.data;
  } catch (error) {
    console.error("Error creating respondent:", error.response?.data || error.message);
    throw error;
  }
};

// Get Educators
export const getEducators = async () => {
  try {
    const response = await api.get("educators/");
    return response.data;
  } catch (error) {
    console.error("Error fetching educators:", error.response?.data || error.message);
    throw error;
  }
};

// Create Educator
export const createEducator = async (educatorData) => {
  try {
    const response = await api.post("educators/", educatorData);
    return response.data;
  } catch (error) {
    console.error("Error creating educator:", error.response?.data || error.message);
    throw error;
  }
};

// Get Topics
export const getTopics = async () => {
  try {
    const response = await api.get("topics/");
    return response.data;
  } catch (error) {
    console.error("Error fetching topics:", error.response?.data || error.message);
    throw error;
  }
};

// Create Topic
export const createTopic = async (topicData) => {
  try {
    const response = await api.post("topics/", topicData);
    return response.data;
  } catch (error) {
    console.error("Error creating topic:", error.response?.data || error.message);
    throw error;
  }
};

export default api;
