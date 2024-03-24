import axios from "axios";
import {jsonHeader, staticBearerHeader} from "@/api/headers";

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000/api/v1';


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


// ChatGPT
export const fetchChatResponse = async (question, accessToken, model) => {
    // Simulated API call
    console.log("Sending question to the API:", question, "with model", model);

    const url = new URL(`${API_BASE_URL}/chat/`);
    url.searchParams.append('question', question);
    url.searchParams.append('model', model);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'api-key': accessToken,
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};


export const forgotPassword = async (email) => {
    await axios.post(`${API_BASE_URL}/users/forgot-password/`, {}, {
        params: { email },
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer bringthemhome',
        },
    });
};


export const postResetPassword = async ({ token, newPassword }) => {
  const response = await axios.post(`${API_BASE_URL}/users/reset-password/`, {}, {
    params: { token, new_password: newPassword },
    headers: staticBearerHeader,
  });
  return response.data;
};


export const postRegister = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/register/`, {
    email: userData.email,
    full_name: userData.fullName,
    password: userData.password,
    username: userData.username,
  }, {
    headers: staticBearerHeader,
  });

  return response.data;
};