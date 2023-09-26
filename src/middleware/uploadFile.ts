//upload excel file post route's middleware
import { Request, Response } from "express";

const uploadFile_post = (req: Request, res: Response) => {
  console.log(req.file);
  if (req.file) {
    // Handle the uploaded file (e.g., save it, process it, etc.)

    res.send("File uploaded successfully!");
  } else {
    res.status(400).send("No file uploaded.");
  }
};

export default { uploadFile_post };
