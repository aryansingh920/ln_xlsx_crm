import * as fs from "fs";
import * as path from "path";

// Function to print the current directory
export function printCurrentDirectory() {
  const currentDirectory = process.cwd();
  console.log(`Current Directory: ${currentDirectory}`);
  return currentDirectory;
}

// Function to delete a directory (and its contents)
export async function deleteDirectory(directoryPath: string) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const filePath = path.join(directoryPath, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        deleteDirectory(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    });
    fs.rmdirSync(directoryPath);
    console.log(`Deleted directory: ${directoryPath}`);
    return true;
  } else {
    console.log(`Directory not found: ${directoryPath}`);
    return false;
  }
}

// Function to create a directory
export async function createDirectory(directoryPath: string) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
    console.log(`Created directory: ${directoryPath}`);
    return true;
  } else {
    console.log(`Directory already exists: ${directoryPath}`);
    return false;
  }
}

// // Example usage:
// printCurrentDirectory();
// deleteDirectory("path/to/delete"); // Replace with the directory you want to delete
// createDirectory("path/to/create"); // Replace with the directory you want to create
