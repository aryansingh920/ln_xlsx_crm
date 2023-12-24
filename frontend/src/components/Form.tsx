import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { baseUrl } from "../api/baseUrl";
import { useCookies } from "react-cookie";
import { handleClick } from "./Notification";
import processAllFiles from "../api/processAllFiles";

const Form = () => {
  const [cookies, setCookie] = useCookies(["files"]);
  const [errorMessage, setErrorMessage] = useState("No file selected");

  const allowedFileTypes = ".xlsx";

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      if (
        selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setErrorMessage("");
      } else {
        setErrorMessage(
          "Unsupported file type. Please select a valid XLSX file."
        );
        if (event.target) {
          event.target.value = "";
        }
      }
    }
  };

  const handleSubmit = async () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const formData = new FormData();
      formData.append("file", fileInput.files[0]);

      try {
        await sendFileToServer(formData);
      } catch (error) {
        console.error("Error during POST request:", error);
      }
    } else {
      setErrorMessage("No file selected");
    }
  };

  const sendFileToServer = async (formData: FormData) => {
    try {
      // Adjust the API endpoint as needed
      const response = await axios.post(`${baseUrl}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const fileName = response.data["FileName"];

      // Handle the response as needed
      setCookie("files", [...(cookies.files || []), fileName]);
      handleClick("File uploaded successfully");

      setTimeout(() => {
        handleClick("Processing files");
        processAllFiles();
      }, 5500);
    } catch (error) {
      throw new Error(`Error during POST request: ${error}`);
    }
  };

  return (
    <div className="">
      <div className="uk-margin ">
        <div className="js-upload uk-placeholder uk-text-center">
          <p>Select only 1 file</p>
          <span uk-icon="icon: cloud-upload"></span>
          <span
            className="uk-text-middle"
            style={{
              color: "white",
            }}
          >
            Attach Excel Files by dropping them here or
          </span>
          <div>
            <input
              id="fileInput"
              style={{
                color: "white",
                border: "1px solid white",
              }}
              type="file"
              aria-label="Custom controls"
              accept={allowedFileTypes}
              onChange={handleFileChange}
            />
          </div>
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {errorMessage === "" && (
          <button
            className="uk-button uk-button-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Form;
