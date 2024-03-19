import axios from "axios";

export const getProfile = async (storedToken) => {
    const response = await axios.get('http://localhost:8000/api/v1/users/profile', {
        headers: {
            'Accept': 'application/json',
            'api-key': storedToken,
        },
    });
    return response.data;
};