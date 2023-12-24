import axiosInstance from "./axios";

const home = async () => {
  return await axiosInstance.get("/");
};

export default home;
