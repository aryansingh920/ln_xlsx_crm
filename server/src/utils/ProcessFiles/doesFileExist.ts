import fs from "fs";

export async function doesFileExist(
  directoryPath: string,
  fileName: string
): Promise<boolean> {
  const filePath = `${directoryPath}/${fileName}`;

  try {
    // Use fs.promises.access to check if the file exists
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    // Handle the error, file doesn't exist
    return false;
  }
}
