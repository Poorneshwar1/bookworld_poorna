import axios from "axios";

const BASE_URL = "http://localhost:8089"; // for auth, user, book services
const PAYMENT_URL = "http://localhost:8089"; // for payment service

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export { axiosInstance, BASE_URL, PAYMENT_URL };
