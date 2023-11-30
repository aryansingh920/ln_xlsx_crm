// import * as fs from "fs";
// import { DiskStorageFilePath } from "../../constants/constants";

// export function getNextFileNumber(): number {
//   const folderPath: string = DiskStorageFilePath;
//   // Read the contents of the folder
//   const files = fs.readdirSync(folderPath);

//   // Extract the file numbers and find the maximum
//   const fileNumbers = files
//     .filter((file) => file.match(/^\d+\.xlsx$/)) // Filter files that match the numeric pattern
//     .map((file) => parseInt(file.split(".")[0], 10)); // Extract and parse the numeric part

//   // Find the maximum file number or default to 0 if no files are present
//   const maxFileNumber = fileNumbers.length > 0 ? Math.max(...fileNumbers) : 0;

//   // Return the next number in the sequence
//   return maxFileNumber + 1;
// }

// export function getCurrentFileNumber(): number {
//   const folderPath: string = DiskStorageFilePath;
//   // Read the contents of the folder
//   const files = fs.readdirSync(folderPath);

//   // Extract the file numbers and find the maximum
//   const fileNumbers = files
//     .filter((file) => file.match(/^\d+\.xlsx$/)) // Filter files that match the numeric pattern
//     .map((file) => parseInt(file.split(".")[0], 10)); // Extract and parse the numeric part

//   // Find the maximum file number or default to 0 if no files are present
//   const maxFileNumber = fileNumbers.length > 0 ? Math.max(...fileNumbers) : 0;

//   // Return the next number in the sequence
//   return maxFileNumber;
// }
