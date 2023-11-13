import { Request, Response, OutputFilePath } from "../helper/imports";

const downloadFile = (req: Request, res: Response) => {
  try {
    res.download(OutputFilePath, (err) => {
      if (err) {
        res.status(500).json({ status: "Download failed", error: err });
      }
    });
  } catch (err) {
    res.status(500).json({ status: "Server is not running", error: err });
  }
};

export default { downloadFile };
