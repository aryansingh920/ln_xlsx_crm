import { baseUrl } from "./baseUrl";


const fileDownloadLink = (fileName: string, errorType: string) => {
  const link = `${baseUrl}/download?fileNumber=${fileName}&dir=${errorType}`;

  return link;
};

export default fileDownloadLink;
