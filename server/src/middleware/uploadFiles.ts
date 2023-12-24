import { Request, Response, _ } from "../helper/imports";

const diskStorageUploadFile_post = async (req: Request, res: Response) => {
  try {
    console.log("In upload file middleware", req.file);

    if (req.files?.length === 0) {
      return res.status(400).send("No file uploaded.");
    }
    return res.status(200).json({
      status: "success",
      FileName: req.file?.filename,
      msg: "Remember the file name for download",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Server is not running", error: err });
  }
};

export default { diskStorageUploadFile_post };
// export { diskStorageUploadFile_post };
