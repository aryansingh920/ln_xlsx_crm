import axios, { AxiosInstance } from "axios";
import { baseUrl } from "./baseUrl";
const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

export default axiosInstance;
