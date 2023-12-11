import express, { Router, Request, Response } from "express";
import middleware from "../controller/middlewares";
import upload, { diskUpload } from "../helper/multer";
// import upload from '../helper/multer';

const router: Router = express.Router();

router
  .get("/", middleware.Home.home_get)

  .post("/process", upload.single("file"), middleware.Process.processFiles)

  .post("/updateDownload", middleware.Changes.Changes)

  .get("/download", middleware.DownloadFile.downloadFile)

  .get("*", (req: Request, res: Response) => {
    res.render("404", {
      error: "Page not found",
    });
  })
  .post("*", (req: Request, res: Response) => {
    res.render("404"),
      {
        error: "Page not found",
      };
  });

const uploadRouter: Router = express.Router();

uploadRouter
  .get("/", middleware.Home.home_get)
  .post(
    "/upload",
    diskUpload.single("file"),
    middleware.UploadFiles.diskStorageUploadFile_post
  )
  .get("*", (req: Request, res: Response) => {
    res.render("404", {
      error: "Page not found",
    });
  })
  .post("*", (req: Request, res: Response) => {
    res.render("404"),
      {
        error: "Page not found",
      };
  });

export default router;
export { uploadRouter };
