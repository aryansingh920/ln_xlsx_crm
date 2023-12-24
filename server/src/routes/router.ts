// import express, { Router, Request, Response } from "express";
import middleware from "../controller/middlewares";
import upload, { diskUpload } from "../helper/multer";
import express, {
  Router,
  Application,
  Request,
  Response,
  NextFunction,
} from "express";
import { processFiles } from "../utils/ProcessFiles/processFiles";

// import upload from '../helper/multer';

const router: Router = express.Router();
const port: string | number = process.env.PORT || 3001;
let fullUrl: string = "" || `${process.env.LOCALHOSTLINK}:${port}`;

router
  .use((req, res, next) => {
    fullUrl = `${req.protocol}://${req.get("host")}`;
    next();
  })
  .get("/", middleware.Home.home_get)

  .post("/process", upload.single("file"), middleware.Process.processFiles)

  .post("/updateDownload", middleware.Changes.Changes)


  .get("*", (req: Request, res: Response) => {
    res.json({
      error: "Main Service Page not found",
    });
  })
  .post("*", (req: Request, res: Response) => {
    res.json({
      error: "Main Service Page not found",
    });
  });

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const uploadRouter: Router = express.Router();

uploadRouter
  .get("/", middleware.Home.home_get)
  .get(
    "/processAllFiles",

    async (req: Request, res: Response, next: NextFunction) => {
      await processFiles(fullUrl)
        .then((response) => {
          // console.log("response");
          res.status(200).json({ status: "success", response: response });
        })
        .catch((err) => {
          console.log("err", err);
          res.status(500).json({ status: "failed", error: err });
        });
    }
  )
  .get("/download", middleware.DownloadFile.downloadFile)

  .get("/checkFileStatus", middleware.checkFileStatus)
  .get("/getFileDetails", middleware.getFileDetails)
  .get("/deleteFile", middleware.deleteFileRoute)

  .post(
    "/upload",
    diskUpload.single("file"),
    middleware.UploadFiles.diskStorageUploadFile_post
  )
  .get("*", (req: Request, res: Response) => {
    res.json({
      error: "Upload Service Page not found",
    });
  })
  .post("*", (req: Request, res: Response) => {
    res.json({
      error: "Upload Service Page not found",
    });
  });



export default router;
export { uploadRouter };
