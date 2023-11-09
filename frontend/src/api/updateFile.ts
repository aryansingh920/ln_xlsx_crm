import Axios from "./axios";

export const updateFile = (
  toRemoveArray: [string]
): Promise<ArrayBuffer | false> => {
  const body = { removeColumnArray: toRemoveArray };
  return Axios.post("/updateDownload", body, { responseType: "arraybuffer" })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => false);
};
