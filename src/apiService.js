import axios from "axios";

const API = process.env.REACT_APP_BACKEND_API
const API_KEY = process.env.REACT_APP_BACKEND_API_KEY

const api = axios.create({
  baseURL: API,
  withCredentials: false,
  headers: {
    "Accept": "*/*", 
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Request has started");
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response has been sent");
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject({ message: error.errors.message });
  }
);

export default api;
