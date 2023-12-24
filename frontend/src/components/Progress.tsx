/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import fileInformation from "../api/fileInformation";
//error could be success,warning,danger
import { useCookies } from "react-cookie";
// import download from "../api/download";
import { baseUrl } from "../api/baseUrl";
import deleteFile from "../api/delete";
import { handleClick } from "./Notification";
const removeFileNameFromCookie = (
  cookies: any,
  setCookie: any,
  fileNameToRemove: string
) => {
  // Retrieve the current array from the cookie
  const currentFileNamesArray = cookies.files || [];

  // Remove the specified file name from the array
  const updatedFileNamesArray = currentFileNamesArray.filter(
    (fileName: any) => fileName !== fileNameToRemove
  );

  // Update the cookie with the new array
  setCookie("files", updatedFileNamesArray);

  // console.log("File name removed. Updated array:", updatedFileNamesArray);
};

const Progress = () => {
  const [cookies, setCookie] = useCookies(["files"]);
  const [uploadedFiles, setUploadedFiles] = useState([]) as any[];
  const [processingFiles, setProcessingFiles] = useState([]) as any[];
  const [readyFiles, setReadyFiles] = useState([]) as any[];
  const fileNamesArray = cookies.files || [];

  // useEffect(() => {
  //   console.log("Uploaded Files", uploadedFiles);
  // }, [uploadedFiles]);

  // useEffect(() => {
  //   console.log("Processing Files", processingFiles);
  // }, [processingFiles]);

  useEffect(() => {}, [cookies]);

  useEffect(() => {
    fileInformation()
      .then((res: any) => {
        // console.log("Directory");

        setUploadedFiles(res.data["Uploads Directory"]);
        setProcessingFiles(res.data["Processing Directory"]);
        setReadyFiles(res.data["Output Directory"]);
      })
      .catch((err: any) => {
        console.log(err);
      });
    setInterval(async () => {
      await fileInformation()
        .then((res: any) => {
          setUploadedFiles(res.data["Uploads Directory"]);

          setProcessingFiles(res.data["Processing Directory"]);

          setReadyFiles(res.data["Output Directory"]);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }, 5000);
  }, []);

  return (
    <div>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {accordionItem(
          "Files Uploaded but not processing",
          1,
          "warning",
          uploadedFiles,
          fileNamesArray,
          cookies,
          setCookie
        )}
        {accordionItem(
          "Files processing",
          2,
          "danger",
          processingFiles,
          fileNamesArray,
          cookies,
          setCookie
        )}
        {accordionItem(
          "Files Ready to Download",
          3,
          "success",
          readyFiles,
          fileNamesArray,
          cookies,
          setCookie
        )}
      </div>
    </div>
  );
};

export default Progress;

// ------------------------------------------------

// ------------------------------------------------

// ------------------------------------------------

const fileDeleted = async (
  file: string,
  error: string,
  cookies: any,
  setCookies: any
) => {
  await deleteFile(file, error)
    .then((res: any) => {
      // console.log(res);
      removeFileNameFromCookie(cookies, setCookies, file);
      handleClick("File Deleted Successfully");

      // removeFileNameFromCookie(cookies, setCookie, file);
    })
    .catch((err: any) => {
      console.log(err);
      handleClick("Error Deleting File");
    });
};

const fileMessage = (
  file: string,
  error: string,
  cookies: any,
  setCookies: any
) => {
  return (
    <div
      className={`alert alert-${error} d-flex justify-content-between`}
      role="alert"
    >
      <div>
        <h5
          className="mt-2"
          style={{
            color: "black ",
            fontFamily: "monospace",
            fontSize: "1rem",
            fontStyle: "italic-underline",
          }}
        >
          📝 &nbsp; {file}
        </h5>
      </div>
      <div>
        {/* Add your clickable icon here */}
        {error === "warning" && (
          <button
            onClick={() => {
              fileDeleted(file, error, cookies, setCookies);
            }}
            uk-tooltip="Click to remove the file"
            className="uk-button m-1"
          >
            ❌
          </button>
        )}
        <a
          style={{
            backgroundColor: "white",
            border: "0.1px solid grey",
            borderRadius: "5px",
          }}
          onClick={() => {
            if (error !== "danger")
              setTimeout(() => {
                fileDeleted(file, error, cookies, setCookies);
              }, 1000);
          }}
          type="button"
          href={`${baseUrl}/download?fileNumber=${file}&dir=${error}`}
          download
          uk-tooltip="Click to download the file"
          className="uk-button m-1"
        >
          ⬇️
        </a>
      </div>
    </div>
  );
};

const accordionItem = (
  header: string,
  id: number,
  errorType: string,
  files: [string],
  fileNamesArray: [string],
  cookies: any,
  setCookies: any
) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          style={{
            backgroundColor: "transparent",
          }}
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#flush-collapseOne-${id}`}
          aria-expanded="false"
          aria-controls="flush-collapseOne"
        >
          {header}
          &nbsp;&nbsp;
          <span className="badge text-bg-primary">{files.length}</span>
        </button>
      </h2>
      <div
        id={`flush-collapseOne-${id}`}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          {files.length > 0 ? (
            <div>
              {errorType === "danger" && (
                <p>Files Cannot be deleted from here</p>
              )}
              {errorType === "success" && (
                <p>Files once downloaded will be removed from our storages</p>
              )}

              {files.map((file: string) => {
                if (fileNamesArray.includes(file)) {
                  return (
                    <div key={file}>
                      {fileMessage(file, errorType, cookies, setCookies)}
                    </div>
                  );
                } else {
                  return <div key={file}></div>;
                }
              })}
            </div>
          ) : (
            <div>
              <p>No Files Here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
