import axios from "axios";
import NProgress from "nprogress";

const axiosInstance = (baseUrl: string) => {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, Content-Type, X-Auth-Token ,X-Requested-With",
    },
  });

  instance.interceptors.request.use((config) => {
    NProgress.start();

    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = "Bearer " + token;
    // if (token) config.headers["auth-token"] = "Bearer " + token;

    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      NProgress.done();
      return response;
    },
    (error) => {
      NProgress.done();
      return Promise.reject(error);
    }
  );

  return instance;
};

export const $api = axiosInstance(import.meta.env.VITE_API_BASE_URL);
