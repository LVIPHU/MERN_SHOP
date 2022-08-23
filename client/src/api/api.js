import axios from "axios";
// import isAuthenticated from "../shared/auth/permissionChecker";

const api = axios.create({
  baseURL: "http://localhost:3001/api/",
});

api.interceptors.request.use(
  async (config) => {
    // if (await isAuthenticated()) {
    //   config.headers["Authorization"] = "Bearer " + await isAuthenticated();
    // }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default api;
