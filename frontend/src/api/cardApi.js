import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/cardDetails';

// Function to create card details
export const createCardDetails = async (cardData) => {
  try {
    // debugger; 
    console.log('API_BASE_URL:', API_BASE_URL); // Debug statement to inspect API_BASE_URL
    console.log('cardData:', cardData); // Debug statement to inspect cardData

    const response = await axios.post(`${API_BASE_URL}/`, cardData);
    return response.data;
  } catch (error) {
    console.error('Error creating card details:', error.response?.data || error.message);
    console.log('Error Response cardApi:', error.response);
    throw error.response?.data || error.message;
  }
};

