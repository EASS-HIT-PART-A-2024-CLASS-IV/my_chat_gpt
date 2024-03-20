import axios from "axios";

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Function to login and get token
export const getToken = async (username, password) => {
    const response = await axios.post(`${API_BASE_URL}/token?username=${username}&password=${password}`, null, {
        headers: { 'Accept': 'application/json' }
    });
    return response.data;
};

// Function to get user profile
export const getProfile = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/users/profile`, {
        headers: {
            'Accept': 'application/json',
            'api-key': token,
        },
    });
    return response.data;
};

export const logout = async (token) => {
    await axios.post(`${API_BASE_URL}/logout`, {}, {headers: {
                    'Accept': 'application/json',
                    'api-key': token, // Use the current token as the API key
                }});

};
