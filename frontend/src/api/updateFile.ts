import Axios from "./axios";

export const updateFile = (toRemoveArray: string[]) => {
  const body = { removeColumnArray: toRemoveArray };
  // console.log("body", body);
  return Axios.post("/updateDownload", body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => false);
};
