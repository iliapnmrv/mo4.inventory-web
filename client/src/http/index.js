import axios from "axios";

export const API_URL = `http://localhost:8000/api/`;

// export const SERVER = "http://mo4-it5:8000/"

const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

$api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default $api;
