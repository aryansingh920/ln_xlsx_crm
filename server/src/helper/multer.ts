import multer from "multer";
import { Request } from "express";
import {getCurrentFileNumber,getNextFileNumber} from "../utils/UploadExcel/getNextFileName";

const diskStorage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "uploads/"); // Specify the destination directory
  },
  filename: async (req: Request, file, cb) => {
    const uniqueFileNumber = await getNextFileNumber();
    cb(null, `${uniqueFileNumber}.xlsx`); // Specify the filename
  },
});

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Accept all excel and pdf files xls, xlsx, csv, pdf
  if (
    file.mimetype === "application/vnd.ms-excel" ||
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "text/csv"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage, // Specify the storage engine to use
  //   fileFilter, // Specify the file filter function
  limits: {
    // fileSize: 1024 * 1024, // Specify the maximum file size in bytes (if needed)
  },
});

const diskUpload = multer({ storage: diskStorage });



export default upload;
export { diskUpload };
