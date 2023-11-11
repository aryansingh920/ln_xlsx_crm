//api calls
import { uploadFile } from "../../api/uploadFile";
export const handleUpload = async (
  selectedFile: File | null,
  setStages: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setToRemoveArray: React.Dispatch<React.SetStateAction<[string]>>
) => {
  if (selectedFile) {
    await uploadFile(selectedFile)
      .then((result) => {
        console.log("Upload result:", result);
        setToRemoveArray(result.toRemoveArray);
        setStages((prevState) => {
          return { ...prevState, 2: true, 1: false };
        });
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        setError("Upload failed");
      });
  }
};
