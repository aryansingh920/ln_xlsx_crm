import axiosInstance from "./axios";

const deleteFile = async (file: string, type: string) => {
  return await axiosInstance.get(`/deleteFile?fileNumber=${file}&dir=${type}`);
};

export default deleteFile;
