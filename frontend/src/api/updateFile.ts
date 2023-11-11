import Axios from "./axios";

export const updateFile = (toRemoveArray: [string]) => {
  const body = { removeColumnArray: toRemoveArray };
  return Axios.post("/updateDownload", body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => false);
};
