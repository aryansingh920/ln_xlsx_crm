import {
  Request,
  Response,
  OutputDirectoryPath,
  ProcessingDirectoryPath,
  FileDirectoryPath,
  path,
  deleteFile,
  doesFileExist,
  getAllFilesInDirectory,
  // FileDirectoryPath,
} from "../helper/imports";

const downloadFile = (req: Request, res: Response) => {
  const { fileNumber, dir } = req.query;
  //dir could be
  //1: upload
  //2: process
  //3: output
  // console.log("Checker Message", fileNumber, dir);
  try {
    let directory: string = OutputDirectoryPath;
    // if (dir === "success") dir = "output";
    // else if (dir === "danger") dir = "process";
    // else if (dir === "warning") dir = "upload";
    if (dir === "warning") directory = FileDirectoryPath;
    else if (dir === "danger") directory = ProcessingDirectoryPath;
    else if (dir === "success") directory = OutputDirectoryPath;

    const filePath = path.join(directory, `${fileNumber}`);
    // console.log("Checker Message", filePath);
    res.download(filePath, (err) => {
      if (err) {
        res.status(500).json({ status: "Download failed", error: err });
      } else {
        // deleteFile(filePath);
        // res.json({ status: "Download successful" });
      }
    });
  } catch (err) {
    res.status(500).json({ status: "Server is not running", error: err });
  }
};

const checkFileStatus = async (req: Request, res: Response) => {
  const { fileNumber } = req.query;
  try {
    const uploadDir: boolean = await doesFileExist(
      FileDirectoryPath,
      `${fileNumber}.xlsx`
    );
    const processingDir: boolean = await doesFileExist(
      ProcessingDirectoryPath,
      `${fileNumber}.xlsx`
    );
    const outputDir: boolean = await doesFileExist(
      OutputDirectoryPath,
      `${fileNumber}.xlsx`
    );

    if (uploadDir) {
      res.status(200).json({ status: "File is uploaded" });
    } else if (processingDir) {
      res.status(200).json({ status: "File is processing" });
    } else if (outputDir) {
      res.status(200).json({ status: "File is ready for download" });
    } else {
      res.status(200).json({ status: "File is not found" });
    }
  } catch (err) {
    res.status(500).json({ status: "Server is not running", error: err });
  }
};

const getFileDetails = async (req: Request, res: Response) => {
  return res.status(200).json({
    "Uploads Directory": getAllFilesInDirectory(FileDirectoryPath),
    "Processing Directory": getAllFilesInDirectory(ProcessingDirectoryPath),
    "Output Directory": getAllFilesInDirectory(OutputDirectoryPath),
  });
};

const deleteFileRoute = async (req: Request, res: Response) => {
  const { fileNumber, dir } = req.query;
  let directory: string = OutputDirectoryPath;
  if (dir === "warning") directory = FileDirectoryPath;
  else if (dir === "danger")
    res.status(200).json({ status: "File to not be deleted from here" });
  else if (dir === "success") directory = OutputDirectoryPath;
  try {
    const filePath = path.join(directory, `${fileNumber}`);
    deleteFile(filePath);
    res.status(200).json({ status: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "Server is not running", error: err });
  }
};

export default { downloadFile };
export { checkFileStatus, getFileDetails, deleteFileRoute };
