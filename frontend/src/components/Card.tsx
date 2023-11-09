import React, { useEffect, useState } from "react";
import { InternalCSS } from "../css/Internal.css";
import { uploadFile } from "../api/uploadFile";
import { updateFile } from "../api/updateFile";

const downloadFile:string = "output.xlsx"

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
      {props.stages[1] &&
        Card1(handleFileChange, handleUpload, error, handleSubmit)}
      {props.stages[2] && Card2(handleDownload)}
    </>
  );
};

const downloadExcelFile = (data: ArrayBuffer, filename: string) => {
  const blob = new Blob([data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

//api calls
const handleUpload = async (
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

const handleUpdateAndDownload = async (
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

//internal Components
const Card1 = (
  handleFileChange: any,
  handleUpload: any,
  error: string,
  handleSubmit: any
) => {
  return (
    <div className="uk-card uk-card-large uk-card-default uk-card-hover uk-card-body">
      <h3 className="uk-card-title">Excel Tool</h3>
      <div className="js-upload uk-placeholder uk-text-center">
        <span uk-icon="icon: cloud-upload"></span>
        <span className="uk-text-middle">Attach Excel Files</span>
        <div uk-form-custom>
          <label style={InternalCSS.displayNone} htmlFor="formInput">
            Input
          </label>
          <input
            id="formInput"
            type="file"
            title=""
            formEncType="multipart/form-data"
            onChange={handleFileChange}
          />
          <span className="uk-link" onClick={handleUpload}>
            selecting one
          </span>
        </div>
      </div>
      {error && <p className="uk-text-danger">{error}</p>}
      <button className="uk-button uk-button-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

const Card2 = (handleDownload: any) => {
  return (
    <div className="uk-card uk-card-large uk-card-default uk-card-hover uk-card-body">
      <h3 className="uk-card-title">Update and download the excel</h3>
      <p
        style={{
          color: "green",
        }}
      >
        File Uploaded
      </p>
      <button
        onClick={() => handleDownload()}
        className="uk-button uk-button-primary"
      >
        Download
      </button>
    </div>
  );
};

export default Card;
