import express, { Router, Request, Response } from "express";
import middleware from "../controller/middlewares";
import upload from "../helper/multer";

const router: Router = express.Router();

router
  .get("/", middleware.Home.home_get)
  .post("/upload", upload.single("file"), middleware.Upload.uploadFile_post)
  .post("/translate", middleware.OpenAI.openaiMiddleware)

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
