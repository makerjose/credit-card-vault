import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/users';

// Register a new user
export const registerUser = async (userData) => {
    try {
      const response = await axios.post(API_BASE_URL, userData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  };

// Function to perform user login
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth`, credentials);
    return response.data; // Make sure to return the data from the response
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


  // Logout the user
export const logoutUserApi = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`);
    } catch (error) {
      console.error('Error logging out:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  };
