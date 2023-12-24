import * as fs from "fs";
import { FileDirectoryPath,ProcessingDirectoryPath,OutputDirectoryPath } from "../../constants/constants";


const FileDirectoryPaths = {
  uploads: FileDirectoryPath, // Update with the actual path
  processing: ProcessingDirectoryPath, // Update with the actual path
  output: OutputDirectoryPath, // Update with the actual path
};

export function getNextFileNumber(): number {
  // Read file numbers from all three directories
  const fileNumbers: number[] = [];

  Object.values(FileDirectoryPaths).forEach((directoryPath) => {
    const files = fs.readdirSync(directoryPath);

    // Extract the file numbers and add to the array
    const numbersInDirectory = files
      .filter((file) => file.match(/^\d+\.xlsx$/))
      .map((file) => parseInt(file.split(".")[0], 10));

    fileNumbers.push(...numbersInDirectory);
  });

  // Find the maximum file number or default to 0 if no files are present
  const maxFileNumber = fileNumbers.length > 0 ? Math.max(...fileNumbers) : 0;

  // Return a unique number more than the maximum across all directories
  return maxFileNumber + 1;
}


// export  function getNextFileNumber(): number {
//   const folderPath: string = FileDirectoryPath;
//   // Read the contents of the folder
//     const files = fs.readdirSync(folderPath);
    
//     console.log("files",files);

//   // Extract the file numbers and find the maximum
//   const fileNumbers = files
//     .filter((file) => file.match(/^\d+\.xlsx$/)) // Filter files that match the numeric pattern
//         .map((file) => parseInt(file.split(".")[0], 10)); // Extract and parse the numeric part
    
//     console.log("fileNumbers",fileNumbers);

//   // Find the maximum file number or default to 0 if no files are present
//   const maxFileNumber = fileNumbers.length > 0 ? Math.max(...fileNumbers) : 0;

//   // Return the next number in the sequence
//   return maxFileNumber + 1;
// }

export function getCurrentFileNumber(): number {
  const folderPath: string = FileDirectoryPath;
  // Read the contents of the folder
  const files = fs.readdirSync(folderPath);

  // Extract the file numbers and find the maximum
  const fileNumbers = files
    .filter((file) => file.match(/^\d+\.xlsx$/)) // Filter files that match the numeric pattern
    .map((file) => parseInt(file.split(".")[0], 10)); // Extract and parse the numeric part

  // Find the maximum file number or default to 0 if no files are present
  const maxFileNumber = fileNumbers.length > 0 ? Math.max(...fileNumbers) : 0;

  // Return the next number in the sequence
  return maxFileNumber;
}
