import Axios from "./axios";
interface DataObject {
  status: string;
  toKeepArray: string[];
  columnNames: string[];
  toRemoveArray: [string];
}

export const uploadFile = (file: File): Promise<DataObject> => {
  const formData = new FormData();
  formData.append("file", file);

  return Axios.post("/upload", formData)
    .then((res) => res.data)
    .catch((err) => false);
};
