import { Request, Response } from "express";
import path from "path";
import ExcelJS from "exceljs";
import saveExcelFile from "../utils/ExcelManipulation/saveFile";

const uploadFile_post = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const buffer = req.file.buffer;

  const workbook = new ExcelJS.Workbook();

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

      // Create a new Excel workbook
      const newWorkbook = new ExcelJS.Workbook();
      const newWorksheet = newWorkbook.addWorksheet("Sheet 1");

      // Add headers to the new worksheet
      newWorksheet.addRow(headers);

      // Add data rows to the new worksheet
      rows.forEach((row) => {
        newWorksheet.addRow(row);
      });

      // Define the output file path and name (change as needed)
      const outputFilePath = path.join(__dirname, "../../uploads/output.xlsx");

      // Save the new workbook to the specified path
      return saveExcelFile(newWorkbook, outputFilePath);
    })
    .then(() => {
      // Send a response indicating success or provide a download link
      res.status(200).send("Excel file saved as 'output.xlsx'");
    })
    .catch((error) => {
      console.error("Error loading Excel file:", error.message);
      console.error("Buffer contents:", buffer.toString());
      res.status(500).render("404", {
        error: error.stack,
      });
    });
};

export default { uploadFile_post };
