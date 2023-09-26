//upload excel file post route's middleware
import { Request, Response } from "express";
import path from "path";
import ExcelJS from "exceljs";

const uploadFile_post = (req: Request, res: Response) => {
  console.log("req.file:", req.file);
  if (req.file !== undefined) {
    console.log("req.file.buffer:", req.file.buffer);
  } else {
    console.log("No file uploaded.");
  }
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const workbook = new ExcelJS.Workbook();
  const buffer = req.file.buffer;

  workbook.xlsx
    .load(buffer)
    .then((workbook) => {
      const worksheet = workbook.getWorksheet(1);

      const headers = worksheet.getRow(1).values as string[];
      const rows: any[] = [];

      for (let i = 2; i <= worksheet.rowCount; i++) {
        const row = worksheet.getRow(i).values;
        rows.push(row);
      }

      res.render("excel-view", { headers, rows });
    })
    .catch((error) => {
      console.error("Error loading Excel file:", error.message);
      console.error("Buffer contents:", buffer.toString()); // Log the buffer contents for debugging
      res.status(500).render("404", {
        error: error.stack,
      });
    });
};

export default { uploadFile_post };
