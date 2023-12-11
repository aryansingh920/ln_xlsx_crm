import { getCurrentFileNumber } from "../UploadExcel/getNextFileName";
// import axios from "axios";
import uploadFile from "../UploadAxios/upload";

export async function processFiles(fullUrl: string) {
  console.log("processEmailsAndNames", fullUrl);
  console.log("getCurrentFileNumber", getCurrentFileNumber());

  if (getCurrentFileNumber() === 0) {
    console.log("No files to process");
    return "No files to process";
  } else {
    for (let i = 1; i <= getCurrentFileNumber(); i++) {
      console.log("uploading file", i);
      const response = await uploadFile(
        `${fullUrl}/process`,
        `uploads/${i}.xlsx`
      );
        
    }

    console.log("Files to process");
    return "Files to process";
  }
  return "processEmailsAndNames";
}
