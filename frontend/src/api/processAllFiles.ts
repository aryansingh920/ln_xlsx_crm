import axiosInstance from "./axios";

const processAllFiles = async () => {
  return await axiosInstance.get("/processAllFiles");
};

export default processAllFiles;
