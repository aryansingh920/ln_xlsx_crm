import axiosInstance from "./axios";

const fileInformation = async () => {
  return await axiosInstance.get("/getFileDetails");
};

export default fileInformation;
