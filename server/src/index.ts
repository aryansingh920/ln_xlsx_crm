import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path"; // Import the 'path' module for working with file paths
import ejs from "ejs"; // Import EJS
import router from "./routes/router";
import { processFiles } from "./utils/ProcessFiles/processFiles";
import { FullNameQuery } from "./utils/QueryExtract/Name";

const app: Application = express();
const port: string | number = process.env.PORT || 3001;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Set the views directory path

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the 'public' directory

let fullUrl: string = "" || `${process.env.LOCALHOSTLINK}:${port}`;

// Routes
//print a line separator after every request
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("\n");
  console.log("--------------------------------------------------");
  console.log("\n");
  next();
});

app.use((req, res, next) => {
  fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  // console.log("Full URL:", fullUrl);
  next();
});

// app.use(async (req: Request, res: Response, next: NextFunction) => {
//   console.log("On Middle Ware Called");
//   // console.log("Full Url", fullUrl);
//   await OnServerStart(fullUrl);
//   next();
// });

app.get(
  "/call",

  async (req: Request, res: Response, next: NextFunction) => {
    await processFiles("http://localhost:3001")
      .then((response) => {
        console.log("response", response);
        res.status(200).json({ status: "success", response: response });
      })
      .catch((err) => {
        console.log("err", err);
        res.status(500).json({ status: "failed", error: err });
      });
  }
);

app.use("/", router);

// processFiles(fullUrl);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).render("404", {
    error: err.stack,
  });
});

// async function OnServerStart(fullUrl: string) {

// }

const server = app.listen(port, async () => {
  console.log("Main Server");
  console.log(`Server is running on port ${port}`);
});

server.on("error", (error) => {
  console.error("Server failed to start:", error);
});
