import axios from "axios";

const API_KEY = process.env.REACT_APP_BACKEND_API_KEY

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  withCredentials: false,
  headers: {
    "Accept": "text/plain",
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject({ message: error.errors.message});
  }
);

export default api;
