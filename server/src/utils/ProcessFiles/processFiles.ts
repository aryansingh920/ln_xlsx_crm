import { getCurrentFileNumber } from "../UploadExcel/getNextFileName";
// import axios from "axios";
import uploadFile from "../UploadAxios/upload";

import axios, { AxiosResponse } from "axios";

interface UpdateDownloadBody {
  fileName: string;
  removeColumnArray: string[];
}

async function updateDownload(
  body: UpdateDownloadBody,
  fullUrl: string
): Promise<AxiosResponse<any>> {
  const url = `${fullUrl}/updateDownload`;

  try {
    // Make the POST request using axios
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Return the response
    return response;
  } catch (error) {
    // Handle errors, log, or throw as needed
    throw error;
  }
}

// // Example usage:

export async function processFiles(fullUrl: string) {
  // console.log("processEmailsAndNames", fullUrl);
  // console.log("getCurrentFileNumber", getCurrentFileNumber());

  if (getCurrentFileNumber() === 0) {
    console.log("No files to process");
    return "No files to process";
  } else {
    for (let i = 1; i <= getCurrentFileNumber(); i++) {
      console.log("uploading file", i);

      const response = await uploadFile(
        `${fullUrl}/process`,
        `uploads/${i}.xlsx`
      )
        .then(async (response) => {
          const { fileName, status, toRemoveArray } = response.data;
          if (status === "success") {
            const requestBody: UpdateDownloadBody = {
              fileName: fileName,
              removeColumnArray: toRemoveArray,
            };

            console.log("Outputting the file");
            await updateDownload(requestBody, fullUrl)
              .then((response) => {
                // Handle the response data
                console.log("Response:", response.data);
              })
              .catch((error) => {
                // Handle errors
                console.error("Error:", error.message);
              });
          } else {
            console.log("status", status);
            return status;
          }
          // console.log("response", response.data);
          return response;
        })
        .catch((err) => {
          console.log("err");
          return err;
        });
    }

    console.log("Files to process");
    return "Files to process";
  }
  return "processEmailsAndNames";
}
