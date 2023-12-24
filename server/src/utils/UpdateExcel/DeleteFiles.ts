import * as fs from "fs";

export function deleteFile(filePath: string): void {
  try {
    // Use fs.unlinkSync to delete the file synchronously
    console.log(`Deleting file: ${filePath}`);
    fs.unlinkSync(filePath);
    console.log(`File deleted successfully: ${filePath}`);
  } catch (error) {
    console.error(`Error deleting file: ${filePath}`);
  }
}
