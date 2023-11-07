import axios, { AxiosInstance } from "axios";
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3005",
});

export default axiosInstance;
