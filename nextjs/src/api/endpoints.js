import axios from "axios";

const API_BASE_URL = 'http://localhost:8000/api/v1';

const jsonHeader = (token) => ({
  'Accept': 'application/json',
  ...(token ? { 'api-key': token } : {}),
});


// Function to log-in and get token
export const getToken = async (username, password) => {
    const response = await axios.post(`${API_BASE_URL}/token?username=${username}&password=${password}`, null, {
        headers: jsonHeader
    });
    return response.data;
};

// Function to get user profile
export const getProfile = async (accessToken) => {
    const response = await axios.get(`${API_BASE_URL}/users/profile`, {
        headers: jsonHeader(accessToken),
    });
    return response.data;
};

// log out function
export const logout = async (accessToken) => {
    await axios.post(`${API_BASE_URL}/logout`, {}, {headers: jsonHeader(accessToken)});

};


// Users related functions, get, post, delete, put
export const fetchUsers = async (accessToken) => {
    const {data} = await axios.get(`${API_BASE_URL}/users/`, {
        headers: jsonHeader(accessToken)
    });
    return data;
};

export const updateUser = async (user, accessToken) => {
    // noinspection JSUnresolvedReference
    const {data} = await axios.put(`${API_BASE_URL}/users/${user._id}`, user, {
        headers: jsonHeader(accessToken)
    });
    return data;
};

export const deleteUser = async (id, accessToken) => {
    await axios.delete(`${API_BASE_URL}/users/${id}`, {
        headers: jsonHeader(accessToken)
    });
    return id;
};

export const createUser = async (user, accessToken) => {
    console.log(user)
    const {data} = await axios.post(`${API_BASE_URL}/users/`, user, {
        headers: jsonHeader(accessToken)
    });
    return data;
};
