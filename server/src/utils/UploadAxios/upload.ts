import axios, { AxiosResponse } from "axios";
import FormData from "form-data";
import fs from "fs";

async function uploadFile(
  apiEndpoint: string,
  filePath: string,
  additionalData?: Record<string, any>
): Promise<AxiosResponse> {
  try {
    // Create a FormData object
    const formData = new FormData();

    // Append additional data to the FormData object (if any)
    if (additionalData) {
      for (const key in additionalData) {
        if (Object.hasOwnProperty.call(additionalData, key)) {
          formData.append(key, additionalData[key]);
        }
      }
    }

    // Append the file to the FormData object
    const fileStream = fs.createReadStream(filePath);
    formData.append("file", fileStream);

    // Make the Axios POST request
    const response = await axios.post(apiEndpoint, formData, {
      headers: {
        ...formData.getHeaders(), // Include necessary headers for FormData
      },
    });

    // Handle the API response
    console.log("File upload successful:", response.data);
    return response;
  } catch (error) {
    // Handle errors
    console.error("Error uploading file:", error);
    throw error;
  }
}

// Example usage
// const apiEndpoint = "https://example.com/upload";
// const filePath = "/path/to/your/file.txt";
// const additionalData = { key1: "value1", key2: "value2" };

// uploadFile(apiEndpoint, filePath, additionalData)
//   .then((response) => {
//     console.log("File upload complete!", response.data);
//   })
//   .catch((error) => {
//     console.error("File upload failed:", error);
//   });

export default uploadFile;
