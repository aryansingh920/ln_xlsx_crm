import { updateFile } from "../../api/updateFile";

export const handleUpdateAndDownload = async (
  toRemoveArray: [string]
): Promise<ArrayBuffer | false> => {
  try {
    const result = await updateFile(toRemoveArray);
    console.log("Update result:", result);
    return result; // Return the result here
  } catch (error) {
    console.error("Update failed:", error);
    throw error;
  }
};
