import axios from "axios";
import { getCookie } from "cookies-next";
import { API_BASE_URL, AUTH_COOKIE_NAME } from "./config";

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getCookie(AUTH_COOKIE_NAME),
  },
});

instance.interceptors.request.use((config) => {
  const token = getCookie(AUTH_COOKIE_NAME);
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default instance;
