//api calls
import { uploadFile } from "../../api/uploadFile";
import { updateFile } from "../../api/updateFile";
export const handleUpload = async (
  selectedFile: File | null,
  setStages: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  if (selectedFile) {
    await uploadFile(selectedFile)
      .then(async (result) => {
        console.log("Upload result:", result);
        const removeArray: string[] = result.toRemoveArray;
        await updateFile(removeArray)
          .then((res) => {
            setStages((prevState) => {
              return { ...prevState, 2: true, 1: false };
            });
            console.log("updateFile result:", res);
          })
          .catch((err) => {
            setStages({ 1: false, 2: false, 3: true });

            console.log("updateFile error:", err);
            setError("Update failed");
          });
      })
      .catch((error) => {
        setStages({ 1: false, 2: false, 3: true });

        console.error("Upload failed:", error);
        setError("Upload failed");
      });
  }
};
