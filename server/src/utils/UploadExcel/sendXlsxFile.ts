import * as fs from "fs";
import * as path from "path";
import axios from "axios";

export async function sendXlsxFilesToApi(
  directoryPath: string,
  apiUrl: string
): Promise<void> {
  try {
    // Read the directory
    const files = fs.readdirSync(directoryPath);

    // Filter only XLSX files
    const xlsxFiles = files.filter((file) => file.endsWith(".xlsx"));

    console.log("xlsxFiles: ", xlsxFiles);
    // Iterate through each XLSX file and send it to the API
    for (const xlsxFile of xlsxFiles) {
      const filePath = path.join(directoryPath, xlsxFile);
      const fileData = fs.readFileSync(filePath);

      // Use Axios to send the file data to the API
      await axios
        .post(apiUrl, fileData, {
          headers: {
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            // Add any additional headers if needed
          },
        })
        .then((res) => {
          console.log("Process finished for file: " + xlsxFile);
          console.log(res);
          console.log(res.data);
        })
        .catch((err) => {
          console.log("Error for file: " + xlsxFile);
          //   console.log(err);
        });

      console.log(`File ${xlsxFile} sent to API successfully.`);
    }

    console.log("All XLSX files sent to the API.");
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

// Example usage
// const directoryPath = "/path/to/your/directory";
// const apiUrl = "https://example.com/api/upload";

// sendXlsxFilesToApi(directoryPath, apiUrl);
