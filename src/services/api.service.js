import axios from 'axios';

// Base URL points to your Node.js server
const API_BASE_URL = 'http://localhost:3000/api';

export const fetchIpoStats = async (piAddress) => {
    try {
        // We pass the piAddress to get user-specific balance (Value 3)
        const response = await axios.get(`${API_BASE_URL}/ipo/stats`, {
            params: { piAddress }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching IPO stats:", error);
        throw error;
    }
};

export const processInvestment = async (paymentData) => {
    return await axios.post(`${API_BASE_URL}/ipo/invest`, paymentData);
};

