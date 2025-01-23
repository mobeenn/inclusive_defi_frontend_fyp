import axios from "axios";
import { getToken, logout } from "./auth";

const axiosAuth = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
   },
});

const axiosPrivate = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
   },
});

const axiosPrivateForm = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
   headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
   },
});

// axiosPrivate.interceptors.response.use(
//    (response) => response,
//    (error) => {
//       console.log("error.response", error);
//       if (!error.response) {
//          return Promise.reject(error);
//       }
//       if (error.response?.status === 403) {
//          // logout();
//       }
//       return Promise.reject(error);
//    }
// );

// axiosPrivate.interceptors.response.use(
//    async (response) => response,
//    (error) => {
//       if (!error.response) {
//          return Promise.reject(error);
//       }
//       if (error?.response?.status === 500) {
//          console.log("error.response", error.response);
//          return Promise.reject(error.response);
//       }
//       if (error?.response?.status === 404) {
//          console.log("error.response", error.response);
//          return Promise.reject(error.response);
//       }
//       return Promise.reject(error);
//    }
// );

axiosPrivate.interceptors.request.use(
   async (config) => {
      const token = getToken();
      if (token) {
         config.headers["x-auth-token"] = token;
         return config;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);
axiosPrivateForm.interceptors.request.use(
   async (config) => {
      const token = getToken();
      if (token) {
         config.headers["x-auth-token"] = token;
         return config;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export { axiosAuth, axiosPrivate, axiosPrivateForm };
