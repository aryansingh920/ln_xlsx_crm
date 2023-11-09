import Axios from "./axios";

export const getHomeData = (): Promise<boolean> => {
  return Axios.get("/")
    .then((res) => true)
    .catch((err) => false);
};
