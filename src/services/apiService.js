import axios from 'axios';

// Base configuration for axios
const apiClient = axios.create({
  baseURL: process.env.REACT_SERVER_URL || 'https://localhost:4000', // Use your server URL or a URL from environment variables
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET request
export const getData = async (url, params = {}) => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};



// POST request
export const postData = async (url, data) => {
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    console.error("POST request failed:", error);
    throw error;
  }
};

// PUT request
export const putData = async (url, data) => {
  try {
    const response = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    console.error("PUT request failed:", error);
    throw error;
  }
};

// DELETE request
export const deleteData = async (url) => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    console.error("DELETE request failed:", error);
    throw error;
  }
};

export default apiClient;
