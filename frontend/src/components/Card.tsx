import React, { useEffect, useState } from "react";
import Card1 from "./Cards/Card1";
import Card2 from "./Cards/Card2";
import { downloadExcelFile } from "../service/Card/downloadExcelFile";
import { handleUpload } from "../service/Card/handleUpload";
import { handleUpdateAndDownload } from "../service/Card/handleUpdateAndDownload";

const downloadFile: string = "output.xlsx";

const Card = (props: {
  stages: { [key: number]: boolean };
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setStages: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
}): JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [toRemoveArray, setToRemoveArray] = useState<[string]>([""]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): any => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    console.log("Stages", props.stages);
  }, [props.stages]);

  const handleSubmit = async () => {
    props.setShowLoader(true);
    await handleUpload(
      selectedFile,
      props.setStages,
      setError,
      setToRemoveArray
    );
    props.setShowLoader(false);
  };

  //api calls
  const handleDownload = async () => {
    props.setShowLoader(true);
    try {
      const result = await handleUpdateAndDownload(toRemoveArray);
      if (result) {
        downloadExcelFile(result, downloadFile);
      }
    } catch (error) {
      console.error("Download failed:", error);
    }
    props.setShowLoader(false);
  };

  // console.log("Stages",)

  return (
    <>
      {props.stages[1] && (
        <Card1
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          error={error}
          handleSubmit={handleSubmit}
        />
      )}
      {props.stages[2] && <Card2 handleDownload={handleDownload} />}
    </>
  );
};

export default Card;
