import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path"; // Import the 'path' module for working with file paths
import ejs from "ejs"; // Import EJS
import { uploadRouter } from "./routes/router";

const app: Application = express();
const port: string | number = process.env.UPLOAD_PORT || 3002;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Set the views directory path

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the 'public' directory

// Routes
//print a line separator after every request
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("\n");
  console.log("--------------------------------------------------");
  console.log("\n");
  next();
});
app.use("/api", uploadRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).render("404", {
    error: err.stack,
  });
});

app.listen(port, () => {
  console.log("Upload Server");
  console.log(`Server is running on port ${port}`);
});
