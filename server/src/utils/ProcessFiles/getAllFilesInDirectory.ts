import fs from "fs";

export function getAllFilesInDirectory(directoryPath: string): string[] {
  try {
    // Read the contents of the folder asynchronously
    const files = fs.readdirSync(directoryPath);

    // Filter out directories, leaving only file names
    const fileNames = files
      .map((file) => `${directoryPath}/${file}`)
      .filter((filePath) => fs.statSync(filePath).isFile())
      .map((filePath) => filePath.split("/").pop()!);

    return fileNames;
  } catch (error) {
    console.error(`Error reading files from directory ${directoryPath}:`);
    return [];
  }
}
