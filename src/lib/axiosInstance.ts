import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://backend-spit.onrender.com/v1/",
});

let isOffline = !navigator.onLine;

axiosInstance.interceptors.request.use(
  (config) => {
    if (!isOffline) {
      const authToken = localStorage.getItem("accessToken");
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    } else {
      throw Error("Connect to an Internet Connection First");
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
